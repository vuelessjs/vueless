export default /*tw*/ {
  inputLabel: {
    base: "{ULabel}",
    content: "w-full",
    variants: {
      labelAlign: {
        right: "w-full",
        left: "w-full",
      },
    },
  },
  wrapper: {
    base: `
      flex gap-3 w-full px-3 relative bg-default transition
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
  leftIcon: "{UIcon} {>inputIcon} -mr-0.5",
  rightIcon: "{UIcon} {>inputIcon} -ml-0.5",
  leftSlot: "flex items-center",
  rightSlot: "flex items-center",
  input: {
    base: `
      block w-full py-2 font-normal !leading-none bg-transparent
      border-none rounded-inherit transition focus:outline-none
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
    autocomplete: true,
  },
};
