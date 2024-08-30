<template>
  <ULabel
    ref="labelComponentRef"
    :for="id"
    :label="label"
    :description="description"
    :disabled="disabled"
    :error="error"
    :size="size"
    :align="labelAlign"
    centred
    v-bind="inputLabelAttrs"
  >
    <label :for="id" v-bind="blockAttrs">
      <span v-if="hasSlotContent($slots['left'])" ref="leftSlotWrapperRef">
        <!-- @slot Use it to add something before the text. -->
        <slot name="left" />
      </span>

      <span
        v-if="hasSlotContent($slots['left-icon']) || leftIcon"
        ref="leftSlotWrapperRef"
        v-bind="leftIconSlotAttrs"
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

      <span v-bind="inputWrapperAttrs">
        <input
          :id="id"
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
      </span>

      <label v-if="isTypePassword" v-bind="rightIconSlotAttrs" :for="id">
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
          :data-test="`${dataTest}-show-password`"
          v-bind="passwordIconAttrs"
          @click="onClickShowPassword"
        />
      </label>

      <span v-if="hasSlotContent($slots['right-icon']) || rightIcon" v-bind="rightIconSlotAttrs">
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
import { getRandomId, getDefault } from "../service.ui";

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
   * Left side icon name.
   */
  leftIcon: {
    type: String,
    default: "",
  },

  /**
   * Right side icon name.
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
    default: getDefault(defaultConfig, UInput).inputmode,
  },

  /**
   * Set input read-only.
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

defineExpose({ inputRef });

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
  inputLabelAttrs,
  passwordIconAttrs,
  leftIconSlotAttrs,
  leftIconAttrs,
  inputWrapperAttrs,
  rightIconAttrs,
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
    !hasSlotContent(slots["left-icon"]) && !hasSlotContent(slots["left"]) && !props.leftIcon;

  if (props.labelAlign === "top" || shouldAlignLabelOnTop) {
    return;
  }

  let leftSlotOrIconWidth = leftSlotWrapperRef.value.getBoundingClientRect().width;

  const leftPaddingValue = parseFloat(getComputedStyle(inputRef.value).paddingLeft);

  if (labelComponentRef.value.labelElement) {
    labelComponentRef.value.labelElement.style.left = `${leftSlotOrIconWidth + leftPaddingValue}px`;
  }
}
</script>

<style lang="postcss" scoped>
@font-face {
  font-family: text-security-disc;
  src: url("./assets/fonts/text-security-disc.woff");
}
</style>
