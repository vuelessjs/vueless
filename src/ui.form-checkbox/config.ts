export default /*tw*/ {
  checkboxLabel: "{ULabel}",
  checkbox: {
    base: `
      border border-gray-300 rounded-dynamic-sm bg-white cursor-pointer transition
      hover:border-gray-400
      active:border-{color}-600 active:bg-{color}-200
      checked:text-{color}-600
      focus:ring-0 focus:ring-offset-0
      focus-visible:outline-{color}-600 focus-visible:outline-dynamic focus-visible:outline-offset-2
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
        grayscale: "focus-visible:outline-gray-900 active:bg-gray-200 checked:text-gray-900",
      },
      error: {
        true: "!border-red-600 focus:outline-red-600",
      },
    },
  },
  iconWrapper: {
    base: `
      flex items-center justify-center absolute rounded-dynamic-sm cursor-pointer transition
      bg-{color}-600 hover:bg-{color}-700 active:bg-{color}-800
    `,
    variants: {
      size: {
        sm: "size-4",
        md: "size-5",
        lg: "size-6",
      },
      color: {
        grayscale: "bg-gray-900 hover:bg-gray-800 active:bg-gray-700",
      },
      disabled: {
        true: "!border-gray-400 !bg-gray-400 cursor-not-allowed",
      },
    },
  },
  checkedIcon: {
    base: "{UIcon}",
    defaults: {
      size: {
        sm: "2xs",
        md: "xs",
        lg: "sm",
      },
    },
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
