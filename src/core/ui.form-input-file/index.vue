<template>
  <div class="mono-file-upload-wrapper">
    <div v-if="!isExistSlot('default')">
      <div :id="fileId" class="mono-file-upload" :class="[fileUploadClasses]" :data-cy="dataCy">
        <div class="mono-file-upload-label">
          {{ label }}
        </div>

        <div v-if="!filesData.length" class="mono-file-upload-block">
          <UIcon name="upload_file" color="gray" :size="descriptionIconSize" />

          <div class="mono-file-upload-description">
            {{ i18n.selectOrDragImage }} {{ allowedFilesForUpload }}
          </div>
        </div>

        <div class="mono-file-upload-list">
          <div v-for="(file, index) in filesData" :key="file.id" class="mono-file-upload-item">
            <div class="mono-file-upload-item-block">
              <img v-if="file.imageUrl" class="mono-file-upload-item-image" :src="file.imageUrl" />

              <UIcon v-else name="description" color="gray" size="lg" />

              <div class="mono-file-upload-item-title">
                {{ file.name }}
              </div>
            </div>

            <UIcon
              class="mono-file-upload-item-close"
              name="close"
              interactive
              :size="size"
              color="gray"
              :data-cy="`${dataCy}-${index}-delete`"
              @click="onClickDeleteFile(file.id)"
            />
          </div>
        </div>

        <UButton
          class="mono-file-upload-button"
          :text="i18n.selectFile"
          :size="buttonSize"
          variant="thirdary"
          filled
          :data-cy="`${dataCy}-upload`"
          @click="onClickUploadFile"
        />

        <DragDrop :id="uppyId" class="uppy-upload" :uppy="uppy" :class="uppyUploadClass" />
      </div>
    </div>

    <div
      v-else
      :id="fileId"
      class="mono-file-upload-slot"
      :data-cy="dataCy"
      @click="onClickUploadFile"
    >
      <slot />

      <DragDrop :id="uppyId" class="uppy-upload" :uppy="uppy" :class="uppyUploadClass" />
    </div>

    <p v-if="errorMessage" class="error-message" :data-cy="`${dataCy}-error-message`">
      {{ errorMessage }}
    </p>
  </div>
</template>

<script>
import Uppy from "@uppy/core";
import DragDrop from "@uppy/vue/src/drag-drop";
import { getRandomId } from "vueless/service.ui";
import UIcon from "vueless/ui.image-icon";
import UButton from "vueless/ui.button";
import I18nServiceDefault from "vueless/service.i18n";

export default {
  name: "UInputFile",

  components: {
    UButton,
    DragDrop,
    UIcon,
  },

  props: {
    /**
     * Set label.
     */
    label: {
      type: String,
      default: "",
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
      default: false,
    },

    /**
     * Set max file size in megabytes.
     */
    maxFileSizeInMegabytes: {
      type: Number,
      default: 1,
    },

    /**
     * Allow to select multiple files.
     */
    multiple: {
      type: Boolean,
      default: false,
    },

    /**
     * Set max number files for upload
     */
    maxFiles: {
      type: Number,
      default: 3,
    },

    /**
     * Set allowed file types.
     */
    allowedFileTypes: {
      type: Array,
      default: () => [".png", ".jpg", ".jpeg", ".pdf", ".txt", ".doc", ".docx", "xls", ".xlsx"],
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
      default: "md",
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
  },

  emits: ["changeFiles", "deleteFile"],

  setup() {
    const { getTranslation } = new I18nServiceDefault();

    return { getTranslation };
  },

  data: () => ({
    filesData: [],
    selectedFiles: [],
    errorMessage: "",
    dragOver: false,
    errorFilesTypes: [],
  }),

  computed: {
    i18n() {
      return {
        selectOrDragImage: this.getTranslation("selectOrDragImage"),
        selectFile: this.getTranslation("selectFile"),
        canAttachFilesFormat: this.getTranslation("canAttachFilesFormat"),
        cannotAttachFilesStart: this.getTranslation("cannotAttachFilesStart"),
        cannotAttachFilesEnd: this.getTranslation("cannotAttachFilesEnd"),
      };
    },

    fileId() {
      return `file-${this.id}`;
    },

    uppyId() {
      return `uppy-${this.id}`;
    },

    fileUpload() {
      return document.getElementById(this.fileId);
    },

    uppyUpload() {
      return document.getElementById(this.uppyId);
    },

    allowedFilesForUpload() {
      const allowedFormat = this.allowedFileTypes.join(", ");

      return `${this.i18n.canAttachFilesFormat} ${allowedFormat}`;
    },

    descriptionIconSize() {
      const size = {
        sm: "md",
        md: "lg",
        lg: "xl",
      };

      return size[this.size];
    },

    fileUploadClasses() {
      return {
        "error-file-upload": this.errorMessage,
        "size-sm": this.size === "sm",
        "size-md": this.size === "md",
        "size-lg": this.size === "lg",
      };
    },

    uppyUploadClass() {
      return this.dragOver ? "uppy-upload-drag-over" : "";
    },

    buttonSize() {
      return this.size === "lg" ? "md" : "sm";
    },

    maxFileSizeInBytes() {
      return this.maxFileSizeInMegabytes * Math.pow(2, 20);
    },

    uppy() {
      return new Uppy({
        id: this.uppyId,
        restrictions: {
          maxFileSize: this.maxFileSizeInBytes,
          maxNumberOfFiles: this.maxFilesNumber,
          allowedFileTypes: this.allowedFileTypes,
        },
      }).on("restriction-failed", (file, error) => {
        const isFile = this.errorFilesTypes.find((item) => item === file.extension);

        if (error && !isFile) this.errorFilesTypes.push(`.${file.extension}`);
      });
    },

    maxFilesNumber() {
      return this.multiple ? this.maxFiles : 1;
    },
  },

  watch: {
    selectedFiles: {
      handler: "onChangeSelectedFiles",
      deep: true,
    },

    files: {
      handler: "onChangeFiles",
      deep: true,
    },

    errorFilesTypes: {
      handler: "onChangeErrorFilesTypes",
      deep: true,
    },

    error: {
      handler: "onChangeError",
      deep: true,
      immediate: true,
    },
  },

  mounted() {
    addEventListener("dragover", () => (this.dragOver = true));

    if (this.uppyUpload) {
      this.uppyUpload.addEventListener("dragover", this.onDragOver, true);
      this.uppyUpload.addEventListener("dragleave", this.onDragLeave, true);
    }
  },

  beforeUnmount() {
    removeEventListener("dragover", () => (this.dragOver = true));
    this.uppyUpload.removeEventListener("dragover", this.onDragOver, true);
    this.uppyUpload.removeEventListener("dragleave", this.onDragLeave, true);
  },

  created() {
    this.uppy.on("file-added", () => {
      this.uploadFiles();
    });
  },

  methods: {
    isExistSlot(slotName) {
      return !!this.$slots[slotName];
    },

    onClickUploadFile() {
      document.querySelector(`#${this.fileId} .uppy-Root button`).click();
    },

    uploadFiles() {
      const { files } = this.uppy.getState();

      this.selectedFiles = Object.values(files);
    },

    onDragOver() {
      this.fileUpload.classList.add("hover-file-upload");
    },

    onDragLeave() {
      this.fileUpload.classList.remove("hover-file-upload");
      this.dragOver = false;
    },

    onChangeSelectedFiles() {
      this.uppy.cancelAll();

      const selectedFilesData = this.selectedFiles.map((file) => file.data);

      if (this.local) this.filesData = selectedFilesData;

      this.$emit("changeFiles", selectedFilesData);
    },

    onChangeFiles() {
      this.filesData = this.files;

      if (!this.error && this.errorMessage) {
        this.errorMessage = "";
        this.errorFilesTypes = [];
      }

      this.onDragLeave();
    },

    onChangeError() {
      this.errorMessage = this.error;
    },

    onChangeErrorFilesTypes() {
      if (this.errorFilesTypes.length) {
        let error = this.errorFilesTypes.join(", ");

        this.errorMessage = `${this.i18n.cannotAttachFilesStart} ${error} ${this.i18n.cannotAttachFilesEnd}`;
      }
    },

    onClickDeleteFile(id) {
      const index = this.filesData.findIndex((file) => file.id === id);

      if (~index) {
        this.filesData.splice(index, 1);

        this.uppy.removeFile(id);

        this.$emit("deleteFile", id);

        if (this.local) this.$emit("changeFiles", this.filesData);
      }
    },
  },
};
</script>

<i18n>
en:
  selectOrDragImage: Select or drag file in this area.
  canAttachFilesFormat: "You can attach files in the format:"
  cannotAttachFilesStart: "Attaching files in"
  cannotAttachFilesEnd: "format is not supported."
  selectFile: Select file
ru:
  selectOrDragImage: Выберите или перетащите файл в это окно.
  canAttachFilesFormat: "Вы можете прикрепить файлы в формате:"
  cannotAttachFilesStart: "Прикрепление файлов в формате"
  cannotAttachFilesEnd: "не поддерживается."
  selectFile: Выберите файл
ua:
  selectOrDragImage: Оберіть або перетягніть файл в це вікно.
  canAttachFilesFormat: "Ви можете прикріпити файли у форматі:"
  cannotAttachFilesStart: "Прикріплення файлів у форматі"
  cannotAttachFilesEnd: "не підтримується."
  selectFile: Оберіть файл
</i18n>

<style lang="postcss" scoped>
.size {
  &-sm {
    .mono-file-upload {
      &-label {
        @apply text-xs;
      }

      &-description {
        @apply text-xs;
      }

      &-item {
        &-image {
          @apply h-8 w-8;
        }

        &-title {
          @apply text-sm;
        }
      }
    }
  }

  &-md {
    .mono-file-upload {
      &-label {
        @apply text-sm;
      }

      &-description {
        @apply text-sm;
      }

      &-item {
        &-image {
          @apply h-10 w-10;
        }

        &-title {
          @apply text-base;
        }
      }
    }
  }

  &-lg {
    .mono-file-upload {
      &-label {
        @apply text-base;
      }

      &-description {
        @apply text-base;
      }

      &-item {
        &-image {
          @apply h-12 w-12;
        }

        &-title {
          @apply text-lg;
        }
      }
    }
  }
}

.mono-file-upload {
  @apply relative;
  @apply rounded-lg border border-dashed border-gray-300 bg-white;
  @apply h-auto w-auto p-4;

  &:hover {
    @apply border-gray-400 bg-gray-50;
  }

  &-wrapper {
    @apply w-full;
  }

  &-label {
    @apply mb-2 font-normal text-gray-500;
  }

  &-block {
    @apply flex;
    @apply mb-4 space-x-2;
  }

  &-description {
    @apply font-normal text-gray-700;
  }

  &-button {
    @apply w-full;
  }

  &-list {
    @apply mb-4 space-y-4;
  }

  &-item {
    @apply flex items-center justify-between;
    @apply border-b border-gray-200;
    @apply pb-2;

    &-block {
      @apply flex items-center;
    }

    &-image {
      @apply rounded-sm;
    }

    &-title {
      @apply font-normal text-gray-900;
      @apply ml-2 break-all;
    }

    &-close {
      @apply z-20;
    }
  }

  &-slot {
    @apply w-fit;
  }
}

.mono-file-upload.hover-file-upload {
  @apply border-gray-400 bg-gray-50;
}

.uppy-upload {
  @apply absolute left-0 top-0;
  @apply opacity-0;
  @apply h-0 w-0;

  &:deep(.uppy-Root) {
    @apply h-full w-full;
  }
}

.uppy-upload-drag-over {
  @apply h-full w-full;
}

.error {
  &-message {
    @apply text-xs font-normal text-red-500;
    @apply mt-2 pl-4;
  }

  &-file-upload {
    @apply border-red-300;

    &:hover {
      @apply border-red-400;
    }
  }
}
</style>
