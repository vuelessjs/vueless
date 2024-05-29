export default /*tw*/ {
  wrapper: {
    base: "flex flex-col md:flex-row w-full",
    variants: {
      gap: {
        none: "space-y-0 md:space-x-0",
        "2xs": "space-y-1 md:space-x-1",
        xs: "space-y-2 md:space-x-2",
        sm: "space-y-3 md:space-x-3",
        md: "space-y-4 md:space-x-4",
        lg: "space-y-5 md:space-x-5",
        xl: "space-y-6 md:space-x-6",
        "2xl": "space-y-8 md:space-x-8",
      },
      align: {
        end: "items-end",
        start: "items-start",
        center: "items-center",
        stretch: "items-stretch",
        baseline: "items-baseline",
      },
      noMobile: {
        true: "flex-row space-y-0",
        false: "md:space-y-0",
      },
    },
    compoundVariants: [
      { gap: "none", noMobile: true, class: "space-x-0" },
      { gap: "2xs", noMobile: true, class: "space-x-1" },
      { gap: "xs", noMobile: true, class: "space-x-2" },
      { gap: "sm", noMobile: true, class: "space-x-3" },
      { gap: "md", noMobile: true, class: "space-x-4" },
      { gap: "lg", noMobile: true, class: "space-x-5" },
      { gap: "xl", noMobile: true, class: "space-x-6" },
      { gap: "2xl", noMobile: true, class: "space-x-8" },
    ],
  },
  defaultVariants: {
    gap: "md",
    align: "start",
    noMobile: false,
  },
};
