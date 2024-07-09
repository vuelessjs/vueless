export default /*tw*/ {
  label: "relative w-full",
  inputWrapper: "flex relative w-full",
  rightIconSlot: "flex items-center justify-end whitespace-nowrap px-3 rounded-r-lg rounded-l-none",
  leftIconSlot: "flex items-center justify-end whitespace-nowrap pl-3 rounded-l-lg rounded-r-none",
  passwordIcon: "",
  passwordVisibleIconName: "visibility-fill",
  passwordHiddenIconName: "visibility_off-fill",
  block: {
    base: `
      rounded-lg border border-solid border-gray-300 bg-white !opacity-100 relative flex transition
      hover:border-gray-400 hover:focus-within:border-brand-500
      focus-within:border-brand-500 focus-within:ring-4 focus-within:ring-brand-600/[.15]
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
      block w-full pb-2 px-4 font-normal leading-none text-gray-900 placeholder:font-normal placeholder-gray-400
      transition bg-white border-none border-gray-300 rounded-lg shadow-none
      focus:outline-none focus:ring-0 disabled:opacity-50
      disabled:cursor-not-allowed disabled:text-gray-900 disabled:border-gray-100
      read-only:border-gray-300 read-only:ring-0
    `,
    variants: {
      size: {
        sm: "pt-2 pb-2 text-sm placeholder:text-sm placeholder:font-normal",
        md: "pt-2.5 pb-2.5 text-base placeholder:text-base placeholder:font-normal",
        lg: "pt-3 pb-3 text-lg placeholder:text-lg placeholder:font-normal",
      },
      error: `
        border-red-300 hover:border-red-400 focus:border-red-500 focus:ring-red-100
        focus-within:border-red-500 focus-within:ring-red-100
      `,
    },
    compoundVariants: [
      { labelAlign: "topInside", label: true, size: "sm", class: "pt-5 pb-1.5" },
      { labelAlign: "topInside", label: true, size: "md", class: "pt-6 pb-1.5" },
      { labelAlign: "topInside", label: true, size: "lg", class: "pt-7 pb-2" },
    ],
  },
  defaultVariants: {
    size: "md",
    type: "text",
    inputmode: "text",
    error: false,
    readonly: false,
    disabled: false,
    labelAlign: "topInside",
    noAutocomplete: false,
  },
};
