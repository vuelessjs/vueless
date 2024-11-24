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
  content: "",
  defaults: {
    upperlined: false,
    underlined: false,
  },
};
