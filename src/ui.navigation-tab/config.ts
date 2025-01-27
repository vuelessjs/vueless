export default /*tw*/ {
  tabButton: {
    base: `
      {UButton} rounded-none -mb-px border-0 border-b border-transparent
      hover:bg-transparent active:bg-transparent dark:hover:bg-transparent dark:active:bg-transparent
    `,
    defaults: {
      color: "gray",
    },
  },
  tabButtonActive: {
    base: "{>tabButton} border-brand-600",
    defaults: {
      color: "brand",
    },
  },
  defaults: {
    disabled: false,
  },
};
