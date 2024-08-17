export default /*tw*/ {
  wrapper: {
    base: `w-max pb-2 text-center cursor-pointer`,
    variants: {
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
      },
      disabled: {
        true: "text-gray-500 cursor-not-allowed",
      },
      selected: {
        true: "border-b-2 border-gray-900",
      },
    },
  },
  defaultVariants: {
    size: "md",
    disabled: false,
  },
};
