export default /*tw*/ {
  wrapper: "relative w-full overflow-auto",
  headerCounterBase: "mr-1.5 pr-1.5 font-medium text-sm text-gray-900",
  stickyHeader: {
    base: "fixed top-0 flex items-center z-30 overflow-hidden border rounded-none",
    variants: {
      actionsHeader: {
        true: "rounded-t-dynamic border-blue-200 bg-blue-50",
      },
    },
    compoundVariants: [
      { stickedHeader: true, actionsHeader: true, class: "rounded-none" },
      { stickedHeader: true, actionsHeader: false, class: "border-gray-200 bg-white" },
    ],
  },
  stickyHeaderCell: "{>headerCellBase} flex-none whitespace-nowrap",
  stickyHeaderCheckbox: "{UCheckbox}",
  stickyHeaderCounter: {
    base: "{>headerCounterBase} absolute top-4 left-11 bg-gradient-to-r from-white from-80%",
    variants: {
      compact: {
        true: "top-3",
      },
    },
  },
  stickyHeaderLoader: "{ULoaderProgress}",
  headerActionsCheckbox: "{UCheckbox}",
  headerActionsCounter: "{>headerCounterBase} -ml-1.5",
  tableWrapper: "border border-gray-200 rounded-dynamic bg-white",
  table: "min-w-full border-none text-sm w-full table-auto",
  header: "border-b border-gray-200",
  headerRow: "",
  headerCellBase: {
    base: "p-4 text-sm font-normal text-gray-500 text-left text-nowrap",
    variants: {
      compact: {
        true: "px-4 py-3 last:px-4 last:py-3 first:px-4 first:py-3",
      },
    },
  },
  headerCellCheckbox: "{>headerCellBase} w-10 pr-2",
  headerCheckbox: "{UCheckbox}",
  headerCounter: {
    base: "{>headerCounterBase} absolute top-4 mt-px left-11 ml-px",
    variants: {
      compact: {
        true: "top-3",
      },
    },
  },
  headerLoader: "{ULoaderProgress} absolute !top-auto",
  body: "group/body divide-none",
  bodyRow: "hover:bg-gray-50",
  bodyRowChecked: "bg-gray-100 transition",
  bodyRowBefore: "!p-0",
  bodyRowBeforeChecked: "{>bodyRowChecked} !p-0",
  bodyRowBeforeCell: "{>bodyCellBase} py-1",
  bodyRowAfter: "!p-0",
  bodyRowDateDivider: "",
  bodyCellBase: {
    base: "p-[1.125rem] py-5 truncate align-top",
    variants: {
      compact: {
        true: "px-4 py-3 last:px-4 last:py-3 first:!px-4 first:py-3",
      },
    },
  },
  bodyCellContent: "text-ellipsis overflow-hidden",
  bodyCellCheckbox: "{>bodyCellBase} pr-2", // try to remove first
  bodyCellDateDivider: "",
  bodyCellNested: "mr-2 flex gap-0.5",
  bodyCellNestedExpandIconWrapper: "",
  bodyCellNestedExpandIcon: {
    component: "{UIcon}",
    wrapper: "rounded-sm",
    container: "bg-gray-200",
  },
  bodyCellNestedCollapseIcon: {
    component: "{UIcon}",
    wrapper: "rounded-sm",
    container: "bg-gray-200",
  },
  bodyCheckbox: "{UCheckbox}",
  bodyDateDivider: "{UDivider}",
  bodyEmptyState: "{UEmpty} my-8",
  footer: {
    base: "group/footer border-t border-solid border-gray-200",
    variants: {
      stickedFooter: {
        true: "relative group/footer-fixed",
      },
    },
  },
  footerRow: {
    base: "[&_td]:p-[1.125rem] [&_td]:py-5 first:[&_td]:p-5",
    variants: {
      compact: {
        true: "[&_td]:p-4",
      },
    },
  },
  stickyFooterRow: `
    fixed bottom-0 -ml-px border border-b border-gray-200 bg-white
    collapse group-[]/footer-fixed:[visibility:inherit]
  `,
  i18n: {
    noData: "There is no data in the table.",
  },
  defaults: {
    emptyCellLabel: "—",
    nesting: false,
    compact: false,
    selectable: false,
    dateDivider: false,
    stickyHeader: false,
    stickyFooter: false,
    loading: false,
    /* icons */
    expandIcon: "add",
    collapseIcon: "remove",
  },
};
