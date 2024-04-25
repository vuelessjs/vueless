<template>
  <div v-bind="dayViewWrapperAttrs">
    <div v-bind="weekDaysWrapperAttrs">
      <span v-for="weekDay in weekdays" :key="weekDay" v-bind="weekDayAttrs" v-text="weekDay" />
    </div>
    <div v-bind="daysWrapperAttrs">
      <button
        v-for="day in days"
        :key="day"
        tabindex="-1"
        :disabled="dateIsOutOfRange(day, minDate, maxDate, locale, dateFormat)"
        v-bind="dayAttrs(getDayClasses(day))"
        @mousedown.prevent.capture
        @click="onClickDay(day)"
        v-text="formatDate(day, 'j', locale)"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

import { formatDate, dateIsOutOfRange } from "../services/calendar.service";
import {
  isToday,
  getDateWithoutTime,
  getLastDayOfMonth,
  isSameDay,
  isAnotherMothDay,
} from "../services/date.service";

import useAttrs from "../composables/attrs.composable";

import { DAYS_IN_WEEK, START_WEEK } from "../constants";

const props = defineProps({
  selectedDate: {
    type: [Date, null],
    required: true,
  },

  selectedDateTo: {
    type: [Date, null],
    default: undefined,
  },

  activeDate: {
    type: [Date, null],
    required: true,
  },

  activeMonth: {
    type: [Date, null],
    required: true,
  },

  locale: {
    type: Object,
    required: true,
  },

  dateFormat: {
    type: String,
    required: true,
  },

  range: {
    type: Boolean,
    default: false,
  },

  maxDate: {
    type: [Date, String],
    default: undefined,
  },

  minDate: {
    type: [Date, String],
    default: undefined,
  },

  config: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits(["input"]);

const {
  dayViewWrapperAttrs,
  weekDaysWrapperAttrs,
  weekDayAttrs,
  daysWrapperAttrs,
  activeDayAttrs,
  selectedDayAttrs,
  currentDayAttrs,
  anotherMonthDayAttrs,
  dayAttrs,
  inRangeFirstDayAttrs,
  inRangeLastDayAttrs,
  inRangeDayAttrs,
} = useAttrs(props);

const localSelectedDate = computed(() => {
  return props.selectedDate === null ? getDateWithoutTime() : props.selectedDate;
});

const activeMonthDate = computed(() => {
  return props.activeMonth || localSelectedDate.value;
});

const firstDayOfMonth = computed(() => {
  const date = new Date(activeMonthDate.value.valueOf());

  date.setDate(1);

  return date;
});

const lastDayOfMonth = computed(() => {
  return getLastDayOfMonth(activeMonthDate.value);
});

const firstDayOfPrevMonth = computed(() => {
  const prevMonth = activeMonthDate.value.getMonth() - 1;

  return new Date(activeMonthDate.value.getFullYear(), prevMonth, 1);
});

const lastDayOfPrevMonth = computed(() => {
  const date = new Date(activeMonthDate.value.valueOf());

  date.setDate(0);

  return date;
});

const firstDayOfNextMonth = computed(() => {
  const date = new Date(activeMonthDate.value.valueOf());
  const nextMonth = activeMonthDate.value.getMonth() + 1;

  date.setDate(1);
  date.setMonth(nextMonth);

  return date;
});

const monthDays = computed(() => {
  const dayNumber = lastDayOfMonth.value.getDate();

  return Array.from({ length: dayNumber }, (_, index) => dayNumber - index)
    .map((day) => getDay(activeMonthDate.value, day))
    .reverse();
});

const prevMonthDays = computed(() => {
  let prevMonthTotalDays = firstDayOfMonth.value.getDay() - START_WEEK;

  if (prevMonthTotalDays < 0) {
    prevMonthTotalDays = DAYS_IN_WEEK + prevMonthTotalDays;
  }

  return Array.from(
    { length: prevMonthTotalDays },
    (_, index) => lastDayOfPrevMonth.value.getDate() - index,
  )
    .map((day) => getDay(firstDayOfPrevMonth.value, day))
    .reverse();
});

const nextMonthDays = computed(() => {
  const nextMonthTotalDays =
    DAYS_IN_WEEK - (monthDays.value.concat(prevMonthDays.value).length % DAYS_IN_WEEK);

  if (nextMonthTotalDays === DAYS_IN_WEEK) {
    return [];
  }

  return Array.from({ length: nextMonthTotalDays }, (_, index) => nextMonthTotalDays - index)
    .map((day) => getDay(firstDayOfNextMonth.value, day))
    .reverse();
});

const weekdays = computed(() =>
  Array.from({ length: DAYS_IN_WEEK }, (_, index) => DAYS_IN_WEEK - index)
    .map(getWeekDayName)
    .reverse(),
);

const days = computed(() => {
  return prevMonthDays.value.concat(monthDays.value, nextMonthDays.value);
});

function getWeekDayName(dayNumber) {
  const date = new Date();

  date.setDate((date.getDate() + (DAYS_IN_WEEK + dayNumber - date.getDay())) % DAYS_IN_WEEK);

  return formatDate(date, "D", props.locale);
}

function getDay(date, dayNumber) {
  const day = new Date(date.valueOf());

  day.setDate(dayNumber);

  return day;
}

function getDayClasses(day) {
  const isNotSelectedDate =
    (!isSelectedDay(day) && !isSelectedToDay(day)) || props.selectedDate === null;

  if (isToday(day) && isNotSelectedDate) {
    return [currentDayAttrs.value.class];
  }

  if (props.range && isSelectedDay(day)) {
    return [
      inRangeFirstDayAttrs.value.class,
      isAnotherMothDay(day, activeMonthDate.value) && anotherMonthDayAttrs.value.class,
    ];
  }

  if (props.range && isSelectedToDay(day)) {
    return [
      inRangeLastDayAttrs.value.class,
      isAnotherMothDay(day, activeMonthDate.value) && anotherMonthDayAttrs.value.class,
    ];
  }

  if (
    props.range &&
    localSelectedDate.value &&
    props.selectedDateTo &&
    !dateIsOutOfRange(day, props.selectedDate, props.selectedDateTo, props.locale, props.dateFormat)
  ) {
    return [inRangeDayAttrs.value.class];
  }

  if (isSelectedDay(day)) {
    return [selectedDayAttrs.value.class];
  }

  if (isSameDay(props.activeDate, day)) {
    return [activeDayAttrs.value.class];
  }

  if (isAnotherMothDay(day, activeMonthDate.value)) {
    return [anotherMonthDayAttrs.value.class];
  }
}

function isSelectedDay(day) {
  return isSameDay(day, localSelectedDate.value);
}

function isSelectedToDay(day) {
  return isSameDay(day, props.selectedDateTo);
}

function onClickDay(day) {
  const isSameDay = isSelectedDay(day) && props.selectedDate !== null;
  const isSameDayInRange =
    isSelectedDay(day) && props.selectedDate !== null && props.selectedDateTo && props.range;

  if (isSameDay || isSameDayInRange) {
    emit("input", null);

    return;
  }

  emit("input", day);
}
</script>
