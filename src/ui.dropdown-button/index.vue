<template>
  <div v-click-outside="hideOptions" v-bind="wrapperAttrs">
    <UButton
      :id="id"
      :label="label"
      :size="size"
      :variant="variant"
      :filled="filled || isShownOptions"
      :color="color"
      :pill="pill"
      :square="square"
      :disabled="disabled"
      :data-cy="`${dataCy}-button`"
      v-bind="buttonAttrs"
      @click="onClickButton"
    >
      <template #icon-right>
        <UIcon
          v-if="!noIcon"
          internal
          :name="config.iconName"
          :size="iconSize"
          :color="iconColor"
          :data-cy="`${dataCy}-caret`"
          v-bind="iconAttrs"
        />
      </template>
    </UButton>

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
      :data-cy="`${dataCy}-item`"
      tabindex="-1"
      v-bind="listAttrs"
      @click="onClickList"
    />
  </div>
</template>

<script setup>
import { computed, provide, ref, watch } from "vue";

import UIcon from "../ui.image-icon";
import UButton from "../ui.button";
import UDropdownList from "../ui.dropdown-list";

import UIService, { getRandomId } from "../service.ui";

import vClickOutside from "../directive.clickOutside";

import defaultConfig from "./configs/default.config";
import useAttrs from "./composables/attrs.composable";
import { UDropdownButton, BUTTON_VARIANT } from "./constants";

/* Should be a string for correct web-types gen */
defineOptions({ name: "UDropdownButton", inheritAttrs: false });

const props = defineProps({
  /**
   * Selected value.
   */
  modelValue: {
    type: [String, Number],
    default: "",
  },

  /**
   * Button label.
   */
  label: {
    type: String,
    default: "",
  },

  /**
   * Button variant.
   * @values primary, secondary, thirdary
   */
  variant: {
    type: String,
    default: UIService.get(defaultConfig, UDropdownButton).default.variant,
  },

  /**
   * Fill the background for thirdary variant.
   */
  filled: {
    type: Boolean,
    default: UIService.get(defaultConfig, UDropdownButton).default.filled,
  },

  /**
   * Button color.
   * @values brand, grayscale, gray, red, orange, amber, yellow, lime, green, emerald, teal, cyan, sky, blue, indigo, violet, purple, fuchsia, pink, rose, white
   */
  color: {
    type: String,
    default: UIService.get(defaultConfig, UDropdownButton).default.color,
  },

  /**
   * Button size.
   * @values 2xs, xs, sm, md, lg, xl
   */
  size: {
    type: String,
    default: UIService.get(defaultConfig, UDropdownButton).default.size,
  },

  /**
   * Set button corners rounded.
   */
  pill: {
    type: Boolean,
    default: UIService.get(defaultConfig, UDropdownButton).default.pill,
  },

  /**
   * Set the same paddings for the button.
   */
  square: {
    type: Boolean,
    default: UIService.get(defaultConfig, UDropdownButton).default.square,
  },

  /**
   * Disable the link.
   */
  disabled: {
    type: Boolean,
    default: UIService.get(defaultConfig, UDropdownButton).default.disabled,
  },

  /**
   * Hide dropdown icon.
   */
  noIcon: {
    type: Boolean,
    default: UIService.get(defaultConfig, UDropdownButton).default.noIcon,
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
    default: UIService.get(defaultConfig, UDropdownButton).default.labelKey,
  },

  /**
   * Value key in the item object of options.
   */
  valueKey: {
    type: String,
    default: UIService.get(defaultConfig, UDropdownButton).default.valueKey,
  },

  /**
   * The position of dropdown list on the y-axis.
   * @values top, bottom
   */
  listYPosition: {
    type: String,
    default: UIService.get(defaultConfig, UDropdownButton).default.listYPosition,
  },

  /**
   * The position of dropdown list on the x-axis.
   * @values left, right
   */
  listXPosition: {
    type: String,
    default: UIService.get(defaultConfig, UDropdownButton).default.listXPosition,
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
   * Data-cy attribute for automated testing.
   */
  dataCy: {
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
  buttonAttrs,
  listAttrs,
  iconAttrs,
  wrapperAttrs,
  hasSlotContent,
} = useAttrs(props, { isShownOptions });

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

watch(selectedItem, () => {
  emit("select", selectedItem.value);
});

function onClickButton() {
  isShownOptions.value = !isShownOptions.value;
}

function hideOptions() {
  isShownOptions.value = false;
}

function onClickList() {
  hideOptions();
}
</script>
