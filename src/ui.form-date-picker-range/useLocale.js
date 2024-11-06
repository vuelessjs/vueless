import { computed } from "vue";
import { useLocale as useGlobalLocale } from "../composables/useLocale.ts";

import { merge } from "lodash-es";
import { getSortedLocale } from "../ui.form-calendar/utilDate.ts";

import { LOCALE_TYPE } from "../ui.form-calendar/constants.js";
import { UDatePickerRange } from "./constants.js";
import defaultConfig from "./config.js";

export function useLocale(props) {
  const { tm } = useGlobalLocale();

  const i18nGlobal = tm(UDatePickerRange);

  const currentLocale = computed(() => merge(defaultConfig.i18n, i18nGlobal, props.config.i18n));

  const locale = computed(() => {
    const { months, weekdays } = currentLocale.value;

    // formatted locale
    return {
      ...currentLocale.value,
      months: {
        shorthand: getSortedLocale(months.shorthand, LOCALE_TYPE.month),
        longhand: getSortedLocale(months.longhand, LOCALE_TYPE.month),
      },
      weekdays: {
        shorthand: getSortedLocale(weekdays.shorthand, LOCALE_TYPE.day),
        longhand: getSortedLocale(weekdays.longhand, LOCALE_TYPE.day),
      },
    };
  });

  const userFormatLocale = computed(() => {
    const { months, weekdays } = currentLocale.value;

    const monthsLonghand =
      Boolean(props.config.i18n?.months?.userFormat) || Boolean(i18nGlobal?.months?.userFormat)
        ? months.userFormat
        : months.longhand;

    const weekdaysLonghand =
      Boolean(props.config.i18n?.weekdays?.userFormat) || Boolean(i18nGlobal?.weekdays?.userFormat)
        ? weekdays.userFormat
        : weekdays.longhand;

    // formatted locale
    return {
      ...currentLocale,
      months: {
        shorthand: getSortedLocale(months.shorthand, LOCALE_TYPE.month),
        longhand: getSortedLocale(monthsLonghand, LOCALE_TYPE.month),
      },
      weekdays: {
        shorthand: getSortedLocale(weekdays.shorthand, LOCALE_TYPE.day),
        longhand: getSortedLocale(weekdaysLonghand, LOCALE_TYPE.day),
      },
    };
  });

  return { userFormatLocale, locale };
}
