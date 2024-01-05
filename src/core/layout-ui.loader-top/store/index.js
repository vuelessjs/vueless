export default {
  namespaced: true,

  state: {
    isLoading: false,
    requestQueue: [],
    loaderRequestQueue: [],
    loaderRequestTimeout: 0,
    componentLoaderRequestQueue: [],
  },

  mutations: {
    SET_LOADING_ON: (state, url) => {
      state.loaderRequestQueue.push(url);

      state.isLoading = true;

      clearTimeout(state.loaderRequestTimeout);
    },

    SET_LOADING_OFF: (state, url) => {
      state.loaderRequestQueue.forEach((item, index) => {
        if (item === url) {
          state.loaderRequestQueue.splice(index, 1);
        }
      });

      state.requestTimeout = setTimeout(() => {
        if (!state.loaderRequestQueue.length) {
          state.isLoading = false;
        }
      }, 50);
    },

    ADD_REQUEST_URL: (state, url) => {
      state.requestQueue.push(url);
    },

    REMOVE_REQUEST_URL: (state, url) => {
      state.requestQueue.forEach((item, index) => {
        if (item === url) {
          state.requestQueue.splice(index, 1);
        }
      });
    },

    SET_COMPONENT_REQUEST_QUEUE(state, requests) {
      state.componentLoaderRequestQueue = [...state.componentLoaderRequestQueue, ...requests];
    },

    REMOVE_COMPONENT_REQUEST_QUEUE(state) {
      state.componentLoaderRequestQueue = [];
    },
  },
};
