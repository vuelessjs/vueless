export default /*tw*/ {
  tabButton: {
    base: `
      {UButton} -mb-px rounded-none border-transparent
      hover:bg-transparent dark:hover:bg-transparent
      active:bg-transparent dark:active:bg-transparent
    `,
    defaults: {
      color: "gray",
    },
  },
  tabButtonActive: {
    base: "{>tabButton} -mb-0.5 border-b-2 border-b-brand-600",
    defaults: {
      color: "brand",
    },
  },
  defaults: {
    disabled: false,
  },
};
