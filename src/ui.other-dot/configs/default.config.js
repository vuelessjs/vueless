export default /*tw*/ {
  dot: {
    base: "rounded-full bg-{color}-600",
    variants: {
      color: {
        white: "bg-white",
        grayscale: "bg-gray-900",
      },
      size: {
        xs: "size-0.5",
        sm: "size-1",
        md: "size-1.5",
        lg: "size-2",
        xl: "size-2.5",
      },
    },
  },
  defaults: {
    color: "brand",
    size: "md",
  },
  safelist: (colors) => [{ pattern: `bg-(${colors})-600` }],
};
