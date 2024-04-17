export default /*tw*/ {
  wrapper: "",
  upperline: "",
  header: {
    base: "flex items-center justify-between",
    variants: {
      underlined: {
        false: "pb-6",
      },
    },
  },
  headerFallback: "flex items-center",
  title: "pr-2",
  underline: "pt-1.5",
  content: {
    variants: {
      size: {
        sm: "space-y-2",
        md: "space-y-4",
        lg: "space-y-6",
      },
    },
  },
  defaultVariants: {
    size: "md",
    upperlined: true,
    underlined: false,
  },
};
