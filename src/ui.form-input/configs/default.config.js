export default /*tw*/ {
  label: "{ULabel}",
  inputWrapper: "flex relative w-full",
  rightIconSlot: "flex items-center justify-end whitespace-nowrap pr-2 gap-1 rounded-dynamic rounded-l-none",
  leftIconSlot: "flex items-center justify-end whitespace-nowrap pl-2 gap-1 rounded-dynamic rounded-r-none",
  leftIcon: "{UIcon}",
  rightIcon: "{UIcon}",
  passwordIcon: "",
  block: {
    base: `
      w-full bg-white !opacity-100 relative flex transition
      rounded-dynamic border border-solid border-gray-300
      hover:border-gray-400 hover:focus-within:border-brand-500
      focus-within:border-brand-500 focus-within:ring-dynamic focus-within:ring-offset-dynamic focus-within:ring-brand-700/15
    `,
    variants: {
      error: {
        true: `
          border-red-300
          hover:border-red-400 hover:focus-within:border-red-500
          focus-within:border-red-500 focus-within:ring-red-700/15
        `,
      },
      disabled: {
        true: "focus-within:ring-0 focus-within:ring-offset-0 pointer-events-none",
      },
    },
  },
  input: {
    base: `
      block w-full py-2 px-3 font-normal leading-none text-gray-900 bg-white
      border-none rounded-dynamic transition focus:ring-0
      placeholder:font-normal placeholder-gray-400
      disabled:text-gray-700 disabled:bg-gray-100
    `,
    variants: {
      size: {
        sm: "text-xs placeholder:text-xs placeholder:font-normal",
        md: "text-sm placeholder:text-sm placeholder:font-normal",
        lg: "text-base placeholder:text-base placeholder:font-normal",
      },
      error: {
        true: `
        bg-red-50 hover:border-red-400 focus:border-red-500 focus:ring-red-700/15
        focus-within:border-red-500 focus-within:ring-red-700/15
      `,
      },
    },
    compoundVariants: [
      { labelAlign: "topInside", label: true, size: "sm", class: "pt-5" },
      { labelAlign: "topInside", label: true, size: "md", class: "pt-6" },
      { labelAlign: "topInside", label: true, size: "lg", class: "pt-7" },
    ],
  },
  defaults: {
    passwordVisibleIcon: "visibility-fill",
    passwordHiddenIcon: "visibility_off-fill",
    size: "md",
    type: "text",
    inputmode: "text",
    labelAlign: "topInside",
    validationRule: "",
    readonly: false,
    disabled: false,
    noAutocomplete: false,
  },
};
