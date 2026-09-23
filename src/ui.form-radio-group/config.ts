export default /*tw*/ {
  groupLabel: "{ULabel}",
  groupRadio: "{URadio}",
  list: {
    base: "flex flex-col",
    variants: {
      size: {
        sm: "gap-2",
        md: "gap-2",
        lg: "gap-2.5",
      },
    },
    compoundVariants: [
      { size: "sm", label: true, class: "mt-1" },
      { size: "md", label: true, class: "mt-1.5" },
      { size: "lg", label: true, class: "mt-2" },
    ],
  },
  defaults: {
    color: "primary",
    size: "md",
    labelKey: "label",
    valueKey: "value",
    disabled: false,
  },
};
