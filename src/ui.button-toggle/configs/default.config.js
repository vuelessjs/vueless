export default /*tw*/ {
  wrapper: `
    flex gap-px
    [&>*:first-child]:rounded-l-lg [&>*:first-child]:rounded-r-none
    [&>*:last-child]:rounded-r-lg [&>*:last-child]:rounded-l-none
  `,
  toggleItem: "",
  defaultVariants: {
    color: "brand",
    variant: "primary",
    size: "md",
    block: false,
    pill: false,
    square: false,
    filled: false,
    multiple: false,
  },
};
