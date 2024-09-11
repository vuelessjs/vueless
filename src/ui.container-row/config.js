export default /*tw*/ {
  wrapper: {
    base: "flex w-full",
    variants: {
      reverse: {
        false: "flex-col md:flex-row",
        true: "flex-col-reverse md:flex-row-reverse",
      },
      wrap: {
        true: "flex-wrap",
      },
      noMobile: {
        true: "flex-row",
      },
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
      justify: {
        end: "justify-end",
        start: "justify-start",
        center: "justify-center",
        around: "justify-around",
        evenly: "justify-evenly",
        between: "justify-between",
      },
    },
  },
  defaults: {
    gap: "md",
    align: "start",
    justify: "start",
    wrap: false,
    reverse: false,
    noMobile: false,
  },
};
