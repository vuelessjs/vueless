export default /*tw*/ {
  label: "{ULabel}",
  checkbox: {
    base: `
      border rounded bg-white cursor-pointer transition checked:text-{color}-600
      border-gray-300 hover:border-gray-400 focus:border-{color}-500 active:border-{color}-800
      focus:ring-{color}-700/15 focus:ring-dynamic focus:ring-offset-dynamic
      disabled:border-gray-300 disabled:bg-gray-100
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
      error: {
        true: "focus:ring-red-700/15 border-red-300 hover:border-red-400 focus:border-red-500 bg-red-50",
      },
    },
  },
  iconWrapper: {
    base: `
      flex items-center justify-center absolute rounded cursor-pointer transition
      bg-{color}-600 hover:bg-{color}-700 active:bg-{color}-800
    `,
    variants: {
      size: {
        sm: "size-4",
        md: "size-5",
        lg: "size-6",
      },
      color: {
        grayscale: "border-gray-900 bg-gray-900",
      },
      disabled: {
        true: "border-gray-400 bg-gray-400",
      },
    },
  },
  checkedIcon: "{UIcon}",
  defaults: {
    partiallyCheckedIcon: "remove",
    checkedIcon: "check",
    color: "brand",
    size: "md",
    labelAlign: "right",
    partial: false,
    disabled: false,
  },
  safelist: (colors) => [
    { pattern: `bg-(${colors})-600` },
    { pattern: `bg-(${colors})-700`, variants: ["hover"] },
    { pattern: `bg-(${colors})-800`, variants: ["active"] },
    { pattern: `border-(${colors})-500`, variants: ["focus"] },
    { pattern: `border-(${colors})-800`, variants: ["active"] },
    { pattern: `text-(${colors})-600`, variants: ["checked"] },
    { pattern: `ring-(${colors})-700`, variants: ["focus"] },
  ],
};
