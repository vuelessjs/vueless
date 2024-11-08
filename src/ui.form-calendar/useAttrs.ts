import { computed } from "vue";
import useUI from "../composables/useUI.ts";

import defaultConfig from "./config.js";

import type { UseAttrs } from "../types.ts";
import type { UCalendarProps, Config } from "./types.ts";

export default function useAttrs(props: UCalendarProps<unknown>): UseAttrs<Config> {
  const { config, getKeysAttrs, hasSlotContent, getExtendingKeysClasses } = useUI<Config>(
    defaultConfig,
    () => props.config,
  );

  const extendingKeys = [
    "firstDateInRange",
    "lastDateInRange",
    "anotherMonthDate",
    "activeDate",
    "selectedDate",
    "currentDate",
    "edgeDateInRange",
    "dateInRange",
    "timepickerInput",
  ];

  const extendingKeysClasses = getExtendingKeysClasses([...extendingKeys, "day", "month", "year"]);

  const keysAttrs = getKeysAttrs({}, extendingKeys, {
    timepickerInputHours: {
      base: computed(() => [extendingKeysClasses.timepickerInput.value]),
    },
    timepickerInputMinutes: {
      base: computed(() => [extendingKeysClasses.timepickerInput.value]),
    },
    timepickerInputSeconds: {
      base: computed(() => [extendingKeysClasses.timepickerInput.value]),
    },
    dayInRange: {
      base: computed(() => [
        extendingKeysClasses.day.value,
        extendingKeysClasses.dateInRange.value,
      ]),
    },
    selectedDay: {
      base: computed(() => [
        extendingKeysClasses.day.value,
        extendingKeysClasses.selectedDate.value,
      ]),
    },
    activeDay: {
      base: computed(() => [extendingKeysClasses.day.value, extendingKeysClasses.activeDate.value]),
    },
    anotherMonthDay: {
      base: computed(() => [
        extendingKeysClasses.day.value,
        extendingKeysClasses.anotherMonthDate.value,
      ]),
    },
    currentDay: {
      base: computed(() => [
        extendingKeysClasses.day.value,
        extendingKeysClasses.currentDate.value,
      ]),
    },
    currentDayInRange: {
      base: computed(() => [
        extendingKeysClasses.day.value,
        extendingKeysClasses.dateInRange.value,
        extendingKeysClasses.currentDate.value,
      ]),
    },
    currentFirstDayInRange: {
      base: computed(() => [
        extendingKeysClasses.day.value,
        extendingKeysClasses.edgeDateInRange.value,
        extendingKeysClasses.firstDateInRange.value,
        extendingKeysClasses.currentDate.value,
      ]),
    },
    currentLastDayInRange: {
      base: computed(() => [
        extendingKeysClasses.day.value,
        extendingKeysClasses.edgeDateInRange.value,
        extendingKeysClasses.lastDateInRange.value,
        extendingKeysClasses.currentDate.value,
      ]),
    },
    firstDayInRange: {
      base: computed(() => [
        extendingKeysClasses.day.value,
        extendingKeysClasses.edgeDateInRange.value,
        extendingKeysClasses.firstDateInRange.value,
      ]),
    },
    lastDayInRange: {
      base: computed(() => [
        extendingKeysClasses.day.value,
        extendingKeysClasses.edgeDateInRange.value,
        extendingKeysClasses.lastDateInRange.value,
      ]),
    },
    anotherMonthLastDayInRange: {
      base: computed(() => [
        extendingKeysClasses.day.value,
        extendingKeysClasses.anotherMonthDay.value,
        extendingKeysClasses.edgeDateInRange.value,
        extendingKeysClasses.lastDateInRange.value,
      ]),
    },
    anotherMonthFirstDayInRange: {
      base: computed(() => [
        extendingKeysClasses.day.value,
        extendingKeysClasses.anotherMonthDay.value,
        extendingKeysClasses.edgeDateInRange.value,
        extendingKeysClasses.firstDateInRange.value,
      ]),
    },
    currentMonth: {
      base: computed(() => [
        extendingKeysClasses.month.value,
        extendingKeysClasses.currentDate.value,
      ]),
    },
    monthInRange: {
      base: computed(() => [
        extendingKeysClasses.month.value,
        extendingKeysClasses.dateInRange.value,
      ]),
    },
    singleMonthInRange: {
      base: computed(() => [
        extendingKeysClasses.month.value,
        extendingKeysClasses.dateInRange.value,
      ]),
    },
    singleCurrentMonthInRange: {
      base: computed(() => [
        extendingKeysClasses.year.value,
        extendingKeysClasses.dateInRange.value,
        extendingKeysClasses.currentDate.value,
      ]),
    },
    currentFirstYearInRange: {
      base: computed(() => [
        extendingKeysClasses.year.value,
        extendingKeysClasses.edgeDateInRange.value,
        extendingKeysClasses.firstDateInRange.value,
        extendingKeysClasses.currentDate.value,
      ]),
    },
    currentLastYearInRange: {
      base: computed(() => [
        extendingKeysClasses.year.value,
        extendingKeysClasses.edgeDateInRange.value,
        extendingKeysClasses.lastDateInRange.value,
        extendingKeysClasses.currentDate.value,
      ]),
    },
    currentMonthInRange: {
      base: computed(() => [
        extendingKeysClasses.month.value,
        extendingKeysClasses.currentDate.value,
        extendingKeysClasses.dateInRange.value,
      ]),
    },
    lastMonthInRange: {
      base: computed(() => [
        extendingKeysClasses.month.value,
        extendingKeysClasses.edgeDateInRange.value,
        extendingKeysClasses.lastDateInRange.value,
      ]),
    },
    currentFirstMonthInRange: {
      base: computed(() => [
        extendingKeysClasses.month.value,
        extendingKeysClasses.edgeDateInRange.value,
        extendingKeysClasses.firstDateInRange.value,
        extendingKeysClasses.currentDate.value,
      ]),
    },
    currentLastMonthInRange: {
      base: computed(() => [
        extendingKeysClasses.month.value,
        extendingKeysClasses.edgeDateInRange.value,
        extendingKeysClasses.lastDateInRange.value,
        extendingKeysClasses.currentDate.value,
      ]),
    },
    firstMonthInRange: {
      base: computed(() => [
        extendingKeysClasses.month.value,
        extendingKeysClasses.edgeDateInRange.value,
        extendingKeysClasses.firstDateInRange.value,
      ]),
    },
    selectedMonth: {
      base: computed(() => [
        extendingKeysClasses.month.value,
        extendingKeysClasses.selectedDate.value,
      ]),
    },
    activeMonth: {
      base: computed(() => [
        extendingKeysClasses.month.value,
        extendingKeysClasses.activeDate.value,
      ]),
    },
    currentYear: {
      base: computed(() => [
        extendingKeysClasses.year.value,
        extendingKeysClasses.currentDate.value,
      ]),
    },
    yearInRange: {
      base: computed(() => [
        extendingKeysClasses.year.value,
        extendingKeysClasses.dateInRange.value,
      ]),
    },
    singleCurrentYearInRange: {
      base: computed(() => [
        extendingKeysClasses.year.value,
        extendingKeysClasses.dateInRange.value,
        extendingKeysClasses.currentDate.value,
      ]),
    },
    singleYearInRange: {
      base: computed(() => [
        extendingKeysClasses.year.value,
        extendingKeysClasses.dateInRange.value,
      ]),
    },
    currentYearInRange: {
      base: computed(() => [
        extendingKeysClasses.year.value,
        extendingKeysClasses.currentDate.value,
        extendingKeysClasses.dateInRange.value,
      ]),
    },
    lastYearInRange: {
      base: computed(() => [
        extendingKeysClasses.year.value,
        extendingKeysClasses.edgeDateInRange.value,
        extendingKeysClasses.lastDateInRange.value,
      ]),
    },
    firstYearInRange: {
      base: computed(() => [
        extendingKeysClasses.year.value,
        extendingKeysClasses.edgeDateInRange.value,
        extendingKeysClasses.firstDateInRange.value,
      ]),
    },
    selectedYear: {
      base: computed(() => [
        extendingKeysClasses.year.value,
        extendingKeysClasses.selectedDate.value,
      ]),
    },
    activeYear: {
      base: computed(() => [
        extendingKeysClasses.year.value,
        extendingKeysClasses.activeDate.value,
      ]),
    },
  });

  return {
    config,
    ...keysAttrs,
    hasSlotContent,
  };
}
