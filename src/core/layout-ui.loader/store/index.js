export default {
  namespaced: true,

  state: {
    isRenderingPage: true,
  },

  mutations: {
    SET_RENDERING_STARTED(state) {
      state.isRenderingPage = true;
    },

    SET_RENDERING_FINISHED(state) {
      state.isRenderingPage = false;
    },
  },
};
