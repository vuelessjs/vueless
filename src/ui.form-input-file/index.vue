<template>
  <ULabel :error="error" :align="labelAlign" :label="label" :size="size" v-bind="labelAttrs">
    <div ref="dropZoneRef" :ondrop="onDrop" v-bind="dropzoneWrapperAttrs">
      <UText :size="nestedComponentSize" v-bind="descriptionAttrs" :html="description" />

      <div v-bind="buttonWrapperAttrs">
        <div v-bind="placeholderWrapperAttrs">
          <UIcon
            pill
            internal
            :size="nestedComponentSize"
            :name="config.placeholderIconName"
            v-bind="placeholderIconAttrs"
          />
          <span v-bind="placeholderAttrs" v-text="placeholder" />
        </div>

        <template v-if="!currentFiles.length">
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
            type="file"
            :accept="accept"
            v-bind="inputAttrs"
            @change="onChangeFile"
          />
        </template>
        <UIcon
          v-else
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
    default: "Label",
  },

  /**
   * Set description.
   */
  description: {
    type: String,
    default: "Some description here",
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
    type: Array,
    default: () => [],
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
  buttonWrapperAttrs,
  placeholderWrapperAttrs,
  placeholderIconAttrs,
  clearIconAttrs,
  chooseFileIconAttrs,
  placeholderAttrs,
  inputAttrs,
} = useAttrs(props);

const i18nGlobal = tm(UInputFile);
const currentLocale = computed(() => merge(defaultConfig.i18n, i18nGlobal, props.config.i18n));

const currentFiles = computed({
  get: () => props.modelValue,
  set: (newValue) => emit("update:modelValue", newValue),
});

const currentError = computed({
  get: () => props.error,
  set: (newValue) => emit("update:error", newValue),
});

const accept = computed(() => {
  return props.allowedFileTypes.join(",");
});

const extensionNames = computed(() => {
  return props.allowedFileTypes.map((type) => type.replace(".", ""));
});

const placeholder = computed(() => {
  return currentFiles.value.length ? currentFiles.value[0].name : currentLocale.value.noFile;
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

  if (!isValidSize) {
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

  currentFiles.value = Array.from(event.target.files);
}

function onClickResetFiles() {
  currentFiles.value = [];

  if (fileInputRef.value) fileInputRef.value.value = "";
}

function onDragOver(event) {
  event.preventDefault();

  dropZoneRef.value.classList.add(config.value.dropzoneWrapperHover.split(" "));
}

function onDragLeave(event) {
  event.preventDefault();

  dropZoneRef.value.classList.remove(config.value.dropzoneWrapperHover.split(" "));
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

    currentFiles.value = [targetFile];
  });
}
</script>
