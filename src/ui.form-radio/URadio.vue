<script setup lang="ts">
import { computed, inject, onMounted, ref, watchEffect, toValue, useId } from "vue";

import ULabel from "../ui.form-label/ULabel.vue";
import { getDefaults } from "../utils/ui.ts";

import defaultConfig from "./config.ts";
import useAttrs from "./useAttrs.ts";
import { URadio } from "./constants.ts";

import type { URadioProps, LocalValueType, Config } from "./types.ts";
import type { SetRadioGroupSelectedItem } from "../ui.form-radio-group/types.ts";

defineOptions({ inheritAttrs: false });

const setRadioGroupSelectedItem = inject<SetRadioGroupSelectedItem>(
  "setRadioGroupSelectedItem",
  null,
);
const getRadioGroupName = inject("getRadioGroupName", null);
const getRadioGroupColor = inject("getRadioGroupColor", null);
const getRadioGroupSize = inject("getRadioGroupSize", null);
const getRadioGroupSelectedItem = inject("getRadioGroupSelectedItem", null);

const props = withDefaults(defineProps<URadioProps>(), {
  ...getDefaults<URadioProps, Config>(defaultConfig, URadio),
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

const isChecked = computed(() => {
  const currentValue = props.modelValue ?? localValue.value;

  if (typeof currentValue !== "object") {
    return currentValue === props.value;
  }

  return JSON.stringify(currentValue) === JSON.stringify(props.value);
});

const elementId = props.id || useId();

const { radioAttrs, radioLabelAttrs } = useAttrs(props, { radioColor, radioSize });

const radioValue = computed(() => {
  return props.value === "" ? "on" : props.value;
});

onMounted(() => {
  radioName.value = props.name || toValue(getRadioGroupName) || "";
});

watchEffect(() => (radioColor.value = toValue(getRadioGroupColor) || props.color));
watchEffect(() => (radioSize.value = toValue(getRadioGroupSize) || props.size));
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
</script>

<template>
  <ULabel
    :for="elementId"
    :label="label"
    :error="error"
    :size="radioSize"
    :align="labelAlign"
    :disabled="disabled"
    :description="description"
    v-bind="radioLabelAttrs"
    :data-test="`${dataTest}-label`"
  >
    <input
      :id="elementId"
      type="radio"
      :value="radioValue"
      :name="radioName"
      :checked="checked || isChecked"
      :disabled="disabled"
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
