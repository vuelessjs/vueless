<template>
  <div v-click-outside="hideOptions" v-bind="wrapperAttrs">
    <UButton
      :id="elementId"
      :label="label"
      :size="size"
      :color="color"
      :round="round"
      :square="square"
      :variant="variant"
      :disabled="disabled"
      :filled="filled || isShownOptions"
      v-bind="dropdownButtonAttrs"
      :data-test="dataTest"
      @click="onClickButton"
    >
      <template #left>
        <!--
          @slot Use it to add something before the label.
          @binding {boolean} opened
        -->
        <slot name="left" :opened="isShownOptions" />
      </template>

      <template #default>
        <!--
          @slot Use it to add something instead of the default label.
          @binding {string} label
          @binding {boolean} opened
        -->
        <slot :label="label" :opened="isShownOptions" />
      </template>

      <template #right>
        <!--
          @slot Use it to add something after the label.
          @binding {boolean} opened
        -->
        <slot name="right" :opened="isShownOptions">
          <UIcon
            v-if="!noIcon"
            internal
            :size="iconSize"
            :color="iconColor"
            :name="config.defaults.dropdownIcon"
            v-bind="dropdownIconAttrs"
            :data-test="`${dataTest}-dropdown`"
          />
        </slot>
      </template>
    </UButton>

    <UDropdownList
      v-if="isShownOptions"
      ref="dropdownListRef"
      :size="size"
      :options="options"
      :label-key="labelKey"
      v-bind="dropdownListAttrs"
      :data-test="`${dataTest}-list`"
      @click="onClickList"
      @click-option="onClickOption"
    />
  </div>
</template>

<script setup>
import { nextTick, computed, provide, ref, useId } from "vue";

import UIcon from "../ui.image-icon/UIcon.vue";
import UButton from "../ui.button/UButton.vue";
import UDropdownList from "../ui.dropdown-list/UDropdownList.vue";

import { getDefault } from "../utils/ui.ts";

import { vClickOutside } from "../directives";

import defaultConfig from "./config.js";
import useAttrs from "./useAttrs.js";
import { UDropdownButton, BUTTON_VARIANT } from "./constants.js";

defineOptions({ inheritAttrs: false });

const props = defineProps({
  /**
   * Button label.
   */
  label: {
    type: String,
    default: "",
  },

  /**
   * Options list.
   */
  options: {
    type: Array,
    default: () => [],
  },

  /**
   * Label key in the item object of options.
   */
  labelKey: {
    type: String,
    default: getDefault(defaultConfig, UDropdownButton).labelKey,
  },

  /**
   * Button variant.
   * @values primary, secondary, thirdary
   */
  variant: {
    type: String,
    default: getDefault(defaultConfig, UDropdownButton).variant,
  },

  /**
   * Fill the background for thirdary variant.
   */
  filled: {
    type: Boolean,
    default: getDefault(defaultConfig, UDropdownButton).filled,
  },

  /**
   * Button color.
   * @values brand, grayscale, gray, red, orange, amber, yellow, lime, green, emerald, teal, cyan, sky, blue, indigo, violet, purple, fuchsia, pink, rose, white
   */
  color: {
    type: String,
    default: getDefault(defaultConfig, UDropdownButton).color,
  },

  /**
   * Button size.
   * @values 2xs, xs, sm, md, lg, xl
   */
  size: {
    type: String,
    default: getDefault(defaultConfig, UDropdownButton).size,
  },

  /**
   * Set button corners rounded.
   */
  round: {
    type: Boolean,
    default: getDefault(defaultConfig, UDropdownButton).round,
  },

  /**
   * Set the same paddings for the button.
   */
  square: {
    type: Boolean,
    default: getDefault(defaultConfig, UDropdownButton).square,
  },

  /**
   * Disable the link.
   */
  disabled: {
    type: Boolean,
    default: getDefault(defaultConfig, UDropdownButton).disabled,
  },

  /**
   * Hide dropdown icon.
   */
  noIcon: {
    type: Boolean,
    default: getDefault(defaultConfig, UDropdownButton).noIcon,
  },

  /**
   * The position of dropdown list on the y-axis.
   * @values top, bottom
   */
  yPosition: {
    type: String,
    default: getDefault(defaultConfig, UDropdownButton).yPosition,
  },

  /**
   * The position of dropdown list on the x-axis.
   * @values left, right
   */
  xPosition: {
    type: String,
    default: getDefault(defaultConfig, UDropdownButton).xPosition,
  },

  /**
   * Unique element id.
   */
  id: {
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

const emit = defineEmits([
  /**
   * Triggers on dropdown option click.
   * @property {string} value
   */
  "clickOption",
]);

provide("hideDropdownOptions", hideOptions);

const isShownOptions = ref(false);
const dropdownListRef = ref(null);

const elementId = props.id || useId();

const { config, dropdownButtonAttrs, dropdownListAttrs, dropdownIconAttrs, wrapperAttrs } =
  useAttrs(props, { isShownOptions });

const iconColor = computed(() => {
  return props.variant === BUTTON_VARIANT.primary ? "white" : props.color;
});

const iconSize = computed(() => {
  const sizes = {
    "2xs": "xs",
    xs: "xs",
    sm: "sm",
    md: "sm",
    lg: "md",
    xl: "md",
  };

  return sizes[props.size];
});

function onClickOption(option) {
  emit("clickOption", option);
}

function onClickButton() {
  isShownOptions.value = !isShownOptions.value;

  if (isShownOptions.value) {
    nextTick(() => dropdownListRef.value.wrapperRef.focus());
  }
}

function hideOptions() {
  isShownOptions.value = false;
}

function onClickList() {
  hideOptions();
}
</script>
