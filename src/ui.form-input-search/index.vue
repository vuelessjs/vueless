<template>
  <UInput
    :id="id"
    ref="searchInput"
    v-model="search"
    :size="size"
    :disabled="disabled"
    :description="description"
    :label="label"
    :error="error"
    :placeholder="placeholder"
    :type="search"
    :input-mode="search"
    :data-cy="dataCy"
    :label-align="labelAlign"
    v-bind="inputAttrs"
    @keyup.enter="onClickSearch"
  >
    <template #left>
      <!-- @slot Use it to add something before text. -->
      <slot name="left" />
    </template>

    <template #right>
      <!-- @slot Use it to add something before text. -->
      <slot name="right" />

      <template v-if="!hasSlotContent($slots['right'])">
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

        <UButton
          v-if="searchButtonLabel"
          :label="searchButtonLabel"
          v-bind="buttonAttrs"
          :data-cy="`${dataCy}-right`"
          @click="onClickSearch"
        />

        <UIcon
          v-else
          internal
          interactive
          :size="iconSize"
          color="grayscale"
          :name="config.searchIconName"
          :data-cy="`${dataCy}-search`"
          v-bind="searchIconAttrs"
          @click="onClickSearch"
        />
      </template>
    </template>
  </UInput>
</template>

<script setup>
import { computed } from "vue";

import UIcon from "../ui.image-icon";
import UInput from "../ui.form-input";
import UButton from "../ui.button";
import UIService, { getRandomId } from "../service.ui";

import { UInputSearch } from "./constants";
import defaultConfig from "./configs/default.config";
import { useAttrs } from "./composables/attrs.composable";

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
   * @values top, topInside, topWithDesc, bottom, left, right
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

const emit = defineEmits(["update:modelValue", "clear", "search"]);

const { config, inputAttrs, searchIconAttrs, closeIconAttrs, buttonAttrs, hasSlotContent } =
  useAttrs(props);

const search = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
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
  if (!search.value) return;
  emit("search", search.value);
}
</script>
