export default /*tw*/ {
  checkboxLabel: "{ULabel}",
  checkbox: {
    base: `
      bg-default cursor-pointer transition
      border border-default rounded-small outline-transparent
      hover:border-lifted
      active:border-{color} active:bg-{color}/15
      checked:text-{color}
      focus:ring-0 focus:ring-offset-0
      focus-visible:outline-{color} focus-visible:outline-medium focus-visible:outline-offset-2 focus-visible:transition
      disabled:border-default disabled:bg-lifted disabled:cursor-not-allowed
      disabled:checked:bg-{color}/75 disabled:checked:border-transparent
    `,
    variants: {
      size: {
        sm: "size-4",
        md: "size-5",
        lg: "size-6",
      },
      error: {
        true: "!border-error focus:outline-error",
      },
    },
  },
  checked: {
    base: `
      flex items-center justify-center absolute rounded-small cursor-pointer transition
      bg-{color} hover:bg-{color}-lifted active:bg-{color}-accented
    `,
    variants: {
      size: {
        sm: "size-4",
        md: "size-5",
        lg: "size-6",
      },
      disabled: {
        true: "!bg-{color}/75 cursor-not-allowed",
      },
    },
  },
  checkedIcon: {
    base: "{UIcon} text-inverted",
    defaults: {
      size: {
        sm: "2xs",
        md: "xs",
        lg: "sm",
      },
    },
  },
  defaults: {
    color: "primary",
    size: "md",
    labelAlign: "right",
    partial: false,
    disabled: false,
    /* icons */
    partiallyCheckedIcon: "remove",
    checkedIcon: "check",
  },
};
