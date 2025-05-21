<script setup lang="ts" generic="TModelValue extends DateValue">
import { computed, ref, watch, useTemplateRef, nextTick } from "vue";
import { merge } from "lodash-es";

import useUI from "../composables/useUI.ts";
import { getDefaults } from "../utils/ui.ts";
import { isRangeDate } from "./types.ts";

import UButton from "../ui.button/UButton.vue";

import {
  parseDate,
  formatDate,
  getYearsRange,
  dateIsOutOfRange,
  isNumeric,
} from "./utilCalendar.ts";

import { getDateWithoutTime, addMonths, addDays, addYears, getSortedLocale } from "./utilDate.ts";

import { useLocale } from "../composables/useLocale.ts";

import {
  COMPONENT_NAME,
  ARROW_KEYS,
  YEARS_PER_VIEW,
  MAX_HOURS,
  MIN_HOURS,
  MAX_MINUTES,
  MIN_MINUTES,
  SEPARATOR,
  MAX_SECONDS,
  MIN_SECONDS,
  KeyCode,
  LocaleType,
  View,
  InputType,
} from "./constants.ts";

import defaultConfig from "./config.ts";

import type { Props, DateValue, RangeDate, Locale, Config } from "./types.ts";
import type { ComputedRef, Ref } from "vue";
import type { DateLocale } from "./utilFormatting.ts";
import type { ComponentExposed } from "../types.ts";

import DayView from "./UCalendarDayView.vue";
import MonthView from "./UCalendarMonthView.vue";
import YearView from "./UCalendarYearView.vue";

type DefaultLocale = typeof defaultConfig.i18n;

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<Props<TModelValue>>(), {
  view: View.Day,
  ...getDefaults<Props<TModelValue>, Config>(defaultConfig, COMPONENT_NAME),
  modelValue: undefined,
  minDate: undefined,
  maxDate: undefined,
});

const emit = defineEmits([
  /**
   * Triggers when date value changes.
   * @property {object} modelValue
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

const wrapperRef = useTemplateRef<HTMLDivElement>("wrapper");
const hoursRef = useTemplateRef<HTMLInputElement>("hours-input");
const minutesRef = useTemplateRef<HTMLInputElement>("minutes-input");
const secondsRef = useTemplateRef<HTMLInputElement>("seconds-input");
const okButton = useTemplateRef<ComponentExposed<typeof UButton>>("ok-button");
const dayViewRef = useTemplateRef<ComponentExposed<typeof DayView>>("day-view");

const activeDate: Ref<Date | null> = ref(null);
const activeMonth: Ref<Date | null> = ref(null);

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
    emit("update:view", currentView.value as View);
  }
});

const isCurrentView = computed(() => ({
  day: currentView.value === View.Day,
  month: currentView.value === View.Month,
  year: currentView.value === View.Year,
}));

const i18nGlobal = tm<DefaultLocale>(COMPONENT_NAME);

const currentLocale: ComputedRef<Locale> = computed(() =>
  merge({}, defaultConfig.i18n, i18nGlobal, props.config?.i18n),
);

const locale = computed(() => {
  const { months, weekdays } = currentLocale.value;

  // formatted locale
  return {
    ...currentLocale.value,
    months: {
      shorthand: getSortedLocale(months.shorthand, LocaleType.Month),
      longhand: getSortedLocale(months.longhand, LocaleType.Month),
    },
    weekdays: {
      shorthand: getSortedLocale(weekdays.shorthand, LocaleType.Day),
      longhand: getSortedLocale(weekdays.longhand, LocaleType.Day),
    },
  } as DateLocale;
});

const isInputRefs = computed(() => Boolean(hoursRef.value && minutesRef.value && secondsRef.value));

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
    Boolean(currentLocale.value.months.userFormat) || Boolean(i18nGlobal?.months?.userFormat)
      ? months.userFormat
      : months.longhand;

  const weekdaysLonghand =
    Boolean(currentLocale.value.weekdays.userFormat) || Boolean(i18nGlobal?.weekdays?.userFormat)
      ? weekdays.userFormat
      : weekdays.longhand;

  // formatted locale
  return {
    ...currentLocale.value,
    months: {
      shorthand: getSortedLocale(months.shorthand, LocaleType.Month),
      longhand: getSortedLocale(monthsLonghand, LocaleType.Month),
    },
    weekdays: {
      shorthand: getSortedLocale(weekdays.shorthand, LocaleType.Day),
      longhand: getSortedLocale(weekdaysLonghand, LocaleType.Day),
    },
  };
});

const localValue = computed({
  get: () => {
    if (props.range) {
      const isModelValueRangeType =
        props.modelValue &&
        typeof props.modelValue === "object" &&
        !(props.modelValue instanceof Date);

      const modelValue = isModelValueRangeType
        ? (props.modelValue as RangeDate)
        : (props.modelValue as string | Date);

      const from = isRangeDate(modelValue) ? modelValue.from : modelValue || null;
      const to = isRangeDate(modelValue) ? modelValue.to : null;

      return {
        from: parseDate(from || null, actualDateFormat.value, locale.value),
        to: parseDate(to || null, actualDateFormat.value, locale.value),
      };
    }

    if (!isRangeDate(props.modelValue)) {
      return parseDate(props.modelValue || null, actualDateFormat.value, locale.value);
    }

    return parseDate(props.modelValue.from || null, actualDateFormat.value, locale.value);
  },
  set(value) {
    const newDateValue = getCurrentValueType(value);

    const parsedDate = parseDate(
      isRangeDate(newDateValue) ? newDateValue.from : newDateValue,
      actualDateFormat.value,
      locale.value,
    );
    const parsedDateTo =
      isRangeDate(value) && props.range
        ? parseDate(value.to, actualDateFormat.value, locale.value)
        : null;

    if (parsedDate && isTimepickerEnabled.value) {
      parsedDate.setHours(Number(hoursRef.value?.value));
      parsedDate.setMinutes(Number(minutesRef.value?.value));
      parsedDate.setSeconds(Number(secondsRef.value?.value));
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

    const newRangeDate = { from: newDate, to: newDateTo };

    emit("update:modelValue", props.range ? (newRangeDate as RangeDate) : newDate);

    if (parsedDate === null && isTimepickerEnabled.value && isInputRefs.value) {
      const currentDate = new Date();

      hoursRef.value!.value = String(currentDate.getHours()).padStart(2, "0");
      minutesRef.value!.value = String(currentDate.getMinutes()).padStart(2, "0");
      secondsRef.value!.value = String(currentDate.getSeconds()).padStart(2, "0");
    }
  },
});

const selectedDate = computed(() => {
  return parseDate(
    isRangeDate(localValue.value) ? localValue.value.from : localValue.value,
    actualDateFormat.value,
    locale.value,
  );
});

const selectedDateTo = computed(() => {
  return isRangeDate(localValue.value)
    ? parseDate(localValue.value.to, actualDateFormat.value, locale.value)
    : null;
});

const userFormattedDate = computed(() => {
  const date = formatDate(selectedDate.value, actualUserFormat.value, userFormatLocale.value);
  const dateTo = props.range
    ? formatDate(selectedDateTo.value, actualUserFormat.value, userFormatLocale.value)
    : null;

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

const currentViewLabel = computed(() => {
  let label = "";

  if (isCurrentView.value.day) {
    label = `${viewSwitchLabel.value.month} ${viewSwitchLabel.value.year}`;
  }

  if (isCurrentView.value.month) {
    label = viewSwitchLabel.value.year;
  }

  if (isCurrentView.value.year) {
    label = viewSwitchLabel.value.yearsRange;
  }

  return label;
});

watch(userFormattedDate, () => {
  emit("userDateChange", userFormattedDate.value);
});

// This watcher force updates value when range props changed
watch(
  () => props.range,
  (newValue, oldValue) => {
    if (newValue !== oldValue) {
      localValue.value = localValue.value;
    }
  },
);

watch(
  selectedDate,
  () => {
    nextTick(() => {
      if (selectedDate.value && isTimepickerEnabled.value && isInputRefs.value) {
        hoursRef.value!.value = String(selectedDate.value.getHours()).padStart(2, "0");
        minutesRef.value!.value = String(selectedDate.value.getMinutes()).padStart(2, "0");
        secondsRef.value!.value = String(selectedDate.value.getSeconds()).padStart(2, "0");
      }
    });

    if (selectedDate.value) {
      emit("userDateChange", userFormattedDate.value);
    }
  },
  { immediate: true },
);

watch(
  localValue,
  (newValue) => {
    if ((isRangeDate(newValue) && (!newValue.to || !newValue.from)) || !isRangeDate(newValue)) {
      return;
    }

    const parsedNewDateTo = parseDate(newValue.to, props.dateFormat, locale.value);
    const parsedNewValueFrom = parseDate(newValue.from, props.dateFormat, locale.value);

    if (parsedNewDateTo) {
      const notInView = dateIsOutOfRange(
        parsedNewDateTo,
        dayViewRef.value?.days?.at(0),
        dayViewRef.value?.days?.at(-1),
        locale.value,
        actualDateFormat.value,
      );

      if (notInView) {
        activeMonth.value = parsedNewDateTo;
      }
    }

    if (parsedNewValueFrom) {
      const notInView = dateIsOutOfRange(
        parsedNewValueFrom,
        dayViewRef.value?.days?.at(0),
        dayViewRef.value?.days?.at(-1),
        locale.value,
        actualDateFormat.value,
      );

      if (notInView) {
        activeMonth.value = parsedNewValueFrom;
      }
    }
  },
  { deep: true },
);

function getCurrentValueType(value: DateValue): DateValue {
  if (props.range && value === null) {
    return { from: null, to: null };
  }

  if (isRangeDate(value) && !props.range) {
    return value.from || value;
  }

  if (typeof value !== "object" && value !== null && props.range) {
    return { from: value, to: null };
  }

  return value;
}

function onInputDate(newDate: Date | null) {
  if (newDate === null) {
    localValue.value = newDate;

    activeDate.value = null;
    activeMonth.value = null;

    emit("input", localValue.value);

    return;
  }

  const date = new Date(newDate.valueOf());

  if (props.range && isRangeDate(localValue.value)) {
    const isFullReset =
      (localValue.value.from && date < localValue.value.from) ||
      (localValue.value.to && localValue.value.from);

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

  wrapperRef.value?.focus();
}

function onKeydown(event: KeyboardEvent) {
  if (props.range) {
    emit("keydown", event);

    return;
  }

  if (ARROW_KEYS.includes(event.code)) {
    arrowKeyHandler(event);

    minutesRef.value?.blur();
    hoursRef.value?.blur();
    secondsRef.value?.blur();
  }

  if (event.code === KeyCode.Enter) {
    enterKeyHandler();
  }

  const isActiveTimeInput =
    document.activeElement !== minutesRef.value && document.activeElement !== secondsRef.value;

  if (isNumeric(event.key) && isActiveTimeInput) {
    hoursRef.value?.focus();
  }

  emit("keydown", event);
}

function onInput(date: Date | null): void {
  activeDate.value = null;
  activeMonth.value = date;

  if (isCurrentView.value.month) currentView.value = View.Day;
  if (isCurrentView.value.year) currentView.value = View.Month;
}

function arrowKeyHandler(event: KeyboardEvent) {
  const currentActiveDate =
    activeDate.value || activeMonth.value || selectedDate.value || getDateWithoutTime();

  let newActiveDate;

  if (currentView.value === View.Day) {
    if (event.code === KeyCode.ArrowDown) {
      newActiveDate = addDays(currentActiveDate, 7);
    } else if (event.code === KeyCode.ArrowLeft) {
      newActiveDate = addDays(currentActiveDate, -1);
    } else if (event.code === KeyCode.ArrowUp) {
      newActiveDate = addDays(currentActiveDate, -7);
    } else if (event.code === KeyCode.ArrowRight) {
      newActiveDate = addDays(currentActiveDate, 1);
    }
  } else if (currentView.value === View.Month) {
    if (event.code === KeyCode.ArrowDown) {
      newActiveDate = addMonths(currentActiveDate, 3);
    } else if (event.code === KeyCode.ArrowLeft) {
      newActiveDate = addMonths(currentActiveDate, -1);
    } else if (event.code === KeyCode.ArrowUp) {
      newActiveDate = addMonths(currentActiveDate, -3);
    } else if (event.code === KeyCode.ArrowRight) {
      newActiveDate = addMonths(currentActiveDate, 1);
    }
  } else if (currentView.value === View.Year) {
    if (event.code === KeyCode.ArrowDown) {
      newActiveDate = addYears(currentActiveDate, 3);
    } else if (event.code === KeyCode.ArrowLeft) {
      newActiveDate = addYears(currentActiveDate, -1);
    } else if (event.code === KeyCode.ArrowUp) {
      newActiveDate = addYears(currentActiveDate, -3);
    } else if (event.code === KeyCode.ArrowRight) {
      newActiveDate = addYears(currentActiveDate, 1);
    }
  }

  const isOutOfRange =
    newActiveDate &&
    dateIsOutOfRange(
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

function addActiveMonth(amount: number) {
  const currentActiveMonth = activeMonth.value || selectedDate.value || getDateWithoutTime();

  activeMonth.value = addMonths(currentActiveMonth, amount);
}

function addActiveYear(amount: number) {
  const currentActiveMonth = activeMonth.value || selectedDate.value || getDateWithoutTime();

  activeMonth.value = addYears(currentActiveMonth, amount);
}

function onClickNextButton() {
  activeDate.value = null;

  if (isCurrentView.value.day) addActiveMonth(1);
  if (isCurrentView.value.month) addActiveYear(1);
  if (isCurrentView.value.year) addActiveYear(YEARS_PER_VIEW);
}

function onClickNextYearButton() {
  activeDate.value = null;

  addActiveYear(1);
}

function onClickPrevButton() {
  activeDate.value = null;

  if (isCurrentView.value.day) addActiveMonth(-1);
  if (isCurrentView.value.month) addActiveYear(-1);
  if (isCurrentView.value.year) addActiveYear(YEARS_PER_VIEW * -1);
}

function onClickPrevYearButton() {
  activeDate.value = null;

  addActiveYear(-1);
}

function enterKeyHandler() {
  if (activeDate.value !== null && isCurrentView.value.day) {
    localValue.value = activeDate.value;

    activeDate.value = null;
    activeMonth.value = null;

    emit("input", localValue.value);
    emit("submit");
  }

  if (isCurrentView.value.month) currentView.value = View.Day;
  if (isCurrentView.value.year) currentView.value = View.Month;
}

function onClickViewSwitch() {
  const views: string[] = Object.values(View);
  const currentViewIndex = views.indexOf(currentView.value);
  const nextViewIndex = currentViewIndex + 1;

  activeDate.value = null;

  currentView.value = (views[nextViewIndex] || views.at(0)) as View;
}

let lastValidHourValue: string | number = "";
let lastValidMinuteValue: string | number = "";
let lastValidSecondValue: string | number = "";

function onTimeKeydown(event: KeyboardEvent) {
  if (ARROW_KEYS.includes(event.code)) {
    wrapperRef.value?.focus();

    return;
  }

  if (event.code === KeyCode.Enter) {
    enterKeyHandler();

    emit("submit");
  }
}

function onClickSubmit() {
  emit("submit");
}

let timeInputCount = 0;

function onClickTimeInput(event: MouseEvent) {
  const input = event.target as HTMLInputElement;

  selectTimeInput(input);
}

function onFocusTimeInput(event: FocusEvent) {
  const input = event.target as HTMLInputElement;

  timeInputCount = 0;

  selectTimeInput(input);
}

function selectTimeInput(input: HTMLInputElement) {
  const value = input.value;

  input.setSelectionRange(0, value.length, "backward");
}

function onTimeInput(event: InputEvent, type: InputType) {
  timeInputCount += 1;

  const input = event.target as HTMLInputElement;
  const value = input.value;
  const numericValue = Number(value);

  const isHours = type === InputType.Hours;
  const isMinutes = type === InputType.Minutes;
  const isSeconds = type === InputType.Seconds;

  let minValue = 0;
  let maxValue = 0;

  if (isHours) {
    minValue = MIN_HOURS;
    maxValue = MAX_HOURS;
  }

  if (isMinutes) {
    minValue = MIN_MINUTES;
    maxValue = MAX_MINUTES;
  }

  if (isSeconds) {
    minValue = MIN_SECONDS;
    maxValue = MAX_SECONDS;
  }

  if (event.data !== null && !isNumeric(event.data)) {
    if (isHours) {
      input.value = String(lastValidHourValue).padStart(2, "0");
    }

    if (isMinutes) {
      input.value = String(lastValidMinuteValue).padStart(2, "0");
    }

    if (isSeconds) {
      input.value = String(lastValidSecondValue).padStart(2, "0");
    }

    return;
  }

  if (numericValue > maxValue || numericValue < minValue) {
    if (isHours && minutesRef.value) {
      input.value = String(lastValidHourValue).padStart(2, "0");

      minutesRef.value.focus();
    }

    if (isMinutes && secondsRef.value) {
      input.value = String(lastValidMinuteValue).padStart(2, "0");

      secondsRef.value.focus();
    }

    if (isSeconds && okButton.value) {
      input.value = String(lastValidSecondValue).padStart(2, "0");

      okButton.value.buttonRef?.focus();
    }

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

    date.setHours(
      Number(lastValidHourValue),
      Number(lastValidMinuteValue),
      Number(lastValidSecondValue),
    );
    localValue.value = date;
  }

  input.value = String(numericValue).padStart(2, "0");

  if (timeInputCount >= 2) {
    if (isHours && minutesRef.value) {
      minutesRef.value.focus();
    }

    if (isMinutes && secondsRef.value) {
      secondsRef.value.focus();
    }

    if (isSeconds && okButton.value) {
      okButton.value.buttonRef?.focus();
    }

    timeInputCount = 0;
  }
}

defineExpose({
  /**
   * A reference to the calendar element for direct DOM manipulation.
   * @property {HTMLElement}
   */
  wrapperRef,
});

/**
 * Get element / nested component attributes for each config token ✨
 * Applies: `class`, `config`, redefined default `props` and dev `vl-...` attributes.
 */
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
} = useUI<Config>(defaultConfig);
</script>

<template>
  <div ref="wrapper" :tabindex="tabindex" v-bind="wrapperAttrs" @keydown="onKeydown">
    <div v-bind="navigationAttrs">
      <UButton
        v-if="range"
        square
        size="sm"
        color="grayscale"
        variant="ghost"
        :icon="config.defaults.prevYearIcon"
        v-bind="nextPrevButtonAttrs"
        @mousedown.prevent.capture
        @click="onClickPrevYearButton"
      />

      <UButton
        square
        size="sm"
        color="grayscale"
        variant="ghost"
        :icon="config.defaults.prevIcon"
        v-bind="nextPrevButtonAttrs"
        @mousedown.prevent.capture
        @click="onClickPrevButton"
      />

      <UButton
        block
        size="sm"
        color="grayscale"
        variant="ghost"
        :label="currentViewLabel"
        v-bind="viewSwitchButtonAttrs"
        @mousedown.prevent.capture
        @click="onClickViewSwitch"
      />

      <UButton
        square
        size="sm"
        color="grayscale"
        variant="ghost"
        :icon="config.defaults.nextIcon"
        v-bind="nextPrevButtonAttrs"
        @mousedown.prevent.capture
        @click="onClickNextButton"
      />

      <UButton
        v-if="range"
        square
        size="sm"
        color="grayscale"
        variant="ghost"
        :icon="config.defaults.nextYearIcon"
        v-bind="nextPrevButtonAttrs"
        @mousedown.prevent.capture
        @click="onClickNextYearButton"
      />
    </div>

    <DayView
      v-if="isCurrentView.day"
      ref="day-view"
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
      <span v-bind="timepickerLabelAttrs" v-text="currentLocale.timeLabel" />

      <div v-bind="timepickerInputWrapperAttrs">
        <input
          ref="hours-input"
          placeholder="00"
          type="text"
          v-bind="timepickerInputHoursAttrs"
          @input.prevent="onTimeInput($event as InputEvent, InputType.Hours)"
          @click.prevent="onClickTimeInput"
          @focus.prevent="onFocusTimeInput"
          @keydown="onTimeKeydown"
        />
        &#8282;
        <input
          ref="minutes-input"
          placeholder="00"
          type="text"
          v-bind="timepickerInputMinutesAttrs"
          @input.prevent="onTimeInput($event as InputEvent, InputType.Minutes)"
          @click.prevent="onClickTimeInput"
          @focus.prevent="onFocusTimeInput"
          @keydown="onTimeKeydown"
        />
        &#8282;
        <input
          ref="seconds-input"
          placeholder="00"
          type="text"
          v-bind="timepickerInputSecondsAttrs"
          @input.prevent="onTimeInput($event as InputEvent, InputType.Seconds)"
          @click.prevent="onClickTimeInput"
          @focus.prevent="onFocusTimeInput"
          @keydown="onTimeKeydown"
        />
      </div>

      <UButton
        ref="ok-button"
        size="sm"
        color="grayscale"
        variant="soft"
        v-bind="timepickerSubmitButtonAttrs"
        @click="onClickSubmit"
      >
        {{ currentLocale.okLabel }}
      </UButton>
    </div>
  </div>
</template>
