export default /*tw*/ {
  tabButton: {
    base: `
      {UButton} rounded-none border-0 border-b-2 border-transparent
      hover:bg-transparent dark:hover:bg-transparent
      active:bg-transparent dark:active:bg-transparent
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
