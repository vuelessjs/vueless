<script setup lang="ts">
import { computed, provide, useTemplateRef } from "vue";

import useUI from "../composables/useUI";
import { getDefaults } from "../utils/ui";

import UAccordionItem from "../ui.container-accordion-item/UAccordionItem.vue";

import { COMPONENT_NAME } from "./constants";
import defaultConfig from "./config";

import type { Props, Config, SetAccordionSelectedItem } from "./types";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<Props>(), {
  ...getDefaults<Props, Config>(defaultConfig, COMPONENT_NAME),
  options: () => [],
});

const emit = defineEmits([
  /**
   * Triggers when the value attribute changes.
   * @property {string} value
   */
  "update:modelValue",
]);

const listRef = useTemplateRef<HTMLDivElement>("list");

const selectedItem = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

provide<SetAccordionSelectedItem>("setAccordionSelectedItem", (value) => {
  selectedItem.value = value;
});
provide("getAccordionSelectedItem", () => selectedItem.value ?? null);
provide("getAccordionName", () => props.name);
provide("getAccordionSize", () => props.size);
provide("getAccordionDisabled", () => props.disabled);

defineExpose({
  /**
   * A reference to the component's wrapper element for direct DOM manipulation.
   * @property {HTMLDivElement}
   */
  listRef,
});

const { getDataTest, accordionAttrs, listAttrs } = useUI<Config>(defaultConfig);
</script>

<template>
  <div ref="list" v-bind="listAttrs" :data-test="getDataTest()">
    <!-- @slot Use it to add UAccordionItem directly. -->
    <slot>
      <UAccordionItem
        v-for="(option, index) in options"
        :key="index"
        :model-value="selectedItem"
        :name="name"
        :value="option.value"
        :opened="option.opened"
        :title="option.title"
        :description="option.description"
        :size="size"
        :disabled="disabled"
        v-bind="accordionAttrs"
        :data-test="getDataTest(`item-${index}`)"
      />
    </slot>
  </div>
</template>
