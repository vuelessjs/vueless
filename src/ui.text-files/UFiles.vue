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
          v-for="(file, index) in formattedFileList"
          :id="file.id"
          :key="file.id"
          :label="file.label"
          :url="file.url"
          :image-url="file.imageUrl"
          :size="size"
          :removable="removable"
          v-bind="itemAttrs"
          :data-test="`${dataTest}-item`"
          @remove="onRemoveFile"
        >
          <template #left="{ file: currentFile }">
            <!-- @slot Use it to add something left.
              @binding {object} file
              @binding {number} index
            -->
            <slot name="left" :file="currentFile" :index="index" />
          </template>

          <template #right="{ file: currentFile }">
            <!-- @slot Use it to add something right.
              @binding {object} file
              @binding {number} index
            -->
            <slot name="right" :file="currentFile" :index="index" />
          </template>
        </UFile>
      </slot>
    </div>
  </ULabel>
</template>

<script setup>
import UFile from "../ui.text-file/UFile.vue";
import ULabel from "../ui.form-label/ULabel.vue";
import { getDefault } from "../utils/utilUI.ts";

import { UFiles } from "./constants.js";
import defaultConfig from "./config.js";
import useAttrs from "./useAttrs.js";
import { computed } from "vue";

defineOptions({ inheritAttrs: false });

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
   * Show remove button for each file
   */
  removable: {
    type: Boolean,
    default: false,
  },

  /**
   * Component config object.
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

const emit = defineEmits([
  /**
   * Triggers when remove button is clicked.
   * @property {string} fileId
   */
  "remove",
]);

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

function onRemoveFile(fileId) {
  emit("remove", fileId);
}
</script>
