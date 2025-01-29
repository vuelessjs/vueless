export default /*tw*/ {
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
  toggleInput: "p-0 m-0 size-0 invisible absolute",
  defaults: {
    disabled: false,
  },
};
