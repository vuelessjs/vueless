<template>
  <div
    ref="wrapperRef"
    tabindex="1"
    :data-cy="dataCy"
    v-bind="wrapperAttrs"
    @blur="onBlur"
    @focus="onFocus"
    @keydown="onKeydown"
    @click="onClick"
  >
    <div v-bind="bodyAttrs">
      <!-- @slot Use it to add something before text. -->
      <slot name="left" />

      <!-- @slot Use it to add something instead of text. -->
      <slot>
        <div v-if="!hasSlotContent($slots['default'])">
          {{ label }}
        </div>
      </slot>

      <!-- @slot Use it to add something after text. -->
      <slot name="right" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

import UIService from "../service.ui";

import { UBadge } from "./constants";
import useAttrs from "./composables/attrs.composable";
import defaultConfig from "./configs/default.config";

/* Should be a string for correct web-types gen */
defineOptions({ name: "UBadge", inheritAttrs: false });

const props = defineProps({
  /**
   *  Badge label.
   */
  label: {
    type: String,
    required: true,
    default: "",
  },

  /**
   * Badge variant.
   * @values primary, secondary, thirdary
   */
  variant: {
    type: String,
    default: UIService.get(defaultConfig, UBadge).default.variant,
  },

  /**
   * Badge size.
   * @values sm, md, lg
   */
  size: {
    type: String,
    default: UIService.get(defaultConfig, UBadge).default.size,
  },

  /**
   * Badge font weight.
   * @values regular, medium, bold
   */
  weight: {
    type: String,
    default: UIService.get(defaultConfig, UBadge).default.weight,
  },

  /**
   * Badge color.
   * @values brand, grayscale, gray, red, orange, amber, yellow, lime, green, emerald, teal, cyan, sky, blue, indigo, violet, purple, fuchsia, pink, rose, white
   */
  color: {
    type: String,
    default: UIService.get(defaultConfig, UBadge).default.color,
  },

  /**
   * Component ui config object.
   */
  config: {
    type: Object,
    default: () => ({}),
  },

  /**
   * Data-cy attribute for automated testing.
   */
  dataCy: {
    type: String,
    default: "",
  },
});

const emit = defineEmits([
  /**
   * Triggers when the badge is focused.
   */
  "focus",

  /**
   * Triggers when the badge is pressed.
   */
  "keydown",

  /**
   * Triggers when the badge loses focus.
   */
  "blur",

  /**
   * Triggers when the badge is clicked.
   */
  "click",
]);

const { bodyAttrs, wrapperAttrs, hasSlotContent } = useAttrs(props);

const wrapperRef = ref(null);

defineExpose({ wrapperRef });

function onFocus() {
  emit("focus");
}

function onBlur(event) {
  emit("blur", event);
}

function onKeydown(event) {
  emit("keydown", event);
}

function onClick(event) {
  emit("click", event);
}
</script>
