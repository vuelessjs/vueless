<script setup lang="ts">
import { computed, provide, useTemplateRef, ref, watch, onMounted } from "vue";

import { useUI } from "../composables/useUI";
import { getDefaults } from "../utils/ui";

import UAccordionItem from "../ui.container-accordion-item/UAccordionItem.vue";

import { COMPONENT_NAME } from "./constants";
import defaultConfig from "./config";

import type { Props, Config, SetAccordionSelectedItem } from "./types";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<Props>(), {
  ...getDefaults<Props, Config>(defaultConfig, COMPONENT_NAME),
  modelValue: () => [],
  options: () => [],
});

const emit = defineEmits([
  /**
   * Triggers when the value attribute changes.
   * @property {string} value
   */
  "update:modelValue",
]);

const accordionRef = useTemplateRef<HTMLDivElement>("accordion");

const internalValue = ref<string | string[] | null>(props.multiple ? [] : null);

const isControlled = computed(() => props.modelValue !== undefined);

const selectedItem = computed({
  get: () => (isControlled.value ? props.modelValue! : internalValue.value),
  set: (value) => {
    if (!isControlled.value) internalValue.value = value;

    emit("update:modelValue", value);
  },
});

onMounted(() => {
  const initiallyOpened = props.options
    .filter((option) => option.opened)
    .map((option) => option.value);

  if (initiallyOpened.length > 0) {
    selectedItem.value = props.multiple ? initiallyOpened : initiallyOpened[0];
  }
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
  accordionRef,
});

const { getDataTest, accordionItemAttrs, accordionAttrs } = useUI<Config>(defaultConfig);
</script>

<template>
  <div ref="accordion" v-bind="accordionAttrs" :data-test="getDataTest()">
    <!-- @slot Use it to add UAccordionItem directly. -->
    <slot>
      <UAccordionItem
        v-for="(option, index) in options"
        :key="index"
        :value="option.value"
        :title="option.title"
        :description="option.description"
        :size="size"
        :disabled="disabled"
        v-bind="accordionItemAttrs"
        :data-test="getDataTest(`item-${index}`)"
      />
    </slot>
  </div>
</template>
