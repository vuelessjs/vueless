<template>
  <div v-click-outside="hideOptions" v-bind="wrapperAttrs">
    <UBadge
      :id="elementId"
      :label="label"
      :size="size"
      :color="color"
      :variant="variant"
      v-bind="dropdownBadgeAttrs"
      tabindex="0"
      :data-test="dataTest"
      @click="onClickBadge"
      @keydown.enter="onClickBadge"
      @keydown.space.prevent="onClickBadge"
    >
      <template #left>
        <!--
          @slot Use it to add something before the label.
          @binding {boolean} isOpened
        -->
        <slot name="left" :opened="isShownOptions" />
      </template>

      <template #default>
        <!--
          @slot Use it to add something instead of the default label.
          @binding {string} label
          @binding {boolean} isOpened
        -->
        <slot :label="label" :opened="isShownOptions" />
      </template>

      <template #right="{ iconColor, iconSize }">
        <!--
          @slot Use it to add something after the label.
          @binding {boolean} isOpened
        -->
        <slot name="right" :label="label" :opened="isShownOptions">
          <UIcon
            v-if="!noIcon"
            internal
            :color="iconColor"
            :size="iconSize"
            :name="config.defaults.dropdownIcon"
            v-bind="dropdownIconAttrs"
            :data-test="`${dataTest}-dropdown`"
          />
        </slot>
      </template>
    </UBadge>

    <UDropdownList
      v-if="isShownOptions"
      ref="dropdownListRef"
      :size="size"
      :options="options"
      :label-key="labelKey"
      v-bind="dropdownListAttrs"
      :data-test="`${dataTest}-list`"
      @click-option="onClickOption"
    />
  </div>
</template>

<script setup>
import { nextTick, ref, useId } from "vue";

import UIcon from "../ui.image-icon/UIcon.vue";
import UBadge from "../ui.text-badge/UBadge.vue";
import UDropdownList from "../ui.dropdown-list/UDropdownList.vue";

import { getDefault } from "../utils/utilUI.js";

import vClickOutside from "../directives/vClickOutside.js";

import defaultConfig from "./config.js";
import { UDropdownBadge } from "./constants.js";
import useAttrs from "./useAttrs.js";

defineOptions({ inheritAttrs: false });

const props = defineProps({
  /**
   * Badge label.
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
    default: getDefault(defaultConfig, UDropdownBadge).labelKey,
  },

  /**
   * Badge variant.
   * @values primary, secondary, thirdary
   */
  variant: {
    type: String,
    default: getDefault(defaultConfig, UDropdownBadge).variant,
  },

  /**
   * Badge color.
   * @values brand, grayscale, gray, red, orange, amber, yellow, lime, green, emerald, teal, cyan, sky, blue, indigo, violet, purple, fuchsia, pink, rose, white
   */
  color: {
    type: String,
    default: getDefault(defaultConfig, UDropdownBadge).color,
  },

  /**
   * Badge size.
   * @values sm, md, lg
   */
  size: {
    type: String,
    default: getDefault(defaultConfig, UDropdownBadge).size,
  },

  /**
   * Set badge corners rounded.
   */
  round: {
    type: Boolean,
    default: getDefault(defaultConfig, UDropdownBadge).round,
  },

  /**
   * Hide dropdown icon.
   */
  noIcon: {
    type: Boolean,
    default: getDefault(defaultConfig, UDropdownBadge).noIcon,
  },

  /**
   * The position of dropdown list on the y-axis.
   * @values top, bottom
   */
  yPosition: {
    type: String,
    default: getDefault(defaultConfig, UDropdownBadge).yPosition,
  },

  /**
   * The position of dropdown list on the x-axis.
   * @values left, right
   */
  xPosition: {
    type: String,
    default: getDefault(defaultConfig, UDropdownBadge).xPosition,
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

const isShownOptions = ref(false);
const dropdownListRef = ref(null);

const elementId = props.id || useId();

const { config, wrapperAttrs, dropdownBadgeAttrs, dropdownListAttrs, dropdownIconAttrs } = useAttrs(
  props,
  {
    isShownOptions,
  },
);

function onClickBadge() {
  isShownOptions.value = !isShownOptions.value;

  if (isShownOptions.value) {
    nextTick(() => dropdownListRef.value.wrapperRef.focus());
  }
}

function hideOptions() {
  isShownOptions.value = false;
}

function onClickOption(option) {
  emit("clickOption", option);

  hideOptions();
}
</script>
