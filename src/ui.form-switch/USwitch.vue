<script setup lang="ts">
import { computed, useId, useSlots, useTemplateRef } from "vue";

import useUI from "../composables/useUI";
import { getDefaults } from "../utils/ui";
import { useComponentLocaleMessages } from "../composables/useComponentLocaleMassages";

import UIcon from "../ui.image-icon/UIcon.vue";
import ULabel from "../ui.form-label/ULabel.vue";

import { COMPONENT_NAME } from "./constants";
import defaultConfig from "./config";

import type { Props, Config } from "./types";

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

const wrapperRef = useTemplateRef<HTMLDivElement>("wrapper");

const { localeMessages } = useComponentLocaleMessages<typeof defaultConfig.i18n>(
  COMPONENT_NAME,
  defaultConfig.i18n,
  props?.config?.i18n,
);

const checkedValue = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const slots = useSlots();

const elementId = props.id || useId();

const hasLabel = computed(() => Boolean(props.label || slots.label));

const inputAriaLabelledBy = computed(() => (hasLabel.value ? `label-${elementId}` : undefined));

const switchLabel = computed(() => {
  return checkedValue.value ? localeMessages.value.active : localeMessages.value.inactive;
});

const iconColor = computed(() => {
  return checkedValue.value ? props.color : "inherit";
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

function onClickWrapper() {
  toggle();
}

defineExpose({
  /**
   * A reference to the component's wrapper element for direct DOM manipulation.
   * @property {HTMLDivElement}
   */
  wrapperRef,
});

/**
 * Get element / nested component attributes for each config token ✨
 * Applies: `class`, `config`, redefined default `props` and dev `vl-...` attributes.
 */
const mutatedProps = computed(() => ({
  checked: Boolean(checkedValue.value),
}));

const {
  getDataTest,
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
    v-bind="switchLabelAttrs"
    :data-test="getDataTest()"
    @click="onClickToggle"
  >
    <template #label>
      <!--
        @slot Use this to add custom content instead of the label.
        @binding {string} label
      -->
      <slot name="label" :label="label" />
    </template>

    <div
      ref="wrapper"
      tabindex="0"
      v-bind="wrapperAttrs"
      @keydown.enter="onKeydownSpace"
      @keydown.space.prevent="onKeydownSpace"
      @click="onClickWrapper"
    >
      <input
        :id="elementId"
        v-model="checkedValue"
        tabindex="-1"
        type="checkbox"
        :disabled="disabled"
        :aria-labelledby="inputAriaLabelledBy"
        :aria-label="!hasLabel ? 'Switch' : undefined"
        v-bind="inputAttrs"
        @click="onClickToggle"
      />

      <span v-bind="circleAttrs">
        <UIcon
          v-if="toggleIcon"
          :name="toggleIconName"
          :color="iconColor"
          v-bind="toggleIconAttrs"
        />
      </span>

      <span v-if="toggleLabel" v-bind="toggleLabelAttrs" v-text="switchLabel" />
    </div>
  </ULabel>
</template>
