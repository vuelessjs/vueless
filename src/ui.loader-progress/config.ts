export default /*tw*/ {
  stripe: {
    base: "top-0 left-0 right-0 fixed transition-all ease-linear bg-{color}-600",
    variants: {
      color: {
        white: "bg-white",
        grayscale: "bg-gray-900",
      },
      size: {
        xs: "h-px",
        sm: "h-0.5",
        md: "h-[3px]",
        lg: "h-1",
      },
      error: {
        true: "bg-red-600",
      },
    },
  },
  defaults: {
    color: "primary",
    size: "md",
    loading: undefined,
  },
};
