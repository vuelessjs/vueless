export default /*tw*/ {
  label: "",
  items: {
    base: "flex flex-wrap",
    variants: {
      size: {
        "2xs": "gap-2",
        xs: "gap-3",
        sm: "gap-4",
        md: "gap-5",
        lg: "gap-6",
        xl: "gap-7",
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
