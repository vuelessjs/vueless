<template>
  <div v-bind="wrapperAttrs">
    <ULabel
      ref="labelComponent"
      :for="id"
      :label="label"
      :description="description"
      :disabled="disabled"
      :error="error"
      :size="size"
      :align="labelAlign"
      v-bind="labelAttrs"
    >
      <label :for="id" v-bind="blockAttrs">
        <span v-if="hasSlotContent($slots['left'])" ref="leftSlotWrapper" v-bind="leftSlotAttrs">
          <!-- @slot Use it to add some component before text. -->
          <slot name="left" />
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
            :inputmode="inputMode"
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

        <label
          v-if="hasSlotContent($slots['right-icon']) || isTypePassword"
          v-bind="rightSlotAttrs"
          :for="id"
        >
          <!-- @slot Use it to add icon after text. -->
          <slot name="right-icon">
            <UIcon
              v-if="isTypePassword"
              :name="passwordIconName"
              color="gray"
              interactive
              fill
              :data-cy="`${dataCy}-show-password`"
              v-bind="passwordIconAttrs"
              @click="onClickShowPassword"
            />
          </slot>
        </label>

        <span v-if="hasSlotContent($slots['right'])" v-bind="rightSlotAttrs">
          <!-- @slot Use it to add some component after text. -->

          <slot name="right" />
        </span>
      </label>
    </ULabel>
  </div>
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
import { useAttrs } from "./composables/attrs.composable";

/* Should be a string for correct web-types gen */
defineOptions({ name: "UInput", inheritAttrs: false });

const emit = defineEmits([
  "update:modelValue",
  "change",
  "click",
  "focus",
  "mousedown",
  "blur",
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
   * Show label outside the input block.
   */
  labelOutside: {
    type: Boolean,
    default: UIService.get(defaultConfig, UInput).default.labelOutside,
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
   * Input type.
   * @values text, number, email, tel, password, url
   */
  type: {
    type: String,
    default: "text",
    validator: (value) => !Object.keys(VALIDATION_RULES_REG_EX).includes(value),
  },

  /**
   * Input mode (to show different mobile keyboard).
   * @values none, text, decimal, numeric, tel, email, url
   */
  inputMode: {
    type: String,
    default: UIService.get(defaultConfig, UInput).default.inputMode,
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
  wrapperAttrs,
  labelAttrs,
  passwordIconAttrs,
  leftSlotAttrs,
  inputWrapperAttrs,
  rightSlotAttrs,
  hasSlotContent,
} = useAttrs(props, { isTypePassword, inputPasswordClasses });

const labelAlign = computed(() => {
  return props.labelOutside ? "top" : "topInside";
});

const passwordIconName = computed(() => {
  return isShownPassword.value
    ? config.value.passwordVisibleIconName
    : config.value.passwordHiddenIconName;
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
  if (props.labelOutside || !hasSlotContent(slots["left"])) return;

  const leftSlotWidth = leftSlotWrapper.value.getBoundingClientRect().width;

  labelComponent.value.labelElement.style.left = `${leftSlotWidth}px`;
}
</script>

<style lang="postcss" scoped>
@font-face {
  font-family: text-security-disc;
  src: url("./assets/fonts/text-security-disc.woff");
}
</style>
