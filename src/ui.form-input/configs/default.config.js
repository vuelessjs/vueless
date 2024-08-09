export default /*tw*/ {
  label: "{ULabel}",
  inputWrapper: "flex relative w-full",
  rightIconSlot: "flex items-center justify-end whitespace-nowrap pr-3 gap-1 rounded-dynamic rounded-l-none",
  leftIconSlot: "flex items-center justify-end whitespace-nowrap pl-3 gap-1 rounded-dynamic rounded-r-none",
  passwordIcon: "",
  passwordVisibleIconName: "visibility-fill",
  passwordHiddenIconName: "visibility_off-fill",
  block: {
    base: `
      w-full bg-white !opacity-100 relative flex transition
      rounded-dynamic border border-solid border-gray-300
      hover:border-gray-400 hover:focus-within:border-brand-500
      focus-within:border-brand-500 focus-within:ring-dynamic focus-within:ring-offset-dynamic focus-within:ring-brand-600/[.15]
    `,
    variants: {
      disabled: {
        true: `
          text-gray-900 border-gray-100 bg-gray-100 opacity-100 cursor-default
          hover:border-gray-100
        `,
      },
      error: {
        true: `
          border-red-300
          hover:border-red-400 hover:focus-within:border-red-500
          focus-within:border-red-500 focus-within:ring-red-100
        `,
      },
    },
  },
  input: {
    base: `
      block w-full py-2 px-3 font-normal leading-none text-gray-900 bg-white
      border-none rounded-dynamic transition
      placeholder:font-normal placeholder-gray-400
      focus:ring-0 disabled:opacity-50
      disabled:cursor-not-allowed disabled:text-gray-900 disabled:border-gray-100
      read-only:ring-0 read-only:border-gray-300
    `,
    variants: {
      size: {
        sm: "text-xs placeholder:text-xs placeholder:font-normal",
        md: "text-sm placeholder:text-sm placeholder:font-normal",
        lg: "text-base placeholder:text-base placeholder:font-normal",
      },
      error: {
        true: `
        bg-red-50 hover:border-red-400 focus:border-red-500 focus:ring-red-100
        focus-within:border-red-500 focus-within:ring-red-100
      `,
      },
    },
    compoundVariants: [
      { labelAlign: "topInside", label: true, size: "sm", class: "pt-5" },
      { labelAlign: "topInside", label: true, size: "md", class: "pt-6" },
      { labelAlign: "topInside", label: true, size: "lg", class: "pt-7" },
    ],
  },
  defaultVariants: {
    size: "md",
    type: "text",
    inputmode: "text",
    labelAlign: "topInside",
    readonly: false,
    disabled: false,
    noAutocomplete: false,
  },
};
