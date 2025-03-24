<script setup lang="ts">
import { computed } from "vue";

import useUI from "../composables/useUI.ts";

import { formatDate, dateIsOutOfRange } from "./utilCalendar.ts";
import { isSameMonth, getDateWithoutTime, isCurrentMonth } from "./utilDate.ts";

import defaultConfig from "./config.ts";
import { MONTHS_PER_VIEW } from "./constants.ts";

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

const months = computed(() =>
  Array.from({ length: MONTHS_PER_VIEW }, (_, i) => i).map((monthNumber) => getMonth(monthNumber)),
);

function getMonth(monthNumber: number) {
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

function getMonthState(month: Date) {
  const isSelectedMonth =
    isSameMonth(month, localSelectedDate.value) && props.selectedDate !== null;
  const isPresentMonth = isCurrentMonth(month);
  const isMoreThanOneMonthRange =
    props.range &&
    props.selectedDateTo &&
    props.selectedDate &&
    isMoreThanOneMonthDiff(props.selectedDate, props.selectedDateTo);
  const isActiveMonth = props.activeMonth && isSameMonth(props.activeMonth, month) && !props.range;

  return {
    isSelectedMonth,
    isCurrentMonth: isPresentMonth,
    isMoreThanOneMonthRange,
    isActiveMonth,
  };
}

function isMoreThanOneMonthDiff(date: Date, dateTo: Date) {
  const yearDiff = Math.abs(dateTo.getFullYear() - date.getFullYear());
  const monthDiff = Math.abs(dateTo.getMonth() - date.getMonth());
  const dayDiff = Math.abs(dateTo.getDate() - date.getDate());

  return yearDiff > 0 || monthDiff > 1 || (monthDiff === 1 && dayDiff > 0);
}

function onClickMonth(month: Date) {
  emit("input", month);
}

/**
 * Get element / nested component attributes for each config token ✨
 * Applies: `class`, `config`, redefined default `props` and dev `vl-...` attributes.
 */
const { monthViewAttrs, monthAttrs, currentMonthAttrs, selectedMonthAttrs, activeMonthAttrs } =
  useUI<Config>(defaultConfig);
</script>

<template>
  <div v-bind="monthViewAttrs">
    <template v-for="month in months" :key="month">
      <UButton
        v-if="getMonthState(month).isSelectedMonth && !props.range"
        variant="solid"
        color="primary"
        size="md"
        v-bind="selectedMonthAttrs"
        :disabled="dateIsOutOfRange(month, minDate, maxDate, locale, dateFormat)"
        :label="formatDate(month, 'M', props.locale)"
        @click="onClickMonth(month)"
        @mousedown.prevent.capture
      />

      <UButton
        v-else-if="getMonthState(month).isCurrentMonth"
        variant="ghost"
        color="primary"
        v-bind="currentMonthAttrs"
        :disabled="dateIsOutOfRange(month, minDate, maxDate, locale, dateFormat)"
        :label="formatDate(month, 'M', props.locale)"
        @click="onClickMonth(month)"
        @mousedown.prevent.capture
      />

      <UButton
        v-else-if="getMonthState(month).isActiveMonth"
        variant="ghost"
        color="primary"
        size="md"
        v-bind="activeMonthAttrs"
        :disabled="dateIsOutOfRange(month, minDate, maxDate, locale, dateFormat)"
        :label="formatDate(month, 'M', props.locale)"
        @click="onClickMonth(month)"
        @mousedown.prevent.capture
      />

      <UButton
        v-else
        variant="ghost"
        color="grayscale"
        size="md"
        v-bind="monthAttrs"
        :disabled="dateIsOutOfRange(month, minDate, maxDate, locale, dateFormat)"
        :label="formatDate(month, 'M', props.locale)"
        @click="onClickMonth(month)"
        @mousedown.prevent.capture
      />
    </template>
  </div>
</template>
