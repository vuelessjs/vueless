export default /*tw*/ {
  inputNumberLabel: {
    component: "{ULabel}",
    content: "gap-6 items-center",
  },
  number: "",
  removeButton: "{UButton}",
  removeIcon: "{UIcon}",
  addButton: "{UButton}",
  addIcon: "{UIcon}",
  value: {
    base: "font-bold select-none !leading-none",
    variants: {
      size: {
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
      },
    },
  },
  label: {
    base: "pt-1 !leading-none text-gray-500",
    variants: {
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
      },
    },
  },
  defaults: {
    size: "md",
    step: 1,
    min: 1,
    max: 999,
    /* icons */
    removeIcon: "remove",
    addIcon: "add",
  },
};
