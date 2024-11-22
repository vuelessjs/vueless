import { computed } from "vue";
import useUI from "../composables/useUI.ts";

import defaultConfig from "./config.ts";

import type { Row, UTableProps, Config } from "./types.ts";
import type { UseAttrs } from "../types.ts";
import type { Ref } from "vue";

export type UTableState = {
  tableRows: Ref<Row[]>;
  isShownActionsHeader: Ref<boolean>;
  isHeaderSticky: Ref<boolean>;
  isFooterSticky: Ref<boolean>;
};

export default function useAttrs(
  props: UTableProps,
  { tableRows, isShownActionsHeader, isHeaderSticky, isFooterSticky }: UTableState,
): UseAttrs<Config> {
  const { config, getKeysAttrs, hasSlotContent, getExtendingKeysClasses } = useUI(
    defaultConfig,
    () => props.config,
  );

  const extendingKeys = [
    "headerCounterBase",
    "headerActions",
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
      extend: computed(() => {
        const classes = [];

        if (isShownActionsHeader.value) {
          classes.push(extendingKeysClasses.headerActions.value);
        }

        if (isShownActionsHeader.value && isHeaderSticky.value) {
          classes.push(extendingKeysClasses.stickyHeaderActions.value);
        }

        if (!isShownActionsHeader.value && isHeaderSticky.value) {
          classes.push(extendingKeysClasses.stickyHeaderRow.value);
        }

        return classes;
      }),
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
    headerActionsCounter: {
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
    ...keysAttrs,
    hasSlotContent,
  };
}
