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

<script setup>
import { computed, useId, ref, watchEffect } from "vue";

import UIcon from "../ui.image-icon/UIcon.vue";
import UInput from "../ui.form-input/UInput.vue";
import UButton from "../ui.button/UButton.vue";
import { getDefault } from "../utils/utilUI.js";
import { createDebounce } from "../utils/utilHelper.js";

import { UInputSearch } from "./constants.js";
import defaultConfig from "./config.js";
import useAttrs from "./useAttrs.js";

defineOptions({ inheritAttrs: false });

const props = defineProps({
  /**
   * Search input value.
   */
  modelValue: {
    type: String,
    default: "",
  },

  /**
   * Input size.
   * @values sm, md, lg
   */
  size: {
    type: String,
    default: getDefault(defaultConfig, UInputSearch).size,
  },

  /**
   * Input placeholder.
   */
  placeholder: {
    type: String,
    default: "",
  },

  /**
   * Label placement.
   * @values top, topInside, topWithDesc, left, right
   */
  labelAlign: {
    type: String,
    default: getDefault(defaultConfig, UInputSearch).labelAlign,
  },

  /**
   * Input label.
   */
  label: {
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
   * Minimum character length for search.
   */
  minLength: {
    type: [Number, String],
    default: getDefault(defaultConfig, UInputSearch).minLength,
  },

  /**
   * Search button label.
   */
  searchButtonLabel: {
    type: String,
    default: "",
  },

  /**
   * Time in milliseconds before value emit.
   */
  debounce: {
    type: [Number, String],
    default: getDefault(defaultConfig, UInputSearch).debounce,
  },

  /**
   * Left icon name.
   */
  leftIcon: {
    type: String,
    default: "",
  },

  /**
   * Right icon name.
   */
  rightIcon: {
    type: String,
    default: "",
  },

  /**
   * Make input read-only.
   */
  readonly: {
    type: Boolean,
    default: getDefault(defaultConfig, UInputSearch).readonly,
  },

  /**
   * Make input disabled.
   */
  disabled: {
    type: Boolean,
    default: getDefault(defaultConfig, UInputSearch).disabled,
  },

  /**
   * Unique element id.
   */
  id: {
    type: String,
    default: "",
  },

  /**
   * Component config object.
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

defineExpose({ inputRef });

const elementId = props.id || useId();

const { config, searchInputAttrs, searchIconAttrs, clearIconAttrs, searchButtonAttrs } =
  useAttrs(props);

const iconSize = computed(() => {
  const sizes = {
    sm: "xs",
    md: "sm",
    lg: "md",
  };

  return sizes[props.size];
});

const buttonSize = computed(() => {
  const sizes = {
    sm: "xs",
    md: "md",
    lg: "lg",
  };

  return sizes[props.size];
});

watchEffect(() => {
  updateValueWithDebounce = createDebounce((value) => {
    emit("update:modelValue", value);
  }, Number(props.debounce));
});

function onUpdateValue(value) {
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
</script>
