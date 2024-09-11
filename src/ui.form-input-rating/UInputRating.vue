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
    <div v-bind="wrapperAttrs">
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
            star <= counterValue ? config.defaults.selectedIcon : config.defaults.unselectedIcon
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

<script setup>
import { computed, ref } from "vue";

import UIcon from "../ui.image-icon/UIcon.vue";
import ULabel from "../ui.form-label/ULabel.vue";
import { getDefault } from "../utils/utilUI.js";

import { UInputRating } from "./constants.js";
import defaultConfig from "./config.js";
import useAttrs from "./useAttrs.js";

/* Should be a string for correct web-types gen */
defineOptions({ name: "UInputRating", inheritAttrs: false });

const props = defineProps({
  /**
   * Rating value.
   */
  modelValue: {
    type: Number,
    default: 0,
  },

  /**
   * Rating number of stars.
   */
  stars: {
    type: Number,
    default: getDefault(defaultConfig, UInputRating).stars,
  },

  /**
   * Rating size.
   * @values sm, md, lg
   */
  size: {
    type: String,
    default: getDefault(defaultConfig, UInputRating).size,
  },

  /**
   * Rating label.
   */
  label: {
    type: String,
    default: "",
  },

  /**
   * Rating label placement.
   * @values top, topWithDesc, left, right
   */
  labelAlign: {
    type: String,
    default: getDefault(defaultConfig, UInputRating).labelAlign,
  },

  /**
   * Rating error message.
   */
  error: {
    type: String,
    default: "",
  },

  /**
   * Rating description.
   */
  description: {
    type: String,
    default: "",
  },

  /**
   * Rating total.
   */
  total: {
    type: Number,
    default: 0,
  },

  /**
   * Show rating counter.
   */
  counter: {
    type: Boolean,
    default: getDefault(defaultConfig, UInputRating).counter,
  },

  /**
   * Make rating selectable.
   */
  selectable: {
    type: Boolean,
    default: getDefault(defaultConfig, UInputRating).selectable,
  },

  /**
   * Component ui config object.
   */
  config: {
    type: Object,
    default: () => ({}),
  },

  /**
   * Data-test attribute for automated testing.
   */
  dataTest: {
    type: String,
    default: "",
  },
});

const emit = defineEmits([
  /**
   * Triggers when the rating value changes.
   * @property {number} modelValue
   */
  "update:modelValue",
]);

const hovered = ref(null);

const {
  config,
  inputLabelAttrs,
  wrapperAttrs,
  counterAttrs,
  totalAttrs,
  starsAttrs,
  starAttrs,
  hasSlotContent,
} = useAttrs(props);

const iconSize = computed(() => {
  const sizes = {
    sm: "xs",
    md: "sm",
    lg: "md",
  };

  return sizes[props.size];
});

const counterValue = computed(() => {
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
