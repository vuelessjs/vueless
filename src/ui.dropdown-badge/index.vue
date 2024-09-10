<template>
  <div v-click-outside="hideOptions" v-bind="wrapperAttrs">
    <UBadge
      :id="id"
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
      v-model="selectedItem"
      :size="size"
      :options="options"
      :value-key="valueKey"
      :label-key="labelKey"
      v-bind="dropdownListAttrs"
      :data-test="`${dataTest}-list`"
      @click="onClickList"
    />
  </div>
</template>

<script setup>
import { provide, ref, watch } from "vue";

import UIcon from "../ui.image-icon";
import UBadge from "../ui.text-badge";
import UDropdownList from "../ui.dropdown-list";

import { getRandomId, getDefault } from "../utils/utilsUI";

import vClickOutside from "../directives/vClickOutside";

import defaultConfig from "./configs/default.config";
import { UDropdownBadge } from "./constants";
import useAttrs from "./composables/attrs.composable";

/* Should be a string for correct web-types gen */
defineOptions({ name: "UDropdownBadge", inheritAttrs: false });

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
   * Value key in the item object of options.
   */
  valueKey: {
    type: String,
    default: getDefault(defaultConfig, UDropdownBadge).valueKey,
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
   * Generates unique element id.
   * @ignore
   */
  id: {
    type: String,
    default: () => getRandomId(),
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
   * Triggers when dropdown option is selected.
   * @property {string} value
   */
  "select",
]);

provide("hideDropdownOptions", hideOptions);

const isShownOptions = ref(false);
const selectedItem = ref("");

const { config, wrapperAttrs, dropdownBadgeAttrs, dropdownListAttrs, dropdownIconAttrs } = useAttrs(
  props,
  {
    isShownOptions,
  },
);

watch(selectedItem, () => {
  emit("select", selectedItem.value);
});

function onClickBadge() {
  isShownOptions.value = !isShownOptions.value;
}

function hideOptions() {
  isShownOptions.value = false;
}

function onClickList() {
  hideOptions();
}
</script>
