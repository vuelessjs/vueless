<template>
  <UButton
    tag="label"
    tabindex="0"
    :for="id"
    :label="label"
    :size="toValue(size)"
    :block="toValue(block)"
    :variant="toValue(variant)"
    v-bind="buttonAttrs"
    @click="onClickSetValue"
  >
    <template #left>
      <slot name="left" />
    </template>

    <template #default>
      <input
        :id="id"
        v-model="selectedItem"
        :name="name"
        :type="type"
        :value="value"
        :disabled="disabled"
        v-bind="inputAttrs"
      />

      <slot name="default" />
    </template>

    <template #right>
      <slot name="right" />
    </template>
  </UButton>
</template>

<script setup>
import { inject, onMounted, ref, toValue } from "vue";

import UButton from "../ui.button";
import UIService, { getRandomId } from "../service.ui";

import { TYPE_RADIO } from "../ui.button-toggle/constants";

import { useAttrs } from "./composables/attrs.composable";
import defaultConfig from "./configs/default.config";
import { UToggleItem } from "./constants";

/* Should be a string for correct web-types gen */
defineOptions({ name: "UToggleItem", inheritAttrs: false });

const props = defineProps({
  /**
   * Selected value.
   */
  modelValue: {
    type: [String, Number, Array],
    default: "",
  },

  /**
   * Value for checkbox state.
   */
  value: {
    type: [String, Number],
    default: "",
  },

  /**
   * Toggle item label.
   */
  label: {
    type: String,
    default: "",
  },

  /**
   * Make toggle item disabled.
   */
  disabled: {
    type: Boolean,
    default: UIService.get(defaultConfig, UToggleItem).default.disabled,
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

const emit = defineEmits(["update:modelValue"]);

const name = inject("toggleName", () => "toggle");
const type = inject("toggleType", UIService.get(defaultConfig, UToggleItem).default.type);
const size = inject("toggleSize", UIService.get(defaultConfig, UToggleItem).default.size);
const block = inject("toggleBlock", UIService.get(defaultConfig, UToggleItem).default.block);
const variant = inject("toggleVariant", UIService.get(defaultConfig, UToggleItem).default.variant);
const { selectedValue, updateSelectedValue } = inject("toggleSelectedValue", {});

const { buttonAttrs, inputAttrs } = useAttrs(props);

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
