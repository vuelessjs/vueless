export default /*tw*/ {
  textareaLabel: "{ULabel}",
  slot: "flex items-center justify-center whitespace-nowrap gap-1 rounded-dynamic",
  leftSlot: "{>slot} pl-3 rounded-r-none",
  rightSlot: "{>slot} pr-3 rounded-l-none",
  wrapper: {
    base: `
      flex bg-white transition w-full
      rounded-dynamic border border-gray-300 hover:border-gray-400 hover:focus-within:border-brand-600 focus-within:border-brand-600
      focus-within:outline focus-within:outline-dynamic-sm focus-within:outline-brand-600
    `,
    variants: {
      error: {
        true: "!border-red-600 focus-within:outline-red-600",
      },
      disabled: {
        true: "!border-gray-300 focus-within:outline-0 bg-gray-100",
      },
    },
  },
  textarea: {
    base: `
      px-3 pt-2 pb-1.5 block w-full bg-transparent border-none font-normal text-gray-900
      placeholder:text-gray-400 placeholder:font-normal placeholder:leading-none
      focus:ring-0 disabled:cursor-not-allowed
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
    compoundVariants: [
      { labelAlign: "topInside", label: true, size: "sm", class: "pt-[1.2rem]" },
      { labelAlign: "topInside", label: true, size: "md", class: "pt-[1.4rem]" },
      { labelAlign: "topInside", label: true, size: "lg", class: "pt-[1.6rem]" },
    ],
  },
  defaults: {
    rows: "2",
    size: "md",
    inputmode: "text",
    labelAlign: "topInside",
    resizable: false,
    disabled: false,
    readonly: false,
    noAutocomplete: false,
  },
};
