export default /*tw*/ {
  label: "{ULabel}",
  leftSlot: "flex items-center justify-center h-full w-11 absolute left-0",
  rightSlot: "flex items-center justify-center h-full w-11 absolute right-0",
  textareaWrapper: {
    base: `
      px-3 py-2 rounded-dynamic border border-gray-300 cursor-text bg-white transition
      hover:border-gray-400 hover:focus-within:border-gray-500
      focus-within:outline-none focus-within:border-gray-500 focus-within:ring-4 focus-within:ring-gray-600/[.15]
    `,
    variants: {
      error: {
        true: `
          border-red-300
          hover:border-red-400 hover:focus-within:border-red-500
          focus-within:border-red-500 focus-within:ring-red-100
        `,
      },
      disabled: {
        true: "cursor-not-allowed border-none focus-within:ring-0 bg-gray-100",
      },
      readonly: {
        true: "ring-0 border-gray-300 focus-within:ring-0 focus-within:border-brand-300",
      },
    },
    compoundVariants: [
      { labelAlign: "topInside", label: true, size: "sm", class: "pt-5" },
      { labelAlign: "topInside", label: true, size: "md", class: "pt-6" },
      { labelAlign: "topInside", label: true, size: "lg", class: "pt-7" },
    ],
  },
  textarea: {
    base: `
      placeholder:font-normal placeholder:text-gray-400 shadow-none w-full
      disabled:cursor-not-allowed font-normal text-gray-900 resize-none block
      border-none focus:border-none focus:outline-none focus:ring-0 p-0
      bg-transparent
    `,
    variants: {
      size: {
        sm: "text-xs placeholder:text-xs",
        md: "text-sm placeholder:text-sm",
        lg: "text-base placeholder:text-base",
      },
    },
  },
  defaultVariants: {
    rows: "2",
    size: "md",
    type: "text",
    inputmode: "text",
    labelAlign: "topInside",
    error: false,
    disabled: false,
    readonly: false,
    noAutocomplete: false,
  },
};
