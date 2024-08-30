export default /*tw*/ {
  list: "flex",
  listItem: "",
  ellipsis: "leading-none",
  navButton: "{UButton} font-normal",
  navButtonLabel: "",
  pageButton: "{UButton} font-normal",
  pageButtonActive: `
    !bg-brand-900/20 hover:!text-brand-900 !hover:bg-brand-900/20
    disabled:hover:bg-brand-900/20
  `,
  defaults: {
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
