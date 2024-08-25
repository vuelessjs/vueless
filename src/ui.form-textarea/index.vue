<template>
  <ULabel
    ref="labelComponentRef"
    :for="id"
    :label="label"
    :error="error"
    :description="description"
    :size="size"
    :disabled="disabled"
    :data-test="dataTest"
    :align="labelAlign"
    v-bind="labelAttrs"
  >
    <label
      v-if="hasSlotContent($slots['left'])"
      ref="leftSlotWrapperRef"
      :for="id"
      v-bind="leftSlotAttrs"
    >
      <!-- @slot Use it to add something before the text. -->
      <slot name="left" />
    </label>
    <label ref="textareaWrapperRef" :for="id" v-bind="textareaWrapperAttrs">
      <textarea
        :id="id"
        ref="textareaRef"
        v-model="localValue"
        :value="modelValue"
        :placeholder="placeholder"
        :readonly="readonly"
        :disabled="disabled"
        :rows="rows"
        :inputmode="inputmode"
        :data-test="dataTest"
        v-bind="textareaAttrs"
        @focus="onFocus"
        @blur="onBlur"
        @change="onChange"
        @mouseleave="onMouseleave"
        @mousedown="onMousedown"
        @click="onClick"
      />
    </label>
    <label v-if="hasSlotContent($slots['right'])" :for="id" v-bind="rightSlotAttrs">
      <!-- @slot Use it to add something after the text. -->
      <slot name="right" />
    </label>
  </ULabel>
</template>

<script setup>
import { computed, onMounted, ref, useSlots } from "vue";

import ULabel from "../ui.form-label";
import { getRandomId, getDefault } from "../service.ui";

import { UTextarea } from "./constants";
import defaultConfig from "./configs/default.config";
import useAttrs from "./composables/attrs.composable";

/* Should be a string for correct web-types gen */
defineOptions({ name: "UTextarea", inheritAttrs: false });

const props = defineProps({
  /**
   * Set input size.
   * @values sm, md, lg
   */
  size: {
    type: String,
    default: getDefault(defaultConfig, UTextarea).size,
  },

  /**
   * Set component value.
   */
  modelValue: {
    type: String,
    default: "",
  },

  /**
   * Set component placeholder.
   */
  placeholder: {
    type: String,
    default: "",
  },

  /**
   * Set input label.
   */
  label: {
    type: String,
    default: "",
  },

  /**
   * Set label placement related from the default slot.
   * @values top, topInside, topWithDesc, left, right
   */
  labelAlign: {
    type: String,
    default: getDefault(defaultConfig, UTextarea).labelAlign,
  },

  /**
   * Set description for component.
   */
  description: {
    type: String,
    default: "",
  },

  /**
   * Make textarea read only.
   */
  readonly: {
    type: Boolean,
    default: getDefault(defaultConfig, UTextarea).readonly,
  },

  /**
   * Make input disabled.
   */
  disabled: {
    type: Boolean,
    default: getDefault(defaultConfig, UTextarea).disabled,
  },

  /**
   * Set proper keyboard on mobile devices.
   * @values text, decimal, numeric, tel, email, url, search, none
   */
  inputmode: {
    type: String,
    default: getDefault(defaultConfig, UTextarea).inputmode,
  },

  /**
   * Disable browsers autocomplete.
   */
  noAutocomplete: {
    type: Boolean,
    default: getDefault(defaultConfig, UTextarea).noAutocomplete,
  },

  /**
   * Set error message.
   */
  error: {
    type: String,
    default: "",
  },

  /**
   * Set number of visible rows.
   */
  rows: {
    type: String,
    default: getDefault(defaultConfig, UTextarea).rows,
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
   * Data-test attribute for automated testing.
   */
  dataTest: {
    type: String,
    default: "",
  },
});

const emit = defineEmits([
  /**
   * Triggers when the textarea value changes.
   * @property {string} value
   */
  "update:modelValue",

  /**
   * Triggers when the textarea value changes.
   */
  "change",

  /**
   * Triggers when the textarea is clicked.
   */
  "click",

  /**
   * Triggers when the textarea is focused.
   */
  "focus",

  /**
   * Triggers when the textarea loses focus.
   */
  "blur",

  /**
   * Triggers when mouse button is released over the element.
   */
  "mousedown",
]);

const slots = useSlots();

const {
  textareaAttrs,
  labelAttrs,
  textareaWrapperAttrs,
  leftSlotAttrs,
  rightSlotAttrs,
  hasSlotContent,
} = useAttrs(props);

const textareaRef = ref(null);
const labelComponentRef = ref(null);
const leftSlotWrapperRef = ref(null);
const textareaWrapperRef = ref(null);

const localValue = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});

defineExpose({ textareaRef });

onMounted(() => toggleReadonly(true));

function onChange() {
  emit("change");
}

function onClick(event) {
  toggleReadonly(false);

  emit("click", event);
}

function onFocus() {
  toggleReadonly(false);

  emit("focus");
}

function onBlur() {
  toggleReadonly(true);

  emit("blur");
}

function onMouseleave() {
  toggleReadonly(true);
}

function onMousedown() {
  emit("mousedown");
}

function toggleReadonly(hasReadonly) {
  if (props.noAutocomplete && !props.readonly) {
    const textarea = document.getElementById(props.id);

    hasReadonly
      ? textarea.setAttribute("readonly", "readonly")
      : textarea.removeAttribute("readonly");
  }
}

function setLabelPosition() {
  if (props.labelAlign === "top" || !hasSlotContent(slots["left"])) return;

  const leftSlotWidth = leftSlotWrapperRef.value.getBoundingClientRect().width;

  if (labelComponentRef.value.labelElement) {
    labelComponentRef.value.labelElement.style.left = `${leftSlotWidth}px`;
  }

  textareaWrapperRef.value.style.paddingLeft = `${leftSlotWidth}px`;
}

onMounted(() => setLabelPosition());
</script>
