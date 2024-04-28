<template>
  <div class="relative">
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
        <slot name="left" />
      </template>

      <template #right-icon>
        <slot name="right-icon" />
      </template>

      <template #right>
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
        @userDateChange="onUserFormatDateChange"
        @formattedDateChange="onFormattedDateChange"
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

import {
  addDays,
  isSameDay,
  getDateFromUnixTimestamp,
} from "../ui.form-calendar/services/date.service";

import useAttrs from "./composables/attrs.composable";
import { useLocale } from "../composable.locale";

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
   * Datepicker value (timestamp).
   */
  modelValue: {
    type: Number,
    default: null,
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

const emit = defineEmits(["update:modelValue", "input"]);

const STANDARD_USER_FORMAT = "l, j F, Y";

const { tm } = useLocale();

const isShownCalendar = ref(false);
const userFormatDate = ref("");
const formattedDate = ref("");
const customView = ref(VIEW.day);

const calendarRef = ref(null);

defineExpose({
  calendarRef,
  userFormatDate,
  formattedDate,
});

const localValue = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const { config, inputAttrs, calendarAttrs } = useAttrs(props, { isShownCalendar });

function activate() {
  isShownCalendar.value = true;

  nextTick(() => calendarRef.value?.wrapperRef?.focus());
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
  if (props.dateFormat !== STANDARD_USER_FORMAT) return data;

  const currentLocale = merge(tm("UDatePicker"), props.config.i18n);

  let prefix = "";
  const formattedDate = data.charAt(0).toUpperCase() + data.toLowerCase().slice(1);
  const formattedDateWithoutDay = formattedDate.split(",").slice(1).join("").trim();

  const selectedDate = getDateFromUnixTimestamp(localValue.value);
  const today = new Date();

  const isToday = isSameDay(today, selectedDate);
  const isYesterday = isSameDay(addDays(today, -1), selectedDate);
  const isTomorrow = isSameDay(addDays(today, 1), selectedDate);

  if (isToday) {
    prefix = currentLocale.today;
  }

  if (isYesterday) {
    prefix = currentLocale.yesterday;
  }

  if (isTomorrow) {
    prefix = currentLocale.tomorrow;
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
