export default {
  state: () => ({
    supportModal: false,
  }),
  mutations: {
    OPEN_SUPPORT_MODAL(state) {
      state.supportModal = true
    },
    CLOSE_SUPPORT_MODAL(state) {
      state.supportModal = false
    },
  },
}
