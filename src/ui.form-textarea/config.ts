export default /*tw*/ {
  textareaLabel: "{ULabel}",
  slot: "flex items-center justify-center whitespace-nowrap gap-1 rounded-medium",
  leftSlot: "{>slot} pl-2.5 rounded-r-none",
  rightSlot: "{>slot} pr-2.5 rounded-l-none",
  wrapper: {
    base: `
      flex w-full bg-default transition
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
      px-3 pt-2 pb-1.5 block w-full bg-transparent border-none font-normal
      placeholder:text-muted placeholder:font-normal placeholder:leading-none
      focus:ring-0 focus:outline-none disabled:cursor-not-allowed
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
      error: {
        true: "placeholder:text-error/50",
      },
    },
    compoundVariants: [
      { labelAlign: "topInside", label: true, size: "sm", class: "pt-[1.2rem]" },
      { labelAlign: "topInside", label: true, size: "md", class: "pt-[1.4rem]" },
      { labelAlign: "topInside", label: true, size: "lg", class: "pt-[1.6rem]" },
    ],
  },
  defaults: {
    rows: "2",
    size: "md",
    inputmode: "text",
    labelAlign: "topInside",
    resizable: false,
    disabled: false,
    readonly: false,
    noAutocomplete: false,
  },
};
