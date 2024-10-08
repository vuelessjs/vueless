<template>
  <div v-bind="yearViewAttrs">
    <template v-for="(year, idx) in years" :key="year">
      <UButton
        v-if="getYearState(year, idx).isSelectedYear && !props.range"
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
        v-else-if="getYearState(year, idx).isCurrentYear && !getYearState(year, idx).isYearInRange"
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
        v-else-if="getYearState(year, idx).isCurrentFirstYearInRange"
        variant="thirdary"
        color="brand"
        no-ring
        filled
        v-bind="currentFirstYearInRangeAttrs"
        :disabled="dateIsOutOfRange(year, minDate, maxDate, locale, dateFormat)"
        :label="formatDate(year, 'Y', props.locale)"
        @click="onClickYear(year)"
        @mousedown.prevent.capture
      />

      <UButton
        v-else-if="getYearState(year, idx).isCurrentLastYearInRange"
        variant="thirdary"
        color="brand"
        no-ring
        filled
        v-bind="currentLastYearInRangeAttrs"
        :disabled="dateIsOutOfRange(year, minDate, maxDate, locale, dateFormat)"
        :label="formatDate(year, 'Y', props.locale)"
        @click="onClickYear(year)"
        @mousedown.prevent.capture
      />

      <UButton
        v-else-if="getYearState(year, idx).isFirstYearInRange"
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
        v-else-if="getYearState(year, idx).isLastYearInRange"
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
        v-else-if="
          getYearState(year, idx).isCurrentYearInRange &&
          !getYearState(year, idx).isMoreThanOneYearRange
        "
        variant="thirdary"
        color="brand"
        no-ring
        v-bind="singleCurrentYearInRangeAttrs"
        :disabled="dateIsOutOfRange(year, minDate, maxDate, locale, dateFormat)"
        :label="formatDate(year, 'Y', props.locale)"
        @click="onClickYear(year)"
        @mousedown.prevent.capture
      />

      <UButton
        v-else-if="getYearState(year, idx).isCurrentYearInRange"
        variant="thirdary"
        color="brand"
        no-ring
        v-bind="currentYearInRangeAttrs"
        :disabled="dateIsOutOfRange(year, minDate, maxDate, locale, dateFormat)"
        :label="formatDate(year, 'Y', props.locale) + 'sd'"
        @click="onClickYear(year)"
        @mousedown.prevent.capture
      />

      <UButton
        v-else-if="
          !getYearState(year, idx).isMoreThanOneYearRange && getYearState(year, idx).isYearInRange
        "
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
        v-else-if="
          getYearState(year, idx).isMoreThanOneYearRange && getYearState(year, idx).isYearInRange
        "
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
        v-else-if="getYearState(year, idx).isActiveYear"
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
        color="grayscale"
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
  singleCurrentYearInRangeAttrs,
  currentLastYearInRangeAttrs,
  currentFirstYearInRangeAttrs,
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

function getYearState(year, index) {
  const startRangeIndex = years.value.findIndex((year) => {
    return year.getFullYear() === localSelectedDate.value?.getFullYear();
  });

  const endRangeIndex = years.value.findIndex((year) => {
    return year.getFullYear() === props.selectedDateTo?.getFullYear();
  });

  const isYearInRange =
    (index >= startRangeIndex && index <= endRangeIndex) ||
    (index >= startRangeIndex && endRangeIndex === -1);
  const isSelectedYear = isSameMonth(year, localSelectedDate.value) && props.selectedDate !== null;
  const isPresentYear = isCurrentYear(year);
  const isMoreThanOneYearRange =
    props.selectedDateTo?.getFullYear() - props.selectedDate?.getFullYear() >= 1;
  const isActiveYear = isSameMonth(props.activeMonth, year) && !props.range;
  const isCurrentYearInRange = isYearInRange && isPresentYear;

  const isLastYearInRange =
    props.range &&
    year.getFullYear() === props.selectedDateTo?.getFullYear() &&
    isMoreThanOneYearRange;

  const isFirstYearInRange =
    props.range &&
    year.getFullYear() === localSelectedDate.value?.getFullYear() &&
    isMoreThanOneYearRange;

  const isCurrentFirstYearInRange = props.range && isFirstYearInRange && isPresentYear;
  const isCurrentLastYearInRange = props.range && isLastYearInRange && isPresentYear;

  return {
    isSelectedYear,
    isCurrentYear: isPresentYear,
    isMoreThanOneYearRange,
    isActiveYear,
    isCurrentYearInRange,
    isLastYearInRange,
    isFirstYearInRange,
    isCurrentFirstYearInRange,
    isCurrentLastYearInRange,
    isYearInRange,
  };
}

function onClickYear(year) {
  emit("input", year);
}
</script>
