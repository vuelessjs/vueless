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
    const { from, to } = localValue.value;

    if (!from) return "";

    const parsedFrom = parseDate(from, dateFormat, locale.value);
    const parsedTo = to ? parseDate(to, dateFormat, locale.value) : null;

    if (!parsedFrom) return "";

    if (isPeriod.value.month) return formatDate(parsedFrom, "F Y", userFormatLocale.value);

    const isSameYearFlag = parsedTo && isSameYear(parsedFrom, parsedTo);
    const isSameMonthFlag = parsedTo && isSameMonth(parsedFrom, parsedTo);

    const formatParts = userDateFormat.split(/([^dmYFnU]+)/);
    let fromParts = [...formatParts];

    if (isSameMonthFlag) {
      fromParts = ["d"];
    } else if (isSameYearFlag) {
      let monthFound = false;

      fromParts = fromParts.filter((part, index) => {
        if (/[Yy]/.test(part)) return false;

        if (/[MmFnU]/.test(part)) {
          monthFound = true;

          return true;
        }

        if (/d/.test(part)) return true;

        if (monthFound && index > 0 && /[^dmYFnU]+/.test(part)) {
          monthFound = false;

          return false;
        }

        return true;
      });
    }

    const fromTitle = formatDate(parsedFrom, fromParts.join(""), userFormatLocale.value);
    const toTitle = parsedTo ? formatDate(parsedTo, userDateFormat, userFormatLocale.value) : "";

    return `${fromTitle.trim()} - ${toTitle.trim()}`;
  });

  return { userFormatDate };
}
