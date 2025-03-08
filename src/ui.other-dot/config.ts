export default /*tw*/ {
  dot: {
    base: "rounded-full bg-{color}",
    variants: {
      color: {
        white: "bg-default",
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
    color: "primary",
    size: "md",
  },
};
