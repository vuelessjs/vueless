<template>
  <div :data-cy="dataCy" v-bind="ratingAttrs">
    <ULabel
      :label="label"
      :error="error"
      :size="size"
      :description="description"
      :align="labelAlign"
      v-bind="labelAttrs"
    >
      <div v-bind="wrapperAttrs">
        <div v-if="!noCounter" v-bind="counterAttrs">
          <!-- @slot Use it to add counter. -->
          <slot name="counter">
            {{ ratingCounter }}
          </slot>
        </div>

        <div v-bind="iconsContainerAttrs">
          <UIcon
            v-for="star in starsNumber"
            :key="star"
            :data-cy="`${dataCy}-rating-star-${star}`"
            :name="star <= ratingCounter ? 'star-fill' : 'star'"
            :size="iconSize"
            color="yellow"
            :interactive="selectable"
            v-bind="iconsAttrs"
            @mouseover="onMouseHover(star)"
            @mouseleave="onMouseHover()"
            @click="onClickStar(star)"
          />
        </div>

        <!-- @slot Use it to add something right. -->
        <slot name="right" />
      </div>
    </ULabel>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";

import UIcon from "../ui.image-icon";
import ULabel from "../ui.form-label";
import UIService from "../service.ui";

import { UInputRating } from "./constants";
import defaultConfig from "./configs/default.config";
import { useAttrs } from "./composables/attrs.composable";

/* Should be a string for correct web-types gen */
defineOptions({ name: "UInputRating", inheritAttrs: false });

const props = defineProps({
  /**
   * Set input rating  label.
   */
  label: {
    type: String,
    default: "",
  },

  /**
   * Set input rating value.
   */
  modelValue: {
    type: Number,
    default: UIService.get(defaultConfig, UInputRating).default.modelValue,
  },

  /**
   * Set the number of stars.
   */
  starsNumber: {
    type: Number,
    default: UIService.get(defaultConfig, UInputRating).default.starsNumber,
  },

  /**
   * Set component size.
   * @values sm, md, lg
   */
  size: {
    type: String,
    default: UIService.get(defaultConfig, UInputRating).default.size,
  },

  /**
   * Make stars selectable.
   */
  selectable: {
    type: Boolean,
    default: UIService.get(defaultConfig, UInputRating).default.selectable,
  },

  /**
   * Set label placement related from the default slot.
   * @values top, topInside, topWithDesc, bottom, left, right
   */
  labelAlign: {
    type: String,
    default: UIService.get(defaultConfig, UInputRating).default.labelAlign,
  },

  /**
   * Set error message.
   */
  error: {
    type: String,
    default: "",
  },

  /**
   * Set description text.
   */
  description: {
    type: String,
    default: "",
  },

  /**
   * Hide / show counter.
   */
  noCounter: {
    type: Boolean,
    default: UIService.get(defaultConfig, UInputRating).default.noCounter,
  },

  /**
   * Sets component ui config object.
   */
  config: {
    type: Object,
    default: () => ({}),
  },

  /**
   * Sets data-cy attribute for automated testing.
   */
  dataCy: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:modelValue"]);

const hovered = ref(null);

const { counterAttrs, ratingAttrs, wrapperAttrs, iconsAttrs, iconsContainerAttrs, labelAttrs } =
  useAttrs(props);

const iconSize = computed(() => {
  const sizes = {
    sm: "xs",
    md: "sm",
    lg: "md",
  };

  return sizes[props.size];
});

const ratingCounter = computed(() => {
  return hovered.value || props.modelValue;
});

function onClickStar(newValue) {
  if (props.selectable) {
    const selected = newValue !== props.modelValue ? newValue : 0;

    hovered.value = null;

    emit("update:modelValue", selected);
  }
}

function onMouseHover(overStar) {
  if (props.selectable) hovered.value = overStar;
}
</script>
