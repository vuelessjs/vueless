<script setup lang="ts" generic="TModelValue extends string | Date">
import { computed, nextTick, ref, useId, useTemplateRef } from "vue";
import { merge } from "lodash-es";

import UIcon from "../ui.image-icon/UIcon.vue";
import UInput from "../ui.form-input/UInput.vue";
import UCalendar from "../ui.form-calendar/UCalendar.vue";
import { View, LocaleType, ARROW_KEYS, TOKEN_REG_EXP } from "../ui.form-calendar/constants.ts";

import { getDefault } from "../utils/ui.ts";

import { getSortedLocale } from "../ui.form-calendar/utilDate.ts";
import { formatDate, parseDate } from "../ui.form-calendar/utilCalendar.ts";

import useAttrs from "./useAttrs.js";
import { useLocale } from "../composables/useLocale.ts";
import { useAutoPosition } from "../composables/useAutoPosition.ts";

import defaultConfig from "./config.ts";
import { UDatePicker } from "./constants.ts";

import { vClickOutside } from "../directives";

import type { UDatePickerProps } from "./types.ts";
import type { ComponentExposed } from "../types.ts";
import type { DateLocale } from "../ui.form-calendar/utilFormatting.ts";

defineOptions({ inheritAttrs: false });

type Props = UDatePickerProps<TModelValue>;
const props = withDefaults(defineProps<Props>(), {
  labelAlign: getDefault<Props>(defaultConfig, UDatePicker).labelAlign,
  size: getDefault<Props>(defaultConfig, UDatePicker).size,
  openDirectionX: getDefault<Props>(defaultConfig, UDatePicker).openDirectionX,
  openDirectionY: getDefault<Props>(defaultConfig, UDatePicker).openDirectionY,
  timepicker: getDefault<Props>(defaultConfig, UDatePicker).timepicker,
  dateFormat: getDefault<Props>(defaultConfig, UDatePicker).dateFormat,
  dateTimeFormat: getDefault<Props>(defaultConfig, UDatePicker).dateTimeFormat,
  userDateFormat: getDefault<Props>(defaultConfig, UDatePicker).userDateFormat,
  userDateTimeFormat: getDefault<Props>(defaultConfig, UDatePicker).userDateTimeFormat,
  rightIcon: getDefault<Props>(defaultConfig, UDatePicker).rightIcon,
  disabled: getDefault<Props>(defaultConfig, UDatePicker).disabled,
  dataTest: "",
  config: () => ({}),
});

const emit = defineEmits([
  /**
   * Triggers when date picker value changes.
   * @property {string} value
   */
  "update:modelValue",

  /**
   * Triggers when date picker value changes.
   * @property {object} value
   */
  "input",
]);

const { tm } = useLocale();

const i18nGlobal = tm(UDatePicker);

const isShownCalendar = ref(false);
const userFormatDate = ref("");
const formattedDate = ref("");
const customView = ref(View.Day);

const datepickerInputRef = useTemplateRef<typeof UInput>("input");
const wrapperRef = useTemplateRef<HTMLDivElement>("wrapper");
const calendarRef = useTemplateRef<ComponentExposed<typeof UCalendar>>("calendar");

const calendarWrapperRef = computed(() => calendarRef?.value?.wrapperRef || null);

const { isTop, isRight, adjustPositionY, adjustPositionX } = useAutoPosition(
  wrapperRef,
  calendarWrapperRef,
  computed(() => ({ x: props.openDirectionX, y: props.openDirectionY })),
  { x: "left", y: "bottom" },
);

const localValue = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const currentLocale = computed(() => merge(defaultConfig.i18n, i18nGlobal, props.config.i18n));

const clickOutsideOptions = computed(() => ({ ignore: [datepickerInputRef.value?.inputRef] }));

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

const elementId = props.id || useId();

const { config, datepickerInputAttrs, datepickerInputActiveAttrs, calendarAttrs, wrapperAttrs } =
  useAttrs(props, {
    isTop,
    isRight,
  });

function activate() {
  isShownCalendar.value = true;

  nextTick(() => {
    adjustPositionY();
    adjustPositionX();
  });
}

function deactivate() {
  isShownCalendar.value = false;

  customView.value = View.Day;
}

function onUserFormatDateChange(value: string) {
  userFormatDate.value = value.trim();
}

function onSubmit() {
  deactivate();
}

function onInput() {
  nextTick(() => {
    deactivate();
    emit("input", localValue.value);
  });
}

function onTextInput() {
  if (datepickerInputRef.value?.inputRef) {
    datepickerInputRef.value.inputRef.value = userFormatDate.value;
  }
}

function onPaste(event: ClipboardEvent) {
  try {
    const pasteContent = event.clipboardData ? event.clipboardData.getData("text/plain") : "";
    const userFormat = props.timepicker ? props.userDateTimeFormat : props.userDateFormat;
    const relativeTokensAmount = Number(userFormat.match(/(?<!\\)r/g)?.length);

    // Amount of tokens used in format string without decimeters.
    const dateFormatTokensAmount = props.userDateFormat
      .split("")
      .filter((char) => Object.keys(TOKEN_REG_EXP).includes(char)).length;

    const timeFormatTokensAmount = props.userDateTimeFormat
      .split("")
      .filter((char) => Object.keys(TOKEN_REG_EXP).includes(char)).length;

    // Amount of substring that satisfies format tokens.
    let pastedTokensAmount = pasteContent
      .replace(/[^a-zA-Z0-9]/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .split(" ").length;

    const isPastedRelativeDay = [
      locale.value.tomorrow,
      locale.value.today,
      locale.value.tomorrow,
    ].some((word) => {
      return pasteContent.includes(word);
    });

    if (isPastedRelativeDay) {
      pastedTokensAmount -= relativeTokensAmount;
    }

    if (
      pastedTokensAmount !== dateFormatTokensAmount &&
      pastedTokensAmount !== timeFormatTokensAmount
    ) {
      return;
    }

    const parsedDate = parseDate(pasteContent, userFormat, locale.value);

    if (parsedDate) {
      localValue.value = (
        props.dateFormat ? formatDate(parsedDate, userFormat, locale.value) : parsedDate
      ) as TModelValue;
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
}

function onCopy(event: ClipboardEvent) {
  const target = event.target as HTMLInputElement;

  const cursorStart = target.selectionStart || 0;
  const cursorEnd = target.selectionEnd || 0;

  try {
    if (cursorStart !== cursorEnd) {
      navigator.clipboard.writeText(target.value.substring(cursorStart, cursorEnd));
    } else {
      navigator.clipboard.writeText(target.value);
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
}

function onTextInputKeyDown(event: KeyboardEvent) {
  if (ARROW_KEYS.includes(event.code)) {
    calendarRef.value?.wrapperRef?.focus();
  }
}

defineExpose({
  /**
   * Reference to the UCalendar component instance.
   * @property {HTMLElement}
   */
  calendarRef,

  /**
   * The user-friendly formatted date string displayed in the input.
   * @property {String}
   */
  userFormatDate,

  /**
   * The internal formatted date string.
   * @property {String}
   */
  formattedDate,
});
</script>

<template>
  <div v-bind="wrapperAttrs" ref="wrapper">
    <UInput
      :id="elementId"
      :key="String(userDateFormat)"
      ref="input"
      :model-value="userFormatDate"
      :label-align="labelAlign"
      :label="label"
      :placeholder="placeholder"
      :error="error"
      :description="description"
      :disabled="disabled"
      :size="size"
      :left-icon="leftIcon"
      :right-icon="rightIcon"
      v-bind="isShownCalendar ? datepickerInputActiveAttrs : datepickerInputAttrs"
      @input="onTextInput"
      @focus="activate"
      @copy="onCopy"
      @paste="onPaste"
      @keydown.esc="deactivate"
      @keydown="onTextInputKeyDown"
    >
      <template #left>
        <!-- @slot Use it add something before the date. -->
        <slot name="left" />
      </template>

      <template #left-icon="{ iconName, iconSize }">
        <!--
          @slot Use it add an icon before the date.
          @binding {string} icon-name
          @binding {string} icon-nize
        -->
        <slot name="left-icon" :icon-name="iconName" :icon-size="iconSize" />
      </template>

      <template #right-icon="{ iconName, iconSize }">
        <!--
          @slot Use it add an icon after the date.
          @binding {string} icon-name
          @binding {string} icon-size
        -->
        <slot name="right-icon" :icon-name="iconName" :icon-size="iconSize">
          <UIcon :name="iconName" :size="iconSize" color="gray" />
        </slot>
      </template>

      <template #right>
        <!-- @slot Use it add something after the date. -->
        <slot name="right" />
      </template>
    </UInput>

    <Transition v-bind="config.calendarTransition">
      <UCalendar
        v-show="isShownCalendar"
        ref="calendar"
        v-model="localValue"
        v-model:view="customView"
        v-click-outside="[deactivate, clickOutsideOptions]"
        :tabindex="-1"
        :timepicker="timepicker"
        :date-format="dateFormat"
        :date-time-format="dateTimeFormat"
        :user-date-format="userDateFormat"
        :user-date-time-format="userDateTimeFormat"
        :max-date="maxDate"
        :min-date="minDate"
        v-bind="calendarAttrs"
        @keydown.esc="deactivate"
        @user-date-change="onUserFormatDateChange"
        @input="onInput"
        @submit="onSubmit"
      />
    </Transition>
  </div>
</template>
