<script setup lang="ts">
import { computed, onMounted, ref, watch, useSlots, useId } from "vue";

import useUI from "../composables/useUI.ts";
import { getDefaults } from "../utils/ui.ts";
import { hasSlotContent } from "../utils/helper.ts";

import { useMutationObserver } from "../composables/useMutationObserver.ts";

import ULabel from "../ui.form-label/ULabel.vue";

import { COMPONENT_NAME } from "./constants.ts";
import defaultConfig from "./config.ts";

import type { Props, Config } from "./types.ts";

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

const textareaRef = ref<HTMLTextAreaElement | null>(null);
const labelComponentRef = ref<InstanceType<typeof ULabel> | null>(null);
const leftSlotWrapperRef = ref<HTMLElement | null>(null);
const wrapperRef = ref<HTMLElement | null>(null);

const currentRows = ref(Number(props.rows));

watch(
  () => props.rows,
  (newRows) => {
    currentRows.value = Number(newRows);
  },
);

const localValue = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});

onMounted(() => toggleReadonly(true));

function getNewRowCount() {
  const textarea = textareaRef.value;

  if (!textarea) return 0;

  const content = textarea.value;
  const newlineCount = (content.match(/\n/g) || []).length;

  return Math.max(Number(props.rows), newlineCount + 2);
}

function onEnter() {
  const newRowCount = getNewRowCount();

  if (newRowCount > currentRows.value && !props.readonly) {
    currentRows.value = newRowCount;
  }
}

function onBackspace() {
  const newRowCount = getNewRowCount() - 1;

  if (newRowCount < currentRows.value && !props.readonly) {
    currentRows.value = newRowCount;
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

useMutationObserver(leftSlotWrapperRef, (mutations) => mutations.forEach(setLabelPosition), {
  childList: true,
  characterData: true,
  subtree: true,
});

function setLabelPosition() {
  if (props.labelAlign === "top" || !hasSlotContent(slots["left"])) return;

  if (leftSlotWrapperRef.value && textareaRef.value && labelComponentRef.value?.labelElement) {
    const leftSlotWidth = leftSlotWrapperRef.value.getBoundingClientRect().width;
    const textareaPaddingLeft = parseFloat(getComputedStyle(textareaRef.value).paddingLeft);

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
    ref="labelComponentRef"
    :for="elementId"
    :label="label"
    :error="error"
    :description="description"
    :size="size"
    :disabled="disabled"
    :align="labelAlign"
    interactive
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

    <label ref="wrapperRef" :for="elementId" v-bind="wrapperAttrs">
      <div
        v-if="hasSlotContent($slots['left'])"
        ref="leftSlotWrapperRef"
        :for="elementId"
        v-bind="leftSlotAttrs"
      >
        <!-- @slot Use it to add something before the text. -->
        <slot name="left" />
      </div>

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
        :data-test="getDataTest()"
        @focus="onFocus"
        @blur="onBlur"
        @change="onChange"
        @mouseleave="onMouseleave"
        @mousedown="onMousedown"
        @click="onClick"
        @keydown.enter="onEnter"
        @keyup.delete="onBackspace"
      />

      <div v-if="hasSlotContent($slots['right'])" :for="elementId" v-bind="rightSlotAttrs">
        <!-- @slot Use it to add something after the text. -->
        <slot name="right" />
      </div>
    </label>
  </ULabel>
</template>
