<template>
  <div v-bind="dayViewAttrs">
    <div v-bind="weekDaysAttrs">
      <span v-for="weekDay in weekdays" :key="weekDay" v-bind="weekDayAttrs" v-text="weekDay" />
    </div>
    <div v-bind="daysAttrs">
      <template v-for="day in days" :key="day">
        <UButton
          v-if="getDayState(day).isSelectedDay && !props.range"
          tabindex="-1"
          variant="primary"
          color="brand"
          no-ring
          square
          v-bind="selectedDayAttrs"
          :disabled="dateIsOutOfRange(day, minDate, maxDate, locale, dateFormat)"
          :label="formatDate(day, 'j', locale)"
          @mousedown.prevent.capture
          @click="onClickDay(day)"
        />

        <UButton
          v-else-if="getDayState(day).isCurrentDay && !getDayState(day).isDayInRange"
          tabindex="-1"
          variant="thirdary"
          color="brand"
          no-ring
          square
          v-bind="currentDayAttrs"
          :disabled="dateIsOutOfRange(day, minDate, maxDate, locale, dateFormat)"
          :label="formatDate(day, 'j', locale)"
          @mousedown.prevent.capture
          @click="onClickDay(day)"
        />

        <UButton
          v-else-if="getDayState(day).isCurrentFirstDayInRange"
          tabindex="-1"
          variant="thirdary"
          color="brand"
          no-ring
          square
          filled
          v-bind="currentFirstDayInRangeAttrs"
          :disabled="dateIsOutOfRange(day, minDate, maxDate, locale, dateFormat)"
          :label="formatDate(day, 'j', locale)"
          @mousedown.prevent.capture
          @click="onClickDay(day)"
        />

        <UButton
          v-else-if="getDayState(day).isCurrentLastDayInRange"
          tabindex="-1"
          variant="thirdary"
          color="brand"
          no-ring
          square
          filled
          v-bind="currentLastDayInRangeAttrs"
          :disabled="dateIsOutOfRange(day, minDate, maxDate, locale, dateFormat)"
          :label="formatDate(day, 'j', locale)"
          @mousedown.prevent.capture
          @click="onClickDay(day)"
        />

        <UButton
          v-else-if="getDayState(day).isFirstDayInRange"
          tabindex="-1"
          variant="primary"
          color="brand"
          no-ring
          square
          filled
          v-bind="firstDayInRangeAttrs"
          :disabled="dateIsOutOfRange(day, minDate, maxDate, locale, dateFormat)"
          :label="formatDate(day, 'j', locale)"
          @mousedown.prevent.capture
          @click="onClickDay(day)"
        />

        <UButton
          v-else-if="getDayState(day).isLastDayInRange"
          tabindex="-1"
          variant="primary"
          color="brand"
          no-ring
          square
          filled
          v-bind="lastDayInRangeAttrs"
          :disabled="dateIsOutOfRange(day, minDate, maxDate, locale, dateFormat)"
          :label="formatDate(day, 'j', locale)"
          @mousedown.prevent.capture
          @click="onClickDay(day)"
        />

        <UButton
          v-else-if="getDayState(day).isAnotherMonthFirstDayInRange"
          tabindex="-1"
          variant="thirdary"
          color="brand"
          no-ring
          square
          filled
          v-bind="anotherMonthFirstDayInRangeAttrs"
          :disabled="dateIsOutOfRange(day, minDate, maxDate, locale, dateFormat)"
          :label="formatDate(day, 'j', locale)"
          @mousedown.prevent.capture
          @click="onClickDay(day)"
        />

        <UButton
          v-else-if="getDayState(day).isAnotherMonthLastDayInRange"
          tabindex="-1"
          variant="thirdary"
          color="brand"
          no-ring
          square
          filled
          v-bind="anotherMonthLastDayInRangeAttrs"
          :disabled="dateIsOutOfRange(day, minDate, maxDate, locale, dateFormat)"
          :label="formatDate(day, 'j', locale)"
          @mousedown.prevent.capture
          @click="onClickDay(day)"
        />

        <UButton
          v-else-if="getDayState(day).isDayInRange && getDayState(day).isCurrentDay"
          tabindex="-1"
          variant="thirdary"
          color="brand"
          no-ring
          square
          v-bind="currentDayInRangeAttrs"
          :disabled="dateIsOutOfRange(day, minDate, maxDate, locale, dateFormat)"
          :label="formatDate(day, 'j', locale)"
          @mousedown.prevent.capture
          @click="onClickDay(day)"
        />

        <UButton
          v-else-if="getDayState(day).isDayInRange"
          tabindex="-1"
          variant="thirdary"
          color="brand"
          no-ring
          square
          v-bind="dayInRangeAttrs"
          :disabled="dateIsOutOfRange(day, minDate, maxDate, locale, dateFormat)"
          :label="formatDate(day, 'j', locale)"
          @mousedown.prevent.capture
          @click="onClickDay(day)"
        />

        <UButton
          v-else-if="getDayState(day).isActiveDay"
          tabindex="-1"
          variant="thirdary"
          color="brand"
          no-ring
          square
          v-bind="activeDayAttrs"
          :disabled="dateIsOutOfRange(day, minDate, maxDate, locale, dateFormat)"
          :label="formatDate(day, 'j', locale)"
          @mousedown.prevent.capture
          @click="onClickDay(day)"
        />

        <UButton
          v-else-if="getDayState(day).isAnotherMonthDay"
          tabindex="-1"
          variant="thirdary"
          color="grayscale"
          no-ring
          square
          v-bind="anotherMonthDayAttrs"
          :disabled="dateIsOutOfRange(day, minDate, maxDate, locale, dateFormat)"
          :label="formatDate(day, 'j', locale)"
          @mousedown.prevent.capture
          @click="onClickDay(day)"
        />

        <UButton
          v-else-if="!getDayState(day).isSelectedDay"
          tabindex="-1"
          variant="thirdary"
          color="grayscale"
          no-ring
          square
          v-bind="dayAttrs"
          :disabled="dateIsOutOfRange(day, minDate, maxDate, locale, dateFormat)"
          :label="formatDate(day, 'j', locale)"
          @mousedown.prevent.capture
          @click="onClickDay(day)"
        />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

import { formatDate, dateIsOutOfRange } from "./utilCalendar.ts";
import {
  isToday,
  getDateWithoutTime,
  getLastDayOfMonth,
  isSameDay,
  isAnotherMothDay,
} from "./utilDate.ts";

import useAttrs from "./useAttrs.ts";

import { DAYS_IN_WEEK, START_WEEK } from "./constants.ts";

import type { UCalendarViewProps, UCalendarProps } from "./types.ts";

import UButton from "../ui.button/UButton.vue";

const props = defineProps<UCalendarViewProps>();

const emit = defineEmits<{
  input: [date: Date | null];
}>();

const {
  dayViewAttrs,
  weekDaysAttrs,
  weekDayAttrs,
  daysAttrs,
  dayAttrs,
  currentDayAttrs,
  dayInRangeAttrs,
  currentDayInRangeAttrs,
  anotherMonthDayAttrs,
  firstDayInRangeAttrs,
  anotherMonthFirstDayInRangeAttrs,
  lastDayInRangeAttrs,
  anotherMonthLastDayInRangeAttrs,
  selectedDayAttrs,
  activeDayAttrs,
  currentLastDayInRangeAttrs,
  currentFirstDayInRangeAttrs,
} = useAttrs(props as unknown as UCalendarProps);

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

function getWeekDayName(dayNumber: number) {
  const date = new Date();

  date.setDate((date.getDate() + (DAYS_IN_WEEK + dayNumber - date.getDay())) % DAYS_IN_WEEK);

  return formatDate(date, "D", props.locale);
}

function getDay(date: Date, dayNumber: number) {
  const day = new Date(date.valueOf());

  day.setDate(dayNumber);

  return day;
}

function getDayState(day: Date) {
  const isDayInRange =
    props.range &&
    localSelectedDate.value &&
    props.selectedDate &&
    props.selectedDateTo &&
    !dateIsOutOfRange(
      day,
      props.selectedDate,
      props.selectedDateTo,
      props.locale,
      props.dateFormat,
    );

  const isSelectedDay = isSameDay(day, localSelectedDate.value) && props.selectedDate !== null;
  const isCurrentDay = isToday(day);
  const isAnotherMonthDay = isAnotherMothDay(day, activeMonthDate.value);
  const isCurrentDayInRange = isCurrentDay && isDayInRange;
  const isFirstDayInRange = props.range && isSameDay(day, localSelectedDate.value);
  const isLastDayInRange =
    props.selectedDateTo && props.range && isSameDay(day, props.selectedDateTo);
  const isCurrentFirstDayInRange = isFirstDayInRange && isCurrentDay;
  const isCurrentLastDayInRange = isLastDayInRange && isCurrentDay;
  const isAnotherMonthFirstDayInRange = isFirstDayInRange && isAnotherMonthDay;
  const isAnotherMonthLastDayInRange = isLastDayInRange && isAnotherMonthDay;
  const isActiveDay = props.activeDate && isSameDay(props.activeDate, day) && !props.range;

  return {
    isDayInRange,
    isSelectedDay,
    isCurrentDay,
    isAnotherMonthDay,
    isCurrentDayInRange,
    isFirstDayInRange,
    isLastDayInRange,
    isCurrentFirstDayInRange,
    isCurrentLastDayInRange,
    isAnotherMonthFirstDayInRange,
    isAnotherMonthLastDayInRange,
    isActiveDay,
  };
}

function onClickDay(day: Date) {
  const isSameDate = isSameDay(day, localSelectedDate.value) && props.selectedDate !== null;
  const isSameDayInRange =
    isSameDay(day, localSelectedDate.value) &&
    props.selectedDate !== null &&
    props.selectedDateTo &&
    props.range;

  if (isSameDate || isSameDayInRange) {
    emit("input", null);

    return;
  }

  emit("input", day);
}
</script>
