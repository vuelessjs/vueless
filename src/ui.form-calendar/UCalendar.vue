<template>
  <div ref="wrapperRef" tabindex="1" v-bind="wrapperAttrs" @keydown="onKeydown">
    <div v-bind="navigationAttrs">
      <UButton
        square
        no-ring
        size="sm"
        color="grayscale"
        variant="thirdary"
        :left-icon="config.defaults.prevIcon"
        v-bind="nextPrevButtonAttrs"
        @mousedown.prevent.capture
        @click="onClickPrevButton"
      />

      <UButton
        no-ring
        size="sm"
        color="grayscale"
        variant="thirdary"
        v-bind="viewSwitchButtonAttrs"
        @mousedown.prevent.capture
        @click="onClickViewSwitch"
      >
        <template v-if="isCurrentView.day">
          {{ viewSwitchLabel.month }} {{ viewSwitchLabel.year }}
        </template>
        <template v-if="isCurrentView.month">{{ viewSwitchLabel.year }}</template>
        <template v-if="isCurrentView.year">{{ viewSwitchLabel.yearsRange }}</template>
      </UButton>

      <UButton
        square
        no-ring
        size="sm"
        color="grayscale"
        variant="thirdary"
        :left-icon="config.defaults.nextIcon"
        v-bind="nextPrevButtonAttrs"
        @mousedown.prevent.capture
        @click="onClickNextButton"
      />
    </div>

    <DayView
      v-if="isCurrentView.day"
      :selected-date="selectedDate"
      :selected-date-to="selectedDateTo"
      :range="range"
      :active-month="activeMonth"
      :active-date="activeDate"
      :min-date="minDate"
      :max-date="maxDate"
      :date-format="actualDateFormat"
      :locale="locale"
      :config="config"
      @input="onInputDate"
    />

    <MonthView
      v-if="isCurrentView.month"
      :selected-date="selectedDate"
      :selected-date-to="selectedDateTo"
      :range="range"
      :active-month="activeMonth"
      :active-date="activeDate"
      :min-date="minDate"
      :max-date="maxDate"
      :date-format="actualDateFormat"
      :locale="locale"
      :config="config"
      @input="onInput"
    />

    <YearView
      v-if="isCurrentView.year"
      :selected-date="selectedDate"
      :selected-date-to="selectedDateTo"
      :range="range"
      :active-month="activeMonth"
      :active-date="activeDate"
      :min-date="minDate"
      :max-date="maxDate"
      :date-format="actualDateFormat"
      :locale="locale"
      :config="config"
      @input="onInput"
    />

    <div v-if="isTimepickerEnabled" v-bind="timepickerAttrs">
      <span v-bind="timepickerLabelAttrs" v-text="locale.timeLabel" />

      <div v-bind="timepickerInputWrapperAttrs">
        <input
          ref="hoursRef"
          placeholder="00"
          type="text"
          v-bind="timepickerInputHoursAttrs"
          @input.prevent="onTimeInput($event, INPUT_TYPE.hours, MAX_HOURS, MIN_HOURS)"
          @keydown="onTimeKeydown"
        />
        &#8282;
        <input
          ref="minutesRef"
          placeholder="00"
          type="text"
          v-bind="timepickerInputMinutesAttrs"
          @input.prevent="onTimeInput($event, INPUT_TYPE.minutes, MAX_MINUTES, MIN_MINUTES)"
          @keydown="onTimeKeydown"
        />
        &#8282;
        <input
          ref="secondsRef"
          placeholder="00"
          type="text"
          v-bind="timepickerInputSecondsAttrs"
          @input.prevent="onTimeInput($event, INPUT_TYPE.seconds, MAX_SECONDS, MIN_SECONDS)"
          @keydown="onTimeKeydown"
        />
      </div>

      <UButton
        variant="thirdary"
        size="sm"
        square
        filled
        no-ring
        color="grayscale"
        v-bind="timepickerSubmitButtonAttrs"
        @click="onClickSubmit"
      >
        {{ locale.okLabel }}
      </UButton>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import { merge } from "lodash-es";

import UButton from "../ui.button/UButton.vue";
import { getDefault } from "../utils/utilUI.ts";

import {
  parseDate,
  formatDate,
  getYearsRange,
  dateIsOutOfRange,
  isNumeric,
} from "./utilCalendar.js";

import { getDateWithoutTime, addMonths, addDays, addYears, getSortedLocale } from "./utilDate.js";

import useAttrs from "./useAttrs.js";
import { useLocale } from "../composables/useLocale.ts";

import {
  UCalendar,
  VIEW,
  KEY_CODE,
  YEARS_PER_VIEW,
  MAX_HOURS,
  MIN_HOURS,
  MAX_MINUTES,
  MIN_MINUTES,
  SEPARATOR,
  INPUT_TYPE,
  LOCALE_TYPE,
  MAX_SECONDS,
  MIN_SECONDS,
} from "./constants.js";

import defaultConfig from "./config.js";

import DayView from "./UCalendarDayView.vue";
import MonthView from "./UCalendarMonthView.vue";
import YearView from "./UCalendarYearView.vue";

defineOptions({ inheritAttrs: false });

const props = defineProps({
  /**
   * Calendar value (JavaScript Date object or string formatted in given `dateFormat` or object when `range` enabled).
   */
  modelValue: {
    type: [Date, String, Object],
    default: null,
  },

  /**
   * Calendar view variant.
   * @values day, month, year
   */
  view: {
    type: String,
    default: VIEW.day,
  },

  /**
   * Enable date range selection.
   */
  range: {
    type: Boolean,
    default: getDefault(defaultConfig, UCalendar).range,
  },

  /**
   * Show timepicker.
   */
  timepicker: {
    type: Boolean,
    default: getDefault(defaultConfig, UCalendar).timepicker,
  },

  /**
   * Date string format.
   */
  dateFormat: {
    type: String,
    default: getDefault(defaultConfig, UCalendar).dateFormat,
  },

  /**
   * Same as date format, but used when timepicker is enabled.
   */
  dateTimeFormat: {
    type: String,
    default: getDefault(defaultConfig, UCalendar).dateTimeFormat,
  },

  /**
   * User-friendly date format (it will be shown in UI).
   */
  userDateFormat: {
    type: String,
    default: getDefault(defaultConfig, UCalendar).userDateFormat,
  },

  /**
   * Same as user format, but used when timepicker is enabled.
   */
  userDateTimeFormat: {
    type: String,
    default: getDefault(defaultConfig, UCalendar).userDateTimeFormat,
  },

  /**
   * Min date (JavaScript Date object or string formatted in given `dateFormat`).
   */
  minDate: {
    type: [Date, String],
    default: getDefault(defaultConfig, UCalendar).minDate,
  },

  /**
   * Max date (JavaScript Date object or string formatted in given `dateFormat`).
   */
  maxDate: {
    type: [Date, String],
    default: getDefault(defaultConfig, UCalendar).maxDate,
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
   * Triggers when date value changes.
   * @property {object} newDate
   */
  "update:modelValue",

  /**
   * Triggers when calendar view changes.
   * @property {string} view
   */
  "update:view",

  /**
   * Triggers when date value changes.
   * @property {object} value
   */
  "input",

  /**
   * Triggers when calendar date is selected by clicking "Enter".
   */
  "submit",

  /**
   * Triggers when arrow keys are used to change calendar date.
   */
  "keydown",

  /**
   * Triggers when the user changes the date input value.
   * @property {string} value
   */
  "userDateChange",
]);

const { tm } = useLocale();

const {
  config,
  wrapperAttrs,
  navigationAttrs,
  viewSwitchButtonAttrs,
  nextPrevButtonAttrs,
  timepickerAttrs,
  timepickerLabelAttrs,
  timepickerInputWrapperAttrs,
  timepickerInputHoursAttrs,
  timepickerInputMinutesAttrs,
  timepickerInputSecondsAttrs,
  timepickerSubmitButtonAttrs,
} = useAttrs(props);

const wrapperRef = ref(null);
const hoursRef = ref(null);
const minutesRef = ref(null);
const secondsRef = ref(null);

const activeDate = ref(null);
const activeMonth = ref(null);

const currentView = ref(props.view);

watch(
  () => props.view,
  () => {
    if (props.view !== currentView.value) {
      currentView.value = props.view;
    }
  },
);

watch(currentView, () => {
  if (props.view !== currentView.value) {
    emit("update:view", currentView.value);
  }
});

const isCurrentView = computed(() => ({
  day: currentView.value === VIEW.day,
  month: currentView.value === VIEW.month,
  year: currentView.value === VIEW.year,
}));

const i18nGlobal = tm(UCalendar);
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

const isTimepickerEnabled = computed(() => {
  return props.timepicker && !props.range;
});

const actualDateFormat = computed(() => {
  return isTimepickerEnabled.value ? props.dateTimeFormat : props.dateFormat;
});

const actualUserFormat = computed(() => {
  return isTimepickerEnabled.value ? props.userDateTimeFormat : props.userDateFormat;
});

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

const isModelRangeType = computed(() => {
  return (
    props.modelValue !== null &&
    !(props.modelValue instanceof Date) &&
    typeof props.modelValue === "object"
  );
});

const localValue = computed({
  get: () => {
    if (props.range) {
      const from = isModelRangeType.value ? props.modelValue.from : props.modelValue || null;

      const to = isModelRangeType.value ? props.modelValue.to : null;

      return {
        from: parseDate(from || null, actualDateFormat.value, locale.value),
        to: parseDate(to || null, actualDateFormat.value, locale.value),
      };
    }

    return isModelRangeType.value
      ? parseDate(props.modelValue.from || null, actualDateFormat.value, locale.value)
      : parseDate(props.modelValue || null, actualDateFormat.value, locale.value);
  },
  set(value) {
    value = getCurrentValueType(value);

    const parsedDate = parseDate(
      props.range ? value.from : value,
      actualDateFormat.value,
      locale.value,
    );
    const parsedDateTo =
      isModelRangeType.value && props.range
        ? parseDate(value.to, actualDateFormat.value, locale.value)
        : undefined;

    if (parsedDate && isTimepickerEnabled.value) {
      parsedDate.setHours(Number(hoursRef.value.value));
      parsedDate.setMinutes(Number(minutesRef.value.value));
      parsedDate.setSeconds(Number(secondsRef.value.value));
    }

    const isOutOfRange = dateIsOutOfRange(
      parsedDate || new Date(),
      props.minDate,
      props.maxDate,
      locale.value,
      actualDateFormat.value,
    );

    if (isOutOfRange) {
      return;
    }

    const newDate = actualDateFormat.value
      ? formatDate(parsedDate || null, actualDateFormat.value, locale.value)
      : parsedDate;

    const newDateTo = actualDateFormat.value
      ? formatDate(parsedDateTo || null, actualDateFormat.value, locale.value)
      : parsedDateTo;

    emit("update:modelValue", props.range ? { from: newDate, to: newDateTo } : newDate);

    if (parsedDate === null && isTimepickerEnabled.value) {
      const currentDate = new Date();

      hoursRef.value.value = String(currentDate.getHours()).padStart(2, "0");
      minutesRef.value.value = String(currentDate.getMinutes()).padStart(2, "0");
      secondsRef.value.value = String(currentDate.getSeconds()).padStart(2, "0");
    }
  },
});

const selectedDate = computed(() => {
  return parseDate(
    props.range ? localValue.value.from : localValue.value,
    actualDateFormat.value,
    locale.value,
  );
});

const selectedDateTo = computed(() => {
  return props.range
    ? parseDate(localValue.value.to, actualDateFormat.value, locale.value)
    : undefined;
});

const userFormattedDate = computed(() => {
  const date = formatDate(selectedDate.value, actualUserFormat.value, userFormatLocale.value);
  const dateTo = props.range
    ? formatDate(selectedDateTo.value, actualUserFormat.value, userFormatLocale.value)
    : undefined;

  return props.range ? `${date} ${SEPARATOR} ${dateTo}` : date;
});

const viewSwitchLabel = computed(() => {
  const localValue =
    activeDate.value || activeMonth.value || selectedDate.value || getDateWithoutTime();

  return {
    year: formatDate(localValue, "Y", locale.value),
    month: formatDate(localValue, "F", locale.value),
    yearsRange: getYearsRange(localValue || getDateWithoutTime()).join(` ${SEPARATOR} `),
  };
});

watch(userFormattedDate, () => {
  emit("userDateChange", userFormattedDate.value);
});

// This watcher force updates value when range props changed
watch(
  () => props.range,
  (newValue, oldValue) => {
    if (newValue !== oldValue) {
      localValue.value = getCurrentValueType(localValue.value);
    }
  },
);

let isInit = false;

const unwatchInit = watch(
  () => selectedDate.value,
  () => {
    if (isInit) unwatchInit();

    if (selectedDate.value && isTimepickerEnabled.value) {
      hoursRef.value.value = String(selectedDate.value.getHours()).padStart(2, "0");
      minutesRef.value.value = String(selectedDate.value.getMinutes()).padStart(2, "0");
      secondsRef.value.value = String(selectedDate.value.getSeconds()).padStart(2, "0");

      emit("userDateChange", userFormattedDate.value);

      isInit = true;
    }
  },
  { deep: true },
);

function getCurrentValueType(value) {
  if (props.range && value === null) {
    value = { from: null, to: null };
  }

  if (isModelRangeType.value && !props.range) {
    value = value.from || value;
  }

  if (typeof value !== "object" && value !== null && props.range) {
    value = { from: value, to: null };
  }

  return value;
}

function onInputDate(newDate) {
  if (newDate === null) {
    localValue.value = newDate;

    activeDate.value = null;
    activeMonth.value = null;

    emit("input", localValue.value);

    return;
  }

  const date = new Date(newDate.valueOf());

  if (props.range) {
    const isFullReset =
      localValue.value.to || !localValue.value.from || date <= localValue.value.from;

    const updatedValue = isFullReset
      ? { from: date, to: null }
      : { from: localValue.value.from, to: date };

    localValue.value = updatedValue;

    emit("input", updatedValue);
  } else {
    localValue.value = date;

    emit("input", localValue.value);
  }

  if (!props.range) {
    activeDate.value = null;
    activeMonth.value = null;
  }

  wrapperRef.value.focus();
}

function onKeydown(event) {
  if (props.range) {
    emit("keydown", event);

    return;
  }

  if ([KEY_CODE.left, KEY_CODE.up, KEY_CODE.right, KEY_CODE.down].includes(event.keyCode)) {
    arrowKeyHandler(event);

    minutesRef.value?.blur();
    hoursRef.value?.blur();
    secondsRef.value?.blur();
  }

  if (event.keyCode === KEY_CODE.enter) {
    enterKeyHandler(event);
  }

  const isActiveTimeInput =
    document.activeElement !== minutesRef.value && document.activeElement !== secondsRef.value;

  if (isNumeric(event.key) && isActiveTimeInput) {
    hoursRef.value?.focus();
  }

  emit("keydown", event);
}

function onInput(date) {
  activeDate.value = null;
  activeMonth.value = date;

  if (isCurrentView.value.month) currentView.value = VIEW.day;
  if (isCurrentView.value.year) currentView.value = VIEW.month;
}

function arrowKeyHandler(event) {
  const currentActiveDate =
    activeDate.value || activeMonth.value || selectedDate.value || getDateWithoutTime();

  let newActiveDate;

  if (currentView.value === VIEW.day) {
    if (event.keyCode === KEY_CODE.down) {
      newActiveDate = addDays(currentActiveDate, 7);
    } else if (event.keyCode === KEY_CODE.left) {
      newActiveDate = addDays(currentActiveDate, -1);
    } else if (event.keyCode === KEY_CODE.up) {
      newActiveDate = addDays(currentActiveDate, -7);
    } else if (event.keyCode === KEY_CODE.right) {
      newActiveDate = addDays(currentActiveDate, 1);
    }
  } else if (currentView.value === VIEW.month) {
    if (event.keyCode === KEY_CODE.down) {
      newActiveDate = addMonths(currentActiveDate, 4);
    } else if (event.keyCode === KEY_CODE.left) {
      newActiveDate = addMonths(currentActiveDate, -1);
    } else if (event.keyCode === KEY_CODE.up) {
      newActiveDate = addMonths(currentActiveDate, -4);
    } else if (event.keyCode === KEY_CODE.right) {
      newActiveDate = addMonths(currentActiveDate, 1);
    }
  } else if (currentView.value === VIEW.year) {
    if (event.keyCode === KEY_CODE.down) {
      newActiveDate = addYears(currentActiveDate, 4);
    } else if (event.keyCode === KEY_CODE.left) {
      newActiveDate = addYears(currentActiveDate, -1);
    } else if (event.keyCode === KEY_CODE.up) {
      newActiveDate = addYears(currentActiveDate, -4);
    } else if (event.keyCode === KEY_CODE.right) {
      newActiveDate = addYears(currentActiveDate, 1);
    }
  }

  const isOutOfRange = dateIsOutOfRange(
    newActiveDate,
    props.minDate,
    props.maxDate,
    locale.value,
    actualDateFormat.value,
  );

  if (newActiveDate && !isOutOfRange) {
    activeDate.value = newActiveDate;
    activeMonth.value = newActiveDate;
  }
}

function addActiveMonth(amount) {
  const currentActiveMonth = activeMonth.value || selectedDate.value || getDateWithoutTime();
  const newActiveMonth = addMonths(currentActiveMonth, amount);

  activeMonth.value = newActiveMonth;
}

function addActiveYear(amount) {
  const currentActiveMonth = activeMonth.value || selectedDate.value || getDateWithoutTime();
  const newActiveMonth = addYears(currentActiveMonth, amount);

  activeMonth.value = newActiveMonth;
}

function onClickNextButton() {
  activeDate.value = null;

  if (isCurrentView.value.day) addActiveMonth(1);
  if (isCurrentView.value.month) addActiveYear(1);
  if (isCurrentView.value.year) addActiveYear(YEARS_PER_VIEW);
}

function onClickPrevButton() {
  activeDate.value = null;

  if (isCurrentView.value.day) addActiveMonth(-1);
  if (isCurrentView.value.month) addActiveYear(-1);
  if (isCurrentView.value.year) addActiveYear(YEARS_PER_VIEW * -1);
}

function enterKeyHandler() {
  if (activeDate.value !== null && isCurrentView.value.day) {
    localValue.value = activeDate.value;

    activeDate.value = null;
    activeMonth.value = null;

    emit("input", localValue.value);
  }

  if (isCurrentView.value.month) currentView.value = VIEW.day;
  if (isCurrentView.value.year) currentView.value = VIEW.month;
}

function onClickViewSwitch() {
  const views = Object.values(VIEW);
  const currentViewIndex = views.indexOf(currentView.value);
  const nextViewIndex = currentViewIndex + 1;

  activeDate.value = null;

  currentView.value = views[nextViewIndex] || views.at(0);
}

let lastValidHourValue = "";
let lastValidMinuteValue = "";
let lastValidSecondValue = "";

function onTimeKeydown(event) {
  if ([KEY_CODE.left, KEY_CODE.up, KEY_CODE.right, KEY_CODE.down].includes(event.keyCode)) {
    wrapperRef.value.focus();

    return;
  }

  if (event.keyCode === KEY_CODE.enter) {
    enterKeyHandler(event);

    emit("submit");
  }
}

function onClickSubmit() {
  emit("submit");
}

function onTimeInput(event, type, maxValue, minValue) {
  const input = event.target;
  const value = input.value;
  const numericValue = Number(value);

  const isHours = type === INPUT_TYPE.hours;
  const isMinutes = type === INPUT_TYPE.minutes;
  const isSeconds = type === INPUT_TYPE.seconds;

  if (!isNumeric(event.data) && event.data !== null) {
    if (isHours) {
      input.value = lastValidHourValue;
    }

    if (isMinutes) {
      input.value = lastValidMinuteValue;
    }

    if (isSeconds) {
      input.value = lastValidSecondValue;
    }

    return;
  }

  if (numericValue > maxValue || numericValue < minValue) {
    input.value = "0".padStart(2, "0");

    return;
  }

  if (isHours) {
    lastValidHourValue = numericValue;
  }

  if (isMinutes) {
    lastValidMinuteValue = numericValue;
  }

  if (isSeconds) {
    lastValidSecondValue = numericValue;
  }

  if (selectedDate.value) {
    const date = new Date(selectedDate.value.valueOf());

    date.setHours(lastValidHourValue, lastValidMinuteValue, lastValidSecondValue);
    localValue.value = date;
  }

  input.value = String(numericValue).padStart(2, "0");
}

defineExpose({
  /**
   * A reference to the calendar element for direct DOM manipulation.
   * @property {HTMLElement}
   */
  wrapperRef,
});
</script>
