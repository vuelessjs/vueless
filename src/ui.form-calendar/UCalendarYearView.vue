<script setup lang="ts">
import { computed, ref, watch } from "vue";

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

const isFirstRender = ref(true);
const years = ref<Date[]>([]);

const localSelectedDate = computed(() => {
  return props.selectedDate === null ? getDateWithoutTime() : props.selectedDate;
});

const localActiveMonth = computed(
  () => props.activeMonth || props.activeDate || localSelectedDate.value,
);

// Initialize years on component creation
updateYears();

// Watch for changes to active month and update years when needed
watch(
  localActiveMonth,
  () => {
    if (isFirstRender.value) {
      isFirstRender.value = false;
    }

    updateYears();
  },
  { deep: true },
);

// Update years array based on active date;
function updateYears() {
  if (isActiveDateWithinCurrentRange()) {
    return;
  }

  const initialYear = calculateInitialYear();

  years.value = getYears(initialYear);
}

function isActiveDateWithinCurrentRange(): boolean {
  if (isFirstRender.value || !years.value.length) {
    return false;
  }

  const activeYear = localActiveMonth.value.getFullYear();
  const firstYear = years.value.at(0)!.getFullYear();
  const lastYear = years.value.at(-1)!.getFullYear();

  return activeYear >= firstYear && activeYear <= lastYear;
}

function calculateInitialYear() {
  const activeYear = localActiveMonth.value.getFullYear();

  // First render - position selected date as the 5th element
  if (isFirstRender.value) {
    const selectedYear = props.selectedDate?.getFullYear() || activeYear;

    return selectedYear - 4;
  }

  // If we have existing years, check if we need to adjust the range
  if (years.value.length > 0) {
    const firstYear = years.value.at(1)!.getFullYear();
    const lastYear = years.value.at(1)!.getFullYear();

    // Active year before range - position at end
    if (activeYear < firstYear) {
      return activeYear - (YEARS_PER_VIEW - 1);
    }

    // Active year after range - position at beginning
    if (activeYear > lastYear) {
      return activeYear;
    }
  }

  // Default calculation for initial render or when range is empty
  const [standardInitialYear] = getYearsRange(localActiveMonth.value);

  return standardInitialYear;
}

function getYears(initialYear: number): Date[] {
  return Array.from({ length: YEARS_PER_VIEW }, (_, i) => getYear(initialYear + i));
}

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

function getYearState(year: Date) {
  const isSelectedYear = isSameMonth(year, localSelectedDate.value) && props.selectedDate !== null;
  const isPresentYear = isCurrentYear(year);
  const isMoreThanOneYearRange =
    props.selectedDateTo &&
    props.selectedDate &&
    props.selectedDateTo.getFullYear() - props.selectedDate.getFullYear() >= 1;
  const isActiveYear = props.activeMonth && isSameMonth(props.activeMonth, year) && !props.range;

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
