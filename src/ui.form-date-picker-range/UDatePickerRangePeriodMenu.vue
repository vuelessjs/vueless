<script setup lang="ts">
import { computed, inject } from "vue";

import {
  getWeekDateList,
  getYearDateList,
  getQuartersDateList,
  getMonthsDateList,
} from "./utilDateRange.ts";

import UButton from "../ui.button/UButton.vue";

import { Period } from "./constants.ts";

import type { UDatePickerRangePeriodMenuProps, IsDatePeriodOutOfRange } from "./types.ts";
import type { DatePeriodRange } from "./utilDateRange.ts";

defineOptions({ internal: true });

const props = defineProps<UDatePickerRangePeriodMenuProps>();

const emit = defineEmits(["toggleMenu", "closeMenu", "clickPrev", "clickNext"]);

const localValue = defineModel("localValue", { required: true, type: Object });
const activeDate = defineModel("activeDate", { required: true, type: Object });
const periodDateList = defineModel<DatePeriodRange[]>("periodDateList");
const period = defineModel("period", { required: true, type: String });

const isDatePeriodOutOfRange = inject<IsDatePeriodOutOfRange | null>(
  "isDatePeriodOutOfRange",
  null,
);

const periods = computed(() => [
  { name: Period.Week, title: props.locale.week },
  { name: Period.Month, title: props.locale.month },
  { name: Period.Quarter, title: props.locale.quarter },
  { name: Period.Year, title: props.locale.year },
]);

const rangeSwitchTitle = computed(() => {
  if (props.isPeriod.month || props.isPeriod.quarter) {
    return String(activeDate.value.getFullYear());
  }

  if (props.isPeriod.year) {
    return `${periodDateList.value?.at(0)?.title} – ${periodDateList.value?.at(-1)?.title}`;
  }

  if (props.isPeriod.week) {
    return `${props.locale.months.longhand[activeDate.value.getMonth()]} ${activeDate.value.getFullYear()}`;
  }

  return "";
});

onClickPeriodButton(period.value as Period);

function onClickPeriodButton(periodName: `${Period}`) {
  const localDate = localValue.value.from !== null ? localValue.value.from : new Date();

  if (periodName === Period.Week) {
    periodDateList.value = getWeekDateList(localDate, props.locale.months.shorthand);

    period.value = Period.Week;
  }

  if (periodName === Period.Month) {
    periodDateList.value = getMonthsDateList(localDate, props.locale.months.longhand);

    period.value = Period.Month;
  }

  if (periodName === Period.Quarter) {
    periodDateList.value = getQuartersDateList(localDate, props.locale.quarter);

    period.value = Period.Quarter;
  }

  if (periodName === Period.Year) {
    periodDateList.value = getYearDateList(localDate || activeDate);

    period.value = Period.Year;
  }
}

function onClickOwnRange() {
  period.value = Period.OwnRange;
}

function selectDate(date: DatePeriodRange) {
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
  period.value = Period.Custom;
}

function selectCustomRange() {
  localValue.value = {
    from: props.customRangeButton.range.from,
    to: props.customRangeButton.range.to,
  };
}

function getDatePeriodState(date: DatePeriodRange) {
  const localStart = new Date(localValue.value.from);
  const localEnd = new Date(localValue.value.to);

  if (props.isPeriod.year) {
    localStart.setMonth(0, 1);
    localEnd.setMonth(11, 31);
  }

  localStart.setHours(0, 0, 0, 0);
  localEnd.setHours(23, 59, 59, 999);

  const isSelected =
    localStart.getTime() - date.startRange.getTime() === 0 &&
    localEnd.getTime() - date.endRange.getTime() === 0;
  const isCurrentDate = date.startRange <= new Date() && new Date() <= date.endRange;

  return { isSelected, isCurrentDate };
}
</script>

<template>
  <div v-bind="attrs.periodRowAttrs.value">
    <template v-for="periodButton in periods" :key="periodButton.name">
      <UButton
        v-if="periodButton.name !== period"
        square
        size="xs"
        color="grayscale"
        variant="soft"
        :label="periodButton.title"
        v-bind="attrs.periodButtonAttrs.value"
        @click="onClickPeriodButton(periodButton.name)"
      />

      <UButton
        v-else
        square
        size="xs"
        color="grayscale"
        variant="soft"
        :label="periodButton.title"
        v-bind="attrs.periodButtonActiveAttrs.value"
        @click="onClickPeriodButton(periodButton.name)"
      />
    </template>
  </div>

  <div v-bind="attrs.periodRowAttrs.value">
    <UButton
      v-if="customRangeButton.range.to && customRangeButton.range.from && Period.Custom !== period"
      square
      size="xs"
      color="grayscale"
      variant="soft"
      v-bind="attrs.customRangeButtonAttrs.value"
      @click="onClickCustomRangeButton"
    >
      {{ customRangeButton.label }}
      <span
        v-if="customRangeButton.description"
        v-bind="attrs.customRangeDescriptionAttrs.value"
        v-text="customRangeButton.description"
      />
    </UButton>

    <UButton
      v-if="customRangeButton.range.to && customRangeButton.range.from && Period.Custom === period"
      square
      size="xs"
      color="grayscale"
      variant="soft"
      v-bind="attrs.customRangeButtonAttrs.value"
      @click="onClickCustomRangeButton"
    >
      {{ customRangeButton.label }}
      <span
        v-if="customRangeButton.description"
        v-bind="attrs.customRangeDescriptionAttrs.value"
        v-text="customRangeButton.description"
      />
    </UButton>

    <UButton
      v-if="Period.OwnRange !== period"
      square
      size="xs"
      color="grayscale"
      variant="soft"
      :label="locale.ownRange"
      :left-icon="config.defaults?.ownRangeIcon"
      v-bind="attrs.periodButtonAttrs.value"
      @click="onClickOwnRange"
    />

    <UButton
      v-else
      square
      size="xs"
      color="grayscale"
      variant="soft"
      :label="locale.ownRange"
      :left-icon="config.defaults?.ownRangeIcon"
      v-bind="attrs.periodButtonActiveAttrs.value"
      @click="onClickOwnRange"
    />
  </div>

  <template v-if="!isPeriod.ownRange && !isPeriod.custom">
    <div v-bind="attrs.rangeSwitchWrapperAttrs.value">
      <UButton
        square
        size="sm"
        color="grayscale"
        variant="ghost"
        :icon="config.defaults?.prevIcon"
        v-bind="attrs.rangeSwitchButtonAttrs.value"
        @click="emit('clickPrev')"
      />

      <div v-bind="attrs.rangeSwitchTitleAttrs.value">
        {{ rangeSwitchTitle }}
      </div>

      <UButton
        square
        size="sm"
        color="grayscale"
        variant="ghost"
        :icon="config.defaults?.nextIcon"
        v-bind="attrs.rangeSwitchButtonAttrs.value"
        @click="emit('clickNext')"
      />
    </div>

    <div v-if="isDatePeriodOutOfRange" v-bind="attrs.periodDateListAttrs.value">
      <template
        v-for="date in periodDateList"
        :key="date.title + date.startRange.toISOString() + date.endRange.toISOString()"
      >
        <UButton
          v-if="getDatePeriodState(date).isSelected && getDatePeriodState(date).isCurrentDate"
          size="sm"
          color="primary"
          variant="soft"
          :disabled="isDatePeriodOutOfRange(date)"
          v-bind="attrs.periodDateCurrentSelectedAttrs.value"
          :label="String(date.title)"
          @click="(selectDate(date), toggleMenu())"
        />

        <UButton
          v-else-if="getDatePeriodState(date).isSelected"
          size="sm"
          color="primary"
          variant="soft"
          :disabled="isDatePeriodOutOfRange(date)"
          v-bind="attrs.periodDateSelectedAttrs.value"
          :label="String(date.title)"
          @click="(selectDate(date), toggleMenu())"
        />

        <UButton
          v-else-if="getDatePeriodState(date).isCurrentDate"
          size="sm"
          color="primary"
          variant="outlined"
          :disabled="isDatePeriodOutOfRange(date)"
          v-bind="attrs.periodDateCurrentAttrs.value"
          :label="String(date.title)"
          @click="(selectDate(date), toggleMenu())"
        />

        <UButton
          v-else
          size="sm"
          color="grayscale"
          variant="ghost"
          :disabled="isDatePeriodOutOfRange(date)"
          v-bind="attrs.periodDateAttrs.value"
          :label="String(date.title)"
          @click="(selectDate(date), toggleMenu())"
        />
      </template>
    </div>
  </template>
</template>
