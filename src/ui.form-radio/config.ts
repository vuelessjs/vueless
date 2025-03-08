export default /*tw*/ {
  radioLabel: "{ULabel}",
  radio: {
    base: `
      border border-default bg-default cursor-pointer transition
      hover:border-lifted
      active:border-{color} active:bg-{color}/15
      checked:text-{color}
      focus:ring-0 focus:outline-none focus:ring-offset-0
      focus-visible:outline-{color} focus-visible:outline-medium focus-visible:outline-offset-2
      disabled:border-default disabled:bg-gray-100 disabled:cursor-not-allowed
      disabled:checked:bg-gray-400 disabled:checked:border-transparent
    `,
    variants: {
      size: {
        sm: "size-4",
        md: "size-5",
        lg: "size-6",
      },
      color: {
        grayscale: `
          focus-visible:outline-gray-900
          checked:text-gray-900 checked:hover:text-gray-800 checked:active:text-gray-700
        `,
      },
    },
  },
  defaults: {
    color: "primary",
    labelAlign: "right",
    size: "md",
    checked: false,
    disabled: false,
  },
};
