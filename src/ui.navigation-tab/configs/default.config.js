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
        true: "border-b-2 text-brand-600 border-brand-600",
      },
    },
  },
  defaultVariants: {
    size: "md",
    disabled: false,
  },
};
