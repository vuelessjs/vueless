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
  slot: "flex shrink-0 items-center justify-center whitespace-nowrap gap-1 rounded-medium",
  leftSlot: "{>slot} pl-3 rounded-r-none",
  rightSlot: "{>slot} pr-3 rounded-l-none",
  wrapper: {
    base: `
      flex w-full bg-default transition
      rounded-medium border border-solid border-default outline-solid outline-small outline-transparent
      hover:border-lifted hover:focus-within:border-primary focus-within:border-primary
      focus-within:outline focus-within:outline-small focus-within:outline-primary focus-within:transition
    `,
    variants: {
      error: {
        true: "border-error! focus-within:outline-error",
      },
      disabled: {
        true: "border-default! focus-within:outline-0 bg-lifted",
      },
    },
  },
  textarea: {
    base: `
      block w-full min-w-0 px-3 py-2 bg-transparent border-none font-normal
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
      { labelAlign: "topInside", label: true, size: "sm", class: "pt-5" },
      { labelAlign: "topInside", label: true, size: "md", class: "pt-6" },
      { labelAlign: "topInside", label: true, size: "lg", class: "pt-7" },
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
