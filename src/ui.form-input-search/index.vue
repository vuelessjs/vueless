<template>
  <UInput
    :id="id"
    ref="searchInput"
    v-model="search"
    :size="size"
    :disabled="disabled"
    :readonly="readonly"
    :label-align="labelAlign"
    :label="label"
    :error="error"
    :description="description"
    :placeholder="placeholder"
    inputmode="search"
    :data-test="dataTest"
    :left-icon="leftIcon"
    v-bind="inputAttrs"
    @keyup.enter="onClickSearch"
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
        v-if="modelValue"
        internal
        interactive
        color="gray"
        :name="config.clearIconName"
        :data-test="`${dataTest}-close`"
        :size="iconSize"
        v-bind="clearIconAttrs"
        @click="onClickClear"
      />

      <!-- @slot Use it to add icon after the text. -->
      <slot
        name="right-icon"
        :icon-name="config.searchIconName"
        :icon-size="iconSize"
        :search-button-label="searchButtonLabel"
      >
        <UIcon
          v-if="!searchButtonLabel"
          internal
          interactive
          :size="iconSize"
          :name="rightIcon || config.searchIconName"
          :data-test="`${dataTest}-search`"
          v-bind="searchIconAttrs"
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
          v-bind="buttonAttrs"
          :data-test="`${dataTest}-right`"
          @click="onClickSearch"
        />
      </slot>
    </template>
  </UInput>
</template>

<script setup>
import { computed, ref } from "vue";

import UIcon from "../ui.image-icon";
import UInput from "../ui.form-input";
import UButton from "../ui.button";
import { getRandomId, getDefault } from "../service.ui";
import { debounce as debounceMethod } from "../service.helper";

import { UInputSearch } from "./constants";
import defaultConfig from "./configs/default.config";
import useAttrs from "./composables/attrs.composable";

/* Should be a string for correct web-types gen */
defineOptions({ name: "UInputSearch" });

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
   * Left side icon name.
   */
  leftIcon: {
    type: String,
    default: "",
  },

  /**
   * Right side icon name.
   */
  rightIcon: {
    type: String,
    default: "",
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
   * Search button label.
   */
  searchButtonLabel: {
    type: String,
    default: "",
  },

  /**
   * Set input read-only.
   */
  readonly: {
    type: Boolean,
    default: getDefault(defaultConfig, UInputSearch).readonly,
  },

  /**
   * Set input disabled.
   */
  disabled: {
    type: Boolean,
    default: getDefault(defaultConfig, UInputSearch).disabled,
  },

  /**
   * Unique element id.
   * @ignore
   */
  id: {
    type: String,
    default: () => getRandomId(),
  },

  debounce: {
    type: Number,
    default: getDefault(defaultConfig, UInputSearch).debounce,
  },

  /**
   * Component ui config object.
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

const localValue = ref("");

const { config, inputAttrs, searchIconAttrs, clearIconAttrs, buttonAttrs } = useAttrs(props);

const search = computed({
  get: () => props.modelValue,
  set: debounceMethod((value) => {
    localValue.value = value;
    emit("update:modelValue", value);
  }, props.debounce),
});

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

function onClickClear() {
  search.value = "";
  emit("clear");
}

function onClickSearch() {
  if (!localValue.value) return;
  emit("search", localValue.value);
}
</script>
