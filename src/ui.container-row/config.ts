export default /*tw*/ {
  wrapper: {
    base: "flex",
    variants: {
      reverse: {
        false: "flex-row",
        true: "flex-row-reverse",
      },
      wrap: {
        true: "flex-wrap",
      },
      block: {
        true: "w-full",
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
      content: {
        end: "content-end",
        start: "content-start",
        center: "content-center",
        around: "content-around",
        evenly: "content-evenly",
        normal: "content-normal",
        stretch: "content-stretch",
        between: "content-between",
        baseline: "content-baseline",
      },
    },
  },
  defaults: {
    gap: "md",
    align: "start",
    content: "start",
    justify: "start",
    wrap: false,
    block: false,
    reverse: false,
  },
};
