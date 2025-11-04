<script setup lang="ts">
import { ref, computed, useId, useTemplateRef, nextTick } from "vue";

import { useUI } from "../composables/useUI";
import { getDefaults } from "../utils/ui";
import { usePasswordStrength } from "./usePasswordStrength";
import { useComponentLocaleMessages } from "../composables/useComponentLocaleMassages";

import defaultConfig from "./config";
import { COMPONENT_NAME } from "./constants";

import UInput from "../ui.form-input/UInput.vue";
import UIcon from "../ui.image-icon/UIcon.vue";
import UProgress from "../ui.navigation-progress/UProgress.vue";

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

const inputRef = useTemplateRef<InstanceType<typeof UInput>>("input");
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

const { strength } = usePasswordStrength(localValue);

const { localeMessages } = useComponentLocaleMessages<typeof defaultConfig.i18n>(
  COMPONENT_NAME,
  defaultConfig.i18n,
  props?.config?.i18n,
);

const strengthLabels = computed(() => [
  localeMessages.value.weak,
  localeMessages.value.fair,
  localeMessages.value.good,
  localeMessages.value.strong,
]);

const strengthValue = computed(() => {
  const levels = { weak: 0, fair: 1, good: 2, strong: 3 };

  return levels[strength.value.level];
});

async function onClickShowPassword() {
  isShownPassword.value = !isShownPassword.value;

  await nextTick();

  inputRef.value?.inputRef?.focus();
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

const {
  getDataTest,
  config,
  passwordInputAttrs,
  passwordIconAttrs,
  passwordIconWrapperAttrs,
  strengthProgressAttrs,
} = useUI<Config>(defaultConfig, mutatedProps);
</script>

<template>
  <UInput
    :id="elementId"
    ref="input"
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
      <div v-bind="passwordIconWrapperAttrs" @click="onClickShowPassword">
        <!--
          @slot Use it to add something instead of the password icon.
          @binding {string} icon-name
          @binding {boolean} visible
        -->
        <slot name="right" :icon-name="passwordIcon" :visible="isShownPassword">
          <UIcon
            :name="passwordIcon"
            color="neutral"
            interactive
            v-bind="passwordIconAttrs"
            :data-test="getDataTest('password-icon')"
          />
        </slot>
      </div>
    </template>

    <template v-if="strengthProgress && localValue" #bottom>
      <!--
        @slot Use it to add something instead of the password strength indicator.
        @binding {object} strength
        @binding {array} labels
      -->
      <slot name="strength" :strength="strength" :labels="strengthLabels">
        <UProgress
          :value="strengthValue"
          :max="strengthLabels"
          :color="strength.color"
          :size="size"
          v-bind="strengthProgressAttrs"
          :data-test="getDataTest('strength-progress')"
        />
      </slot>
    </template>
  </UInput>
</template>
