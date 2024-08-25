export default /*tw*/ {
  label: {
    component: "{ULabel}",
    base: "flex flex-wrap",
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
      separated: {
        true: "flex flex-wrap",
        false: `
          flex flex-nowrap -space-x-px gap-0 rounded-dynamic transition w-fit
          [&>:first-child]:rounded-dynamic [&>:first-child]:rounded-r-none
          [&>:last-child]:rounded-dynamic [&>:last-child]:rounded-l-none
          [&>:first-child>*>*]:rounded-dynamic [&>:first-child>*>*]:rounded-r-none
          [&>:last-child>*>*]:rounded-dynamic [&>:last-child>*>*]:rounded-l-none
          focus-within:ring-dynamic focus-within:ring-offset-dynamic focus-within:ring-brand-700/15
        `,
      },
    },
    compoundVariants: [
      { separated: false, variant: "thirdary", class: "space-x-px" },
      { separated: false, multiple: true, class: "space-x-px" },
    ],
  },
  item: "{UToggleItem}",
  defaultVariants: {
    variant: "primary",
    labelAlign: "top",
    size: "md",
    block: false,
    round: false,
    square: false,
    disabled: false,
    multiple: false,
    separated: false,
  },
};
