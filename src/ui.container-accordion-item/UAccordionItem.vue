<script setup lang="ts">
import { computed, ref, inject, useId, useSlots, useTemplateRef, toValue, watchEffect } from "vue";

import { isEqual } from "lodash-es";

import useUI from "../composables/useUI";
import { getDefaults } from "../utils/ui";
import { hasSlotContent } from "../utils/helper";

import UIcon from "../ui.image-icon/UIcon.vue";

import { COMPONENT_NAME } from "./constants";
import defaultConfig from "./config";

import type { Props, Config } from "./types";
import type { SetAccordionSelectedItem } from "../ui.container-accordion/types";

defineOptions({ inheritAttrs: false });

const setAccordionSelectedItem = inject<SetAccordionSelectedItem | null>(
  "setAccordionSelectedItem",
  null,
);
const getAccordionSize = inject("getAccordionSize", null);
const getAccordionDisabled = inject("getAccordionDisabled", null);
const getAccordionSelectedItem = inject<(() => string | string[] | null) | null>(
  "getAccordionSelectedItem",
  null,
);

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
]);

const wrapperRef = useTemplateRef<HTMLDivElement>("wrapper");
const titleRef = useTemplateRef<HTMLDivElement>("title");

const accordionSize = ref(toValue(getAccordionSize) || props.size);
const accordionDisabled = ref(toValue(getAccordionDisabled) || props.disabled);

watchEffect(() => (accordionSize.value = toValue(getAccordionSize) || props.size));
watchEffect(() => (accordionDisabled.value = toValue(getAccordionDisabled) || props.disabled));

const slots = useSlots();
const elementId = props.id || useId();

const internalOpened = ref(props.opened || false);

const isOpened = computed(() => {
  const selectedItem = toValue(getAccordionSelectedItem);

  if (selectedItem !== null) {
    if (Array.isArray(selectedItem)) {
      return selectedItem.includes(props.value ?? "");
    }

    return isEqual(selectedItem, props.value);
  }

  return internalOpened.value;
});

const toggleIconName = computed(() => {
  if (typeof props.toggleIcon === "string") {
    return props.toggleIcon;
  }

  return props.toggleIcon ? config.value.defaults.toggleIcon : "";
});

function onClickItem(event: MouseEvent) {
  const clickedOnTitle = titleRef.value?.contains(event.target as Node);

  if (!clickedOnTitle || props.disabled) return;

  emit("click", elementId, !isOpened.value);

  if (setAccordionSelectedItem) {
    setAccordionSelectedItem(props.value ?? "", !isOpened.value);

    return;
  }

  internalOpened.value = !internalOpened.value;
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
} = useUI<Config>(defaultConfig, mutatedProps);
</script>

<template>
  <div ref="wrapper" v-bind="wrapperAttrs" :data-test="getDataTest()" @click="onClickItem">
    <div v-bind="bodyAttrs">
      <div v-bind="titleAttrs" ref="title">
        <!--
          @slot Use it to add custom title content.
          @binding {string} title
        -->
        <slot name="title" :title="title">
          {{ title }}
        </slot>
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
        v-if="description || hasSlotContent(slots['description'])"
        :id="`description-${elementId}`"
        v-bind="descriptionAttrs"
      >
        <!--
          @slot Use it to add custom description content.
          @binding {string} description
        -->
        <slot name="description" :description="description">
          {{ description }}
        </slot>
      </div>

      <div v-if="isOpened && hasSlotContent(slots['default'])" v-bind="contentAttrs">
        <!-- @slot Use it to add accordion content. -->
        <slot />
      </div>
    </div>
  </div>
</template>
