export default /*tw*/ {
  textareaLabel: {
    base: "{ULabel}",
    content: "w-full",
    variants: {
      labelAlign: {
        right: "w-full",
        left: "w-full",
      },
    },
  },
  slot: "flex items-center justify-center whitespace-nowrap gap-1 rounded-medium",
  leftSlot: "{>slot} rounded-r-none",
  rightSlot: "{>slot} rounded-l-none",
  wrapper: {
    base: `
      flex px-3 py-2 gap-3 w-full bg-default transition
      rounded-medium border border-default outline-transparent
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
  textarea: {
    base: `
      block w-full bg-transparent border-none font-normal
      placeholder:text-muted placeholder:font-normal placeholder:leading-none
      focus:outline-none disabled:cursor-not-allowed
    `,
    variants: {
      size: {
        sm: "text-small placeholder:text-small",
        md: "text-medium placeholder:text-medium",
        lg: "text-large placeholder:text-large",
      },
      resizable: {
        false: "resize-none",
      },
      autoResize: {
        true: "resize-none overflow-hidden",
      },
      error: {
        true: "placeholder:text-error/50",
      },
    },
    compoundVariants: [
      { labelAlign: "topInside", label: true, size: "sm", class: "mt-3" },
      { labelAlign: "topInside", label: true, size: "md", class: "mt-4" },
      { labelAlign: "topInside", label: true, size: "lg", class: "mt-5" },
    ],
  },
  defaults: {
    rows: "2",
    size: "md",
    inputmode: "text",
    labelAlign: "topInside",
    resizable: false,
    autoResize: false,
    disabled: false,
    readonly: false,
    noAutocomplete: false,
  },
};
