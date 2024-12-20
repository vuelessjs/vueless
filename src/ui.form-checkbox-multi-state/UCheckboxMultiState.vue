<script setup lang="ts">
import { computed, ref, watchEffect } from "vue";
import { cloneDeep } from "../utils/helper.ts";

import useUI from "../composables/useUI.ts";
import { getDefaults } from "../utils/ui.ts";

import UCheckbox from "../ui.form-checkbox/UCheckbox.vue";

import defaultConfig from "./config.ts";
import { COMPONENT_NAME } from "./constants.ts";

import type { Props, Config } from "./types.ts";
import type { UCheckboxOption, Config as UCheckboxConfig } from "../ui.form-checkbox/types.ts";
import type { KeyAttrsWithConfig, UnknownObject } from "../types.ts";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<Props>(), {
  ...getDefaults<Props, Config>(defaultConfig, COMPONENT_NAME),
  modelValue: false,
  options: () => [],
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
  return props.options[index.value];
});

watchEffect(setIndex);

function setIndex() {
  const optionIndex = Array.isArray(props.options)
    ? props.options.findIndex((item) => item.value === props.modelValue)
    : -1;

  index.value = ~optionIndex ? optionIndex : index.value;

  setChecked();
}

function setChecked() {
  setTimeout(() => (isChecked.value = !!props?.options[index.value].icon), 0);
}

function onClickCheckbox() {
  if (!props.options || props.options.length === 0) return;

  index.value++;
  index.value = index.value < props.options.length ? index.value : 0;

  emit("update:modelValue", selected?.value?.value);
}

/**
 * Get element / nested component attributes for each config token ✨
 * Applies: `class`, `config`, redefined default `props` and dev `vl-...` attributes.
 */
const { multiStateCheckboxAttrs: checkboxAttrs } = useUI<Config>(defaultConfig);

const multiStateCheckboxAttrs = computed(() => {
  const clonedCheckboxAttrs = cloneDeep(checkboxAttrs.value) as KeyAttrsWithConfig<UCheckboxConfig>;

  if (selected.value.icon && clonedCheckboxAttrs.config) {
    clonedCheckboxAttrs.config.defaults = {
      ...((clonedCheckboxAttrs.config.defaults || {}) as UnknownObject),
      checkedIcon: selected.value.icon,
    };
  }

  return clonedCheckboxAttrs;
});
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
