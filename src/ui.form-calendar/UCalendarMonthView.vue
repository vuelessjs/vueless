<script setup lang="ts">
import { computed } from "vue";

import useUI from "../composables/useUI.ts";

import { formatDate, dateIsOutOfRange } from "./utilCalendar.ts";
import { isSameMonth, getDateWithoutTime, isCurrentMonth } from "./utilDate.ts";

import defaultConfig from "./config.ts";
import { MONTHS_PER_VIEW } from "./constants.ts";

import type { UCalendarViewProps, Config } from "./types.ts";

import UButton from "../ui.button/UButton.vue";

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

function getMonthState(month: Date, index: number) {
  const startRangeIndex = months.value.findIndex((month) => {
    return isSameMonth(month, localSelectedDate.value);
  });

  const endRangeIndex = months.value.findIndex((month) => {
    return props.selectedDateTo && isSameMonth(month, props.selectedDateTo);
  });

  const isMonthInRange =
    props.range &&
    ((index >= startRangeIndex && index <= endRangeIndex) ||
      (index >= startRangeIndex && endRangeIndex === -1));
  const isSelectedMonth =
    isSameMonth(month, localSelectedDate.value) && props.selectedDate !== null;
  const isPresentMonth = isCurrentMonth(month);
  const isMoreThanOneMonthRange =
    props.range &&
    props.selectedDateTo &&
    props.selectedDate &&
    isMoreThanOneMonthDiff(props.selectedDate, props.selectedDateTo);
  const isActiveMonth = props.activeMonth && isSameMonth(props.activeMonth, month) && !props.range;
  const isCurrentMonthInRange = isMonthInRange && isPresentMonth;
  const isLastMonthInRange =
    props.selectedDateTo &&
    props.range &&
    isSameMonth(month, props.selectedDateTo) &&
    isMoreThanOneMonthRange;
  const isFirstMonthInRange =
    props.range && isSameMonth(month, localSelectedDate.value) && isMoreThanOneMonthRange;
  const isCurrentFirstMonthInRange = props.range && isFirstMonthInRange && isPresentMonth;
  const isCurrentLastMonthInRange = props.range && isLastMonthInRange && isPresentMonth;

  return {
    isSelectedMonth,
    isCurrentMonth: isPresentMonth,
    isMoreThanOneMonthRange,
    isActiveMonth,
    isCurrentMonthInRange,
    isLastMonthInRange,
    isFirstMonthInRange,
    isCurrentFirstMonthInRange,
    isCurrentLastMonthInRange,
    isMonthInRange,
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
const {
  monthViewAttrs,
  monthAttrs,
  currentMonthAttrs,
  currentMonthInRangeAttrs,
  lastMonthInRangeAttrs,
  firstMonthInRangeAttrs,
  singleMonthInRangeAttrs,
  monthInRangeAttrs,
  selectedMonthAttrs,
  activeMonthAttrs,
  currentLastMonthInRangeAttrs,
  currentFirstMonthInRangeAttrs,
  singleCurrentMonthInRangeAttrs,
} = useUI<Config>(defaultConfig);
</script>

<template>
  <div v-bind="monthViewAttrs">
    <template v-for="(month, idx) in months" :key="month">
      <UButton
        v-if="getMonthState(month, idx).isSelectedMonth && !props.range"
        variant="primary"
        color="brand"
        size="md"
        no-ring
        v-bind="selectedMonthAttrs"
        :disabled="dateIsOutOfRange(month, minDate, maxDate, locale, dateFormat)"
        :label="formatDate(month, 'M', props.locale)"
        @click="onClickMonth(month)"
        @mousedown.prevent.capture
      />

      <UButton
        v-else-if="
          getMonthState(month, idx).isCurrentMonth && !getMonthState(month, idx).isMonthInRange
        "
        variant="thirdary"
        color="brand"
        no-ring
        v-bind="currentMonthAttrs"
        :disabled="dateIsOutOfRange(month, minDate, maxDate, locale, dateFormat)"
        :label="formatDate(month, 'M', props.locale)"
        @click="onClickMonth(month)"
        @mousedown.prevent.capture
      />

      <UButton
        v-else-if="getMonthState(month, idx).isCurrentFirstMonthInRange"
        variant="thirdary"
        color="brand"
        size="md"
        no-ring
        filled
        v-bind="currentFirstMonthInRangeAttrs"
        :disabled="dateIsOutOfRange(month, minDate, maxDate, locale, dateFormat)"
        :label="formatDate(month, 'M', props.locale)"
        @click="onClickMonth(month)"
        @mousedown.prevent.capture
      />

      <UButton
        v-else-if="getMonthState(month, idx).isCurrentLastMonthInRange"
        variant="thirdary"
        color="brand"
        size="md"
        no-ring
        filled
        v-bind="currentLastMonthInRangeAttrs"
        :disabled="dateIsOutOfRange(month, minDate, maxDate, locale, dateFormat)"
        :label="formatDate(month, 'M', props.locale)"
        @click="onClickMonth(month)"
        @mousedown.prevent.capture
      />

      <UButton
        v-else-if="getMonthState(month, idx).isFirstMonthInRange"
        variant="thirdary"
        color="brand"
        size="md"
        no-ring
        filled
        v-bind="firstMonthInRangeAttrs"
        :disabled="dateIsOutOfRange(month, minDate, maxDate, locale, dateFormat)"
        :label="formatDate(month, 'M', props.locale)"
        @click="onClickMonth(month)"
        @mousedown.prevent.capture
      />

      <UButton
        v-else-if="getMonthState(month, idx).isLastMonthInRange"
        variant="thirdary"
        color="brand"
        size="md"
        no-ring
        filled
        v-bind="lastMonthInRangeAttrs"
        :disabled="dateIsOutOfRange(month, minDate, maxDate, locale, dateFormat)"
        :label="formatDate(month, 'M', props.locale)"
        @click="onClickMonth(month)"
        @mousedown.prevent.capture
      />

      <UButton
        v-else-if="
          getMonthState(month, idx).isCurrentMonthInRange &&
          !getMonthState(month, idx).isMoreThanOneMonthRange
        "
        variant="primary"
        color="brand"
        size="md"
        no-ring
        v-bind="singleCurrentMonthInRangeAttrs"
        :disabled="dateIsOutOfRange(month, minDate, maxDate, locale, dateFormat)"
        :label="formatDate(month, 'M', props.locale)"
        @click="onClickMonth(month)"
        @mousedown.prevent.capture
      />

      <UButton
        v-else-if="getMonthState(month, idx).isCurrentMonthInRange"
        variant="primary"
        color="brand"
        size="md"
        no-ring
        v-bind="currentMonthInRangeAttrs"
        :disabled="dateIsOutOfRange(month, minDate, maxDate, locale, dateFormat)"
        :label="formatDate(month, 'M', props.locale)"
        @click="onClickMonth(month)"
        @mousedown.prevent.capture
      />

      <UButton
        v-else-if="
          !getMonthState(month, idx).isMoreThanOneMonthRange &&
          getMonthState(month, idx).isMonthInRange
        "
        variant="thirdary"
        color="brand"
        size="md"
        no-ring
        v-bind="singleMonthInRangeAttrs"
        :disabled="dateIsOutOfRange(month, minDate, maxDate, locale, dateFormat)"
        :label="formatDate(month, 'M', props.locale)"
        @click="onClickMonth(month)"
        @mousedown.prevent.capture
      />

      <UButton
        v-else-if="
          getMonthState(month, idx).isMonthInRange &&
          getMonthState(month, idx).isMoreThanOneMonthRange
        "
        variant="thirdary"
        color="brand"
        size="md"
        no-ring
        v-bind="monthInRangeAttrs"
        :disabled="dateIsOutOfRange(month, minDate, maxDate, locale, dateFormat)"
        :label="formatDate(month, 'M', props.locale)"
        @click="onClickMonth(month)"
        @mousedown.prevent.capture
      />

      <UButton
        v-else-if="getMonthState(month, idx).isActiveMonth"
        variant="thirdary"
        color="brand"
        size="md"
        no-ring
        v-bind="activeMonthAttrs"
        :disabled="dateIsOutOfRange(month, minDate, maxDate, locale, dateFormat)"
        :label="formatDate(month, 'M', props.locale)"
        @click="onClickMonth(month)"
        @mousedown.prevent.capture
      />

      <UButton
        v-else
        variant="thirdary"
        color="grayscale"
        size="md"
        no-ring
        v-bind="monthAttrs"
        :disabled="dateIsOutOfRange(month, minDate, maxDate, locale, dateFormat)"
        :label="formatDate(month, 'M', props.locale)"
        @click="onClickMonth(month)"
        @mousedown.prevent.capture
      />
    </template>
  </div>
</template>
