export default /*tw*/ {
  wrapper: "w-full",
  upperline: "{UDivider}",
  underline: {
    component: "{UDivider}",
    variants: {
      underlined: {
        true: "pt-1.5",
      },
    },
  },
  header: "flex items-center justify-between",
  headerLeftFallback: "flex items-center",
  title: "{UHeader} pr-2",
  content: {
    base: "flex flex-col items-stretch",
    variants: {
      gap: {
        none: "gap-0",
        xs: "gap-8",
        sm: "gap-10",
        md: "gap-12",
        lg: "gap-14",
        xl: "gap-16",
      },
    },
  },
  defaults: {
    gap: "md",
    upperlined: false,
    underlined: false,
  },
};
