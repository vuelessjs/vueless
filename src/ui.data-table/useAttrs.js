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

  const mutatedProps = computed(() => ({
    compact: Boolean(props.compact),
  }));

  const extendingKeys = [
    "headerCellGeneral",
    "headerCounterGeneral",
    "stickyHeaderActions",
    "stickyHeaderRow",
    "bodyRowChecked",
    "stickyFooter",
  ];
  const extendingKeysClasses = getExtendingKeysClasses(
    [...extendingKeys, "bodyCell"],
    mutatedProps,
  );

  const keysAttrs = getKeysAttrs(mutatedProps, extendingKeys, {
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
      base: computed(() => [extendingKeysClasses.headerCellGeneral.value]),
    },
    headerCounter: {
      base: computed(() => [extendingKeysClasses.headerCounterGeneral.value]),
    },
    stickyHeaderCounter: {
      base: computed(() => [extendingKeysClasses.headerCounterGeneral.value]),
    },
    stickyHeaderActionsCounter: {
      base: computed(() => [extendingKeysClasses.headerCounterGeneral.value]),
    },
    headerCell: {
      base: computed(() => [extendingKeysClasses.headerCellGeneral.value]),
    },
    // bodyCell: {
    //   base: computed(() => [extendingKeysClasses.bodyCell.value]),
    // },
    bodyRowBeforeCell: {
      base: computed(() => [extendingKeysClasses.bodyCell.value]),
    },
    bodyRowAfterCell: {
      base: computed(() => [extendingKeysClasses.bodyCell.value]),
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
