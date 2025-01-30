export default /*tw*/ {
  toggleLabel: {
    base: "{ULabel} flex-wrap",
    variants: {
      block: {
        true: "w-full",
      },
    },
    defaults: {
      size: {
        "2xs": "sm",
        xs: "sm",
        sm: "md",
        md: "md",
        lg: "lg",
        xl: "lg",
      },
    },
  },
  options: {
    base: "flex",
    variants: {
      size: {
        "2xs": "gap-1.5",
        xs: "gap-1.5",
        sm: "gap-2",
        md: "gap-2",
        lg: "gap-2.5",
        xl: "gap-2.5",
      },
      split: {
        true: "flex-wrap",
        false: "flex-nowrap gap-1 p-1 w-fit border rounded-dynamic border-gray-300",
      },
      disabled: {
        true: "pointer-events-none",
      },
      block: {
        true: "w-full flex-nowrap",
      },
      round: {
        true: "rounded-full",
      },
    },
  },
  toggleButton: {
    base: "{UButton} font-normal focus-visible:ring-offset-0",
    defaults: {
      variant: "thirdary",
    },
  },
  toggleButtonInactive: {
    base: "{>toggleButton}",
    variants: {
      split: {
        false: "border-0",
        true: `
          border border-gray-300 hover:border-gray-400
          hover:bg-transparent dark:hover:bg-transparent
          active:bg-transparent dark:active:bg-transparent
        `,
      },
    },
  },
  toggleButtonActive: {
    base: "{>toggleButton}",
    variants: {
      split: {
        false: "border-0",
        true: `
          border border-brand-600
        `,
      },
    },
    defaults: {
      color: "brand",
      filled: true,
    },
  },
  defaults: {
    labelAlign: "top",
    size: "md",
    split: false,
    block: false,
    round: false,
    square: false,
    disabled: false,
    multiple: false,
  },
};
