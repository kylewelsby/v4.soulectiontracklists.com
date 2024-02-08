import { set } from 'vue'
import * as shvl from 'shvl'
import throttle from 'lodash.throttle'
import sortBy from 'lodash.sortby'
import { timeToSeconds } from '@/utils/timeToSeconds'

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
            artwork,
            markers(
              id,
              timestamp,
              rawTrack,
              track(
                id,
                title,
                path,
                artwork,
                artist(id, title)
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
        dispatch('seekTo', getters.nextMarker.msPosition)
      }
    },
    skipBackward({ dispatch, getters }) {
      if (getters.previousMarker) {
        dispatch('seekTo', getters.previousMarker.msPosition)
      }
    },
    seekTo({ dispatch: _dispatch }, payload) {
      // noop
      // subscribed to in PlayerWidget.vue
    },
    toggle() {
      // noop
      // subscribed to in PlayerWidget.vue
    },
    updateProgress: throttle(({ commit }, data) => {
      commit('SET_POSITION', data)
    }, 250),
  },
  mutations: {
    SET_MARKERS(state, markers) {
      markers = markers.map((marker) =>
        Object.assign(marker, {
          msPosition: timeToSeconds(marker.timestamp) * 1000,
        })
      )
      set(state, 'markers', markers)
    },
    SET_DURATION(state, duration) {
      state.duration = duration
    },
    SET_SOUNDCLOUD(state, soundcloud) {
      state.soundcloud = soundcloud
    },
    SET_SHOW(state, show) {
      state.show = show
    },
    SET_POSITION(state, payload) {
      set(state, 'currentPosition', payload.currentPosition)
      set(state, 'relativePosition', payload.relativePosition)
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
      const playhead = state.currentPosition
      const marker = state.markers.find((marker, index) => {
        const nextTrack = state.markers[index + 1]
        const prevTrack = state.markers[index - 1]
        const markerTime = marker.msPosition
        if (nextTrack) {
          const nextMarkerTime = nextTrack.msPosition
          if (!prevTrack) {
            return playhead < markerTime
          } else {
            return playhead >= markerTime && playhead < nextMarkerTime
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
      const index = state.markers.findIndex(
        (marker) => marker.id === getters.currentMarker.id
      )
      return state.markers[index + 1]
    },
    previousMarker(state, getters) {
      if (!getters.currentMarker) return null
      const index = state.markers.findIndex(
        (marker) => marker.id === getters.currentMarker.id
      )
      return state.markers[index - 1]
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
