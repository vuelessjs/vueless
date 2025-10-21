<script setup lang="ts">
import { ref, computed, useId } from "vue";

import { useUI } from "../composables/useUI";
import { getDefaults } from "../utils/ui";

import defaultConfig from "./config";
import { COMPONENT_NAME } from "./constants";

import UInput from "../ui.form-input/UInput.vue";
import UIcon from "../ui.image-icon/UIcon.vue";

import type { Props, Config } from "./types";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<Props>(), {
  ...getDefaults<Props, Config>(defaultConfig, COMPONENT_NAME),
  /* Add default values for props below */
});

const emit = defineEmits([
  /**
   * Triggers when the input value is changed.
   * @property {string} modelValue
   * @property {number} modelValue
   */
  "update:modelValue",

  /**
   * Triggers when the input gains focus.
   * @property {FocusEvent} event
   */
  "focus",

  /**
   * Triggers when the input loses focus.
   * @property {FocusEvent} event
   */
  "blur",
]);

const elementId = props.id || useId();

const isShownPassword = ref(false);

const localValue = computed({
  get: () => props.modelValue ?? "",
  set: (value: string) => emit("update:modelValue", value),
});

const inputType = computed(() => {
  return isShownPassword.value ? "text" : "password";
});

const passwordIcon = computed(() => {
  return isShownPassword.value
    ? config.value.defaults.passwordVisibleIcon || ""
    : config.value.defaults.passwordHiddenIcon || "";
});

function onClickShowPassword() {
  isShownPassword.value = !isShownPassword.value;
}

function onFocus(event: FocusEvent) {
  emit("focus", event);
}

function onBlur(event: FocusEvent) {
  emit("blur", event);
}

/**
 * Get element / nested component attributes for each config token ✨
 * Applies: `class`, `config`, redefined default `props` and dev `vl-...` attributes.
 */
const mutatedProps = computed(() => ({
  /* Add mutated props or non-props component state below */
}));

const { getDataTest, config, passwordInputAttrs, passwordIconAttrs, passwordIconWrapperAttrs } =
  useUI<Config>(defaultConfig, mutatedProps);
</script>

<template>
  <UInput
    :id="elementId"
    v-model="localValue"
    :type="inputType"
    :label="label"
    :label-align="labelAlign"
    :size="size"
    :placeholder="placeholder"
    :description="description"
    :error="error"
    :left-icon="leftIcon"
    :max-length="maxLength"
    :readonly="readonly"
    :disabled="disabled"
    v-bind="passwordInputAttrs"
    :data-test="getDataTest()"
    @focus="onFocus"
    @blur="onBlur"
  >
    <template #left>
      <!--
        @slot Use it to add something left.
        @binding {string} icon-name
      -->
      <slot name="left" :icon-name="leftIcon" />
    </template>

    <template #label>
      <!--
        @slot Use this to add custom content instead of the label.
        @binding {string} label
      -->
      <slot name="label" :label="label" />
    </template>

    <template #right>
      <label v-bind="passwordIconWrapperAttrs" :for="elementId">
        <!--
          @slot Use it to add something instead of the password icon.
          @binding {string} icon-name
          @binding {boolean} visible
          @binding {function} toggle
        -->
        <slot
          name="right"
          :icon-name="passwordIcon"
          :visible="isShownPassword"
          :toggle="onClickShowPassword"
        >
          <UIcon
            :name="passwordIcon"
            color="neutral"
            interactive
            v-bind="passwordIconAttrs"
            :data-test="getDataTest('password-icon')"
            @click="onClickShowPassword"
          />
        </slot>
      </label>
    </template>
  </UInput>
</template>
