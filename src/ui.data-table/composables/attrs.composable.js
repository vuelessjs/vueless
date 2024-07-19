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
      const stickyHeaderAttrs = computed(() => {
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
          ...stickyHeaderAttrs.value,
          class: cx([
            isShownActionsHeader.value && actionHeaderClasses,
            isShownActionsHeader.value && isHeaderSticky.value && actionHeaderStickyClasses,
            !isShownActionsHeader.value && isHeaderSticky.value && stickyHeaderRowClasses,
          ]),
        };
      });
    }

    if (key === "stickyHeaderCell") {
      const stickyHeaderCellAttrs = computed(() => (classes) => ({
        ...stickyHeaderCellAttrs.value,
        class: cx([stickyHeaderCellAttrs.value.class, classes]),
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
      const headerCellAttrs = computed(() => (classes) => ({
        ...headerCellAttrs.value,
        class: cx([headerCellAttrs.value.class, classes]),
      }));
    }

    if (key === "bodyCell") {
      const bodyCellAttrs = computed(() => (classes) => ({
        ...bodyCellAttrs.value,
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
  }

  return {
    ...attrs,
    config,
    hasSlotContent,
  };
}
