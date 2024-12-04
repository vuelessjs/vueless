<script setup lang="ts">
import { computed, ref, watchEffect } from "vue";

import { getDefaults } from "../utils/ui.ts";
import UCheckbox from "../ui.form-checkbox/UCheckbox.vue";

import defaultConfig from "./config.ts";
import { UCheckboxMultiState } from "./constants.ts";
import useAttrs from "./useAttrs.ts";

import type { UCheckboxMultiStateProps, Config } from "./types.ts";
import type { UCheckboxOption } from "../ui.form-checkbox/types.ts";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<UCheckboxMultiStateProps>(), {
  ...getDefaults<UCheckboxMultiStateProps, Config>(defaultConfig, UCheckboxMultiState),
});

const emit = defineEmits([
  /**
   * Triggers when checkbox value changes.
   * @property {number} value
   */
  "update:modelValue",
]);

const index = ref(0);
const isChecked = ref(false);

const selected = computed<UCheckboxOption>(() => {
  return props.options()[index.value] || { icon: undefined };
});

const { multiStateCheckboxAttrs } = useAttrs(props, { selected });

watchEffect(setIndex);

function setIndex() {
  const optionIndex = Array.isArray(props.options)
    ? props.options.findIndex((item) => item.value === props.modelValue)
    : -1;

  index.value = ~optionIndex ? optionIndex : index.value;

  setChecked();
}

function setChecked() {
  setTimeout(() => (isChecked.value = !!props?.options()[index.value].icon), 0);
}

function onClickCheckbox() {
  if (!props.options || props.options.length === 0) return;

  index.value++;
  index.value = index.value < props.options.length ? index.value : 0;

  emit("update:modelValue", selected?.value?.value);
}
</script>

<template>
  <UCheckbox
    :model-value="isChecked"
    :label="selected?.label"
    :description="selected?.description"
    :name="name"
    :size="size"
    :color="color"
    :placement="placement"
    v-bind="multiStateCheckboxAttrs"
    @input="onClickCheckbox"
  />
</template>
