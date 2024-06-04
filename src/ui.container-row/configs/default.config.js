export default /*tw*/ {
  wrapper: {
    base: "flex flex-col md:flex-row w-full",
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
      align: {
        end: "items-end",
        start: "items-start",
        center: "items-center",
        stretch: "items-stretch",
        baseline: "items-baseline",
      },
      noMobile: {
        true: "flex-row",
      },
    },
  },
  defaultVariants: {
    gap: "md",
    align: "start",
    noMobile: false,
  },
};
