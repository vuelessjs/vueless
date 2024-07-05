<template>
  <ULabel
    ref="labelComponent"
    :for="id"
    :label="label"
    :error="error"
    :description="description"
    :size="size"
    :disabled="disabled"
    :data-cy="dataCy"
    :align="labelAlign"
    v-bind="labelAttrs"
  >
    <label
      v-if="hasSlotContent($slots['left'])"
      ref="leftSlotWrapper"
      :for="id"
      v-bind="leftSlotAttrs"
    >
      <!-- @slot Use it to add some component before text. -->
      <slot name="left" />
    </label>
    <label ref="textareaWrapper" :for="id" v-bind="textareaWrapperAttrs">
      <textarea
        :id="id"
        ref="textarea"
        v-model="localValue"
        :value="modelValue"
        :placeholder="placeholder"
        :readonly="readonly"
        :disabled="disabled"
        :rows="rows"
        :inputmode="inputmode"
        :data-cy="dataCy"
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
      <!-- @slot Use it to add some component after text. -->
      <slot name="right" />
    </label>
  </ULabel>
</template>

<script setup>
import { computed, onMounted, ref, useSlots } from "vue";

import ULabel from "../ui.form-label";
import UIService, { getRandomId } from "../service.ui";

import { UTextarea } from "./constants";
import defaultConfig from "./configs/default.config";
import { useAttrs } from "./composables/attrs.composable";

/* Should be a string for correct web-types gen */
defineOptions({ name: "UTextarea", inheritAttrs: false });

const props = defineProps({
  /**
   * Set input size.
   * @values sm, md, lg
   */
  size: {
    type: String,
    default: UIService.get(defaultConfig, UTextarea).default.size,
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
   * @values top, topInside, topWithDesc, bottom, left, right
   */
  labelAlign: {
    type: String,
    default: UIService.get(defaultConfig, UTextarea).default.labelAlign,
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
    default: UIService.get(defaultConfig, UTextarea).default.readonly,
  },

  /**
   * Make input disabled.
   */
  disabled: {
    type: Boolean,
    default: UIService.get(defaultConfig, UTextarea).default.disabled,
  },

  /**
   * Set proper keyboard on mobile devices.
   * @values text, decimal, numeric, tel, email, url, search, none
   */
  inputmode: {
    type: String,
    default: UIService.get(defaultConfig, UTextarea).default.inputmode,
  },

  /**
   * Disable browsers autocomplete.
   */
  noAutocomplete: {
    type: Boolean,
    default: UIService.get(defaultConfig, UTextarea).default.noAutocomplete,
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
    default: UIService.get(defaultConfig, UTextarea).default.rows,
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

const emit = defineEmits(["change", "click", "focus", "blur", "update:modelValue", "mousedown"]);

const slots = useSlots();

const {
  textareaAttrs,
  labelAttrs,
  textareaWrapperAttrs,
  leftSlotAttrs,
  rightSlotAttrs,
  hasSlotContent,
} = useAttrs(props);

const textarea = ref(null);
const labelComponent = ref(null);
const leftSlotWrapper = ref(null);
const textareaWrapper = ref(null);

const localValue = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});

defineExpose({ textarea });

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

  const leftSlotWidth = leftSlotWrapper.value.getBoundingClientRect().width;

  if (labelComponent.value.labelElement) {
    labelComponent.value.labelElement.style.left = `${leftSlotWidth}px`;
  }

  textareaWrapper.value.style.paddingLeft = `${leftSlotWidth}px`;
}

onMounted(() => setLabelPosition());
</script>
