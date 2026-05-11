<script setup lang="ts">
import { computed, useTemplateRef, useSlots, useId } from "vue";

import { useUI } from "../composables/useUI";
import { getDefaults } from "../utils/ui";
import { hasSlotContent } from "../utils/helper";

import defaultConfig from "./config";
import { COMPONENT_NAME, PLACEMENT } from "./constants";

import type { Props, Config } from "./types";

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

const slots = useSlots();

const elementId = props.id || useId();

const wrapperRef = useTemplateRef<HTMLDivElement>("wrapper");
const labelRef = useTemplateRef<HTMLLabelElement>("label");

const isHorizontalPlacement = computed(() => {
  return props.align === PLACEMENT.left || props.align === PLACEMENT.right;
});

const tag = computed(() => {
  return props.for ? "label" : "div";
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

const hasErrorState = computed(() => {
  return Boolean(props.error) && !props.disabled;
});

const errorFallbackText = computed(() => {
  return typeof props.error === "string" ? props.error : "";
});

const showErrorBlock = computed(() => {
  if (!hasErrorState.value) return false;

  return (
    hasSlotContent(slots["error"], { error: props.error }) ||
    (typeof props.error !== "boolean" && Boolean(props.error))
  );
});

function onClick(event: MouseEvent) {
  emit("click", event);
}

defineExpose({
  /**
   * Reference to the label element.
   * @property {HTMLLabelElement}
   */
  labelElement,

  /**
   * Reference to the wrapper element containing the label and content.
   * @property {HTMLDivElement}
   */
  wrapperElement,
});

/**
 * Get element / nested component attributes for each config token ✨
 * Applies: `class`, `config`, redefined default `props` and dev `vl-...` attributes.
 */
const mutatedProps = computed(() => ({
  error: hasErrorState.value,
  label: Boolean(props.label) || hasSlotContent(slots["label"], { label: props.label }),
  description:
    Boolean(props.description) ||
    hasSlotContent(slots["description"], { description: props.description }),
  for: Boolean(props.for),
}));

const { getDataTest, wrapperAttrs, contentAttrs, labelAttrs, descriptionAttrs, errorAttrs } =
  useUI<Config>(defaultConfig, mutatedProps);
</script>

<template>
  <div
    v-if="isHorizontalPlacement || isTopWithDescPlacement"
    ref="wrapper"
    v-bind="wrapperAttrs"
    :data-test="getDataTest()"
  >
    <div v-bind="contentAttrs" :data-test="getDataTest('content')">
      <!-- @slot Use it to add label content. -->
      <slot />
    </div>

    <!-- `v-bind` isn't assigned, because the div is system -->
    <div
      v-if="
        label ||
        hasSlotContent(slots['label'], { label }) ||
        error ||
        hasSlotContent(slots['error'], { error }) ||
        description ||
        hasSlotContent(slots['description'], { description })
      "
    >
      <component
        :is="tag"
        v-if="label || hasSlotContent(slots['label'], { label })"
        :id="elementId"
        ref="label"
        :for="props.for"
        v-bind="labelAttrs"
        :data-test="getDataTest('label')"
        @click="onClick"
      >
        <!--
          @slot Use this to add custom content instead of the label.
          @binding {string} label
        -->
        <slot name="label" :label="label">
          {{ label }}
        </slot>
      </component>

      <div v-if="showErrorBlock" v-bind="errorAttrs" :data-test="getDataTest('error')">
        <!--
          @slot Use this to add custom content instead of the error message.
          @binding {string | boolean} error
        -->
        <slot name="error" :error="error">
          {{ errorFallbackText }}
        </slot>
      </div>

      <div
        v-if="
          (description || hasSlotContent(slots['description'], { description })) && !hasErrorState
        "
        v-bind="descriptionAttrs"
        :data-test="getDataTest('description')"
      >
        <!--
          @slot Use this to add custom content instead of the description.
          @binding {string} description
        -->
        <slot name="description" :description="description">
          {{ description }}
        </slot>
      </div>
    </div>
  </div>

  <div v-else ref="wrapper" v-bind="wrapperAttrs">
    <component
      :is="tag"
      v-if="label || hasSlotContent(slots['label'], { label })"
      :id="elementId"
      v-bind="labelAttrs"
      ref="label"
      :for="props.for"
      :data-test="getDataTest('label')"
      @click="onClick"
    >
      <!--
        @slot Use this to add custom content instead of the label.
        @binding {string} label
      -->
      <slot name="label" :label="label">
        {{ label }}
      </slot>
    </component>

    <div v-bind="contentAttrs" :data-test="getDataTest('content')">
      <!-- @slot Use it to add label content. -->
      <slot />
    </div>

    <div v-if="showErrorBlock" v-bind="errorAttrs" :data-test="getDataTest('error')">
      <!--
        @slot Use this to add custom content instead of the error message.
        @binding {string | boolean} error
      -->
      <slot name="error" :error="error">
        {{ errorFallbackText }}
      </slot>
    </div>

    <div
      v-if="
        (description || hasSlotContent(slots['description'], { description })) && !hasErrorState
      "
      v-bind="descriptionAttrs"
      :data-test="getDataTest('description')"
    >
      <!--
        @slot Use this to add custom content instead of the description.
        @binding {string} description
      -->
      <slot name="description" :description="description">
        {{ description }}
      </slot>
    </div>
  </div>
</template>
