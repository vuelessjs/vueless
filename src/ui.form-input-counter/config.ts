export default /*tw*/ {
  wrapper: "flex items-center gap-2",
  counterText: {
    variants: {
      size: {
        sm: "text-small px-1",
        md: "text-medium px-1.5",
        lg: "text-large px-2",
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
    readonly: false,
    disabled: false,
    /* icons */
    subtractIcon: "remove",
    addIcon: "add",
  },
};
