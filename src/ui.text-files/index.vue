<template>
  <ULabel :label="label" :description="description" v-bind="labelAttrs">
    <div v-bind="bodyAttrs">
      <slot>
        <UFile
          v-for="file in formattedFileList"
          :id="file.id"
          :key="file.id"
          :label="file.label"
          :url="file.url"
          :image-url="file.imageUrl"
          :size="size"
          v-bind="fileAttrs"
          :data-cy="`${dataCy}-item`"
        >
          <template #left="{ file: currentFile }">
            <!-- @slot Use it to add something left. -->
            <slot name="left" :file="currentFile" />
          </template>

          <template #right="{ file: currentFile }">
            <!-- @slot Use it to add something right. -->
            <slot name="right" :file="currentFile" />
          </template>
        </UFile>
      </slot>
    </div>
  </ULabel>
</template>

<script setup>
import UFile from "../ui.text-file";
import ULabel from "../ui.form-label";
import UIService from "../service.ui";

import { UFiles } from "./constants";
import defaultConfig from "./configs/default.config";
import { useAttrs } from "./composables/attrs.composable";
import { computed } from "vue";

/* Should be a string for correct web-types gen */
defineOptions({ name: "UFiles", inheritAttrs: false });

const props = defineProps({
  /**
   * Set files label.
   */
  label: {
    type: String,
    default: "",
  },

  /**
   * Set description text.
   */
  description: {
    type: String,
    default: "",
  },

  /**
   * Set label placement related from the default slot.
   * @values topInside, top, left, right
   */
  placement: {
    type: String,
    default: UIService.get(defaultConfig, UFiles).default.placement,
  },

  /**
   * List of file objects.
   */
  fileList: {
    type: Array,
    default: () => [],
  },

  /**
   * Set size.
   * @values sm, md, lg
   */
  size: {
    type: String,
    default: UIService.get(defaultConfig, UFiles).default.size,
  },

  /**
   * Sets data-cy attribute for automated testing.
   */
  dataCy: {
    type: String,
    default: "",
  },
});

const { labelAttrs, bodyAttrs, fileAttrs } = useAttrs(props);

const formattedFileList = computed(() =>
  props.fileList.map((file) => {
    return {
      id: file.name,
      label: file.name,
      url: URL.createObjectURL(file),
      imageUrl: file.type.includes("image") ? URL.createObjectURL(file) : undefined,
    };
  }),
);
</script>
