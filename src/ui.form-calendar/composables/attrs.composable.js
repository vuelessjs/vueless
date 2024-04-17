import useUI from "../../composable.ui";
import { cva } from "../../service.ui";

import { computed } from "vue";

import defaultConfig from "../configs/default.config";

export default function useAttrs(props) {
  const { config, getAttrs } = useUI(defaultConfig, () => props.config);
  const { nextPrevWrapper } = config.value;

  const cvaNextPrevWrapper = cva({
    base: nextPrevWrapper.base,
    variants: nextPrevWrapper.variants,
    compoundVariants: nextPrevWrapper.compoundVariants,
  });

  const optionClasses = computed(() => cvaNextPrevWrapper({ range: props.range }));

  const wrapperAttrs = getAttrs("wrapper");
  const navigationAttrs = getAttrs("navigation");
  const navigationSwitchViewButtonAttrs = getAttrs("navigationSwitchViewButton");
  const dayViewSwitchLabelAttrs = getAttrs("dayViewSwitchLabel");
  const dayViewSwitchLabelMonthAttrs = getAttrs("dayViewSwitchLabelMonth");
  const dayViewSwitchLabelIconAttrs = getAttrs("dayViewSwitchLabelIcon");
  const nextPrevButtonAttrs = getAttrs("nextPrevButton");
  const nextIconAttrs = getAttrs("nextIcon");
  const prevIconAttrs = getAttrs("prevIcon");
  const dayViewWrapperAttrs = getAttrs("dayViewWrapper");
  const weekDaysWrapperAttrs = getAttrs("weekDaysWrapper");
  const weekDayAttrs = getAttrs("weekDay");
  const daysWrapperAttrs = getAttrs("daysWrapper");
  const activeDayAttrs = getAttrs("activeDay");
  const selectedDayAttrs = getAttrs("selectedDay");
  const currentDayAttrs = getAttrs("currentDay");
  const inRangeDayAttrs = getAttrs("inRangeDay");
  const inRangeFirstDayAttrs = getAttrs("inRangeFirstDay");
  const inRangeLastDayAttrs = getAttrs("inRangeLastDay");
  const anotherMonthDayAttrs = getAttrs("anotherMonthDay");
  const monthViewWrapperAttrs = getAttrs("monthViewWrapper");
  const selectedMonthAttrs = getAttrs("selectedMonth");
  const activeMonthAttrs = getAttrs("activeMonth");
  const yearViewWrapperAttrs = getAttrs("yearViewWrapper");
  const selectedYearAttrs = getAttrs("selectedYear");
  const activeYearAttrs = getAttrs("activeYear");
  const timepickerWrapperAttrs = getAttrs("timepickerWrapper");
  const timepickerLabelAttrs = getAttrs("timepickerLabel");
  const timepickerInputWrapperAttrs = getAttrs("timepickerInputWrapper");
  const timepickerLeftInputAttrs = getAttrs("timepickerLeftInput");
  const timepickerRightInputAttrs = getAttrs("timepickerRightInput");
  const submitButtonAttrs = getAttrs("submitButton");

  const nextPrevWrapperAttrs = getAttrs("nextPrevWrapper", { classes: optionClasses.value });

  const dayAttrs = (classes = []) => {
    return getAttrs("day", { classes }).value;
  };

  const monthAttrs = (classes = []) => {
    return getAttrs("month", { classes }).value;
  };

  const yearAttrs = (classes = []) => {
    return getAttrs("year", { classes }).value;
  };

  return {
    config,
    wrapperAttrs,
    navigationAttrs,
    navigationSwitchViewButtonAttrs,
    dayViewSwitchLabelAttrs,
    dayViewSwitchLabelMonthAttrs,
    dayViewSwitchLabelIconAttrs,
    nextIconAttrs,
    nextPrevButtonAttrs,
    prevIconAttrs,
    dayViewWrapperAttrs,
    weekDaysWrapperAttrs,
    weekDayAttrs,
    daysWrapperAttrs,
    activeDayAttrs,
    selectedDayAttrs,
    currentDayAttrs,
    anotherMonthDayAttrs,
    dayAttrs,
    inRangeDayAttrs,
    inRangeFirstDayAttrs,
    inRangeLastDayAttrs,
    monthViewWrapperAttrs,
    selectedMonthAttrs,
    activeMonthAttrs,
    monthAttrs,
    yearViewWrapperAttrs,
    selectedYearAttrs,
    activeYearAttrs,
    yearAttrs,
    timepickerWrapperAttrs,
    timepickerLabelAttrs,
    timepickerInputWrapperAttrs,
    timepickerLeftInputAttrs,
    timepickerRightInputAttrs,
    submitButtonAttrs,
    nextPrevWrapperAttrs,
  };
}
