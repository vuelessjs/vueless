<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch, useSlots, useId, useTemplateRef } from "vue";

import useUI from "../composables/useUI";
import { getDefaults } from "../utils/ui";
import { hasSlotContent } from "../utils/helper";

import { useMutationObserver } from "../composables/useMutationObserver";

import ULabel from "../ui.form-label/ULabel.vue";

import { COMPONENT_NAME } from "./constants";
import defaultConfig from "./config";

import type { Props, Config } from "./types";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<Props>(), {
  ...getDefaults<Props, Config>(defaultConfig, COMPONENT_NAME),
  modelValue: "",
  label: "",
  placeholder: "",
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

const textareaRef = useTemplateRef<HTMLTextAreaElement>("textarea");
const labelComponentRef = useTemplateRef<InstanceType<typeof ULabel>>("labelComponent");
const leftSlotWrapperRef = useTemplateRef<HTMLDivElement>("leftSlotWrapper");
const wrapperRef = useTemplateRef<HTMLLabelElement>("wrapper");

const currentRows = ref(Number(props.rows));

const localValue = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

watch(
  () => props.rows,
  (newRows) => {
    currentRows.value = Number(newRows);
  },
);

watch(
  () => [props.modelValue, props.autoResize],
  () => props.autoResize && nextTick(autoResizeTextarea),
);

watch([() => props.labelAlign, () => props.size], setLabelPosition, { flush: "post" });

onMounted(() => {
  toggleReadonly(true);
  setLabelPosition();

  if (props.autoResize) {
    nextTick(autoResizeTextarea);
  }
});

function autoResizeTextarea() {
  if (!props.autoResize || props.readonly) return;

  const textarea = textareaRef.value;

  if (!textarea) return;

  textarea.style.height = "auto";

  // Calculate the minimum height based on rows prop
  const computedStyle = getComputedStyle(textarea);
  const lineHeight = parseFloat(computedStyle.lineHeight);
  const paddingTop = parseFloat(computedStyle.paddingTop);
  const paddingBottom = parseFloat(computedStyle.paddingBottom);
  const minHeight = lineHeight * Number(props.rows) + paddingTop + paddingBottom;

  // Set height to the larger of scrollHeight or minimum height
  const newHeight = Math.max(textarea.scrollHeight, minHeight);

  textarea.style.height = `${newHeight}px`;
}

function toggleReadonly(hasReadonly: boolean) {
  if (props.noAutocomplete && !props.readonly && elementId) {
    const textarea = document.getElementById(elementId);

    if (textarea) {
      hasReadonly
        ? textarea.setAttribute("readonly", "readonly")
        : textarea.removeAttribute("readonly");
    }
  }
}

useMutationObserver(wrapperRef, (mutations) => mutations.forEach(setLabelPosition), {
  childList: true,
  characterData: true,
  subtree: true,
});

function setLabelPosition() {
  if (props.labelAlign === "top" || !hasSlotContent(slots["left"])) {
    if (labelComponentRef.value?.labelElement) {
      labelComponentRef.value.labelElement.style.left = "";
    }

    return;
  }

  if (leftSlotWrapperRef.value && textareaRef.value && labelComponentRef.value?.labelElement) {
    const leftSlotWidth = leftSlotWrapperRef.value.getBoundingClientRect().width;
    const wrapperElement = textareaRef.value.parentElement;

    let wrapperGap = 0;
    let wrapperLeftPadding = 0;

    if (wrapperElement) {
      wrapperGap = parseFloat(getComputedStyle(wrapperElement).gap);
      wrapperLeftPadding = parseFloat(getComputedStyle(wrapperElement).paddingLeft);
    }

    if (labelComponentRef.value?.labelElement) {
      labelComponentRef.value.labelElement.style.left = `${leftSlotWidth + wrapperLeftPadding + wrapperGap}px`;
    }
  }
}

function onChange() {
  emit("change");
}

function onClick(event: MouseEvent) {
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

defineExpose({
  /**
   * A reference to the component's wrapper element for direct DOM manipulation.
   * @property {HTMLLabelElement}
   */
  wrapperRef,

  /**
   * A reference to the textarea element for direct DOM manipulation.
   * @property {HTMLTextAreaElement}
   */
  textareaRef,
});

/**
 * Get element / nested component attributes for each config token ✨
 * Applies: `class`, `config`, redefined default `props` and dev `vl-...` attributes.
 */
const mutatedProps = computed(() => ({
  error: Boolean(props.error) && !props.disabled,
  label: Boolean(props.label),
}));

const {
  getDataTest,
  textareaAttrs,
  textareaLabelAttrs,
  wrapperAttrs,
  leftSlotAttrs,
  rightSlotAttrs,
} = useUI<Config>(defaultConfig, mutatedProps);
</script>

<template>
  <ULabel
    ref="labelComponent"
    :for="elementId"
    :label="label"
    :error="error"
    :description="description"
    :size="size"
    :disabled="disabled"
    :align="labelAlign"
    v-bind="textareaLabelAttrs"
    :data-test="getDataTest('label')"
  >
    <template #label>
      <!--
        @slot Use this to add custom content instead of the label.
        @binding {string} label
      -->
      <slot name="label" :label="label" />
    </template>

    <label ref="wrapper" :for="elementId" v-bind="wrapperAttrs">
      <span
        v-if="hasSlotContent($slots['left'])"
        ref="leftSlotWrapper"
        :for="elementId"
        v-bind="leftSlotAttrs"
      >
        <!-- @slot Use it to add something before the text. -->
        <slot name="left" />
      </span>

      <textarea
        :id="elementId"
        ref="textarea"
        v-model="localValue"
        :placeholder="placeholder"
        :readonly="readonly"
        :disabled="disabled"
        :maxlength="maxLength"
        :rows="currentRows"
        :inputmode="inputmode"
        v-bind="textareaAttrs"
        :data-test="getDataTest()"
        @focus="onFocus"
        @blur="onBlur"
        @change="onChange"
        @mouseleave="onMouseleave"
        @mousedown="onMousedown"
        @click="onClick"
      />

      <span v-if="hasSlotContent($slots['right'])" :for="elementId" v-bind="rightSlotAttrs">
        <!-- @slot Use it to add something after the text. -->
        <slot name="right" />
      </span>
    </label>
  </ULabel>
</template>
