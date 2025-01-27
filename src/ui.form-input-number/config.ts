export default /*tw*/ {
  label: {
    base: "{ULabel}",
    content: {
      base: "items-center",
      variants: {
        size: {
          sm: "gap-3",
          md: "gap-3.5",
          lg: "gap-4",
        },
      },
    },
  },
  number: "",
  addButton: "{UButton}",
  removeButton: "{UButton}",
  actionIcon: {
    base: "{UIcon}",
    defaults: {
      size: {
        sm: "xs",
        md: "sm",
        lg: "md",
      },
    },
  },
  addIcon: "{>actionIcon}",
  removeIcon: "{>actionIcon}",
  value: {
    base: "font-bold select-none !leading-none",
    variants: {
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
      },
      disabled: {
        true: "pointer-events-none",
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
