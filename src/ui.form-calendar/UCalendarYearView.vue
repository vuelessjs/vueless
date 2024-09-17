<template>
  <div v-bind="yearViewAttrs">
    <template v-for="year in years" :key="year">
      <UButton
        v-if="getYearState(year).isCurrentYear && !getYearState(year).isCurrentYearInRange"
        variant="thirdary"
        color="brand"
        no-ring
        v-bind="currentYearAttrs"
        :disabled="dateIsOutOfRange(year, minDate, maxDate, locale, dateFormat)"
        :label="formatDate(year, 'Y', props.locale)"
        @click="onClickYear(year)"
        @mousedown.prevent.capture
      />

      <UButton
        v-else-if="getYearState(year).isCurrentYearInRange"
        variant="thirdary"
        color="brand"
        no-ring
        v-bind="currentYearInRangeAttrs"
        :disabled="dateIsOutOfRange(year, minDate, maxDate, locale, dateFormat)"
        :label="formatDate(year, 'Y', props.locale)"
        @click="onClickYear(year)"
        @mousedown.prevent.capture
      />

      <UButton
        v-else-if="getYearState(year).isFirstYearInRange"
        variant="thirdary"
        color="brand"
        no-ring
        filled
        v-bind="firstYearInRangeAttrs"
        :disabled="dateIsOutOfRange(year, minDate, maxDate, locale, dateFormat)"
        :label="formatDate(year, 'Y', props.locale)"
        @click="onClickYear(year)"
        @mousedown.prevent.capture
      />

      <UButton
        v-else-if="getYearState(year).isLastYearInRange"
        variant="thirdary"
        color="brand"
        no-ring
        filled
        v-bind="lastYearInRangeAttrs"
        :disabled="dateIsOutOfRange(year, minDate, maxDate, locale, dateFormat)"
        :label="formatDate(year, 'Y', props.locale)"
        @click="onClickYear(year)"
        @mousedown.prevent.capture
      />

      <UButton
        v-else-if="getYearState(year).isSingleYearInRange"
        variant="thirdary"
        color="brand"
        no-ring
        v-bind="singleYearInRangeAttrs"
        :disabled="dateIsOutOfRange(year, minDate, maxDate, locale, dateFormat)"
        :label="formatDate(year, 'Y', props.locale)"
        @click="onClickYear(year)"
        @mousedown.prevent.capture
      />

      <UButton
        v-else-if="getYearState(year).isYearInRange"
        variant="thirdary"
        color="brand"
        no-ring
        v-bind="yearInRangeAttrs"
        :disabled="dateIsOutOfRange(year, minDate, maxDate, locale, dateFormat)"
        :label="formatDate(year, 'Y', props.locale)"
        @click="onClickYear(year)"
        @mousedown.prevent.capture
      />

      <UButton
        v-else-if="getYearState(year).isSelectedYear"
        variant="primary"
        color="brand"
        no-ring
        v-bind="selectedYearAttrs"
        :disabled="dateIsOutOfRange(year, minDate, maxDate, locale, dateFormat)"
        :label="formatDate(year, 'Y', props.locale)"
        @click="onClickYear(year)"
        @mousedown.prevent.capture
      />

      <UButton
        v-else-if="getYearState(year).isActiveYear"
        variant="thirdary"
        color="brand"
        no-ring
        v-bind="activeYearAttrs"
        :disabled="dateIsOutOfRange(year, minDate, maxDate, locale, dateFormat)"
        :label="formatDate(year, 'Y', props.locale)"
        @click="onClickYear(year)"
        @mousedown.prevent.capture
      />

      <UButton
        v-else
        variant="thirdary"
        color="brand"
        no-ring
        v-bind="yearAttrs"
        :disabled="dateIsOutOfRange(year, minDate, maxDate, locale, dateFormat)"
        :label="formatDate(year, 'Y', props.locale)"
        @click="onClickYear(year)"
        @mousedown.prevent.capture
      />
    </template>
  </div>
</template>

<script setup>
import { computed } from "vue";

import { formatDate, getYearsRange, dateIsOutOfRange } from "./utilCalendar.js";
import { isSameMonth, getDateWithoutTime, isCurrentYear } from "./utilDate.js";

import useAttrs from "./useAttrs.js";

import { YEARS_PER_VIEW } from "./constants.js";

import UButton from "../ui.button/UButton.vue";

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
  yearAttrs,
  currentYearAttrs,
  currentYearInRangeAttrs,
  firstYearInRangeAttrs,
  lastYearInRangeAttrs,
  yearInRangeAttrs,
  singleYearInRangeAttrs,
  selectedYearAttrs,
  activeYearAttrs,
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

function getYearState(year) {
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

  const isCurrentDate = isCurrentYear(year) && isNotSelectedDate;
  const isCurrentYearInRange = isCurrentDate && isYearInRange;
  const isFirstYearInRange = props.range && isFirstYear && isMoreThanOneYearRange;
  const isLastYearInRange = props.range && isLastYear && isMoreThanOneYearRange;
  const isSingleYearInRange = props.range && isFirstYear && !isMoreThanOneYearRange;
  const isActiveYear = isSameMonth(props.activeMonth, year) && !props.range;

  return {
    isCurrentYear: isCurrentDate,
    isCurrentYearInRange,
    isFirstYearInRange,
    isLastYearInRange,
    isYearInRange,
    isSingleYearInRange,
    isSelectedYear: isSelectedMonth(year),
    isActiveYear,
  };
}

function isSelectedMonth(month) {
  return isSameMonth(month, localSelectedDate.value);
}

function onClickYear(year) {
  emit("input", year);
}
</script>
