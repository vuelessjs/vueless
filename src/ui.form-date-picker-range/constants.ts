/*
  This const is needed to prevent the issue in script setup:
 `defineProps` is referencing locally declared variables. (vue/valid-define-props)
 */
export const COMPONENT_NAME = "UDatePickerRange";

export const DATE_PICKER_BUTTON_TYPE = "button";
export const DATE_PICKER_INPUT_TYPE = "input";
export const INPUT_RANGE_FORMAT = "d.m.Y";

export enum InputRangeType {
  Start = "start",
  End = "end",
}

export enum Period {
  Week = "week",
  Month = "month",
  Quarter = "quarter",
  Year = "year",
  OwnRange = "ownRange",
  Custom = "custom",
}

export enum ShiftAction {
  Prev = "prev",
  Next = "next",
}
