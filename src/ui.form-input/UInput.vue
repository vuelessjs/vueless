<script setup lang="ts">
import { ref, computed, onMounted, useSlots, useId } from "vue";

import useUI from "../composables/useUI.ts";
import { getDefaults } from "../utils/ui.ts";
import { hasSlotContent } from "../utils/helper.ts";
import { useMutationObserver } from "../composables/useMutationObserver.ts";

import UIcon from "../ui.image-icon/UIcon.vue";
import ULabel from "../ui.form-label/ULabel.vue";

import defaultConfig from "./config.ts";
import { COMPONENT_NAME } from "./constants.ts";

import type { Props, IconSize, Config } from "./types.ts";

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

const isShownPassword = ref(false);
const inputRef = ref<HTMLInputElement | null>(null);
const leftSlotWrapperRef = ref<HTMLElement | null>(null);
const labelComponentRef = ref<{ labelElement: HTMLElement } | null>(null);

const isTypePassword = computed(() => props.type === "password");

const inputValue = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const applyPasswordClasses = computed(() => {
  return Boolean(inputValue.value && !isShownPassword.value && isTypePassword.value);
});

const elementId = props.id || useId();

const iconSize = computed(() => {
  const sizes = {
    sm: "xs",
    md: "sm",
    lg: "md",
  };

  return sizes[props.size] as IconSize;
});

const inputType = computed(() => {
  return isShownPassword.value || props.noAutocomplete ? "text" : props.type;
});

const passwordIcon = computed(() => {
  return isShownPassword.value
    ? config.value.defaults.passwordVisibleIcon || ""
    : config.value.defaults.passwordHiddenIcon || "";
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

function onClickShowPassword() {
  isShownPassword.value = !isShownPassword.value;
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

useMutationObserver(leftSlotWrapperRef, (mutations) => {
  mutations.forEach(setLabelPosition);
});

function setLabelPosition() {
  const shouldAlignLabelOnTop =
    !hasSlotContent(slots["left-icon"]) && !hasSlotContent(slots["left"]) && !props.leftIcon;

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
   * @property {HTMLElement}
   */
  inputRef,
});

/**
 * Get element / nested component attributes for each config token ✨
 * Applies: `class`, `config`, redefined default `props` and dev `vl-...` attributes.
 */
const mutatedProps = computed(() => ({
  error: Boolean(props.error),
  label: Boolean(props.label),
  /* component state, not a props */
  typePassword: applyPasswordClasses.value,
}));

const {
  config,
  inputAttrs,
  wrapperAttrs,
  inputLabelAttrs,
  passwordIconAttrs,
  leftIconWrapperAttrs,
  leftIconAttrs,
  rightIconAttrs,
  rightIconWrapperAttrs,
} = useUI<Config>(defaultConfig, mutatedProps);
</script>

<template>
  <ULabel
    ref="labelComponentRef"
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
    <label :for="elementId" v-bind="wrapperAttrs">
      <span v-if="hasSlotContent($slots['left'])" ref="leftSlotWrapperRef">
        <!-- @slot Use it to add something before the text. -->
        <slot name="left" />
      </span>

      <span
        v-if="hasSlotContent($slots['left-icon']) || leftIcon"
        ref="leftSlotWrapperRef"
        v-bind="leftIconWrapperAttrs"
      >
        <!--
          @slot Use it to add icon before the text.
          @binding {string} icon-name
          @binding {string} icon-size
        -->
        <slot name="left-icon" :icon-name="leftIcon" :icon-size="iconSize">
          <UIcon
            v-if="leftIcon"
            :name="leftIcon"
            :size="iconSize"
            internal
            v-bind="leftIconAttrs"
          />
        </slot>
      </span>

      <input
        :id="elementId"
        ref="inputRef"
        v-model="inputValue"
        :placeholder="placeholder"
        :type="inputType"
        :readonly="readonly"
        :disabled="disabled"
        :maxlength="maxLength"
        :inputmode="inputmode"
        v-bind="inputAttrs"
        :data-test="dataTest"
        @focus="onFocus"
        @blur="onBlur"
        @input="onInput"
        @change="onChange"
        @mousedown="onMousedown"
        @click="onClick"
        @paste="onPaste"
        @copy="onCopy"
      />

      <label v-if="isTypePassword" v-bind="rightIconWrapperAttrs" :for="elementId">
        <UIcon
          v-if="isTypePassword"
          :name="passwordIcon"
          color="gray"
          interactive
          internal
          v-bind="passwordIconAttrs"
          :data-test="`${dataTest}-password-icon`"
          @click="onClickShowPassword"
        />
      </label>

      <span v-if="hasSlotContent($slots['right-icon']) || rightIcon" v-bind="rightIconWrapperAttrs">
        <!--
          @slot Use it to add icon after the text.
          @binding {string} icon-name
          @binding {string} icon-size
        -->
        <slot name="right-icon" :icon-name="rightIcon" :icon-size="iconSize">
          <UIcon
            v-if="rightIcon"
            :name="rightIcon"
            :size="iconSize"
            internal
            v-bind="rightIconAttrs"
          />
        </slot>
      </span>

      <!-- @slot Use it to add something after the text. -->
      <slot name="right" />
    </label>
  </ULabel>
</template>

<style lang="postcss" scoped>
@font-face {
  font-family: text-security-disc;
  src: url("./assets/text-security-disc.woff");
}
</style>
