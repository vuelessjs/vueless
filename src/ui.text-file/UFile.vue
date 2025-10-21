<script setup lang="ts">
import { ref, computed, useId, useTemplateRef } from "vue";

import { useUI } from "../composables/useUI";
import { getDefaults } from "../utils/ui";

import ULink from "../ui.button-link/ULink.vue";
import UIcon from "../ui.image-icon/UIcon.vue";

import { COMPONENT_NAME } from "./constants";
import defaultConfig from "./config";

import type { Props, Config } from "./types";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<Props>(), {
  ...getDefaults<Props, Config>(defaultConfig, COMPONENT_NAME),
  label: "",
});

const emit = defineEmits([
  /**
   * Triggers when the remove button is clicked.
   * @property {string} fileId
   */
  "remove",
]);

const fileRef = useTemplateRef<HTMLDivElement>("file");

const focus = ref(false);

const fileId = props.id || useId();

function onRemove() {
  emit("remove", fileId);
}

function onFocus() {
  focus.value = true;
}

function onBlur() {
  focus.value = false;
}

defineExpose({
  /**
   * A reference to the file wrapper for direct DOM manipulation.
   * @property {HTMLDivElement}
   */
  fileRef,
});

/**
 * Get element / nested component attributes for each config token ✨
 * Applies: `class`, `config`, redefined default `props` and dev `vl-...` attributes.
 */
const mutatedProps = computed(() => ({
  imageUrl: Boolean(props.imageUrl),
}));

const {
  getDataTest,
  config,
  fileAttrs,
  bodyAttrs,
  fileIconAttrs,
  fileLabelAttrs,
  fileImageAttrs,
  removeIconAttrs,
} = useUI<Config>(defaultConfig, mutatedProps);
</script>

<template>
  <div ref="file" v-bind="fileAttrs" :data-test="getDataTest()">
    <!-- @slot Use it to add something before the file. -->
    <slot name="left">
      <UIcon
        v-if="!imageUrl"
        color="neutral"
        :name="config.defaults.fileIcon"
        v-bind="fileIconAttrs"
        @focus="onFocus"
        @blur="onBlur"
      />
    </slot>

    <!--
      @slot Use it to add a file directly.
      @binding {string | number} id
      @binding {string} label
      @binding {string} url
      @binding {string} image-url
    -->
    <slot :id="fileId" :label="label" :url="url" :image-url="imageUrl">
      <div v-bind="bodyAttrs">
        <img v-if="imageUrl" :alt="label" :src="imageUrl" v-bind="fileImageAttrs" />

        <ULink
          :href="url"
          :label="label"
          :size="size"
          color="grayscale"
          dashed
          v-bind="fileLabelAttrs"
        />
      </div>
    </slot>

    <!-- @slot Use it to add something after the file. -->
    <slot name="right">
      <UIcon
        v-if="removable"
        interactive
        color="neutral"
        :name="config.defaults.removeIcon"
        v-bind="removeIconAttrs"
        :data-test="getDataTest('remove-item')"
        @click.stop.prevent="onRemove"
      />
    </slot>
  </div>
</template>
