<template>
  <ULabel :label="label" :align="labelAlign" :error="error" :size="size" v-bind="labelAttrs">
    <div ref="dropZoneRef" :ondrop="onDrop" v-bind="dropzoneWrapperAttrs">
      <UText :size="nestedComponentSize" :html="description" v-bind="descriptionAttrs" />

      <div v-bind="contentWrapperAttrs">
        <!-- @slot Use it to add something before the placeholder. -->
        <slot name="left" />

        <span v-if="!isValue" v-bind="placeholderAttrs" v-text="currentLocale.noFile" />

        <UFiles :size="size" v-bind="fileListAttrs" :file-list="fileList">
          <template #right="{ file }">
            <UIcon
              v-if="props.multiple"
              pill
              internal
              interactive
              size="2xs"
              :name="config.removeItemIconName"
              :data-cy="`${dataCy}-remove-item`"
              v-bind="removeItemIconAttrs"
              @click.stop.prevent="onClickRemoveItem(file.id)"
            />
          </template>
        </UFiles>

        <div v-bind="buttonWrapperAttrs">
          <template v-if="Array.isArray(currentFiles) || !currentFiles">
            <UButton
              filled
              tag="label"
              :for="id"
              variant="thirdary"
              :size="nestedComponentSize"
              :label="currentLocale.uploadFile"
              :data-cy="`${dataCy}-upload`"
              v-bind="buttonAttrs"
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
              :multiple="multiple"
              v-bind="inputAttrs"
              @change="onChangeFile"
            />
          </template>

          <UIcon
            v-if="isValue"
            pill
            internal
            interactive
            :size="nestedComponentSize"
            :name="config.clearIconName"
            :data-cy="`${dataCy}-clear`"
            v-bind="clearIconAttrs"
            @click="onClickResetFiles"
          />
        </div>
      </div>
    </div>
  </ULabel>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { merge } from "lodash-es";

import UText from "../ui.text-block";
import UIcon from "../ui.image-icon";
import ULabel from "../ui.form-label";
import UButton from "../ui.button";
import UFiles from "../ui.text-files";

import UIService, { getRandomId } from "../service.ui";
import { getFileMbSize } from "./services/fileForm.service";

import useAttrs from "./composables/attrs.composable";
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
   * @values top, topInside, topWithDesc, left, right
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

  /**
   * Data-cy attribute for automated testing.
   */
  dataCy: {
    type: String,
    default: "",
  },
});

const emit = defineEmits([
  /**
   * Triggers when a file is updated.
   * @property {array} value
   */
  "update:modelValue",

  /**
   * Triggers when the input has not passed validation.
   * @property {string} value
   */
  "update:error",
]);

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
  removeItemIconAttrs,
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
    (Array.isArray(currentFiles.value) && currentFiles.value?.length) ||
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

const fileList = computed(() => {
  if (Array.isArray(currentFiles.value)) {
    return currentFiles.value;
  }

  return currentFiles.value ? [currentFiles.value] : [];
});

onMounted(() => {
  dropZoneRef.value.addEventListener("dragover", onDragOver);
  dropZoneRef.value.addEventListener("dragleave", onDragLeave);
});

onBeforeUnmount(() => {
  dropZoneRef.value.removeEventListener("dragover", onDragOver);
  dropZoneRef.value.removeEventListener("dragleave", onDragLeave);
});

watch(
  () => props.multiple,
  () => {
    if (!props.multiple && Array.isArray(currentFiles.value)) {
      currentFiles.value = currentFiles.value[0];
    }

    if (props.multiple && !Array.isArray(currentFiles.value)) {
      currentFiles.value = currentFiles.value ? [currentFiles.value] : [];
    }
  },
);

function removeDuplicates(files) {
  return files.filter((file) => !fileList.value.find((item) => item.name === file.name));
}

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
    ? [...(currentFiles.value || []), ...removeDuplicates(Array.from(event.target.files))]
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

  let targetFiles = null;

  if (event.dataTransfer.items) {
    targetFiles = [...event.dataTransfer.items]
      .filter((item) => item.kind === "file")
      .map((item) => item.getAsFile());
  } else {
    targetFiles = [...event.dataTransfer.files];
  }

  if (targetFiles.length) targetFiles.forEach(validate);

  nextTick(() => {
    if (currentError.value || !targetFiles.length) {
      onClickResetFiles();

      return;
    }

    currentFiles.value = props.multiple
      ? [...(currentFiles.value || []), ...removeDuplicates(targetFiles)]
      : targetFiles[0];
  });
}

function onClickRemoveItem(id) {
  currentFiles.value = currentFiles.value?.filter((file) => file.name !== id);
}
</script>
