<template>
  <ULabel
    :for="id"
    :size="size"
    :label="label"
    :error="error"
    :align="labelAlign"
    :disabled="disabled"
    :description="description"
    v-bind="labelAttrs"
  >
    <div ref="dropZoneRef" :ondrop="onDrop" v-bind="dropzoneWrapperAttrs">
      <UText v-if="hasSlotContent($slots['top'])" :size="size" v-bind="descriptionTopAttrs">
        <!-- @slot Use it to add something at the top of the file block. -->
        <slot name="top" />
      </UText>

      <div v-bind="contentWrapperAttrs">
        <!-- @slot Use it to add something before the placeholder. -->
        <slot name="left" />

        <span v-if="!isValue" v-bind="placeholderAttrs" v-text="currentLocale.noFile" />

        <UFiles :size="size" v-bind="fileListAttrs" :file-list="fileList">
          <template #right="{ file }">
            <UButton
              v-if="props.multiple && !disabled"
              round
              filled
              square
              no-ring
              variant="thirdary"
              :size="removeItemButtonSize"
              :left-icon="config.defaults.removeItemIcon"
              :disabled="disabled"
              v-bind="removeItemButtonAttrs"
              :data-test="`${dataTest}-remove-item`"
              @click.stop.prevent="onClickRemoveItem(file.id)"
            />
          </template>
        </UFiles>

        <div v-bind="buttonWrapperAttrs">
          <template v-if="Array.isArray(currentFiles) || !currentFiles">
            <UButton
              filled
              no-ring
              :for="id"
              tag="label"
              variant="thirdary"
              :size="buttonSize"
              :right-icon="config.defaults.chooseFileIcon"
              :label="currentLocale.uploadFile"
              :disabled="disabled"
              v-bind="chooseFileButtonAttrs"
              :data-test="`${dataTest}-upload`"
            />

            <input
              :id="id"
              ref="fileInputRef"
              type="file"
              :disabled="disabled"
              :accept="accept"
              :multiple="multiple"
              v-bind="inputAttrs"
              @change="onChangeFile"
            />
          </template>

          <UButton
            v-if="isValue && !disabled"
            round
            square
            filled
            no-ring
            variant="thirdary"
            :size="buttonSize"
            :disabled="disabled"
            :left-icon="config.defaults.clearIcon"
            v-bind="clearButtonAttrs"
            :data-test="`${dataTest}-clear`"
            @click="onClickResetFiles"
          />
        </div>
      </div>

      <UText v-if="hasSlotContent($slots['bottom'])" :size="size" v-bind="descriptionBottomAttrs">
        <!-- @slot Use it to add something at the bottom of the file block. -->
        <slot name="bottom" />
      </UText>
    </div>
  </ULabel>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { merge } from "lodash-es";

import UText from "../ui.text-block";
import ULabel from "../ui.form-label";
import UButton from "../ui.button";
import UFiles from "../ui.text-files";

import { getRandomId, getDefault } from "../service.ui";
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
   * @values top, topInside, topWithDesc
   */
  labelAlign: {
    type: String,
    default: getDefault(defaultConfig, UInputFile).labelAlign,
  },

  modelValue: {
    type: [Array, File],
    default: null,
  },

  /**
   * Allow selecting multiple files.
   */
  multiple: {
    type: Boolean,
    default: getDefault(defaultConfig, UInputFile).multiple,
  },

  /**
   * Set max file size in megabytes.
   */
  maxFileSize: {
    type: Number,
    default: getDefault(defaultConfig, UInputFile).maxFileSize,
  },

  /**
   * Set allowed file types.
   */
  allowedFileTypes: {
    type: Array,
    default: () => getDefault(defaultConfig, UInputFile).allowedFileTypes,
  },

  /**
   * Set size.
   * @values sm, md, lg
   */
  size: {
    type: String,
    default: getDefault(defaultConfig, UInputFile).size,
  },

  /**
   * Set error text for component.
   */
  error: {
    type: String,
    default: "",
  },

  /**
   * Disable the input.
   */
  disabled: {
    type: Boolean,
    default: getDefault(defaultConfig, UInputFile).disabled,
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
   * Data-test attribute for automated testing.
   */
  dataTest: {
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
  chooseFileButtonAttrs,
  dropzoneWrapperAttrs,
  descriptionTopAttrs,
  descriptionBottomAttrs,
  contentWrapperAttrs,
  clearButtonAttrs,
  placeholderAttrs,
  inputAttrs,
  fileListAttrs,
  buttonWrapperAttrs,
  removeItemButtonAttrs,
  hasSlotContent,
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

const fileList = computed(() => {
  if (Array.isArray(currentFiles.value)) {
    return currentFiles.value;
  }

  return currentFiles.value ? [currentFiles.value] : [];
});

const removeItemButtonSize = computed(() => {
  const sizes = {
    sm: "2xs",
    md: "xs",
    lg: "sm",
  };

  return sizes[props.size];
});

const buttonSize = computed(() => {
  const sizes = {
    sm: "xs",
    md: "sm",
    lg: "md",
  };

  return sizes[props.size];
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
