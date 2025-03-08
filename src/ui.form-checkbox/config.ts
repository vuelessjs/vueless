export default /*tw*/ {
  checkboxLabel: "{ULabel}",
  checkbox: {
    base: `
      border border-default rounded-small bg-default cursor-pointer transition
      hover:border-lifted
      active:border-{color} active:bg-{color}/15
      checked:text-{color}
      focus:ring-0 focus:ring-offset-0
      focus-visible:outline-{color} focus-visible:outline-medium focus-visible:outline-offset-2
      disabled:border-default disabled:bg-neutral/10 disabled:cursor-not-allowed
      disabled:checked:bg-neutral-muted disabled:checked:border-transparent
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
  iconWrapper: {
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
        true: "!border-lifted !bg-neutral-muted cursor-not-allowed",
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
