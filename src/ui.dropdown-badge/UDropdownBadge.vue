<script setup lang="ts">
import { computed, useTemplateRef } from "vue";

import { useUI } from "../composables/useUI";
import { getDefaults } from "../utils/ui";
import { useDropdownLabel } from "../ui.dropdown/useDropdownLabel";

import UIcon from "../ui.image-icon/UIcon.vue";
import UBadge from "../ui.text-badge/UBadge.vue";
import UDropdown from "../ui.dropdown/UDropdown.vue";

import defaultConfig from "./config";
import { COMPONENT_NAME } from "./constants";

import type { Props, Config } from "./types";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<Props>(), {
  ...getDefaults<Props, Config>(defaultConfig, COMPONENT_NAME),
  options: () => [],
  modelValue: "",
  label: "",
});

const emit = defineEmits([
  /**
   * Triggers on a dropdown option click.
   * @property {string} value
   */
  "clickOption",

  /**
   * Triggers when an option is selected.
   * @property {string} value
   * @property {number} value
   */
  "update:modelValue",

  /**
   * Triggers when a dropdown list is opened.
   */
  "open",

  /**
   * Triggers when a dropdown list is closed.
   */
  "close",

  /**
   * Triggers when the search value is changed.
   * @property {string} query
   */
  "searchChange",

  /**
   * Triggers when the search v-model updates.
   * @property {string} query
   */
  "update:search",
]);

type UDropdownRef = InstanceType<typeof UDropdown>;

const dropdownRef = useTemplateRef<UDropdownRef>("dropdown");

const toggleIconName = computed(() => {
  if (typeof props.toggleIcon === "string") {
    return props.toggleIcon;
  }

  return props.toggleIcon ? config.value.defaults.toggleIcon : "";
});

const { displayLabel } = useDropdownLabel({
  label: () => props.label,
  labelDisplayCount: () => props.labelDisplayCount,
  labelKey: () => props.labelKey,
  selectedOptions: () => dropdownRef.value?.selectedOptions ?? [],
});

function hide() {
  dropdownRef.value?.hide();
}

defineExpose({
  /**
   * A reference to the component's wrapper element for direct DOM manipulation.
   * @property {HTMLDivElement}
   */
  wrapperRef: computed(() => dropdownRef.value?.wrapperRef),

  /**
   * Hides the dropdown.
   * @property {function}
   */
  hide,
});

/*
 * Vueless: Get element / nested component attributes for each config token ✨
 * Applies: `class`, `config`, redefined default `props` and dev `vl-...` attributes.
 */
const mutatedProps = computed(() => ({
  /* component state, not a props */
  opened: dropdownRef.value?.isOpened ?? false,
}));

const { getDataTest, config, toggleBadgeAttrs, dropdownBadgeAttrs, toggleIconAttrs } =
  useUI<Config>(defaultConfig, mutatedProps, "toggleBadge");
</script>

<template>
  <UDropdown
    :id="id"
    ref="dropdown"
    v-model="modelValue"
    v-model:search="search"
    :y-position="yPosition"
    :x-position="xPosition"
    :disabled="disabled"
    :options="options"
    :options-limit="optionsLimit"
    :visible-options="visibleOptions"
    :label-key="labelKey"
    :value-key="valueKey"
    :group-label-key="groupLabelKey"
    :group-value-key="groupValueKey"
    :searchable="searchable"
    :multiple="multiple"
    :color="color"
    :size="size"
    :close-on-select="closeOnSelect"
    v-bind="dropdownBadgeAttrs"
    :data-test="dataTest"
    @click-option="(option) => emit('clickOption', option)"
    @update:model-value="(value) => emit('update:modelValue', value)"
    @update:search="(value) => emit('update:search', value)"
    @search-change="(query) => emit('searchChange', query)"
    @open="emit('open')"
    @close="emit('close')"
  >
    <template #default="{ opened }">
      <UBadge
        :label="displayLabel"
        :size="size"
        :color="color"
        :variant="variant"
        :round="round"
        :title="dropdownRef?.getFullOptionLabels()"
        v-bind="toggleBadgeAttrs"
        tabindex="0"
        :data-test="getDataTest()"
      >
        <template #left>
          <!--
            @slot Use it to add something before the label.
            @binding {boolean} opened
          -->
          <slot name="left" :opened="opened" />
        </template>

        <template #default>
          <!--
            @slot Use it to add something instead of the default label.
            @binding {string} label
            @binding {boolean} opened
          -->
          <slot :label="displayLabel" :opened="opened" />
        </template>

        <template #right>
          <!--
            @slot Use it to add something instead of the toggle icon.
            @binding {boolean} opened
          -->
          <slot name="toggle" :opened="opened">
            <UIcon
              v-if="toggleIconName"
              color="inherit"
              :name="toggleIconName"
              v-bind="toggleIconAttrs"
              :data-test="getDataTest('dropdown')"
            />
          </slot>
        </template>
      </UBadge>
    </template>

    <template #before-option="{ option, index }">
      <!--
        @slot Use it to add something before option.
        @binding {object} option
        @binding {number} index
      -->
      <slot name="before-option" :option="option" :index="index" />
    </template>

    <template #option="{ option, index }">
      <!--
        @slot Use it to customize the option.
        @binding {object} option
        @binding {number} index
      -->
      <slot name="option" :option="option" :index="index" />
    </template>

    <template #after-option="{ option, index }">
      <!--
        @slot Use it to add something after option.
        @binding {object} option
        @binding {number} index
      -->
      <slot name="after-option" :option="option" :index="index" />
    </template>

    <template #empty>
      <!-- @slot Use it to add something instead of empty state. -->
      <slot name="empty" />
    </template>
  </UDropdown>
</template>
