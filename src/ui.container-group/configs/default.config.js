export default /*tw*/ {
  wrapper: "w-full",
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
    base: "flex flex-col",
    variants: {
      gap: {
        none: "space-y-0",
        "2xs": "space-y-1",
        xs: "space-y-2",
        sm: "space-y-3",
        md: "space-y-4",
        lg: "space-y-5",
        xl: "space-y-6",
        "2xl": "space-y-8",
      },
      align: {
        end: "items-end",
        start: "items-start",
        center: "items-center",
        stretch: "items-stretch",
        baseline: "items-baseline",
      },
    },
  },
  defaultVariants: {
    gap: "md",
    align: "start",
    upperlined: true,
    underlined: false,
  },
};
