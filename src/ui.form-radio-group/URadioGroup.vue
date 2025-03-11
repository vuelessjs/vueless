<script setup lang="ts">
import { computed, provide } from "vue";

import useUI from "../composables/useUI.ts";
import { getDefaults } from "../utils/ui.ts";

import ULabel from "../ui.form-label/ULabel.vue";
import URadio from "../ui.form-radio/URadio.vue";

import defaultConfig from "./config.ts";
import { COMPONENT_NAME } from "./constants.ts";

import type { Props, SetRadioGroupSelectedItem, Config } from "./types.ts";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<Props>(), {
  ...getDefaults<Props, Config>(defaultConfig, COMPONENT_NAME),
  modelValue: () => [],
  options: () => [],
  label: "",
});

const emit = defineEmits([
  /**
   * Triggers when the value attribute changes.
   * @property {string} value
   */
  "update:modelValue",
]);

const selectedItem = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

provide<SetRadioGroupSelectedItem>("setRadioGroupSelectedItem", (value) => {
  selectedItem.value = value;
});
provide("getRadioGroupSelectedItem", () => selectedItem.value);
provide("getRadioGroupName", () => props.name);
provide("getRadioGroupColor", () => props.color);
provide("getRadioGroupSize", () => props.size);
provide("getRadioGroupDisabled", () => props.disabled);

/**
 * Get element / nested component attributes for each config token ✨
 * Applies: `class`, `config`, redefined default `props` and dev `vl-...` attributes.
 */
const { getDataTest, groupLabelAttrs, listAttrs, groupRadioAttrs } = useUI<Config>(defaultConfig);
</script>

<template>
  <ULabel
    :size="size"
    :label="label"
    :error="error"
    :description="description"
    :disabled="disabled"
    align="topWithDesc"
    v-bind="groupLabelAttrs"
    :data-test="getDataTest()"
  >
    <template #label>
      <!--
        @slot Use this to add custom content instead of the label.
        @binding {string} label
      -->
      <slot name="label" :label="label" />
    </template>

    <div v-bind="listAttrs">
      <!-- @slot Use it to add URadio directly. -->
      <slot>
        <URadio
          v-for="(option, index) in options"
          :key="index"
          :model-value="selectedItem"
          :value="option.value"
          :label="option.label"
          :description="option.description"
          :disabled="disabled"
          v-bind="groupRadioAttrs"
          :data-test="getDataTest(`item-${index}`)"
        />
      </slot>
    </div>
  </ULabel>
</template>
