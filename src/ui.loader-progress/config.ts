export default /*tw*/ {
  progress: {
    base: "top-0 left-0 right-0 fixed transition-all ease-linear bg-{color}",
    variants: {
      size: {
        xs: "h-px",
        sm: "h-0.5",
        md: "h-[3px]",
        lg: "h-1",
      },
      error: {
        true: "bg-error",
      },
    },
  },
  defaults: {
    color: "primary",
    size: "md",
    loading: undefined,
  },
};
