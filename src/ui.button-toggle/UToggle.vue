<script setup lang="ts">
import { computed, provide, readonly } from "vue";

import ULabel from "../ui.form-label/ULabel.vue";
import UToggleItem from "../ui.button-toggle-item/UToggleItem.vue";

import useUI from "../composables/useUI.ts";
import { getDefaults } from "../utils/ui.ts";

import defaultConfig from "./config.ts";
import { COMPONENT_NAME, TYPE_RADIO, TYPE_CHECKBOX } from "./constants.ts";

import type { Props, Config } from "./types.ts";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<Props>(), {
  ...getDefaults<Props, Config>(defaultConfig, COMPONENT_NAME),
  options: () => [],
  modelValue: "",
  label: "",
});

const emit = defineEmits([
  /**
   * Triggers when toggle item is selected.
   * @property {string} modelValue
   */
  "update:modelValue",
]);

const selectedValue = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const type = computed(() => {
  return props.multiple ? TYPE_CHECKBOX : TYPE_RADIO;
});

function updateSelectedValue(value: string | number, checked: boolean) {
  if (type.value === TYPE_RADIO) {
    selectedValue.value = value;

    return;
  }

  if (Array.isArray(selectedValue.value)) {
    selectedValue.value = checked
      ? [...selectedValue.value, value]
      : selectedValue.value.filter((item) => String(item) !== String(value));
  } else {
    selectedValue.value = [value];
  }
}

provide("getToggleName", () => props.name);
provide("getToggleType", () => type.value);
provide("getToggleSize", () => props.size);
provide("getToggleRound", () => props.round);
provide("getToggleBlock", () => props.block);
provide("getToggleSquare", () => props.square);
provide("getToggleDisabled", () => props.disabled);
provide("getToggleRing", () => props.ring);
provide("getToggleSplit", () => props.split);

provide("toggleSelectedValue", {
  selectedValue: readonly(selectedValue),
  updateSelectedValue,
});

/**
 * Get element / nested component attributes for each config token ✨
 * Applies: `class`, `config`, redefined default `props` and dev `vl-...` attributes.
 */
const { toggleLabelAttrs, itemsAttrs, itemAttrs } = useUI<Config>(defaultConfig);
</script>

<template>
  <ULabel
    :label="label"
    :description="description"
    :align="labelAlign"
    :disabled="disabled"
    :error="error"
    centred
    v-bind="toggleLabelAttrs"
    :data-test="dataTest"
  >
    <template #label>
      <!--
        @slot Use this to add custom content instead of the label.
        @binding {string} label
      -->
      <slot name="label" :label="label" />
    </template>

    <div v-bind="itemsAttrs">
      <!-- @slot Use it to add UToggleItem directly. -->
      <slot>
        <UToggleItem
          v-for="(item, index) in options"
          :key="item.value"
          :name="name"
          :model-value="item.value"
          :value="item.value"
          :disabled="disabled || item.disabled"
          :label="item.label"
          v-bind="itemAttrs"
          :data-test="`${dataTest}-item-${index}`"
        />
      </slot>
    </div>
  </ULabel>
</template>
