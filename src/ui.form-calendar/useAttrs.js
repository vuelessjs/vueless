import { computed } from "vue";
import useUI from "../composables/useUI.js";

import defaultConfig from "./config.js";

export default function useAttrs(props) {
  const { config, getKeysAttrs, hasSlotContent, getExtendingKeysClasses } = useUI(
    defaultConfig,
    () => props.config,
  );

  const dayKey = ["day"];

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

  const extendingKeysClasses = getExtendingKeysClasses(extendingKeys);
  const extendingDayKeyClasses = getExtendingKeysClasses(dayKey);

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
        extendingDayKeyClasses.day.value,
        extendingKeysClasses.dateInRange.value,
      ]),
    },
    selectedDay: {
      base: computed(() => [
        extendingDayKeyClasses.day.value,
        extendingKeysClasses.selectedDate.value,
      ]),
    },
    activeDay: {
      base: computed(() => [
        extendingDayKeyClasses.day.value,
        extendingKeysClasses.activeDate.value,
      ]),
    },
    anotherMonthDay: {
      base: computed(() => [
        extendingDayKeyClasses.day.value,
        extendingKeysClasses.anotherMonthDate.value,
      ]),
    },
    currentDay: {
      base: computed(() => [
        extendingDayKeyClasses.day.value,
        extendingKeysClasses.currentDate.value,
      ]),
    },
    currentDayInRange: {
      base: computed(() => [
        extendingDayKeyClasses.day.value,
        extendingKeysClasses.dateInRange.value,
        extendingKeysClasses.currentDate.value,
      ]),
    },
    firstDayInRange: {
      base: computed(() => [
        extendingDayKeyClasses.day.value,
        extendingKeysClasses.edgeDateInRange.value,
        extendingKeysClasses.firstDateInRange.value,
      ]),
    },
    lastDayInRange: {
      base: computed(() => [
        extendingDayKeyClasses.day.value,
        extendingKeysClasses.edgeDateInRange.value,
        extendingKeysClasses.lastDateInRange.value,
      ]),
    },
    anotherMonthLastDayInRange: {
      base: computed(() => [
        extendingDayKeyClasses.day.value,
        extendingKeysClasses.anotherMonthDay.value,
        extendingKeysClasses.edgeDateInRange.value,
        extendingKeysClasses.lastDateInRange.value,
      ]),
    },
    anotherMonthFirstDayInRange: {
      base: computed(() => [
        extendingDayKeyClasses.day.value,
        extendingKeysClasses.anotherMonthDay.value,
        extendingKeysClasses.edgeDateInRange.value,
        extendingKeysClasses.firstDateInRange.value,
      ]),
    },
    currentMonth: {
      base: computed(() => [extendingKeysClasses.currentDate.value]),
    },
    monthInRange: {
      base: computed(() => [extendingKeysClasses.dateInRange.value]),
    },
    singleMonthInRange: {
      base: computed(() => [extendingKeysClasses.dateInRange.value]),
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
      base: computed(() => [extendingKeysClasses.selectedDate.value]),
    },
    activeMonth: {
      base: computed(() => [extendingKeysClasses.activeDate.value]),
    },
    currentYear: {
      base: computed(() => [extendingKeysClasses.currentDate.value]),
    },
    yearInRange: {
      base: computed(() => [extendingKeysClasses.dateInRange.value]),
    },
    singleYearInRange: {
      base: computed(() => [extendingKeysClasses.dateInRange.value]),
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
      base: computed(() => [extendingKeysClasses.selectedDate.value]),
    },
    activeYear: {
      base: computed(() => [extendingKeysClasses.activeDate.value]),
    },
  });

  return {
    config,
    ...keysAttrs,
    hasSlotContent,
  };
}
