<script setup lang="ts">
import { computed, ref, nextTick, useId } from "vue";

import useUI from "../composables/useUI.ts";
import { getDefaults } from "../utils/ui.ts";

import ULabel from "../ui.form-label/ULabel.vue";
import UInput from "../ui.form-input/UInput.vue";

import defaultConfig from "./config.ts";
import { COMPONENT_NAME } from "./constants.ts";

import type { Props, Config } from "./types.ts";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<Props>(), {
  ...getDefaults<Props, Config>(defaultConfig, COMPONENT_NAME),
  modelValue: "",
  label: "",
});

const emit = defineEmits<{
  /**
   * Triggers when the OTP value changes.
   */
  "update:modelValue": [value: string];

  /**
   * Triggers when an input field receives focus.
   */
  focus: [event: FocusEvent];

  /**
   * Triggers when an input field loses focus.
   */
  blur: [event: FocusEvent];

  /**
   * Triggers when the OTP is complete.
   */
  complete: [value: string];
}>();

const elementId = props.id || useId();
const inputRefs = ref<InstanceType<typeof UInput>[]>([]);

const otpValue = computed({
  get: () => props.modelValue || "",
  set: (value) => emit("update:modelValue", value),
});

const otpArray = computed(() => {
  const value = otpValue.value;
  const array = new Array(props.length).fill("");

  for (let i = 0; i < Math.min(value.length, props.length); i++) {
    array[i] = value[i] || "";
  }

  return array;
});

function setInputRef(el: InstanceType<typeof UInput> | null, index: number) {
  if (el) {
    inputRefs.value[index] = el;
  }
}

function onInput(value: string, index: number) {
  // Only allow single character
  if (value.length > 1) {
    value = value.slice(-1);
  }

  // Update the OTP array
  const newArray = [...otpArray.value];

  newArray[index] = value;

  const newValue = newArray.join("");

  otpValue.value = newValue;

  // Auto-focus next input when value is entered
  if (value && index < props.length - 1) {
    nextTick(() => {
      const nextInput = inputRefs.value[index + 1];

      if (nextInput && nextInput.$el) {
        const inputElement = nextInput.$el.querySelector("input") as HTMLInputElement;

        inputElement?.focus();
      }
    });
  }

  // Check if OTP is complete (all fields filled)
  if (newArray.every((digit) => digit !== "") && newArray.length === props.length) {
    emit("complete", newValue);
  }
}

function onKeydown(event: KeyboardEvent, index: number) {
  const currentValue = otpArray.value[index];

  if ((event.key === "Backspace" || event.key === "Delete") && currentValue) {
    // Clear current input when backspace or delete is pressed
    const newArray = [...otpArray.value];
    newArray[index] = "";
    otpValue.value = newArray.join("");
  } else if (event.key === "Backspace" && !currentValue && index > 0) {
    // If current input is empty and backspace is pressed, move to previous input
    nextTick(() => {
      const prevInput = inputRefs.value[index - 1];

      if (prevInput && prevInput.$el) {
        const inputElement = prevInput.$el.querySelector("input") as HTMLInputElement;

        inputElement?.focus();
      }
    });
  } else if (event.key === "ArrowLeft" && index > 0) {
    event.preventDefault();
    const prevInput = inputRefs.value[index - 1];

    if (prevInput && prevInput.$el) {
      const inputElement = prevInput.$el.querySelector("input") as HTMLInputElement;

      inputElement?.focus();
    }
  } else if (event.key === "ArrowRight" && index < props.length - 1) {
    event.preventDefault();
    const nextInput = inputRefs.value[index + 1];

    if (nextInput && nextInput.$el) {
      const inputElement = nextInput.$el.querySelector("input") as HTMLInputElement;

      inputElement?.focus();
    }
  }
}

function onFocus(event: FocusEvent) {
  emit("focus", event);
}

function onBlur(event: FocusEvent) {
  emit("blur", event);
}

function onPaste(event: ClipboardEvent, index: number) {
  event.preventDefault();

  const pastedData = event.clipboardData?.getData("text") || "";
  let processedData = pastedData;

  // Filter for integers only if required
  if (props.integerOnly) {
    processedData = pastedData.replace(/\D/g, "");
  }

  // Limit to remaining slots
  const remainingSlots = props.length - index;

  processedData = processedData.slice(0, remainingSlots);

  if (processedData) {
    const newArray = [...otpArray.value];

    // Fill the array starting from current index
    for (let i = 0; i < processedData.length; i++) {
      if (index + i < props.length) {
        newArray[index + i] = processedData[i];
      }
    }

    // Update the model value which will trigger reactivity
    const newValue = newArray.join("");

    otpValue.value = newValue;

    // Focus the next empty input or the last filled input
    const nextIndex = Math.min(index + processedData.length, props.length - 1);

    nextTick(() => {
      const nextInput = inputRefs.value[nextIndex];

      if (nextInput && nextInput.$el) {
        const inputElement = nextInput.$el.querySelector("input") as HTMLInputElement;

        inputElement?.focus();
      }
    });

    // Check if OTP is complete (all fields filled)
    if (newArray.every((digit) => digit !== "") && newArray.length === props.length) {
      emit("complete", newArray.join(""));
    }
  }
}

/**
 * Get element / nested component attributes for each config token ✨
 * Applies: `class`, `config`, redefined default `props` and dev `vl-...` attributes.
 */
const mutatedProps = computed(() => ({
  error: Boolean(props.error) && !props.disabled,
  label: Boolean(props.label),
}));

const { getDataTest, containerAttrs, otpInputAttrs, otpInputLabelAttrs } = useUI<Config>(
  defaultConfig,
  mutatedProps,
);
</script>

<template>
  <ULabel
    :for="elementId"
    :label="label"
    :error="error"
    :description="description"
    :size="size"
    :disabled="disabled"
    :align="labelAlign"
    interactive
    v-bind="otpInputLabelAttrs"
    :data-test="getDataTest('label')"
  >
    <template #label>
      <!--
        @slot Use this to add custom content instead of the label.
        @binding {string} label
      -->
      <slot name="label" :label="label" />
    </template>

    <div v-bind="containerAttrs" :data-test="getDataTest('container')">
      <UInput
        v-for="(digit, index) in otpArray"
        :key="`${elementId}-${index}`"
        :ref="(el) => setInputRef(el as InstanceType<typeof UInput>, index)"
        :model-value="digit"
        :type="mask ? 'password' : 'text'"
        :readonly="readonly"
        :disabled="disabled"
        :inputmode="integerOnly ? 'numeric' : 'text'"
        :validation-rule="integerOnly ? 'integer' : undefined"
        :max-length="1"
        :size="size"
        :no-autocomplete="true"
        v-bind="otpInputAttrs"
        :data-test="getDataTest(`input-${index}`)"
        @update:model-value="(value) => onInput(value, index)"
        @keydown="(event) => onKeydown(event, index)"
        @focus="onFocus"
        @blur="onBlur"
        @paste="(event) => onPaste(event, index)"
      />
    </div>
  </ULabel>
</template>
