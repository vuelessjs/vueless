export default /*tw*/ {
  wrapper: "relative w-full",
  inputWrapper: "flex relative w-full",
  rightSlot: "flex items-center justify-end whitespace-nowrap pr-4 rounded-r-lg rounded-l-none",
  leftSlot: "flex items-center justify-end whitespace-nowrap pl-4 rounded-l-lg rounded-r-none",
  passwordIcon: "",
  passwordVisibleIconName: "visibility",
  passwordHiddenIconName: "visibility_off",
  label: "",
  block: {
    base: `
      rounded-lg border border-solid border-gray-300 bg-white !opacity-100 relative flex
      transition duration-100 ease-in-out
      hover:border-gray-400 hover:focus-within:border-gray-500
      focus-within:border-gray-500 focus-within:ring-4 focus-within:ring-gray-600/[.15]
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
      transition duration-100 ease-in-out bg-white border-none border-gray-300 rounded-lg shadow-none
      focus:outline-none focus:ring-0 disabled:opacity-50
      disabled:cursor-not-allowed disabled:text-gray-900 disabled:border-gray-100
      read-only:border-gray-300 read-only:ring-0
    `,
    variants: {
      size: {
        sm: "pt-6 text-sm placeholder:text-sm placeholder:font-normal",
        md: "pt-7 text-base placeholder:text-base placeholder:font-normal",
        lg: "pt-8 text-lg placeholder:text-lg placeholder:font-normal",
      },
      error: `
        border-red-300 hover:border-red-400 focus:border-red-500 focus:ring-red-100
        focus-within:border-red-500 focus-within:ring-red-100
      `,
    },
    // Note: Left slot width may affect horizontal label position.
    compoundVariants: [
      { labelOutside: true, size: "sm", class: "py-2" },
      { labelOutside: true, size: "md", class: "py-2.5" },
      { labelOutside: true, size: "lg", class: "py-3" },
      { labelOutside: false, label: false, size: "sm", class: "py-2" },
      { labelOutside: false, label: false, size: "md", class: "py-2.5" },
      { labelOutside: false, label: false, size: "lg", class: "py-3" },
    ],
  },
  defaultVariants: {
    size: "md",
    type: "text",
    inputMode: "text",
    error: false,
    readonly: false,
    disabled: false,
    labelAlign: "topInside",
    noAutocomplete: false,
  },
};
