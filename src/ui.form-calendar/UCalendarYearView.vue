<script setup lang="ts">
import { ref, watch } from "vue";

import useUI from "../composables/useUI";

import { formatDate, dateIsOutOfRange } from "./utilCalendar";
import { isSameMonth, isCurrentYear } from "./utilDate";

import defaultConfig from "./config";
import { YEARS_PER_VIEW } from "./constants";

import type { UCalendarViewProps, Config } from "./types";

import UButton from "../ui.button/UButton.vue";

defineOptions({ internal: true });

const props = defineProps<UCalendarViewProps>();

const emit = defineEmits(["input"]);

const years = ref<Date[]>([]);

// Watch for changes to active month and update years when needed
watch(() => props.activeDate, updateYears, { deep: true, immediate: true });

// Update years array based on active date;
function updateYears() {
  if (isActiveDateWithinCurrentRange()) {
    return;
  }

  const initialYear = calculateInitialYear();

  years.value = getYears(initialYear);
}

function isActiveDateWithinCurrentRange(): boolean {
  if (!years.value.length) {
    return false;
  }

  const activeYear = props.activeDate.getFullYear();
  const firstYear = years.value.at(0)!.getFullYear();
  const lastYear = years.value.at(-1)!.getFullYear();

  return activeYear >= firstYear && activeYear <= lastYear;
}

function calculateInitialYear() {
  const activeYear = props.activeDate.getFullYear();

  // First render - position selected date as the 5th element
  if (!years.value.length) {
    const selectedYear = props.selectedDate?.getFullYear() || activeYear;

    return selectedYear - 4;
  }

  // If we have existing years, check if we need to adjust the range
  const firstYear = years.value.at(0)!.getFullYear();
  const lastYear = years.value.at(-1)!.getFullYear();

  // Active year before range - position at end
  if (activeYear < firstYear) {
    return firstYear - YEARS_PER_VIEW;
  } else {
    return lastYear + 1;
  }
}

function getYears(initialYear: number): Date[] {
  return Array.from({ length: YEARS_PER_VIEW }, (_, i) => getYear(initialYear + i));
}

function getYear(year: number) {
  let newDate = new Date(props.activeDate.valueOf());

  newDate.setFullYear(year);

  // Means the current day has less days so the extra month is
  // in the following month
  if (newDate.getDate() !== props.activeDate.getDate()) {
    // Assign the last day of previous month
    newDate = new Date(newDate.getFullYear(), newDate.getMonth(), 0);
  }

  return newDate;
}

function getYearState(year: Date) {
  const isSelectedYear = props.selectedDate && isSameMonth(year, props.selectedDate);
  const isPresentYear = isCurrentYear(year);
  const isMoreThanOneYearRange =
    props.selectedDateTo &&
    props.selectedDate &&
    props.selectedDateTo.getFullYear() - props.selectedDate.getFullYear() >= 1;

  const isActiveYear =
    props.isArrowKeyDirty &&
    isSameMonth(props.activeDate, year) &&
    !props.range &&
    !dateIsOutOfRange(year, props.minDate, props.maxDate, props.locale, props.dateFormat);

  return {
    isSelectedYear,
    isCurrentYear: isPresentYear,
    isMoreThanOneYearRange,
    isActiveYear,
  };
}

function onClickYear(year: Date) {
  emit("input", year);
}

/**
 * Get element / nested component attributes for each config token ✨
 * Applies: `class`, `config`, redefined default `props` and dev `vl-...` attributes.
 */
const { yearViewAttrs, yearAttrs, currentYearAttrs, selectedYearAttrs, activeYearAttrs } =
  useUI<Config>(defaultConfig);

defineExpose({
  /**
   * List of years to display in the calendar view.
   * @property {Date[]}
   */
  years,
});
</script>

<template>
  <div v-bind="yearViewAttrs">
    <template v-for="year in years" :key="year">
      <UButton
        v-if="getYearState(year).isSelectedYear && !props.range"
        variant="solid"
        color="primary"
        size="md"
        v-bind="selectedYearAttrs"
        :disabled="dateIsOutOfRange(year, minDate, maxDate, locale, dateFormat)"
        :label="formatDate(year, 'Y', props.locale)"
        @click="onClickYear(year)"
        @mousedown.prevent.capture
      />

      <UButton
        v-else-if="getYearState(year).isCurrentYear"
        variant="ghost"
        color="primary"
        size="md"
        v-bind="currentYearAttrs"
        :disabled="dateIsOutOfRange(year, minDate, maxDate, locale, dateFormat)"
        :label="formatDate(year, 'Y', props.locale)"
        @click="onClickYear(year)"
        @mousedown.prevent.capture
      />

      <UButton
        v-else-if="getYearState(year).isActiveYear"
        variant="ghost"
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
        variant="ghost"
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
