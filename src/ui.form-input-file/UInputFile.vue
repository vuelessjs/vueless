<template>
  <ULabel
    :for="elementId"
    :size="size"
    :label="label"
    :error="error"
    :align="labelAlign"
    :disabled="disabled"
    :description="description"
    v-bind="inputLabelAttrs"
  >
    <div ref="dropZoneRef" :ondrop="onDrop" v-bind="dropzoneAttrs">
      <UText v-if="hasSlotContent($slots['top'])" :size="size" v-bind="descriptionTopAttrs">
        <!-- @slot Use it to add something above the component content. -->
        <slot name="top" />
      </UText>

      <div v-bind="contentAttrs">
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

        <div v-bind="buttonsAttrs">
          <template v-if="Array.isArray(currentFiles) || !currentFiles">
            <UButton
              filled
              no-ring
              :for="elementId"
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
              :id="elementId"
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
        <!-- @slot Use it to add something below the component content. -->
        <slot name="bottom" />
      </UText>
    </div>
  </ULabel>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch, useId } from "vue";
import { merge } from "lodash-es";

import UText from "../ui.text-block/UText.vue";
import ULabel from "../ui.form-label/ULabel.vue";
import UButton from "../ui.button/UButton.vue";
import UFiles from "../ui.text-files/UFiles.vue";

import { getDefault } from "../utils/utilUI.js";
import { getFileMbSize } from "./utilFileForm.js";

import useAttrs from "./useAttrs.js";
import { useLocale } from "../composables/useLocale.js";

import { UInputFile } from "./constants.js";
import defaultConfig from "./config.js";

defineOptions({ inheritAttrs: false });

const props = defineProps({
  /**
   * Input value.
   */
  modelValue: {
    type: [Array, File],
    default: null,
  },

  /**
   * Input label.
   */
  label: {
    type: String,
    default: "",
  },

  /**
   * Input description.
   */
  description: {
    type: String,
    default: "",
  },

  /**
   * Error message.
   */
  error: {
    type: String,
    default: "",
  },

  /**
   * Label placement.
   * @values top, topInside, topWithDesc
   */
  labelAlign: {
    type: String,
    default: getDefault(defaultConfig, UInputFile).labelAlign,
  },

  /**
   * Input size.
   * @values sm, md, lg
   */
  size: {
    type: String,
    default: getDefault(defaultConfig, UInputFile).size,
  },

  /**
   * Max file size in megabytes.
   */
  maxFileSize: {
    type: Number,
    default: getDefault(defaultConfig, UInputFile).maxFileSize,
  },

  /**
   * Allowed file types.
   */
  allowedFileTypes: {
    type: Array,
    default: () => getDefault(defaultConfig, UInputFile).allowedFileTypes,
  },

  /**
   * Allow selecting multiple files.
   */
  multiple: {
    type: Boolean,
    default: getDefault(defaultConfig, UInputFile).multiple,
  },

  /**
   * Disable the input.
   */
  disabled: {
    type: Boolean,
    default: getDefault(defaultConfig, UInputFile).disabled,
  },

  /**
   * Unique element id.
   */
  id: {
    type: String,
    default: "",
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

const elementId = props.id || useId();

const {
  config,
  inputLabelAttrs,
  chooseFileButtonAttrs,
  dropzoneAttrs,
  descriptionTopAttrs,
  descriptionBottomAttrs,
  contentAttrs,
  clearButtonAttrs,
  placeholderAttrs,
  inputAttrs,
  fileListAttrs,
  buttonsAttrs,
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
  return Array.isArray(currentFiles.value) ? !!currentFiles.value?.length : !!currentFiles.value;
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

  dropZoneRef.value.classList.add(...config.value.dropzoneHover.split(" "));
}

function onDragLeave(event) {
  event.preventDefault();

  dropZoneRef.value.classList.remove(...config.value.dropzoneHover.split(" "));
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
