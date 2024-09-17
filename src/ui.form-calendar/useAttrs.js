import useUI from "../composables/useUI.js";
import { cva, cx } from "../utils/utilUI.js";

import { computed } from "vue";

import defaultConfig from "./config.js";

export default function useAttrs(props) {
  const { config, getAttrs, isSystemKey, hasSlotContent, isCVA } = useUI(
    defaultConfig,
    () => props.config,
  );
  const attrs = {};

  const buttonVariantKeys = [
    "firstDateInRange",
    "lastDateInRange",
    "anotherMonthDate",
    "activeDate",
    "selectedDate",
    "currentDate",
    "currentDay",
    "currentDayInRange",
    "anotherMonthDay",
    "firstDayInRange",
    "anotherMonthFirstDayInRange",
    "lastDayInRange",
    "anotherMonthLastDayInRange",
    "selectedDay",
    "activeDay",
    "dayInRange",
    "edgeDateInRange",
    "dateInRange",
    "currentMonth",
    "currentMonthInRange",
    "lastMonthInRange",
    "firstMonthInRange",
    "singleMonthInRange",
    "monthInRange",
    "selectedMonth",
    "activeMonth",
    "currentYear",
    "currentYearInRange",
    "firstYearInRange",
    "lastYearInRange",
    "yearInRange",
    "singleYearInRange",
    "selectedYear",
    "activeYear",
  ];

  const timepickerInputKeys = [
    "timepickerInputHours",
    "timepickerInputMinutes",
    "timepickerInputSeconds",
  ];

  for (const key in defaultConfig) {
    if (isSystemKey(key) || buttonVariantKeys.includes(key)) continue;

    const classes = computed(() => {
      let value = config.value[key];

      if (isCVA(value)) {
        value = cva(value)({
          ...props,
        });
      }

      return value;
    });

    attrs[`${key}Attrs`] = getAttrs(key, { classes });

    if (timepickerInputKeys.includes(key)) {
      const keyAttrs = attrs[`${key}Attrs`];

      attrs[`${key}Attrs`] = computed(() => ({
        ...keyAttrs.value,
        class: cx([config.value.timepickerInput, keyAttrs.value.class]),
      }));
    }
  }

  for (const key of buttonVariantKeys) {
    if (key === "dayInRange") {
      attrs[`${key}Attrs`] = computed(() => ({
        ...attrs.dayAttrs.value,
        class: cx([attrs.dayAttrs.value.class, config.value.dateInRange, config.value.dayInRange]),
      }));
    }

    if (key === "selectedDay") {
      attrs[`${key}Attrs`] = computed(() => ({
        ...attrs.dayAttrs.value,
        class: cx([
          attrs.dayAttrs.value.class,
          config.value.selectedDate,
          config.value.selectedDay,
        ]),
      }));
    }

    if (key === "activeDay") {
      attrs[`${key}Attrs`] = computed(() => ({
        ...attrs.dayAttrs.value,
        class: cx([attrs.dayAttrs.value.class, config.value.activeDate, config.value.activeDay]),
      }));
    }

    if (key === "anotherMonthDay") {
      attrs[`${key}Attrs`] = computed(() => ({
        ...attrs.dayAttrs.value,
        class: cx([
          attrs.dayAttrs.value.class,
          config.value.anotherMonthDate,
          config.value.anotherMonthDay,
        ]),
      }));
    }

    if (key === "currentDay") {
      attrs[`${key}Attrs`] = computed(() => ({
        ...attrs.dayAttrs.value,
        class: cx([attrs.dayAttrs.value.class, config.value.currentDate, config.value.currentDay]),
      }));
    }

    if (key === "currentDayInRange") {
      attrs[`${key}Attrs`] = computed(() => ({
        ...attrs.dayAttrs.value,
        class: cx([
          attrs.dayAttrs.value.class,
          config.value.dateInRange,
          config.value.currentDate,
          config.value.currentDayInRange,
        ]),
      }));
    }

    if (key === "firstDayInRange") {
      attrs[`${key}Attrs`] = computed(() => ({
        ...attrs.dayAttrs.value,
        class: cx([
          attrs.dayAttrs.value.class,
          config.value.edgeDateInRange,
          config.value.firstDateInRange,
          config.value.firstDayInRange,
        ]),
      }));
    }

    if (key === "lastDayInRange") {
      attrs[`${key}Attrs`] = computed(() => ({
        ...attrs.dayAttrs.value,
        class: cx([
          attrs.dayAttrs.value.class,
          config.value.edgeDateInRange,
          config.value.lastDateInRange,
          config.value.lastDayInRange,
        ]),
      }));
    }

    if (key === "anotherMonthLastDayInRange") {
      attrs[`${key}Attrs`] = computed(() => ({
        ...attrs.dayAttrs.value,
        class: cx([
          attrs.dayAttrs.value.class,
          config.value.anotherMonthDay,
          config.value.edgeDateInRange,
          config.value.lastDateInRange,
          config.value.anotherMonthLastDayInRange,
        ]),
      }));
    }

    if (key === "anotherMonthFirstDayInRange") {
      attrs[`${key}Attrs`] = computed(() => ({
        ...attrs.dayAttrs.value,
        class: cx([
          attrs.dayAttrs.value.class,
          config.value.anotherMonthDay,
          config.value.edgeDateInRange,
          config.value.firstDateInRange,
          config.value.anotherMonthFirstDayInRange,
        ]),
      }));
    }

    if (key === "currentMonth") {
      attrs[`${key}Attrs`] = computed(() => ({
        ...attrs.monthAttrs.value,
        class: cx([
          attrs.monthAttrs.value.class,
          config.value.currentDate,
          config.value.currentMonth,
        ]),
      }));
    }

    if (key === "monthInRange") {
      attrs[`${key}Attrs`] = computed(() => ({
        ...attrs.monthAttrs.value,
        class: cx([
          attrs.monthAttrs.value.class,
          config.value.dateInRange,
          config.value.monthInRange,
        ]),
      }));
    }

    if (key === "singleMonthInRange") {
      attrs[`${key}Attrs`] = computed(() => ({
        ...attrs.monthAttrs.value,
        class: cx([
          attrs.monthAttrs.value.class,
          config.value.dateInRange,
          config.value.singleMonthInRange,
        ]),
      }));
    }

    if (key === "currentMonthInRange") {
      attrs[`${key}Attrs`] = computed(() => ({
        ...attrs.monthAttrs.value,
        class: cx([
          attrs.monthAttrs.value.class,
          config.value.currentDate,
          config.value.dateInRange,
          config.value.currentMonthInRange,
        ]),
      }));
    }

    if (key === "lastMonthInRange") {
      attrs[`${key}Attrs`] = computed(() => ({
        ...attrs.monthAttrs.value,
        class: cx([
          attrs.monthAttrs.value.class,
          config.value.edgeDateInRange,
          config.value.lastDateInRange,
          config.value.lastMonthInRange,
        ]),
      }));
    }

    if (key === "firstMonthInRange") {
      attrs[`${key}Attrs`] = computed(() => ({
        ...attrs.monthAttrs.value,
        class: cx([
          attrs.monthAttrs.value.class,
          config.value.edgeDateInRange,
          config.value.firstDateInRange,
          config.value.firstMonthInRange,
        ]),
      }));
    }

    if (key === "selectedMonth") {
      attrs[`${key}Attrs`] = computed(() => ({
        ...attrs.monthAttrs.value,
        class: cx([
          attrs.monthAttrs.value.class,
          config.value.selectedDate,
          config.value.selectedMonth,
        ]),
      }));
    }

    if (key === "activeMonth") {
      attrs[`${key}Attrs`] = computed(() => ({
        ...attrs.monthAttrs.value,
        class: cx([
          attrs.monthAttrs.value.class,
          config.value.activeDate,
          config.value.activeMonth,
        ]),
      }));
    }

    if (key === "currentYear") {
      attrs[`${key}Attrs`] = computed(() => ({
        ...attrs.yearAttrs.value,
        class: cx([
          attrs.yearAttrs.value.class,
          config.value.currentDate,
          config.value.currentYear,
        ]),
      }));
    }

    if (key === "yearInRange") {
      attrs[`${key}Attrs`] = computed(() => ({
        ...attrs.yearAttrs.value,
        class: cx([
          attrs.yearAttrs.value.class,
          config.value.dateInRange,
          config.value.yearInRange,
        ]),
      }));
    }

    if (key === "singleYearInRange") {
      attrs[`${key}Attrs`] = computed(() => ({
        ...attrs.yearAttrs.value,
        class: cx([
          attrs.yearAttrs.value.class,
          config.value.dateInRange,
          config.value.singleYearInRange,
        ]),
      }));
    }

    if (key === "currentYearInRange") {
      attrs[`${key}Attrs`] = computed(() => ({
        ...attrs.yearAttrs.value,
        class: cx([
          attrs.yearAttrs.value.class,
          config.value.currentDate,
          config.value.dateInRange,
          config.value.currentYearInRange,
        ]),
      }));
    }

    if (key === "lastYearInRange") {
      attrs[`${key}Attrs`] = computed(() => ({
        ...attrs.yearAttrs.value,
        class: cx([
          attrs.yearAttrs.value.class,
          config.value.edgeDateInRange,
          config.value.lastDateInRange,
          config.value.lastYearInRange,
        ]),
      }));
    }

    if (key === "firstYearInRange") {
      attrs[`${key}Attrs`] = computed(() => ({
        ...attrs.yearAttrs.value,
        class: cx([
          attrs.yearAttrs.value.class,
          config.value.edgeDateInRange,
          config.value.firstDateInRange,
          config.value.firstYearInRange,
        ]),
      }));
    }

    if (key === "selectedYear") {
      attrs[`${key}Attrs`] = computed(() => ({
        ...attrs.yearAttrs.value,
        class: cx([
          attrs.yearAttrs.value.class,
          config.value.selectedDate,
          config.value.selectedYear,
        ]),
      }));
    }

    if (key === "activeYear") {
      attrs[`${key}Attrs`] = computed(() => ({
        ...attrs.yearAttrs.value,
        class: cx([attrs.yearAttrs.value.class, config.value.activeDate, config.value.activeYear]),
      }));
    }
  }

  return {
    ...attrs,
    config,
    hasSlotContent,
  };
}
