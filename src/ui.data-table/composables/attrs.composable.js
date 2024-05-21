import useUI from "../../composable.ui";
import defaultConfig from "../configs/default.config";
import { cva, cx } from "../../service.ui";
import { computed, useSlots } from "vue";

export function useAttrs(
  props,
  {
    tableRows,
    selectedRows,
    isNesting,
    isHeaderSticky,
    isFooterSticky,
    hasSlotContentTheadActions,
  },
) {
  const { config, getAttrs, hasSlotContent } = useUI(defaultConfig, () => props.config);
  const { wrapper, stickyHeaderColumn, headerCell } = config.value;

  const slot = useSlots();

  const cvaWrapper = cva({
    base: wrapper.base,
    variants: wrapper.variants,
    compoundVariants: wrapper.compoundVariants,
  });

  const cvaCustomHeaderItem = cva({
    base: stickyHeaderColumn.base,
    variants: stickyHeaderColumn.variants,
    compoundVariants: stickyHeaderColumn.compoundVariants,
  });

  const cvaHeaderCell = cva({
    base: headerCell.base,
    variants: headerCell.variants,
    compoundVariants: headerCell.compoundVariants,
  });

  const wrapperClasses = computed(() => cvaWrapper({ compact: props.compact }));

  const customHeaderItemClasses = computed(() => cvaCustomHeaderItem({ compact: props.compact }));

  const headerCellClasses = computed(() => cvaHeaderCell({ compact: props.compact }));

  const wrapperAttrs = getAttrs("wrapper", { classes: wrapperClasses });
  const customHeaderItemAttrsRaw = getAttrs("stickyHeaderColumn", {
    classes: customHeaderItemClasses,
  });
  const selectedRowsCountAttrs = getAttrs("selectedRowsCount");
  const selectAllCheckboxAttrs = getAttrs("selectAllCheckbox", { isComponent: true });
  const stickyHeaderLoaderAttrs = getAttrs("stickyHeaderLoader", { isComponent: true });
  const tableAttrs = getAttrs("table");
  const headerAttrs = getAttrs("header");
  const headerRowAttrs = getAttrs("headerRow");
  const headerCellAttrsRaw = getAttrs("headerCell", { classes: headerCellClasses });
  const headerSelectAllCheckboxAttrs = getAttrs("headerSelectAllCheckbox", { isComponent: true });
  const tableLoaderAttrs = getAttrs("tableLoader", { isComponent: true });
  const expandIconAttrs = getAttrs("expandIcon", { isComponent: true });
  const collapseIconAttrs = getAttrs("collapseIcon", { isComponent: true });
  const bodyAttrs = getAttrs("body");
  const bodyCellAttrsRaw = getAttrs("bodyCell", { isComponent: true });
  const checkboxBodyWrapperCellAttrs = getAttrs("checkboxBodyWrapperCell");
  const tableCheckboxAttrs = getAttrs("tableCheckbox", { isComponent: true });
  const dateSeparatorAttrs = getAttrs("dateSeparator", { isComponent: true });
  const toggleItemButtonAttrs = getAttrs("toggleItemButton");
  const secondaryRowAttrs = getAttrs("secondaryRow");
  const secondaryRowEmptyAttrs = getAttrs("secondaryRowEmpty");
  const footerRowAttrs = getAttrs("footerRow");
  const footerCellAttrs = getAttrs("footerCell", { isComponent: true });
  const footerStickyRowAttrs = getAttrs("footerStickyRow");
  const emptyAttrs = getAttrs("empty", { isComponent: true });
  const beforeFirstRowAttrsRaw = getAttrs("beforeFirstRow");
  const beforeFirstRowCellAttrs = getAttrs("beforeFirstRowCell", { isComponent: true });
  const afterLastRowAttrsRaw = getAttrs("afterLastRow");
  const afterLastRowCellAttrs = getAttrs("afterLastRowCell", { isComponent: true });

  const bodyRowAttrsRaw = getAttrs("bodyRow");

  const bodyCellAttrs = computed(() => (tdClass) => ({
    ...bodyCellAttrsRaw.value,
    class: cx([bodyCellAttrsRaw.value.class, tdClass || ""]),
  }));

  const bodyRowAttrs = computed(() => (row) => ({
    ...bodyRowAttrsRaw.value,
    class: cx([bodyRowAttrsRaw.value.class, row]),
  }));

  const headerCellAttrs = computed(() => (classes) => ({
    ...headerCellAttrsRaw.value,
    class: cx([headerCellAttrsRaw.value.class, classes]),
  }));

  const beforeFirstRowAttrs = computed(() => ({
    ...beforeFirstRowAttrsRaw.value,
    class: cx([
      beforeFirstRowAttrsRaw.value.class,
      tableRows.value[0]?.isChecked ? config.value.checkedRow : "",
    ]),
  }));

  const tableWrapperAttrs = computed(() => ({
    class: cx([
      config.value.innerWrapper,
      selectedRows.value.length && config.value.innerWrapperSelected,
    ]),
  }));

  const headerRowCellAttrs = computed(() => ({
    class: cx([
      config.value.headerRow,
      selectedRows.value.length && !isHeaderSticky.value && config.value.stickyHeaderHidden,
    ]),
  }));

  const stickyHeaderAttrs = computed(() => {
    // console.log("hasSlotContentTheadActions", hasSlotContentTheadActions.value);

    return {
      class: cx([
        config.value.stickyHeader,
        selectedRows.value.length &&
          hasSlotContentTheadActions.value &&
          config.value.stickyHeaderActions,
        isHeaderSticky.value && props.stickyHeader && config.value.stickyHeaderActive,
      ]),
    };
  });

  const footerClassesAttrs = computed(() => ({
    class: cx([config.value.footer, isFooterSticky.value && config.value.footerSticky]),
  }));

  const afterLastRowAttrs = computed(() => ({
    ...afterLastRowAttrsRaw.value,
    class: cx([
      afterLastRowAttrsRaw.value.class,
      hasSlotContent(slot["after-last-row"]) ? config.value.moreRowHidden : config.value.moreRow,
    ]),
  }));

  const stickyHeaderColumnAttrs = computed(() => (thClass) => ({
    ...customHeaderItemAttrsRaw.value,
    class: cx([customHeaderItemAttrsRaw.value.class, thClass]),
  }));

  const dateSeparatorRowAttrs = (rowIndex) => {
    const isCheckedRowBefore = tableRows.value[rowIndex - 1]?.isChecked;
    const isCheckedRowAfter = tableRows.value[rowIndex]?.isChecked;

    const activeClass =
      (isCheckedRowBefore && isCheckedRowAfter) || (rowIndex === 0 && isCheckedRowAfter)
        ? config.value.checkedRow
        : "";

    return getAttrs("option", { classes: activeClass }).value;
  };

  const toggleButtonWrapperAttrs = computed(() => (index) => ({
    class: index === 0 && isNesting.value ? config.value.toggleButtonWrapper : "",
  }));

  return {
    config,
    wrapperAttrs,
    stickyHeaderColumnAttrs,
    stickyHeaderAttrs,
    tableWrapperAttrs,
    headerRowCellAttrs,
    bodyRowAttrs,
    footerClassesAttrs,
    afterLastRowAttrs,
    afterLastRowCellAttrs,
    beforeFirstRowAttrs,
    beforeFirstRowCellAttrs,
    dateSeparatorRowAttrs,
    toggleButtonWrapperAttrs,
    headerCellAttrs,
    bodyCellAttrs,
    checkboxBodyWrapperCellAttrs,
    footerCellAttrs,
    selectAllCheckboxAttrs,
    headerSelectAllCheckboxAttrs,
    tableCheckboxAttrs,
    collapseIconAttrs,
    expandIconAttrs,
    emptyAttrs,
    dateSeparatorAttrs,
    selectedRowsCountAttrs,
    stickyHeaderLoaderAttrs,
    tableAttrs,
    headerRowAttrs,
    tableLoaderAttrs,
    bodyAttrs,
    toggleItemButtonAttrs,
    secondaryRowAttrs,
    secondaryRowEmptyAttrs,
    footerRowAttrs,
    footerStickyRowAttrs,
    hasSlotContent,
    headerAttrs,
  };
}
