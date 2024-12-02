<script setup lang="ts">
import { ref, computed, onMounted, useSlots, useId } from "vue";

import { getDefault } from "../utils/ui.ts";
import { hasSlotContent } from "../utils/helper.ts";
import { useMutationObserver } from "../composables/useMutationObserver.ts";

import UIcon from "../ui.image-icon/UIcon.vue";
import ULabel from "../ui.form-label/ULabel.vue";

import defaultConfig from "./config.ts";
import { UInput } from "./constants.ts";
import useAttrs from "./useAttrs.ts";

import type { UInputProps, IconSize } from "./types.ts";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<UInputProps>(), {
  labelAlign: getDefault<UInputProps>(defaultConfig, UInput).labelAlign,
  size: getDefault<UInputProps>(defaultConfig, UInput).size,
  validationRule: getDefault<UInputProps>(defaultConfig, UInput).validationRule,
  type: getDefault<UInputProps>(defaultConfig, UInput).type,
  inputmode: getDefault<UInputProps>(defaultConfig, UInput).inputmode,
  readonly: getDefault<UInputProps>(defaultConfig, UInput).readonly,
  disabled: getDefault<UInputProps>(defaultConfig, UInput).disabled,
  noAutocomplete: getDefault<UInputProps>(defaultConfig, UInput).noAutocomplete,
  modelValue: "",
  dataTest: "",
  config: () => ({}),
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

const elementId = props.id || useId();

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
} = useAttrs(props);

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
    ? config.value?.defaults?.passwordVisibleIcon || ""
    : config.value?.defaults?.passwordHiddenIcon || "";
});

onMounted(() => {
  toggleReadonlyToPreventAutocomplete(true);
  setLabelPosition();
});

function onInput(inputEvent: InputEvent) {
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

function onChange(event: CustomEvent) {
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
        :data-test="dataTest"
        v-bind="inputAttrs"
        @focus="onFocus"
        @blur="onBlur"
        @input="onInput"
        @change="onChange"
        @mousedown="onMousedown"
        @click="onClick"
      />

      <label v-if="isTypePassword" v-bind="rightIconWrapperAttrs" :for="elementId">
        <UIcon
          v-if="isTypePassword"
          :name="passwordIcon"
          color="gray"
          interactive
          internal
          :data-test="`${dataTest}-password-icon`"
          v-bind="passwordIconAttrs"
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
