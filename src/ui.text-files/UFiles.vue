<script setup lang="ts">
import { computed, useTemplateRef } from "vue";

import useUI from "../composables/useUI.ts";
import { getDefaults } from "../utils/ui.ts";

import UFile from "../ui.text-file/UFile.vue";
import ULabel from "../ui.form-label/ULabel.vue";

import { COMPONENT_NAME } from "./constants.ts";
import defaultConfig from "./config.ts";

import { getRandomId } from "../utils/helper.ts";

import type { Props, Config } from "./types.ts";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<Props>(), {
  ...getDefaults<Props, Config>(defaultConfig, COMPONENT_NAME),
  fileList: () => [],
  label: "",
});

const emit = defineEmits([
  /**
   * Triggers when remove button is clicked.
   * @property {string} fileId
   */
  "remove",
]);

const itemsRef = useTemplateRef<HTMLDivElement>("items");

const formattedFileList = computed(() => {
  return props.fileList.map((file) => {
    if (file instanceof File) {
      return {
        id: getRandomId(),
        label: file.name || "",
        url: URL.createObjectURL(file),
        imageUrl: file.type.includes("image") ? URL.createObjectURL(file) : undefined,
      };
    }
  });
});

function onRemoveFile(fileId: string | number) {
  emit("remove", fileId);
}

defineExpose({
  /**
   * A reference to the files' wrapper element for direct DOM manipulation.
   * @property {HTMLDivElement}
   */
  itemsRef,
});

/**
 * Get element / nested component attributes for each config token ✨
 * Applies: `class`, `config`, redefined default `props` and dev `vl-...` attributes.
 */
const { getDataTest, filesLabelAttrs, itemsAttrs, itemAttrs } = useUI<Config>(defaultConfig);
</script>

<template>
  <ULabel
    :label="label"
    :description="description"
    :size="size"
    :align="labelAlign"
    v-bind="filesLabelAttrs"
  >
    <template #label>
      <!--
        @slot Use this to add custom content instead of the label.
        @binding {string} label
      -->
      <slot name="label" :label="label" />
    </template>

    <div ref="items" v-bind="itemsAttrs">
      <!-- @slot Use it to add UFile. -->
      <slot>
        <UFile
          v-for="(file, index) in formattedFileList"
          :id="file?.id"
          :key="file?.id"
          :label="file?.label"
          :url="file?.url"
          :image-url="file?.imageUrl"
          :size="size"
          :removable="removable"
          v-bind="itemAttrs"
          :data-test="getDataTest(`item-${index}`)"
          @remove="onRemoveFile"
        >
          <template #left>
            <!--
              @slot Use it to add something before the file content.
              @binding {number} index
            -->
            <slot name="before-file" :index="index" />
          </template>

          <!--
            @slot Use it to add a file directly.
            @binding {string | number} id
            @binding {string} label
            @binding {string} url
            @binding {string} image-url
            @binding {number} index
          -->
          <slot
            :id="file?.id"
            name="file"
            :label="file?.label"
            :url="file?.url"
            :image-url="file?.imageUrl"
            :index="index"
          />

          <template #right>
            <!--
              @slot Use it to add something after the file content.
              @binding {number} index
            -->
            <slot name="after-file" :index="index" />
          </template>
        </UFile>
      </slot>
    </div>
  </ULabel>
</template>
