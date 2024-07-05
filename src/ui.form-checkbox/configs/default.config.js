export default /*tw*/ {
  label: "w-auto max-w-max relative", // TODO: label classes should be defined in ULabel component
  partialIconName: "remove",
  selectedIconName: "check",
  iconWrapper: {
    base: "flex items-center justify-center absolute rounded bg-{color}-500",
    variants: {
      size: {
        xs: "size-4",
        sm: "size-5",
        md: "size-6",
        lg: "size-7",
        xl: "size-8",
      },
      color: {
        grayscale: "border-gray-900 bg-gray-900",
      },
    },
  },
  icon: "",
  checkbox: {
    base: `
      border border-solid rounded border-gray-300 bg-white hover:transition
      hover:border-gray-400
      focus:border-{color}-500 focus:ring-4 focus:ring-opacity-20 focus:ring-offset-0 focus:ring-{color}-500
      active:border-{color}-500 active:bg-{color}-500
      checked:border-{color}-500 checked:bg-{color}-500 checked:text-{color}-500
      checked:hover:bg-{color}-500 checked:focus:text-{color}-500 checked:active:text-{color}-500
    `,
    variants: {
      size: {
        xs: "size-4 text-xs",
        sm: "size-5 text-sm",
        md: "size-6",
        lg: "size-7 text-lg",
        xl: "size-8 text-xl",
      },
      color: {
        grayscale: `
          focus:border-gray-500 focus:ring-gray-500
          checked:border-gray-900 checked:bg-gray-900 checked:text-gray-900
          active:border-gray-900 active:bg-gray-900
        `,
      },
      disabled: {
        true: `
          border-gray-100 bg-gray-100 opacity-50
          hover:border-gray-100 hover:bg-gray-100 hover:opacity-50
          active:border-gray-100 active:bg-gray-100 active:opacity-50
        `,
      },
    },
  },
  defaultVariants: {
    color: "brand",
    size: "md",
    labelAlign: "left",
    partial: false,
    disabled: false,
  },
  safelist: (colors) => [
    { pattern: `bg-(${colors})-500`, variants: ["active", "checked", "checked:hover"] },
    { pattern: `border-(${colors})-500`, variants: ["focus", "active", "checked"] },
    { pattern: `text-(${colors})-500`, variants: ["checked:focus", "checked", "checked:active"] },
    { pattern: `ring-(${colors})-500`, variants: ["focus"] },
  ],
};
