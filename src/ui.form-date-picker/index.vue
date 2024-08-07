<template>
  <div v-bind="wrapperAttrs" ref="wrapperRef">
    <UInput
      :id="id"
      :key="isShownCalendar"
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
        <!-- @slot Use it add something before the date. -->
        <slot name="left" />
      </template>

      <template #right-icon>
        <!-- @slot Use it add an icon after the date. -->
        <slot name="right-icon" />
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
        :user-format="userFormat"
        :max-date="maxDate"
        :min-date="minDate"
        v-bind="calendarAttrs"
        @keydown.esc="deactivate"
        @user-date-change="onUserFormatDateChange"
        @formatted-date-change="onFormattedDateChange"
        @input="onInput"
        @blur="onBlur"
        @submit="onSubmit"
      />
    </Transition>
  </div>
</template>

<script setup>
import { computed, nextTick, ref } from "vue";
import { merge } from "lodash-es";

import UInput from "../ui.form-input";
import UCalendar from "../ui.form-calendar";
import { VIEW } from "../ui.form-calendar/constants";

import UIService, { getRandomId } from "../service.ui";

import { addDays, isSameDay } from "../ui.form-calendar/services/date.service";

import useAttrs from "./composables/attrs.composable";
import { useLocale } from "../composable.locale";
import { useAdjustElementPosition } from "../composable.adjustElementPosition";

import defaultConfig from "./configs/default.config";
import { UDatePicker } from "./constants";

/* Should be a string for correct web-types gen */
defineOptions({ name: "UDatePicker", inheritAttrs: false });

const props = defineProps({
  /**
   * Datepicker label.
   */
  label: {
    type: String,
    default: "",
  },

  /**
   * Datepicker placeholder.
   */
  placeholder: {
    type: String,
    default: "",
  },

  /**
   * Datepicker value in JS Date Object or String formatted in provided props.dateFormat.
   */
  modelValue: {
    type: [Object, String],
    default: null,
  },

  /**
   * Datepicker open direction on x-axis.
   * @values auto, left, right
   */
  openDirectionX: {
    type: String,
    default: UIService.get(defaultConfig, UDatePicker).default.openDirectionX,
  },

  /**
   * Datepicker open direction on y-axis.
   * @values auto, top, bottom
   */
  openDirectionY: {
    type: String,
    default: UIService.get(defaultConfig, UDatePicker).default.openDirectionY,
  },

  /**
   * Min date in format date string or Date.
   */
  minDate: {
    type: [String, Date],
    default: UIService.get(defaultConfig, UDatePicker).default.minDate,
  },

  /**
   * Max date in format date string or Date.
   */
  maxDate: {
    type: [String, Date],
    default: UIService.get(defaultConfig, UDatePicker).default.maxDate,
  },

  /**
   * Disable component.
   */
  disabled: {
    type: Boolean,
    default: UIService.get(defaultConfig, UDatePicker).default.disabled,
  },

  /**
   * Enable timepicker.
   */
  timepicker: {
    type: Boolean,
    default: UIService.get(defaultConfig, UDatePicker).default.timepicker,
  },

  /**
   * Error message.
   */
  error: {
    type: String,
    default: "",
  },

  /**
   * Datepicker description.
   */
  description: {
    type: String,
    default: "",
  },

  /**
   * Datepicker size.
   * @values sm, md, lg
   */
  size: {
    type: String,
    default: UIService.get(defaultConfig, UDatePicker).default.size,
  },

  /**
   * Date format.
   */
  dateFormat: {
    type: String,
    default: UIService.get(defaultConfig, UDatePicker).default.dateFormat,
  },

  /**
   * User friendly date format.
   */
  userFormat: {
    type: String,
    default: UIService.get(defaultConfig, UDatePicker).default.userFormat,
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

const STANDARD_USER_FORMAT = "l, j F, Y";

const { tm } = useLocale();

const i18nGlobal = tm(UDatePicker);

const isShownCalendar = ref(false);
const userFormatDate = ref("");
const formattedDate = ref("");
const customView = ref(VIEW.day);

const wrapperRef = ref(null);
const calendarRef = ref(null);

const calendarWrapperRef = computed(() => calendarRef?.value?.wrapperRef);

const { isTop, isRight, adjustPositionY, adjustPositionX } = useAdjustElementPosition(
  wrapperRef,
  calendarWrapperRef,
  { x: props.openDirectionX, y: props.openDirectionY },
  { x: "left", y: "bottom" },
);

defineExpose({
  calendarRef,
  userFormatDate,
  formattedDate,
});

const localValue = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const currentLocale = computed(() => merge(defaultConfig.i18n, i18nGlobal, props.config.i18n));

const { config, inputAttrs, calendarAttrs, wrapperAttrs } = useAttrs(props, {
  isShownCalendar,
  isTop,
  isRight,
});

function activate() {
  isShownCalendar.value = true;

  nextTick(() => {
    adjustPositionY();
    adjustPositionX();

    calendarRef.value.wrapperRef.focus();
  });
}

function deactivate() {
  isShownCalendar.value = false;

  customView.value = VIEW.day;
}

function onUserFormatDateChange(value) {
  userFormatDate.value = formatUserDate(value) || "";
}

function onFormattedDateChange(value) {
  formattedDate.value = value || "";
}

function onSubmit() {
  deactivate();
}

function onBlur(event) {
  const { relatedTarget } = event;

  if (!calendarRef?.value?.wrapperRef?.contains(relatedTarget)) deactivate();
}

function formatUserDate(data) {
  if (props.userFormat !== STANDARD_USER_FORMAT) return data;

  let prefix = "";
  const formattedDate = data.charAt(0).toUpperCase() + data.toLowerCase().slice(1);
  const formattedDateWithoutDay = formattedDate.split(",").slice(1).join("").trim();

  const today = new Date();

  const isToday = isSameDay(today, localValue.value);
  const isYesterday = isSameDay(addDays(today, -1), localValue.value);
  const isTomorrow = isSameDay(addDays(today, 1), localValue.value);

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
    emit("input", {
      userFormatDate: formatUserDate(userFormatDate.value),
      value: localValue.value,
      formattedDate: formattedDate.value,
    });
  });
}
</script>
