<script setup lang="ts">
import { computed, ref, inject, useId, useSlots, useTemplateRef, toValue, watchEffect } from "vue";

import { isEqual } from "lodash-es";

import useUI from "../composables/useUI";
import { getDefaults } from "../utils/ui";
import { hasSlotContent } from "../utils/helper";

import UIcon from "../ui.image-icon/UIcon.vue";
import UDivider from "../ui.container-divider/UDivider.vue";

import { COMPONENT_NAME } from "./constants";
import defaultConfig from "./config";

import type { Props, Config } from "./types";
import type { SetAccordionSelectedItem } from "../ui.container-accordion/types";

defineOptions({ inheritAttrs: false });

const setAccordionSelectedItem = inject<SetAccordionSelectedItem | null>(
  "setAccordionSelectedItem",
  null,
);
const getAccordionName = inject("getAccordionName", null);
const getAccordionSize = inject("getAccordionSize", null);
const getAccordionDisabled = inject("getAccordionDisabled", null);
const getAccordionSelectedItem = inject("getAccordionSelectedItem", null);

const props = withDefaults(defineProps<Props>(), {
  ...getDefaults<Props, Config>(defaultConfig, COMPONENT_NAME),
});

const emit = defineEmits([
  /**
   * Triggers when the accordion item is toggled.
   * @property {string} elementId
   * @property {boolean} isOpened
   */
  "click",

  /**
   * Triggers when the value attribute changes.
   * @property {string} value
   */
  "update:modelValue",
]);

const wrapperRef = useTemplateRef<HTMLDivElement>("wrapper");
const contentRef = useTemplateRef<HTMLDivElement>("content");

const accordionName = ref(toValue(getAccordionName) || props.name);
const accordionSize = ref(toValue(getAccordionSize) || props.size);
const accordionDisabled = ref(toValue(getAccordionDisabled) || props.disabled);

watchEffect(() => (accordionName.value = toValue(getAccordionName) || props.name));
watchEffect(() => (accordionSize.value = toValue(getAccordionSize) || props.size));
watchEffect(() => (accordionDisabled.value = toValue(getAccordionDisabled) || props.disabled));

const slots = useSlots();
const elementId = props.id || useId();

const internalOpened = ref(false);

const isOpened = computed(() => {
  const selectedFromGroup = toValue(getAccordionSelectedItem);

  if (selectedFromGroup !== null) {
    return isEqual(selectedFromGroup, props.value);
  }

  if (props.modelValue !== undefined && props.modelValue !== null) {
    return isEqual(props.modelValue, props.value);
  }

  return props.opened || internalOpened.value;
});

const toggleIconName = computed(() => {
  if (typeof props.toggleIcon === "string") {
    return props.toggleIcon;
  }

  return props.toggleIcon ? config.value.defaults.toggleIcon : "";
});

function onClickItem(event: MouseEvent) {
  if (props.disabled || (contentRef.value && contentRef.value.contains(event.target as Node))) {
    return;
  }

  emit("click", elementId, isOpened.value);

  if (setAccordionSelectedItem) {
    if (isOpened.value) {
      setAccordionSelectedItem(null);

      return;
    }

    setAccordionSelectedItem(props.value ?? "");

    return;
  }

  internalOpened.value = !internalOpened.value;
  emit("update:modelValue", internalOpened.value);
}

defineExpose({
  /**
   * A reference to the component's wrapper element for direct DOM manipulation.
   * @property {HTMLDivElement}
   */
  wrapperRef,
});

const mutatedProps = computed(() => ({
  /* component state, not a props */
  opened: isOpened.value,
}));

const {
  getDataTest,
  config,
  wrapperAttrs,
  descriptionAttrs,
  bodyAttrs,
  titleAttrs,
  contentAttrs,
  toggleIconAttrs,
  accordionDividerAttrs,
} = useUI<Config>(defaultConfig, mutatedProps);
</script>

<template>
  <div
    ref="wrapper"
    v-bind="wrapperAttrs"
    :name="accordionName"
    :value="value"
    :data-test="getDataTest()"
    @click="onClickItem"
  >
    <div v-bind="bodyAttrs">
      <div v-bind="titleAttrs">
        {{ title }}
        <!--
          @slot Use it to add something instead of the toggle icon.
          @binding {string} icon-name
          @binding {boolean} opened
        -->
        <slot name="toggle" :icon-name="toggleIconName" :opened="isOpened">
          <UIcon
            v-if="toggleIconName"
            :name="toggleIconName"
            :size="size"
            color="neutral"
            v-bind="toggleIconAttrs"
          />
        </slot>
      </div>

      <div
        v-if="description"
        :id="`description-${elementId}`"
        v-bind="descriptionAttrs"
        v-text="description"
      />

      <div v-if="isOpened && hasSlotContent(slots['default'])" ref="content" v-bind="contentAttrs">
        <!-- @slot Use it to add accordion content. -->
        <slot />
      </div>
    </div>

    <UDivider v-bind="accordionDividerAttrs" />
  </div>
</template>
