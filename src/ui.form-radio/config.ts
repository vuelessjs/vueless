export default /*tw*/ {
  radioLabel: "{ULabel}",
  radio: {
    base: `
      bg-default cursor-pointer transition
      border border-default outline-transparent
      hover:border-lifted hover:checked:border-{color}
      active:border-{color} active:bg-{color}/15
      checked:bg-{color} checked:border-{color}
      checked:bg-radial-[circle_at_50%_50%] from-(--vl-bg) from-28% to-transparent to-32%
      focus:ring-0 focus:ring-offset-0
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
