import useUI from "../../composable.ui";
import defaultConfig from "../configs/default.config";
import { cva, cx } from "../../service.ui";
import { computed } from "vue";

export function useAttrs(
  props,
  { tableRows, isNesting, isShownActionsHeader, isHeaderSticky, isFooterSticky },
) {
  const { config, getAttrs, hasSlotContent } = useUI(defaultConfig, () => props.config);
  const { stickyHeaderCell, headerCell, footerRow, bodyCell, headerCellGeneral } = config.value;

  const cvaHeaderCellGeneral = cva({
    base: headerCellGeneral.base,
    variants: headerCellGeneral.variants,
    compoundVariants: headerCellGeneral.compoundVariants,
  });

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

  const cvaFooterRow = cva({
    base: footerRow.base,
    variants: footerRow.variants,
    compoundVariants: footerRow.compoundVariants,
  });

  const cvaBodyCell = cva({
    base: bodyCell.base,
    variants: bodyCell.variants,
    compoundVariants: bodyCell.compoundVariants,
  });

  const stickyHeaderCellClasses = computed(() => cvaCustomHeaderItem({ compact: props.compact }));
  const headerCellClasses = computed(() => cvaHeaderCell({ compact: props.compact }));
  const footerRowClasses = computed(() => cvaFooterRow({ compact: props.compact }));
  const bodyCellClasses = computed(() => cvaBodyCell({ compact: props.compact }));
  const headerCellGeneralClasses = computed(() => cvaHeaderCellGeneral({ compact: props.compact }));

  const wrapperAttrs = getAttrs("wrapper");
  const stickyHeaderAttrsRaw = getAttrs("stickyHeader");
  const stickyHeaderCellAttrsRaw = getAttrs("stickyHeaderCell", {
    classes: stickyHeaderCellClasses,
  });
  const headerCounterAttrsRaw = getAttrs("headerCounter");
  const stickyHeaderCounterAttrsRaw = getAttrs("stickyHeaderCounter");
  const stickyHeaderActionsCounterAttrsRaw = getAttrs("stickyHeaderActionsCounter");
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
  const bodyCellAttrsRaw = getAttrs("bodyCell", { classes: bodyCellClasses });
  const bodyCheckboxAttrs = getAttrs("bodyCheckbox", { isComponent: true });
  const bodyCellDateSeparatorAttrs = getAttrs("bodyCellDateSeparator");
  const bodyDateSeparatorAttrs = getAttrs("bodyDateSeparator", { isComponent: true });
  const bodyCellNestedAttrs = getAttrs("bodyCellNested");
  const bodyCellSecondaryAttrs = getAttrs("bodyCellSecondary");
  const bodyCellSecondaryEmptyAttrs = getAttrs("bodyCellSecondaryEmpty");
  const footerAttrsRaw = getAttrs("footer");
  const footerRowAttrs = getAttrs("footerRow", { classes: footerRowClasses });
  const stickyFooterRowAttrs = getAttrs("stickyFooterRow");
  const bodyEmptyStateAttrs = getAttrs("bodyEmptyState", { isComponent: true });
  const bodyRowBeforeAttrsRaw = getAttrs("bodyRowBefore");
  const bodyRowBeforeCellAttrsRaw = getAttrs("bodyRowBeforeCell");
  const bodyRowAfterAttrs = getAttrs("bodyRowAfter");
  const bodyRowAfterCellAttrsRaw = getAttrs("bodyRowAfterCell");
  const bodyCellNestedWrapperAttrsRaw = getAttrs("bodyCellNestedWrapper");

  const bodyRowAttrsRaw = getAttrs("bodyRow");

  const bodyCellAttrs = computed(() => (classes) => ({
    ...bodyCellAttrsRaw.value,
    class: cx([bodyCellAttrsRaw.value.class, classes || ""]),
  }));

  const bodyRowBeforeCellAttrs = computed(() => ({
    ...bodyRowBeforeAttrsRaw.value,
    class: cx([bodyCellAttrs.value().class, bodyRowBeforeCellAttrsRaw.value.class]),
  }));

  const bodyRowAfterCellAttrs = computed(() => ({
    ...bodyRowAfterCellAttrsRaw.value,
    class: cx([bodyCellAttrs.value().class, bodyRowAfterCellAttrsRaw.value.class]),
  }));

  const bodyRowAttrs = computed(() => (row) => ({
    ...bodyRowAttrsRaw.value,
    class: cx([bodyRowAttrsRaw.value.class, row]),
  }));

  const headerCellAttrs = computed(() => (classes) => ({
    ...headerCellAttrsRaw.value,
    class: cx([headerCellGeneralClasses.value, headerCellAttrsRaw.value.class, classes]),
  }));

  const stickyHeaderActionsCounterAttrs = computed(() => ({
    ...stickyHeaderActionsCounterAttrsRaw.value,
    class: cx([config.value.headerCounterGeneral, stickyHeaderActionsCounterAttrsRaw.value.class]),
  }));

  const stickyHeaderCounterAttrs = computed(() => ({
    ...stickyHeaderCounterAttrsRaw.value,
    class: cx([config.value.headerCounterGeneral, stickyHeaderCounterAttrsRaw.value.class]),
  }));

  const headerCounterAttrs = computed(() => ({
    ...headerCounterAttrsRaw.value,
    class: cx([config.value.headerCounterGeneral, headerCounterAttrsRaw.value.class]),
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
    class: cx([headerCellGeneralClasses.value, stickyHeaderCellAttrsRaw.value.class, classes]),
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
    stickyHeaderCounterAttrs,
    stickyHeaderActionsCounterAttrs,
    headerCounterAttrs,
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
