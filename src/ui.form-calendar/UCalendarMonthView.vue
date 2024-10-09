<template>
  <div v-bind="monthViewAttrs">
    <template v-for="(month, idx) in months" :key="month">
      <UButton
        v-if="getMonthState(month, idx).isSelectedMonth && !props.range"
        variant="primary"
        color="brand"
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
        color="brand"
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

<script setup>
import { computed } from "vue";

import { formatDate, dateIsOutOfRange } from "./utilCalendar.js";
import { isSameMonth, getDateWithoutTime, isCurrentMonth } from "./utilDate.js";

import useAttrs from "./useAttrs.js";

import { MONTHS_PER_VIEW } from "./constants.js";

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
} = useAttrs(props);

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

function getMonthState(month, index) {
  const startRangeIndex = months.value.findIndex((month) => {
    return isSameMonth(month, localSelectedDate.value);
  });

  const endRangeIndex = months.value.findIndex((month) => {
    return isSameMonth(month, props.selectedDateTo);
  });

  const isMonthInRange =
    (index >= startRangeIndex && index <= endRangeIndex) ||
    (index >= startRangeIndex && endRangeIndex === -1);
  const isSelectedMonth =
    isSameMonth(month, localSelectedDate.value) && props.selectedDate !== null;
  const isPresentMonth = isCurrentMonth(month);
  const isMoreThanOneMonthRange =
    props.range &&
    props.selectedDateTo &&
    isMoreThanOneMonthDiff(props.selectedDate, props.selectedDateTo);
  const isActiveMonth = isSameMonth(props.activeMonth, month) && !props.range;
  const isCurrentMonthInRange = isMonthInRange && isPresentMonth;
  const isLastMonthInRange =
    props.range && isSameMonth(month, props.selectedDateTo) && isMoreThanOneMonthRange;
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

function isMoreThanOneMonthDiff(date, dateTo) {
  const yearDiff = Math.abs(dateTo.getFullYear() - date.getFullYear());
  const monthDiff = Math.abs(dateTo.getMonth() - date.getMonth());
  const dayDiff = Math.abs(dateTo.getDate() - date.getDate());

  return yearDiff > 0 || monthDiff > 1 || (monthDiff === 1 && dayDiff > 0);
}

function onClickMonth(month) {
  emit("input", month);
}
</script>
