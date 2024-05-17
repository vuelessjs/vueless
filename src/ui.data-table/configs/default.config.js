export default /*tw*/ {
  wrapper: {
    base: "relative bg-white rounded-2xl",
    variants: {
      compact: {
        true: "group/table-compact",
      },
    },
  },
  customHeader: "flex items-center z-30 overflow-hidden",
  customHeaderSticky: "fixed top-0 border border-t-0 border-gray-200 bg-white group/fixed-header",
  customHeaderActions: "rounded-t-lg border border-blue-200 !bg-blue-50 group-[]/fixed-header:!rounded-none",
  customHeaderHidden: "relative -top-[3.75rem] collapse",
  customHeaderItem: {
    base: "flex-none text-sm font-normal text-gray-500 px-[1.125rem] py-4 [&:nth-child(2)]:pl-0",
    variants: {
      compact: {
        true: "!p-4 [&:nth-child(2)]:!pl-0",
      },
    },
  },
  selectedRowsCount: "flex items-center pr-4 font-medium text-gray-900",
  selectAllCheckbox: "flex-none text-sm font-normal text-gray-500 pr-[1.125rem] pl-4 py-4 group-[]/table-compact:!px-4",
  headerStickyLoader: "absolute top-[3.75rem] group-[]/table-compact:!top-[3.25rem]",
  innerWrapper: "overflow-auto rounded-lg border border-gray-200",
  innerWrapperSelected: "!rounded-t-none border-t-0",
  table: "min-w-full border-none bg-white text-sm w-full",
  headerCheckboxWrapper: "w-[3.75rem]",
  header: "border-b border-solid border-gray-200",
  headerRow: "",
  headerCell: {
    base: `
      px-[1.125rem] py-4 text-sm font-normal text-gray-500
      text-left first:p-4 last:p-4 [&:nth-child(2)]:pl-0
    `,
    variants: {
      compact: {
        true: "bg-white p-4 first:p-4 last:p-4",
      },
    },
  },
  headerSelectAllCheckbox: "",
  tableLoader: "absolute !top-auto",
  moreRow: "!px-0 !py-4 first:mx-auto",
  moreRowHidden: "!p-0",
  checkedRow: "transition duration-100 bg-gray-100",
  beforeFirstRow: "",
  beforeFirstRowCell: "py-1",
  afterLastRow: "",
  afterLastRowCell: "py-1",
  toggleButtonWrapper: "flex items-center",
  expandIcon: "mr-2 rounded-sm bg-gray-200",
  expandIconName: "add",
  collapseIcon: "mr-2 rounded-sm bg-gray-200",
  collapseIconName: "remove",
  body: "group/body divide-none",
  bodyRow: "hover:bg-gray-50",
  checkboxBodyWrapperCell: "w-[3.75rem] py-3 px-4 align-top",
  bodyCell: "",
  tableCheckbox: "",
  dateSeparator: "",
  toggleItemButton: "flex relative -top-px",
  secondaryRow: "mt-1 text-xs text-gray-500",
  secondaryRowEmpty: "inline-block",
  footer: "group/footer border-t border-solid border-gray-200",
  footerSticky: "relative group/footer-fixed",
  footerRow: "",
  footerCell: "",
  footerStickyRow: `
    fixed bottom-0 -ml-px border border-b border-gray-200 bg-white
    collapse group-[]/footer-fixed:[visibility:inherit]
  `,
  empty: "my-8",
  i18n: {
    noItems: "There is no data in the table yet.",
    noResultsForFilters: "No results were found for the specified filters.",
    today: "today",
    tomorrow: "tomorrow",
  },
  defaultVariants: {
    nestingFrom: 0,
    nesting: false,
    compact: false,
    selectable: false,
    stickyHeader: false,
    stickyFooter: false,
  },
};
