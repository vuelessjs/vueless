<template>
  <ULabel
    :for="id"
    :label="label"
    :size="radioSize"
    :align="labelAlign"
    :description="description"
    :disabled="disabled"
    :data-cy="dataCy"
    v-bind="labelAttrs"
  >
    <input
      :id="id"
      type="radio"
      :disabled="disabled"
      :name="radioName"
      :value="radioValue"
      :checked="checked"
      :data-cy="dataCy"
      v-bind="radioAttrs"
      @focus="onFocus"
    />

    <slot />

    <template #footer>
      <slot name="footer" />
    </template>
  </ULabel>
</template>

<script setup>
import { computed, inject, onMounted, ref, watchEffect } from "vue";

import ULabel from "../ui.form-label";
import UIService, { getRandomId } from "../service.ui";

import defaultConfig from "./configs/default.config";
import { useAttrs } from "./composables/attrs.composable";
import { URadio } from "./constants";

/* Should be a string for correct web-types gen */
defineOptions({ name: "URadio", inheritAttrs: false });

const props = defineProps({
  /**
   * Native value attribute.
   */
  value: {
    type: [Boolean, String, Number, Array, Object],
    default: "",
  },

  /**
   * Radio label.
   */
  label: {
    type: String,
    default: "",
  },

  /**
   * Radio description.
   */
  description: {
    type: [String, Object],
    default: "",
  },

  /**
   * Radio name.
   */
  name: {
    type: String,
    default: "",
  },

  /**
   * Radio size.
   * @values xs, sm, md, lg, xl
   */
  size: {
    type: String,
    default: UIService.get(defaultConfig, URadio).default.size,
  },

  /**
   * Radio color.
   * @values brand, grayscale, red, orange, amber, yellow, lime, green, emerald, teal, cyan, sky, blue, indigo, violet, purple, fuchsia, pink, rose
   */
  color: {
    type: String,
    default: UIService.get(defaultConfig, URadio).default.color,
  },

  /**
   * Set label placement related from the default slot.
   * @values top, topInside, topWithDesc, bottom, left, right
   */
  labelAlign: {
    type: String,
    default: UIService.get(defaultConfig, URadio).default.labelAlign,
  },

  /**
   * Set radio disabled.
   */
  disabled: {
    type: Boolean,
    default: UIService.get(defaultConfig, URadio).default.disabled,
  },

  /**
   * Set radio checked.
   */
  checked: {
    type: Boolean,
    default: UIService.get(defaultConfig, URadio).default.checked,
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

const setRadioGroupSelectedItem = inject("setRadioGroupSelectedItem", null);
const getRadioGroupName = inject("getRadioGroupName", null);
const getRadioGroupColor = inject("getRadioGroupColor", null);
const getRadioGroupSize = inject("getRadioGroupSize", null);

const radioName = ref("");
const radioColor = ref(getRadioGroupColor ? getRadioGroupColor() : props.color);
const radioSize = ref(getRadioGroupSize ? getRadioGroupSize() : props.size);

const { radioAttrs, labelAttrs } = useAttrs(props, { radioColor, radioSize });

const radioValue = computed(() => {
  return props.value === "" ? "on" : props.value;
});

onMounted(() => {
  radioName.value = props.name || getRadioGroupName;
});

watchEffect(() => (radioColor.value = getRadioGroupColor ? getRadioGroupColor() : props.color));
watchEffect(() => (radioSize.value = getRadioGroupSize ? getRadioGroupSize() : props.size));

function onFocus(event) {
  setRadioGroupSelectedItem && setRadioGroupSelectedItem(props.value);

  emit("update:modelValue", event.target.value);
}
</script>
