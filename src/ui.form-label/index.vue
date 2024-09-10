<template>
  <div
    v-if="isHorizontalPlacement || isTopWithDescPlacement"
    ref="wrapperRef"
    v-bind="wrapperAttrs"
    @click="onClick"
  >
    <div v-bind="contentAttrs">
      <!-- @slot Use it to wrap something into the label. -->
      <slot />
    </div>

    <!-- `v-bind` isn't assigned, because the div is system -->
    <div v-if="label || error || description">
      <label
        v-if="label"
        :for="props.for"
        :data-test="`${dataTest}-label`"
        v-bind="labelAttrs"
        v-text="label"
      />

      <div v-if="error" :data-test="`${dataTest}-error`" v-bind="descriptionAttrs" v-text="error" />

      <div
        v-if="description && !error"
        :data-test="`${dataTest}-description`"
        v-bind="descriptionAttrs"
        v-text="description"
      />

      <!-- @slot Use it to add something below the label content. -->
      <slot name="bottom" />
    </div>
  </div>

  <div v-else v-bind="wrapperAttrs">
    <label
      v-if="label"
      ref="labelRef"
      :for="props.for"
      :data-test="`${dataTest}-label`"
      v-bind="labelAttrs"
      v-text="label"
    />

    <div v-bind="contentAttrs">
      <!-- @slot Use it to wrap something into the label. -->
      <slot />
    </div>

    <div v-if="error" :data-test="`${dataTest}-error`" v-bind="descriptionAttrs" v-text="error" />

    <div
      v-if="description && !error"
      :data-test="`${dataTest}-description`"
      v-bind="descriptionAttrs"
      v-text="description"
    />

    <!-- @slot Use it to add something below the label content. -->
    <slot name="bottom" />
  </div>
</template>

<script setup>
import { computed, ref } from "vue";

import { getDefault } from "../utils/utilsUI";

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
    default: getDefault(defaultConfig, ULabel).size,
  },

  /**
   * Label placement.
   * @values top, topInside, topWithDesc, left, right
   */
  align: {
    type: String,
    default: getDefault(defaultConfig, ULabel).align,
  },

  /**
   * Centre label.
   */
  centred: {
    type: Boolean,
    default: getDefault(defaultConfig, ULabel).centred,
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
    default: getDefault(defaultConfig, ULabel).disabled,
  },

  /**
   * Sets component ui config object.
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

const labelRef = ref(null);
const wrapperRef = ref(null);

const { wrapperAttrs, contentAttrs, labelAttrs, descriptionAttrs } = useAttrs(props);

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
