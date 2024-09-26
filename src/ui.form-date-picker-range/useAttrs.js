import { computed, watchEffect } from "vue";
import { merge } from "lodash-es";

import useUI from "../composables/useUI.js";

import defaultConfig from "./config.js";
import { POSITION } from "../composables/useAutoPosition.js";

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

  const extendingKeys = ["buttonWrapperActive", "buttonActive", "edgePeriodDate"];
  const extendingKeysClasses = getExtendingKeysClasses([
    ...extendingKeys,
    "rangeInput",
    "periodButton",
    "periodDateList",
    "periodDate",
  ]);

  const keysAttrs = getKeysAttrs(mutatedProps, extendingKeys, {
    buttonWrapper: {
      extend: computed(() => [isShownMenu.value && extendingKeysClasses.buttonWrapperActive.value]),
    },
    button: {
      extend: computed(() => [isShownMenu.value && extendingKeysClasses.buttonActive.value]),
    },
    rangeInputFirst: {
      base: computed(() => [extendingKeysClasses.rangeInput.value]),
    },
    rangeInputLast: {
      base: computed(() => [extendingKeysClasses.rangeInput.value]),
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
    periodDateActive: {
      base: computed(() => [extendingKeysClasses.periodDate.value]),
    },
    periodDateInRange: {
      base: computed(() => [extendingKeysClasses.periodDate.value]),
    },
    firstPeriodGridDate: {
      base: computed(() => [
        extendingKeysClasses.periodDate.value,
        extendingKeysClasses.edgePeriodDate.value,
      ]),
    },
    firstPeriodListDate: {
      base: computed(() => [
        extendingKeysClasses.periodDate.value,
        extendingKeysClasses.edgePeriodDate.value,
      ]),
    },
    lastPeriodGridDate: {
      base: computed(() => [
        extendingKeysClasses.periodDate.value,
        extendingKeysClasses.edgePeriodDate.value,
      ]),
    },
    lastPeriodListDate: {
      base: computed(() => [
        extendingKeysClasses.periodDate.value,
        extendingKeysClasses.edgePeriodDate.value,
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

  const periodDateListAttrs = computed(() => {
    if (isPeriod.value.week) return keysAttrs.periodDateWeekListAttrs.value;
    if (isPeriod.value.month) return keysAttrs.periodDateMonthListAttrs.value;
    if (isPeriod.value.quarter) return keysAttrs.periodDateQuarterListAttrs.value;
    if (isPeriod.value.year) return keysAttrs.periodDateYearListAttrs.value;

    return keysAttrs.periodDateListAttrs.value;
  });

  const periodDatesMenuAttrs = computed(() => ({
    periodsRowAttrs: keysAttrs.periodsRowAttrs.value,
    periodButtonAttrs: keysAttrs.periodButtonAttrs.value,
    periodButtonActiveAttrs: keysAttrs.periodButtonActiveAttrs.value,
    periodDateAttrs: keysAttrs.periodDateAttrs.value,
    periodDateActiveAttrs: keysAttrs.periodDateActiveAttrs.value,
    periodDateInRangeAttrs: keysAttrs.periodDateInRangeAttrs.value,
    periodDateListAttrs: periodDateListAttrs.value,
    rangeSwitchWrapperAttrs: keysAttrs.rangeSwitchWrapperAttrs.value,
    rangeSwitchButtonAttrs: keysAttrs.rangeSwitchButtonAttrs.value,
    rangeSwitchTitleAttrs: keysAttrs.rangeSwitchTitleAttrs.value,
    lastPeriodGridDateAttrs: keysAttrs.lastPeriodGridDateAttrs.value,
    firstPeriodGridDateAttrs: keysAttrs.firstPeriodGridDateAttrs.value,
    lastPeriodListDateAttrs: keysAttrs.lastPeriodListDateAttrs.value,
    firstPeriodListDateAttrs: keysAttrs.firstPeriodListDateAttrs.value,
    customRangeDescription: keysAttrs.customRangeDescriptionAttrs.value,
  }));

  const rangeInputsAttrs = computed(() => ({
    rangeInputFirstAttrs: keysAttrs.rangeInputFirstAttrs.value,
    rangeInputLastAttrs: keysAttrs.rangeInputLastAttrs.value,
  }));

  return {
    config,
    ...keysAttrs,
    hasSlotContent,
    periodDatesMenuAttrs,
    rangeInputsAttrs,
    periodDateListAttrs,
  };
}
