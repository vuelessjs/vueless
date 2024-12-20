export default /*tw*/ {
  textareaLabel: "{ULabel}",
  leftSlot: "flex items-center justify-center whitespace-nowrap pl-2.5 gap-1 rounded-dynamic rounded-r-none",
  rightSlot: "flex items-center justify-center whitespace-nowrap pr-2.5 gap-1 rounded-dynamic rounded-l-none",
  textareaWrapper: {
    base: `
      px-3 py-2 bg-white transition w-full
      rounded-dynamic border border-gray-300 hover:border-gray-400 hover:focus-within:border-brand-500
      focus-within:border-brand-500 focus-within:ring-dynamic focus-within:ring-offset-dynamic
      focus-within:ring-brand-700/15 focus-within:outline-none
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
        true: `
            focus-within:ring-0 focus-within:ring-offset-0 bg-gray-100
            hover:border-gray-300 focus-within:border-gray-300 hover:focus-within:border-gray-300
          `,
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
      p-0 block w-full bg-transparent border-none !leading-none font-normal text-gray-900
      placeholder:text-gray-400 placeholder:font-normal placeholder:leading-none
      focus:border-none focus:outline-none focus:ring-0 disabled:cursor-not-allowed
    `,
    variants: {
      size: {
        sm: "text-xs placeholder:text-xs",
        md: "text-sm placeholder:text-sm",
        lg: "text-base placeholder:text-base",
      },
      resizable: {
        false: "resize-none",
      },
      error: {
        true: "placeholder:text-red-300",
      },
    },
  },
  defaults: {
    rows: "3",
    size: "md",
    inputmode: "text",
    labelAlign: "topInside",
    resizable: false,
    disabled: false,
    readonly: false,
    noAutocomplete: false,
  },
};
