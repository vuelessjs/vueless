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
  items: {
    base: "flex gap-1",
    variants: {
      split: {
        true: "flex-wrap",
        false: "flex-nowrap p-1 w-fit border rounded-dynamic border-gray-300",
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
