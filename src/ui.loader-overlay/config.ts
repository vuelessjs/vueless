export default /*tw*/ {
  overlay: {
    base: `
      bg-default
      h-screen w-screen
      flex justify-center items-center
      fixed left-0 top-0 z-[9999]
      transition duration-300
    `,
  },
  overlayTransition: {
    leaveActiveClass: "scale-110 transform",
  },
  nestedLoader: "{ULoader}",
  defaults: {
    color: "primary",
    loading: undefined,
  },
};
