<script setup lang="ts">
import { computed, ref } from "vue";

import UIcon from "../ui.image-icon/UIcon.vue";
import ULabel from "../ui.form-label/ULabel.vue";
import { hasSlotContent } from "../utils/helper.ts";
import { getDefault } from "../utils/ui.ts";

import { UInputRating } from "./constants.ts";
import defaultConfig from "./config.ts";
import useAttrs from "./useAttrs.ts";

import type { UInputRatingProps, IconSize } from "./types.ts";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<UInputRatingProps>(), {
  stars: getDefault<UInputRatingProps>(defaultConfig, UInputRating).stars,
  size: getDefault<UInputRatingProps>(defaultConfig, UInputRating).size,
  labelAlign: getDefault<UInputRatingProps>(defaultConfig, UInputRating).labelAlign,
  counter: getDefault<UInputRatingProps>(defaultConfig, UInputRating).counter,
  selectable: getDefault<UInputRatingProps>(defaultConfig, UInputRating).selectable,
  modelValue: 0,
  dataTest: "",
  config: () => ({}),
});

const emit = defineEmits([
  /**
   * Triggers when the rating value changes.
   * @property {number} modelValue
   */
  "update:modelValue",
]);

const hovered = ref<number | null>(null);

const { config, inputLabelAttrs, containerAttrs, counterAttrs, totalAttrs, starsAttrs, starAttrs } =
  useAttrs(props);

const iconSize = computed(() => {
  const sizes = {
    sm: "xs",
    md: "sm",
    lg: "md",
  };

  return sizes[props.size] as IconSize;
});

const counterValue = computed(() => {
  return hovered.value || props.modelValue;
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
          :size="iconSize"
          :interactive="selectable"
          :name="
            star <= counterValue ? config.defaults?.selectedIcon : config.defaults?.unselectedIcon
          "
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
