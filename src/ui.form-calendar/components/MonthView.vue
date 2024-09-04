<template>
  <div v-bind="monthViewAttrs">
    <UButton
      v-for="month in months"
      :key="month"
      variant="thirdary"
      color="brand"
      no-ring
      v-bind="monthAttrs(getMonthClasses(month))"
      :disabled="dateIsOutOfRange(month, minDate, maxDate, locale, dateFormat)"
      :label="formatDate(month, 'M', props.locale)"
      @click="onClickMonth(month)"
      @mousedown.prevent.capture
    />
  </div>
</template>

<script setup>
import { computed } from "vue";
import { formatDate, dateIsOutOfRange } from "../services/calendar.service";
import { isSameMonth, getDateWithoutTime, isCurrentMoth } from "../services/date.service";

import useAttrs from "../composables/attrs.composable";

import { MONTHS_PER_VIEW } from "../constants";

import UButton from "../../ui.button";

const props = defineProps({
  selectedDate: {
    type: [Date, null],
    required: true,
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

const { monthViewAttrs, selectedMonthAttrs, activeMonthAttrs, monthAttrs, currentMothAttrs } =
  useAttrs(props);

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

function getMonthClasses(month) {
  const isNotSelectedDate =
    (!isSelectedMonth(month) && !isSelectedMonth(month)) || props.selectedDate === null;

  if (isCurrentMoth(month) && isNotSelectedDate) {
    return [currentMothAttrs.value.class];
  }

  if (isSelectedMonth(month)) {
    return [selectedMonthAttrs.value.class];
  }

  if (isSameMonth(props.activeMonth, month)) {
    return [activeMonthAttrs.value.class];
  }
}

function isSelectedMonth(month) {
  return isSameMonth(month, localSelectedDate.value);
}

function onClickMonth(month) {
  emit("input", month);
}
</script>
