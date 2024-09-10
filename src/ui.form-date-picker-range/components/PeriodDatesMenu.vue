<template>
  <div v-bind="attrs.periodsRowAttrs">
    <UButton
      v-for="periodButton in periods"
      :key="periodButton.name"
      square
      filled
      no-ring
      size="xs"
      variant="thirdary"
      :label="periodButton.title"
      v-bind="attrs.periodButtonAttrs"
      :class="cx([attrs.periodButtonAttrs.class, getPeriodButtonsClasses(periodButton.name)])"
      @click="onClickPeriodButton(periodButton.name)"
    />
  </div>

  <div v-bind="attrs.periodsRowAttrs">
    <UButton
      v-if="customRangeButton.range.to && customRangeButton.range.from"
      square
      filled
      no-ring
      size="xs"
      variant="thirdary"
      v-bind="attrs.periodButtonAttrs"
      :class="cx([attrs.periodButtonAttrs.class, getPeriodButtonsClasses(PERIOD.custom)])"
      @click="onClickCustomRangeButton"
    >
      {{ customRangeButton.label }}
      <span v-if="customRangeButton.description" v-text="customRangeButton.description" />
    </UButton>

    <UButton
      square
      filled
      no-ring
      size="xs"
      variant="thirdary"
      :label="locale.ownRange"
      :left-icon="config.defaults.ownRangeIcon"
      v-bind="attrs.periodButtonAttrs"
      :class="cx([attrs.periodButtonAttrs.class, getPeriodButtonsClasses(PERIOD.ownRange)])"
      @click="onClickOwnRange"
    />
  </div>

  <template v-if="!isPeriod.ownRange && !isPeriod.custom">
    <div v-bind="attrs.rangeSwitchWrapperAttrs">
      <UButton
        square
        no-ring
        size="xs"
        color="gray"
        variant="thirdary"
        :left-icon="config.defaults.prevIcon"
        v-bind="attrs.rangeSwitchButtonAttrs"
        @click="emit('clickPrev')"
      />

      <div v-bind="attrs.rangeSwitchTitleAttrs">
        {{ rangeSwitchTitle }}
      </div>

      <UButton
        square
        no-ring
        size="xs"
        color="gray"
        variant="thirdary"
        :left-icon="config.defaults.nextIcon"
        v-bind="attrs.rangeSwitchButtonAttrs"
        @click="emit('clickNext')"
      />
    </div>

    <div
      v-if="isDatePeriodOutOfRange"
      v-bind="attrs.periodDateListAttrs"
      :class="cx([attrs.periodDateListAttrs.class, getPeriodDateListClasses()])"
    >
      <UButton
        v-for="(date, index) in periodDateList"
        :key="date.title"
        no-ring
        size="sm"
        variant="thirdary"
        :disabled="isDatePeriodOutOfRange(date)"
        v-bind="attrs.periodDateAttrs"
        :class="cx([attrs.periodDateAttrs.class, getPeriodDateClasses(date, index)])"
        :label="String(date.title)"
        @click="selectDate(date), toggleMenu()"
      />
    </div>
  </template>
</template>

<script setup>
import { computed, inject } from "vue";
import { cx } from "../../service.ui";

import {
  getWeekDateList,
  getYearDateList,
  getQuartersDateList,
  getMonthsDateList,
} from "../services/dateRange.service";

import UButton from "../../ui.button";

import { PERIOD } from "../constants";

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

const periods = computed(() => [
  {
    name: PERIOD.week,
    title: props.locale.week,
  },
  {
    name: PERIOD.month,
    title: props.locale.month,
  },
  {
    name: PERIOD.quarter,
    title: props.locale.quarter,
  },
  {
    name: PERIOD.year,
    title: props.locale.year,
  },
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

function getPeriodButtonsClasses(periodName) {
  return period.value === periodName ? props.config.periodButtonActive : "";
}

function getPeriodDateClasses(date, index) {
  const localStart = new Date(localValue.value.from);
  const localEnd = new Date(localValue.value.to);
  const isListType = props.isPeriod.quarter || props.isPeriod.week;
  const firstInRangeClasses = cx([
    props.config.edgePeriodDate,
    isListType ? props.config.firstPeriodListDate : props.config.firstPeriodGridDate,
  ]);
  const lastInRangeClasses = cx([
    props.config.edgePeriodDate,
    isListType ? props.config.lastPeriodListDate : props.config.lastPeriodGridDate,
  ]);

  if (props.isPeriod.year) {
    localStart.setMonth(0, 1);
    localEnd.setMonth(11, 31);
  }

  localStart.setHours(0, 0, 0, 0);
  localEnd.setHours(23, 59, 59, 999);

  const startDateInRangeIndex = periodDateList.value.findIndex((periodDate) => {
    return localStart <= periodDate.endRange && localStart >= periodDate.startRange;
  });

  const endDateInRangeIndex = periodDateList.value.findIndex((periodDate) => {
    return localEnd >= periodDate.startRange && localEnd <= periodDate.endRange;
  });

  let isInRange = index >= startDateInRangeIndex && index <= endDateInRangeIndex;

  if (!~startDateInRangeIndex || !~endDateInRangeIndex) {
    isInRange =
      (index >= startDateInRangeIndex && startDateInRangeIndex > -1) ||
      (index <= endDateInRangeIndex && endDateInRangeIndex > -1);
  }

  if (
    !~startDateInRangeIndex &&
    periodDateList.value.at(0).startRange > localStart &&
    !~endDateInRangeIndex &&
    periodDateList.value.at(0).endRange < localEnd
  ) {
    isInRange = true;
  }

  const isSingleItem =
    startDateInRangeIndex === endDateInRangeIndex && ~endDateInRangeIndex && ~startDateInRangeIndex;

  if (isInRange) {
    return cx([
      props.config.periodDateInRange,
      startDateInRangeIndex === index && firstInRangeClasses,
      endDateInRangeIndex === index && lastInRangeClasses,
      isSingleItem && "rounded-dynamic",
    ]);
  }

  return localValue.value.from === date.startRange ? props.config.periodDateActive : "";
}

function getPeriodDateListClasses() {
  if (props.isPeriod.ownRange) return [];
  if (props.isPeriod.week) return props.config.periodDateWeekList;
  if (props.isPeriod.month) return props.config.periodDateMonthList;
  if (props.isPeriod.quarter) return props.config.periodDateQuarterList;
  if (props.isPeriod.year) return props.config.periodDateYearList;
}
</script>
