export default /*tw*/ {
  toggleLabel: {
    base: "{ULabel} flex flex-wrap",
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
        false: "p-1 gap-1 flex flex-nowrap w-fit transition border rounded-dynamic border-gray-300",
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
