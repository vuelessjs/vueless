export default /*tw*/ {
  tabs: {
    base: "mb-6 flex",
    variants: {
      size: {
        sm: "gap-5",
        md: "gap-6",
        lg: "gap-7",
      },
      underlined: {
        true: "border-b border-gray-100",
      },
    },
  },
  item: "{UTab}",
  defaults: {
    size: "md",
    underlined: false,
  },
};
