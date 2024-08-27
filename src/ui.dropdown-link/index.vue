<template>
  <div v-click-outside="hideOptions" v-bind="wrapperAttrs">
    <div v-bind="triggerAttrs">
      <ULink
        :id="id"
        :label="label"
        :size="size"
        :color="color"
        :dashed="dashed"
        :underlined="underlined"
        :disabled="disabled"
        :no-ring="noRing"
        :data-test="`${dataTest}-link`"
        v-bind="linkAttrs"
        @click="onClickLink"
      >
        <template #right>
          <UIcon
            v-if="!noIcon"
            internal
            interactive
            :name="config.defaults.dropdownIcon"
            :size="iconSize"
            :color="color"
            :data-test="`${dataTest}-caret`"
            v-bind="dropdownIconAttrs"
            @click="onClickLink"
          />
        </template>
      </ULink>
    </div>

    <div
      v-if="isShownOptions && hasSlotContent($slots['default'])"
      v-bind="listWrapperAttrs"
      @click="onClickList"
    >
      <!-- @slot Use it to add dropdown list. -->
      <slot />
    </div>

    <UDropdownList
      v-if="isShownOptions && !hasSlotContent($slots['default'])"
      v-model="selectedItem"
      :size="size"
      :options="options"
      :value-key="valueKey"
      :label-key="labelKey"
      :data-test="`${dataTest}-item`"
      v-bind="listAttrs"
      @click="onClickList"
    />
  </div>
</template>

<script setup>
import { computed, provide, ref, watch } from "vue";

import UIcon from "../ui.image-icon";
import ULink from "../ui.button-link";
import UDropdownList from "../ui.dropdown-list";

import { getRandomId, getDefault } from "../service.ui";

import vClickOutside from "../directive.clickOutside";

import { UDropdownLink } from "./constants";
import defaultConfig from "./configs/default.config";
import useAttrs from "./composables/attrs.composable";
import { UDropdownButton } from "../ui.dropdown-button/constants/index.js";

/* Should be a string for correct web-types gen */
defineOptions({ name: "UDropdownLink", inheritAttrs: false });

const props = defineProps({
  /**
   * Link label.
   */
  label: {
    type: String,
    default: "",
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
   * Value key in the item object of options.
   */
  valueKey: {
    type: String,
    default: getDefault(defaultConfig, UDropdownButton).valueKey,
  },

  /**
   * The position of dropdown list on the y-axis.
   * @values top, bottom
   */
  listYPosition: {
    type: String,
    default: getDefault(defaultConfig, UDropdownLink).listYPosition,
  },

  /**
   * The position of dropdown list on the x-axis.
   * @values left, right
   */
  listXPosition: {
    type: String,
    default: getDefault(defaultConfig, UDropdownLink).listXPosition,
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

const {
  config,
  listWrapperAttrs,
  wrapperAttrs,
  linkAttrs,
  listAttrs,
  dropdownIconAttrs,
  triggerAttrs,
  hasSlotContent,
} = useAttrs(props, { isShownOptions });

const iconSize = computed(() => {
  const sizes = {
    xs: "2xs",
    sm: "xs",
    md: "sm",
    lg: "md",
  };

  return sizes[props.size];
});

watch(selectedItem, () => {
  emit("select", selectedItem.value);
});

function onClickLink() {
  isShownOptions.value = !isShownOptions.value;
}

function hideOptions() {
  isShownOptions.value = false;
}

function onClickList() {
  hideOptions();
}
</script>
