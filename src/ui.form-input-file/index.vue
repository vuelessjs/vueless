<template>
  <ULabel :error="error" :align="labelAlign" :label="label" :size="size" v-bind="labelAttrs">
    <div ref="dropZoneRef" :ondrop="onDrop" v-bind="dropzoneWrapperAttrs">
      <UText :size="nestedComponentSize" v-bind="descriptionAttrs" :html="description" />

      <div v-bind="contentWrapperAttrs">
        <slot name="left" />
        <span v-if="!isValue" v-bind="placeholderAttrs" v-text="currentLocale.noFile" />
        <div v-else v-bind="fileListAttrs">
          <template v-if="props.multiple">
            <span
              v-for="(file, idx) in currentFiles"
              v-bind="selectedItemAttrs"
              :key="idx"
              v-text="file.name"
            />
          </template>
          <span v-else v-bind="selectedItemAttrs" v-text="currentFiles.name" />
        </div>

        <div v-bind="buttonWrapperAttrs">
          <template v-if="Array.isArray(currentFiles) || !currentFiles">
            <UButton
              class="hover:cursor-pointer"
              :label="currentLocale.uploadFile"
              variant="thirdary"
              filled
              :size="nestedComponentSize"
              v-bind="buttonAttrs"
              tag="label"
              :for="id"
            >
              <template #right>
                <UIcon
                  internal
                  :size="nestedComponentSize"
                  :name="config.chooseFileIconName"
                  v-bind="chooseFileIconAttrs"
                />
              </template>
            </UButton>

            <input
              :id="id"
              ref="fileInputRef"
              :multiple="multiple"
              type="file"
              :accept="accept"
              v-bind="inputAttrs"
              @change="onChangeFile"
            />
          </template>
          <UIcon
            v-if="isValue"
            interactive
            internal
            :size="nestedComponentSize"
            :name="config.clearIconName"
            pill
            v-bind="clearIconAttrs"
            @click="onClickResetFiles"
          />
        </div>
      </div>
    </div>
  </ULabel>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from "vue";
import { merge } from "lodash-es";

import UText from "../ui.text-block";
import UIcon from "../ui.image-icon";
import ULabel from "../ui.form-label";
import UButton from "../ui.button";

import UIService, { getRandomId } from "../service.ui";
import { getFileMbSize } from "./services/fileForm.service";

import { useAttrs } from "./composables/attrs.composable";
import { useLocale } from "../composable.locale";

import { UInputFile } from "./constants";
import defaultConfig from "./configs/default.config";

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

  modelValue: {
    type: [Array, File],
    default: null,
  },

  /**
   * Allow select multiple files.
   */
  multiple: {
    type: Boolean,
    default: UIService.get(defaultConfig, UInputFile).default.multiple,
  },

  /**
   * Set max file size in megabytes.
   */
  maxFileSize: {
    type: Number,
    default: UIService.get(defaultConfig, UInputFile).default.maxFileSize,
  },

  /**
   * Set allowed file types.
   */
  allowedFileTypes: {
    type: Array,
    default: () => UIService.get(defaultConfig, UInputFile).default.allowedFileTypes,
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
   * Set error text for component.
   */
  error: {
    type: String,
    default: "",
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
   * Sets component ui config object.
   */
  config: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits(["update:modelValue", "update:error"]);

const { tm } = useLocale();

const dropZoneRef = ref(null);
const fileInputRef = ref(null);

const {
  config,
  labelAttrs,
  buttonAttrs,
  dropzoneWrapperAttrs,
  descriptionAttrs,
  contentWrapperAttrs,
  clearIconAttrs,
  chooseFileIconAttrs,
  placeholderAttrs,
  inputAttrs,
  fileListAttrs,
  buttonWrapperAttrs,
  selectedItemAttrs,
} = useAttrs(props);

const i18nGlobal = tm(UInputFile);
const currentLocale = computed(() => merge(defaultConfig.i18n, i18nGlobal, props.config.i18n));

const currentFiles = computed({
  get: () => props.modelValue,
  set: (newValue) => {
    const fallbackValue = props.multiple ? [] : null;

    emit("update:modelValue", newValue || fallbackValue);
  },
});

const currentError = computed({
  get: () => props.error,
  set: (newValue) => emit("update:error", newValue),
});

const extensionNames = computed(() => {
  return props.allowedFileTypes.map((type) => type.replace(".", ""));
});

const allowedFileTypeFormats = computed(() => {
  return props.allowedFileTypes.map((type) => (type.startsWith(".") ? type : `.${type}`));
});

const accept = computed(() => {
  return allowedFileTypeFormats.value.join(",");
});

const isValue = computed(() => {
  return (
    (Array.isArray(currentFiles.value) && currentFiles.value.length) ||
    (!Array.isArray(currentFiles.value) && currentFiles.value)
  );
});

const nestedComponentSize = computed(() => {
  let size = "sm";

  if (props.size === "sm") size = "xs";
  if (props.size === "md") size = "sm";
  if (props.size === "lg") size = "md";

  return size;
});

onMounted(() => {
  dropZoneRef.value.addEventListener("dragover", onDragOver);
  dropZoneRef.value.addEventListener("dragleave", onDragLeave);
});

onBeforeUnmount(() => {
  dropZoneRef.value.removeEventListener("dragover", onDragOver);
  dropZoneRef.value.removeEventListener("dragleave", onDragLeave);
});

function validate(file) {
  const targetFileSize = getFileMbSize(file);

  const isValidType = extensionNames.value.length
    ? extensionNames.value.some((item) => file.type.includes(item))
    : true;

  const isValidSize = targetFileSize <= props.maxFileSize;

  if (!isValidSize && props.maxFileSize) {
    currentError.value = currentLocale.value.sizeError;
  }

  if (!isValidType) {
    currentError.value = currentLocale.value.formatError;
  }
}

function onChangeFile(event) {
  validate(event.target.files[0]);

  if (currentError.value) {
    onClickResetFiles();

    return;
  }

  currentFiles.value = props.multiple
    ? [...currentFiles.value, Array.from(event.target.files).at(0)]
    : Array.from(event.target.files).at(0);

  if (fileInputRef.value) fileInputRef.value.value = "";
}

function onClickResetFiles() {
  currentFiles.value = null;

  if (fileInputRef.value) fileInputRef.value.value = "";
}

function onDragOver(event) {
  event.preventDefault();

  dropZoneRef.value.classList.add(...config.value.dropzoneWrapperHover.split(" "));
}

function onDragLeave(event) {
  event.preventDefault();

  dropZoneRef.value.classList.remove(...config.value.dropzoneWrapperHover.split(" "));
}

function onDrop(event) {
  event.preventDefault();

  let targetFile = null;

  if (event.dataTransfer.items) {
    targetFile = [...event.dataTransfer.items].find((item) => item.kind === "file")?.getAsFile();
  } else {
    targetFile = [...event.dataTransfer.files].at(0);
  }

  if (targetFile) validate(targetFile);

  nextTick(() => {
    if (currentError.value || !targetFile) {
      onClickResetFiles();

      return;
    }

    currentFiles.value = props.multiple ? [...currentFiles.value, targetFile] : targetFile;
  });
}
</script>
