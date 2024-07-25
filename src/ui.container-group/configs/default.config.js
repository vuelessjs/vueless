export default /*tw*/ {
  wrapper: "w-full",
  upperline: "{UDivider}",
  header: {
    base: "flex items-center justify-between",
    variants: {
      underlined: {
        false: "pb-6",
      },
    },
  },
  headerFallback: "flex items-center",
  title: "{UHeader} pr-2",
  underline: "{UDivider} pt-1.5",
  content: {
    base: "flex flex-col",
    variants: {
      reverse: {
        false: "flex-col",
        true: "flex-col-reverse",
      },
      wrap: {
        true: "flex-wrap",
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
  defaultVariants: {
    gap: "md",
    align: "start",
    justify: "start",
    wrap: false,
    reverse: false,
    upperlined: true,
    underlined: false,
  },
};
