export default /*tw*/ {
  wrapper: "relative",
  headerCellGeneral: {
    base: "p-4 first:p-5 text-sm font-normal text-gray-500 text-left text-nowrap",
    variants: {
      compact: {
        true: "px-4 py-3 last:px-4 last:py-3 first:px-4 first:py-3",
      },
    },
  },
  headerCounterGeneral: "mr-1.5 pr-1.5 font-medium text-sm text-gray-900",
  stickyHeader: "fixed top-0 flex items-center z-30 overflow-hidden rounded-none border",
  stickyHeaderRow: "border-gray-200 bg-white",
  stickyHeaderCell: "flex-none whitespace-nowrap",
  stickyHeaderCheckbox: "",
  stickyHeaderCounter: {
    base: "absolute top-5 left-11 bg-gradient-to-r from-white from-80%",
    variants: {
      compact: {
        true: "top-3",
      },
    },
  },
  stickyHeaderLoader: "",
  stickyHeaderActions: "absolute rounded-t-lg border-blue-200 bg-blue-50",
  stickyHeaderActionsCheckbox: "",
  stickyHeaderActionsCounter: "-ml-2",
  tableWrapper: "border border-gray-200 rounded-lg bg-white",
  table: "min-w-full border-none text-sm w-full",
  header: "border-b border-gray-200",
  headerRow: "",
  headerCell: "",
  headerCellCheckbox: "w-10",
  headerCheckbox: "",
  headerCounter: {
    base: "absolute top-5 mt-px left-11 bg-gradient-to-r from-white from-80% ml-px",
    variants: {
      compact: {
        true: "top-3",
      },
    },
  },
  headerLoader: "absolute !top-auto",
  body: "group/body divide-none",
  bodyRow: "hover:bg-gray-50",
  bodyRowChecked: "bg-gray-100 transition duration-100",
  bodyRowBefore: "!p-0",
  bodyRowBeforeCell: "py-1",
  bodyRowAfter: "!p-0",
  bodyRowAfterCell: "py-1",
  bodyRowDateSeparator: "",
  bodyCell: {
    base: "p-[1.125rem] py-5 first:!p-5 truncate align-top last:p-5",
    variants: {
      compact: {
        true: "px-4 py-3 last:px-4 last:py-3 first:!px-3.5 first:py-3",
      },
    },
  },
  bodyCellSecondary: "mt-1 text-xs text-gray-500",
  bodyCellSecondaryEmpty: "inline-block",
  bodyCellCheckbox: "first:px-4", // try to remove first
  bodyCellDateSeparator: "",
  bodyCellNested: "mr-2 mt-0.5",
  bodyCellNestedExpandIcon: {
    wrapper: "rounded-sm",
    container: "bg-gray-200",
  },
  bodyCellNestedExpandIconName: "add",
  bodyCellNestedCollapseIcon: {
    wrapper: "rounded-sm",
    container: "bg-gray-200",
  },
  bodyCellNestedCollapseIconName: "remove",
  bodyCheckbox: "",
  bodyDateSeparator: "",
  bodyEmptyState: "my-8",
  footer: "group/footer border-t border-solid border-gray-200",
  footerRow: {
    base: "[&_td]:p-[1.125rem] [&_td]:py-5 first:[&_td]:p-5",
    variants: {
      compact: {
        true: "[&_td]:p-4",
      },
    },
  },
  stickyFooter: "relative group/footer-fixed",
  stickyFooterRow: `
    fixed bottom-0 -ml-px border border-b border-gray-200 bg-white
    collapse group-[]/footer-fixed:[visibility:inherit]
  `,
  i18n: {
    noData: "There is no data in the table.",
  },
  defaultVariants: {
    nesting: false,
    compact: false,
    selectable: false,
    stickyHeader: false,
    stickyFooter: false,
  },
};
