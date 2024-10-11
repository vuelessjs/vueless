<template>
  <div v-bind="periodRowAttrs">
    <template v-for="periodButton in periods" :key="periodButton.name">
      <UButton
        v-if="periodButton.name !== period"
        square
        filled
        no-ring
        size="xs"
        color="grayscale"
        variant="thirdary"
        :label="periodButton.title"
        v-bind="periodButtonAttrs"
        @click="onClickPeriodButton(periodButton.name)"
      />

      <UButton
        v-else
        square
        filled
        no-ring
        size="xs"
        color="grayscale"
        variant="thirdary"
        :label="periodButton.title"
        v-bind="periodButtonActiveAttrs"
        @click="onClickPeriodButton(periodButton.name)"
      />
    </template>
  </div>

  <div v-bind="periodRowAttrs">
    <UButton
      v-if="customRangeButton.range.to && customRangeButton.range.from && PERIOD.custom !== period"
      square
      filled
      no-ring
      size="xs"
      color="grayscale"
      variant="thirdary"
      v-bind="periodButtonAttrs"
      @click="onClickCustomRangeButton"
    >
      {{ customRangeButton.label }}
      <span
        v-if="customRangeButton.description"
        v-bind="customRangeDescription"
        v-text="customRangeButton.description"
      />
    </UButton>

    <UButton
      v-if="customRangeButton.range.to && customRangeButton.range.from && PERIOD.custom === period"
      square
      filled
      no-ring
      size="xs"
      color="grayscale"
      variant="thirdary"
      v-bind="periodButtonActiveAttrs"
      @click="onClickCustomRangeButton"
    >
      {{ customRangeButton.label }}
      <span
        v-if="customRangeButton.description"
        v-bind="customRangeDescription"
        v-text="customRangeButton.description"
      />
    </UButton>

    <UButton
      v-if="PERIOD.ownRange !== period"
      square
      filled
      no-ring
      size="xs"
      color="grayscale"
      variant="thirdary"
      :label="locale.ownRange"
      :left-icon="config.defaults.ownRangeIcon"
      v-bind="periodButtonAttrs"
      @click="onClickOwnRange"
    />

    <UButton
      v-else
      square
      filled
      no-ring
      size="xs"
      color="grayscale"
      variant="thirdary"
      :label="locale.ownRange"
      :left-icon="config.defaults.ownRangeIcon"
      v-bind="periodButtonActiveAttrs"
      @click="onClickOwnRange"
    />
  </div>

  <template v-if="!isPeriod.ownRange && !isPeriod.custom">
    <div v-bind="rangeSwitchWrapperAttrs">
      <UButton
        square
        no-ring
        size="sm"
        color="grayscale"
        variant="thirdary"
        :left-icon="config.defaults.prevIcon"
        v-bind="rangeSwitchButtonAttrs"
        @click="emit('clickPrev')"
      />

      <div v-bind="rangeSwitchTitleAttrs">
        {{ rangeSwitchTitle }}
      </div>

      <UButton
        square
        no-ring
        size="sm"
        color="grayscale"
        variant="thirdary"
        :left-icon="config.defaults.nextIcon"
        v-bind="rangeSwitchButtonAttrs"
        @click="emit('clickNext')"
      />
    </div>

    <div v-if="isDatePeriodOutOfRange" v-bind="periodDateListAttrs">
      <template v-for="date in periodDateList" :key="date.title">
        <UButton
          v-if="getDatePeriodState(date).isSelected && getDatePeriodState(date).isCurrentDate"
          size="sm"
          variant="thirdary"
          color="brand"
          no-ring
          filled
          :disabled="isDatePeriodOutOfRange(date)"
          v-bind="periodDateCurrentSelectedAttrs"
          :label="String(date.title)"
          @click="selectDate(date), toggleMenu()"
        />

        <UButton
          v-else-if="getDatePeriodState(date).isSelected"
          size="sm"
          variant="thirdary"
          color="brand"
          no-ring
          filled
          :disabled="isDatePeriodOutOfRange(date)"
          v-bind="periodDateSelectedAttrs"
          :label="String(date.title)"
          @click="selectDate(date), toggleMenu()"
        />

        <UButton
          v-else-if="getDatePeriodState(date).isCurrentDate"
          size="sm"
          variant="secondary"
          color="brand"
          no-ring
          filled
          :disabled="isDatePeriodOutOfRange(date)"
          v-bind="periodDateCurrentAttrs"
          :label="String(date.title)"
          @click="selectDate(date), toggleMenu()"
        />

        <UButton
          v-else
          no-ring
          size="sm"
          color="grayscale"
          variant="thirdary"
          :disabled="isDatePeriodOutOfRange(date)"
          v-bind="periodDateAttrs"
          :label="String(date.title)"
          @click="selectDate(date), toggleMenu()"
        />
      </template>
    </div>
  </template>
</template>

<script setup>
import { computed, inject } from "vue";

import {
  getWeekDateList,
  getYearDateList,
  getQuartersDateList,
  getMonthsDateList,
} from "./utilDateRange.js";

import UButton from "../ui.button/UButton.vue";

import { PERIOD } from "./constants.js";

const props = defineProps({
  locale: {
    type: Object,
    required: true,
  },

  isPeriod: {
    type: Object,
    required: true,
  },

  customRangeButton: {
    type: Object,
    required: true,
  },

  dateFormat: {
    type: [String, undefined],
    default: undefined,
  },

  minDate: {
    type: [String, Date],
    default: undefined,
  },

  maxDate: {
    type: [String, Date],
    default: undefined,
  },

  config: {
    type: Object,
    required: true,
  },

  attrs: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["toggleMenu", "closeMenu", "clickPrev", "clickNext"]);

const localValue = defineModel("localValue", { required: true, type: Object });
const activeDate = defineModel("activeDate", { required: true, type: Object });
const periodDateList = defineModel("periodDateList", { required: true, type: Object });
const period = defineModel("period", { required: true, type: String });

const isDatePeriodOutOfRange = inject("isDatePeriodOutOfRange", null);

const {
  periodButtonAttrs,
  periodRowAttrs,
  periodButtonActiveAttrs,
  customRangeDescription,
  rangeSwitchWrapperAttrs,
  rangeSwitchButtonAttrs,
  rangeSwitchTitleAttrs,
  periodDateListAttrs,
  periodDateSelectedAttrs,
  periodDateCurrentSelectedAttrs,
  periodDateCurrentAttrs,
  periodDateAttrs,
} = props.attrs;

const periods = computed(() => [
  { name: PERIOD.week, title: props.locale.week },
  { name: PERIOD.month, title: props.locale.month },
  { name: PERIOD.quarter, title: props.locale.quarter },
  { name: PERIOD.year, title: props.locale.year },
]);

const rangeSwitchTitle = computed(() => {
  if (props.isPeriod.month || props.isPeriod.quarter) {
    return String(activeDate.value.getFullYear());
  }

  if (props.isPeriod.year) {
    return `${periodDateList.value.at(0).title} – ${periodDateList.value.at(-1).title}`;
  }

  if (props.isPeriod.week) {
    return `${props.locale.months.longhand[activeDate.value.getMonth()]} ${activeDate.value.getFullYear()}`;
  }

  return "";
});

function onClickPeriodButton(periodName) {
  const localDate = localValue.value.from !== null ? localValue.value.from : new Date();

  if (periodName === PERIOD.week) {
    periodDateList.value = getWeekDateList(localDate, props.locale.months.shorthand);

    period.value = PERIOD.week;
  }

  if (periodName === PERIOD.month) {
    periodDateList.value = getMonthsDateList(localDate, props.locale.months.longhand);

    period.value = PERIOD.month;
  }

  if (periodName === PERIOD.quarter) {
    periodDateList.value = getQuartersDateList(localDate, props.locale.quarter);

    period.value = PERIOD.quarter;
  }

  if (periodName === PERIOD.year) {
    periodDateList.value = getYearDateList(localDate);

    period.value = PERIOD.year;
  }
}

function onClickOwnRange() {
  period.value = PERIOD.ownRange;
}

function selectDate(date) {
  localValue.value = {
    from: date.startRange,
    to: date.endRange,
  };
}

function toggleMenu() {
  emit("toggleMenu");
}

function onClickCustomRangeButton() {
  selectCustomRange();

  emit("closeMenu");
  period.value = PERIOD.custom;
}

function selectCustomRange() {
  localValue.value = {
    from: props.customRangeButton.range.from,
    to: props.customRangeButton.range.to,
  };
}

function getDatePeriodState(date) {
  const localStart = new Date(localValue.value.from);
  const localEnd = new Date(localValue.value.to);

  if (props.isPeriod.year) {
    localStart.setMonth(0, 1);
    localEnd.setMonth(11, 31);
  }

  localStart.setHours(0, 0, 0, 0);
  localEnd.setHours(23, 59, 59, 999);

  const isSelected = localStart - date.startRange === 0 && localEnd - date.endRange === 0;
  const isCurrentDate = date.startRange <= new Date() && new Date() <= date.endRange;

  return { isSelected, isCurrentDate };
}
</script>
