export default /*tw*/ {
  tabButton: {
    base: `
      {UButton} rounded-none border-0 border-b-2 border-transparent
      hover:bg-transparent dark:hover:bg-transparent
      active:bg-transparent dark:active:bg-transparent
    `,
    variants: {
      scrollable: {
        false: "-mb-px",
      },
    },
    defaults: {
      color: "neutral",
    },
  },
  tabButtonActive: {
    base: "{>tabButton} border-primary",
    variants: {
      disabled: {
        true: "border-primary/(--vl-disabled-opacity)",
      },
    },
    defaults: {
      color: "primary",
    },
  },
  defaults: {
    disabled: false,
  },
};
