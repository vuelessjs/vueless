export default /*tw*/ {
  wrapper: {
    base: "w-max text-center cursor-pointer -mb-px",
    variants: {
      size: {
        sm: "text-xs pb-1",
        md: "text-sm pb-2",
        lg: "text-base pb-3",
      },
      disabled: {
        true: "text-gray-400 cursor-not-allowed",
      },
      selected: {
        true: "border-b-2 text-brand-700 border-brand-700",
      },
    },
  },
  defaultVariants: {
    size: "md",
    disabled: false,
  },
};
