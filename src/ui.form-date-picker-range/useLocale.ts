import { computed } from "vue";
import { useComponentLocaleMessages } from "../composables/useComponentLocaleMassages";

import { getSortedLocale } from "../ui.form-calendar/utilDate";
import { LocaleType } from "../ui.form-calendar/constants";
import { COMPONENT_NAME } from "./constants";

import defaultConfig from "./config";

import type { Locale, Props } from "./types";

export function useLocale(props: Props<unknown>) {
  const { localeMessages } = useComponentLocaleMessages<Locale>(
    COMPONENT_NAME,
    defaultConfig.i18n,
    props?.config?.i18n,
  );

  const locale = computed(() => {
    const { months, weekdays } = localeMessages.value;

    // formatted locale
    return {
      ...localeMessages.value,
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
    const { months, weekdays } = localeMessages.value;

    const monthsLonghand = Boolean(localeMessages.value.months?.userFormat)
      ? months.userFormat
      : months.longhand;

    const weekdaysLonghand = Boolean(localeMessages.value.months?.userFormat)
      ? weekdays.userFormat
      : weekdays.longhand;

    // formatted locale
    return {
      ...localeMessages.value,
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
