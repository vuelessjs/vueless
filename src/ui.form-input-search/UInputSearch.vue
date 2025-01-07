<script setup lang="ts">
import { useId, ref, watchEffect } from "vue";

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
const inputRef = ref(null);

const elementId = props.id || useId();

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
   * A reference to the input element for direct DOM manipulation.
   * @property {HTMLElement}
   */
  inputRef,
});

/**
 * Get element / nested component attributes for each config token ✨
 * Applies: `class`, `config`, redefined default `props` and dev `vl-...` attributes.
 */
const {
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
    v-bind="searchButtonLabel ? searchInputWithButtonAttrs : searchInputAttrs"
    :data-test="dataTest"
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
        internal
        interactive
        color="gray"
        :name="config.defaults.clearIcon"
        v-bind="clearIconAttrs"
        :data-test="`${dataTest}-clear`"
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
          internal
          interactive
          :name="rightIcon || config.defaults.searchIcon"
          v-bind="searchIconAttrs"
          :data-test="`${dataTest}-search-icon`"
          @click="onClickSearch"
        />

        <UButton
          v-if="searchButtonLabel"
          :label="searchButtonLabel"
          :ring="false"
          v-bind="searchButtonAttrs"
          :data-test="`${dataTest}-search-button`"
          @click="onClickSearch"
        />
      </slot>
    </template>
  </UInput>
</template>
