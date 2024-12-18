<script setup lang="ts" generic="TModelValue extends RangeDate">
import { computed, watch, ref, nextTick, provide, useId, useTemplateRef, watchEffect } from "vue";

import { merge } from "lodash-es";

import useUI from "../composables/useUI.ts";
import { getDefaults } from "../utils/ui.ts";

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
} from "../ui.form-calendar/utilDate.ts";

import { formatDate, parseDate, dateIsOutOfRange } from "../ui.form-calendar/utilCalendar.ts";

import {
  getWeekDateList,
  getYearDateList,
  getQuartersDateList,
  getMonthsDateList,
  type DatePeriodRange,
} from "./utilDateRange.ts";

import { Direction, useAutoPosition } from "../composables/useAutoPosition.ts";
import { useLocale } from "./useLocale.ts";
import { useUserFormat } from "./useUserFormat.ts";

import defaultConfig from "./config.ts";
import {
  UDatePickerRange,
  DATE_PICKER_BUTTON_TYPE,
  DATE_PICKER_INPUT_TYPE,
  INPUT_RANGE_FORMAT,
  ShiftAction,
  Period,
} from "./constants.ts";

import type { Ref, WritableComputedRef } from "vue";
import type {
  IsDatePeriodOutOfRange,
  ShiftActions,
  SortedLocale,
  UDatePickerRangeProps,
  UDatePickerRangeInputsAttrs,
  UDatePickerRangePeriodMenuAttrs,
  Config,
} from "./types.ts";
import type { RangeDate, Config as UCalendarConfig } from "../ui.form-calendar/types.ts";
import type { ComponentExposed, KeyAttrsWithConfig } from "../types.ts";

defineOptions({ inheritAttrs: false });

type Props = UDatePickerRangeProps<TModelValue>;
const props = withDefaults(defineProps<Props>(), {
  ...getDefaults<Props, Config>(defaultConfig, UDatePickerRange),
  customRangeButton: () => ({ range: { from: null, to: null } }),
  modelValue: undefined,
  minDate: undefined,
  maxDate: undefined,
  placeholder: "",
  label: "",
});

const emit = defineEmits([
  /**
   * Triggers when date picker range value changes.
   * @property {object} range
   */
  "update:modelValue",
]);

type UButtonRef = InstanceType<typeof UButton>;
type UInputRef = InstanceType<typeof UInput>;

const isShownMenu = ref(false);
const wrapperRef = useTemplateRef<HTMLDivElement>("wrapper");
const menuRef = useTemplateRef<HTMLDivElement>("menu");
const buttonRef = useTemplateRef<UButtonRef>("button");
const buttonPrevRef = useTemplateRef<UButtonRef>("button-prev");
const buttonNextRef = useTemplateRef<UButtonRef>("button-next");
const inputRef = useTemplateRef<UInputRef>("input");
const rageInputs = useTemplateRef<ComponentExposed<typeof UDatePickerRangeInputs>>("range-inputs");

const { isTop, isRight, adjustPositionY, adjustPositionX } = useAutoPosition(
  wrapperRef,
  menuRef,
  computed(() => ({ x: props.openDirectionX, y: props.openDirectionY })),
  { x: "left", y: "bottom" },
);

const { locale, userFormatLocale } = useLocale(props);

const isPeriod = computed(() => {
  return {
    week: period.value === Period.Week,
    month: period.value === Period.Month,
    quarter: period.value === Period.Quarter,
    year: period.value === Period.Year,
    ownRange: period.value === Period.OwnRange,
    custom: period.value === Period.Custom,
  };
});

const elementId = props.id || useId();

const calendarValue = ref(props.modelValue);
const activeDate: Ref<string | Date | null> = ref(
  props.modelValue.from !== null
    ? parseDate<SortedLocale>(props.modelValue.from, props.dateFormat, locale.value)
    : new Date(),
);
const period = ref(Period.OwnRange);
const rangeStart = ref("");
const rangeEnd = ref("");
const inputRangeFromError = ref("");
const inputRangeToError = ref("");
const calendarInnerValue: Ref<RangeDate> = ref({ from: "", to: "" });
const periodDateList: Ref<DatePeriodRange[]> = ref([]);

provide<IsDatePeriodOutOfRange>("isDatePeriodOutOfRange", (datePeriod: DatePeriodRange) => {
  return isDatePeriodOutOfRange(datePeriod);
});

const rangeInputsAttrs = computed(() => ({
  rangeInputFirstAttrs,
  rangeInputLastAttrs,
}));

const rangePeriodMenuAttrs = computed(() => ({
  periodRowAttrs,
  periodButtonAttrs,
  periodButtonActiveAttrs,
  periodDateAttrs,
  periodDateCurrentAttrs,
  periodDateSelectedAttrs,
  periodDateCurrentSelectedAttrs,
  periodDateListAttrs,
  rangeSwitchButtonAttrs,
  rangeSwitchTitleAttrs,
  rangeSwitchWrapperAttrs,
  customRangeDescriptionAttrs,
}));

const localValue: WritableComputedRef<RangeDate> = computed({
  get: () => {
    return {
      from: parseDate<SortedLocale>(props.modelValue.from || null, props.dateFormat, locale.value),
      to: parseDate<SortedLocale>(props.modelValue.to || null, props.dateFormat, locale.value),
    };
  },
  set: (value) => {
    if (value.from && value.to && !props.dateFormat) {
      emit("update:modelValue", value);
    }

    const parsedDateFrom = parseDate<SortedLocale>(
      value.from || null,
      props.dateFormat,
      locale.value,
    );
    const parsedDateTo = parseDate<SortedLocale>(value.to || null, props.dateFormat, locale.value);

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
    return { ignore: [inputRef.value?.inputRef] };
  }

  return {
    ignore: [
      buttonRef.value?.buttonRef,
      buttonPrevRef.value?.buttonRef,
      buttonNextRef.value?.buttonRef,
    ],
  };
});

const { userFormatDate } = useUserFormat(
  localValue,
  userFormatLocale,
  props.dateFormat,
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
    activeDate.value = isDate
      ? parseDate(localValue.value.from, props.dateFormat, locale.value)
      : new Date();
  }
});

function isDatePeriodOutOfRange(datePeriod: DatePeriodRange) {
  return (
    dateIsOutOfRange(
      datePeriod.startRange,
      props.minDate,
      props.maxDate,
      locale.value,
      props.dateFormat,
    ) ||
    dateIsOutOfRange(
      datePeriod.endRange,
      props.minDate,
      props.maxDate,
      locale.value,
      props.dateFormat,
    )
  );
}

function activate() {
  isShownMenu.value = true;

  nextTick(() => {
    adjustPositionY();
    adjustPositionX();

    menuRef.value?.focus();
  });
}

function deactivate() {
  isShownMenu.value = false;
}

setDefaultPeriodForButton();

function setDefaultPeriodForButton() {
  const { modelValue, dateFormat } = props;

  const from = parseDate<SortedLocale>(modelValue.from, dateFormat, locale.value) || new Date();
  const to = parseDate<SortedLocale>(modelValue.to, dateFormat, locale.value) || new Date();

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

  if (!modelValue.from && !modelValue.to) {
    period.value = Period.OwnRange;
  } else if (isYearPeriod) {
    period.value = Period.Year;
  } else if (isMonthPeriod) {
    period.value = Period.Month;
  } else if (isQuarterPeriod) {
    period.value = Period.Quarter;
  } else if (isWeekPeriod) {
    period.value = Period.Week;
  } else if (isCustomPeriod) {
    period.value = Period.Custom;
  } else {
    period.value = Period.OwnRange;
  }
}

function onClickShiftDatesList(action: ShiftActions) {
  const defaultRange = action === ShiftAction.Prev ? -1 : 1;
  const yearRange = action === ShiftAction.Prev ? -12 : 12;
  const parsedActiveDate = parseDate(activeDate.value, props.dateFormat, locale.value);

  if (isPeriod.value.week && parsedActiveDate) {
    activeDate.value = addMonths(parsedActiveDate, defaultRange);
    periodDateList.value = getWeekDateList(activeDate.value, locale.value.months.shorthand);
  }

  if (isPeriod.value.month && parsedActiveDate) {
    activeDate.value = addYears(parsedActiveDate, defaultRange);
    periodDateList.value = getMonthsDateList(activeDate.value, locale.value.months.longhand);
  }

  if (isPeriod.value.quarter && parsedActiveDate) {
    activeDate.value = addYears(parsedActiveDate, defaultRange);
    periodDateList.value = getQuartersDateList(activeDate.value, locale.value.quarter);
  }

  if (isPeriod.value.year && parsedActiveDate) {
    activeDate.value = addYears(parsedActiveDate, yearRange);
    periodDateList.value = getYearDateList(activeDate.value);
  }
}

function shiftRangeNext(to: Date, from: Date, daysDifference: number) {
  if (isPeriod.value.ownRange) {
    const nextDate = {
      title: "",
      startRange: addDays(from, daysDifference),
      endRange: addDays(to, daysDifference),
    };

    if (isDatePeriodOutOfRange(nextDate)) return;

    localValue.value = {
      from: nextDate.startRange,
      to: nextDate.endRange,
    };

    return;
  }

  let nextDate = periodDateList.value.find(
    (item) => localValue.value.to && item.endRange > localValue.value.to,
  );

  if (!nextDate) {
    onClickShiftDatesList(ShiftAction.Next);

    nextDate = periodDateList.value.find(
      (item) => localValue.value.to && item.endRange > localValue.value.to,
    );
  }

  if (nextDate && isDatePeriodOutOfRange(nextDate)) return;

  if (nextDate) {
    localValue.value = {
      from: nextDate.startRange,
      to: nextDate.endRange,
    };
  }
}

function shiftRangePrev(to: Date, from: Date, daysDifference: number) {
  if (isPeriod.value.ownRange) {
    const previousDate = {
      title: "",
      startRange: addDays(from, daysDifference * -1),
      endRange: addDays(to, daysDifference * -1),
    };

    if (isDatePeriodOutOfRange(previousDate)) return;

    localValue.value = {
      from: previousDate.startRange,
      to: previousDate.endRange,
    };
  } else {
    const reverseDatesList = [...periodDateList.value].reverse();

    let previousDate = reverseDatesList.find(
      (item) => localValue.value.to && item.endRange < localValue.value.to,
    );

    if (!previousDate) {
      onClickShiftDatesList(ShiftAction.Prev);

      const reverseDatesList = [...periodDateList.value].reverse();

      previousDate = reverseDatesList.find(
        (item) => localValue.value.to && item.endRange < localValue.value.to,
      );
    }

    if (previousDate && isDatePeriodOutOfRange(previousDate)) return;

    if (previousDate) {
      localValue.value = {
        from: previousDate.startRange,
        to: previousDate.endRange,
      };
    }
  }
}

function onClickShiftRange(action: ShiftActions) {
  if (isPeriod.value.custom) {
    period.value = Period.OwnRange;
  }

  const millisecondsPerSecond = 1000;
  const secondsPerMinute = 60;
  const minutesPerHour = 60;
  const hoursPerDay = 24;

  const millisecondsPerDay =
    millisecondsPerSecond * secondsPerMinute * minutesPerHour * hoursPerDay;

  const from = parseDate<SortedLocale>(localValue.value.from, props.dateFormat, locale.value);
  let to = parseDate<SortedLocale>(localValue.value.to, props.dateFormat, locale.value);

  if (!from) return;
  to = to || addDays(from, 1);

  const daysDifference = Math.ceil(Math.abs(getDatesDifference(from, to)) / millisecondsPerDay);

  action === ShiftAction.Next
    ? shiftRangeNext(to, from, daysDifference)
    : shiftRangePrev(to, from, daysDifference);
}

function onMouseoverCalendar() {
  const isInputActiveElement = document.activeElement instanceof HTMLInputElement;
  const activeElement = isInputActiveElement
    ? (document.activeElement as HTMLInputElement)
    : undefined;
  const isRangeInputFocus = activeElement?.name === rangeInputName.value;

  if (
    isRangeInputFocus ||
    !rageInputs.value?.rangeInputStartRef ||
    !rageInputs.value?.rangeInputEndRef
  ) {
    return;
  }

  const hasValues =
    calendarInnerValue.value.from && calendarInnerValue.value.to && !inputRangeToError.value;
  const hasOnlyFromValue =
    calendarInnerValue.value.from && !calendarInnerValue.value.to && !inputRangeFromError.value;

  if ((hasValues || !rangeStart.value) && rageInputs.value?.rangeInputStartRef?.inputRef) {
    (rageInputs.value.rangeInputStartRef.inputRef as HTMLInputElement).focus();

    return;
  }

  if (hasOnlyFromValue && rageInputs.value?.rangeInputEndRef?.inputRef) {
    (rageInputs.value.rangeInputEndRef.inputRef as HTMLInputElement).focus();

    return;
  }
}

function onInputCalendar(value: RangeDate) {
  calendarInnerValue.value = value;
}

/**
 * Get element / nested component attributes for each config token ✨
 * Applies: `class`, `config`, redefined default `props` and dev `vl-...` attributes.
 */
const mutatedProps = computed(() => ({
  openDirectionY: isTop.value ? Direction.Top : Direction.Bottom,
  openDirectionX: isRight.value ? Direction.Right : Direction.Left,
  error: Boolean(props.error),
  description: Boolean(props.description),
  /* component state, not a props */
  opened: isShownMenu.value,
  week: isPeriod.value.week,
  month: isPeriod.value.month,
  quarter: isPeriod.value.quarter,
  year: isPeriod.value.year,
}));

const {
  config,
  wrapperAttrs,
  rightIconAttrs,
  datepickerCalendarAttrs,
  datepickerInputAttrs,
  menuAttrs,
  buttonWrapperAttrs,
  buttonAttrs,
  shiftRangeButtonAttrs,
  rangeInputWrapperAttrs,
  rangeInputErrorAttrs,
  datepickerInputActiveAttrs,
  rangeInputFirstAttrs,
  rangeInputLastAttrs,
  periodRowAttrs,
  periodButtonAttrs,
  periodButtonActiveAttrs,
  periodDateAttrs,
  periodDateCurrentAttrs,
  periodDateSelectedAttrs,
  periodDateCurrentSelectedAttrs,
  periodDateListAttrs,
  rangeSwitchButtonAttrs,
  rangeSwitchTitleAttrs,
  rangeSwitchWrapperAttrs,
  customRangeDescriptionAttrs,
} = useUI<Config>(defaultConfig, mutatedProps);

/* Merging DatePickerRange's i18n translations into Calendar's i18n translations. */
watchEffect(() => {
  const calendarConfig = datepickerCalendarAttrs.value.config as unknown as UCalendarConfig;

  if (!calendarConfig.i18n || props.config?.i18n) {
    calendarConfig.i18n = merge({}, calendarConfig.i18n, config.value.i18n);
  }
});
</script>

<template>
  <div v-bind="wrapperAttrs" ref="wrapper">
    <UInput
      v-if="isVariant.input"
      :id="elementId"
      ref="input"
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
      :right-icon="rightIcon || config.defaults.calendarIcon"
      v-bind="isShownMenu ? datepickerInputActiveAttrs : datepickerInputAttrs"
      @focus="activate"
      @keydown.esc="deactivate"
    >
      <template #left>
        <!-- @slot Use it to add something before the date. -->
        <slot name="left" />
      </template>

      <template #left-icon>
        <!-- @slot Use it to add icon before the date. -->
        <slot name="left-icon" />
      </template>

      <template #right-icon="{ iconName, iconSize }">
        <!--
          @slot Use it add an icon after the date.
          @binding {string} icon-name
          @binding {string} icon-size
        -->
        <slot name="right-icon" :icon-name="iconName" :icon-size="size">
          <UIcon :name="iconName" :size="iconSize" color="gray" v-bind="rightIconAttrs" />
        </slot>
      </template>

      <template #right>
        <!-- @slot Use it to add something after the date. -->
        <slot name="right" />
      </template>
    </UInput>

    <div v-if="isVariant.button" v-bind="buttonWrapperAttrs">
      <UButton
        ref="button-prev"
        square
        filled
        no-ring
        :size="size"
        :disabled="disabled"
        variant="thirdary"
        :left-icon="config.defaults.prevIcon"
        v-bind="shiftRangeButtonAttrs"
        @click="onClickShiftRange(ShiftAction.Prev)"
      />

      <UButton
        :id="elementId"
        ref="button"
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
        ref="button-next"
        square
        filled
        no-ring
        :size="size"
        :disabled="disabled"
        variant="thirdary"
        :left-icon="config.defaults.nextIcon"
        v-bind="shiftRangeButtonAttrs"
        @click="onClickShiftRange(ShiftAction.Next)"
      />
    </div>

    <Transition v-bind="config.menuTransition">
      <div
        v-if="isShownMenu"
        ref="menu"
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
          :date-format="dateFormat"
          :min-date="minDate"
          :max-date="maxDate"
          :attrs="rangePeriodMenuAttrs as unknown as UDatePickerRangePeriodMenuAttrs"
          @toggle-menu="isShownMenu = !isShownMenu"
          @close-menu="isShownMenu = false"
          @click-prev="onClickShiftDatesList(ShiftAction.Prev)"
          @click-next="onClickShiftDatesList(ShiftAction.Next)"
        />

        <UDatePickerRangeInputs
          v-if="isPeriod.ownRange"
          v-bind="rangeInputWrapperAttrs"
          ref="range-inputs"
          v-model:local-value="localValue"
          v-model:input-range-from-error="inputRangeFromError"
          v-model:input-range-to-error="inputRangeToError"
          v-model:range-start="rangeStart"
          v-model:range-end="rangeEnd"
          :range-input-name="rangeInputName"
          :locale="locale"
          :max-date="maxDate"
          :min-date="minDate"
          :date-format="dateFormat"
          :config="config"
          :attrs="rangeInputsAttrs as unknown as UDatePickerRangeInputsAttrs"
        />

        <div v-if="inputRangeToError || inputRangeFromError" v-bind="rangeInputErrorAttrs">
          {{ inputRangeToError || inputRangeFromError }}
        </div>

        <UCalendar
          v-if="isPeriod.ownRange"
          v-model="calendarValue"
          :min-date="minDate"
          :max-date="maxDate"
          :date-format="dateFormat"
          v-bind="datepickerCalendarAttrs as KeyAttrsWithConfig<UCalendarConfig>"
          range
          @mouseenter="onMouseoverCalendar"
          @input="onInputCalendar"
        />
      </div>
    </Transition>
  </div>
</template>
