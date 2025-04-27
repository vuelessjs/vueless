export default /*tw*/ {
  wrapper: "flex items-center gap-2",
  counterText: {
    base: "px-2",
    variants: {
      size: {
        sm: "text-small",
        md: "text-medium",
        lg: "text-large",
      },
    },
  },
  counterInput: {
    base: "{UInputNumber} w-fit",
    numberInput: {
      base: "{UInput}",
      input: "text-center",
    },
  },
  actionButton: {
    base: "{UButton}",
    defaults: {
      size: {
        sm: "2xs",
        md: "xs",
        lg: "sm",
      },
    },
  },
  addButton: "{UButton} {>actionButton}",
  subtractButton: "{UButton} {>actionButton}",
  addIcon: "{UIcon}",
  subtractIcon: "{UIcon}",
  defaults: {
    size: "md",
    step: 1,
    min: 1,
    max: 999,
    editable: false,
    disabled: false,
    /* icons */
    subtractIcon: "remove",
    addIcon: "add",
  },
};
