export default /*tw*/ {
  wrapper: {
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
  tab: "{UTab}",
  defaultVariants: {
    size: "md",
    underlined: false,
  },
};
