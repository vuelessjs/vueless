export default /*tw*/ {
  wrapper: {
    base: "rounded-full bg-{color}-500 mr-1",
    variants: {
      color: {
        white: "bg-white",
        grayscale: "bg-gray-900",
      },
      size: {
        sm: "size-1",
        md: "size-1.5",
        lg: "size-2",
      },
    },
  },
  defaultVariants: {
    color: "brand",
    size: "md",
  },
  safelist: (colors) => [{ pattern: `bg-(${colors})-500` }],
};
