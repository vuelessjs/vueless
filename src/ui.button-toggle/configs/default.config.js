export default /*tw*/ {
  wrapper: `
    flex gap-px
    [&>*:first-child]:rounded-l-lg [&>*:first-child]:rounded-r-none [&>*:first-child]:overflow-hidden
    [&>*:last-child]:rounded-r-lg [&>*:last-child]:rounded-l-none [&>*:last-child]:overflow-hidden
  `,
  defaultVariants: {
    size: "md",
    block: false,
    multiple: false,
  },
};
