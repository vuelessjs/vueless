import { computed, watchEffect } from "vue";
import { merge } from "lodash-es";

import useUI from "../composables/useUI.ts";

import defaultConfig from "./config.js";
import { Direction } from "../composables/useAutoPosition.ts";

import type { Ref } from "vue";
import type { UseAttrs } from "../types.ts";
import type { UDatePickerRangeProps, Config, IsPeriod } from "./types.ts";
import type { Config as UCalendarConfig } from "../ui.form-calendar/types.ts";

export interface DatePickerRangeState {
  isShownMenu: Ref<boolean>;
  isTop: Ref<boolean>;
  isRight: Ref<boolean>;
  isPeriod: Ref<IsPeriod>;
}

export default function useAttrs(
  props: UDatePickerRangeProps<unknown>,
  { isShownMenu, isTop, isRight, isPeriod }: DatePickerRangeState,
): UseAttrs<Config> {
  const { config, getKeysAttrs, hasSlotContent, getExtendingKeysClasses } = useUI(
    defaultConfig,
    () => props.config,
  );

  const mutatedProps = computed(() => ({
    openDirectionY: isTop.value ? Direction.Top : Direction.Bottom,
    openDirectionX: isRight.value ? Direction.Right : Direction.Left,
    error: Boolean(props.error),
    description: Boolean(props.description),
  }));

  const extendingKeys = [
    "buttonWrapperActive",
    "buttonActive",
    "periodDateWeekList",
    "periodDateMonthList",
    "periodDateQuarterList",
    "periodDateYearList",
  ];
  const extendingKeysClasses = getExtendingKeysClasses(extendingKeys, mutatedProps);

  // TODO: Declare types for getKeysAttrs return value, this could be implemented using generic;
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
  });

  /* Merging DatePickerRange's i18n translations into Calendar's i18n translations. */
  watchEffect(() => {
    const calendarAttrs = keysAttrs.calendarAttrs as Ref<{ config: UCalendarConfig }>;
    const calendarConfig = calendarAttrs.value.config || {};

    if (!calendarConfig.i18n || props.config?.i18n) {
      calendarAttrs.value.config.i18n = merge(calendarConfig.i18n, config.value.i18n);
    }
  });

  return {
    config,
    ...keysAttrs,
    hasSlotContent,
  };
}
