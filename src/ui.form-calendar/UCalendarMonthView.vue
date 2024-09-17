<template>
  <div v-bind="monthViewAttrs">
    <template v-for="month in months" :key="month">
      <UButton
        v-if="getMonthState(month).isCurrentMonth && !getMonthState(month).isCurrentMonthInRange"
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
        v-else-if="getMonthState(month).isCurrentMonthAndNotSelected"
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
        v-else-if="getMonthState(month).isFirstMonthInRange"
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
        v-else-if="getMonthState(month).isLastMonthInRange"
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
        v-else-if="getMonthState(month).isSingleMonthInRange"
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
        v-else-if="getMonthState(month).isMonthInRange"
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
        v-else-if="getMonthState(month).isSelectedMonth"
        variant="thirdary"
        color="brand"
        no-ring
        v-bind="selectedMonthAttrs"
        :disabled="dateIsOutOfRange(month, minDate, maxDate, locale, dateFormat)"
        :label="formatDate(month, 'M', props.locale)"
        @click="onClickMonth(month)"
        @mousedown.prevent.capture
      />

      <UButton
        v-else-if="getMonthState(month).isActiveMonth"
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

function getMonthState(month) {
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

  const isCurrentMonthAndNotSelected = isCurrentMonth(month) && isNotSelectedDate;
  const isCurrentMonthInRange =
    isMonthInRange && isCurrentMonthAndNotSelected && props.selectedDateTo;
  const isLastMonthInRange = props.range && isSelectedToMonth(month) && isMoreThenOneMonthRange;
  const isFirstMonthInRange = props.range && isSelectedMonth(month) && isMoreThenOneMonthRange;
  const isSingleMonthInRange = props.range && isSelectedMonth(month) && !isMoreThenOneMonthRange;
  const isActiveMonth = isSameMonth(props.activeMonth, month) && !props.range;

  return {
    isCurrentMonthAndNotSelected,
    isCurrentMonthInRange,
    isLastMonthInRange,
    isFirstMonthInRange,
    isSingleMonthInRange,
    isMonthInRange,
    isSelectedMonth: isSelectedMonth(month),
    isActiveMonth,
  };
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
