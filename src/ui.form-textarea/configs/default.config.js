export default /*tw*/ {
  label: "{ULabel}",
  leftSlot: "flex items-center justify-center h-full w-11 absolute left-0",
  rightSlot: "flex items-center justify-center h-full w-11 absolute right-0",
  textareaWrapper: {
    base: `
      px-3 py-2 bg-white transition
      rounded-dynamic border border-gray-300 hover:border-gray-400 hover:focus-within:border-brand-500 focus-within:border-brand-500
      focus-within:ring-dynamic focus-within:ring-offset-dynamic focus-within:ring-brand-700/15 focus-within:outline-none
    `,
    variants: {
      error: {
        true: `
          bg-red-50 border-red-300
          hover:border-red-400 hover:focus-within:border-red-500
          focus-within:border-red-500 focus-within:ring-red-700/15
        `,
      },
      disabled: {
        true: "focus-within:ring-0 focus-within:ring-offset-0 bg-gray-100 pointer-events-none",
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
      p-0 block w-full bg-transparent border-none font-normal text-gray-900
      placeholder:font-normal placeholder:text-gray-400
      focus:border-none focus:outline-none focus:ring-0
    `,
    variants: {
      size: {
        sm: "text-xs placeholder:text-xs",
        md: "text-sm placeholder:text-sm",
        lg: "text-base placeholder:text-base",
      },
    },
  },
  defaults: {
    rows: "3",
    resizable: false,
    size: "md",
    type: "text",
    inputmode: "text",
    labelAlign: "topInside",
    disabled: false,
    readonly: false,
    noAutocomplete: false,
  },
};
