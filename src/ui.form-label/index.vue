<template>
  <div
    v-if="isHorizontalPlacement || isTopWithDescPlacement"
    ref="wrapperRef"
    v-bind="wrapperAttrs"
    @click="onClick"
  >
    <!-- @slot Use it to wrap something into the label. -->
    <slot />

    <div v-if="label || error || description" v-bind="labelWrapperAttrs">
      <label
        v-if="label"
        :for="props.for"
        :data-cy="`${dataCy}-label`"
        v-bind="labelAttrs"
        v-text="label"
      />

      <div v-if="error" :data-cy="`${dataCy}-error`" v-bind="descriptionAttrs" v-text="error" />

      <div
        v-if="description && !error"
        :data-cy="`${dataCy}-description`"
        v-bind="descriptionAttrs"
        v-text="description"
      />

      <!-- @slot Use it to add something to the label's footer. -->
      <slot name="footer" />
    </div>
  </div>

  <div v-else v-bind="wrapperAttrs">
    <label
      v-if="label"
      ref="labelRef"
      :for="props.for"
      :data-cy="`${dataCy}-label`"
      v-bind="labelAttrs"
      v-text="label"
    />

    <!-- @slot Use it to wrap something into the label. -->
    <slot />

    <div v-if="error" :data-cy="`${dataCy}-error`" v-bind="descriptionAttrs" v-text="error" />

    <div
      v-if="description && !error"
      :data-cy="`${dataCy}-description`"
      v-bind="descriptionAttrs"
      v-text="description"
    />

    <!-- @slot Use it to add something to the label's footer. -->
    <slot name="footer" />
  </div>
</template>

<script setup>
import { computed, ref } from "vue";

import UIService from "../service.ui";

import defaultConfig from "./configs/default.config";
import { ULabel, PLACEMENT } from "./constants";
import useAttrs from "./composables/attrs.composable";

/* Should be a string for correct web-types gen */
defineOptions({ name: "ULabel", inheritAttrs: false });

const emit = defineEmits([
  /**
   * Triggers when the label is clicked.
   */
  "click",
]);

const props = defineProps({
  /**
   * Set label value.
   */
  label: {
    type: String,
    default: "",
  },

  /**
   * Set label size.
   * @values sm, md, lg
   */
  size: {
    type: String,
    default: UIService.get(defaultConfig, ULabel).default.size,
  },

  /**
   * Label placement.
   * @values top, topInside, topWithDesc, left, right
   */
  align: {
    type: String,
    default: UIService.get(defaultConfig, ULabel).default.align,
  },

  /**
   * Centre label.
   */
  centred: {
    type: Boolean,
    default: UIService.get(defaultConfig, ULabel).default.centred,
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
   * Set id label for.
   * @ignore
   */
  for: {
    type: String,
    default: "",
  },

  /**
   * Make label disabled.
   */
  disabled: {
    type: Boolean,
    default: UIService.get(defaultConfig, ULabel).default.disabled,
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

const labelRef = ref(null);
const wrapperRef = ref(null);

const { wrapperAttrs, labelWrapperAttrs, labelAttrs, descriptionAttrs } = useAttrs(props);

const isHorizontalPlacement = computed(
  () => props.align === PLACEMENT.left || props.align === PLACEMENT.right,
);

const isTopWithDescPlacement = computed(() => props.align === PLACEMENT.topWithDesc);

const labelElement = computed(() => labelRef.value);
const wrapperElement = computed(() => wrapperRef.value);

function onClick(event) {
  emit("click", event);
}

defineExpose({ labelElement, wrapperElement });
</script>
