<script setup lang="ts">
import { computed, provide, useTemplateRef, ref, watch } from "vue";

import useUI from "../composables/useUI";
import { getDefaults } from "../utils/ui";

import UAccordionItem from "../ui.container-accordion-item/UAccordionItem.vue";

import { COMPONENT_NAME } from "./constants";
import defaultConfig from "./config";

import type { Props, Config, SetAccordionSelectedItem } from "./types";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<Props>(), {
  ...getDefaults<Props, Config>(defaultConfig, COMPONENT_NAME),
  modelValue: undefined,
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

const internalValue = ref<string | string[] | null>(props.multiple ? [] : null);

const isControlled = computed(() => props.modelValue !== undefined);

const selectedItem = computed({
  get: () => (isControlled.value ? props.modelValue! : internalValue.value),
  set: (value) => {
    if (!isControlled.value) internalValue.value = value;

    emit("update:modelValue", value);
  },
});

provide<SetAccordionSelectedItem>("setAccordionSelectedItem", (value, opened) => {
  if (props.multiple) {
    let current: string[] = [];

    if (selectedItem.value) {
      current = Array.isArray(selectedItem.value) ? [...selectedItem.value] : [selectedItem.value];
    }

    if (opened && !current.includes(value)) {
      current.push(value);
    } else {
      const index = current.indexOf(value);

      if (index !== -1) {
        current.splice(index, 1);
      }
    }

    selectedItem.value = current;

    return;
  }

  selectedItem.value = opened ? value : null;
});

provide("getAccordionSelectedItem", () => selectedItem.value ?? null);
provide("getAccordionName", () => props.name);
provide("getAccordionSize", () => props.size);
provide("getAccordionDisabled", () => props.disabled);

watch(
  () => props.multiple,
  (isMultiple) => {
    if (!isControlled.value) {
      internalValue.value = isMultiple ? [] : null;
    }
  },
);

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
