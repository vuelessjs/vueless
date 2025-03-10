export default /*tw*/ {
  transition: {
    enterFromClass: "scale-110 transform",
    leaveActiveClass: "scale-110 transform",
  },
  overlay: {
    base: `
      bg-{color}-100 dark:bg-{color}-950
      h-screen w-screen
      flex justify-center items-center
      fixed left-0 top-0 z-[9999]
      transition duration-300
    `,
  },
  nestedLoader: "{ULoader}",
  defaults: {
    color: "primary",
    loading: undefined,
  },
};
