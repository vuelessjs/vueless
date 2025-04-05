export default /*tw*/ {
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
        false: "flex-nowrap gap-px p-1 w-fit border rounded-medium border-default",
      },
      disabled: {
        true: "bg-lifted cursor-not-allowed",
      },
      block: {
        true: "w-full flex-nowrap",
      },
      round: {
        true: "rounded-full",
      },
    },
  },
  divider: {
    base: "my-1 border-r border-muted last:hidden",
    variants: {
      split: {
        true: "hidden",
      },
    },
  },
  dividerHidden: "{>divider} border-transparent",
  toggleButton: {
    base: "{UButton} font-normal focus-visible:ring-offset-0",
    defaults: {
      variant: "ghost",
    },
  },
  toggleButtonInactive: {
    base: "{>toggleButton}",
    variants: {
      split: {
        false: "border-0",
        true: `
          border border-default hover:border-lifted
          hover:bg-transparent dark:hover:bg-transparent
          active:bg-transparent dark:active:bg-transparent
        `,
      },
    },
  },
  toggleButtonActive: {
    base: "{>toggleButton} !bg-primary/10 disabled:!bg-primary/10 disabled:text-primary",
    variants: {
      split: {
        false: "border-0",
        true: "border border-primary/75 outline-small outline-primary/75",
      },
    },
    defaults: {
      color: "primary",
    },
  },
  defaults: {
    size: "md",
    split: false,
    block: false,
    round: false,
    square: false,
    disabled: false,
    multiple: false,
  },
};
