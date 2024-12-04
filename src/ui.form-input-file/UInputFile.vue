<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch, useId } from "vue";
import { merge } from "lodash-es";

import UText from "../ui.text-block/UText.vue";
import ULabel from "../ui.form-label/ULabel.vue";
import UButton from "../ui.button/UButton.vue";
import UFiles from "../ui.text-files/UFiles.vue";

import { getDefaults } from "../utils/ui.ts";
import { hasSlotContent } from "../utils/helper.ts";
import { getFileMbSize } from "./utilFileForm.ts";

import useAttrs from "./useAttrs.ts";
import { useLocale } from "../composables/useLocale.ts";

import { UInputFile } from "./constants.ts";
import defaultConfig from "./config.ts";

import type { UInputFileProps, ButtonSize, Config } from "./types.ts";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<UInputFileProps>(), {
  ...getDefaults<UInputFileProps, Config>(defaultConfig, UInputFile),
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

const dropZoneRef = ref<HTMLDivElement | null>(null);
const fileInputRef = ref<HTMLInputElement | null>(null);

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
} = useAttrs(props);

const i18nGlobal = tm(UInputFile);
const currentLocale = computed(() => merge(defaultConfig.i18n, i18nGlobal, props.config.i18n));

const currentFiles = computed<File | File[] | null>({
  get: () => {
    return typeof props.modelValue === "function" ? props.modelValue() : props.modelValue;
  },
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
  return props.allowedFileTypes().map((type) => type.replace(".", ""));
});

const allowedFileTypeFormats = computed(() => {
  return props.allowedFileTypes().map((type) => (type.startsWith(".") ? type : `.${type}`));
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

const buttonSize = computed(() => {
  const sizes = {
    sm: "xs",
    md: "sm",
    lg: "md",
  };

  return sizes[props.size] as ButtonSize;
});

onMounted(() => {
  if (dropZoneRef.value) {
    dropZoneRef.value.addEventListener("dragover", onDragOver);
    dropZoneRef.value.addEventListener("dragleave", onDragLeave);
  }
});

onBeforeUnmount(() => {
  if (dropZoneRef.value) {
    dropZoneRef.value.removeEventListener("dragover", onDragOver);
    dropZoneRef.value.removeEventListener("dragleave", onDragLeave);
  }
});

watch(() => props.multiple, normalizeFilesForMultipleMode);

function normalizeFilesForMultipleMode() {
  if (!props.multiple) return;

  if (!Array.isArray(currentFiles.value)) {
    currentFiles.value = currentFiles.value ? [currentFiles.value] : [];
  }
}

function removeDuplicates(files: File[]) {
  return files.filter(
    (file) =>
      file instanceof File &&
      !fileList.value.some((item) => item instanceof File && item.name === file.name),
  );
}

function validate(file: File) {
  const targetFileSize = getFileMbSize(file);

  const isValidType = extensionNames.value.length
    ? extensionNames.value.some((item) => file.type.includes(item))
    : true;

  const isValidSize = Number(targetFileSize) <= props.maxFileSize;

  if (!isValidSize && props.maxFileSize) {
    currentError.value = currentLocale.value.sizeError;
  }

  if (!isValidType) {
    currentError.value = currentLocale.value.formatError;
  }
}

function onChangeFile(event: Event) {
  const target = event.target as HTMLInputElement | null;

  if (target && target.files) {
    const file = target.files[0];

    validate(file);

    if (currentError.value) {
      onClickResetFiles();

      return;
    }

    if (props.multiple) {
      if (!Array.isArray(currentFiles.value)) {
        currentFiles.value = currentFiles.value instanceof File ? [currentFiles.value] : [];
      }

      currentFiles.value = [
        ...currentFiles.value,
        ...removeDuplicates(
          Array.from(target.files).filter((file): file is File => file instanceof File),
        ),
      ];
    } else {
      currentFiles.value = file instanceof File ? file : null;
    }

    if (fileInputRef.value) fileInputRef.value.value = "";
  }
}

function onClickResetFiles() {
  currentFiles.value = null;

  if (fileInputRef.value) fileInputRef.value.value = "";
}

function onDragOver(event: DragEvent) {
  event.preventDefault();

  if (dropZoneRef.value && config.value && config.value.dropzoneHover) {
    dropZoneRef.value.classList.add(...config.value.dropzoneHover.split(" "));
  }
}

function onDragLeave(event: DragEvent) {
  event.preventDefault();

  if (dropZoneRef.value && config.value && config.value.dropzoneHover) {
    dropZoneRef.value.classList.remove(...config.value.dropzoneHover.split(" "));
  }
}

function onDrop(event: DragEvent) {
  event.preventDefault();

  let targetFiles: (File | null)[] = [];

  if (event.dataTransfer && event.dataTransfer.items) {
    targetFiles = [...event.dataTransfer.items]
      .filter((item) => item.kind === "file")
      .map((item) => item.getAsFile())
      .filter((file): file is File => !file);
  } else if (event.dataTransfer && event.dataTransfer.files) {
    targetFiles = [...event.dataTransfer.files];
  }

  if (targetFiles.length) {
    targetFiles.filter((file): file is File => !file).forEach(validate);
  }

  nextTick(() => {
    if (currentError.value || !targetFiles.length) {
      onClickResetFiles();

      return;
    }

    const validFiles = targetFiles.filter((file): file is File => !file);

    currentFiles.value = props.multiple
      ? [
          ...(Array.isArray(currentFiles.value) ? currentFiles.value : []),
          ...removeDuplicates(validFiles),
        ]
      : validFiles[0];
  });
}

function onClickRemoveItem(id: string | number) {
  if (Array.isArray(currentFiles.value)) {
    currentFiles.value = currentFiles.value.filter((file) => file.name !== id);
  }
}
</script>

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

        <UFiles
          :size="size"
          v-bind="fileListAttrs"
          :file-list="fileList"
          :removable="multiple && !disabled"
          @remove="onClickRemoveItem"
        >
          <template #right="{ file }">
            <slot name="right" :file="file" />
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
              :right-icon="config.defaults?.chooseFileIcon"
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
            :left-icon="config.defaults?.clearIcon"
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
