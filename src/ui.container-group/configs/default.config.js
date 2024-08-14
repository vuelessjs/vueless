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
  defaultVariants: {
    upperlined: true,
    underlined: false,
  },
};
