<script setup lang="ts">
import { computed, ref, useId, useTemplateRef } from "vue";

import useUI from "../composables/useUI.ts";
import { getDefaults } from "../utils/ui.ts";

import UIcon from "../ui.image-icon/UIcon.vue";
import UDivider from "../ui.container-divider/UDivider.vue";

import { COMPONENT_NAME } from "./constants.ts";
import defaultConfig from "./config.ts";

import type { Props, Config } from "./types.ts";

defineOptions({ inheritAttrs: false });

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

const isOpened = ref(false);

const elementId = props.id || useId();

const toggleIconName = computed(() => {
  if (typeof props.toggleIcon === "string") {
    return props.toggleIcon;
  }

  return props.toggleIcon ? config.value.defaults.toggleIcon : "";
});

function onClickItem() {
  isOpened.value = !isOpened.value;

  emit("click", elementId, isOpened.value);
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
  toggleIconAttrs,
  accordionDividerAttrs,
} = useUI<Config>(defaultConfig, mutatedProps);
</script>

<template>
  <div ref="wrapper" v-bind="wrapperAttrs" :data-test="getDataTest()" @click="onClickItem">
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

      <div :id="`description-${elementId}`" v-bind="descriptionAttrs" v-text="description" />
    </div>

    <UDivider v-bind="accordionDividerAttrs" />
  </div>
</template>
