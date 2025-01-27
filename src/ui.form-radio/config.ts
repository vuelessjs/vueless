export default /*tw*/ {
  radioLabel: "{ULabel}",
  radio: {
    base: `
      border border-gray-300 bg-white cursor-pointer transition
      hover:border-gray-400
      active:border-{color}-600 active:bg-{color}-200
      checked:text-{color}-600
      focus:ring-0 focus:ring-offset-0
      focus-visible:ring-{color}-600 focus-visible:ring-dynamic focus-visible:ring-offset-2
      disabled:border-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed
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
          focus-visible:ring-gray-900
          checked:text-gray-900 checked:hover:text-gray-800 checked:active:text-gray-700
        `,
      },
    },
  },
  defaults: {
    color: "brand",
    labelAlign: "right",
    size: "md",
    checked: false,
    disabled: false,
  },
};
