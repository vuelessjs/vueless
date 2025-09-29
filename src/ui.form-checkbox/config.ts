export default /*tw*/ {
  checkboxLabel: "{ULabel}",
  checkbox: {
    base: `
      bg-default cursor-pointer transition
      border border-solid border-default rounded-small outline-transparent
      appearance-none p-0 print:color-adjust-exact inline-block align-middle bg-origin-border select-none shrink-0
      hover:border-lifted
      active:border-{color} active:bg-{color}/15
      checked:text-{color}
      focus-visible:outline-{color} focus-visible:outline-medium focus-visible:outline-offset-2 focus-visible:transition
      disabled:border-default disabled:bg-lifted disabled:cursor-not-allowed
      disabled:checked:bg-{color}/(--vl-disabled-opacity) disabled:checked:border-transparent
    `,
    variants: {
      size: {
        sm: "size-4",
        md: "size-5",
        lg: "size-6",
      },
      error: {
        true: "!border-error focus-visible:outline-error",
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
        true: "!bg-{color}/(--vl-disabled-opacity) cursor-not-allowed",
      },
    },
  },
  partiallyChecked: "{>checked}",
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
  partiallyCheckedIcon: "{>checkedIcon}",
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
