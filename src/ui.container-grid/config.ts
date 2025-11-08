export default /*tw*/ {
  wrapper: {
    base: "grid",
    variants: {
      gap: {
        none: "gap-0",
        "2xs": "gap-1",
        xs: "gap-2",
        sm: "gap-3",
        md: "gap-4",
        lg: "gap-5",
        xl: "gap-6",
        "2xl": "gap-8",
      },
      rowGap: {
        none: "gap-y-0",
        "2xs": "gap-y-1",
        xs: "gap-y-2",
        sm: "gap-y-3",
        md: "gap-y-4",
        lg: "gap-y-5",
        xl: "gap-y-6",
        "2xl": "gap-y-8",
      },
      colGap: {
        none: "gap-x-0",
        "2xs": "gap-x-1",
        xs: "gap-x-2",
        sm: "gap-x-3",
        md: "gap-x-4",
        lg: "gap-x-5",
        xl: "gap-x-6",
        "2xl": "gap-x-8",
      },
      align: {
        start: "items-start",
        end: "items-end",
        center: "items-center",
        stretch: "items-stretch",
        baseline: "items-baseline",
      },
      justify: {
        start: "justify-items-start",
        end: "justify-items-end",
        center: "justify-items-center",
        stretch: "justify-items-stretch",
      },
      dense: {
        true: "grid-flow-dense",
      },
    },
  },
  defaultVariants: {
    tag: "div",
  },
};
