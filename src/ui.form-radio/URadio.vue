<script setup lang="ts">
import { computed, inject, onMounted, ref, watchEffect, toValue, useId } from "vue";

import useUI from "../composables/useUI.ts";
import { getDefaults } from "../utils/ui.ts";

import ULabel from "../ui.form-label/ULabel.vue";

import defaultConfig from "./config.ts";
import { COMPONENT_NAME } from "./constants.ts";

import type { Props, LocalValueType, Config } from "./types.ts";
import type { SetRadioGroupSelectedItem } from "../ui.form-radio-group/types.ts";

defineOptions({ inheritAttrs: false });

const setRadioGroupSelectedItem = inject<SetRadioGroupSelectedItem>(
  "setRadioGroupSelectedItem",
  null,
);
const getRadioGroupName = inject("getRadioGroupName", null);
const getRadioGroupColor = inject("getRadioGroupColor", null);
const getRadioGroupSize = inject("getRadioGroupSize", null);
const getRadioGroupDisabled = inject("getRadioGroupDisabled", null);
const getRadioGroupSelectedItem = inject("getRadioGroupSelectedItem", null);

const props = withDefaults(defineProps<Props>(), {
  ...getDefaults<Props, Config>(defaultConfig, COMPONENT_NAME),
  modelValue: () => ({}),
  value: () => ({}),
  label: "",
});

const emit = defineEmits([
  /**
   * Triggers when the value attribute changes.
   * @property {string} value
   */
  "update:modelValue",
]);

const localValue = ref<LocalValueType>("");
const radioName = ref("");
const radioColor = ref(toValue(getRadioGroupColor) || props.color);
const radioSize = ref(toValue(getRadioGroupSize) || props.size);
const radioDisabled = ref(toValue(getRadioGroupDisabled) || props.disabled);

const isChecked = computed(() => {
  const currentValue = props.modelValue ?? localValue.value;

  if (typeof currentValue !== "object") {
    return currentValue === props.value;
  }

  return JSON.stringify(currentValue) === JSON.stringify(props.value);
});

const elementId = props.id || useId();

const radioValue = computed(() => {
  return props.value === "" ? "on" : props.value;
});

onMounted(() => {
  radioName.value = props.name || toValue(getRadioGroupName) || "";
});

watchEffect(() => (radioColor.value = toValue(getRadioGroupColor) || props.color));
watchEffect(() => (radioSize.value = toValue(getRadioGroupSize) || props.size));
watchEffect(() => (radioDisabled.value = toValue(getRadioGroupDisabled) || props.disabled));
watchEffect(() => {
  localValue.value = toValue(getRadioGroupSelectedItem) || null;
  emit("update:modelValue", props.value);
});

function onChange(event: Event) {
  const target = event.target as HTMLInputElement;

  if (setRadioGroupSelectedItem) {
    setRadioGroupSelectedItem(props.value ?? "");
  }

  emit("update:modelValue", target.value);
}

/**
 * Get element / nested component attributes for each config token ✨
 * Applies: `class`, `config`, redefined default `props` and dev `vl-...` attributes.
 */
const mutatedProps = computed(() => ({
  color: radioColor.value,
  size: radioSize.value,
  label: Boolean(props.label),
  error: Boolean(props.error),
}));

const { radioAttrs, radioLabelAttrs } = useUI<Config>(defaultConfig, mutatedProps);
</script>

<template>
  <ULabel
    :for="elementId"
    :label="label"
    :error="error"
    :size="radioSize"
    :align="labelAlign"
    :disabled="radioDisabled"
    :description="description"
    interactive
    v-bind="radioLabelAttrs"
    :data-test="`${dataTest}-label`"
  >
    <template #label>
      <!--
        @slot Use this to add custom content instead of the label.
        @binding {string} label
      -->
      <slot name="label" :label="label" />
    </template>

    <input
      :id="elementId"
      type="radio"
      :value="radioValue"
      :name="radioName"
      :checked="checked || isChecked"
      :disabled="radioDisabled"
      v-bind="radioAttrs"
      :data-test="dataTest"
      @change="onChange"
    />

    <template #bottom>
      <!-- @slot Use it to add something below the radio. -->
      <slot name="bottom" />
    </template>
  </ULabel>
</template>
