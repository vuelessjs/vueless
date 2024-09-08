<template>
  <ULabel
    :label="label"
    :description="description"
    :size="size"
    :align="labelAlign"
    v-bind="filesLabelAttrs"
  >
    <div v-bind="itemsAttrs">
      <!-- @slot Use it to add UFile. -->
      <slot>
        <UFile
          v-for="file in formattedFileList"
          :id="file.id"
          :key="file.id"
          :label="file.label"
          :url="file.url"
          :image-url="file.imageUrl"
          :size="size"
          v-bind="itemAttrs"
          :data-test="`${dataTest}-item`"
        >
          <template #left="{ file: currentFile }">
            <!-- @slot Use it to add something left.
             @binding {object} file
            -->
            <slot name="left" :file="currentFile" />
          </template>

          <template #right="{ file: currentFile }">
            <!-- @slot Use it to add something right.
              @binding {object} file
            -->
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
import { getDefault } from "../service.ui";

import { UFiles } from "./constants";
import defaultConfig from "./configs/default.config";
import useAttrs from "./composables/attrs.composable";
import { computed } from "vue";

/* Should be a string for correct web-types gen */
defineOptions({ name: "UFiles", inheritAttrs: false });

const props = defineProps({
  /**
   * List of file objects.
   */
  fileList: {
    type: Array,
    default: () => [],
  },

  /**
   * File list label.
   */
  label: {
    type: String,
    default: "",
  },

  /**
   * File list label placement.
   * @values top, topWithDesc
   */
  labelAlign: {
    type: String,
    default: getDefault(defaultConfig, UFiles).labelAlign,
  },

  /**
   * File list description.
   */
  description: {
    type: String,
    default: "",
  },

  /**
   * File list size.
   * @values sm, md, lg
   */
  size: {
    type: String,
    default: getDefault(defaultConfig, UFiles).size,
  },

  /**
   * Component ui config object.
   */
  config: {
    type: Object,
    default: () => ({}),
  },

  /**
   * Data-test attribute for automated testing.
   */
  dataTest: {
    type: String,
    default: "",
  },
});

const { filesLabelAttrs, itemsAttrs, itemAttrs } = useAttrs(props);

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
