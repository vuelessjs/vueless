export default /*tw*/ {
  label: {
    base: "flex flex-wrap",
    variants: {
      block: {
        true: "w-full",
      },
    },
  },
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
          gap-px flex-nowrap
          [&>*:first-child]:rounded-l-lg [&>*:first-child]:rounded-r-none
          [&>*:last-child]:rounded-r-lg [&>*:last-child]:rounded-l-none
        `,
      },
    },
  },
  item: "",
  defaultVariants: {
    color: "brand",
    variant: "primary",
    labelAlign: "top",
    size: "md",
    block: false,
    pill: false,
    square: false,
    filled: false,
    disabled: false,
    multiple: false,
    separated: false,
  },
};
