export default /*tw*/ {
  label: {
    component: "{ULabel} pt-1 -top-10 !leading-none text-gray-500",
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
      disabled: {
        true: "focus-within:ring-0 focus-within:ring-offset-0 pointer-events-none",
      },
    },
  },
  defaults: {
    size: "md",
    labelAlign: "topWithDesc",
    disabled: false,
    step: 1,
    min: 1,
    max: 999,
    /* icons */
    removeIcon: "remove",
    addIcon: "add",
  },
};
