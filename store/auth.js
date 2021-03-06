export default {
  namespaced: true,
  state: () => ({
    user: null,
  }),
  actions: {},
  mutations: {
    SET_USER(state, user) {
      state.user = user
    },
  },
  getters: {
    isSignedIn(state) {
      return !!state.user
    },
  },
}
