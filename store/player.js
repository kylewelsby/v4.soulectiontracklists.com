import Vue from 'vue'
export default {
  namespaced: true,
  state: () => ({
    markers: [],
    show: {},
    soundcloud: null, // 'https://soundcloud.com/soulection/soulection-radio-show-492',
    duration: 60,
    playhead: 0,
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
  },
  getters: {
    markers(state) {
      return state.markers
    },
  },
}
