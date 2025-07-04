<script setup lang="ts">
import { useId, ref, computed, watchEffect, useTemplateRef } from "vue";

import useUI from "../composables/useUI.ts";
import { getDefaults } from "../utils/ui.ts";
import { createDebounce } from "../utils/helper.ts";

import UIcon from "../ui.image-icon/UIcon.vue";
import UInput from "../ui.form-input/UInput.vue";
import UButton from "../ui.button/UButton.vue";

import { COMPONENT_NAME } from "./constants.ts";
import defaultConfig from "./config.ts";

import type { Props, Config } from "./types.ts";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<Props>(), {
  ...getDefaults<Props, Config>(defaultConfig, COMPONENT_NAME),
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
const searchInputRef = useTemplateRef<InstanceType<typeof UInput>>("searchInput");

const elementId = props.id || useId();

const input = computed(() => {
  return searchInputRef.value?.inputRef || null;
});

watchEffect(() => {
  updateValueWithDebounce = createDebounce((value) => {
    emit("update:modelValue", value);
  }, Number(props.debounce));
});

watchEffect(() => {
  localValue.value = props.modelValue;
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
   * Reference to the underlying input element inside UInput.
   * @property {InstanceType<typeof UInput>}
   */
  input,
});

/**
 * Get element / nested component attributes for each config token ✨
 * Applies: `class`, `config`, redefined default `props` and dev `vl-...` attributes.
 */
const {
  getDataTest,
  config,
  searchInputAttrs,
  searchInputWithButtonAttrs,
  searchIconAttrs,
  clearIconAttrs,
  searchButtonAttrs,
} = useUI<Config>(defaultConfig);
</script>

<template>
  <UInput
    :id="elementId"
    ref="searchInput"
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
    v-bind="searchButtonLabel ? searchInputWithButtonAttrs : searchInputAttrs"
    :data-test="getDataTest()"
    @update:model-value="onUpdateValue"
    @keyup.enter="onKeyupEnter"
  >
    <template #left>
      <!-- @slot Use it to add something before the text. -->
      <slot name="left" />
    </template>

    <template #right>
      <UIcon
        v-if="localValue"
        interactive
        color="neutral"
        :disabled="disabled"
        :name="config.defaults.clearIcon"
        v-bind="clearIconAttrs"
        :data-test="getDataTest('clear')"
        @click="onClickClear"
      />

      <!--
        @slot Use it to add something after the text.
        @binding {string} icon-name
      -->
      <slot
        name="right"
        :icon-name="rightIcon || config.defaults.searchIcon"
        :search-button-label="searchButtonLabel"
      >
        <UIcon
          v-if="!searchButtonLabel"
          interactive
          color="neutral"
          :disabled="disabled"
          :name="rightIcon || config.defaults.searchIcon"
          v-bind="searchIconAttrs"
          :data-test="getDataTest('search-icon')"
          @click="onClickSearch"
        />

        <UButton
          v-if="searchButtonLabel"
          :label="searchButtonLabel"
          v-bind="searchButtonAttrs"
          :data-test="getDataTest('search-button')"
          @click="onClickSearch"
        />
      </slot>
    </template>
  </UInput>
</template>
