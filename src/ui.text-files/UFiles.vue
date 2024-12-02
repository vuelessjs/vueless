<script setup lang="ts">
import UFile from "../ui.text-file/UFile.vue";
import ULabel from "../ui.form-label/ULabel.vue";
import { getDefault } from "../utils/ui.ts";

import { UFiles } from "./constants.ts";
import defaultConfig from "./config.ts";
import useAttrs from "./useAttrs.ts";
import { computed } from "vue";

import type { UFilesProps } from "./types.ts";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<UFilesProps>(), {
  labelAlign: getDefault<UFilesProps>(defaultConfig, UFiles).labelAlign,
  size: getDefault<UFilesProps>(defaultConfig, UFiles).size,
  dataTest: "",
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
  props.fileList?.map((file) => {
    if (!(file instanceof File)) {
      // eslint-disable-next-line no-console
      console.error("Invalid file object");

      return null;
    }

    return {
      id: file.name,
      label: file.name,
      url: URL.createObjectURL(file),
      imageUrl: file.type.includes("image") ? URL.createObjectURL(file) : undefined,
    };
  }),
);

function onRemoveFile(fileId: string | number) {
  emit("remove", fileId);
}
</script>

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
