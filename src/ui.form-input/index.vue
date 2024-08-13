<template>
  <ULabel
    ref="labelComponent"
    :for="id"
    :label="label"
    :description="description"
    :disabled="disabled"
    :error="error"
    :size="size"
    :align="labelAlign"
    centred
    v-bind="labelAttrs"
  >
    <label :for="id" v-bind="blockAttrs">
      <span v-if="hasSlotContent($slots['left'])" ref="leftSlotWrapper">
        <!-- @slot Use it to add something before the text. -->
        <slot name="left" />
      </span>

      <span
        v-if="hasSlotContent($slots['icon-left']) || iconLeft"
        ref="leftSlotWrapper"
        v-bind="leftIconSlotAttrs"
      >
        <!--
          @slot Use it to add icon before the text.
          @binding {string} icon-name
          @binding {string} icon-size
        -->
        <slot name="icon-left" :icon-name="iconLeft" :icon-size="iconSize">
          <UIcon v-if="iconLeft" :name="iconLeft" :size="iconSize" internal />
        </slot>
      </span>

      <span v-bind="inputWrapperAttrs">
        <input
          :id="id"
          ref="input"
          v-model="inputValue"
          :placeholder="placeholder"
          :type="inputType"
          :readonly="readonly"
          :disabled="disabled"
          :maxlength="maxLength"
          :inputmode="inputmode"
          :data-cy="dataCy"
          v-bind="inputAttrs"
          @focus="onFocus"
          @blur="onBlur"
          @input="onInput"
          @change="onChange"
          @mousedown="onMousedown"
          @click="onClick"
        />
      </span>

      <label v-if="isTypePassword" v-bind="rightIconSlotAttrs" :for="id">
        <UIcon
          v-if="isTypePassword"
          :name="isShownPassword ? config.passwordVisibleIconName : config.passwordHiddenIconName"
          color="gray"
          interactive
          internal
          :data-cy="`${dataCy}-show-password`"
          v-bind="passwordIconAttrs"
          @click="onClickShowPassword"
        />
      </label>

      <span v-if="hasSlotContent($slots['icon-right']) || iconRight" v-bind="rightIconSlotAttrs">
        <!--
          @slot Use it to add icon after the text.
          @binding {string} icon-name
          @binding {string} icon-size
        -->
        <slot name="icon-right" :icon-name="iconLeft" :icon-size="iconSize">
          <UIcon v-if="iconRight" :name="iconRight" :size="iconSize" internal />
        </slot>
      </span>

      <!-- @slot Use it to add something after the text. -->
      <slot name="right" />
    </label>
  </ULabel>
</template>

<script>
import { getRandomId } from "../service.ui";

const VALIDATION_RULES_REG_EX = {
  integer: /\d*/g,
  number: /\d*\.?\d*/g,
  string: /[a-zA-Z]+/g,
  stringAndNumber: /[a-zA-Z0-9]+/g,
  symbol: /\D/g,
};
</script>

<script setup>
import { ref, computed, onMounted, useSlots } from "vue";

import UIcon from "../ui.image-icon";
import ULabel from "../ui.form-label";
import UIService from "../service.ui";

import defaultConfig from "./configs/default.config";
import { UInput } from "./constants";
import useAttrs from "./composables/attrs.composable";

/* Should be a string for correct web-types gen */
defineOptions({ name: "UInput", inheritAttrs: false });

const emit = defineEmits([
  /**
   * Triggers when the input value is updated.
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
   * Triggers when any validation rules are applied to input value.
   * @property {string} value
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
   * Set label placement related from the default slot.
   * @values top, topInside, topWithDesc, left, right
   */
  labelAlign: {
    type: String,
    default: UIService.get(defaultConfig, UInput).default.labelAlign,
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
    default: UIService.get(defaultConfig, UInput).default.size,
  },

  /**
   * Left side icon name.
   */
  iconLeft: {
    type: String,
    default: "",
  },

  /**
   * Right side icon name.
   */
  iconRight: {
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
   * Prevents input some characters (for ex. input numbers only).
   * You can use predefined values or your own RegExp.
   * @values symbol, string, stringAndNumber, number, integer
   */
  validationRule: {
    type: [String, RegExp],
    default: "",
  },

  /**
   * Input type
   * @values text, number, tel, email, url, search, password
   */
  type: {
    type: String,
    default: "text",
    validator: (value) => !Object.keys(VALIDATION_RULES_REG_EX).includes(value),
  },

  /**
   * Set proper keyboard on mobile devices.
   * @values text, decimal, numeric, tel, email, url, search, none
   */
  inputmode: {
    type: String,
    default: UIService.get(defaultConfig, UInput).default.inputmode,
  },

  /**
   * Set input read-only.
   */
  readonly: {
    type: Boolean,
    default: UIService.get(defaultConfig, UInput).default.readonly,
  },

  /**
   * Disable the input.
   */
  disabled: {
    type: Boolean,
    default: UIService.get(defaultConfig, UInput).default.disabled,
  },

  /**
   * Disable browsers autocomplete.
   */
  noAutocomplete: {
    type: Boolean,
    default: UIService.get(defaultConfig, UInput).default.noAutocomplete,
  },

  /**
   * Unique element id.
   * @ignore
   */
  id: {
    type: String,
    default: () => getRandomId(),
  },

  /**
   * Component ui config object.
   */
  config: {
    type: Object,
    default: () => ({}),
  },

  /**
   * Data-cy attribute for automated testing.
   */
  dataCy: {
    type: String,
    default: "",
  },
});

const slots = useSlots();

const isShownPassword = ref(false);
const input = ref(null);
const labelComponent = ref(null);
const leftSlotWrapper = ref(null);

defineExpose({ input });

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

const {
  config,
  inputAttrs,
  blockAttrs,
  labelAttrs,
  passwordIconAttrs,
  leftIconSlotAttrs,
  inputWrapperAttrs,
  rightIconSlotAttrs,
  hasSlotContent,
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
    const input = document.querySelector(`#${props.id}`);

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
    const input = document.getElementById(props.id);

    toggleState ? input.setAttribute("readonly", "readonly") : input.removeAttribute("readonly");
  }
}

function transformValue(value, exp) {
  const regExp = new RegExp(exp, "ig");
  const matches = String(value).match(regExp);

  return matches ? matches.join("") : "";
}

function setLabelPosition() {
  const shouldAlignLabelOnTop =
    !hasSlotContent(slots["icon-left"]) && !hasSlotContent(slots["left"]) && !props.iconLeft;

  if (props.labelAlign === "top" || shouldAlignLabelOnTop) {
    return;
  }

  let leftSlotOrIconWidth = leftSlotWrapper.value.getBoundingClientRect().width;

  const leftPaddingValue = parseFloat(getComputedStyle(input.value).paddingLeft);

  if (labelComponent.value.labelElement) {
    labelComponent.value.labelElement.style.left = `${leftSlotOrIconWidth + leftPaddingValue}px`;
  }
}
</script>

<style lang="postcss" scoped>
@font-face {
  font-family: text-security-disc;
  src: url("./assets/fonts/text-security-disc.woff");
}
</style>
