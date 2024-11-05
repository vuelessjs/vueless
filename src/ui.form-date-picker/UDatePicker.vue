<template>
  <div v-bind="wrapperAttrs" ref="wrapper">
    <UInput
      :id="elementId"
      :key="String(isShownCalendar)"
      v-model="userFormatDate"
      :label-align="labelAlign"
      :label="label"
      :placeholder="placeholder"
      :error="error"
      :description="description"
      readonly
      :disabled="disabled"
      :size="size"
      :left-icon="leftIcon"
      :right-icon="rightIcon"
      v-bind="isShownCalendar ? activeInputAttrs : inputAttrs"
      @focus="activate"
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
        ref="calendarRef"
        v-model="localValue"
        v-model:view="customView"
        tabindex="-1"
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
        @blur="onBlur"
        @submit="onSubmit"
      />
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, ref, useId, useTemplateRef } from "vue";
import { merge } from "lodash-es";

import UIcon from "../ui.image-icon/UIcon.vue";
import UInput from "../ui.form-input/UInput.vue";
import UCalendar from "../ui.form-calendar/UCalendar.vue";
import { View, STANDARD_USER_FORMAT } from "../ui.form-calendar/constants.js";

import { getDefault } from "../utils/ui.ts";

import { addDays, isSameDay } from "../ui.form-calendar/utilDate.js";
import { parseDate } from "../ui.form-calendar/utilCalendar.ts";

import useAttrs from "./useAttrs.js";
import { useLocale } from "../composables/useLocale.ts";
import { useAutoPosition } from "../composables/useAutoPosition.ts";

import defaultConfig from "./config.js";
import { UDatePicker } from "./constants.js";

import type { UDatePickerProps } from "./types.ts";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<UDatePickerProps>(), {
  label: getDefault<UDatePickerProps>(defaultConfig, UDatePicker).label,
  labelAlign: getDefault<UDatePickerProps>(defaultConfig, UDatePicker).labelAlign,
  placeholder: getDefault<UDatePickerProps>(defaultConfig, UDatePicker).placeholder,
  description: getDefault<UDatePickerProps>(defaultConfig, UDatePicker).description,
  error: getDefault<UDatePickerProps>(defaultConfig, UDatePicker).error,
  size: getDefault<UDatePickerProps>(defaultConfig, UDatePicker).size,
  openDirectionX: getDefault<UDatePickerProps>(defaultConfig, UDatePicker).openDirectionX,
  openDirectionY: getDefault<UDatePickerProps>(defaultConfig, UDatePicker).openDirectionY,
  timepicker: getDefault<UDatePickerProps>(defaultConfig, UDatePicker).timepicker,
  dateFormat: getDefault<UDatePickerProps>(defaultConfig, UDatePicker).dateFormat,
  dateTimeFormat: getDefault<UDatePickerProps>(defaultConfig, UDatePicker).dateTimeFormat,
  userDateFormat: getDefault<UDatePickerProps>(defaultConfig, UDatePicker).userDateFormat,
  userDateTimeFormat: getDefault<UDatePickerProps>(defaultConfig, UDatePicker).userDateTimeFormat,
  leftIcon: getDefault<UDatePickerProps>(defaultConfig, UDatePicker).leftIcon,
  rightIcon: getDefault<UDatePickerProps>(defaultConfig, UDatePicker).rightIcon,
  disabled: getDefault<UDatePickerProps>(defaultConfig, UDatePicker).disabled,
  id: getDefault<UDatePickerProps>(defaultConfig, UDatePicker).id,
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

const wrapperRef = useTemplateRef<HTMLDivElement>("wrapper");
const calendarRef = useTemplateRef<InstanceType<typeof UCalendar>>("calendar");

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

const elementId = props.id || useId();

const { config, inputAttrs, activeInputAttrs, calendarAttrs, wrapperAttrs } = useAttrs(props, {
  isTop,
  isRight,
});

function activate() {
  isShownCalendar.value = true;

  nextTick(() => {
    adjustPositionY();
    adjustPositionX();

    calendarRef.value?.wrapperRef?.focus();
  });
}

function deactivate() {
  isShownCalendar.value = false;

  customView.value = View.Day;
}

function onUserFormatDateChange(value: string) {
  userFormatDate.value = formatUserDate(value) || "";
}

function onSubmit() {
  deactivate();
}

function onBlur(event: FocusEvent) {
  const { relatedTarget } = event;

  if (!calendarRef?.value?.wrapperRef?.contains(relatedTarget as HTMLElement)) deactivate();
}

function formatUserDate(data: string) {
  if (props.userDateFormat !== STANDARD_USER_FORMAT || props.timepicker) return data;

  let prefix = "";
  const formattedDate = data.charAt(0).toUpperCase() + data.toLowerCase().slice(1);
  const formattedDateWithoutDay = formattedDate.split(",").slice(1).join("").trim();

  const today = new Date();

  const parsedLocalDate = parseDate(localValue.value, props.dateFormat, currentLocale.value);
  const isToday = parsedLocalDate && isSameDay(today, parsedLocalDate);
  const isYesterday = parsedLocalDate && isSameDay(addDays(today, -1), parsedLocalDate);
  const isTomorrow = parsedLocalDate && isSameDay(addDays(today, 1), parsedLocalDate);

  if (isToday) {
    prefix = currentLocale.value.today;
  }

  if (isYesterday) {
    prefix = currentLocale.value.yesterday;
  }

  if (isTomorrow) {
    prefix = currentLocale.value.tomorrow;
  }

  return prefix ? `${prefix}, ${formattedDateWithoutDay}` : formattedDate;
}

function onInput() {
  nextTick(() => {
    calendarRef.value?.wrapperRef?.blur();
    emit("input", localValue.value);
  });
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
