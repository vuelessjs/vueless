import { computed } from "vue";

import { isSameMonth, isSameYear } from "../ui.form-calendar/utilDate.ts";

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
      const isDateToSameMonth = isSameMonth(from, to);
      const isDateToSameYear = isSameYear(from, to);

      const dateFormatParts = userDateFormat.split(/([^dmYFnU]+)/);

      let fromParts = [...dateFormatParts];

      if (isDateToSameYear) {
        if (isDateToSameMonth) {
          fromParts = ["d"];
        } else {
          let monthFound = false;

          fromParts = fromParts.filter((part, index) => {
            if (/[Yy]/.test(part)) {
              return false;
            }

            if (/[MmFnU]/.test(part)) {
              monthFound = true;

              return true;
            }

            if (/d/.test(part)) {
              return true;
            }

            if (monthFound && index > 0 && /[^dmYFnU]+/.test(part)) {
              monthFound = false;

              return false;
            }

            return true;
          });
        }
      }

      const fromFormat = fromParts.join("");
      const fromTitle = from ? formatDate(from, fromFormat, userFormatLocale.value) : "";
      const toTitle = to ? formatDate(to, userDateFormat, userFormatLocale.value) : "";

      title = `${fromTitle.trim()} - ${toTitle.trim()}`;
    }

    if (isPeriod.value.month) {
      title = formatDate(from, "F Y", userFormatLocale.value);
    }

    if (isPeriod.value.quarter || isPeriod.value.year) {
      const isDateToSameYear = from && to ? from.getFullYear() === to.getFullYear() : false;

      const dateFormatParts = userDateFormat.split(/([^dmYFnU]+)/);

      let fromParts = [...dateFormatParts];

      if (isDateToSameYear) {
        let yearFound = false;

        fromParts = fromParts.filter((part, index) => {
          if (/[Yy]/.test(part)) {
            return false;
          }

          if (/[MmFnUd]/.test(part)) {
            yearFound = true;

            return true;
          }

          if (yearFound && index > 0 && /[^dmYFnU]+/.test(part)) {
            yearFound = false;

            return false;
          }

          return true;
        });
      }

      const fromFormat = fromParts.join("");

      const fromTitle = from ? formatDate(from, fromFormat, userFormatLocale.value) : "";

      const toTitle = to ? formatDate(to, userDateFormat, userFormatLocale.value) : "";

      title = `${fromTitle.trim()} - ${toTitle.trim()}`;
    }

    return title;
  });

  return { userFormatDate };
}
