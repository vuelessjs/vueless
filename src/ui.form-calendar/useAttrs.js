import { computed } from "vue";
import useUI from "../composables/useUI.js";

import defaultConfig from "./config.js";

export default function useAttrs(props) {
  const { config, getKeysAttrs, hasSlotContent, getExtendingKeysClasses } = useUI(
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
    "day",
    "timepickerInput",
  ];
  const extendingKeysClasses = getExtendingKeysClasses(extendingKeys);

  const keysAttrs = getKeysAttrs({}, [], {
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
      extend: computed(() => [
        extendingKeysClasses.day.value,
        extendingKeysClasses.dateInRange.value,
      ]),
    },
    selectedDay: {
      extend: computed(() => [
        extendingKeysClasses.day.value,
        extendingKeysClasses.selectedDate.value,
      ]),
    },
    activeDay: {
      extend: computed(() => [
        extendingKeysClasses.day.value,
        extendingKeysClasses.activeDate.value,
      ]),
    },
    anotherMonthDay: {
      extend: computed(() => [
        extendingKeysClasses.day.value,
        extendingKeysClasses.anotherMonthDate.value,
      ]),
    },
    currentDay: {
      extend: computed(() => [
        extendingKeysClasses.day.value,
        extendingKeysClasses.currentDate.value,
      ]),
    },
    currentDayInRange: {
      extend: computed(() => [
        extendingKeysClasses.day.value,
        extendingKeysClasses.dateInRange.value,
        extendingKeysClasses.currentDate.value,
      ]),
    },
    firstDayInRange: {
      extend: computed(() => [
        extendingKeysClasses.day.value,
        extendingKeysClasses.edgeDateInRange.value,
        extendingKeysClasses.firstDateInRange.value,
      ]),
    },
    lastDayInRange: {
      extend: computed(() => [
        extendingKeysClasses.day.value,
        extendingKeysClasses.edgeDateInRange.value,
        extendingKeysClasses.lastDateInRange.value,
      ]),
    },
    anotherMonthLastDayInRange: {
      extend: computed(() => [
        extendingKeysClasses.day.value,
        extendingKeysClasses.anotherMonthDay.value,
        extendingKeysClasses.edgeDateInRange.value,
        extendingKeysClasses.lastDateInRange.value,
      ]),
    },
    anotherMonthFirstDayInRange: {
      extend: computed(() => [
        extendingKeysClasses.day.value,
        extendingKeysClasses.anotherMonthDay.value,
        extendingKeysClasses.edgeDateInRange.value,
        extendingKeysClasses.firstDateInRange.value,
      ]),
    },
    currentMonth: {
      extend: computed(() => [extendingKeysClasses.currentDate.value]),
    },
    monthInRange: {
      extend: computed(() => [extendingKeysClasses.dateInRange.value]),
    },
    singleMonthInRange: {
      extend: computed(() => [extendingKeysClasses.dateInRange.value]),
    },
    currentMonthInRange: {
      extend: computed(() => [
        extendingKeysClasses.currentDate.value,
        extendingKeysClasses.dateInRange.value,
      ]),
    },
    lastMonthInRange: {
      extend: computed(() => [
        extendingKeysClasses.edgeDateInRange.value,
        extendingKeysClasses.lastDateInRange.value,
      ]),
    },
    firstMonthInRange: {
      extend: computed(() => [
        extendingKeysClasses.edgeDateInRange.value,
        extendingKeysClasses.firstDateInRange.value,
      ]),
    },
    selectedMonth: {
      extend: computed(() => [extendingKeysClasses.selectedDate.value]),
    },
    activeMonth: {
      extend: computed(() => [extendingKeysClasses.activeDate.value]),
    },
    currentYear: {
      extend: computed(() => [extendingKeysClasses.currentDate.value]),
    },
    yearInRange: {
      extend: computed(() => [extendingKeysClasses.dateInRange.value]),
    },
    singleYearInRange: {
      extend: computed(() => [extendingKeysClasses.dateInRange.value]),
    },
    currentYearInRange: {
      extend: computed(() => [
        extendingKeysClasses.currentDate.value,
        extendingKeysClasses.dateInRange.value,
      ]),
    },
    lastYearInRange: {
      extend: computed(() => [
        extendingKeysClasses.edgeDateInRange.value,
        extendingKeysClasses.lastDateInRange.value,
      ]),
    },
    firstYearInRange: {
      extend: computed(() => [
        extendingKeysClasses.edgeDateInRange.value,
        extendingKeysClasses.firstDateInRange.value,
      ]),
    },
    selectedYear: {
      extend: computed(() => [extendingKeysClasses.selectedDate.value]),
    },
    activeYear: {
      extend: computed(() => [extendingKeysClasses.activeDate.value]),
    },
  });

  return {
    config,
    ...keysAttrs,
    hasSlotContent,
  };
}
