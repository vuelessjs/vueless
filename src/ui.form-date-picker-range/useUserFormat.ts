import { computed } from "vue";

import { isSameMonth } from "../ui.form-calendar/utilDate.ts";
import { formatDate, parseDate } from "../ui.form-calendar/utilCalendar.ts";

import type { Ref } from "vue";
import type { IsPeriod, SortedLocale } from "./types.ts";
import type { RangeDate } from "../ui.form-calendar/types.ts";

export function useUserFormat(
  localValue: Ref<RangeDate>,
  userFormatLocale: Ref<SortedLocale>,
  dateFormat: string,
  isPeriod: Ref<IsPeriod>,
  locale: Ref<SortedLocale>,
  userDateFormat: string,
) {
  const userFormatDate = computed(() => {
    if ((!localValue.value.from && !localValue.value.to) || !localValue.value.from) return "";

    let title = "";

    const isDefaultTitle = isPeriod.value.week || isPeriod.value.custom || isPeriod.value.ownRange;

    const from = parseDate(localValue.value.from, dateFormat, locale.value);
    const to =
      localValue.value.to !== null
        ? parseDate(localValue.value.to, dateFormat, locale.value)
        : null;

    if (isDefaultTitle && from && to) {
      let startMonthName = userFormatLocale.value.months.longhand[from.getMonth()];
      const endMonthName = userFormatLocale.value.months.longhand[to.getMonth()];
      const endYear = String(to.getFullYear());

      if (startMonthName === endMonthName && endMonthName === endYear) {
        startMonthName = "";
      }

      const isDateToSameMonth = isSameMonth(from, to);
      const isDateToSameYear = from.getFullYear() === to.getFullYear();

      let fromFormat = userDateFormat;

      if (isDateToSameMonth && isDateToSameYear) {
        fromFormat = fromFormat.replace(/([YyMmFnU])[\W]*/g, "");
      }

      if (!isDateToSameMonth && isDateToSameYear) {
        fromFormat = fromFormat.replace(/([Yy])[\W]*/g, "");
      }

      const fromTitle = from ? formatDate(from, fromFormat, userFormatLocale.value) : "";
      const toTitle = to ? formatDate(to, userDateFormat, userFormatLocale.value) : "";

      title = `${fromTitle.trim()} – ${toTitle.trim()}`;
    }

    if (isPeriod.value.month) {
      title = formatDate(from, "F Y", userFormatLocale.value);
    }

    if (isPeriod.value.quarter || isPeriod.value.year) {
      const fromFormat = userDateFormat.replace(/([Yy])[\W]*/g, "");

      const fromTitle = from ? formatDate(from, fromFormat, userFormatLocale.value) : "";
      const toTitle = to ? formatDate(to, userDateFormat, userFormatLocale.value) : "";

      title = `${fromTitle.trim()} – ${toTitle.trim()}`;
    }

    return title;
  });

  return { userFormatDate };
}
