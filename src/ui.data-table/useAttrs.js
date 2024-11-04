import { computed } from "vue";
import useUI from "../composables/useUI.ts";

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
    "headerCounterBase",
    "stickyHeaderActions",
    "stickyHeaderRow",
    "stickyFooter",
  ];
  const extendingKeysClasses = getExtendingKeysClasses([
    ...extendingKeys,
    "headerCellBase",
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
    headerCellCheckbox: {
      base: computed(() => [extendingKeysClasses.headerCellBase.value]),
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
    keysAttrs,
    ...keysAttrs,
    hasSlotContent,
  };
}
