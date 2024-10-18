export default /*tw*/ {
  stripe: {
    base: "top-0 left-0 right-0 fixed h-[3px] transition-all ease-linear bg-{color}-600",
    variants: {
      color: {
        white: "bg-white",
        grayscale: "bg-gray-900",
      },
      error: {
        true: "bg-red-600",
      },
    },
  },
  defaults: {
    color: "brand",
    loading: false,
  },
  safelist: (colors) => [{ pattern: `bg-(${colors})-600` }],
};
