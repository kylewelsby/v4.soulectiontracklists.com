import Vue from 'vue'
import { timeToSeconds } from '@/utils/timeToSeconds'
import throttle from 'lodash.throttle'
import sortBy from 'lodash.sortby'
import * as shvl from 'shvl'

export default {
  namespaced: true,
  state: () => ({
    markers: [],
    show: {},
    soundcloud: null, // 'https://soundcloud.com/soulection/soulection-radio-show-492',
    duration: 60,
    playhead: 0,
    state: 'idle',
  }),
  actions: {
    async fetchShow({ commit }, showId) {
      const { error, data } = await this.$supabase
        .from('shows')
        .select(
          `links,
          title,
          artwork,
          slug,
          duration,
          chapters(
            title,
            markers(
              timestamp,
              rawTrack,
              track(
                title,
                artwork,
                artist(title)
              )
            )
          )`
        )
        .eq('id', showId)
        .single()
      if (error) {
        throw new Error(error)
      }
      let markers = []
      data.chapters.forEach((chapter) => {
        markers = markers.concat(
          ...chapter.markers.map((marker) =>
            Object.assign(marker, {
              chapter,
            })
          )
        )
      })
      markers = sortBy(markers, 'timestamp')
      commit('SET_SHOW', {
        title: data.title,
        artwork: data.artwork,
        slug: data.slug,
      })
      commit('SET_DURATION', data.duration)
      commit('SET_MARKERS', markers)
      commit('SET_SOUNDCLOUD', data.links.soundcloud)
    },
    skipForward({ dispatch, getters }) {
      if (getters.nextMarker) {
        dispatch('seekTo', timeToSeconds(getters.nextMarker.timestamp) * 1000)
      }
    },
    skipBackward({ dispatch, getters }) {
      if (getters.previousMarker) {
        dispatch(
          'seekTo',
          timeToSeconds(getters.previousMarker.timestamp) * 1000
        )
      }
    },
    seekTo() {
      // noop
      // subscribed to in PlayerWidget.vue
    },
    toggle() {
      // noop
      // subscribed to in PlayerWidget.vue
    },
    updateProgress: throttle(({ commit }, data) => {
      commit('SET_POSITION', data)
    }, 500),
  },
  mutations: {
    SET_MARKERS(state, markers) {
      Vue.set(state, 'markers', markers)
    },
    SET_DURATION(state, duration) {
      state.duration = duration
    },
    SET_SOUNDCLOUD(state, soundcloud) {
      // state.soundcloud = 'https://api.soundcloud.com/tracks/988494730'
      state.soundcloud = soundcloud
    },
    SET_SHOW(state, show) {
      state.show = show
    },
    SET_POSITION(state, payload) {
      state.currentPosition = payload.currentPosition
      state.relativePosition = payload.relativePosition
    },
    SET_READY(state) {
      state.state = 'ready'
    },
    SET_PLAYING(state) {
      state.state = 'playing'
    },
    SET_PAUSED(state) {
      state.state = 'paused'
    },
    SET_FINISHED(state) {
      state.state = 'finished'
    },
  },
  getters: {
    markers(state) {
      return state.markers
    },
    hasShow(state) {
      return state.show.title !== undefined
    },
    isPlaying(state) {
      return state.state === 'playing'
    },
    hasTimestamps(state) {
      return !!state.markers[0].timestamp
    },
    currentChapter(state, getters) {
      if (getters.hasTimestamps) {
        return getters.currentMarker.chapter
      } else {
        return state.markers[0].chapter
      }
    },
    currentMarker(state) {
      const playhead = state.currentPosition / 1000
      const marker = state.markers.find((marker, index) => {
        const nextTrack = state.markers[index + 1]
        const prevTrack = state.markers[index - 1]
        const markerTime = timeToSeconds(marker.timestamp)
        if (nextTrack) {
          const nextMarkerTime = timeToSeconds(nextTrack.timestamp)
          if (prevTrack) {
            return playhead > markerTime && playhead < nextMarkerTime
          } else {
            return playhead < markerTime
          }
        } else {
          // last track
          return playhead >= markerTime
        }
      })
      if (!marker) {
        return state.markers[0]
      }
      return marker
    },
    nextMarker(state, getters) {
      if (!getters.currentMarker) return null
      const index = state.markers.findIndex(getters.currentMarker)
      return state.markers[index + 1]
    },
    previousMarker(state, getters) {
      if (!getters.currentMarker) return null
      const index = state.markers.findIndex(getters.currentMarker)
      return state.markers[index + 1]
    },
    artwork(state, getters) {
      if (getters.hasTimestamps) {
        return (
          shvl.get(getters.currentMarker, 'track.artwork') ||
          shvl.get(state.show, 'artwork')
        )
      } else {
        return shvl.get(state.show, 'artwork')
      }
    },
  },
}
