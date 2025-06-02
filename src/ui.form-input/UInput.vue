<script setup lang="ts">
import { computed, onMounted, useSlots, useId, useTemplateRef } from "vue";

import useUI from "../composables/useUI.ts";
import { getDefaults } from "../utils/ui.ts";
import { hasSlotContent } from "../utils/helper.ts";
import { useMutationObserver } from "../composables/useMutationObserver.ts";

import UIcon from "../ui.image-icon/UIcon.vue";
import ULabel from "../ui.form-label/ULabel.vue";

import defaultConfig from "./config.ts";
import { COMPONENT_NAME } from "./constants.ts";

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
   * Triggers when the input value is changes.
   * @property {string} modelValue
   * @property {number} modelValue
   */
  "update:modelValue",

  /**
   * Triggers when the input value changes.
   */
  "change",

  /**
   * Triggers when the input is clicked.
   */
  "click",

  /**
   * Triggers when the input gains focus.
   */
  "focus",

  /**
   * Triggers when the mouse is pressed down on the input.
   */
  "mousedown",

  /**
   * Triggers when the input loses focus.
   */
  "blur",

  /**
   * Triggers when the input value is changes.
   * @property {string} modelValue
   * @property {number} modelValue
   */
  "input",

  /**
   * Triggers when content copied from the input.
   */
  "copy",

  /**
   * Triggers when content pasted to the input.
   */
  "paste",
]);

const VALIDATION_RULES_REG_EX = {
  integer: /\d*/g,
  number: /\d*\.?\d*/g,
  string: /[a-zA-Z]+/g,
  stringAndNumber: /[a-zA-Z0-9]+/g,
  symbol: /\D/g,
};

const slots = useSlots();

const inputRef = useTemplateRef<HTMLInputElement>("input");
const leftSlotWrapperRef = useTemplateRef<HTMLSpanElement>("leftSlotWrapper");
const labelComponentRef = useTemplateRef<InstanceType<typeof ULabel>>("labelComponent");

const isTypePassword = computed(() => props.type === "password");

const inputValue = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const elementId = props.id || useId();

const inputType = computed(() => {
  return props.noAutocomplete ? "text" : props.type;
});

onMounted(() => {
  toggleReadonlyToPreventAutocomplete(true);
  setLabelPosition();
});

function onInput(inputEvent: Event) {
  const target = inputEvent.target as HTMLInputElement | null;

  if (!target) return;

  let value = target.value;

  if (props.validationRule) {
    const input = document.querySelector(`#${elementId}`) as HTMLInputElement | null;

    if (!input) return;

    value = VALIDATION_RULES_REG_EX[props.validationRule]
      ? transformValue(value, VALIDATION_RULES_REG_EX[props.validationRule])
      : transformValue(value, props.validationRule);

    input.value = value;
  }

  emit("input", value);
}

function onChange(event: Event) {
  emit("change", event);
}

function onClick(event: MouseEvent) {
  toggleReadonlyToPreventAutocomplete(false);

  emit("click", event);
}

function onFocus(event: FocusEvent) {
  toggleReadonlyToPreventAutocomplete(false);

  emit("focus", event);
}

function onBlur(event: FocusEvent) {
  toggleReadonlyToPreventAutocomplete(true);

  emit("blur", event);
}

function onMousedown(event: MouseEvent) {
  toggleReadonlyToPreventAutocomplete(false);

  emit("mousedown", event);
}

function onPaste(event: ClipboardEvent) {
  emit("paste", event);
}

function onCopy(event: ClipboardEvent) {
  emit("copy", event);
}

/**
 * This trick prevents default browser autocomplete behavior.
 * @param toggleState { boolean }
 */
function toggleReadonlyToPreventAutocomplete(toggleState: boolean) {
  if (props.noAutocomplete && !props.readonly && inputRef.value) {
    toggleState
      ? inputRef.value.setAttribute("readonly", "readonly")
      : inputRef.value.removeAttribute("readonly");
  }
}

function transformValue(value: string | number, exp: string | RegExp) {
  const regExp = new RegExp(exp, "ig");
  const matches = String(value).match(regExp);

  return matches ? matches.join("") : "";
}

useMutationObserver(leftSlotWrapperRef, (mutations) => mutations.forEach(setLabelPosition), {
  childList: true,
  characterData: true,
  subtree: true,
});

function setLabelPosition() {
  const shouldAlignLabelOnTop = !hasSlotContent(slots["left"]) && !props.leftIcon;

  if (props.labelAlign === "top" || shouldAlignLabelOnTop) {
    return;
  }

  if (leftSlotWrapperRef.value && inputRef.value && labelComponentRef.value?.labelElement) {
    const leftSlotOrIconWidth = leftSlotWrapperRef.value.getBoundingClientRect().width;
    const leftPaddingValue = parseFloat(getComputedStyle(inputRef.value).paddingLeft);

    if (labelComponentRef.value?.labelElement) {
      labelComponentRef.value.labelElement.style.left = `${leftSlotOrIconWidth + leftPaddingValue}px`;
    }
  }
}

defineExpose({
  /**
   * A reference to the input element for direct DOM manipulation.
   * @property {HTMLInputElement}
   */
  inputRef,
});

/**
 * Get element / nested component attributes for each config token ✨
 * Applies: `class`, `config`, redefined default `props` and dev `vl-...` attributes.
 */
const mutatedProps = computed(() => ({
  error: Boolean(props.error) && !props.disabled,
  label: Boolean(props.label),
  /* component state, not a props */
  typePassword: Boolean(inputValue.value && isTypePassword.value),
}));

const {
  getDataTest,
  inputAttrs,
  wrapperAttrs,
  inputLabelAttrs,
  leftIconAttrs,
  leftSlotAttrs,
  rightIconAttrs,
  rightSlotAttrs,
} = useUI<Config>(defaultConfig, mutatedProps);
</script>

<template>
  <ULabel
    ref="labelComponent"
    :for="elementId"
    :label="label"
    :description="description"
    :disabled="disabled"
    :error="error"
    :size="size"
    :align="labelAlign"
    centred
    interactive
    v-bind="inputLabelAttrs"
  >
    <template #label>
      <!--
        @slot Use this to add custom content instead of the label.
        @binding {string} label
      -->
      <slot name="label" :label="label" />
    </template>

    <label :for="elementId" v-bind="wrapperAttrs">
      <span
        v-if="hasSlotContent($slots['left'], { iconName: leftIcon }) || leftIcon"
        v-bind="leftSlotAttrs"
        ref="leftSlotWrapper"
      >
        <!--
          @slot Use it to add something before the text.
          @binding {string} icon-name
        -->
        <slot name="left" :icon-name="leftIcon">
          <UIcon v-if="leftIcon" color="neutral" :name="leftIcon" v-bind="leftIconAttrs" />
        </slot>
      </span>

      <input
        :id="elementId"
        ref="input"
        v-model="inputValue"
        :placeholder="placeholder"
        :type="inputType"
        :readonly="readonly"
        :disabled="disabled"
        :maxlength="maxLength"
        :inputmode="inputmode"
        :autocomplete="noAutocomplete ? 'off' : 'on'"
        v-bind="inputAttrs"
        :data-test="getDataTest()"
        @focus="onFocus"
        @blur="onBlur"
        @input="onInput"
        @change="onChange"
        @mousedown="onMousedown"
        @click="onClick"
        @paste="onPaste"
        @copy="onCopy"
      />

      <div
        v-if="hasSlotContent($slots['right'], { iconName: rightIcon }) || rightIcon"
        v-bind="rightSlotAttrs"
      >
        <!--
          @slot Use it to add something after the text.
          @binding {string} icon-name
        -->
        <slot name="right" :icon-name="rightIcon">
          <UIcon v-if="rightIcon" color="neutral" :name="rightIcon" v-bind="rightIconAttrs" />
        </slot>
      </div>
    </label>
  </ULabel>
</template>
