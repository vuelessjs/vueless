<template>
  <div ref="wrapperRef" tabindex="1" v-bind="wrapperAttrs" @keydown="onKeydown">
    <div v-bind="navigationAttrs">
      <Teleport
        v-if="rangeSwitchViewContainerRef"
        :to="rangeSwitchViewContainerRef"
        :disabled="!range"
      >
        <UButton
          size="sm"
          color="gray"
          pill
          square
          variant="thirdary"
          v-bind="navigationSwitchViewButtonAttrs"
          @click="onClickViewSwitch"
          @mousedown.prevent.capture
        >
          <span v-if="isCurrentView.day" v-bind="dayViewSwitchLabelAttrs">
            <span v-bind="dayViewSwitchLabelMonthAttrs" v-text="viewSwitchLabel.month" />
            <span v-text="viewSwitchLabel.year" />
          </span>
          <span v-if="isCurrentView.month" v-text="viewSwitchLabel.year" />
          <span v-if="isCurrentView.year" v-text="viewSwitchLabel.yearsRange" />

          <template #right>
            <UIcon
              v-if="!range"
              size="sm"
              color="gray"
              variant="light"
              :name="config.dayViewSwitchLabelIconName"
              v-bind="dayViewSwitchLabelIconAttrs"
            />
          </template>
        </UButton>
      </Teleport>

      <div v-bind="nextPrevWrapperAttrs">
        <UButton
          pill
          size="sm"
          square
          variant="thirdary"
          v-bind="nextPrevButtonAttrs"
          @mousedown.prevent.capture
          @click="onClickPrevButton"
        >
          <UIcon
            size="sm"
            color="gray"
            variant="light"
            :name="config.prevIconName"
            v-bind="prevIconAttrs"
          />
        </UButton>

        <div ref="rangeSwitchViewContainerRef" />

        <UButton
          pill
          size="sm"
          square
          variant="thirdary"
          v-bind="nextPrevButtonAttrs"
          @mousedown.prevent.capture
          @click="onClickNextButton"
        >
          <UIcon
            size="sm"
            color="gray"
            variant="light"
            :name="config.nextIconName"
            v-bind="nextIconAttrs"
          />
        </UButton>
      </div>
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
      :date-format="dateFormat"
      :locale="locale"
      :config="config"
      @input="onInputDate"
    />

    <MonthView
      v-if="isCurrentView.month"
      :selected-date="selectedDate"
      :active-month="activeMonth"
      :active-date="activeDate"
      :min-date="minDate"
      :max-date="maxDate"
      :date-format="dateFormat"
      :locale="locale"
      :config="config"
      @input="onInput"
    />

    <YearView
      v-if="isCurrentView.year"
      :selected-date="selectedDate"
      :active-month="activeMonth"
      :active-date="activeDate"
      :min-date="minDate"
      :max-date="maxDate"
      :date-format="dateFormat"
      :locale="locale"
      :config="config"
      @input="onInput"
    />

    <div v-if="isTimepickerEnabled" v-bind="timepickerWrapperAttrs">
      <span v-bind="timepickerLabelAttrs" v-text="locale.timeLabel" />

      <div v-bind="timepickerInputWrapperAttrs">
        <input
          ref="hoursRef"
          type="text"
          v-bind="timepickerLeftInputAttrs"
          @input.prevent="onTimeInput($event, INPUT_TYPE.hours, MAX_HOURS, MIN_HOURS)"
          @keydown="onTimeKeydown"
        />
        &#8282;
        <input
          ref="minutesRef"
          type="text"
          v-bind="timepickerRightInputAttrs"
          @input.prevent="onTimeInput($event, INPUT_TYPE.minutes, MAX_MINUTES, MIN_MINUTES)"
          @keydown="onTimeKeydown"
        />
      </div>

      <UButton v-bind="submitButtonAttrs" @click="onClickSubmit">
        {{ locale.okLabel }}
      </UButton>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";

import UIcon from "../ui.image-icon";
import UButton from "../ui.button";

import UIService from "../service.ui";

import {
  parseDate,
  formatDate,
  getYearsRange,
  dateIsOutOfRange,
  isNumeric,
} from "./services/calendar.service";

import {
  getUnixTimestampFromDate,
  getDateWithoutTime,
  addMonths,
  addDays,
  addYears,
  getSortedLocale,
} from "./services/date.service";

import useAttrs from "./composables/attrs.composable";

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
} from "./constants";

import defaultConfig from "./configs/default.config";

import DayView from "./components/DayView.vue";
import MonthView from "./components/MonthView.vue";
import YearView from "./components/YearView.vue";

defineOptions({ name: "UCalendar" });

const props = defineProps({
  /**
   * Calendar value (timestamp).
   */
  modelValue: {
    type: [Number, Object],
    default: null,
  },

  /**
   * Calendar view.
   * @values day, month, year
   */
  view: {
    type: String,
    default: VIEW.day,
  },

  /**
   * Enable range selection.
   */
  range: {
    type: Boolean,
    default: UIService.get(defaultConfig, UCalendar).default.range,
  },

  /**
   * Enable timepicker.
   */
  timepicker: {
    type: Boolean,
    default: UIService.get(defaultConfig, UCalendar).default.timepicker,
  },

  /**
   * Date format.
   */
  dateFormat: {
    type: String,
    default: UIService.get(defaultConfig, UCalendar).default.dateFormat,
  },

  /**
   * User friendly date format.
   */
  userFormat: {
    type: String,
    default: UIService.get(defaultConfig, UCalendar).default.userFormat,
  },

  /**
   * Min date in format date string or Date.
   */
  minDate: {
    type: [Date, String],
    default: UIService.get(defaultConfig, UCalendar).default.minDate,
  },

  /**
   * Max date in format date string or Date.
   */
  maxDate: {
    type: [Date, String],
    default: UIService.get(defaultConfig, UCalendar).default.maxDate,
  },

  /**
   * Component ui config object.
   */
  config: {
    type: Object,
    default: () => ({}),
  },

  /**
   * Data-cy attribute for automated testing.
   */
  dataCy: {
    type: String,
    default: "",
  },
});

const emit = defineEmits([
  "update:modelValue",
  "update:view",
  "input",
  "submit",
  "keydown",
  "userDateChange",
  "formattedDateChange",
]);

const {
  config,
  wrapperAttrs,
  navigationAttrs,
  navigationSwitchViewButtonAttrs,
  dayViewSwitchLabelAttrs,
  dayViewSwitchLabelMonthAttrs,
  dayViewSwitchLabelIconAttrs,
  nextIconAttrs,
  nextPrevButtonAttrs,
  prevIconAttrs,
  timepickerWrapperAttrs,
  timepickerLabelAttrs,
  timepickerInputWrapperAttrs,
  timepickerLeftInputAttrs,
  timepickerRightInputAttrs,
  submitButtonAttrs,
  nextPrevWrapperAttrs,
} = useAttrs(props);

const wrapperRef = ref(null);
const hoursRef = ref(null);
const minutesRef = ref(null);
const rangeSwitchViewContainerRef = ref(null);

const activeDate = ref(null);
const activeMonth = ref(null);

defineExpose({ wrapperRef });

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

const locale = computed(() => {
  const currentLocale = props.config.i18n || config.value.i18n;
  const formattedLocale = {
    ...currentLocale,
    months: {
      shorthand: getSortedLocale(currentLocale.months.shorthand, LOCALE_TYPE.month),
      longhand: getSortedLocale(currentLocale.months.longhand, LOCALE_TYPE.month),
    },
    weekdays: {
      shorthand: getSortedLocale(currentLocale.weekdays.shorthand, LOCALE_TYPE.day),
      longhand: getSortedLocale(currentLocale.weekdays.longhand, LOCALE_TYPE.day),
    },
  };

  return formattedLocale;
});

const isTimepickerEnabled = computed(() => {
  return props.timepicker && !props.range;
});

const isModelRangeType = computed(() => {
  return (
    props.modelValue !== null &&
    !isNumeric(props.modelValue) &&
    typeof props.modelValue === "object"
  );
});

const localValue = computed({
  get: () => {
    if (props.range) {
      const from = isModelRangeType.value ? props.modelValue.from : props.modelValue || null;

      const to = isModelRangeType.value ? props.modelValue.to : null;

      return { from, to };
    }

    return isModelRangeType.value ? props.modelValue.from : props.modelValue;
  },
  set(value) {
    value = getCurrentValueType(value);

    const parsedDate = parseDate(props.range ? value.from : value, props.dateFormat, locale.value);
    const parsedDateTo =
      isModelRangeType.value && props.range
        ? parseDate(value.to, props.dateFormat, locale.value)
        : undefined;

    if (parsedDate && isTimepickerEnabled.value) {
      parsedDate.setHours(Number(hoursRef.value.value));
      parsedDate.setMinutes(Number(minutesRef.value.value));
    }

    const timestamp = parsedDate ? getUnixTimestampFromDate(parsedDate) : null;
    const timestampTo = parsedDateTo ? getUnixTimestampFromDate(parsedDateTo) : null;

    const isOutOfRange = dateIsOutOfRange(
      parsedDate || new Date(),
      props.minDate,
      props.maxDate,
      locale.value,
      props.dateFormat,
    );

    if (isOutOfRange) {
      return;
    }

    emit("update:modelValue", props.range ? { from: timestamp, to: timestampTo } : timestamp);

    if (parsedDate === null && isTimepickerEnabled.value) {
      const currentDate = new Date();

      hoursRef.value.value = String(currentDate.getHours()).padStart(2, "0");
      minutesRef.value.value = String(currentDate.getMinutes()).padStart(2, "0");
    }
  },
});

const selectedDate = computed(() => {
  return parseDate(
    props.range ? localValue.value.from : localValue.value,
    props.dateFormat,
    locale.value,
  );
});

const selectedDateTo = computed(() => {
  return props.range ? parseDate(localValue.value.to, props.dateFormat, locale.value) : undefined;
});

const formattedDate = computed(() => {
  return formatDate(selectedDate.value, props.dateFormat, locale.value);
});

const formattedTime = computed(() => {
  if (!isTimepickerEnabled.value) return undefined;

  const hours = String(selectedDate.value?.getHours()).padStart(2, "0");
  const minutes = String(selectedDate.value?.getMinutes()).padStart(2, "0");

  return selectedDate.value ? `${hours}:${minutes}` : "";
});

const userFormattedDate = computed(() => {
  const date = formatDate(selectedDate.value, props.userFormat, locale.value);
  const dateTo = props.range
    ? formatDate(selectedDateTo.value, props.userFormat, locale.value)
    : undefined;

  if (isTimepickerEnabled.value && selectedDate.value) {
    return `${date} ${SEPARATOR} ${formattedTime.value}`;
  }

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

watch(formattedDate, () => {
  emit("formattedDateChange", userFormattedDate.value);
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

onMounted(() => {
  if (selectedDate.value && isTimepickerEnabled.value) {
    hoursRef.value.value = String(selectedDate.value.getHours()).padStart(2, "0");
    minutesRef.value.value = String(selectedDate.value.getMinutes()).padStart(2, "0");
  }

  emit("userDateChange", userFormattedDate.value);
  emit("formattedDateChange", userFormattedDate.value);
});

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
      localValue.value.to ||
      !localValue.value.from ||
      getUnixTimestampFromDate(date) <= localValue.value.from;

    localValue.value = isFullReset
      ? { from: date, to: null }
      : { from: localValue.value.from, to: date };
  } else {
    localValue.value = date;
  }

  activeDate.value = null;
  activeMonth.value = null;

  emit("input", localValue.value);

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
  }

  if (event.keyCode === KEY_CODE.enter) {
    enterKeyHandler(event);
  }

  if (isNumeric(event.key) && document.activeElement !== minutesRef.value) {
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
    props.dateFormat,
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

  if (!isNumeric(event.data)) {
    input.value = isHours ? lastValidHourValue : lastValidMinuteValue;

    return;
  }

  if (numericValue > maxValue || numericValue < minValue) {
    input.value = "0".padStart(2, "0");

    return;
  }

  isHours ? (lastValidHourValue = numericValue) : (lastValidMinuteValue = numericValue);

  if (selectedDate.value) {
    const date = new Date(selectedDate.value.valueOf());

    date.setHours(lastValidHourValue, lastValidMinuteValue);
    localValue.value = date;
  }

  input.value = String(numericValue).padStart(2, "0");
}
</script>
