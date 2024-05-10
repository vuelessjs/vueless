/*
  This const is needed to prevent the issue in script setup:
 `defineProps` is referencing locally declared variables. (vue/valid-define-props)
 */
export const UDatePickerRange = "UDatePickerRange";

export const DATE_PICKER_BUTTON_TYPE = "button";
export const DATE_PICKER_INPUT_TYPE = "input";

export const INPUT_RANGE_TYPE = {
  start: "start",
  end: "end",
};

export const PERIOD = {
  week: "week",
  month: "month",
  quarter: "quarter",
  year: "year",
  ownRange: "ownRange",
  lastThirtyDays: "lastThirtyDays",
};
