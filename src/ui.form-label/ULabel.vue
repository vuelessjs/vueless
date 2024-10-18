<template>
  <div
    v-if="isHorizontalPlacement || isTopWithDescPlacement"
    ref="wrapperRef"
    v-bind="wrapperAttrs"
    @click="onClick"
  >
    <div v-bind="contentAttrs">
      <!-- @slot Use it to add label content. -->
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
      <!-- @slot Use it to add label content. -->
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

import { getDefault } from "../utils/utilUI.js";

import defaultConfig from "./config.js";
import { ULabel, PLACEMENT } from "./constants.js";
import useAttrs from "./useAttrs.js";

defineOptions({ inheritAttrs: false });

const emit = defineEmits([
  /**
   * Triggers when the label is clicked.
   */
  "click",
]);

const props = defineProps({
  /**
   * Label text.
   */
  label: {
    type: String,
    default: "",
  },

  /**
   * Label description.
   */
  description: {
    type: String,
    default: "",
  },

  /**
   * Label error message.
   */
  error: {
    type: String,
    default: "",
  },

  /**
   * Label align.
   * @values top, topInside, topWithDesc, left, right
   */
  align: {
    type: String,
    default: getDefault(defaultConfig, ULabel).align,
  },

  /**
   * Label size.
   * @values sm, md, lg
   */
  size: {
    type: String,
    default: getDefault(defaultConfig, ULabel).size,
  },

  /**
   * Make label disabled.
   */
  disabled: {
    type: Boolean,
    default: getDefault(defaultConfig, ULabel).disabled,
  },

  /**
   * Centre label horizontally.
   */
  centred: {
    type: Boolean,
    default: getDefault(defaultConfig, ULabel).centred,
  },

  /**
   * Set input id for label `for` attribute.
   */
  for: {
    type: String,
    default: "",
  },

  /**
   * Component config object.
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

const isHorizontalPlacement = computed(() => {
  return props.align === PLACEMENT.left || props.align === PLACEMENT.right;
});

const isTopWithDescPlacement = computed(() => {
  return props.align === PLACEMENT.topWithDesc;
});

const labelElement = computed(() => {
  return labelRef.value;
});

const wrapperElement = computed(() => {
  return wrapperRef.value;
});

function onClick(event) {
  emit("click", event);
}

defineExpose({
  /**
   * Reference to the label element.
   * @property {HTMLElement}
   */
  labelElement,

  /**
   * Reference to the wrapper element containing the label and content.
   * @property {HTMLElement}
   */
  wrapperElement,
});
</script>
