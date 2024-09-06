<template>
  <div v-bind="monthViewAttrs">
    <UButton
      v-for="month in months"
      :key="month"
      variant="thirdary"
      color="brand"
      no-ring
      v-bind="monthAttrs(getMonthClasses(month))"
      :disabled="dateIsOutOfRange(month, minDate, maxDate, locale, dateFormat)"
      :label="formatDate(month, 'M', props.locale)"
      @click="onClickMonth(month)"
      @mousedown.prevent.capture
    />
  </div>
</template>

<script setup>
import { computed } from "vue";

import { formatDate, dateIsOutOfRange } from "../services/calendar.service";
import { isSameMonth, getDateWithoutTime, isCurrentMoth } from "../services/date.service";
import { cx } from "../../service.ui";

import useAttrs from "../composables/attrs.composable";

import { MONTHS_PER_VIEW } from "../constants";

import UButton from "../../ui.button";

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
    default: undefined,
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

const { monthViewAttrs, selectedMonthAttrs, activeMonthAttrs, monthAttrs, currentMothAttrs } =
  useAttrs(props);

const localSelectedDate = computed(() => {
  return props.selectedDate === null ? getDateWithoutTime() : props.selectedDate;
});

const localActiveMonth = computed(
  () => props.activeMonth || props.activeDate || localSelectedDate.value,
);

const months = computed(() =>
  Array.from({ length: MONTHS_PER_VIEW }, (_, i) => i).map((monthNumber) => getMonth(monthNumber)),
);

function getMonth(monthNumber) {
  let newDate = new Date(localActiveMonth.value.valueOf());

  newDate.setMonth(monthNumber);

  // Means the current day has less days so the extra month is
  // in the following month
  if (newDate.getDate() !== localActiveMonth.value.getDate()) {
    // Assign the last day of previous month
    newDate = new Date(newDate.getFullYear(), newDate.getMonth(), 0);
  }

  return newDate;
}

function getMonthClasses(month) {
  const isMonthInRange =
    props.range &&
    localSelectedDate.value &&
    props.selectedDateTo &&
    !dateIsOutOfRange(
      month,
      props.selectedDate,
      props.selectedDateTo,
      props.locale,
      props.dateFormat,
    );

  const isNotSelectedDate =
    (!isSelectedMonth(month) && !isSelectedMonth(month)) || props.selectedDate === null;

  const isMoreThenOneMonthRange =
    props.selectedDateTo && isMoreThanOneMonthDiff(props.selectedDate, props.selectedDateTo);

  if (isCurrentMoth(month) && isNotSelectedDate) {
    return cx([currentMothAttrs.value.class, isMonthInRange && props.config.inRangeDate]);
  }

  if (props.range && isSelectedMonth(month) && isMoreThenOneMonthRange) {
    return cx([props.config.inRangeEdgeDate, props.config.inRangeFirstDate]);
  }

  if (props.range && isSelectedToMonth(month) && isMoreThenOneMonthRange) {
    return cx([props.config.inRangeEdgeDate, props.config.inRangeLastDate]);
  }

  if (props.range && isSelectedMonth(month) && !isMoreThenOneMonthRange) {
    return cx([props.config.inRangeDate, "rounded-dynamic"]);
  }

  if (isMonthInRange) {
    return props.config.inRangeDate;
  }

  if (isSelectedMonth(month)) {
    return selectedMonthAttrs.value.class;
  }

  if (isSameMonth(props.activeMonth, month) && !props.range) {
    return activeMonthAttrs.value.class;
  }
}

function isMoreThanOneMonthDiff(date, dateTo) {
  const yearDiff = Math.abs(dateTo.getFullYear() - date.getFullYear());
  const monthDiff = Math.abs(dateTo.getMonth() - date.getMonth());
  const dayDiff = Math.abs(dateTo.getDate() - date.getDate());

  return yearDiff > 0 || monthDiff > 1 || (monthDiff === 1 && dayDiff > 0);
}

function isSelectedMonth(month) {
  return isSameMonth(month, localSelectedDate.value);
}

function isSelectedToMonth(month) {
  return isSameMonth(month, props.selectedDateTo);
}

function onClickMonth(month) {
  emit("input", month);
}
</script>
