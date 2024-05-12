export default /*tw*/ {
  rating: "flex flex-col",
  label: "",
  wrapper: "",
  iconWrapper: "leading-none flex",
  icon: "",
  selectedIconName: "star-fill",
  unselectedIconName: "star",
  counter: {
    base: "leading-none",
    variants: {
      size: {
        sm: "text-2xs",
        md: "text-xs",
        lg: "text-sm",
      },
    },
  },
  defaultVariants: {
    size: "md",
    modelValue: 0,
    starsNumber: 5,
    selectable: false,
    noCounter: false,
    labelAlign: "topInside",
  },
};
