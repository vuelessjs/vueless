import { computed } from "vue";
import useUI from "../composables/useUI.js";

import defaultConfig from "./config.js";

export default function useAttrs(
  props,
  { tableRows, isShownActionsHeader, isHeaderSticky, isFooterSticky },
) {
  const { config, getKeysAttrs, hasSlotContent, getExtendingKeysClasses } = useUI(
    defaultConfig,
    () => props.config,
  );

  const extendingKeys = [
    "headerCellBase",
    "headerCounterBase",
    "stickyHeaderActions",
    "stickyHeaderRow",
    "stickyFooter",
  ];
  const extendingKeysClasses = getExtendingKeysClasses([
    ...extendingKeys,
    "headerCell",
    "bodyCellBase",
    "bodyRowChecked",
  ]);

  const keysAttrs = getKeysAttrs({}, extendingKeys, {
    stickyHeader: {
      extend: computed(() => [
        isShownActionsHeader.value && extendingKeysClasses.stickyHeaderActions.value,
        isShownActionsHeader.value &&
          isHeaderSticky.value &&
          extendingKeysClasses.stickyHeaderActions.value,
        !isShownActionsHeader.value &&
          isHeaderSticky.value &&
          extendingKeysClasses.stickyHeaderRow.value,
      ]),
    },
    stickyHeaderCell: {
      base: computed(() => [extendingKeysClasses.headerCellBase.value]),
    },
    headerCounter: {
      base: computed(() => [extendingKeysClasses.headerCounterBase.value]),
    },
    stickyHeaderCounter: {
      base: computed(() => [extendingKeysClasses.headerCounterBase.value]),
    },
    stickyHeaderActionsCounter: {
      base: computed(() => [extendingKeysClasses.headerCounterBase.value]),
    },
    headerCell: {
      base: computed(() => [extendingKeysClasses.headerCellBase.value]),
    },
    headerCellCheckbox: {
      base: computed(() => [
        extendingKeysClasses.headerCell.value,
        extendingKeysClasses.headerCellBase.value,
      ]),
    },
    bodyCellNestedRow: {
      base: computed(() => [extendingKeysClasses.bodyCellBase.value]),
    },
    bodyCellCheckbox: {
      base: computed(() => [extendingKeysClasses.bodyCellBase.value]),
    },
    bodyRowBeforeCell: {
      base: computed(() => [extendingKeysClasses.bodyCellBase.value]),
    },
    bodyRowAfterCell: {
      base: computed(() => [extendingKeysClasses.bodyCellBase.value]),
    },
    footer: {
      extend: computed(() => [isFooterSticky.value && extendingKeysClasses.stickyFooter.value]),
    },
    bodyRowBefore: {
      extend: computed(() => [
        tableRows.value[0]?.isChecked && extendingKeysClasses.bodyRowChecked.value,
      ]),
    },
  });

  return {
    config,
    ...keysAttrs,
    hasSlotContent,
  };
}
