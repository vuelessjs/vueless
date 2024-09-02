<template>
  <div
    ref="wrapperRef"
    tabindex="1"
    :data-test="dataTest"
    v-bind="wrapperAttrs"
    @blur="onBlur"
    @focus="onFocus"
    @keydown="onKeydown"
    @click="onClick"
  >
    <div v-bind="bodyAttrs">
      <!--
          @slot Use it to add icon before the text.
          @binding {string} icon-name
          @binding {string} icon-size
          @binding {string} icon-color
        -->
      <slot name="left" :icon-name="leftIcon" :icon-size="iconSize" :icon-color="color">
        <UIcon
          v-if="leftIcon"
          :name="leftIcon"
          :size="iconSize"
          :color="color"
          internal
          v-bind="leftIconAttrs"
        />
      </slot>

      <!-- @slot Use it to add something instead of text. -->
      <slot>
        {{ label }}
      </slot>

      <!--
          @slot Use it to add icon after the text.
          @binding {string} icon-name
          @binding {string} icon-size
          @binding {string} icon-color
        -->
      <slot name="right" :icon-name="rightIcon" :icon-size="iconSize" :icon-color="color">
        <UIcon
          v-if="rightIcon"
          :name="rightIcon"
          :size="iconSize"
          :color="color"
          internal
          v-bind="rightIconAttrs"
        />
      </slot>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

import { getDefault } from "../service.ui";
import UIcon from "../ui.image-icon";

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
    default: getDefault(defaultConfig, UBadge).variant,
  },

  /**
   * Badge size.
   * @values sm, md, lg
   */
  size: {
    type: String,
    default: getDefault(defaultConfig, UBadge).size,
  },

  /**
   * Left side icon name.
   */
  leftIcon: {
    type: String,
    default: "",
  },

  /**
   * Right side icon name.
   */
  rightIcon: {
    type: String,
    default: "",
  },

  /**
   * Badge font weight.
   * @values regular, medium, bold
   */
  weight: {
    type: String,
    default: getDefault(defaultConfig, UBadge).weight,
  },

  /**
   * Badge color.
   * @values brand, grayscale, gray, red, orange, amber, yellow, lime, green, emerald, teal, cyan, sky, blue, indigo, violet, purple, fuchsia, pink, rose, white
   */
  color: {
    type: String,
    default: getDefault(defaultConfig, UBadge).color,
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

const { bodyAttrs, wrapperAttrs, leftIconAttrs, rightIconAttrs } = useAttrs(props);

const wrapperRef = ref(null);

defineExpose({ wrapperRef });

const iconSize = computed(() => {
  const sizes = {
    sm: "2xs",
    md: "xs",
    lg: "sm",
  };

  return sizes[props.size];
});

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
