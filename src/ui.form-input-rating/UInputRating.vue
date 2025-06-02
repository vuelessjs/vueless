<script setup lang="ts">
import { computed, ref, useTemplateRef } from "vue";

import useUI from "../composables/useUI.ts";
import { hasSlotContent } from "../utils/helper.ts";
import { getDefaults } from "../utils/ui.ts";

import UIcon from "../ui.image-icon/UIcon.vue";

import { COMPONENT_NAME } from "./constants.ts";
import defaultConfig from "./config.ts";

import type { Props, Config } from "./types.ts";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<Props>(), {
  ...getDefaults<Props, Config>(defaultConfig, COMPONENT_NAME),
});

const emit = defineEmits([
  /**
   * Triggers when the rating value changes.
   * @property {number} modelValue
   */
  "update:modelValue",
]);

const wrapperRef = useTemplateRef<HTMLDivElement>("wrapper");

const hovered = ref<number | null>(null);
const preventHover = ref(false);

const counterValue = computed(() => {
  return hovered.value || props.modelValue;
});

const starIcon = computed(() => {
  return (star: number): string => {
    const isActive = star <= counterValue.value;

    return isActive
      ? (props.activeIcon ?? config.value.defaults.selectedIcon)
      : (props.inactiveIcon ?? config.value.defaults.unselectedIcon);
  };
});

function onClickStar(newValue: number) {
  if (!props.disabled && !props.readonly) {
    const selected = newValue !== props.modelValue ? newValue : 0;

    hovered.value = null;
    preventHover.value = true;

    setTimeout(() => {
      preventHover.value = false;
    }, 300);

    emit("update:modelValue", selected);
  }
}

function onMouseHover(overStar: number | null = null) {
  if (!props.disabled && !props.readonly && !preventHover.value) {
    hovered.value = overStar;
  }
}

defineExpose({
  /**
   * A reference to the component's wrapper element for direct DOM manipulation.
   * @property {HTMLDivElement}
   */
  wrapperRef,
});

/**
 * Get element / nested component attributes for each config token ✨
 * Applies: `class`, `config`, redefined default `props` and dev `vl-...` attributes.
 */
const {
  getDataTest,
  config,
  wrapperAttrs,
  counterAttrs,
  totalAttrs,
  starsAttrs,
  starLabelAttrs,
  starAttrs,
  inputAttrs,
} = useUI<Config>(defaultConfig);
</script>

<template>
  <div ref="wrapper" v-bind="wrapperAttrs">
    <div
      v-if="counter || hasSlotContent($slots['counter'], { counter: counterValue, total })"
      v-bind="counterAttrs"
    >
      <!--
          @slot Use it to customize counter.
          @binding {number} counter
          @binding {number} total
        -->
      <slot name="counter" :counter="counterValue" :total="total">
        {{ counterValue }}
      </slot>
    </div>

    <div v-bind="starsAttrs">
      <label
        v-for="(star, index) in stars"
        :key="star"
        tabindex="0"
        :for="String(index)"
        v-bind="starLabelAttrs"
        @keydown.enter="onClickStar(star)"
        @keydown.space.prevent="onClickStar(star)"
      >
        <input
          :id="String(index)"
          tabindex="-1"
          type="radio"
          :disabled="disabled"
          v-bind="inputAttrs"
        />

        <UIcon
          color="inherit"
          :interactive="!readonly"
          :disabled="disabled"
          :name="starIcon(star)"
          v-bind="starAttrs"
          :data-test="getDataTest(`star-${star}`)"
          @click="onClickStar(star)"
          @mouseleave="onMouseHover()"
          @mouseover="onMouseHover(star)"
        />
      </label>
    </div>

    <div v-if="total || hasSlotContent($slots['total'], { counter, total })" v-bind="totalAttrs">
      <!--
          @slot Use it to customize total.
          @binding {number} counter
          @binding {number} total
        -->
      <slot name="total" :counter="counter" :total="total">({{ total }})</slot>
    </div>
  </div>
</template>
