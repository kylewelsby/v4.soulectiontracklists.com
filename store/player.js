import Vue from 'vue'
export default {
  namespaced: true,
  state: () => ({
    markers: [],
    duration: 60,
    playhead: 0,
  }),
  actions: {
    async fetchShow({ commit }, showId) {
      const { error, data } = await this.$supabase
        .from('shows')
        .select(
          `duration,
          chapters(
            title,
            markers(
              timestamp,
              rawTrack,
              track(
                title,
                artist(title)
              )
            )
          )`
        )
        .eq('id', showId)
        .single()
      if (error) {
        console.error(error)
      }
      let markers = []
      data.chapters.forEach((chapter) => {
        markers = markers.concat(...chapter.markers)
      })
      commit('SET_DURATION', data.duration)
      commit('SET_MARKERS', markers)
    },
  },
  mutations: {
    SET_MARKERS(state, markers) {
      Vue.set(state, 'markers', markers)
    },
    SET_DURATION(state, duration) {
      state.duration = duration
    },
  },
  getters: {
    markers(state) {
      return state.markers
    },
  },
}
