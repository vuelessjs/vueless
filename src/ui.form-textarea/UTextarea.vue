<template>
  <ULabel
    ref="labelComponentRef"
    :for="elementId"
    :label="label"
    :error="error"
    :description="description"
    :size="size"
    :disabled="disabled"
    :data-test="dataTest"
    :align="labelAlign"
    v-bind="textareaLabelAttrs"
  >
    <label
      v-if="hasSlotContent($slots['left'])"
      ref="leftSlotWrapperRef"
      :for="elementId"
      v-bind="leftSlotAttrs"
    >
      <!-- @slot Use it to add something before the text. -->
      <slot name="left" />
    </label>
    <label ref="textareaWrapperRef" :for="elementId" v-bind="textareaWrapperAttrs">
      <textarea
        :id="elementId"
        ref="textareaRef"
        v-model="localValue"
        :value="modelValue"
        :placeholder="placeholder"
        :readonly="readonly"
        :disabled="disabled"
        :rows="currentRows"
        :inputmode="inputmode"
        :data-test="dataTest"
        v-bind="textareaAttrs"
        @focus="onFocus"
        @blur="onBlur"
        @change="onChange"
        @mouseleave="onMouseleave"
        @mousedown="onMousedown"
        @click="onClick"
        @keydown.enter="onEnter"
        @keydown.backspace="onBackspace"
      />
    </label>
    <label v-if="hasSlotContent($slots['right'])" :for="elementId" v-bind="rightSlotAttrs">
      <!-- @slot Use it to add something after the text. -->
      <slot name="right" />
    </label>
  </ULabel>
</template>

<script setup>
import { computed, onMounted, ref, watch, useSlots, useId } from "vue";

import ULabel from "../ui.form-label/ULabel.vue";
import { getDefault } from "../utils/utilUI.js";

import { UTextarea } from "./constants.js";
import defaultConfig from "./config.js";
import useAttrs from "./useAttrs.js";

defineOptions({ inheritAttrs: false });

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
   * Allow resizing of the textarea.
   */
  resizable: {
    type: Boolean,
    default: getDefault(defaultConfig, UTextarea).resizable,
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
    type: [String, Number],
    default: getDefault(defaultConfig, UTextarea).rows,
  },

  /**
   * Unique element id.
   */
  id: {
    type: String,
    default: "",
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

const elementId = props.id || useId();

const {
  textareaAttrs,
  textareaLabelAttrs,
  textareaWrapperAttrs,
  leftSlotAttrs,
  rightSlotAttrs,
  hasSlotContent,
} = useAttrs(props);

const textareaRef = ref(null);
const labelComponentRef = ref(null);
const leftSlotWrapperRef = ref(null);
const textareaWrapperRef = ref(null);

const currentRows = ref(props.rows);

watch(
  () => props.rows,
  (newRows) => {
    currentRows.value = newRows;
  },
);

function onEnter() {
  currentRows.value++;
}

function onBackspace() {
  const textarea = textareaRef.value;

  if (!textarea) return;

  const content = textarea.value;
  const newlineCount = (content.match(/\n/g) || []).length;
  const newRowCount = Math.max(props.rows, newlineCount + 1);

  if (newRowCount < currentRows.value) {
    currentRows.value = newRowCount;
  }
}

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
