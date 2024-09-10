import { computed } from "vue";

import useBreakpoint from "../../composable.breakpoint";

import { isSameMonth } from "../../ui.form-calendar/services/date.service";

export function useUserFormat(localValue, userFormatLocale, isPeriod, isVariant) {
  const { isMobileBreakpoint } = useBreakpoint();

  const userFormatDate = computed(() => {
    if ((!localValue.value.from && !localValue.value.to) || !localValue.value.from) return "";

    let title = "";

    const isDefaultTitle = isPeriod.value.week || isPeriod.value.custom || isPeriod.value.ownRange;

    const from = localValue.value.from;
    const to = localValue.value.to !== null ? localValue.value.to : null;

    if (isDefaultTitle) {
      let startMonthName = userFormatLocale.value.months.longhand[from.getMonth()];
      let startYear = from.getFullYear();
      let endMonthName = userFormatLocale.value.months.longhand[to?.getMonth()];
      let endYear = to?.getFullYear();

      if (startMonthName === endMonthName && endMonthName === endYear) {
        startMonthName = "";
      }

      if (startYear.year === endYear) {
        startYear = "";
      }

      const isDatesToSameMonth = isSameMonth(from, to);
      const isDatesToSameYear = from.getFullYear() === to.getFullYear();

      let fromTitle = `${from.getDate()} ${startMonthName} ${startYear}`;

      if (isDatesToSameMonth && isDatesToSameYear) {
        fromTitle = from.getDate();
      }

      if (!isDatesToSameMonth && isDatesToSameYear) {
        fromTitle = `${from.getDate()} ${startMonthName}`;
      }

      const toTitle = to ? `${to.getDate()} ${endMonthName} ${endYear}` : "";

      title = `${fromTitle} – ${toTitle}`;
    }

    if (isPeriod.value.month) {
      const startMonthName = userFormatLocale.value.months.longhand[from.getMonth()];
      const startYear = from.getFullYear();

      title = `${startMonthName} ${startYear}`;
    }

    if (isPeriod.value.quarter || isPeriod.value.year) {
      const startMonthName = userFormatLocale.value.months.longhand[from.getMonth()];
      const endMonthName = userFormatLocale.value.months.longhand[to?.getMonth()];
      const endYear = to?.getFullYear();

      const fromTitle = `${from.getDate()} ${startMonthName}`;
      const toTitle = to ? `${to.getDate()} ${endMonthName} ${endYear}` : "";

      title = `${fromTitle} – ${toTitle}`;
    }

    if (isMobileBreakpoint.value && !isPeriod.value.month && isVariant.value.button) {
      const startDay = String(from.getDate()).padStart(2, "0");
      const endDay = String(to?.getDate())?.padStart(2, "0");
      const startMonth = String(from.getMonth()).padStart(2, "0");
      const endMonth = String(to?.getMonth())?.padStart(2, "0");

      const fromTitle = `${startDay}.${startMonth}`;
      const toTitle = to ? `${endDay}.${endMonth} / ${to.getFullYear()}` : "";

      title = `${fromTitle} – ${toTitle}`;
    }

    return title;
  });

  return { userFormatDate };
}
