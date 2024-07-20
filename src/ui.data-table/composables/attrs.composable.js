import useUI from "../../composable.ui";
import defaultConfig from "../configs/default.config";
import { cva, cx } from "../../service.ui";
import { computed } from "vue";

export default function useAttrs(
  props,
  { tableRows, isShownActionsHeader, isHeaderSticky, isFooterSticky },
) {
  const { config, getAttrs, hasSlotContent, isSystemKey } = useUI(
    defaultConfig,
    () => props.config,
  );
  const attrs = {};

  const headerCellGeneralClasses = computed(() => {
    return cva(config.value.headerCellGeneral)({
      ...props,
      compact: Boolean(props.compact),
    });
  });

  for (const key in defaultConfig) {
    if (isSystemKey(key)) continue;

    const classes = computed(() => {
      const value = config.value[key];

      if (value.variants || value.compoundVariants) {
        return cva(value)({
          ...props,
          compact: Boolean(props.compact),
        });
      }

      return "";
    });

    attrs[`${key}Attrs`] = getAttrs(key, { classes });

    if (key === "stickyHeader") {
      attrs[`${key}Attrs`] = computed(() => {
        const stickyHeaderAttrs = getAttrs("stickyHeader", { classes });

        const actionHeaderClasses = cx([
          stickyHeaderAttrs.value.class,
          config.value.stickyHeaderActions,
        ]);

        const actionHeaderStickyClasses = cx([
          config.value.stickyHeaderActions,
          stickyHeaderAttrs.value.class,
        ]);

        const stickyHeaderRowClasses = cx([
          stickyHeaderAttrs.value.class,
          config.value.stickyHeaderRow,
        ]);

        return {
          ...stickyHeaderAttrs,
          class: cx([
            isShownActionsHeader.value && actionHeaderClasses,
            isShownActionsHeader.value && isHeaderSticky.value && actionHeaderStickyClasses,
            !isShownActionsHeader.value && isHeaderSticky.value && stickyHeaderRowClasses,
          ]),
        };
      });
    }

    if (key === "stickyHeaderCell") {
      const stickyHeaderCellAttrs = getAttrs("stickyHeaderCell", { classes });

      attrs[`${key}Attrs`] = computed(() => (classes) => ({
        ...stickyHeaderCellAttrs,
        class: cx([headerCellGeneralClasses.value, stickyHeaderCellAttrs.value.class, classes]),
      }));
    }

    if (key === "headerCounter") {
      const headerCounterAttrs = computed(() => ({
        ...headerCounterAttrs.value,
        class: cx([config.value.headerCounterGeneral, headerCounterAttrs.value.class]),
      }));
    }

    if (key === "stickyHeaderCounter") {
      const stickyHeaderCounterAttrs = computed(() => ({
        ...stickyHeaderCounterAttrs.value,
        class: cx([config.value.headerCounterGeneral, stickyHeaderCounterAttrs.value.class]),
      }));
    }

    if (key === "stickyHeaderActionsCounter") {
      const stickyHeaderActionsCounterAttrs = computed(() => ({
        ...stickyHeaderActionsCounterAttrs.value,
        class: cx([config.value.headerCounterGeneral, stickyHeaderActionsCounterAttrs.value.class]),
      }));
    }

    if (key === "headerRow") {
      const headerRowAttrs = computed(() => {
        return {
          ...headerRowAttrs.value,
          class: cx([headerRowAttrs.value.class]),
        };
      });
    }

    if (key === "headerCell") {
      const headerCellAttrs = getAttrs("headerCell", { classes });

      attrs[`${key}Attrs`] = computed(() => (classes) => ({
        ...headerCellAttrs,
        class: cx([headerCellGeneralClasses.value, headerCellAttrs.value.class, classes]),
      }));
    }

    if (key === "bodyCell") {
      const bodyCellAttrs = getAttrs("bodyCell", { classes });

      attrs[`${key}Attrs`] = computed(() => (classes) => ({
        ...bodyCellAttrs,
        class: cx([bodyCellAttrs.value.class, classes || ""]),
      }));

      const bodyRowBeforeCellAttrs = computed(() => ({
        ...bodyRowBeforeCellAttrs.value,
        class: cx([bodyCellAttrs.value().class, bodyRowBeforeCellAttrs.value.class]),
      }));

      const bodyRowAfterCellAttrs = computed(() => ({
        ...bodyRowAfterCellAttrs.value,
        class: cx([bodyCellAttrs.value().class, bodyRowAfterCellAttrs.value.class]),
      }));
    }

    if (key === "bodyRow") {
      const bodyRowAttrs = getAttrs("bodyRow", { classes });

      attrs[`${key}Attrs`] = computed(() => (row) => ({
        ...bodyRowAttrs,
        class: cx([bodyRowAttrs.value.class, row]),
      }));
    }

    if (key === "footer") {
      const footerAttrs = computed(() => ({
        ...footerAttrs.value,
        class: cx([footerAttrs.value.class, isFooterSticky.value && config.value.stickyFooter]),
      }));
    }

    if (key === "bodyRowBefore") {
      const bodyRowBeforeAttrs = computed(() => ({
        ...bodyRowBeforeAttrs.value,
        class: cx([
          bodyRowBeforeAttrs.value.class,
          tableRows.value[0]?.isChecked ? config.value.bodyRowChecked : "",
        ]),
      }));
    }

    if (key === "bodyRowDateSeparator") {
      attrs[`${key}Attrs`] = (rowIndex) => {
        const isCheckedRowBefore = tableRows.value[rowIndex - 1]?.isChecked;
        const isCheckedRowAfter = tableRows.value[rowIndex]?.isChecked;

        const activeClass =
          (isCheckedRowBefore && isCheckedRowAfter) || (rowIndex === 0 && isCheckedRowAfter)
            ? config.value.bodyRowChecked
            : "";

        return getAttrs("bodyRowDateSeparator", { classes: activeClass }).value;
      };
    }
  }

  return {
    ...attrs,
    config,
    hasSlotContent,
  };
}
