<script setup lang="ts">
import { computed, ref } from "vue";

import useUI from "../composables/useUI.ts";
import { hasSlotContent } from "../utils/helper.ts";
import { getDefaults } from "../utils/ui.ts";

import UIcon from "../ui.image-icon/UIcon.vue";
import ULabel from "../ui.form-label/ULabel.vue";

import { COMPONENT_NAME } from "./constants.ts";
import defaultConfig from "./config.ts";

import type { Props, Config } from "./types.ts";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<Props>(), {
  ...getDefaults<Props, Config>(defaultConfig, COMPONENT_NAME),
  label: "",
});

const emit = defineEmits([
  /**
   * Triggers when the rating value changes.
   * @property {number} modelValue
   */
  "update:modelValue",
]);

const hovered = ref<number | null>(null);

const counterValue = computed(() => {
  return hovered.value || props.modelValue;
});

const starIcon = computed(() => {
  return (star: number): string => {
    return star <= counterValue.value
      ? config.value.defaults.selectedIcon
      : config.value.defaults.unselectedIcon;
  };
});

function onClickStar(newValue: number) {
  if (props.selectable) {
    const selected = newValue !== props.modelValue ? newValue : 0;

    hovered.value = null;

    emit("update:modelValue", selected);
  }
}

function onMouseHover(overStar: number | null = null) {
  if (props.selectable) hovered.value = overStar;
}

/**
 * Get element / nested component attributes for each config token ✨
 * Applies: `class`, `config`, redefined default `props` and dev `vl-...` attributes.
 */
const { config, inputLabelAttrs, containerAttrs, counterAttrs, totalAttrs, starsAttrs, starAttrs } =
  useUI<Config>(defaultConfig);
</script>

<template>
  <ULabel
    :label="label"
    :error="error"
    :size="size"
    :align="labelAlign"
    :description="description"
    v-bind="inputLabelAttrs"
    :data-test="dataTest"
  >
    <template #label>
      <!-- @slot Use it to add something instead of label. -->
      <slot name="label" :label="label" />
    </template>

    <div v-bind="containerAttrs">
      <div v-if="counter || hasSlotContent($slots['counter'])" v-bind="counterAttrs">
        <!--
          @slot Use it to customise counter.
          @binding {number} counter
          @binding {number} total
        -->
        <slot name="counter" :counter="counterValue" :total="total">
          {{ counterValue }}
        </slot>
      </div>

      <div v-bind="starsAttrs">
        <UIcon
          v-for="star in stars"
          :key="star"
          internal
          :color="error ? 'red' : 'brand'"
          :interactive="selectable"
          :name="starIcon(star)"
          v-bind="starAttrs"
          :data-test="`${dataTest}-rating-star-${star}`"
          @click="onClickStar(star)"
          @mouseleave="onMouseHover()"
          @mouseover="onMouseHover(star)"
        />
      </div>

      <div v-if="total || hasSlotContent($slots['total'])" v-bind="totalAttrs">
        <!--
          @slot Use it to customise total.
          @binding {number} counter
          @binding {number} total
        -->
        <slot name="total" :counter="counter" :total="total">({{ total }})</slot>
      </div>
    </div>
  </ULabel>
</template>
