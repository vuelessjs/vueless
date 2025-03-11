export default /*tw*/ {
  transition: {
    enterFromClass: "scale-110 transform",
    leaveActiveClass: "scale-110 transform",
  },
  overlay: {
    base: `
      bg-{color} text-inverted
      h-screen w-screen
      flex justify-center items-center
      fixed left-0 top-0 z-[9999]
      transition duration-300
    `,
    variants: {
      color: {
        grayscale: "bg-lifted text-default",
      },
    },
  },
  nestedLoader: "{ULoader}",
  defaults: {
    color: "primary",
    loading: undefined,
  },
};
