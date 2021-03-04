import Vue from 'vue'
import { timeToSeconds } from '@/utils/timeToSeconds'
import throttle from 'lodash.throttle'

export default {
  namespaced: true,
  state: () => ({
    markers: [],
    show: {},
    soundcloud: null, // 'https://soundcloud.com/soulection/soulection-radio-show-492',
    duration: 60,
    playhead: 0,
    state: 'idle',
    currentMarker: {},
    nextMarker: {},
    previousMarker: {},
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
            Object.assign(marker, { chapterTitle: chapter.title })
          )
        )
      })
      commit('SET_SHOW', {
        title: data.title,
        artwork: data.artwork,
        slug: data.slug,
      })
      commit('SET_DURATION', data.duration)
      commit('SET_MARKERS', markers)
      commit('SET_SOUNDCLOUD', data.links.soundcloud)
    },
    skipForward({ dispatch, state }) {
      if (state.nextMarker) {
        dispatch('seekTo', timeToSeconds(state.nextMarker.timestamp) * 1000)
      }
    },
    skipBackward({ dispatch, state }) {
      if (state.previousMarker) {
        dispatch('seekTo', timeToSeconds(state.previousMarker.timestamp) * 1000)
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
      const playhead = payload.currentPosition / 1000
      state.currentMarker = state.markers.find((marker, index) => {
        const nextTrack = state.markers[index + 1]
        if (nextTrack) {
          return (
            playhead >= timeToSeconds(marker.timestamp) &&
            playhead < timeToSeconds(nextTrack.timestamp)
          )
        } else {
          // last track
          return playhead >= timeToSeconds(marker.timestamp)
        }
      })

      if (!state.currentMarker) {
        // first track
        state.currentMarker = state.markers[0]
      }

      const index = state.markers.indexOf(state.currentMarker)

      const nextTrackIndex = index + 1
      if (nextTrackIndex !== -1) {
        state.nextMarker = state.markers[nextTrackIndex]
      }
      const prevTrackIndex = index - 1
      if (prevTrackIndex !== -1) {
        state.previousMarker = state.markers[prevTrackIndex]
      }
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
  },
}
