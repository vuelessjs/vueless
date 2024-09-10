<template>
  <div v-bind="wrapperAttrs" ref="wrapperRef">
    <UInput
      v-if="isVariant.input"
      :id="id"
      ref="inputRef"
      v-model="userFormatDate"
      :size="size"
      :label="label"
      :disabled="disabled"
      :placeholder="placeholder"
      :description="description"
      :error="error"
      readonly
      :left-icon="leftIcon"
      :right-icon="rightIcon"
      v-bind="inputAttrs"
      @focus="activate"
    >
      <template #left>
        <!-- @slot Use it to add something before the date. -->
        <slot name="left" />
      </template>

      <template #left-icon>
        <!-- @slot Use it to add icon before the date. -->
        <slot name="left-icon" />
      </template>

      <template #right-icon>
        <!-- @slot Use it to add icon after the date. -->
        <slot name="right-icon" />
      </template>

      <template #right>
        <!-- @slot Use it to add something after the date. -->
        <slot name="right" />
      </template>
    </UInput>

    <div v-if="isVariant.button" v-bind="buttonWrapperAttrs">
      <UButton
        ref="buttonPrevRef"
        square
        filled
        no-ring
        :size="size"
        :disabled="disabled"
        variant="thirdary"
        :left-icon="config.defaults.prevIcon"
        v-bind="shiftRangeButtonAttrs"
        @click="onClickShiftRange('prev')"
      />

      <UButton
        :id="id"
        ref="buttonRef"
        square
        filled
        no-ring
        :size="size"
        :disabled="disabled"
        :label="userFormatDate"
        variant="thirdary"
        v-bind="buttonAttrs"
        @click="activate"
      />

      <UButton
        ref="buttonNextRef"
        square
        filled
        no-ring
        :size="size"
        :disabled="disabled"
        variant="thirdary"
        :left-icon="config.defaults.nextIcon"
        v-bind="shiftRangeButtonAttrs"
        @click="onClickShiftRange('next')"
      />
    </div>

    <Transition v-bind="config.menuTransition">
      <div
        v-if="isShownMenu"
        ref="menuRef"
        v-click-outside="[deactivate, clickOutsideOptions]"
        tabindex="-1"
        v-bind="menuAttrs"
        @keydown.esc="deactivate"
      >
        <div v-bind="periodsRowAttrs">
          <UButton
            v-for="periodButton in periods"
            :key="periodButton.name"
            square
            filled
            no-ring
            size="xs"
            variant="thirdary"
            :label="periodButton.title"
            v-bind="periodButtonAttrs(getPeriodButtonsClasses(periodButton.name))"
            @click="onClickPeriodButton(periodButton.name)"
          />
        </div>

        <div v-bind="periodsRowAttrs">
          <UButton
            v-if="customRangeButton.range.to && customRangeButton.range.from"
            square
            filled
            no-ring
            size="xs"
            variant="thirdary"
            v-bind="periodButtonAttrs(getPeriodButtonsClasses(PERIOD.custom))"
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
            v-bind="periodButtonAttrs(getPeriodButtonsClasses(PERIOD.ownRange))"
            @click="onClickOwnRange"
          />
        </div>

        <template v-if="!isPeriod.ownRange && !isPeriod.custom">
          <div v-bind="rangeSwitchWrapperAttrs">
            <UButton
              square
              no-ring
              size="xs"
              color="gray"
              variant="thirdary"
              :left-icon="config.defaults.prevIcon"
              v-bind="rangeSwitchButtonAttrs"
              @click="onClickShiftDatesList('prev')"
            />

            <div v-bind="rangeSwitchTitleAttrs">
              {{ rangeSwitchTitle }}
            </div>

            <UButton
              square
              no-ring
              size="xs"
              color="gray"
              variant="thirdary"
              :left-icon="config.defaults.nextIcon"
              v-bind="rangeSwitchButtonAttrs"
              @click="onClickShiftDatesList('next')"
            />
          </div>

          <div v-bind="periodDateListAttrs(getPeriodDateListClasses())">
            <UButton
              v-for="(date, index) in periodDateList"
              :key="date.title"
              no-ring
              size="sm"
              variant="thirdary"
              :disabled="isDatePeriodOutOfRange(date)"
              v-bind="periodDateAttrs(getPeriodDateClasses(date, index))"
              :label="String(date.title)"
              @click="selectDate(date), toggleMenu()"
            />
          </div>
        </template>

        <div v-if="isPeriod.ownRange" v-bind="rangeInputWrapperAttrs">
          <UInput
            ref="rangeInputStartRef"
            v-model="rangeStart"
            :error="inputRangeFromError"
            size="md"
            v-bind="rangeInputAttrs"
            :class="cx([rangeInputAttrs.class, config.rangeInputFirst])"
            :name="rangeInputName"
            @input="onInputRangeInput($event, INPUT_RANGE_TYPE.start)"
          />

          <UInput
            ref="rangeInputEndRef"
            v-model="rangeEnd"
            :error="inputRangeToError"
            size="md"
            v-bind="rangeInputAttrs"
            :class="cx([rangeInputAttrs.class, config.rangeInputLast])"
            :name="rangeInputName"
            @input="onInputRangeInput($event, INPUT_RANGE_TYPE.end)"
          />
        </div>

        <div v-if="inputRangeToError || inputRangeFromError" v-bind="inputRangeErrorAttrs">
          {{ inputRangeToError || inputRangeFromError }}
        </div>

        <UCalendar
          v-if="isPeriod.ownRange"
          v-model="calendarValue"
          :min-date="minDate"
          :max-date="maxDate"
          v-bind="calendarAttrs"
          :date-format="dateFormat"
          range
          @mouseenter="onMouseoverCalendar"
          @input="onInputCalendar"
        />
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { computed, watch, ref, nextTick } from "vue";
import { merge } from "lodash-es";

import UInput from "../ui.form-input/UInput.vue";
import UButton from "../ui.button/UButton.vue";
import UCalendar from "../ui.form-calendar";
import { LOCALE_TYPE } from "../ui.form-calendar/constants";

import vClickOutside from "../directives/vClickOutside.js";

import { getRandomId, getDefault, cx } from "../utils/utilUI.js";

import {
  addDays,
  addMonths,
  addYears,
  getSortedLocale,
  getEndOfMonth,
  getEndOfQuarter,
  getEndOfWeek,
  getEndOfYear,
  getStartOfMonth,
  getStartOfQuarter,
  getStartOfWeek,
  getStartOfYear,
  getDatesDifference,
  isSameMonth,
} from "../ui.form-calendar/services/date.service";

import {
  dateIsOutOfRange,
  formatDate,
  parseDate,
} from "../ui.form-calendar/services/calendar.service";

import {
  getWeekDateList,
  getYearDateList,
  getQuartersDateList,
  getMonthsDateList,
} from "./services/dateRange.service";

import {
  isWrongDateFormat,
  isWrongMonthNumber,
  isWrongDayNumber,
} from "./services/validation.service";
import useAttrs from "./useAttrs.js";
import { useLocale } from "../composables/useLocale.js";
import useBreakpoint from "../composables/useBreakpoint.js";
import { useAutoPosition } from "../composables/useAutoPosition.js";

import defaultConfig from "./config.js";
import {
  UDatePickerRange,
  DATE_PICKER_BUTTON_TYPE,
  DATE_PICKER_INPUT_TYPE,
  PERIOD,
  INPUT_RANGE_TYPE,
} from "./constants.js";

/* Should be a string for correct web-types gen */
defineOptions({ name: "UDatePickerRange", inheritAttrs: false });

const props = defineProps({
  /**
   * Datepicker value in JS Date Objects or Strings formatted in provided props.dateFormat.
   */
  modelValue: {
    type: Object,
    default: () => ({
      from: null,
      to: null,
    }),
  },

  /**
   * Custom range button.
   */
  customRangeButton: {
    type: Object,
    default: () => ({
      range: { from: null, to: null },
      label: "",
      description: "",
    }),
  },

  /**
   * Datepicker open direction on x-axis.
   * @values auto, left, right
   */
  openDirectionX: {
    type: String,
    default: getDefault(defaultConfig, UDatePickerRange).openDirectionX,
  },

  /**
   * Datepicker open direction on y-axis.
   * @values auto, top, bottom
   */
  openDirectionY: {
    type: String,
    default: getDefault(defaultConfig, UDatePickerRange).openDirectionY,
  },

  /**
   * The variant of the date picker.
   * @values button, input
   */
  variant: {
    type: String,
    default: getDefault(defaultConfig, UDatePickerRange).variant,
  },

  /**
   * Min date in format date string or Date.
   */
  minDate: {
    type: [String, Date],
    default: getDefault(defaultConfig, UDatePickerRange).minDate,
  },

  /**
   * Max date in format date string or Date.
   */
  maxDate: {
    type: [String, Date],
    default: getDefault(defaultConfig, UDatePickerRange).maxDate,
  },

  /**
   * Datepicker size.
   * @values sm, md, lg
   */
  size: {
    type: String,
    default: getDefault(defaultConfig, UDatePickerRange).size,
  },

  /**
   * Left side icon name.
   */
  leftIcon: {
    type: String,
    default: "",
  },

  /**
   * Right side icon name.
   */
  rightIcon: {
    type: String,
    default: "",
  },

  /**
   * Label text for input type.
   */
  label: {
    type: String,
    default: "",
  },

  /**
   * Input placeholder for input type.
   */
  placeholder: {
    type: String,
    default: "",
  },

  /**
   * Datepicker description for input type.
   */
  description: {
    type: String,
    default: "",
  },

  /**
   * Error message for input type.
   */
  error: {
    type: String,
    default: "",
  },

  /**
   * Disable component.
   */
  disabled: {
    type: Boolean,
    default: getDefault(defaultConfig, UDatePickerRange).disabled,
  },

  /**
   * Date format.
   */
  dateFormat: {
    type: String,
    default: getDefault(defaultConfig, UDatePickerRange).dateFormat,
  },

  /**
   * Unique element id.
   * @ignore
   */
  id: {
    type: String,
    default: () => getRandomId(),
  },

  /**
   * Component ui config object.
   */
  config: {
    type: Object,
    default: () => ({}),
  },

  /**
   * Data-test attribute for automated testing.
   */
  dataTest: {
    type: String,
    default: "",
  },
});

const inputRangeFormat = "d.m.Y";

const emit = defineEmits([
  /**
   * Triggers when date picker range value changes.
   * @property {string} value
   */
  "update:modelValue",
]);

const isShownMenu = ref(false);
const wrapperRef = ref(null);
const menuRef = ref(null);
const rangeInputStartRef = ref(null);
const rangeInputEndRef = ref(null);
const buttonRef = ref(null);
const buttonPrevRef = ref(null);
const buttonNextRef = ref(null);
const inputRef = ref(null);

const { isTop, isRight, adjustPositionY, adjustPositionX } = useAutoPosition(
  wrapperRef,
  menuRef,
  computed(() => ({ x: props.openDirectionX, y: props.openDirectionY })),
  { x: "left", y: "bottom" },
);

const {
  config,
  wrapperAttrs,
  calendarAttrs,
  inputAttrs,
  menuAttrs,
  periodsRowAttrs,
  periodButtonAttrs,
  periodDateAttrs,
  periodDateListAttrs,
  rangeSwitchWrapperAttrs,
  rangeSwitchButtonAttrs,
  rangeSwitchTitleAttrs,
  buttonWrapperAttrs,
  buttonAttrs,
  shiftRangeButtonAttrs,
  rangeInputAttrs,
  rangeInputWrapperAttrs,
  inputRangeErrorAttrs,
} = useAttrs(props, { isShownMenu, isTop, isRight });
const { tm } = useLocale();

const i18nGlobal = tm(UDatePickerRange);

const currentLocale = computed(() => merge(defaultConfig.i18n, i18nGlobal, props.config.i18n));

const locale = computed(() => {
  const { months, weekdays } = currentLocale.value;

  // formatted locale
  return {
    ...currentLocale.value,
    months: {
      shorthand: getSortedLocale(months.shorthand, LOCALE_TYPE.month),
      longhand: getSortedLocale(months.longhand, LOCALE_TYPE.month),
    },
    weekdays: {
      shorthand: getSortedLocale(weekdays.shorthand, LOCALE_TYPE.day),
      longhand: getSortedLocale(weekdays.longhand, LOCALE_TYPE.day),
    },
  };
});

const calendarValue = ref(props.modelValue);
const activeDate = ref(
  props.modelValue.from !== null
    ? parseDate(props.modelValue.from, props.dateFormat, locale.value)
    : new Date(),
);
const period = ref(PERIOD.ownRange);
const rangeStart = ref("");
const rangeEnd = ref("");
const inputRangeFromError = ref("");
const inputRangeToError = ref("");
const calendarInnerValue = ref({ from: "", to: "" });
const periodDateList = ref(null);

const { isMobileBreakpoint } = useBreakpoint();

const localValue = computed({
  get: () => {
    return {
      from: parseDate(props.modelValue.from || null, props.dateFormat, locale.value),
      to: parseDate(props.modelValue.to || null, props.dateFormat, locale.value),
    };
  },
  set: (value) => {
    if (value.from && value.to && !props.dateFormat) {
      emit("update:modelValue", value);
    }

    const parsedDateFrom = parseDate(value.from || null, props.dateFormat, locale.value);
    const parsedDateTo = parseDate(value.to || null, props.dateFormat, locale.value);

    if (value.from && value.to && props.dateFormat) {
      const newValue = {
        from: formatDate(parsedDateFrom, props.dateFormat, locale.value),
        to: formatDate(parsedDateTo, props.dateFormat, locale.value),
      };

      emit("update:modelValue", newValue);
    }

    activeDate.value = props.dateFormat ? parsedDateFrom || new Date() : value.from || new Date();
  },
});

const rangeInputName = computed(() => `rangeInput-${props.id}`);

const userFormatLocale = computed(() => {
  const { months, weekdays } = currentLocale.value;

  const monthsLonghand =
    Boolean(props.config.i18n?.months?.userFormat) || Boolean(i18nGlobal?.months?.userFormat)
      ? months.userFormat
      : months.longhand;

  const weekdaysLonghand =
    Boolean(props.config.i18n?.weekdays?.userFormat) || Boolean(i18nGlobal?.weekdays?.userFormat)
      ? weekdays.userFormat
      : weekdays.longhand;

  // formatted locale
  return {
    ...currentLocale,
    months: {
      shorthand: getSortedLocale(months.shorthand, LOCALE_TYPE.month),
      longhand: getSortedLocale(monthsLonghand, LOCALE_TYPE.month),
    },
    weekdays: {
      shorthand: getSortedLocale(weekdays.shorthand, LOCALE_TYPE.day),
      longhand: getSortedLocale(weekdaysLonghand, LOCALE_TYPE.day),
    },
  };
});

const periods = computed(() => [
  {
    name: PERIOD.week,
    title: locale.value.week,
  },
  {
    name: PERIOD.month,
    title: locale.value.month,
  },
  {
    name: PERIOD.quarter,
    title: locale.value.quarter,
  },
  {
    name: PERIOD.year,
    title: locale.value.year,
  },
]);

const isPeriod = computed(() => {
  return {
    week: period.value === PERIOD.week,
    month: period.value === PERIOD.month,
    quarter: period.value === PERIOD.quarter,
    year: period.value === PERIOD.year,
    ownRange: period.value === PERIOD.ownRange,
    custom: period.value === PERIOD.custom,
  };
});

const rangeSwitchTitle = computed(() => {
  if (isPeriod.value.month || isPeriod.value.quarter) {
    return String(activeDate.value.getFullYear());
  }

  if (isPeriod.value.year) {
    return `${periodDateList.value.at(0).title} – ${periodDateList.value.at(-1).title}`;
  }

  if (isPeriod.value.week) {
    return `${locale.value.months.longhand[activeDate.value.getMonth()]} ${activeDate.value.getFullYear()}`;
  }

  return "";
});

const isVariant = computed(() => ({
  button: props.variant === DATE_PICKER_BUTTON_TYPE,
  input: props.variant === DATE_PICKER_INPUT_TYPE,
}));

const clickOutsideOptions = computed(() => {
  if (isVariant.value.input) {
    return { ignore: [inputRef.value.inputRef] };
  }

  return {
    ignore: [
      buttonRef.value.buttonRef,
      buttonPrevRef.value.buttonRef,
      buttonNextRef.value.buttonRef,
    ],
  };
});

const userFormatDate = computed(() => {
  if ((!localValue.value.from && !localValue.value.to) || !localValue.value.from) return "";

  let title = "";

  const isDefaultTitle = isPeriod.value.week || isPeriod.value.custom || isPeriod.value.ownRange;

  const from = localValue.value.from;
  const to = localValue.value.to !== null ? localValue.value.to : null;

  if (isDefaultTitle) {
    let startMonthName = userFormatLocale.value.months.longhand[from.getMonth()];
    let startYear = from.getFullYear();
    let endMonthName = userFormatLocale.value.months.longhand[to?.getMonth()];
    let endYear = to?.getFullYear();

    if (startMonthName === endMonthName && endMonthName === endYear) {
      startMonthName = "";
    }

    if (startYear.year === endYear) {
      startYear = "";
    }

    const isDatesToSameMonth = isSameMonth(from, to);
    const isDatesToSameYear = from.getFullYear() === to.getFullYear();

    let fromTitle = `${from.getDate()} ${startMonthName} ${startYear}`;

    if (isDatesToSameMonth && isDatesToSameYear) {
      fromTitle = from.getDate();
    }

    if (!isDatesToSameMonth && isDatesToSameYear) {
      fromTitle = `${from.getDate()} ${startMonthName}`;
    }

    const toTitle = to ? `${to.getDate()} ${endMonthName} ${endYear}` : "";

    title = `${fromTitle} – ${toTitle}`;
  }

  if (isPeriod.value.month) {
    const startMonthName = userFormatLocale.value.months.longhand[from.getMonth()];
    const startYear = from.getFullYear();

    title = `${startMonthName} ${startYear}`;
  }

  if (isPeriod.value.quarter || isPeriod.value.year) {
    const startMonthName = userFormatLocale.value.months.longhand[from.getMonth()];
    const endMonthName = userFormatLocale.value.months.longhand[to?.getMonth()];
    const endYear = to?.getFullYear();

    const fromTitle = `${from.getDate()} ${startMonthName}`;
    const toTitle = to ? `${to.getDate()} ${endMonthName} ${endYear}` : "";

    title = `${fromTitle} – ${toTitle}`;
  }

  if (isMobileBreakpoint.value && !isPeriod.value.month && isVariant.value.button) {
    const startDay = String(from.getDate()).padStart(2, "0");
    const endDay = String(to?.getDate())?.padStart(2, "0");
    const startMonth = String(from.getMonth()).padStart(2, "0");
    const endMonth = String(to?.getMonth())?.padStart(2, "0");

    const fromTitle = `${startDay}.${startMonth}`;
    const toTitle = to ? `${endDay}.${endMonth} / ${to.getFullYear()}` : "";

    title = `${fromTitle} – ${toTitle}`;
  }

  return title;
});

watch(
  calendarValue,
  () => {
    localValue.value = {
      from: calendarValue.value.from,
      to: calendarValue.value.to,
    };

    nextTick(() => menuRef.value?.focus());
  },
  { deep: true },
);

watch(
  () => props.modelValue,
  () => {
    if (String(props.modelValue.to) !== String(calendarValue.value.to)) {
      calendarValue.value.to = props.modelValue.to;
    }

    if (String(props.modelValue.from) !== String(calendarValue.value.from)) {
      calendarValue.value.from = props.modelValue.from;
    }

    const parsedDateFrom = parseDate(props.modelValue.from, props.dateFormat, locale.value);
    const parsedDateTo = parseDate(props.modelValue.to, props.dateFormat, locale.value);

    rangeStart.value = props.modelValue.from
      ? formatDate(parsedDateFrom, inputRangeFormat, locale.value)
      : "";

    rangeEnd.value = props.modelValue.to
      ? formatDate(parsedDateTo, inputRangeFormat, locale.value)
      : "";

    inputRangeFromError.value = "";
    inputRangeToError.value = "";
  },
  { deep: true, immediate: true },
);

watch(period, () => {
  const isDate = localValue.value.from !== null;

  if (isDate && !props.dateFormat) {
    activeDate.value = isDate ? localValue.value.from : new Date();
  }

  if (isDate && props.dateFormat) {
    activeDate.value = isDate ? parseDate(localValue.value.from, locale.value) : new Date();
  }
});

function onClickPeriodButton(periodName) {
  const localDate = localValue.value.from !== null ? localValue.value.from : new Date();

  if (periodName === PERIOD.week) {
    periodDateList.value = getWeekDateList(localDate, locale.value.months.shorthand);

    period.value = PERIOD.week;
  }

  if (periodName === PERIOD.month) {
    periodDateList.value = getMonthsDateList(localDate, locale.value.months.longhand);

    period.value = PERIOD.month;
  }

  if (periodName === PERIOD.quarter) {
    periodDateList.value = getQuartersDateList(localDate, locale.value.quarter);

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
  isShownMenu.value = !isShownMenu.value;
}

function onClickCustomRangeButton() {
  selectCustomRange();

  isShownMenu.value = false;
  period.value = PERIOD.custom;
}

function selectCustomRange() {
  localValue.value = {
    from: props.customRangeButton.range.from,
    to: props.customRangeButton.range.to,
  };
}

function isDatePeriodOutOfRange(datePeriod) {
  return (
    dateIsOutOfRange(
      datePeriod.startRange,
      props.minDate,
      props.maxDate,
      locale.value,
      props.dateFormat,
    ) || dateIsOutOfRange(datePeriod.endRange, props.minDate, props.maxDate, props.dateFormat)
  );
}

function onClickShiftDatesList(action) {
  const defaultRange = action === "prev" ? -1 : 1;
  const yearRange = action === "prev" ? -12 : 12;

  if (isPeriod.value.week) {
    activeDate.value = addMonths(activeDate.value, defaultRange);
    periodDateList.value = getWeekDateList(activeDate.value, locale.value.months.shorthand);
  }

  if (isPeriod.value.month) {
    activeDate.value = addYears(activeDate.value, defaultRange);
    periodDateList.value = getMonthsDateList(activeDate.value, locale.value.months.longhand);
  }

  if (isPeriod.value.quarter) {
    activeDate.value = addYears(activeDate.value, defaultRange);
    periodDateList.value = getQuartersDateList(activeDate.value, locale.value.quarter);
  }

  if (isPeriod.value.year) {
    activeDate.value = addYears(activeDate.value, yearRange);
    periodDateList.value = getYearDateList(activeDate.value);
  }
}

function getPeriodButtonsClasses(periodName) {
  return period.value === periodName ? config.value.periodButtonActive : "";
}

function getPeriodDateClasses(date, index) {
  const localStart = new Date(localValue.value.from);
  const localEnd = new Date(localValue.value.to);
  const isListType = isPeriod.value.quarter || isPeriod.value.week;
  const firstInRangeClasses = cx([
    config.value.edgePeriodDate,
    isListType ? config.value.firstPeriodListDate : config.value.firstPeriodGridDate,
  ]);
  const lastInRangeClasses = cx([
    config.value.edgePeriodDate,
    isListType ? config.value.lastPeriodListDate : config.value.lastPeriodGridDate,
  ]);

  if (isPeriod.value.year) {
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
      config.value.periodDateInRange,
      startDateInRangeIndex === index && firstInRangeClasses,
      endDateInRangeIndex === index && lastInRangeClasses,
      isSingleItem && "rounded-dynamic",
    ]);
  }

  return localValue.value.from === date.startRange ? config.value.periodDateActive : "";
}

function getPeriodDateListClasses() {
  if (isPeriod.value.ownRange) return [];
  if (isPeriod.value.week) return config.value.periodDateWeekList;
  if (isPeriod.value.month) return config.value.periodDateMonthList;
  if (isPeriod.value.quarter) return config.value.periodDateQuarterList;
  if (isPeriod.value.year) return config.value.periodDateYearList;
}

function activate() {
  isShownMenu.value = true;

  nextTick(() => {
    adjustPositionY();
    adjustPositionX();

    menuRef.value.focus();
  });
}

function deactivate() {
  isShownMenu.value = false;
}

function isGraterThanTo(value) {
  if (!value) return false;

  const parsedValue = parseDate(value, inputRangeFormat, locale.value);
  const parsedTo = parseDate(localValue.value.to, props.dateFormat, locale.value);

  return parsedValue > parsedTo;
}

function isSmallerThanFrom(value) {
  if (!value) return false;

  const parsedValue = parseDate(value, inputRangeFormat, locale.value);
  const parsedFrom = parseDate(localValue.value.from, props.dateFormat, locale.value);

  return parsedValue < parsedFrom;
}

function onInputRangeInput(value, type) {
  const isInvalidDateFormat = isWrongDateFormat(value);

  let error = "";

  if (isInvalidDateFormat && value) {
    error = locale.value.dateFormatWithDot;
  } else if (isWrongMonthNumber(value) && value) {
    error = locale.value.notCorrectMonthNumber;
  } else if (isWrongDayNumber(value) && value) {
    error = locale.value.notCorrectDayNumber;
  } else if (isGraterThanTo(value) && type === INPUT_RANGE_TYPE.start) {
    error = locale.value.fromDateGraterThanSecond;
  } else if (isSmallerThanFrom(value) && type === INPUT_RANGE_TYPE.end) {
    error = locale.value.toDateSmallerThanFirst;
  }

  if (type === INPUT_RANGE_TYPE.start) {
    inputRangeFromError.value = error;
  }

  if (type === INPUT_RANGE_TYPE.end) {
    inputRangeToError.value = error;
  }

  if (!isInvalidDateFormat) {
    const parsedValue = parseDate(value || new Date(), inputRangeFormat, locale.value);

    const isOutOfRange = dateIsOutOfRange(
      parsedValue,
      props.minDate,
      props.maxDate,
      locale.value,
      props.dateFormat,
    );

    if (type === INPUT_RANGE_TYPE.start && !error && !isOutOfRange) {
      localValue.value = {
        from: value ? parsedValue : "",
        to: localValue.value.to,
      };
    }

    if (type === INPUT_RANGE_TYPE.end && !error && !isOutOfRange) {
      localValue.value = {
        from: localValue.value.from,
        to: value ? parsedValue : "",
      };
    }
  }
}

setDefaultPeriodForButton();

function setDefaultPeriodForButton() {
  const from = props.modelValue.from || new Date();
  const to = props.modelValue.to || new Date();

  const customFrom = props.customRangeButton.range.from || new Date();
  const customTo = props.customRangeButton.range.to || new Date();

  const isWeekPeriod =
    String(from) === String(getStartOfWeek(from, { weekStartsOn: 1 })) &&
    String(to) === String(getEndOfWeek(to, { weekStartsOn: 1 }));
  const isMonthPeriod =
    String(from) === String(getStartOfMonth(from)) &&
    String(to) === String(getEndOfMonth(to)) &&
    from.getMonth() === to.getMonth();
  const isQuarterPeriod =
    String(from) === String(getStartOfQuarter(from)) && String(to) === String(getEndOfQuarter(to));
  const isYearPeriod =
    String(from) === String(getStartOfYear(from)) && String(to) === String(getEndOfYear(to));
  const isCustomPeriod = String(from) === String(customFrom) && String(to) === String(customTo);

  if (!props.modelValue.from && !props.modelValue.to) {
    period.value = PERIOD.ownRange;
  } else if (isYearPeriod) {
    period.value = PERIOD.year;
  } else if (isMonthPeriod) {
    period.value = PERIOD.month;
  } else if (isQuarterPeriod) {
    period.value = PERIOD.quarter;
  } else if (isWeekPeriod) {
    period.value = PERIOD.week;
  } else if (isCustomPeriod) {
    period.value = PERIOD.custom;
  } else {
    period.value = PERIOD.ownRange;
  }
}

function onClickShiftRange(action) {
  if (isPeriod.value.custom) {
    period.value = PERIOD.ownRange;
  }

  const millisecondsPerSecond = 1000;
  const secondsPerMinute = 60;
  const minutesPerHour = 60;
  const hoursPerDay = 24;

  const millisecondsPerDay =
    millisecondsPerSecond * secondsPerMinute * minutesPerHour * hoursPerDay;

  const from = localValue.value.from;
  const to = localValue.value.to ? localValue.value.to : addDays(from, 1);
  const daysDifference = Math.ceil(Math.abs(getDatesDifference(from, to)) / millisecondsPerDay);

  if (action === "next") {
    if (isPeriod.value.ownRange) {
      const nextDate = {
        to: addDays(to, daysDifference),
        from: addDays(from, daysDifference),
      };

      if (isDatePeriodOutOfRange(nextDate)) return;

      localValue.value = nextDate;
    } else {
      let nextDate = periodDateList.value.find((item) => item.endRange > localValue.value.to);

      if (!nextDate) {
        onClickShiftDatesList(action);

        nextDate = periodDateList.value.find((item) => item.endRange > localValue.value.to);
      }

      if (isDatePeriodOutOfRange(nextDate)) return;

      localValue.value = {
        from: nextDate.startRange,
        to: nextDate.endRange,
      };
    }
  } else {
    if (isPeriod.value.ownRange) {
      const previousDate = {
        to: addDays(to, daysDifference * -1),
        from: addDays(from, daysDifference * -1),
      };

      if (isDatePeriodOutOfRange(previousDate)) return;

      localValue.value = previousDate;
    } else {
      const reverseDatesList = [...periodDateList.value].reverse();

      let previousDate = reverseDatesList.find((item) => item.endRange < localValue.value.to);

      if (!previousDate) {
        onClickShiftDatesList(action);

        const reverseDatesList = [...periodDateList.value].reverse();

        previousDate = reverseDatesList.find((item) => item.endRange < localValue.value.to);
      }

      if (isDatePeriodOutOfRange(previousDate)) return;

      localValue.value = {
        from: previousDate.startRange,
        to: previousDate.endRange,
      };
    }
  }
}

function onMouseoverCalendar() {
  const isRangeInputFocus = document.activeElement.name === rangeInputName.value;

  if (isRangeInputFocus || !rangeInputStartRef.value || !rangeInputEndRef.value) return;

  const hasValues =
    calendarInnerValue.value.from && calendarInnerValue.value.to && !inputRangeToError.value;
  const hasOnlyFromValue =
    calendarInnerValue.value.from && !calendarInnerValue.value.to && !inputRangeFromError.value;

  if (hasValues || !rangeStart.value) {
    rangeInputStartRef.value.inputRef.focus();

    return;
  }

  if (hasOnlyFromValue) {
    rangeInputEndRef.value.inputRef.focus();

    return;
  }
}

function onInputCalendar(value) {
  calendarInnerValue.value = value;
}
</script>
