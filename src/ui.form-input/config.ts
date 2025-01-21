export default /*tw*/ {
  inputLabel: "{ULabel}",
  wrapper: {
    base: `
      w-full bg-white relative flex border border-gray-300 rounded-dynamic-sm transition
      hover:border-gray-400 hover:focus-within:border-brand-500 focus-within:border-brand-500
      focus-within:ring-dynamic focus-within:ring-offset-dynamic focus-within:ring-brand-700/15
    `,
    variants: {
      labelAlign: {
        topInside: "rounded-dynamic",
      },
      error: {
        true: `
          border-red-300 bg-red-50
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
  leftSlot: "pl-3 flex items-center",
  rightSlot: "pr-3 flex items-center",
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
        true: `
          bg-red-50 placeholder:text-red-300 hover:border-red-400 focus:border-red-500 focus:ring-red-700/15
          focus-within:border-red-500 focus-within:ring-red-700/15
        `,
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
