<template>
  <div v-click-outside="hideOptions" v-bind="wrapperAttrs">
    <UBadge
      :id="id"
      :label="label"
      :size="size"
      :color="color"
      :weight="weight"
      :variant="variant"
      :data-test="`${dataTest}-badge`"
      v-bind="dropdownBadgeAttrs"
      @click="onClickBadge"
    >
      <!--
        @slot Use it to add something left.
        @binding {boolean} isOpened
      -->
      <template #left>
        <slot name="left" :is-opened="isShownOptions" />
      </template>

      <template #default>
        <!--
          @slot Use it to add something instead of the default label.
          @binding {string} label
          @binding {boolean} isOpened
        -->
        <slot :label="label" :is-opened="isShownOptions" />
      </template>

      <template #right-icon>
        <UIcon
          v-if="!noIcon"
          internal
          :name="config.defaults.dropdownIcon"
          :size="iconSize"
          :color="color"
          :data-test="`${dataTest}-caret`"
          v-bind="dropdownIconAttrs"
        />
      </template>

      <template #right>
        <!--
          @slot Use it to add something right.
          @binding {boolean} isOpened
        -->
        <slot name="right" :is-opened="isShownOptions" />
      </template>
    </UBadge>

    <UDropdownList
      v-if="isShownOptions"
      v-model="selectedItem"
      :size="size"
      :options="options"
      :value-key="valueKey"
      :label-key="labelKey"
      :data-test="`${dataTest}-item`"
      v-bind="dropdownListAttrs"
      @click="onClickList"
    />
  </div>
</template>

<script setup>
import { computed, provide, ref, watch } from "vue";

import UIcon from "../ui.image-icon";
import UBadge from "../ui.text-badge";
import UDropdownList from "../ui.dropdown-list";

import { getRandomId, getDefault } from "../service.ui";

import vClickOutside from "../directive.clickOutside";

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
   * Badge font weight.
   * @values regular, medium, bold
   */
  weight: {
    type: String,
    default: getDefault(defaultConfig, UDropdownBadge).weight,
  },

  /**
   * Hide dropdown icon.
   */
  noIcon: {
    type: Boolean,
    default: getDefault(defaultConfig, UDropdownBadge).noIcon,
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
   * The position of dropdown list on the y-axis.
   * @values top, bottom
   */
  listYPosition: {
    type: String,
    default: getDefault(defaultConfig, UDropdownBadge).listYPosition,
  },

  /**
   * The position of dropdown list on the x-axis.
   * @values left, right
   */
  listXPosition: {
    type: String,
    default: getDefault(defaultConfig, UDropdownBadge).listXPosition,
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

const iconSize = computed(() => {
  const sizes = {
    sm: "2xs",
    md: "xs",
    lg: "sm",
  };

  return sizes[props.size];
});

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
