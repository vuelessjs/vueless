<script setup lang="ts">
import { computed, ref, useId } from "vue";

import useUI from "../composables/useUI.ts";
import { getDefaults } from "../utils/ui.ts";

import UIcon from "../ui.image-icon/UIcon.vue";
import UDivider from "../ui.container-divider/UDivider.vue";

import { UAccordion } from "./constants.ts";
import defaultConfig from "./config.ts";

import type { Props, DividerSize, Config } from "./types.ts";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<Props>(), {
  ...getDefaults<Props, Config>(defaultConfig, UAccordion),
});

const emit = defineEmits([
  /**
   * Triggers when the accordion item is toggled.
   * @property {string} elementId
   * @property {boolean} isOpened
   */
  "click",
]);

const isOpened = ref(false);

const elementId = props.id || useId();

const toggleIcon = computed(() =>
  isOpened.value ? config.value.defaults.collapseIcon : config.value.defaults.expandIcon,
);

const dividerSize = computed(() => {
  const sizes = {
    sm: "md",
    md: "lg",
    lg: "xl",
  };

  return sizes[props.size] as DividerSize;
});

function onClickItem() {
  isOpened.value = !isOpened.value;

  emit("click", elementId, isOpened.value);
}

const mutatedProps = computed(() => ({
  /* component state, not a props */
  opened: isOpened.value,
}));

const {
  config,
  wrapperAttrs,
  descriptionAttrs,
  bodyAttrs,
  titleAttrs,
  toggleIconAttrs,
  dividerAttrs,
} = useUI<Config>(defaultConfig, mutatedProps);
</script>

<template>
  <div v-bind="wrapperAttrs" :data-test="dataTest" @click="onClickItem">
    <div v-bind="bodyAttrs">
      <div v-bind="titleAttrs">
        {{ title }}
        <!--
          @slot Use it to add something instead of the toggle icon.
          @binding {string} icon-name
          @binding {string} icon-size
          @binding {boolean} opened
        -->
        <slot name="toggle" :icon-name="toggleIcon" :icon-size="size" :opened="isOpened">
          <UIcon :name="toggleIcon" :size="size" color="gray" internal v-bind="toggleIconAttrs" />
        </slot>
      </div>

      <div :id="`description-${elementId}`" v-bind="descriptionAttrs" v-text="description" />
    </div>

    <UDivider :size="dividerSize" v-bind="dividerAttrs" />
  </div>
</template>
