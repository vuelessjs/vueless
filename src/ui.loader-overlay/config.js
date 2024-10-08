export default /*tw*/ {
  transition: {
    enterFromClass: "scale-110 transform",
    leaveActiveClass: "scale-110 transform",
  },
  overlay: {
    base: `
      bg-{color}-600
      h-screen w-screen
      flex justify-center items-center
      fixed left-0 top-0 z-[9999]
      transition duration-300
    `,
    variants: {
      color: {
        white: "bg-white",
        grayscale: "bg-gray-800",
      },
    },
  },
  nestedLoader: "{ULoader}",
  defaults: {
    color: "brand",
    loading: undefined,
  },
  safelist: (colors) => [{ pattern: `bg-(${colors})-600` }],
};
