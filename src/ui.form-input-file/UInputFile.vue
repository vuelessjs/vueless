<script setup lang="ts">
import {
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
  useId,
  useTemplateRef,
} from "vue";
import { merge } from "lodash-es";

import useUI from "../composables/useUI.ts";
import { getDefaults } from "../utils/ui.ts";
import { hasSlotContent } from "../utils/helper.ts";
import { getFileMbSize } from "./utilFileForm.ts";

import UText from "../ui.text-block/UText.vue";
import ULabel from "../ui.form-label/ULabel.vue";
import UButton from "../ui.button/UButton.vue";
import UFiles from "../ui.text-files/UFiles.vue";

import { useLocale } from "../composables/useLocale.ts";

import { COMPONENT_NAME, MIME_TYPES, COMMON_MIME_TYPES } from "./constants.ts";
import defaultConfig from "./config.ts";

import type { Props, Config } from "./types.ts";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<Props>(), {
  ...getDefaults<Props, Config>(defaultConfig, COMPONENT_NAME),
  modelValue: () => [],
  allowedFileTypes: () =>
    getDefaults<Props, Config>(defaultConfig, COMPONENT_NAME).allowedFileTypes || [],
  label: "",
});

const emit = defineEmits([
  /**
   * Triggers when a file is updated.
   * @property {array} value
   */
  "update:modelValue",

  /**
   * Triggers error changes.
   * @property {string} value
   */
  "error",
]);

const { tm } = useLocale();

const dropZoneRef = useTemplateRef<HTMLDivElement>("dropZone");
const fileInputRef = useTemplateRef<HTMLInputElement>("fileInput");

const localError = ref("");

const elementId = props.id || useId();

const i18nGlobal = tm(COMPONENT_NAME);
const currentLocale = computed(() => merge({}, defaultConfig.i18n, i18nGlobal, props.config.i18n));

const currentFiles = computed<File | File[] | null>({
  get: () => props.modelValue,
  set: (newValue) => {
    const fallbackValue = props.multiple ? [] : null;

    emit("update:modelValue", newValue || fallbackValue);
  },
});

const currentError = computed(() => localError.value || props.error);

const allowedFileTypeFormats = computed(() => {
  return props.allowedFileTypes
    .map((type) => {
      const isMimeType = MIME_TYPES.some((mimeType) => type.includes(mimeType));
      const extension = type.startsWith(".") ? type : `.${type}`;

      if (isMimeType) {
        return type;
      }

      return COMMON_MIME_TYPES[extension] || extension;
    })
    .flat();
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
watch(currentError, () => emit("error", currentError.value));

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

  const isValidType = allowedFileTypeFormats.value.length
    ? allowedFileTypeFormats.value.includes(file.type)
    : true;

  const isValidSize = Number(targetFileSize) <= props.maxFileSize;

  if (!isValidType) {
    localError.value = currentLocale.value.formatError;

    return;
  }

  if (!isValidSize && props.maxFileSize) {
    localError.value = currentLocale.value.sizeError;

    return;
  }

  localError.value = "";
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

  let targetFiles: File[] = [];

  if (event.dataTransfer?.items) {
    targetFiles = [...event.dataTransfer.items]
      .filter((item) => item.kind === "file")
      .map((item) => item.getAsFile())
      .filter((file) => file !== null);
  } else if (event.dataTransfer?.files) {
    targetFiles = [...event.dataTransfer.files].filter((file) => file !== null);
  }

  if (targetFiles.length) {
    targetFiles.forEach(validate);
  }

  nextTick(() => {
    if (currentError.value || !targetFiles.length) {
      onClickResetFiles();

      return;
    }

    currentFiles.value = props.multiple
      ? [
          ...(Array.isArray(currentFiles.value) ? currentFiles.value : []),
          ...removeDuplicates(targetFiles),
        ]
      : targetFiles[0];
  });
}

function onClickRemoveItem(id: string | number) {
  if (Array.isArray(currentFiles.value)) {
    currentFiles.value = currentFiles.value.filter((file) => file.name !== id);
  }
}

/**
 * Get element / nested component attributes for each config token ✨
 * Applies: `class`, `config`, redefined default `props` and dev `vl-...` attributes.
 */
const mutatedProps = computed(() => ({
  error: Boolean(currentError.value),
  label: Boolean(props.label),
}));

defineExpose({
  /**
   * An error.
   * @property {boolean}
   */
  error: currentError,
});

const {
  getDataTest,
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
  chooseFileButtonErrorAttrs,
  clearButtonErrorAttrs,
} = useUI<Config>(defaultConfig, mutatedProps);
</script>

<template>
  <ULabel
    :for="elementId"
    :size="size"
    :label="label"
    :error="currentError"
    :align="labelAlign"
    :disabled="disabled"
    :description="description"
    interactive
    v-bind="inputLabelAttrs"
  >
    <template #label>
      <!--
        @slot Use this to add custom content instead of the label.
        @binding {string} label
      -->
      <slot name="label" :label="label" />
    </template>

    <div ref="dropZone" :ondrop="onDrop" v-bind="dropzoneAttrs">
      <UText v-if="hasSlotContent($slots['top'])" :size="size" v-bind="descriptionTopAttrs">
        <!-- @slot Use it to add something above the component content. -->
        <slot name="top" />
      </UText>

      <div v-bind="contentAttrs">
        <!-- @slot Use it to add something before the placeholder. -->
        <slot name="left" />

        <span v-if="!isValue" v-bind="placeholderAttrs" v-text="currentLocale.noFile" />

        <UFiles
          v-else
          :size="size"
          v-bind="fileListAttrs"
          :file-list="fileList"
          :removable="multiple && !disabled"
          @remove="onClickRemoveItem"
        >
          <template #default="{ id, label, url, imageUrl }">
            <!--
              @slot Use it to add a file directly.
              @binding {string | number} id
              @binding {string} label
              @binding {string} url
              @binding {string} image-url
            -->
            <slot :id="id" :label="label" :url="url" :image-url="imageUrl" />
          </template>
        </UFiles>

        <div v-bind="buttonsAttrs">
          <template v-if="Array.isArray(currentFiles) || !currentFiles">
            <UButton
              tabindex="-1"
              :for="elementId"
              tag="label"
              variant="soft"
              :right-icon="config.defaults.chooseFileIcon"
              :label="currentLocale.uploadFile"
              :disabled="disabled"
              v-bind="currentError ? chooseFileButtonErrorAttrs : chooseFileButtonAttrs"
              :data-test="getDataTest('upload')"
            />

            <input
              :id="elementId"
              ref="fileInput"
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
            variant="soft"
            :disabled="disabled"
            :icon="config.defaults.clearIcon"
            v-bind="currentError ? clearButtonErrorAttrs : clearButtonAttrs"
            :data-test="getDataTest('clear')"
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
