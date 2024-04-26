<template>
  <div v-bind="wrapperAttrs">
    <div v-if="!hasSlotContent(slots['default'])">
      <ULabel
        :label="props.label"
        :description="props.description"
        :align="labelAlign"
        :error="errorMessage"
        v-bind="labelAttrs"
      >
        <div :id="fileId" :data-cy="dataCy" v-bind="uploadAttrs">
          <div v-if="!filesData.length" v-bind="blockAttrs">
            <UIcon
              :name="config.iconUploadFileName"
              color="gray"
              :size="componentSize"
              v-bind="iconUploadFileAttrs"
            />

            <div v-bind="descriptionAttrs" v-text="descriptionText" />
          </div>

          <div v-bind="listAttrs">
            <UFiles :options="filesList" v-bind="filesAttrs">
              <template #right="file">
                <UIcon
                  :name="config.iconCloseName"
                  interactive
                  :size="componentSize"
                  color="gray"
                  v-bind="iconCloseAttrs"
                  @click="onClickDeleteFile(file)"
                />
              </template>
            </UFiles>
          </div>

          <UButton
            :label="props.config?.i18n?.selectFile || t('UInputFile.selectFile')"
            :size="size"
            variant="thirdary"
            filled
            :data-cy="`${dataCy}-upload`"
            v-bind="buttonAttrs"
            @click="onClickUploadFile"
          />

          <DragDrop :id="uppyId" :uppy="uppy" v-bind="uppyUploadAttrs" />
        </div>
      </ULabel>
    </div>

    <div v-else :id="fileId" :data-cy="dataCy" v-bind="uploadSlotAttrs" @click="onClickUploadFile">
      <slot />

      <DragDrop :id="uppyId" :uppy="uppy" v-bind="uppyUploadAttrs" />
    </div>
  </div>
</template>

<script setup>
import Uppy from "@uppy/core";
import DragDrop from "@uppy/vue/src/drag-drop";

import { computed, onBeforeUnmount, onMounted, ref, useSlots, watch } from "vue";

import UIcon from "../ui.image-icon";
import ULabel from "../ui.form-label";
import UButton from "../ui.button";
import UFiles from "../ui.text-files";

import UIService, { getRandomId } from "../service.ui";

import { UInputFile } from "./constants";
import defaultConfig from "./configs/default.config";
import { useAttrs } from "./composables/attrs.composable";
import { useLocale } from "../composable.locale";

/* Should be a string for correct web-types gen */
defineOptions({ name: "UInputFile" });

const props = defineProps({
  /**
   * Set label.
   */
  label: {
    type: String,
    default: "",
  },

  /**
   * Set description.
   */
  description: {
    type: String,
    default: "",
  },

  /**
   * Set label placement related from the default slot.
   * @values top, topInside, topWithDesc, bottom, left, right
   */
  labelAlign: {
    type: String,
    default: UIService.get(defaultConfig, UInputFile).default.labelAlign,
  },

  /**
   * Set files data.
   */
  files: {
    type: Array,
    default: () => [],
  },

  /**
   * Selected files will be imported when a form will be submitted
   */
  local: {
    type: Boolean,
    default: UIService.get(defaultConfig, UInputFile).default.local,
  },

  /**
   * Set max file size in megabytes.
   */
  maxFileSize: {
    type: Number,
    default: UIService.get(defaultConfig, UInputFile).default.maxFileSize,
  },

  /**
   * Allow to select multiple files.
   */
  multiple: {
    type: Boolean,
    default: UIService.get(defaultConfig, UInputFile).default.multiple,
  },

  /**
   * Set max number files for upload
   */
  maxFiles: {
    type: Number,
    default: UIService.get(defaultConfig, UInputFile).default.maxFiles,
  },

  /**
   * Set allowed file types.
   */
  allowedFileTypes: {
    type: Array,
    default: () => UIService.get(defaultConfig, UInputFile).default.allowedFileTypes,
  },

  /**
   * Set error text for component.
   */
  error: {
    type: String,
    default: "",
  },

  /**
   * Set size.
   * @values sm, md, lg
   */
  size: {
    type: String,
    default: UIService.get(defaultConfig, UInputFile).default.size,
  },

  /**
   * Generates unique element id.
   * @ignore
   */
  id: {
    type: String,
    default: () => getRandomId(),
  },

  /**
   * Sets data-cy attribute for automated testing.
   */
  dataCy: {
    type: String,
    default: "",
  },
});

const slots = useSlots();

const emit = defineEmits(["changeFiles", "deleteFile"]);

const { t } = useLocale();

const filesData = ref([]);
const selectedFiles = ref([]);
const errorMessage = ref("");
const dragOver = ref(false);
const errorFilesTypes = ref([]);

const {
  config,
  uploadAttrs,
  buttonAttrs,
  iconUploadFileAttrs,
  iconCloseAttrs,
  wrapperAttrs,
  labelAttrs,
  blockAttrs,
  descriptionAttrs,
  listAttrs,
  uppyUploadAttrs,
  uploadSlotAttrs,
  filesAttrs,
  hasSlotContent,
} = useAttrs(props, { errorMessage, dragOver });

const filesList = computed(() => {
  return filesData.value.map((file) => {
    return {
      text: file.name,
      id: file.id,
    };
  });
});

const fileId = computed(() => {
  return `file-${props.id}`;
});

const uppyId = computed(() => {
  return `uppy-${props.id}`;
});

const fileUpload = computed(() => {
  return document.getElementById(fileId.value);
});

const uppyUpload = computed(() => {
  return document.getElementById(uppyId.value);
});

const allowedFilesForUpload = computed(() => {
  const allowedFormat = props.allowedFileTypes.join(", ");

  return `${props.config?.i18n?.canAttachFilesFormat || t("UInputFile.canAttachFilesFormat")} ${allowedFormat}`;
});

const descriptionText = computed(() => {
  return `${props.config?.i18n?.selectOrDragImage || t("UInputFile.selectOrDragImage")} ${allowedFilesForUpload.value}`;
});

const componentSize = computed(() => {
  const size = {
    sm: "xs",
    md: "sm",
    lg: "md",
  };

  return size[props.size];
});

const maxFileSizeInBytes = computed(() => {
  return props.maxFileSize * Math.pow(2, 20);
});

const maxFilesNumber = computed(() => {
  return props.multiple ? props.maxFiles : 1;
});

const uppy = computed(() =>
  new Uppy({
    id: uppyId.value,
    restrictions: {
      maxFileSize: maxFileSizeInBytes,
      maxNumberOfFiles: maxFilesNumber,
      allowedFileTypes: props.allowedFileTypes,
    },
  }).on("restriction-failed", (file, error) => {
    const isFile = errorFilesTypes.value.find((item) => item === file.extension);

    if (error && !isFile) errorFilesTypes.value.push(`.${file.extension}`);
  }),
);

watch(selectedFiles, onChangeSelectedFiles, { deep: true });
watch(() => props.files, onChangeFiles, { deep: true });
watch(errorFilesTypes, onChangeErrorFilesTypes, { deep: true });
watch(() => props.error, onChangeError, { deep: true, immediate: true });

onMounted(() => {
  uppy.value.on("file-added", () => {
    uploadFiles();
  });

  addEventListener("dragover", () => (dragOver.value = true));

  if (uppyUpload.value) {
    uppyUpload.value.addEventListener("dragover", onDragOver, true);
    uppyUpload.value.addEventListener("dragleave", onDragLeave, true);
  }
});

onBeforeUnmount(() => {
  removeEventListener("dragover", () => (dragOver.value = true));
  uppyUpload.value.removeEventListener("dragover", onDragOver, true);
  uppyUpload.value.removeEventListener("dragleave", onDragLeave, true);
});

function onClickUploadFile() {
  document.querySelector(`#${fileId.value} .uppy-Root button`).click();
}

function uploadFiles() {
  const { files } = uppy.value.getState();

  selectedFiles.value = Object.values(files);
}

function onDragOver() {
  fileUpload.value.classList.add(config.fileUploadHover);
}

function onDragLeave() {
  fileUpload.value.classList.remove(config.fileUploadHover);
  dragOver.value = false;
}

function onChangeSelectedFiles() {
  uppy.value.cancelAll();

  const selectedFilesData = selectedFiles.value.map((file) => {
    file.data.id = getRandomId();

    return file.data;
  });

  if (!props.error && errorMessage.value) {
    errorMessage.value = "";
    errorFilesTypes.value = [];
  }

  if (props.local) filesData.value = selectedFilesData;

  emit("changeFiles", selectedFilesData);
}

function onChangeFiles() {
  filesData.value = props.files;

  if (!props.error && errorMessage.value) {
    errorMessage.value = "";
    errorFilesTypes.value = [];
  }

  onDragLeave();
}

function onChangeError() {
  errorMessage.value = props.error;
}

function onChangeErrorFilesTypes() {
  if (errorFilesTypes.value.length) {
    const error = errorFilesTypes.value.join(", ");
    const cannotAttachFilesStart =
      props.config?.i18n?.cannotAttachFilesStart || t("UInputFile.cannotAttachFilesStart");
    const cannotAttachFilesEnd =
      props.config?.i18n?.cannotAttachFilesEnd || t("UInputFile.cannotAttachFilesEnd");

    errorMessage.value = `${cannotAttachFilesStart} ${error} ${cannotAttachFilesEnd}`;
  }
}

function onClickDeleteFile(data) {
  const index = filesData.value.findIndex((file) => file.id === data.file.id);

  if (~index) {
    filesData.value.splice(index, 1);

    uppy.value.removeFile(data.file.id);

    emit("deleteFile", data.file.id);

    if (props.local) emit("changeFiles", filesData.value);
  }
}
</script>
