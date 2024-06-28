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
  const dayViewAttrs = getAttrs("dayView");
  const weekDaysAttrs = getAttrs("weekDays");
  const weekDayAttrs = getAttrs("weekDay");
  const daysAttrs = getAttrs("days");
  const activeDayAttrs = getAttrs("activeDay");
  const selectedDayAttrs = getAttrs("selectedDay");
  const currentDayAttrs = getAttrs("currentDay");
  const inRangeDayAttrs = getAttrs("inRangeDay");
  const inRangeFirstDayAttrs = getAttrs("inRangeFirstDay");
  const inRangeLastDayAttrs = getAttrs("inRangeLastDay");
  const anotherMonthDayAttrs = getAttrs("anotherMonthDay");
  const monthViewAttrs = getAttrs("monthView");
  const selectedMonthAttrs = getAttrs("selectedMonth");
  const activeMonthAttrs = getAttrs("activeMonth");
  const yearViewAttrs = getAttrs("yearView");
  const selectedYearAttrs = getAttrs("selectedYear");
  const activeYearAttrs = getAttrs("activeYear");
  const timepickerAttrs = getAttrs("timepicker");
  const timepickerLabelAttrs = getAttrs("timepickerLabel");
  const timepickerInput = getAttrs("timepickerInput");
  const timepickerInputWrapperAttrs = getAttrs("timepickerInputWrapper");
  const timepickerLeftInputAttrs = getAttrs("timepickerLeftInput", {
    classes: timepickerInput.value.class,
  });
  const timepickerRightInputAttrs = getAttrs("timepickerRightInput", {
    classes: timepickerInput.value.class,
  });
  const timepickerSubmitButtonAttrs = getAttrs("timepickerSubmitButton");

  const nextPrevWrapperAttrs = getAttrs("nextPrevWrapper", { classes: optionClasses.value });

  const dayAttrs = (classes = []) => {
    return getAttrs("day", { classes }).value;
  };

  const monthAttrs = (classes = []) => {
    return getAttrs("month", { classes, isComponent: true }).value;
  };

  const yearAttrs = (classes = []) => {
    return getAttrs("year", { classes, isComponent: true }).value;
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
    dayViewAttrs,
    weekDaysAttrs,
    weekDayAttrs,
    daysAttrs,
    activeDayAttrs,
    selectedDayAttrs,
    currentDayAttrs,
    anotherMonthDayAttrs,
    dayAttrs,
    inRangeDayAttrs,
    inRangeFirstDayAttrs,
    inRangeLastDayAttrs,
    monthViewAttrs,
    selectedMonthAttrs,
    activeMonthAttrs,
    monthAttrs,
    yearViewAttrs,
    selectedYearAttrs,
    activeYearAttrs,
    yearAttrs,
    timepickerAttrs,
    timepickerLabelAttrs,
    timepickerInputWrapperAttrs,
    timepickerLeftInputAttrs,
    timepickerRightInputAttrs,
    timepickerSubmitButtonAttrs,
    nextPrevWrapperAttrs,
  };
}
