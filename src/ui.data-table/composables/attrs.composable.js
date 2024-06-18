import useUI from "../../composable.ui";
import defaultConfig from "../configs/default.config";
import { cva, cx } from "../../service.ui";
import { computed } from "vue";

export function useAttrs(
  props,
  { tableRows, isNesting, isShownActionsHeader, isHeaderSticky, isFooterSticky },
) {
  const { config, getAttrs, hasSlotContent } = useUI(defaultConfig, () => props.config);
  const { stickyHeaderCell, headerCell } = config.value;

  const cvaCustomHeaderItem = cva({
    base: stickyHeaderCell.base,
    variants: stickyHeaderCell.variants,
    compoundVariants: stickyHeaderCell.compoundVariants,
  });

  const cvaHeaderCell = cva({
    base: headerCell.base,
    variants: headerCell.variants,
    compoundVariants: headerCell.compoundVariants,
  });

  const stickyHeaderCellClasses = computed(() => cvaCustomHeaderItem({ compact: props.compact }));

  const headerCellClasses = computed(() => cvaHeaderCell({ compact: props.compact }));

  const wrapperAttrs = getAttrs("wrapper");
  const stickyHeaderAttrsRaw = getAttrs("stickyHeader");
  const stickyHeaderCellAttrsRaw = getAttrs("stickyHeaderCell", {
    classes: stickyHeaderCellClasses,
  });
  const stickyHeaderCounterAttrs = getAttrs("stickyHeaderCounter");
  const stickyHeaderActionsCounterAttrs = getAttrs("stickyHeaderActionsCounter");
  const stickyHeaderCheckboxAttrs = getAttrs("stickyHeaderCheckbox", {
    isComponent: true,
  });
  const stickyHeaderActionsCheckboxAttrs = getAttrs("stickyHeaderActionsCheckbox", {
    isComponent: true,
  });
  const stickyHeaderLoaderAttrs = getAttrs("stickyHeaderLoader", { isComponent: true });
  const tableWrapperAttrs = getAttrs("tableWrapper");
  const tableAttrs = getAttrs("table");
  const headerAttrs = getAttrs("header");
  const headerRowAttrsRaw = getAttrs("headerRow");
  const headerCellAttrsRaw = getAttrs("headerCell", { classes: headerCellClasses });
  const headerCheckboxAttrs = getAttrs("headerCheckbox", { isComponent: true });
  const headerLoaderAttrs = getAttrs("headerLoader", { isComponent: true });
  const bodyCellNestedExpandIconAttrs = getAttrs("bodyCellNestedExpandIcon", { isComponent: true });
  const bodyCellNestedCollapseIconAttrs = getAttrs("bodyCellNestedCollapseIcon", {
    isComponent: true,
  });
  const bodyAttrs = getAttrs("body");
  const bodyCellAttrsRaw = getAttrs("bodyCell", { isComponent: true });
  const bodyCheckboxAttrs = getAttrs("bodyCheckbox", { isComponent: true });
  const bodyCellDateSeparatorAttrs = getAttrs("bodyCellDateSeparator");
  const bodyDateSeparatorAttrs = getAttrs("bodyDateSeparator", { isComponent: true });
  const bodyCellNestedAttrs = getAttrs("bodyCellNested");
  const bodyCellSecondaryAttrs = getAttrs("bodyCellSecondary");
  const bodyCellSecondaryEmptyAttrs = getAttrs("bodyCellSecondaryEmpty");
  const footerAttrsRaw = getAttrs("footer");
  const footerRowAttrs = getAttrs("footerRow");
  const footerCellAttrs = getAttrs("footerCell", { isComponent: true });
  const stickyFooterRowAttrs = getAttrs("stickyFooterRow");
  const bodyEmptyStateAttrs = getAttrs("bodyEmptyState", { isComponent: true });
  const bodyRowBeforeAttrsRaw = getAttrs("bodyRowBefore");
  const bodyRowBeforeCellAttrs = getAttrs("bodyRowBeforeCell", { isComponent: true });
  const bodyRowAfterAttrs = getAttrs("bodyRowAfter");
  const bodyRowAfterCellAttrs = getAttrs("bodyRowAfterCell", { isComponent: true });
  const bodyCellNestedWrapperAttrsRaw = getAttrs("bodyCellNestedWrapper");

  const bodyRowAttrsRaw = getAttrs("bodyRow");

  const bodyCellAttrs = computed(() => (classes) => ({
    ...bodyCellAttrsRaw.value,
    class: cx([bodyCellAttrsRaw.value.class, classes || ""]),
  }));

  const bodyRowAttrs = computed(() => (row) => ({
    ...bodyRowAttrsRaw.value,
    class: cx([bodyRowAttrsRaw.value.class, row]),
  }));

  const headerCellAttrs = computed(() => (classes) => ({
    ...headerCellAttrsRaw.value,
    class: cx([headerCellAttrsRaw.value.class, classes]),
  }));

  const bodyRowBeforeAttrs = computed(() => ({
    ...bodyRowBeforeAttrsRaw.value,
    class: cx([
      bodyRowBeforeAttrsRaw.value.class,
      tableRows.value[0]?.isChecked ? config.value.bodyRowChecked : "",
    ]),
  }));

  const headerRowAttrs = computed(() => {
    return {
      ...headerRowAttrsRaw.value,
      class: cx([headerRowAttrsRaw.value.class]),
    };
  });

  const stickyHeaderAttrs = computed(() => {
    const actionHeaderClasses = cx([
      stickyHeaderAttrsRaw.value.class,
      config.value.stickyHeaderActions,
    ]);

    const actionHeaderStickyClasses = cx([
      config.value.stickyHeaderActions,
      stickyHeaderAttrsRaw.value.class,
    ]);

    const stickyHeaderRowClasses = cx([
      stickyHeaderAttrsRaw.value.class,
      config.value.stickyHeaderRow,
    ]);

    return {
      ...stickyHeaderAttrsRaw.value,
      class: cx([
        isShownActionsHeader.value && actionHeaderClasses,
        isShownActionsHeader.value && isHeaderSticky.value && actionHeaderStickyClasses,
        !isShownActionsHeader.value && isHeaderSticky.value && stickyHeaderRowClasses,
      ]),
    };
  });

  const footerClassesAttrs = computed(() => ({
    ...footerAttrsRaw.value,
    class: cx([footerAttrsRaw.value.class, isFooterSticky.value && config.value.stickyFooter]),
  }));

  const stickyHeaderCellAttrs = computed(() => (classes) => ({
    ...stickyHeaderCellAttrsRaw.value,
    class: cx([stickyHeaderCellAttrsRaw.value.class, classes]),
  }));

  const bodyRowDateSeparatorAttrs = (rowIndex) => {
    const isCheckedRowBefore = tableRows.value[rowIndex - 1]?.isChecked;
    const isCheckedRowAfter = tableRows.value[rowIndex]?.isChecked;

    const activeClass =
      (isCheckedRowBefore && isCheckedRowAfter) || (rowIndex === 0 && isCheckedRowAfter)
        ? config.value.bodyRowChecked
        : "";

    return getAttrs("bodyRowDateSeparator", { classes: activeClass }).value;
  };

  const bodyCellNestedWrapperAttrs = computed(() => (index) => ({
    ...bodyCellNestedWrapperAttrsRaw.value,
    class: index === 0 && isNesting.value ? config.value.bodyCellNestedWrapper : "",
  }));

  return {
    config,
    wrapperAttrs,
    stickyHeaderCellAttrs,
    stickyHeaderAttrs,
    tableWrapperAttrs,
    headerCellAttrs,
    headerRowAttrs,
    bodyRowAttrs,
    footerClassesAttrs,
    bodyRowAfterAttrs,
    bodyRowAfterCellAttrs,
    bodyRowBeforeAttrs,
    bodyRowBeforeCellAttrs,
    bodyRowDateSeparatorAttrs,
    bodyCellNestedWrapperAttrs,
    bodyCellAttrs,
    footerCellAttrs,
    stickyHeaderCounterAttrs,
    stickyHeaderActionsCounterAttrs,
    headerCheckboxAttrs,
    bodyCheckboxAttrs,
    bodyCellNestedCollapseIconAttrs,
    bodyCellNestedExpandIconAttrs,
    bodyEmptyStateAttrs,
    bodyDateSeparatorAttrs,
    bodyCellDateSeparatorAttrs,
    stickyHeaderCheckboxAttrs,
    stickyHeaderActionsCheckboxAttrs,
    stickyHeaderLoaderAttrs,
    tableAttrs,
    headerLoaderAttrs,
    bodyAttrs,
    bodyCellNestedAttrs,
    bodyCellSecondaryAttrs,
    bodyCellSecondaryEmptyAttrs,
    footerRowAttrs,
    stickyFooterRowAttrs,
    hasSlotContent,
    headerAttrs,
  };
}
