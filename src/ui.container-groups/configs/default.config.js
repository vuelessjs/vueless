export default /*tw*/ {
  wrapper: {
    base: "flex flex-col",
    variants: {
      gap: {
        none: "space-y-0",
        xs: "space-y-10",
        sm: "space-y-12",
        md: "space-y-14",
        lg: "space-y-16",
        xl: "space-y-20",
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
  },
};
