<script setup lang="ts">
import { ref, computed } from "vue";

import useUI from "../composables/useUI.ts";
import { getDefaults } from "../utils/ui.ts";

import defaultConfig from "./config.ts";
import { COMPONENT_NAME } from "./constants.ts";

import UInput from "../ui.form-input/UInput.vue";
import UIcon from "../ui.image-icon/UIcon.vue";

import type { Props, Config } from "./types.ts";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<Props>(), {
  ...getDefaults<Props, Config>(defaultConfig, COMPONENT_NAME),
  /* Add default values for props below */
});

const emit = defineEmits([
  /**
   * Triggers when the input value is changes.
   * @property {string} modelValue
   * @property {number} modelValue
   */
  "update:modelValue",
]);

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
    :id="id"
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
  >
    <template #left>
      <!--
        @slot Use it to add something left.
        @binding {string} icon-name
      -->
      <slot name="left" :icon-name="leftIcon" />
    </template>

    <template #right>
      <div v-bind="passwordIconWrapperAttrs">
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
      </div>
    </template>
  </UInput>
</template>
