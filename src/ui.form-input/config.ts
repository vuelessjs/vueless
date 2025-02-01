export default /*tw*/ {
  inputLabel: "{ULabel}",
  wrapper: {
    base: `
      border rounded-dynamic border-gray-300 relative flex w-full bg-white transition
      hover:border-gray-400 hover:focus-within:border-brand-600 focus-within:border-brand-600
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
  inputIcon: {
    base: "{UIcon}",
    defaults: {
      size: {
        sm: "xs",
        md: "sm",
        lg: "md",
      },
    },
  },
  leftIcon: "{UIcon} {>inputIcon}",
  rightIcon: "{UIcon} {>inputIcon}",
  passwordIcon: "{UIcon} {>inputIcon}",
  passwordIconWrapper: "flex items-center justify-end whitespace-nowrap pr-2.5 gap-1 rounded-inherit rounded-l-none",
  leftSlot: "pl-2.5 flex items-center",
  rightSlot: "pr-2.5 flex items-center",
  input: {
    base: `
      block w-full py-2 px-3 font-normal !leading-none text-gray-900 bg-transparent
      border-none rounded-inherit transition focus:ring-0
      placeholder:font-normal placeholder-gray-400
      disabled:text-gray-700 disabled:cursor-not-allowed
    `,
    variants: {
      size: {
        sm: "text-xs placeholder:text-xs placeholder:font-normal",
        md: "text-sm placeholder:text-sm placeholder:font-normal",
        lg: "text-base placeholder:text-base placeholder:font-normal",
      },
      error: {
        true: "placeholder:text-red-300",
      },
      typePassword: {
        true: "tracking-widest !leading-[1.18] [font-family:text-security-disc,serif] [-webkit-text-security:disc]",
      },
    },
    compoundVariants: [
      { labelAlign: "topInside", label: true, size: "sm", class: "pt-5" },
      { labelAlign: "topInside", label: true, size: "md", class: "pt-6" },
      { labelAlign: "topInside", label: true, size: "lg", class: "pt-7" },
    ],
  },
  defaults: {
    size: "md",
    type: "text",
    inputmode: "text",
    labelAlign: "topInside",
    validationRule: "",
    readonly: false,
    disabled: false,
    noAutocomplete: false,
    /* icons */
    passwordVisibleIcon: "visibility-fill",
    passwordHiddenIcon: "visibility_off-fill",
  },
};
