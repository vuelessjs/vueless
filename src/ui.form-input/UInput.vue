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
        v-bind="inputAttrs"
        :data-test="dataTest"
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
          :name="
            isShownPassword
              ? config.defaults.passwordVisibleIcon
              : config.defaults.passwordHiddenIcon
          "
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

<script>
import { getDefault } from "../utils/ui.ts";

const VALIDATION_RULES_REG_EX = {
  integer: /\d*/g,
  number: /\d*\.?\d*/g,
  string: /[a-zA-Z]+/g,
  stringAndNumber: /[a-zA-Z0-9]+/g,
  symbol: /\D/g,
};
</script>

<script setup>
import { ref, computed, onMounted, useSlots, useId } from "vue";

import { hasSlotContent } from "../utils/helper.ts";
import { useMutationObserver } from "../composables/useMutationObserver.ts";

import UIcon from "../ui.image-icon/UIcon.vue";
import ULabel from "../ui.form-label/ULabel.vue";

import defaultConfig from "./config.js";
import { UInput } from "./constants.js";
import useAttrs from "./useAttrs.js";

defineOptions({ inheritAttrs: false });

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

const props = defineProps({
  /**
   * Input value.
   */
  modelValue: {
    type: [String, Number],
    default: "",
  },

  /**
   * Input label.
   */
  label: {
    type: String,
    default: "",
  },

  /**
   * Label placement.
   * @values top, topInside, topWithDesc, left, right
   */
  labelAlign: {
    type: String,
    default: getDefault(defaultConfig, UInput).labelAlign,
  },

  /**
   * Input placeholder.
   */
  placeholder: {
    type: String,
    default: "",
  },

  /**
   * Input description.
   */
  description: {
    type: String,
    default: "",
  },

  /**
   * Error message.
   */
  error: {
    type: String,
    default: "",
  },

  /**
   * Input size.
   * @values sm, md, lg
   */
  size: {
    type: String,
    default: getDefault(defaultConfig, UInput).size,
  },

  /**
   * Left icon name.
   */
  leftIcon: {
    type: String,
    default: "",
  },

  /**
   * Right icon name.
   */
  rightIcon: {
    type: String,
    default: "",
  },

  /**
   * Maximum character length.
   */
  maxLength: {
    type: [String, Number],
    default: "",
  },

  /**
   * Prevents some characters from input.
   * You can use predefined values or own RegExp.
   * @values symbol, string, stringAndNumber, number, integer
   */
  validationRule: {
    type: [String, RegExp],
    default: getDefault(defaultConfig, UInput).validationRule,
    validator: (value) => Object.keys(VALIDATION_RULES_REG_EX).includes(value) || value === "",
  },

  /**
   * Input type.
   * @values text, number, tel, email, url, search, password
   */
  type: {
    type: String,
    default: getDefault(defaultConfig, UInput).type,
  },

  /**
   * Set specific keyboard for mobile devices.
   * @values text, decimal, numeric, tel, email, url, search, none
   */
  inputmode: {
    type: String,
    default: getDefault(defaultConfig, UInput).inputmode,
  },

  /**
   * Make input read-only.
   */
  readonly: {
    type: Boolean,
    default: getDefault(defaultConfig, UInput).readonly,
  },

  /**
   * Disable the input.
   */
  disabled: {
    type: Boolean,
    default: getDefault(defaultConfig, UInput).disabled,
  },

  /**
   * Disable browsers autocomplete.
   */
  noAutocomplete: {
    type: Boolean,
    default: getDefault(defaultConfig, UInput).noAutocomplete,
  },

  /**
   * Unique element id.
   */
  id: {
    type: String,
    default: "",
  },

  /**
   * Component config object.
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

const slots = useSlots();

const isShownPassword = ref(false);
const inputRef = ref(null);
const labelComponentRef = ref(null);
const leftSlotWrapperRef = ref(null);

const isTypePassword = computed(() => props.type === "password");

const inputValue = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const inputPasswordClasses = computed(() => {
  return inputValue.value && !isShownPassword.value && isTypePassword.value
    ? "tracking-widest [font-family:text-security-disc,serif] [-webkit-text-security:disc]"
    : "";
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
} = useAttrs(props, { isTypePassword, inputPasswordClasses });

const iconSize = computed(() => {
  const sizes = {
    sm: "xs",
    md: "sm",
    lg: "md",
  };

  return sizes[props.size];
});

const inputType = computed(() => {
  return isShownPassword.value || props.noAutocomplete ? "text" : props.type;
});

onMounted(() => {
  toggleReadonlyToPreventAutocomplete(true);
  setLabelPosition();
});

function onInput(inputEvent) {
  let value = inputEvent.target.value;

  if (props.validationRule) {
    const input = document.querySelector(`#${elementId}`);

    value = VALIDATION_RULES_REG_EX[props.validationRule]
      ? transformValue(value, VALIDATION_RULES_REG_EX[props.validationRule])
      : transformValue(value, props.validationRule);

    input.value = value;
  }

  emit("input", value);
}

function onChange(event) {
  emit("change", event);
}

function onClick(event) {
  toggleReadonlyToPreventAutocomplete(false);

  emit("click", event);
}

function onFocus(event) {
  toggleReadonlyToPreventAutocomplete(false);

  emit("focus", event);
}

function onBlur(event) {
  toggleReadonlyToPreventAutocomplete(true);

  emit("blur", event);
}

function onMousedown(event) {
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
function toggleReadonlyToPreventAutocomplete(toggleState) {
  if (props.noAutocomplete && !props.readonly) {
    toggleState
      ? inputRef.value.setAttribute("readonly", "readonly")
      : inputRef.value.removeAttribute("readonly");
  }
}

function transformValue(value, exp) {
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

  const leftSlotOrIconWidth = leftSlotWrapperRef.value.getBoundingClientRect().width;

  const leftPaddingValue = parseFloat(getComputedStyle(inputRef.value).paddingLeft);

  if (labelComponentRef.value.labelElement) {
    labelComponentRef.value.labelElement.style.left = `${leftSlotOrIconWidth + leftPaddingValue}px`;
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

<style lang="postcss" scoped>
@font-face {
  font-family: text-security-disc;
  src: url("./assets/text-security-disc.woff");
}
</style>
