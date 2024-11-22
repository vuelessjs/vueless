<template>
  <div v-click-outside="hideOptions" v-bind="wrapperAttrs">
    <ULink
      :id="elementId"
      :size="size"
      :label="label"
      :color="color"
      :dashed="dashed"
      :no-ring="noRing"
      :disabled="disabled"
      :underlined="underlined"
      v-bind="dropdownLinkAttrs"
      :data-test="dataTest"
      @click="onClickLink"
      @keydown.enter="onClickLink"
      @keydown.space.prevent="onClickLink"
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
            interactive
            :color="color"
            :size="iconSize"
            :name="config.defaults.dropdownIcon"
            v-bind="dropdownIconAttrs"
            :data-test="`${dataTest}-dropdown`"
            @click="onClickLink"
          />
        </slot>
      </template>
    </ULink>

    <UDropdownList
      v-if="isShownOptions"
      ref="dropdownListRef"
      :size="size"
      :options="options"
      :label-key="labelKey"
      :data-test="`${dataTest}-list`"
      v-bind="dropdownListAttrs"
      @click="onClickList"
      @click-option="onClickOption"
    />
  </div>
</template>

<script setup>
import { nextTick, computed, provide, ref, useId } from "vue";

import UIcon from "../ui.image-icon/UIcon.vue";
import ULink from "../ui.button-link/ULink.vue";
import UDropdownList from "../ui.dropdown-list/UDropdownList.vue";

import { getDefault } from "../utils/ui.ts";

import { vClickOutside } from "../directives";

import { UDropdownLink } from "./constants.js";
import defaultConfig from "./config.js";
import useAttrs from "./useAttrs.js";

defineOptions({ inheritAttrs: false });

const props = defineProps({
  /**
   * Link label.
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
    default: getDefault(defaultConfig, UDropdownLink).labelKey,
  },

  /**
   * Link color.
   * @values brand, grayscale, gray, red, orange, amber, yellow, lime, green, emerald, teal, cyan, sky, blue, indigo, violet, purple, fuchsia, pink, rose, white
   */
  color: {
    type: String,
    default: getDefault(defaultConfig, UDropdownLink).color,
  },

  /**
   * Link size.
   * @values sm, md, lg
   */
  size: {
    type: String,
    default: getDefault(defaultConfig, UDropdownLink).size,
  },

  /**
   * Add underline.
   */
  underlined: {
    type: Boolean,
    default: getDefault(defaultConfig, UDropdownLink).underlined,
  },

  /**
   * Set dashed underline style.
   */
  dashed: {
    type: Boolean,
    default: getDefault(defaultConfig, UDropdownLink).dashed,
  },

  /**
   * Disable the link.
   */
  disabled: {
    type: Boolean,
    default: getDefault(defaultConfig, UDropdownLink).disabled,
  },

  /**
   * Hide focus ring.
   */
  noRing: {
    type: Boolean,
    default: getDefault(defaultConfig, UDropdownLink).noRing,
  },

  /**
   * Hide dropdown icon.
   */
  noIcon: {
    type: Boolean,
    default: getDefault(defaultConfig, UDropdownLink).noIcon,
  },

  /**
   * The position of dropdown list on the y-axis.
   * @values top, bottom
   */
  yPosition: {
    type: String,
    default: getDefault(defaultConfig, UDropdownLink).yPosition,
  },

  /**
   * The position of dropdown list on the x-axis.
   * @values left, right
   */
  xPosition: {
    type: String,
    default: getDefault(defaultConfig, UDropdownLink).xPosition,
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

const { config, wrapperAttrs, dropdownLinkAttrs, dropdownListAttrs, dropdownIconAttrs } = useAttrs(
  props,
  { isShownOptions },
);

const iconSize = computed(() => {
  const sizes = {
    sm: "2xs",
    md: "xs",
    lg: "sm",
  };

  return sizes[props.size];
});

function onClickLink() {
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

function onClickOption(option) {
  emit("clickOption", option);
}
</script>
