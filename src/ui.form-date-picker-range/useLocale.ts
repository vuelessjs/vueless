import { merge } from "lodash-es";
import { computed, ref, watch } from "vue";
import { useLocale as useGlobalLocale } from "../composables/useLocale.ts";

import { getSortedLocale } from "../ui.form-calendar/utilDate.ts";
import { LocaleType } from "../ui.form-calendar/constants.ts";
import { COMPONENT_NAME } from "./constants.ts";

import defaultConfig from "./config.ts";

import type { Locale, Props } from "./types.ts";

export function useLocale(props: Props<unknown>) {
  const { tm, locale: globalLocale } = useGlobalLocale();

  const i18nGlobal = ref(tm<Locale>(COMPONENT_NAME));

  watch(globalLocale, () => {
    i18nGlobal.value = tm<Locale>(COMPONENT_NAME);
  });

  const currentLocale = computed(() =>
    merge({}, defaultConfig.i18n, i18nGlobal.value, props.config?.i18n),
  );

  const locale = computed(() => {
    const { months, weekdays } = currentLocale.value;

    // formatted locale
    return {
      ...currentLocale.value,
      months: {
        shorthand: getSortedLocale(months.shorthand, LocaleType.Month),
        longhand: getSortedLocale(months.longhand, LocaleType.Month),
      },
      weekdays: {
        shorthand: getSortedLocale(weekdays.shorthand, LocaleType.Day),
        longhand: getSortedLocale(weekdays.longhand, LocaleType.Day),
      },
    };
  });

  const userFormatLocale = computed(() => {
    const { months, weekdays } = currentLocale.value;

    const monthsLonghand =
      Boolean(props.config?.i18n?.months?.userFormat) ||
      Boolean(i18nGlobal.value?.months?.userFormat)
        ? months.userFormat
        : months.longhand;

    const weekdaysLonghand =
      Boolean(props.config?.i18n?.weekdays?.userFormat) ||
      Boolean(i18nGlobal.value?.weekdays?.userFormat)
        ? weekdays.userFormat
        : weekdays.longhand;

    // formatted locale
    return {
      ...currentLocale.value,
      months: {
        shorthand: getSortedLocale(months.shorthand, LocaleType.Month),
        longhand: getSortedLocale(monthsLonghand, LocaleType.Month),
      },
      weekdays: {
        shorthand: getSortedLocale(weekdays.shorthand, LocaleType.Day),
        longhand: getSortedLocale(weekdaysLonghand, LocaleType.Day),
      },
    };
  });

  return { userFormatLocale, locale };
}
