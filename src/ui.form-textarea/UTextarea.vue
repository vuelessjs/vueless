<script setup lang="ts">
import { computed, onMounted, ref, watch, useSlots, useId } from "vue";

import useUI from "../composables/useUI.ts";
import { getDefaults } from "../utils/ui.ts";
import { hasSlotContent } from "../utils/helper.ts";

import { useMutationObserver } from "../composables/useMutationObserver.ts";

import ULabel from "../ui.form-label/ULabel.vue";

import { UTextarea } from "./constants.ts";
import defaultConfig from "./config.ts";

import type { Props, Config } from "./types.ts";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<Props>(), {
  ...getDefaults<Props, Config>(defaultConfig, UTextarea),
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

const textareaRef = ref<HTMLTextAreaElement | null>(null);
const labelComponentRef = ref<{ labelElement: HTMLElement | null } | null>(null);
const leftSlotWrapperRef = ref<HTMLElement | null>(null);
const textareaWrapperRef = ref<HTMLElement | null>(null);

const currentRows = ref(Number(props.rows));

watch(
  () => props.rows,
  (newRows) => {
    currentRows.value = Number(newRows);
  },
);

function onEnter() {
  if (currentRows.value !== undefined) {
    currentRows.value++;
  }
}

function onBackspace() {
  const textarea = textareaRef.value;

  if (!textarea) return;

  const content = textarea.value;
  const newlineCount = (content.match(/\n/g) || []).length;
  const newRowCount = Math.max(Number(props.rows), newlineCount + 1);

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

onMounted(() => toggleReadonly(true));

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

useMutationObserver(leftSlotWrapperRef, (mutations) => {
  mutations.forEach(setLabelPosition);
});

function setLabelPosition() {
  if (props.labelAlign === "top" || !hasSlotContent(slots["left"])) return;

  if (
    leftSlotWrapperRef.value &&
    textareaWrapperRef.value &&
    labelComponentRef.value?.labelElement
  ) {
    const leftSlotWidth = leftSlotWrapperRef.value.getBoundingClientRect().width;

    const textareaPaddingLeft = parseFloat(getComputedStyle(textareaWrapperRef.value).paddingLeft);

    labelComponentRef.value.labelElement.style.left = `${leftSlotWidth + textareaPaddingLeft}px`;
  }
}

onMounted(() => setLabelPosition());

defineExpose({
  /**
   * A reference to the textarea element for direct DOM manipulation.
   * @property {HTMLElement}
   */
  textareaRef,
});

/**
 * Get element / nested component attributes for each config token ✨
 * Applies: `class`, `config`, redefined default `props` and dev `vl-...` attributes.
 */
const mutatedProps = computed(() => ({
  error: Boolean(props.error),
  label: Boolean(props.label),
}));

const { textareaAttrs, textareaLabelAttrs, textareaWrapperAttrs, leftSlotAttrs, rightSlotAttrs } =
  useUI<Config>(defaultConfig, mutatedProps);
</script>

<template>
  <ULabel
    ref="labelComponentRef"
    :for="elementId"
    :label="label"
    :error="error"
    :description="description"
    :size="size"
    :disabled="disabled"
    :align="labelAlign"
    v-bind="textareaLabelAttrs"
    :data-test="dataTest"
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
        :placeholder="placeholder"
        :readonly="readonly"
        :disabled="disabled"
        :rows="currentRows"
        :inputmode="inputmode"
        v-bind="textareaAttrs"
        :data-test="dataTest"
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
