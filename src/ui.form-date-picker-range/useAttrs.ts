import { computed, watchEffect } from "vue";
import { merge } from "lodash-es";

import useUI from "../composables/useUI.ts";

import defaultConfig from "./config.ts";
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
  const { config, getKeysAttrs } = useUI(defaultConfig, () => props.config);

  const mutatedProps = computed(() => ({
    openDirectionY: isTop.value ? Direction.Top : Direction.Bottom,
    openDirectionX: isRight.value ? Direction.Right : Direction.Left,
    error: Boolean(props.error),
    description: Boolean(props.description),
    /* component state, not a props */
    opened: isShownMenu.value,
    week: isPeriod.value.week,
    month: isPeriod.value.month,
    quarter: isPeriod.value.quarter,
    year: isPeriod.value.year,
  }));

  const keysAttrs = getKeysAttrs(mutatedProps);

  /* Merging DatePickerRange's i18n translations into Calendar's i18n translations. */
  watchEffect(() => {
    const calendarAttrs = keysAttrs.calendarAttrs as Ref<{ config: UCalendarConfig }>;
    const calendarConfig = calendarAttrs.value.config || {};

    if (!calendarConfig.i18n || props.config?.i18n) {
      calendarAttrs.value.config.i18n = merge(calendarConfig.i18n, config.value.i18n);
    }
  });

  return { config, ...keysAttrs };
}
