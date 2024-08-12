<template>
  <UInput
    :id="id"
    ref="searchInput"
    v-model="search"
    :size="size"
    :disabled="disabled"
    :label-align="labelAlign"
    :label="label"
    :error="error"
    :description="description"
    :placeholder="placeholder"
    inputmode="search"
    :data-cy="dataCy"
    v-bind="inputAttrs"
    @keyup.enter="onClickSearch"
  >
    <template #left>
      <!-- @slot Use it to add something before the text. -->
      <slot name="left" />
    </template>

    <template #icon-left>
      <!-- @slot Use it to add icon before the text. -->
      <slot name="icon-left" />
    </template>

    <template #icon-right>
      <UIcon
        internal
        interactive
        color="gray"
        :name="config.closeIconName"
        :data-cy="`${dataCy}-close`"
        :size="iconSize"
        v-bind="closeIconAttrs"
        @click="onClickClear"
      />

      <!-- @slot Use it to add icon after the text. -->
      <slot
        name="icon-right"
        :icon-name="config.searchIconName"
        :icon-size="iconSize"
        :search-button-label="searchButtonLabel"
      >
        <UIcon
          v-if="!searchButtonLabel"
          internal
          interactive
          :size="iconSize"
          :name="config.searchIconName"
          :data-cy="`${dataCy}-search`"
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
          no-ring
          v-bind="buttonAttrs"
          :data-cy="`${dataCy}-right`"
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
import UIService, { getRandomId } from "../service.ui";

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
    default: UIService.get(defaultConfig, UInputSearch).default.size,
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
    default: UIService.get(defaultConfig, UInputSearch).default.labelAlign,
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
   * Set input disabled.
   */
  disabled: {
    type: Boolean,
    default: UIService.get(defaultConfig, UInputSearch).default.disabled,
  },

  /**
   * Unique element id.
   * @ignore
   */
  id: {
    type: String,
    default: () => getRandomId(),
  },

  /**
   * Component ui config object.
   */
  config: {
    type: Object,
    default: () => ({}),
  },

  /**
   * Data-cy attribute for automated testing.
   */
  dataCy: {
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

const { config, inputAttrs, searchIconAttrs, closeIconAttrs, buttonAttrs } = useAttrs(props);

const search = computed({
  get: () => props.modelValue,
  set: (value) => {
    localValue.value = value;
    emit("update:modelValue", value);
  },
});

const iconSize = computed(() => {
  const sizes = {
    sm: "xs",
    md: "sm",
    lg: "md",
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
