<script setup lang="ts">
import { ref, useId } from "vue";

import useUI from "../composables/useUI.ts";
import { getDefaults } from "../utils/ui.ts";

import ULink from "../ui.button-link/ULink.vue";
import UIcon from "../ui.image-icon/UIcon.vue";

import { COMPONENT_NAME } from "./constants.ts";
import defaultConfig from "./config.ts";

import type { Props, Config } from "./types.ts";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<Props>(), {
  ...getDefaults<Props, Config>(defaultConfig, COMPONENT_NAME),
  label: "",
});

const emit = defineEmits([
  /**
   * Triggers when remove button is clicked.
   * @property {string} fileId
   */
  "remove",
]);

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

/**
 * Get element / nested component attributes for each config token ✨
 * Applies: `class`, `config`, redefined default `props` and dev `vl-...` attributes.
 */
const {
  getDataTest,
  config,
  fileAttrs,
  bodyAttrs,
  fileIconAttrs,
  fileLabelAttrs,
  fileImageAttrs,
  removeIconAttrs,
} = useUI<Config>(defaultConfig);
</script>

<template>
  <ULink :href="url" v-bind="fileAttrs" :data-test="getDataTest()">
    <!-- @slot Use it to add something before the file. -->
    <slot name="left" />

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

        <UIcon
          v-else
          internal
          interactive
          color="gray"
          :name="config.defaults.fileIcon"
          v-bind="fileIconAttrs"
          @focus="onFocus"
          @blur="onBlur"
        />

        <ULink :label="label" :size="size" color="gray" dashed v-bind="fileLabelAttrs" />
      </div>
    </slot>

    <!-- @slot Use it to add something after the file. -->
    <slot name="right">
      <UIcon
        v-if="removable"
        internal
        interactive
        color="gray"
        :name="config.defaults.removeIcon"
        v-bind="removeIconAttrs"
        :data-test="getDataTest('remove-item')"
        @click.stop.prevent="onRemove"
      />
    </slot>
  </ULink>
</template>
