export default /*tw*/ {
  inputLabel: "{ULabel}",
  wrapper: {
    base: `
      flex w-full relative bg-default transition
      border rounded-medium border-default outline-transparent
      hover:border-lifted hover:focus-within:border-primary focus-within:border-primary
      focus-within:outline focus-within:outline-small focus-within:outline-primary focus-within:transition
    `,
    variants: {
      error: {
        true: "!border-error focus-within:outline-error",
      },
      disabled: {
        true: "!border-default focus-within:outline-0 bg-lifted",
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
      block w-full py-2 px-3 font-normal !leading-none bg-transparent
      border-none rounded-inherit transition focus:ring-0 focus:outline-none
      placeholder:font-normal placeholder:text-muted
      disabled:text-accented disabled:cursor-not-allowed
    `,
    variants: {
      size: {
        sm: "text-small placeholder:text-small placeholder:font-normal",
        md: "text-medium placeholder:text-medium placeholder:font-normal",
        lg: "text-large placeholder:text-large placeholder:font-normal",
      },
      error: {
        true: "placeholder:text-error/50",
      },
      typePassword: {
        true: "tracking-widest [-webkit-text-security:disc]",
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
