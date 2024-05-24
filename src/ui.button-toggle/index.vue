<template>
  <div ref="wrapperRef" :data-cy="dataCy" v-bind="wrapperAttrs">
    <slot>
      <UToggleItem
        v-for="(item, index) in options"
        :key="item.value"
        :name="name"
        :model-value="item.value"
        :value="item.value"
        :label="item.label"
        :data-cy="`${dataCy}-item-${index}`"
        v-bind="toggleItemAttrs"
      />
    </slot>
  </div>
</template>

<script setup>
import { computed, provide, readonly, ref } from "vue";

import UToggleItem from "../ui.button-toggle-item";
import UIService from "../service.ui";

import defaultConfig from "./configs/default.config";
import { UToggle, TYPE_RADIO, TYPE_CHECKBOX } from "./constants";
import { useAttrs } from "./composables/attrs.composable";

/* Should be a string for correct web-types gen */
defineOptions({ name: "UToggle", inheritAttrs: false });

const props = defineProps({
  /**
   * Set buttons name.
   */
  name: {
    type: String,
    required: true,
  },

  /**
   * Set data for buttons.
   */
  options: {
    type: Array,
    default: () => [],
  },

  /**
   * Set current value.
   */
  modelValue: {
    type: [String, Number, Array],
    default: () => (!this.multiple ? "" : []),
  },

  /**
   * Allow to select a few options and return them as array.
   */
  multiple: {
    type: Boolean,
    default: UIService.get(defaultConfig, UToggle).default.multiple,
  },

  /**
   * The size of the buttons.
   * @values xs, sm, md, lg
   */
  size: {
    type: String,
    default: UIService.get(defaultConfig, UToggle).default.size,
  },

  /**
   * Make the toggle fill the width with its container.
   */
  block: {
    type: Boolean,
    default: UIService.get(defaultConfig, UToggle).default.block,
  },

  /**
   * Sets data-cy attribute for automated testing.
   */
  dataCy: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:modelValue"]);

const { wrapperAttrs, toggleItemAttrs } = useAttrs(props);

const wrapperRef = ref();

const selectedValue = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const type = computed(() => (props.multiple ? TYPE_CHECKBOX : TYPE_RADIO));

function updateSelectedValue(value, checked) {
  if (type.value === TYPE_RADIO) {
    selectedValue.value = value;

    return;
  }

  if (!checked) {
    selectedValue.value = selectedValue.value.filter((item) => item !== value);
  } else {
    selectedValue.value.push(value);
  }
}

provide("toggleName", () => props.name);

provide("toggleSize", () => props.size);

provide("toggleBlock", () => props.block);

provide("toggleType", readonly(type));

provide("toggleSelectedValue", {
  selectedValue: readonly(selectedValue),
  updateSelectedValue,
});
</script>
