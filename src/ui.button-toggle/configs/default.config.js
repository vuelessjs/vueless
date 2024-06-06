export default /*tw*/ {
  wrapper: `
    flex gap-px
    [&>*:first-child]:rounded-l-lg [&>*:first-child]:rounded-r-none
    [&>*:last-child]:rounded-r-lg [&>*:last-child]:rounded-l-none
  `,
  toggleItem: "",
  defaultVariants: {
    variant: "primary",
    size: "md",
    block: false,
    multiple: false,
  },
};
