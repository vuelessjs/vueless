export default /*tw*/ {
  wrapper: {
    base: "flex flex-col",
    variants: {
      reverse: {
        false: "flex-col",
        true: "flex-col-reverse",
      },
      wrap: {
        true: "flex-wrap",
      },
      block: {
        true: "w-full",
      },
      gap: {
        none: "gap-0",
        "3xs": "gap-0.5",
        "2xs": "gap-1",
        xs: "gap-2",
        sm: "gap-3",
        md: "gap-4",
        lg: "gap-5",
        xl: "gap-6",
        "2xl": "gap-7",
        "3xl": "gap-8",
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
    reverse: false,
  },
};
