export default /*tw*/ {
  label: {
    wrapper: "inline-flex",
    label: "{ULabel} cursor-pointer",
  },
  radio: {
    base: `
      cursor-pointer
      transition duration-100 ease-in-out
      border border-solid border-{color}-300 text-{color}-500
      hover:border-{color}-400
      active:border-{color}-500
      focus:border-{color}-500 focus:bg-{color}-500 focus:ring-4 focus:ring-{color}-200 focus:ring-offset-0
      disabled:border-{color}-100 disabled:bg-{color}-100
    `,
    variants: {
      size: {
        xs: "size-4",
        sm: "size-5",
        md: "size-6",
        lg: "size-7",
        xl: "size-8",
      },
    },
    compoundVariants: [
      {
        color: "grayscale",
        class: `
          border-gray-300 text-gray-900
          hover:border-gray-400
          active:border-gray-500
          focus:border-gray-500 focus:bg-gray-900 focus:ring-gray-200
          disabled:border-gray-100 disabled:bg-gray-100
        `,
      },
    ],
  },
  defaultVariants: {
    size: "md",
    color: "brand",
    labelAlign: "left",
    disabled: false,
    checked: false,
  },
  safelist: (colors) => [
    { pattern: `border-(${colors})-100`, variants: ["disabled"] },
    { pattern: `border-(${colors})-300` },
    { pattern: `border-(${colors})-400`, variants: ["hover"] },
    { pattern: `border-(${colors})-500`, variants: ["focus", "active"] },
    { pattern: `text-(${colors})-500` },
    { pattern: `ring-(${colors})-200`, variants: ["focus"] },
    { pattern: `bg-(${colors})-100`, variants: ["disabled"] },
    { pattern: `bg-(${colors})-500`, variants: ["focus"] },
  ],
};
