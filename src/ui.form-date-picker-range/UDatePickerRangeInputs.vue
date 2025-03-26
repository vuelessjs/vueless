<script setup lang="ts" generic="TLocalValue extends RangeDate">
import { isWrongDateFormat, isWrongMonthNumber, isWrongDayNumber } from "./utilValidation.ts";
import { useTemplateRef } from "vue";

import { dateIsOutOfRange, parseDate } from "../ui.form-calendar/utilCalendar.ts";

import UInput from "../ui.form-input/UInput.vue";

import { InputRangeType, INPUT_RANGE_FORMAT } from "./constants.ts";

import type { UDatePickerRangeInputsProps } from "./types.ts";
import type { RangeDate } from "../ui.form-calendar/types.ts";

type UInputRef = InstanceType<typeof UInput>;

defineOptions({ internal: true });

const props = defineProps<UDatePickerRangeInputsProps>();

const rangeInputStartRef = useTemplateRef<UInputRef>("range-input-start");
const rangeInputEndRef = useTemplateRef<UInputRef>("range-input-end");

const localValue = defineModel<TLocalValue>("localValue", { required: true });
const inputRangeFromError = defineModel<string>("inputRangeFromError", { required: true });
const inputRangeToError = defineModel<string>("inputRangeToError", { required: true });
const rangeStart = defineModel<string>("rangeStart", { required: true });
const rangeEnd = defineModel<string>("rangeEnd", { required: true });

function isGraterThanTo(value: string) {
  if (!value) return false;

  const parsedValue = parseDate(value, INPUT_RANGE_FORMAT, props.locale);
  const parsedTo = parseDate(localValue.value.to, props.dateFormat, props.locale);

  return parsedValue && parsedTo && parsedValue > parsedTo;
}

function isSmallerThanFrom(value: string) {
  if (!value) return false;

  const parsedValue = parseDate(value, INPUT_RANGE_FORMAT, props.locale);
  const parsedFrom = parseDate(localValue.value.from, props.dateFormat, props.locale);

  return parsedValue && parsedFrom && parsedValue < parsedFrom;
}

function onInputRangeInput(value: string, type: `${InputRangeType}`) {
  const isInvalidDateFormat = isWrongDateFormat(value);

  let error = "";

  if (isInvalidDateFormat && value) {
    error = props.locale.dateFormatWithDot;
  } else if (isWrongMonthNumber(value) && value) {
    error = props.locale.notCorrectMonthNumber;
  } else if (isWrongDayNumber(value) && value) {
    error = props.locale.notCorrectDayNumber;
  } else if (isGraterThanTo(value) && type === InputRangeType.Start) {
    error = props.locale.fromDateGraterThanSecond;
  } else if (isSmallerThanFrom(value) && type === InputRangeType.End) {
    error = props.locale.toDateSmallerThanFirst;
  }

  if (type === InputRangeType.Start) {
    inputRangeFromError.value = error;
  }

  if (type === InputRangeType.End) {
    inputRangeToError.value = error;
  }

  if (!isInvalidDateFormat) {
    const parsedValue = parseDate(value || new Date(), INPUT_RANGE_FORMAT, props.locale);
    const parsedDateFrom = parseDate(localValue.value.from, props.dateFormat, props.locale);
    const parsedDateTo = parseDate(localValue.value.to, props.dateFormat, props.locale);

    if (!parsedValue) return;

    const isOutOfRange = dateIsOutOfRange(
      parsedValue,
      props.minDate,
      props.maxDate,
      props.locale,
      props.dateFormat,
    );

    if (type === InputRangeType.Start && !error && !isOutOfRange) {
      localValue.value = {
        from: value ? parsedValue : "",
        to: parsedDateTo,
      } as TLocalValue;
    }

    if (type === InputRangeType.End && !error && !isOutOfRange) {
      localValue.value = {
        from: parsedDateFrom,
        to: value ? parsedValue : null,
      } as TLocalValue;
    }
  }
}

defineExpose({
  rangeInputEndRef,
  rangeInputStartRef,
});
</script>

<template>
  <div>
    <UInput
      ref="range-input-start"
      v-model="rangeStart"
      :error="inputRangeFromError"
      size="md"
      v-bind="attrs.rangeInputFirstAttrs.value"
      :name="rangeInputName"
      no-autocomplete
      @input="onInputRangeInput($event, InputRangeType.Start)"
    />

    <UInput
      ref="range-input-end"
      v-model="rangeEnd"
      :error="inputRangeToError"
      size="md"
      v-bind="attrs.rangeInputLastAttrs.value"
      :name="rangeInputName"
      no-autocomplete
      @input="onInputRangeInput($event, InputRangeType.End)"
    />
  </div>
</template>
