export default /*tw*/ {
  radioLabel: {
    base: "{ULabel}",
    label: "hover:cursor-pointer",
  },
  radio: {
    base: `
      border cursor-pointer transition checked:text-{color}-600
      border-gray-300 hover:border-gray-400 focus:border-{color}-500 active:border-{color}-800
      focus:ring-{color}-700/15 focus:ring-dynamic focus:ring-offset-dynamic
      disabled:border-gray-300 disabled:text-gray-100
      checked:disabled:border-gray-400 checked:disabled:text-gray-400 disabled:cursor-not-allowed
    `,
    variants: {
      size: {
        sm: "size-4",
        md: "size-5",
        lg: "size-6",
      },
      color: {
        grayscale: "focus:ring-gray-700/15 focus:border-gray-500 active:border-gray-800 checked:text-gray-900",
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
