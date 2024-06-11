export default /*tw*/ {
  items: {
    base: "flex flex-wrap",
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
        false: `
          flex-nowrap -space-x-px gap-0
          [&>*:first-child]:rounded-l-lg [&>*:first-child]:rounded-r-none
          [&>*:last-child]:rounded-r-lg [&>*:last-child]:rounded-l-none
        `,
      },
    },
    compoundVariants: [
      { separated: false, variant: "thirdary", class: "space-x-0" },
      { separated: false, multiple: true, class: "space-x-px" },
    ],
  },
  label: {
    base: "flex flex-wrap",
    variants: {
      block: {
        true: "w-full",
      },
    },
  },
  item: "",
  defaultVariants: {
    variant: "primary",
    labelAlign: "top",
    size: "md",
    block: false,
    pill: false,
    square: false,
    disabled: false,
    multiple: false,
    separated: false,
  },
};
