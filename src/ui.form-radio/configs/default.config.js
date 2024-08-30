export default /*tw*/ {
  radioLabel: "{ULabel}",
  radio: {
    base: `
      border cursor-pointer transition checked:text-{color}-600
      border-gray-300 hover:border-gray-400 focus:border-{color}-500 active:border-{color}-800
      focus:ring-{color}-700/15 focus:ring-dynamic focus:ring-offset-dynamic
      disabled:border-gray-300 disabled:text-gray-100
      checked:disabled:border-gray-400 checked:disabled:text-gray-400
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
  safelist: (colors) => [
    { pattern: `border-(${colors})-500`, variants: ["focus"] },
    { pattern: `border-(${colors})-800`, variants: ["active"] },
    { pattern: `text-(${colors})-600`, variants: ["checked"] },
    { pattern: `ring-(${colors})-700`, variants: ["focus"] },
  ],
};
