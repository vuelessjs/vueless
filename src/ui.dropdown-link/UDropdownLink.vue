<script setup lang="ts">
import { nextTick, computed, provide, ref, useId, useTemplateRef } from "vue";

import useUI from "../composables/useUI.ts";
import { getDefaults } from "../utils/ui.ts";

import UIcon from "../ui.image-icon/UIcon.vue";
import ULink from "../ui.button-link/ULink.vue";
import UDropdownList from "../ui.dropdown-list/UDropdownList.vue";

import { vClickOutside } from "../directives";

import { COMPONENT_NAME } from "./constants.ts";
import defaultConfig from "./config.ts";

import type { Props, Config } from "./types.ts";
import type { Option } from "../ui.dropdown-list/types.ts";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<Props>(), {
  ...getDefaults<Props, Config>(defaultConfig, COMPONENT_NAME),
  options: () => [],
  modelValue: "",
  label: "",
});

const emit = defineEmits([
  /**
   * Triggers on dropdown option click.
   * @property {string} value
   */
  "clickOption",

  /**
   * Triggers when option is selected.
   * @property {string} value
   * @property {number} value
   */
  "update:modelValue",
]);

provide("hideDropdownOptions", hideOptions);

type UDropdownListRef = InstanceType<typeof UDropdownList>;

const isShownOptions = ref(false);
const dropdownListRef = useTemplateRef<UDropdownListRef>("dropdown-list");
const wrapperRef = useTemplateRef<HTMLDivElement>("wrapper");

const elementId = props.id || useId();

const dropdownValue = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const selectedOptions = computed(() => {
  if (props.multiple) {
    return props.options.filter(
      (option) => option.id && (dropdownValue.value as (string | number)[]).includes(option.id),
    );
  }

  return props.options.filter((option) => option.id === dropdownValue.value);
});

const selectableLinkLabel = computed(() => {
  if (!selectedOptions.value.length) return props.label;

  return selectedOptions.value.map((option) => option[props.labelKey]).join(", ");
});

function onClickLink() {
  if (props.disabled) return;

  isShownOptions.value = !isShownOptions.value;

  if (isShownOptions.value) {
    nextTick(() => dropdownListRef.value?.wrapperRef?.focus());
  }
}

function hideOptions() {
  isShownOptions.value = false;
}

function onClickOption(option: Option) {
  emit("clickOption", option);

  hideOptions();
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
  /* component state, not a props */
  opened: isShownOptions.value,
}));

const {
  config,
  getDataTest,
  wrapperAttrs,
  dropdownLinkAttrs,
  dropdownListAttrs,
  toggleIconAttrs,
  dropdownLinkLabelAttrs,
} = useUI<Config>(defaultConfig, mutatedProps);
</script>

<template>
  <div
    ref="wrapper"
    v-click-outside="hideOptions"
    tabindex="1"
    v-bind="wrapperAttrs"
    @keydown.enter="onClickLink"
    @keydown.space.prevent="onClickLink"
  >
    <!--
      @slot Use it to add something before the label.
      @binding {boolean} opened
    -->
    <slot name="left" :opened="isShownOptions" />

    <ULink
      :id="elementId"
      tabindex="-1"
      :size="size"
      :label="selectableLinkLabel"
      :color="color"
      :dashed="dashed"
      :disabled="disabled"
      :underlined="underlined"
      v-bind="dropdownLinkAttrs"
      :data-test="getDataTest()"
      @click="onClickLink"
    >
      <template #default>
        <!--
          @slot Use it to add something instead of the default label.
          @binding {string} label
          @binding {boolean} opened
        -->
        <slot :label="selectableLinkLabel" :opened="isShownOptions">
          <span
            v-bind="dropdownLinkLabelAttrs"
            :title="selectedOptions.length >= 2 ? selectableLinkLabel : ''"
            v-text="selectableLinkLabel"
          />
        </slot>
      </template>
    </ULink>

    <!--
      @slot Use it to add something instead of the toggle icon.
      @binding {boolean} opened
      @binding {function} toggle
    -->
    <slot name="toggle" :opened="isShownOptions" :toggle="onClickLink">
      <UIcon
        v-if="!noIcon"
        internal
        interactive
        :color="color"
        :disabled="disabled"
        :name="config.defaults.toggleIcon"
        v-bind="toggleIconAttrs"
        :data-test="getDataTest('toggle')"
        @click="onClickLink"
      />
    </slot>

    <UDropdownList
      v-if="isShownOptions"
      ref="dropdown-list"
      v-model="dropdownValue"
      :multiple="multiple"
      :size="size"
      :color="color"
      :options="options"
      :label-key="labelKey"
      value-key="id"
      v-bind="dropdownListAttrs"
      :data-test="getDataTest('list')"
      @click-option="onClickOption"
    />
  </div>
</template>
