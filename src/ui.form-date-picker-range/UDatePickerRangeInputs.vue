<template>
  <div>
    <UInput
      ref="rangeInputStartRef"
      v-model="rangeStart"
      :error="inputRangeFromError"
      size="md"
      v-bind="rangeInputFirstAttrs"
      :name="rangeInputName"
      @input="onInputRangeInput($event, INPUT_RANGE_TYPE.start)"
    />

    <UInput
      ref="rangeInputEndRef"
      v-model="rangeEnd"
      :error="inputRangeToError"
      size="md"
      v-bind="rangeInputLastAttrs"
      :name="rangeInputName"
      @input="onInputRangeInput($event, INPUT_RANGE_TYPE.end)"
    />
  </div>
</template>

<script setup>
import { isWrongDateFormat, isWrongMonthNumber, isWrongDayNumber } from "./utilValidation.js";

import { dateIsOutOfRange, parseDate } from "../ui.form-calendar/utilCalendar.js";

import UInput from "../ui.form-input/UInput.vue";

import { INPUT_RANGE_TYPE, INPUT_RANGE_FORMAT } from "./constants.js";

const props = defineProps({
  locale: {
    type: Object,
    required: true,
  },

  dateFormat: {
    type: [String, undefined],
    default: undefined,
  },

  rangeInputName: {
    type: String,
    required: true,
  },

  config: {
    type: Object,
    required: true,
  },

  attrs: {
    type: Object,
    required: true,
  },
});

const { rangeInputFirstAttrs, rangeInputLastAttrs } = props.attrs;

const localValue = defineModel("localValue", { required: true, type: Object });
const inputRangeFromError = defineModel("inputRangeFromError", { required: true, type: String });
const inputRangeToError = defineModel("inputRangeToError", { required: true, type: String });
const rangeStart = defineModel("rangeStart", { type: String, required: true });
const rangeEnd = defineModel("rangeEnd", { type: String, required: true });

function isGraterThanTo(value) {
  if (!value) return false;

  const parsedValue = parseDate(value, INPUT_RANGE_FORMAT, props.locale);
  const parsedTo = parseDate(localValue.value.to, props.dateFormat, props.locale);

  return parsedValue > parsedTo;
}

function isSmallerThanFrom(value) {
  if (!value) return false;

  const parsedValue = parseDate(value, INPUT_RANGE_FORMAT, props.locale);
  const parsedFrom = parseDate(localValue.value.from, props.dateFormat, props.locale);

  return parsedValue < parsedFrom;
}

function onInputRangeInput(value, type) {
  const isInvalidDateFormat = isWrongDateFormat(value);

  let error = "";

  if (isInvalidDateFormat && value) {
    error = props.locale.dateFormatWithDot;
  } else if (isWrongMonthNumber(value) && value) {
    error = props.locale.notCorrectMonthNumber;
  } else if (isWrongDayNumber(value) && value) {
    error = props.locale.notCorrectDayNumber;
  } else if (isGraterThanTo(value) && type === INPUT_RANGE_TYPE.start) {
    error = props.locale.fromDateGraterThanSecond;
  } else if (isSmallerThanFrom(value) && type === INPUT_RANGE_TYPE.end) {
    error = props.locale.toDateSmallerThanFirst;
  }

  if (type === INPUT_RANGE_TYPE.start) {
    inputRangeFromError.value = error;
  }

  if (type === INPUT_RANGE_TYPE.end) {
    inputRangeToError.value = error;
  }

  if (!isInvalidDateFormat) {
    const parsedValue = parseDate(value || new Date(), INPUT_RANGE_FORMAT, props.locale);

    const isOutOfRange = dateIsOutOfRange(
      parsedValue,
      props.minDate,
      props.maxDate,
      props.locale,
      props.dateFormat,
    );

    if (type === INPUT_RANGE_TYPE.start && !error && !isOutOfRange) {
      localValue.value = {
        from: value ? parsedValue : "",
        to: localValue.value.to,
      };
    }

    if (type === INPUT_RANGE_TYPE.end && !error && !isOutOfRange) {
      localValue.value = {
        from: localValue.value.from,
        to: value ? parsedValue : "",
      };
    }
  }
}
</script>
