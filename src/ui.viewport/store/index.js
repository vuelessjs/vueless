export default {
  namespaced: true,

  state: {
    breakpoint: "",
    mobileDevices: ["xs", "sm"],
    portableDevices: ["xs", "sm", "md"],
  },

  getters: {
    isLaptopDevice(state) {
      const { breakpoint } = state;

      return breakpoint === "lg";
    },

    isTabletDevice(state) {
      const { breakpoint } = state;

      return breakpoint === "md";
    },

    isMobileDevice(state) {
      const { breakpoint, mobileDevices } = state;

      return mobileDevices.includes(breakpoint);
    },

    isPortableDevice(state) {
      const { breakpoint, portableDevices } = state;

      return portableDevices.includes(breakpoint);
    },

    elementSize(state, getters) {
      const { isMobileDevice } = getters;

      return isMobileDevice ? "md" : "lg";
    },
  },

  mutations: {
    SET_BREAKPOINT(state, breakpoint) {
      state.breakpoint = breakpoint;
    },
  },
};
