import { computed, watchEffect } from "vue";
import { merge } from "lodash-es";

import useUI from "../composables/useUI.ts";

import defaultConfig from "./config.js";
import { POSITION } from "../composables/useAutoPosition.ts";

export default function useAttrs(props, { isShownMenu, isTop, isRight, isPeriod }) {
  const { config, getKeysAttrs, hasSlotContent, getExtendingKeysClasses } = useUI(
    defaultConfig,
    () => props.config,
  );

  const mutatedProps = computed(() => ({
    openDirectionY: isTop.value ? POSITION.top : POSITION.bottom,
    openDirectionX: isRight.value ? POSITION.right : POSITION.left,
    error: Boolean(props.error),
    description: Boolean(props.description),
  }));

  const extendingKeys = ["buttonWrapperActive", "buttonActive", "periodDateMonthList"];
  const extendingKeysClasses = getExtendingKeysClasses(
    [
      ...extendingKeys,
      "periodButton",
      "periodDateList",
      "periodDate",
      "periodDateWeekList",
      "periodDateQuarterList",
      "periodDateYearList",
      "periodDateSelected",
      "periodDateCurrent",
    ],
    mutatedProps,
  );

  const keysAttrs = getKeysAttrs(mutatedProps, extendingKeys, {
    buttonWrapper: {
      extend: computed(() => [isShownMenu.value && extendingKeysClasses.buttonWrapperActive.value]),
    },
    button: {
      extend: computed(() => [isShownMenu.value && extendingKeysClasses.buttonActive.value]),
    },
    periodDateList: {
      extend: computed(() => [
        isPeriod.value.week && extendingKeysClasses.periodDateWeekList.value,
        isPeriod.value.month && extendingKeysClasses.periodDateMonthList.value,
        isPeriod.value.quarter && extendingKeysClasses.periodDateQuarterList.value,
        isPeriod.value.year && extendingKeysClasses.periodDateYearList.value,
      ]),
    },
    periodButtonActive: {
      base: computed(() => [extendingKeysClasses.periodButton.value]),
    },
    periodDateWeekList: {
      base: computed(() => [extendingKeysClasses.periodDateList.value]),
    },
    periodDateQuarterList: {
      base: computed(() => [extendingKeysClasses.periodDateList.value]),
    },
    periodDateYearList: {
      base: computed(() => [extendingKeysClasses.periodDateList.value]),
    },
    periodDateSelected: {
      base: computed(() => [extendingKeysClasses.periodDate.value]),
    },
    periodDateCurrent: {
      base: computed(() => [
        extendingKeysClasses.periodDate.value,
        extendingKeysClasses.periodDateCurrent.value,
      ]),
    },
    periodDateCurrentSelected: {
      base: computed(() => [
        extendingKeysClasses.periodDate.value,
        extendingKeysClasses.periodDateSelected.value,
        extendingKeysClasses.periodDateCurrent.value,
      ]),
    },
  });

  /* Merging DatePickerRange's i18n translations into Calendar's i18n translations. */
  watchEffect(() => {
    const calendarConfig = keysAttrs.calendarAttrs.value.config || {};

    if (!calendarConfig.i18n || props.config.i18n) {
      keysAttrs.calendarAttrs.value.config.i18n = merge(calendarConfig.i18n, config.value.i18n);
    }
  });

  return {
    config,
    keysAttrs,
    ...keysAttrs,
    hasSlotContent,
  };
}
