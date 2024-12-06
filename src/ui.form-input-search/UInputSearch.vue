<script setup lang="ts">
import { computed, useId, ref, watchEffect } from "vue";

import useUI from "../composables/useUI.ts";
import { getDefaults } from "../utils/ui.ts";
import { createDebounce } from "../utils/helper.ts";

import UIcon from "../ui.image-icon/UIcon.vue";
import UInput from "../ui.form-input/UInput.vue";
import UButton from "../ui.button/UButton.vue";

import { UInputSearch } from "./constants.ts";
import defaultConfig from "./config.ts";

import type { Props, IconSize, ButtonSize, Config } from "./types.ts";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<Props>(), {
  ...getDefaults<Props, Config>(defaultConfig, UInputSearch),
  modelValue: "",
  label: "",
  placeholder: "",
});

const emit = defineEmits([
  /**
   * Triggers when the input value changes.
   * @property {string} value
   */
  "update:modelValue",

  /**
   * Triggers when the input value is cleared.
   */
  "clear",

  /**
   * Triggers when the search button is clicked.
   * @property {string} value
   */
  "search",
]);

let updateValueWithDebounce = createDebounce((value) => {
  emit("update:modelValue", value);
}, Number(props.debounce));

const localValue = ref("");
const inputRef = ref(null);

const elementId = props.id || useId();

const iconSize = computed(() => {
  const sizes = {
    sm: "xs",
    md: "sm",
    lg: "md",
  };

  return sizes[props.size] as IconSize;
});

const buttonSize = computed(() => {
  const sizes = {
    sm: "xs",
    md: "md",
    lg: "lg",
  };

  return sizes[props.size] as ButtonSize;
});

watchEffect(() => {
  updateValueWithDebounce = createDebounce((value) => {
    emit("update:modelValue", value);
  }, Number(props.debounce));
});

function onUpdateValue(value: string) {
  localValue.value = value;

  if (!value) {
    updateValueWithDebounce(value);

    return;
  }

  if (value.length >= Number(props.minLength)) {
    updateValueWithDebounce(value);
  }
}

function search() {
  if (localValue.value && localValue.value.length >= Number(props.minLength)) {
    emit("search", localValue.value);
  }
}

function onKeyupEnter() {
  search();
}

function onClickSearch() {
  search();
}

function onClickClear() {
  localValue.value = "";

  emit("update:modelValue", "");
  emit("clear");
}

defineExpose({
  /**
   * A reference to the input element for direct DOM manipulation.
   * @property {HTMLElement}
   */
  inputRef,
});

/**
 * Get element / nested component attributes for each config token ✨
 * Applies: `class`, `config`, redefined default `props` and dev `vl-...` attributes.
 */

const { config, searchInputAttrs, searchIconAttrs, clearIconAttrs, searchButtonAttrs } =
  useUI<Config>(defaultConfig);
</script>

<template>
  <UInput
    :id="elementId"
    ref="inputRef"
    :model-value="localValue"
    :size="size"
    :disabled="disabled"
    :readonly="readonly"
    :label-align="labelAlign"
    :label="label"
    :error="error"
    :description="description"
    :placeholder="placeholder"
    inputmode="search"
    :left-icon="leftIcon"
    v-bind="searchInputAttrs"
    :data-test="dataTest"
    @update:model-value="onUpdateValue"
    @keyup.enter="onKeyupEnter"
  >
    <template #left>
      <!-- @slot Use it to add something before the text. -->
      <slot name="left" />
    </template>

    <template #left-icon>
      <!-- @slot Use it to add icon before the text. -->
      <slot name="left-icon" />
    </template>

    <template #right-icon>
      <UIcon
        v-if="localValue"
        internal
        interactive
        color="gray"
        :name="config.defaults.clearIcon"
        :size="iconSize"
        v-bind="clearIconAttrs"
        :data-test="`${dataTest}-clear`"
        @click="onClickClear"
      />

      <!-- @slot Use it to add icon after the text. -->
      <slot
        name="right-icon"
        :icon-name="config.defaults.searchIcon"
        :icon-size="iconSize"
        :search-button-label="searchButtonLabel"
      >
        <UIcon
          v-if="!searchButtonLabel"
          internal
          interactive
          :size="iconSize"
          :name="rightIcon || config.defaults.searchIcon"
          v-bind="searchIconAttrs"
          :data-test="`${dataTest}-search-icon`"
          @click="onClickSearch"
        />
      </slot>
    </template>

    <template #right>
      <!-- @slot Use it to add something after the text. -->
      <slot name="right">
        <UButton
          v-if="searchButtonLabel"
          :label="searchButtonLabel"
          :size="buttonSize"
          no-ring
          v-bind="searchButtonAttrs"
          :data-test="`${dataTest}-search-button`"
          @click="onClickSearch"
        />
      </slot>
    </template>
  </UInput>
</template>
