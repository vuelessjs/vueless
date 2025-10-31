<script setup lang="ts">
import { nextTick, computed, ref, useId, useTemplateRef } from "vue";

import { useUI } from "../composables/useUI";
import { getDefaults } from "../utils/ui";

import vClickOutside from "../v.click-outside/vClickOutside";

import defaultConfig from "./config";
import { COMPONENT_NAME } from "./constants";

import type { Props, Config } from "./types";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<Props>(), {
  ...getDefaults<Props, Config>(defaultConfig, COMPONENT_NAME),
});

const emit = defineEmits([
  /**
   * Triggers when the opened state changes.
   * @property {boolean} value
   */
  "update:open",

  /**
   * Triggers when collapsible is opened.
   */
  "open",

  /**
   * Triggers when collapsible is closed.
   */
  "close",
]);

const internalIsOpened = ref(false);
const isClickingContent = ref(false);

const wrapperRef = useTemplateRef<HTMLDivElement>("wrapper");
const elementId = props.id || useId();

const isOpened = computed({
  get: () => props.open ?? internalIsOpened.value,
  set: (value) => {
    if (props.open !== undefined) {
      emit("update:open", value);
    } else {
      internalIsOpened.value = value;
    }
  },
});

function handleClickOutside() {
  if (isClickingContent.value || !props.closeOnOutside) {
    return;
  }

  hide();
}

function toggle() {
  if (props.disabled) return;

  isOpened.value = !isOpened.value;

  isOpened.value ? emit("open") : emit("close");
}

function hide() {
  isOpened.value = false;

  emit("close");
}

function show() {
  if (props.disabled) return;

  isOpened.value = true;

  emit("open");
}

function onContentClick() {
  if (!props.closeOnContent) {
    isClickingContent.value = true;

    nextTick(() => {
      isClickingContent.value = false;
    });

    return;
  }

  hide();
}

defineExpose({
  /**
   * A reference to the component's wrapper element for direct DOM manipulation.
   * @property {HTMLDivElement}
   */
  wrapperRef,

  /**
   * Hides the collapsible content.
   * @property {function}
   */
  hide,

  /**
   * Shows the collapsible content.
   * @property {function}
   */
  show,

  /**
   * Toggles the collapsible visibility.
   * @property {function}
   */
  toggle,

  /**
   * Indicates whether the collapsible is opened.
   * @property {boolean}
   */
  isOpened,
});

/**
 * Get element / nested component attributes for each config token ✨
 * Applies: `class`, `config`, redefined default `props` and dev `vl-...` attributes.
 */
const mutatedProps = computed(() => ({
  /* component state, not a props */
  opened: isOpened.value,
}));

const { getDataTest, config, wrapperAttrs, contentAttrs } = useUI<Config>(
  defaultConfig,
  mutatedProps,
);
</script>

<template>
  <div
    :id="elementId"
    ref="wrapper"
    v-click-outside="handleClickOutside"
    v-bind="wrapperAttrs"
    :data-test="getDataTest('wrapper')"
    @click="toggle"
  >
    <!--
      @slot Use it to add custom trigger element for the collapsible.
      @binding {boolean} opened
    -->
    <slot :opened="isOpened" />

    <Transition v-bind="config.contentTransition">
      <!--
        @slot Use it to add collapsible content.
        @binding {boolean} opened
      -->
      <div
        v-if="isOpened"
        v-bind="contentAttrs"
        :data-test="getDataTest('content')"
        @click.stop="onContentClick"
      >
        <!--
          @slot Use it to add some content need to be shown.
          @binding {boolean} opened
        -->
        <slot name="content" :opened="isOpened" />
      </div>
    </Transition>
  </div>
</template>
