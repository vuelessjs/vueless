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

      <div v-if="hasSlotContent($slots['left-icon']) || leftIcon">
        <!--
          @slot Use it to add icon before the text.
          @binding {string} icon-name
          @binding {string} icon-size
          @binding {string} icon-color
        -->
        <slot name="left-icon" :icon-name="leftIcon" :icon-size="iconSize" :icon-color="color">
          <UIcon
            v-if="leftIcon"
            :name="leftIcon"
            :size="iconSize"
            :color="color"
            internal
            v-bind="leftIconAttrs"
          />
        </slot>
      </div>

      <!-- @slot Use it to add something instead of text. -->
      <slot>
        <div v-if="!hasSlotContent($slots['default'])">
          {{ label }}
        </div>
      </slot>

      <div v-if="hasSlotContent($slots['right-icon']) || rightIcon">
        <!--
          @slot Use it to add icon after the text.
          @binding {string} icon-name
          @binding {string} icon-size
          @binding {string} icon-color
        -->
        <slot name="right-icon" :icon-name="rightIcon" :icon-size="iconSize" :icon-color="color">
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

      <!-- @slot Use it to add something after text. -->
      <slot name="right" />
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

const { bodyAttrs, wrapperAttrs, leftIconAttrs, rightIconAttrs, hasSlotContent } = useAttrs(props);

const wrapperRef = ref(null);

defineExpose({ wrapperRef });

const iconSize = computed(() => {
  const sizes = {
    sm: "xs",
    md: "sm",
    lg: "md",
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
