export default /*tw*/ {
  list: "flex",
  item: "h-9 min-w-9 flex items-center justify-center",
  ellipsis: "hidden md:flex",
  itemEllipsis: "leading-none",
  navigationButton: "size-full rounded font-normal disabled:hover:bg-transparent",
  navigationButtonText: "h-9 min-w-9 leading-none",
  pageButton: "size-full rounded font-normal disabled:hover:bg-transparent",
  pageButtonActive: `
    rounded !bg-brand-900/15
    hover:!text-brand-900 !hover:bg-brand-900/15 disabled:hover:bg-brand-900/15
    focus:outline-none
  `,
  defaultVariants: {
    limit: 5,
    perPage: 20,
    prevLabel: "&lsaquo;",
    nextLabel: "&rsaquo;",
    firstLabel: "&laquo;",
    lastLabel: "&raquo;",
    disabled: false,
    ellipsis: true,
    showFirst: true,
    showLast: true,
  },
};
