export default /*tw*/ {
  checkboxLabel: "{ULabel}",
  checkboxBase: {
    base: "rounded-small cursor-pointer transition",
    variants: {
      size: {
        sm: "size-4 -ml-4",
        md: "size-5 -ml-5",
        lg: "size-6 -ml-6",
      },
    },
  },
  checkbox: {
    base: `
      {>checkboxBase} ml-0 bg-default border border-solid border-default outline-transparent
      appearance-none p-0 print:color-adjust-exact inline-block align-middle bg-origin-border select-none shrink-0
      hover:border-lifted
      active:border-{color} active:bg-{color}/15
      checked:text-{color}
      focus-visible:outline-{color} focus-visible:outline-medium focus-visible:outline-offset-2 focus-visible:transition
      disabled:border-default disabled:bg-lifted disabled:cursor-not-allowed
      disabled:checked:bg-{color}/(--vl-disabled-opacity) disabled:checked:border-transparent
    `,
    variants: {
      error: {
        true: "border-error! focus-visible:outline-error",
      },
    },
  },
  checked: {
    base: `
      {>checkboxBase} flex items-center justify-center relative
      bg-{color} hover:bg-{color}-lifted active:bg-{color}-accented
    `,
    variants: {
      disabled: {
        true: "bg-{color}/(--vl-disabled-opacity)! cursor-not-allowed",
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
  partiallyChecked: "{>checked}",
  partiallyCheckedIcon: "{>checkedIcon}",
  i18n: {
    /* These are used for a11y. */
    checkbox: "Checkbox",
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
