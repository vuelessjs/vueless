<template>
  <div v-bind="wrapperAttrs">
    <input
      :id="id"
      v-model="selectedItem"
      :disabled="disabled"
      :value="value"
      :name="name"
      :type="type"
      v-bind="inputAttrs"
    />
    <label tabindex="0" :for="id" v-bind="labelAttrs" @click="onClickSetValue">
      <span v-if="hasSlotContent($slots['left'])">
        <!-- @slot Use it to add some content before label. -->
        <slot name="left" />
      </span>

      <!-- @slot Use it to add some content instead of label. -->
      <slot />
      <span v-if="!hasSlotContent($slots['default'])" v-bind="labelTextAttrs" v-text="label" />

      <span v-if="hasSlotContent($slots['right'])">
        <!-- @slot Use it to add some content after label. -->
        <slot name="right" />
      </span>
    </label>
  </div>
</template>

<script setup>
import { inject, onMounted, ref } from "vue";
import UIService, { getRandomId } from "../service.ui";

import { TYPE_RADIO } from "../ui.button-toggle/constants";

import { useAttrs } from "./composables/attrs.composable";
import defaultConfig from "./configs/default.config";
import { UToggleItem } from "./constants";

/* Should be a string for correct web-types gen */
defineOptions({ name: "UToggleItem", inheritAttrs: false });

const props = defineProps({
  /**
   * Set data for button.
   */
  modelValue: {
    type: [String, Number, Array],
    default: "",
  },

  /**
   * Set value for checkbox state.
   */
  value: {
    type: [String, Number],
    default: "",
  },

  /**
   * Set label.
   */
  label: {
    type: String,
    default: "",
  },

  /**
   * Make item disabled.
   */
  disabled: {
    type: Boolean,
    default: UIService.get(defaultConfig, UToggleItem).default.disabled,
  },

  /**
   * The variant of the button.
   * @values primary, secondary, thirdary
   */
  variant: {
    type: String,
    default: UIService.get(defaultConfig, UToggleItem).default.variant,
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
   * Sets component ui config object.
   */
  config: {
    type: Object,
    default: () => ({}),
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

const type = inject("toggleType", UIService.get(defaultConfig, UToggleItem).default.type);
const name = inject("toggleName", "toggle");
const size = inject("toggleSize", UIService.get(defaultConfig, UToggleItem).default.size);
const block = inject("toggleBlock", UIService.get(defaultConfig, UToggleItem).default.block);
const { selectedValue, updateSelectedValue } = inject("toggleSelectedValue", {});

const { wrapperAttrs, labelTextAttrs, labelAttrs, inputAttrs, hasSlotContent } = useAttrs(props, {
  size,
  block,
});

const selectedItem = ref("");

onMounted(() => {
  if (type.value === TYPE_RADIO) {
    selectedItem.value = selectedValue ? selectedValue.value : selectedItem.value;
  } else {
    selectedItem.value = selectedValue
      ? selectedValue.value.includes(props.value)
      : selectedItem.value;
  }
});

function onClickSetValue() {
  if (type.value === TYPE_RADIO) {
    selectedItem.value = props.value;
  }

  if (updateSelectedValue) {
    updateSelectedValue(props.value, !selectedItem.value);
  }

  emit("update:modelValue", props.value);
}
</script>
