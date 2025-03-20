export default /*tw*/ {
  wrapper: "w-full",
  header: {
    base: "flex items-center justify-between mb-6 border-muted",
    variants: {
      upperlined: {
        true: "border-t pt-6",
      },
      underlined: {
        true: "border-b pb-1.5",
      },
    },
  },
  headerLeftFallback: "flex items-center",
  title: "{UHeader} pr-2",
  content: "",
  defaults: {
    upperlined: false,
    underlined: false,
  },
};
