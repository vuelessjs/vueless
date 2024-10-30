<template>
  <div v-bind="wrapperAttrs" ref="wrapperRef">
    <UInput
      v-if="isVariant.input"
      :id="elementId"
      ref="inputRef"
      v-model="userFormatDate"
      :size="size"
      :label="label"
      :label-align="labelAlign"
      :disabled="disabled"
      :placeholder="placeholder"
      :description="description"
      :error="error"
      readonly
      :left-icon="leftIcon"
      :right-icon="rightIcon"
      v-bind="isShownMenu ? activeInputAttrs : inputAttrs"
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
        <!--
          @slot Use it add an icon after the date.
          @binding {string} icon-name
          @binding {string} icon-size
        -->
        <slot name="right-icon" :icon-name="rightIcon" :icon-size="size">
          <UIcon :name="rightIcon" :size="size" color="gray" />
        </slot>
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
        @click="onClickShiftRange(SHIFT_ACTION.prev)"
      />

      <UButton
        :id="elementId"
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
        @click="onClickShiftRange(SHIFT_ACTION.next)"
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
        <UDatePickerRangePeriodMenu
          v-model:local-value="localValue"
          v-model:active-date="activeDate"
          v-model:period-date-list="periodDateList"
          v-model:period="period"
          :config="config"
          :is-period="isPeriod"
          :custom-range-button="customRangeButton"
          :locale="locale"
          :attrs="keysAttrs"
          :date-format="dateFormat"
          :min-date="minDate"
          :max-date="maxDate"
          @toggle-menu="isShownMenu = !isShownMenu"
          @close-menu="isShownMenu = false"
          @click-prev="onClickShiftDatesList(SHIFT_ACTION.prev)"
          @click-next="onClickShiftDatesList(SHIFT_ACTION.next)"
        />

        <UDatePickerRangeInputs
          v-if="isPeriod.ownRange"
          v-bind="rangeInputWrapperAttrs"
          v-model:local-value="localValue"
          v-model:input-range-from-error="inputRangeFromError"
          v-model:input-range-to-error="inputRangeToError"
          v-model:range-start="rangeStart"
          v-model:range-end="rangeEnd"
          :range-input-name="rangeInputName"
          :locale="locale"
          :date-format="dateFormat"
          :config="config"
          :attrs="keysAttrs"
        />

        <div v-if="inputRangeToError || inputRangeFromError" v-bind="rangeInputErrorAttrs">
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
import { computed, watch, ref, nextTick, provide, useId } from "vue";
import { getDefault } from "../utils/utilUI.ts";

import UIcon from "../ui.image-icon/UIcon.vue";
import UInput from "../ui.form-input/UInput.vue";
import UCalendar from "../ui.form-calendar/UCalendar.vue";
import UDatePickerRangePeriodMenu from "./UDatePickerRangePeriodMenu.vue";
import UDatePickerRangeInputs from "./UDatePickerRangeInputs.vue";
import UButton from "../ui.button/UButton.vue";

import { vClickOutside } from "../directives";

import {
  addDays,
  addMonths,
  addYears,
  getEndOfMonth,
  getEndOfQuarter,
  getEndOfWeek,
  getEndOfYear,
  getStartOfMonth,
  getStartOfQuarter,
  getStartOfWeek,
  getStartOfYear,
  getDatesDifference,
} from "../ui.form-calendar/utilDate.js";

import { formatDate, parseDate, dateIsOutOfRange } from "../ui.form-calendar/utilCalendar.js";

import {
  getWeekDateList,
  getYearDateList,
  getQuartersDateList,
  getMonthsDateList,
} from "./utilDateRange.js";

import useAttrs from "./useAttrs.js";
import { useAutoPosition } from "../composables/useAutoPosition.ts";
import { useLocale } from "./useLocale.js";
import { useUserFormat } from "./useUserFormat.js";

import defaultConfig from "./config.js";
import {
  UDatePickerRange,
  DATE_PICKER_BUTTON_TYPE,
  DATE_PICKER_INPUT_TYPE,
  PERIOD,
  INPUT_RANGE_FORMAT,
  SHIFT_ACTION,
} from "./constants.js";

defineOptions({ inheritAttrs: false });

const props = defineProps({
  /**
   * Datepicker range value (JavaScript Date objects or strings formatted in given `dateFormat`).
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
   * Min date (JavaScript Date object or string formatted in given `dateFormat`).
   */
  minDate: {
    type: [Date, String],
    default: getDefault(defaultConfig, UDatePickerRange).minDate,
  },

  /**
   * Max date (JavaScript Date object or string formatted in given `dateFormat`).
   */
  maxDate: {
    type: [Date, String],
    default: getDefault(defaultConfig, UDatePickerRange).maxDate,
  },

  /**
   * Date string format.
   */
  dateFormat: {
    type: String,
    default: getDefault(defaultConfig, UDatePickerRange).dateFormat,
  },

  /**
   * User-friendly date format (it will be shown in UI).
   */
  userDateFormat: {
    type: String,
    default: getDefault(defaultConfig, UDatePickerRange).userDateFormat,
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
   * Left icon name.
   */
  leftIcon: {
    type: String,
    default: "",
  },

  /**
   * Right icon name.
   */
  rightIcon: {
    type: String,
    default: getDefault(defaultConfig, UDatePickerRange).rightIcon,
  },

  /**
   * Label text for an input type.
   */
  label: {
    type: String,
    default: "",
  },

  /**
   * Label placement.
   * @values top, topInside, topWithDesc, left, right
   */
  labelAlign: {
    type: String,
    default: getDefault(defaultConfig, UDatePickerRange).labelAlign,
  },

  /**
   * Input placeholder for an input type.
   */
  placeholder: {
    type: String,
    default: "",
  },

  /**
   * Datepicker description for an input type.
   */
  description: {
    type: String,
    default: "",
  },

  /**
   * Error message for an input type.
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
   * Unique element id.
   */
  id: {
    type: String,
    default: "",
  },

  /**
   * Component config object.
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

const emit = defineEmits([
  /**
   * Triggers when date picker range value changes.
   * @property {object} range
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

const { locale, userFormatLocale } = useLocale(props);

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

const elementId = props.id || useId();

const {
  config,
  keysAttrs,
  wrapperAttrs,
  calendarAttrs,
  inputAttrs,
  menuAttrs,
  buttonWrapperAttrs,
  buttonAttrs,
  shiftRangeButtonAttrs,
  rangeInputWrapperAttrs,
  rangeInputErrorAttrs,
  activeInputAttrs,
} = useAttrs(props, { isShownMenu, isTop, isRight, isPeriod });

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
const periodDateList = ref([]);

provide("isDatePeriodOutOfRange", (datePeriod) => isDatePeriodOutOfRange(datePeriod));

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

const rangeInputName = computed(() => `rangeInput-${elementId}`);

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

const { userFormatDate } = useUserFormat(
  localValue,
  userFormatLocale,
  isPeriod,
  locale,
  props.userDateFormat,
);

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
      ? formatDate(parsedDateFrom, INPUT_RANGE_FORMAT, locale.value)
      : "";

    rangeEnd.value = props.modelValue.to
      ? formatDate(parsedDateTo, INPUT_RANGE_FORMAT, locale.value)
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

function onClickShiftDatesList(action) {
  const defaultRange = action === SHIFT_ACTION.prev ? -1 : 1;
  const yearRange = action === SHIFT_ACTION.prev ? -12 : 12;

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

function shiftRangeNext(to, from, daysDifference) {
  if (isPeriod.value.ownRange) {
    const nextDate = {
      to: addDays(to, daysDifference),
      from: addDays(from, daysDifference),
    };

    if (isDatePeriodOutOfRange(nextDate)) return;

    localValue.value = nextDate;

    return;
  }

  let nextDate = periodDateList.value.find((item) => item.endRange > localValue.value.to);

  if (!nextDate) {
    onClickShiftDatesList(SHIFT_ACTION.next);

    nextDate = periodDateList.value.find((item) => item.endRange > localValue.value.to);
  }

  if (isDatePeriodOutOfRange(nextDate)) return;

  localValue.value = {
    from: nextDate.startRange,
    to: nextDate.endRange,
  };
}

function shiftRangePrev(to, from, daysDifference) {
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
      onClickShiftDatesList(SHIFT_ACTION.prev);

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

  action === SHIFT_ACTION.next
    ? shiftRangeNext(to, from, daysDifference)
    : shiftRangePrev(to, from, daysDifference);
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
