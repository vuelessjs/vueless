export default /*tw*/ {
  label: "relative w-full",
  leftSlot: "flex items-center justify-center h-full w-11 absolute left-0",
  rightSlot: "flex items-center justify-center h-full w-11 absolute right-0",
  textareaWrapper: {
    base: `
      transition duration-100 ease-in-out focus-within:outline-none rounded-lg border
      border-solid border-gray-300 focus-within:border-gray-500 focus-within:ring-4
      focus-within:ring-gray-600/[.15] ring-0 hover:border-gray-400 pl-4 hover:focus-within:border-gray-500
      cursor-text bg-white
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
        true: "ring-0 border-gray-300 focus-within:ring-0 focus-within:border-gray-300",
      },
      size: {
        sm: "pb-2 pr-4 pt-6",
        md: "pb-2.5 pr-4 pt-7",
        lg: "pb-3 pr-4 pt-8",
      },
    },
    compoundVariants: [
      { labelAlign: "top", size: "sm", class: "pt-2" },
      { labelAlign: "top", size: "md", class: "pt-2.5" },
      { labelAlign: "top", size: "lg", class: "pt-3" },
      { labelAlign: "topInside", label: false, class: "pt-2" },
      { labelAlign: "topInside", label: false, class: "pt-2.5" },
      { labelAlign: "topInside", label: false, class: "pt-3" },
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
    inputMode: "text",
    rows: "2",
    labelAlign: "topInside",
    error: false,
    disabled: false,
    readonly: false,
    noAutocomplete: false,
  },
};
