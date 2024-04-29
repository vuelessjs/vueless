<template>
  <div>
    <UInput
      v-if="isVariant.input"
      :id="id"
      v-model="userFormatDate"
      :label="label"
      :placeholder="placeholder"
      :error="error"
      :description="description"
      readonly
      :disabled="disabled"
      :size="size"
      v-bind="inputAttrs"
      @focus="activate"
    >
      <template #left>
        <slot name="left" />
      </template>

      <template #right-icon>
        <slot name="right-icon" />
      </template>

      <template #right>
        <slot name="right" />
      </template>
    </UInput>

    <div v-if="isVariant.button" v-bind="buttonWrapperAttrs">
      <UButton
        :disabled="disabled"
        :size="size"
        v-bind="shiftRangeButtonAttrs"
        @click="onClickShiftRange('prev')"
      >
        <UIcon interactive size="sm" :name="config.prevIconName" v-bind="prevIconAttrs" />
      </UButton>

      <UButton
        :id="id"
        :disabled="disabled"
        :size="size"
        :label="userFormatDate"
        v-bind="buttonAttrs"
        @click="activate"
      />

      <UButton
        :disabled="disabled"
        :size="size"
        v-bind="shiftRangeButtonAttrs"
        @click="onClickShiftRange('next')"
      >
        <UIcon interactive size="sm" :name="config.nextIconName" v-bind="nextIconAttrs" />
      </UButton>
    </div>

    <Transition v-bind="config.menuTransition">
      <div
        v-if="isShownMenu"
        ref="menuRef"
        tabindex="-1"
        v-bind="menuAttrs"
        @blur="onBlur"
        @keydown.esc="deactivate"
        @mouseleave="onMouseoutMenu"
      >
        <div v-bind="periodsRowAttrs">
          <div
            v-for="periodButton in periods"
            :key="periodButton.name"
            v-bind="periodButtonAttrs(getPeriodButtonsClasses(periodButton.name))"
            @click="onClickPeriodButton(periodButton.name)"
          >
            {{ periodButton.title }}
          </div>
        </div>

        <div v-bind="periodsRowAttrs">
          <div
            v-if="customRangeButton.range.to && customRangeButton.range.from"
            v-bind="periodButtonAttrs(getPeriodButtonsClasses(PERIOD.custom))"
            @click="onClickCustomRangeButton"
          >
            {{ customRangeButton.label }}
            <span v-if="customRangeButton.description" v-text="customRangeButton.description" />
          </div>

          <div
            v-bind="periodButtonAttrs(getPeriodButtonsClasses(PERIOD.ownRange))"
            @click="onClickOwnRange"
          >
            <UIcon name="apps" size="xs" />

            {{ locale.ownRange }}
          </div>
        </div>

        <template v-if="!isPeriod.ownRange && !isPeriod.custom">
          <div v-bind="rangeSwitchWrapperAttrs">
            <UIcon
              interactive
              color="grayscale"
              size="sm"
              :name="config.prevIconName"
              v-bind="prevIconAttrs"
              @click="onClickShiftDatesList('prev')"
            />

            <div v-bind="rangeSwitchTitleAttrs">
              {{ rangeSwitchTitle }}
            </div>
            <UIcon
              interactive
              class="icon"
              size="sm"
              :name="config.nextIconName"
              v-bind="nextIconAttrs"
              @click="onClickShiftDatesList('next')"
            />
          </div>

          <div v-bind="periodDateListAttrs(getPeriodDateListClasses())">
            <button
              v-for="date in periodDateList"
              :key="date.title"
              :disabled="isDatePeriodOutOfRange(date)"
              v-bind="periodDateAttrs(getPeriodDateClasses(date))"
              @click="selectDate(date), toggleMenu()"
            >
              {{ date.title }}
            </button>
          </div>
        </template>

        <div v-if="isPeriod.ownRange" v-bind="rangeInputWrapperAttrs">
          <UInput
            ref="rangeInputStartRef"
            v-model="rangeStart"
            :error="inputRangeStartError"
            size="sm"
            v-bind="rangeInputAttrs"
            :name="rangeInputName"
            @input="onInputRangeInput($event, INPUT_RANGE_TYPE.start)"
            @blur="onBlurRangeInput"
          />

          <UInput
            ref="rangeInputEndRef"
            v-model="rangeEnd"
            :error="inputRangeEndError"
            size="sm"
            v-bind="rangeInputAttrs"
            :name="rangeInputName"
            @input="onInputRangeInput($event, INPUT_RANGE_TYPE.end)"
            @blur="onBlurRangeInput"
          />
        </div>

        <div v-bind="inputRangeErrorAttrs">
          {{ inputRangeEndError || inputRangeStartError }}
        </div>

        <UCalendar
          v-if="isPeriod.ownRange"
          v-model="calendarValue"
          :min-date="minDate"
          :max-date="maxDate"
          v-bind="calendarAttrs"
          :date-format="RANGE_INPUT_FORMAT"
          range
          @mouseenter="onMouseoverCalendar"
        />
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { computed, watch, ref, nextTick } from "vue";
import { useStore } from "vuex";
import { merge } from "lodash-es";

import UIcon from "../ui.image-icon";
import UInput from "../ui.form-input";
import UButton from "../ui.button";
import UCalendar from "../ui.form-calendar";
import { LOCALE_TYPE } from "../ui.form-calendar/constants";

import UIService, { getRandomId } from "../service.ui";

import {
  addDays,
  gmtToUTC,
  getUnixTimestampFromDate,
  addMonths,
  addYears,
  getDateFromUnixTimestamp,
  getSortedLocale,
  utcToGMT,
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

import { wrongDateFormat, wrongMonthNumber, wrongDayNumber } from "./services/validation.service";
import useAttrs from "./composables/attrs.composable";
import { useLocale } from "../composable.locale";

import defaultConfig from "./configs/default.config";
import {
  UDatePickerRange,
  DATE_PICKER_BUTTON_TYPE,
  DATE_PICKER_INPUT_TYPE,
  PERIOD,
  RANGE_INPUT_FORMAT,
  INPUT_RANGE_TYPE,
} from "./constants";

/* Should be a string for correct web-types gen */
defineOptions({ name: "UDatePickerRange", inheritAttrs: false });

const props = defineProps({
  /**
   * Dater picker range value as object with from and to keys (timestamp).
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
    default: () => UIService.get(defaultConfig, UDatePickerRange).default.customRangeButton,
  },

  /**
   * The variant of the date picker.
   * @values button, input
   */
  variant: {
    type: String,
    default: UIService.get(defaultConfig, UDatePickerRange).default.variant,
  },

  /**
   * Min date in format date string or Date.
   */
  minDate: {
    type: [String, Date],
    default: UIService.get(defaultConfig, UDatePickerRange).default.minDate,
  },

  /**
   * Max date in format date string or Date.
   */
  maxDate: {
    type: [String, Date],
    default: UIService.get(defaultConfig, UDatePickerRange).default.maxDate,
  },

  /**
   * Datepicker size.
   * @values sm, md, lg
   */
  size: {
    type: String,
    default: UIService.get(defaultConfig, UDatePickerRange).default.size,
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
    default: UIService.get(defaultConfig, UDatePickerRange).default.disabled,
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
   * Data-cy attribute for automated testing.
   */
  dataCy: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:modelValue"]);

const isShownMenu = ref(false);

const {
  config,
  calendarAttrs,
  inputAttrs,
  menuAttrs,
  periodsRowAttrs,
  periodButtonAttrs,
  rangeSwitchWrapperAttrs,
  nextIconAttrs,
  prevIconAttrs,
  periodDateAttrs,
  periodDateListAttrs,
  rangeSwitchTitleAttrs,
  buttonWrapperAttrs,
  buttonAttrs,
  shiftRangeButtonAttrs,
  rangeInputAttrs,
  rangeInputWrapperAttrs,
  inputRangeErrorAttrs,
} = useAttrs(props, { isShownMenu });
const store = useStore();
const { tm } = useLocale();

const calendarValue = ref(props.modelValue);
const activeDate = ref(
  props.modelValue.from !== null ? getDateFromUnixTimestamp(props.modelValue.from) : new Date(),
);
const period = ref(PERIOD.ownRange);
const periodDateList = ref(null);
const rangeStart = ref("");
const rangeEnd = ref("");
const inputRangeStartError = ref("");
const inputRangeEndError = ref("");
const isHoverEvent = ref(false);

const menuRef = ref(null);
const rangeInputStartRef = ref(null);
const rangeInputEndRef = ref(null);

const localValue = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit("update:modelValue", value);

    activeDate.value = getDateFromUnixTimestamp(value.from || new Date());
  },
});

const isMobileDevice = computed(() => store.getters["breakpoint/isMobileDevice"]);
const rangeInputName = computed(() => `rangeInput-${props.id}`);
const currentLocale = computed(() => merge(tm("UDatePickerRange"), props.config.i18n));

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

const userFormatLocale = computed(() => {
  const { months, weekdays } = currentLocale.value;

  const monthsLonghand = props.config.i18n?.months?.userFormat
    ? months.userFormat
    : months.longhand;

  const weekdaysLonghand = props.config.i18n?.weekdays?.userFormat
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

const userFormatDate = computed(() => {
  if ((!localValue.value.from && !localValue.value.to) || !localValue.value.from) return "";

  let title = "";

  const isDefaultTitle = isPeriod.value.week || isPeriod.value.custom || isPeriod.value.ownRange;

  const from = getDateFromUnixTimestamp(localValue.value.from);
  const to = localValue.value.to !== null ? getDateFromUnixTimestamp(localValue.value.to) : null;

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

    const fromTitle = isSameMonth(from, to)
      ? from.getDate()
      : `${from.getDate()} ${startMonthName} ${startYear}`;
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

  if (isMobileDevice.value && !isPeriod.value.month && isVariant.value.button) {
    const startDay = String(from.getDate()).padStart(2, "0");
    const endDay = String(to?.getDate())?.padStart(2, "0");
    const startMonth = String(from.getMonth()).padStart(2, "0");
    const endMonth = String(to?.getMonth())?.padStart(2, "0");

    const fromTitle = `${startDay}.${startMonth}`;
    const toTitle = to ? `${endDay}.${endMonth} / ${to.getFullYear}` : "";

    title = `${fromTitle} – ${toTitle}`;
  }

  return title;
});

watch(
  calendarValue,
  () => {
    localValue.value = {
      from:
        calendarValue.value.from === null
          ? calendarValue.value.from
          : getUnixTimestampFromDate(gmtToUTC(getDateFromUnixTimestamp(calendarValue.value.from))),
      to:
        calendarValue.value.to === null
          ? calendarValue.value.to
          : getUnixTimestampFromDate(gmtToUTC(getDateFromUnixTimestamp(calendarValue.value.to))),
    };

    nextTick(() => menuRef.value?.focus());
  },
  { deep: true },
);

watch(
  () => props.modelValue,
  () => {
    if (props.modelValue.to !== calendarValue.value.to) {
      calendarValue.value.to = props.modelValue.to;
    }

    if (props.modelValue.from !== calendarValue.value.from) {
      calendarValue.value.from = props.modelValue.from;
    }

    rangeStart.value = props.modelValue.from
      ? formatDate(
          getDateFromUnixTimestamp(props.modelValue.from),
          RANGE_INPUT_FORMAT,
          locale.value,
        )
      : "";

    rangeEnd.value = props.modelValue.to
      ? formatDate(getDateFromUnixTimestamp(props.modelValue.to), RANGE_INPUT_FORMAT, locale.value)
      : "";

    inputRangeStartError.value = "";
    inputRangeEndError.value = "";
  },
  { deep: true, immediate: true },
);

watch(period, () => {
  activeDate.value =
    localValue.value.from !== null ? getDateFromUnixTimestamp(localValue.value.from) : new Date();
});

function onClickPeriodButton(periodName) {
  const localDate =
    localValue.value.from !== null ? getDateFromUnixTimestamp(localValue.value.from) : new Date();

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

  selectDate(periodDateList.value.at(0));
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
  const from =
    typeof props.customRangeButton.range.from === "number"
      ? getDateFromUnixTimestamp(props.customRangeButton.range.from)
      : props.customRangeButton.range.from;

  const to =
    typeof props.customRangeButton.range.to === "number"
      ? getDateFromUnixTimestamp(props.customRangeButton.range.to)
      : props.customRangeButton.range.to;

  localValue.value = {
    from: getUnixTimestampFromDate(gmtToUTC(from)),
    to: getUnixTimestampFromDate(gmtToUTC(to)),
  };
}

function isDatePeriodOutOfRange(datePeriod) {
  return (
    dateIsOutOfRange(
      getDateFromUnixTimestamp(datePeriod.startRange),
      props.minDate,
      props.maxDate,
      locale.value,
      RANGE_INPUT_FORMAT,
    ) ||
    dateIsOutOfRange(
      getDateFromUnixTimestamp(datePeriod.endRange),
      props.minDate,
      props.maxDate,
      RANGE_INPUT_FORMAT,
    )
  );
}

function onClickShiftDatesList(action) {
  const defaultRange = action === "prev" ? -1 : 1;
  const yearRange = action === "prev" ? -12 : 12;

  if (isPeriod.value.week) {
    activeDate.value = addMonths(activeDate.value, defaultRange);
    periodDateList.value = getWeekDateList(activeDate.value, config.value.i18n.months.shorthand);
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
  return period.value === periodName ? [config.value.periodButtonActive] : [];
}

function getPeriodDateClasses(date) {
  return localValue.value.from === date.startRange ? [config.value.periodDateActive] : [];
}

function getPeriodDateListClasses() {
  if (isPeriod.value.ownRange) return [];
  if (isPeriod.value.week) return [config.value.periodDateWeekList];
  if (isPeriod.value.month) return [config.value.periodDateMonthList];
  if (isPeriod.value.quarter) return [config.value.periodDateQuarterList];
  if (isPeriod.value.year) return [config.value.periodDateYearList];
}

function activate() {
  isShownMenu.value = true;

  nextTick(() => menuRef.value.focus());
}

function deactivate() {
  isShownMenu.value = false;

  isHoverEvent.value = false;
}

function onBlur(event) {
  const { relatedTarget } = event;

  if (!menuRef.value.contains(relatedTarget)) {
    deactivate();
  }
}

function onBlurRangeInput(event) {
  const { relatedTarget } = event;
  const isRangeInputFocus = relatedTarget?.name === rangeInputName.value;

  if (!isRangeInputFocus) {
    menuRef.value.focus();
  }

  if (!menuRef.value.contains(relatedTarget) && !isHoverEvent.value) {
    deactivate();
  }

  isHoverEvent.value = false;
}

function onInputRangeInput(value, type) {
  const isInvalidDateFormat = !wrongDateFormat(value);
  const isInvalidMonthNumber = !wrongMonthNumber(value);
  const isInvalidDayNumber = !wrongDayNumber(value);

  let error = "";

  if (isInvalidDateFormat && value) {
    error = locale.value.dateFormatWithDot;
  } else if (isInvalidMonthNumber && value) {
    error = locale.value.notCorrectMonthNumber;
  } else if (isInvalidDayNumber && value) {
    error = locale.value.notCorrectDayNumber;
  }

  if (type === INPUT_RANGE_TYPE.start) {
    inputRangeStartError.value = error;
  }

  if (type === INPUT_RANGE_TYPE.end) {
    inputRangeEndError.value = error;
  }

  const parsedValue = gmtToUTC(parseDate(value || new Date(), RANGE_INPUT_FORMAT, locale.value));
  const unixTimeValue = getUnixTimestampFromDate(parsedValue);
  const isOutOfRange = dateIsOutOfRange(
    parsedValue,
    props.minDate,
    props.maxDate,
    locale.value,
    RANGE_INPUT_FORMAT,
  );
  const isToLessThanFrom = unixTimeValue <= localValue.value.from;

  if (type === INPUT_RANGE_TYPE.start && !error && !isOutOfRange) {
    localValue.value.from = value ? unixTimeValue : "";
  }

  if (type === INPUT_RANGE_TYPE.end && !error && !isOutOfRange && !isToLessThanFrom) {
    localValue.value.to = value ? unixTimeValue : "";
  }
}

setDefaultPeriodForButton();

function setDefaultPeriodForButton() {
  const from = utcToGMT(getDateFromUnixTimestamp(props.modelValue.to || new Date()));
  const to = utcToGMT(getDateFromUnixTimestamp(props.modelValue.from || new Date()));

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

  const from = getDateFromUnixTimestamp(localValue.value.from);
  const to = localValue.value.to ? getDateFromUnixTimestamp(localValue.value.to) : addDays(from, 1);
  const daysDifference = Math.ceil(Math.abs(getDatesDifference(from, to)) / millisecondsPerDay);

  if (action === "next") {
    if (isPeriod.value.ownRange) {
      const nextDate = {
        to: getUnixTimestampFromDate(addDays(to, daysDifference)),
        from: getUnixTimestampFromDate(addDays(from, daysDifference)),
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
        to: getUnixTimestampFromDate(gmtToUTC(addDays(to, daysDifference * -1))),
        from: getUnixTimestampFromDate(gmtToUTC(addDays(from, daysDifference * -1))),
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

  if ((rangeStart.value && rangeEnd.value && !inputRangeEndError.value) || !rangeStart.value) {
    rangeInputStartRef.value.input.focus();

    return;
  }

  if (rangeStart.value && !rangeEnd.value && !inputRangeStartError.value) {
    rangeInputEndRef.value.input.focus();

    return;
  }
}

function onMouseoutMenu() {
  const isRangeInputFocus = document.activeElement.name === rangeInputName.value;

  if (isRangeInputFocus) {
    isHoverEvent.value = true;

    document.activeElement.blur();
  }
}
</script>
