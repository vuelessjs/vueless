import { computed } from "vue";

import { isSameMonth } from "../ui.form-calendar/utilDate.ts";
import { formatDate } from "../ui.form-calendar/utilCalendar.ts";

export function useUserFormat(localValue, userFormatLocale, isPeriod, locale, userDateFormat) {
  const userFormatDate = computed(() => {
    if ((!localValue.value.from && !localValue.value.to) || !localValue.value.from) return "";

    let title = "";

    const isDefaultTitle = isPeriod.value.week || isPeriod.value.custom || isPeriod.value.ownRange;

    const from = localValue.value.from;
    const to = localValue.value.to !== null ? localValue.value.to : null;

    if (isDefaultTitle) {
      let startMonthName = userFormatLocale.value.months.longhand[from.getMonth()];
      let endMonthName = userFormatLocale.value.months.longhand[to?.getMonth()];
      let endYear = to?.getFullYear();

      if (startMonthName === endMonthName && endMonthName === endYear) {
        startMonthName = "";
      }

      const isDateToSameMonth = isSameMonth(from, to);
      const isDateToSameYear = from.getFullYear() === to.getFullYear();

      let fromFormat = userDateFormat;

      if (isDateToSameMonth && isDateToSameYear) {
        fromFormat = fromFormat.replace(/[YyMmFnU]/g, "");
      }

      if (!isDateToSameMonth && isDateToSameYear) {
        fromFormat = fromFormat.replace(/[Yy]/g, "");
      }

      const fromTitle = from ? formatDate(from, fromFormat, locale.value) : "";
      const toTitle = to ? formatDate(to, userDateFormat, locale.value) : "";

      title = `${fromTitle} – ${toTitle}`;
    }

    if (isPeriod.value.month) {
      title = formatDate(from, "F Y", locale.value);
    }

    if (isPeriod.value.quarter || isPeriod.value.year) {
      const fromFormat = userDateFormat.replace(/[Yy]/g, "");

      const fromTitle = from ? formatDate(from, fromFormat, locale.value) : "";
      const toTitle = to ? formatDate(to, userDateFormat, locale.value) : "";

      title = `${fromTitle} – ${toTitle}`;
    }

    return title;
  });

  return { userFormatDate };
}
