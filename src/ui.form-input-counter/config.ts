export default /*tw*/ {
  wrapper: "flex items-center gap-2 w-fit",
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
    base: "{UInputNumber} w-inherit",
    numberInput: {
      base: "{UInput}",
      input: "text-center",
    },
  },
  actionButton: {
    base: "{UButton}",
    defaults: {
      color: "neutral",
      size: {
        sm: "2xs",
        md: "xs",
        lg: "sm",
      },
    },
  },
  addButton: "{>actionButton}",
  subtractButton: "{>actionButton}",
  addIcon: "{UIcon}",
  subtractIcon: "{UIcon}",
  /* These are used for a11y. */
  i18n: {
    add: "Add",
    subtract: "Subtract",
  },
  defaults: {
    size: "md",
    decimalSeparator: ",",
    thousandsSeparator: " ",
    prefix: "",
    step: 1,
    min: 0,
    max: 999,
    minFractionDigits: 0,
    maxFractionDigits: 2,
    debounce: 0,
    readonly: false,
    disabled: false,
    /* icons */
    subtractIcon: "remove",
    addIcon: "add",
  },
};
