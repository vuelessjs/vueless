export default /*tw*/ {
  label: "{ULabel} relative w-full",
  leftSlot: "flex items-center justify-center h-full w-11 absolute left-0",
  rightSlot: "flex items-center justify-center h-full w-11 absolute right-0",
  textareaWrapper: {
    base: `
      transition focus-within:outline-none
      rounded-lg border border-solid border-gray-300 ring-0 cursor-text bg-white pr-4
      hover:border-gray-400 pl-4 hover:focus-within:border-gray-500
      focus-within:border-gray-500 focus-within:ring-4 focus-within:ring-gray-600/[.15]
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
      size: {
        sm: "pt-2 pb-2",
        md: "pt-2.5 pb-2.5",
        lg: "pt-3 pb-3",
      },
    },
    compoundVariants: [
      { labelAlign: "topInside", label: true, class: "pt-5 pb-1.5" },
      { labelAlign: "topInside", label: true, class: "pt-6 pb-1.5" },
      { labelAlign: "topInside", label: true, class: "pt-7 pb-2" },
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
        md: "text-base placeholder:text-base",
        lg: "text-lg placeholder:text-lg",
      },
    },
  },
  defaultVariants: {
    size: "md",
    type: "text",
    inputmode: "text",
    rows: "2",
    labelAlign: "topInside",
    error: false,
    disabled: false,
    readonly: false,
    noAutocomplete: false,
  },
};
