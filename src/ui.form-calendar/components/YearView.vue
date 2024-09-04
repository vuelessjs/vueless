<template>
  <div v-bind="yearViewAttrs">
    <UButton
      v-for="year in years"
      :key="year"
      no-ring
      color="brand"
      variant="thirdary"
      :disabled="dateIsOutOfRange(year, minDate, maxDate, locale, dateFormat)"
      v-bind="yearAttrs(getYearClasses(year))"
      :label="formatDate(year, 'Y', props.locale)"
      @mousedown.prevent.capture
      @click="onClickMonth(year)"
    />
  </div>
</template>

<script setup>
import { computed } from "vue";

import { formatDate, getYearsRange, dateIsOutOfRange } from "../services/calendar.service";
import { isSameMonth, getDateWithoutTime, isCurrentYear } from "../services/date.service";
import { cx } from "../../service.ui";

import useAttrs from "../composables/attrs.composable";

import { YEARS_PER_VIEW } from "../constants";

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

const {
  yearViewAttrs,
  selectedYearAttrs,
  activeYearAttrs,
  yearAttrs,
  currentYearAttrs,
  inRangeYearAttrs,
  inRangeFirstYearAttrs,
  inRangeLastYearAttrs,
} = useAttrs(props);

const localSelectedDate = computed(() => {
  return props.selectedDate === null ? getDateWithoutTime() : props.selectedDate;
});

const localActiveMonth = computed(
  () => props.activeMonth || props.activeDate || localSelectedDate.value,
);

const years = computed(() => {
  const [initialYear] = getYearsRange(localActiveMonth.value, YEARS_PER_VIEW);

  return Array.from({ length: YEARS_PER_VIEW }, (_, i) => i).map((year) =>
    getYear(initialYear + year),
  );
});

function getYear(year) {
  let newDate = new Date(localActiveMonth.value.valueOf());

  newDate.setFullYear(year);

  // Means the current day has less days so the extra month is
  // in the following month
  if (newDate.getDate() !== localActiveMonth.value.getDate()) {
    // Assign the last day of previous month
    newDate = new Date(newDate.getFullYear(), newDate.getMonth(), 0);
  }

  return newDate;
}

function getYearClasses(year) {
  const isYearInRange =
    props.range &&
    localSelectedDate.value &&
    props.selectedDateTo &&
    !dateIsOutOfRange(
      year,
      props.selectedDate,
      props.selectedDateTo,
      props.locale,
      props.dateFormat,
    );

  const isNotSelectedDate =
    (!isSelectedMonth(year) && !isSelectedMonth(year)) || props.selectedDate === null;

  const isMoreThanOneYearRange =
    props.selectedDateTo &&
    props.selectedDateTo.getFullYear() - props.selectedDate.getFullYear() > 1;

  const isFirstYear = year.getFullYear() === props.selectedDate.getFullYear();
  const isLastYear =
    props.selectedDateTo && year.getFullYear() === props.selectedDateTo.getFullYear();

  if (isCurrentYear(year) && isNotSelectedDate) {
    return cx([currentYearAttrs.value.class, isYearInRange && inRangeYearAttrs.value.class]);
  }

  if (props.range && isFirstYear && isMoreThanOneYearRange) {
    return inRangeFirstYearAttrs.value.class;
  }

  if (props.range && isLastYear && isMoreThanOneYearRange) {
    return inRangeLastYearAttrs.value.class;
  }

  if (props.range && isFirstYear && !isMoreThanOneYearRange) {
    return cx(inRangeYearAttrs.value.class, "rounded-dynamic");
  }

  if (isYearInRange) {
    return inRangeYearAttrs.value.class;
  }

  if (isSelectedMonth(year)) {
    return selectedYearAttrs.value.class;
  }

  if (isSameMonth(props.activeMonth, year) && !props.range) {
    return activeYearAttrs.value.class;
  }
}

function isSelectedMonth(month) {
  return isSameMonth(month, localSelectedDate.value);
}

function onClickMonth(month) {
  emit("input", month);
}
</script>
