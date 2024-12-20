export default /*tw*/ {
  toggleLabel: {
    base: "{ULabel} flex flex-wrap",
    variants: {
      block: {
        true: "w-full",
      },
    },
  },
  items: {
    base: "",
    variants: {
      size: {
        "2xs": "gap-1",
        xs: "gap-1.5",
        sm: "gap-2",
        md: "gap-2.5",
        lg: "gap-3",
        xl: "gap-3",
      },
      split: {
        true: "flex flex-wrap",
        false: `
          p-1 gap-1 flex flex-nowrap w-fit transition
          border border-gray-300 rounded-dynamic
          hover:border-gray-400 hover:focus-within:border-brand-500 focus-within:border-brand-500
          focus-within:ring-dynamic focus-within:ring-offset-dynamic focus-within:ring-brand-700/15
        `,
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
  item: "{UToggleItem}",
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
