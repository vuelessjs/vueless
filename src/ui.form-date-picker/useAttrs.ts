import { computed, watchEffect, type Ref } from "vue";
import { merge } from "lodash-es";
import useUI from "../composables/useUI.ts";

import defaultConfig from "./config.ts";
import { Direction } from "../composables/useAutoPosition.ts";

import type { UseAttrs } from "../types.ts";
import type { UDatePickerProps, Config } from "./types.ts";
import type { Config as UCalendarConfig } from "../ui.form-calendar/types.ts";

interface ComponentState {
  isTop: Ref<boolean>;
  isRight: Ref<boolean>;
}

export default function useAttrs(
  props: UDatePickerProps<unknown>,
  { isTop, isRight }: ComponentState,
): UseAttrs<Config> {
  const { config, getKeysAttrs } = useUI(defaultConfig, () => props.config);

  const mutatedProps = computed(() => ({
    openDirectionY: isTop.value ? Direction.Top : Direction.Bottom,
    openDirectionX: isRight.value ? Direction.Right : Direction.Left,
    error: Boolean(props.error),
    description: Boolean(props.description),
  }));

  /* Merging DatePicker's i18n translations into Calendar's i18n translations. */
  watchEffect(() => {
    const calendarAttrs = keysAttrs.calendarAttrs as Ref<{ config: UCalendarConfig }>;
    const calendarConfig = calendarAttrs.value.config || {};

    if (!calendarConfig.i18n || props.config?.i18n) {
      calendarAttrs.value.config.i18n = merge(calendarConfig.i18n, config.value.i18n);
    }
  });

  return { config, ...getKeysAttrs(mutatedProps) };
}
