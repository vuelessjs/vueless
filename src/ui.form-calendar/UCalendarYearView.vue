<script setup lang="ts">
import { computed } from "vue";

import useUI from "../composables/useUI.ts";

import { formatDate, getYearsRange, dateIsOutOfRange } from "./utilCalendar.ts";
import { isSameMonth, getDateWithoutTime, isCurrentYear } from "./utilDate.ts";

import defaultConfig from "./config.ts";
import { YEARS_PER_VIEW } from "./constants.ts";

import type { UCalendarViewProps, Config } from "./types.ts";

import UButton from "../ui.button/UButton.vue";

defineOptions({ internal: true });

const props = defineProps<UCalendarViewProps>();

const emit = defineEmits(["input"]);

const localSelectedDate = computed(() => {
  return props.selectedDate === null ? getDateWithoutTime() : props.selectedDate;
});

const localActiveMonth = computed(
  () => props.activeMonth || props.activeDate || localSelectedDate.value,
);

const years = computed(() => {
  const [initialYear] = getYearsRange(localActiveMonth.value);

  return Array.from({ length: YEARS_PER_VIEW }, (_, i) => i).map((year) =>
    getYear(initialYear + year),
  );
});

function getYear(year: number) {
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

function getYearState(year: Date, index: number) {
  const startRangeIndex = years.value.findIndex((year) => {
    return year.getFullYear() === localSelectedDate.value?.getFullYear();
  });

  const endRangeIndex = years.value.findIndex((year) => {
    return year.getFullYear() === props.selectedDateTo?.getFullYear();
  });

  const isYearInRange =
    props.range &&
    ((index >= startRangeIndex && index <= endRangeIndex) ||
      (index >= startRangeIndex && endRangeIndex === -1));
  const isSelectedYear = isSameMonth(year, localSelectedDate.value) && props.selectedDate !== null;
  const isPresentYear = isCurrentYear(year);
  const isMoreThanOneYearRange =
    props.selectedDateTo &&
    props.selectedDate &&
    props.selectedDateTo.getFullYear() - props.selectedDate.getFullYear() >= 1;
  const isActiveYear = props.activeMonth && isSameMonth(props.activeMonth, year) && !props.range;
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

function onClickYear(year: Date) {
  emit("input", year);
}

/**
 * Get element / nested component attributes for each config token ✨
 * Applies: `class`, `config`, redefined default `props` and dev `vl-...` attributes.
 */
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
} = useUI<Config>(defaultConfig);
</script>

<template>
  <div v-bind="yearViewAttrs">
    <template v-for="(year, idx) in years" :key="year">
      <UButton
        v-if="getYearState(year, idx).isSelectedYear && !props.range"
        variant="primary"
        color="primary"
        size="md"
        v-bind="selectedYearAttrs"
        :disabled="dateIsOutOfRange(year, minDate, maxDate, locale, dateFormat)"
        :label="formatDate(year, 'Y', props.locale)"
        @click="onClickYear(year)"
        @mousedown.prevent.capture
      />

      <UButton
        v-else-if="getYearState(year, idx).isCurrentYear && !getYearState(year, idx).isYearInRange"
        variant="thirdary"
        color="primary"
        size="md"
        v-bind="currentYearAttrs"
        :disabled="dateIsOutOfRange(year, minDate, maxDate, locale, dateFormat)"
        :label="formatDate(year, 'Y', props.locale)"
        @click="onClickYear(year)"
        @mousedown.prevent.capture
      />

      <UButton
        v-else-if="getYearState(year, idx).isCurrentFirstYearInRange"
        variant="thirdary"
        color="primary"
        size="md"
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
        color="primary"
        size="md"
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
        color="primary"
        size="md"
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
        color="primary"
        size="md"
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
        color="primary"
        size="md"
        v-bind="singleCurrentYearInRangeAttrs"
        :disabled="dateIsOutOfRange(year, minDate, maxDate, locale, dateFormat)"
        :label="formatDate(year, 'Y', props.locale)"
        @click="onClickYear(year)"
        @mousedown.prevent.capture
      />

      <UButton
        v-else-if="getYearState(year, idx).isCurrentYearInRange"
        variant="thirdary"
        color="primary"
        size="md"
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
        color="primary"
        size="md"
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
        color="primary"
        size="md"
        v-bind="yearInRangeAttrs"
        :disabled="dateIsOutOfRange(year, minDate, maxDate, locale, dateFormat)"
        :label="formatDate(year, 'Y', props.locale)"
        @click="onClickYear(year)"
        @mousedown.prevent.capture
      />

      <UButton
        v-else-if="getYearState(year, idx).isActiveYear"
        variant="thirdary"
        color="primary"
        size="md"
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
        size="md"
        v-bind="yearAttrs"
        :disabled="dateIsOutOfRange(year, minDate, maxDate, locale, dateFormat)"
        :label="formatDate(year, 'Y', props.locale)"
        @click="onClickYear(year)"
        @mousedown.prevent.capture
      />
    </template>
  </div>
</template>
