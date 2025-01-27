<script setup lang="ts">
import { computed, useId } from "vue";
import { merge } from "lodash-es";

import useUI from "../composables/useUI.ts";
import { getDefaults } from "../utils/ui.ts";

import UIcon from "../ui.image-icon/UIcon.vue";
import ULabel from "../ui.form-label/ULabel.vue";

import { COMPONENT_NAME } from "./constants.ts";
import defaultConfig from "./config.ts";
import { useLocale } from "../composables/useLocale.ts";

import type { Props, Config } from "./types.ts";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<Props>(), {
  ...getDefaults<Props, Config>(defaultConfig, COMPONENT_NAME),
  modelValue: false,
  label: "",
});

const emit = defineEmits([
  /**
   * Triggers when switch value changes.
   * @property {Boolean} value
   */
  "update:modelValue",
]);

const { tm } = useLocale();

const i18nGlobal = tm(COMPONENT_NAME);
const currentLocale = computed(() => merge({}, defaultConfig.i18n, i18nGlobal, props.config?.i18n));

const checkedValue = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const elementId = props.id || useId();

const switchLabel = computed(() => {
  return checkedValue.value ? currentLocale.value.active : currentLocale.value.inactive;
});

const iconColor = computed(() => {
  return checkedValue.value ? props.color : "grayscale";
});

const toggleIconName = computed(() => {
  return checkedValue.value ? config.value.defaults.onIcon : config.value.defaults.offIcon;
});

function toggle() {
  if (!props.disabled) {
    checkedValue.value = !checkedValue.value;
  }
}

function onClickToggle() {
  toggle();
}

function onKeydownSpace() {
  toggle();
}

/**
 * Get element / nested component attributes for each config token ✨
 * Applies: `class`, `config`, redefined default `props` and dev `vl-...` attributes.
 */
const mutatedProps = computed(() => ({
  checked: Boolean(checkedValue.value),
}));

const {
  config,
  toggleIconAttrs,
  switchLabelAttrs,
  inputAttrs,
  wrapperAttrs,
  circleAttrs,
  toggleLabelAttrs,
} = useUI<Config>(defaultConfig, mutatedProps);
</script>

<template>
  <ULabel
    :for="elementId"
    :size="size"
    :label="label"
    :description="description"
    :align="labelAlign"
    :disabled="disabled"
    interactive
    v-bind="switchLabelAttrs"
    :data-test="dataTest"
    @click="onClickToggle"
  >
    <template #label>
      <!--
        @slot Use this to add custom content instead of the label.
        @binding {string} label
      -->
      <slot name="label" :label="label" />
    </template>

    <label
      tabindex="0"
      :for="elementId"
      v-bind="wrapperAttrs"
      @keydown.enter="onKeydownSpace"
      @keydown.space.prevent="onKeydownSpace"
    >
      <input
        :id="elementId"
        v-model="checkedValue"
        tabindex="-1"
        type="checkbox"
        :disabled="disabled"
        v-bind="inputAttrs"
        @click="onClickToggle"
      />

      <span v-bind="circleAttrs">
        <UIcon
          v-if="toggleIcon"
          internal
          :name="toggleIconName"
          :color="iconColor"
          v-bind="toggleIconAttrs"
        />
      </span>

      <span v-if="toggleLabel" v-bind="toggleLabelAttrs" v-text="switchLabel" />
    </label>
  </ULabel>
</template>
