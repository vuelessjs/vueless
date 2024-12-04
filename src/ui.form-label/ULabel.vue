<script setup lang="ts">
import { computed, ref } from "vue";

import { getDefaults } from "../utils/ui.ts";

import defaultConfig from "./config.ts";
import { ULabel, PLACEMENT } from "./constants.ts";
import useAttrs from "./useAttrs.ts";

import type { ULabelProps, Config } from "./types.ts";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<ULabelProps>(), {
  ...getDefaults<ULabelProps, Config>(defaultConfig, ULabel),
});

const emit = defineEmits([
  /**
   * Triggers when the label is clicked.
   */
  "click",
]);

const labelRef = ref(null);
const wrapperRef = ref(null);

const { wrapperAttrs, contentAttrs, labelAttrs, descriptionAttrs } = useAttrs(props);

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
    <div v-if="label || error || description">
      <label
        v-if="label"
        :for="props.for"
        v-bind="labelAttrs"
        :data-test="`${dataTest}-label`"
        v-text="label"
      />

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
      v-if="label"
      ref="labelRef"
      :for="props.for"
      v-bind="labelAttrs"
      :data-test="`${dataTest}-label`"
      v-text="label"
    />

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
