export default /*tw*/ {
  wrapper: "relative w-full overflow-auto",
  headerCounterBase: "mr-1.5 pr-1.5 font-medium text-medium",
  stickyHeader: {
    base: "fixed top-0 flex items-center z-30 overflow-hidden border rounded-none",
    variants: {
      stickedHeader: {
        false: "absolute",
      },
      actionsHeader: {
        true: "rounded-t-medium border-muted bg-default pb-px",
      },
    },
    compoundVariants: [
      { stickedHeader: true, actionsHeader: true, class: "rounded-none" },
      { stickedHeader: true, actionsHeader: false, class: "border-muted bg-default" },
    ],
  },
  stickyHeaderCell: "{>headerCellBase} flex-none whitespace-nowrap",
  stickyHeaderCheckbox: "{UCheckbox}",
  stickyHeaderCounter: {
    base: "{>headerCounterBase} absolute top-4 left-11 bg-gradient-to-r from-(--vl-bg) from-80%",
    variants: {
      compact: {
        true: "top-3",
      },
    },
  },
  stickyHeaderLoader: "{ULoaderProgress} absolute top-auto bottom-0",
  headerActionsCheckbox: "{UCheckbox}",
  headerActionsCounter: "{>headerCounterBase} -ml-1.5",
  tableWrapper: "border border-muted rounded-medium bg-default",
  table: "min-w-full border-none text-medium w-full table-auto",
  header: "border-b border-muted",
  headerRow: "",
  beforeHeaderRow: "{>headerCellBase} py-1",
  headerCellBase: {
    base: "p-4 text-medium font-normal text-lifted text-left text-nowrap",
    variants: {
      compact: {
        true: "px-4 py-3 last:px-4 last:py-3 first:px-4 first:py-3",
      },
    },
  },
  headerCellCheckbox: "{>headerCellBase} w-10 pr-2",
  headerCheckbox: "{UCheckbox}",
  headerCounter: "{>stickyHeaderCounter} mt-px ml-px",
  headerLoader: "{ULoaderProgress} absolute !top-auto",
  body: "group/body divide-none",
  bodyRow: "hover:bg-muted",
  bodyRowChecked: "bg-lifted transition",
  beforeBodyRow: "!p-0",
  beforeBodyRowChecked: "{>bodyRowChecked} !p-0",
  beforeBodyRowCell: "{>bodyCellBase} py-1",
  afterBodyRow: "!p-0",
  bodyRowDateDivider: "first:hidden",
  bodyRowCheckedDateDivider: "{>bodyRowChecked} {>bodyRowChecked}",
  bodyCellBase: {
    base: "p-4 truncate align-top",
    variants: {
      compact: {
        true: "px-4 py-3 last:px-4 last:py-3 first:!px-4 first:py-3",
      },
    },
  },
  bodyCellContent: "text-ellipsis overflow-hidden",
  bodyCellCheckbox: "{>bodyCellBase} pr-2",
  bodyCellDateDivider: "",
  bodyCellNested: "mr-2 flex items-center gap-2",
  bodyCellNestedIconWrapper: "bg-primary/15 rounded-xs",
  bodyCellNestedExpandIcon: "{UIcon}",
  bodyCellNestedCollapseIcon: "{UIcon}",
  bodyCheckbox: "{UCheckbox}",
  bodyDateDivider: {
    base: "{UDivider} py-2",
    label: "py-0 leading-none",
  },
  bodySelectedDateDivider: {
    base: "{>bodyDateDivider}",
    label: "!bg-lifted transition",
  },
  bodyEmptyState: "{UEmpty} my-8",
  bodyEmptyStateCell: "",
  footer: {
    base: "group/footer border-t border-solid border-muted",
    variants: {
      stickedFooter: {
        true: "relative group/footer-fixed",
      },
    },
  },
  footerRow: {
    base: "[&_td]:py-4",
    variants: {
      compact: {
        true: "[&_td]:px-4 [&_td]:py-3",
      },
    },
  },
  stickyFooterRow: `
    fixed bottom-0 -ml-px border border-b border-muted bg-default
    collapse group-[*]/footer-fixed:[visibility:inherit]
  `,
  i18n: {
    noData: "There is no data in the table.",
  },
  defaults: {
    emptyCellLabel: "—",
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
