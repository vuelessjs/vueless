<script setup lang="ts">
import { computed, ref } from "vue";

import useUI from "../composables/useUI.ts";
import { getDefaults } from "../utils/ui.ts";
import { hasSlotContent } from "../utils/helper.ts";

import defaultConfig from "./config.ts";
import { COMPONENT_NAME, PLACEMENT } from "./constants.ts";

import type { Props, Config } from "./types.ts";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<Props>(), {
  ...getDefaults<Props, Config>(defaultConfig, COMPONENT_NAME),
  label: "",
});

const emit = defineEmits([
  /**
   * Triggers when the label is clicked.
   */
  "click",
]);

const labelRef = ref<HTMLLabelElement | null>(null);
const wrapperRef = ref(null);

const isHorizontalPlacement = computed(() => {
  return props.align === PLACEMENT.left || props.align === PLACEMENT.right;
});

const isTopWithDescPlacement = computed(() => {
  return props.align === PLACEMENT.topWithDesc;
});

const labelElement = computed(() => {
  return labelRef.value;
});

const wrapperElement = computed(() => {
  return wrapperRef.value;
});

function onClick(event: MouseEvent) {
  emit("click", event);
}

defineExpose({
  /**
   * Reference to the label element.
   * @property {HTMLElement}
   */
  labelElement,

  /**
   * Reference to the wrapper element containing the label and content.
   * @property {HTMLElement}
   */
  wrapperElement,
});

/**
 * Get element / nested component attributes for each config token ✨
 * Applies: `class`, `config`, redefined default `props` and dev `vl-...` attributes.
 */
const mutatedProps = computed(() => ({
  error: Boolean(props.error),
}));

const { wrapperAttrs, contentAttrs, labelAttrs, descriptionAttrs } = useUI<Config>(
  defaultConfig,
  mutatedProps,
);
</script>

<template>
  <div
    v-if="isHorizontalPlacement || isTopWithDescPlacement"
    ref="wrapperRef"
    v-bind="wrapperAttrs"
    @click="onClick"
  >
    <div v-bind="contentAttrs">
      <!-- @slot Use it to add label content. -->
      <slot />
    </div>

    <!-- `v-bind` isn't assigned, because the div is system -->
    <div v-if="label || hasSlotContent($slots['label']) || error || description">
      <label
        v-if="label || hasSlotContent($slots['label'])"
        ref="labelRef"
        :for="props.for"
        v-bind="labelAttrs"
        :data-test="`${dataTest}-label`"
      >
        <!--
          @slot Use this to add custom content instead of the label.
          @binding {string} label
        -->
        <slot name="label" :label="label">
          {{ label }}
        </slot>
      </label>

      <div v-if="error" v-bind="descriptionAttrs" :data-test="`${dataTest}-error`" v-text="error" />

      <div
        v-if="description && !error"
        v-bind="descriptionAttrs"
        :data-test="`${dataTest}-description`"
        v-text="description"
      />

      <!-- @slot Use it to add something below the label content. -->
      <slot name="bottom" />
    </div>
  </div>

  <div v-else v-bind="wrapperAttrs">
    <label
      v-if="label || hasSlotContent($slots['label'])"
      v-bind="labelAttrs"
      ref="labelRef"
      :for="props.for"
      :data-test="`${dataTest}-label`"
    >
      <!--
        @slot Use this to add custom content instead of the label.
        @binding {string} label
      -->
      <slot name="label" :label="label">
        {{ label }}
      </slot>
    </label>

    <div v-bind="contentAttrs">
      <!-- @slot Use it to add label content. -->
      <slot />
    </div>

    <div v-if="error" v-bind="descriptionAttrs" :data-test="`${dataTest}-error`" v-text="error" />

    <div
      v-if="description && !error"
      v-bind="descriptionAttrs"
      :data-test="`${dataTest}-description`"
      v-text="description"
    />

    <!-- @slot Use it to add something below the label content. -->
    <slot name="bottom" />
  </div>
</template>
