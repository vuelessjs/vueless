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
    :label-outside="labelOutside"
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

      <UButton
        v-if="searchButton && !hasSlotContent(slots['right'])"
        :label="text"
        v-bind="buttonAttrs"
        :data-cy="`${dataCy}-right`"
        @click="onClickSearch"
      />
    </template>

    <template #right-icon>
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

      <UIcon
        v-if="!searchButton"
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
  </UInput>
</template>

<script setup>
import { computed, useSlots } from "vue";

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
   * Set component value.
   */
  modelValue: {
    type: String,
    default: "",
  },

  /**
   * Set input size.
   * @values sm, md, lg
   */
  size: {
    type: String,
    default: UIService.get(defaultConfig, UInputSearch).default.size,
  },

  /**
   * Generates unique element id.
   * @ignore
   */
  id: {
    type: String,
    default: () => getRandomId(),
  },

  /**
   * Set input disabled.
   */
  disabled: {
    type: Boolean,
    default: UIService.get(defaultConfig, UInputSearch).default.disabled,
  },

  /**
   * Search button text..
   */
  text: {
    type: String,
    default: "",
  },

  /**
   * Show / hide search button.
   */
  searchButton: {
    type: Boolean,
    default: UIService.get(defaultConfig, UInputSearch).default.searchButton,
  },

  /**
   * Input description.
   */
  description: {
    type: String,
    default: "",
  },

  /**
   * Show label outside the input block.
   */
  labelOutside: {
    type: Boolean,
    default: UIService.get(defaultConfig, UInputSearch).default.labelOutside,
  },

  /**
   * Input placeholder.
   */
  placeholder: {
    type: String,
    default: "",
  },

  /**
   * Input label.
   */
  label: {
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
   * Sets component ui config object.
   */
  config: {
    type: Object,
    default: () => ({}),
  },

  /**
   * Sets data-cy attribute for automated testing.
   */
  dataCy: {
    type: String,
    default: "",
  },
});

const slots = useSlots();
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
