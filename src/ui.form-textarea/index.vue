<template>
  <div class="mono-textarea-wrapper">
    <div class="mono-textarea-block">
      <t-textarea
        :id="id"
        ref="textarea"
        v-model="textArea"
        class="mono-textarea"
        :value="modelValue"
        :placeholder="placeholder"
        :type="type"
        :class="textareaClass"
        :readonly="readonly"
        :disabled="disabled"
        :rows="rows"
        :inputmode="inputMode"
        :data-cy="dataCy"
        @focus="onFocus"
        @blur="onBlur"
        @change="onChange"
        @mouseleave="onMouseleave"
        @mousedown="onMousedown"
        @click="onClick"
      />

      <label v-if="isShownIconSlot" class="mono-textarea-icon-label" :for="id">
        <!-- @slot Use it to add icon after text. -->
        <slot name="icon" />
      </label>
    </div>

    <label class="label" :class="labelClass" :for="id">
      {{ label }}
    </label>

    <p v-if="error" class="error-message" :data-cy="`${dataCy}-error-message`">
      {{ error }}
    </p>

    <p v-if="description && !error" class="description">
      {{ description }}
    </p>
  </div>
</template>

<script>
import { getRandomId } from "vueless/service.ui";
import TTextarea from "vueless/library.vue-tailwind-3/t-textarea";

export default {
  name: "UTextarea",

  components: {
    TTextarea,
  },

  props: {
    /**
     * Set input size.
     * @values sm, md, lg
     */
    size: {
      type: String,
      default: "md",
    },

    /**
     * Set component value.
     */
    modelValue: {
      type: String,
      default: "",
    },

    /**
     * Set component placeholder.
     */
    placeholder: {
      type: String,
      default: "",
    },

    /**
     * Set input label.
     */
    label: {
      type: String,
      default: "",
    },

    /**
     * Set description for component.
     */
    description: {
      type: String,
      default: "",
    },

    /**
     * Make textarea read only.
     */
    readonly: {
      type: Boolean,
      default: false,
    },

    /**
     * Make input inactive.
     */
    disabled: {
      type: Boolean,
      default: false,
    },

    /**
     * Set input type.
     * @values text, number, email, tel, password, url
     */
    type: {
      type: String,
      default: "text",
    },

    /**
     * Set proper keyboard on mobile devices.
     * @values text, none, decimal, tel, numeric, search, email, url,
     */
    inputMode: {
      type: String,
      default: "text",
    },

    /**
     * Disable browsers autocomplete.
     */
    noAutocomplete: {
      type: Boolean,
      default: false,
    },

    /**
     * Set error message.
     */
    error: {
      type: String,
      default: "",
    },

    /**
     * Set number of visible rows.
     */
    rows: {
      type: String,
      default: "2",
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

  emits: ["change", "click", "focus", "blur", "update:modelValue", "mousedown"],

  computed: {
    textArea: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit("update:modelValue", value);
      },
    },

    textareaClass() {
      return {
        disabled: this.disabled,
        "size-sm": this.size === "sm",
        "size-md": this.size === "md",
        "size-lg": this.size === "lg",
        "error-textarea": this.error,
        "mono-textarea-default-padding": !this.isShownIconSlot,
        "mono-textarea-with-icon-padding": this.isShownIconSlot,
      };
    },

    labelClass() {
      return {
        disabled: this.disabled,
        "error-label": this.error,
        "size-label-sm": this.size === "sm",
        "size-label-md": this.size === "md",
        "size-label-lg": this.size === "lg",
      };
    },

    isShownIconSlot() {
      return !!this.$slots["icon"];
    },
  },

  mounted() {
    this.toggleReadonly(true);
  },

  methods: {
    onChange() {
      this.$emit("change");
    },

    onClick(event) {
      this.toggleReadonly(false);

      this.$emit("click", event);
    },

    onFocus() {
      this.toggleReadonly(false);

      this.$emit("focus");
    },

    onBlur() {
      this.toggleReadonly(true);

      this.$emit("blur");
    },

    onMouseleave() {
      this.toggleReadonly(true);
    },

    onMousedown() {
      this.$emit("mousedown");
    },

    toggleReadonly(hasReadonly) {
      if (this.noAutocomplete && !this.readonly) {
        const textarea = document.getElementById(this.id);

        hasReadonly
          ? textarea.setAttribute("readonly", "readonly")
          : textarea.removeAttribute("readonly");
      }
    },
  },
};
</script>

<style lang="postcss" scoped>
.mono-textarea-wrapper {
  @apply relative w-full;

  .mono-textarea {
    @apply font-normal text-gray-900;
    @apply resize-none rounded-lg border border-solid border-gray-300 bg-white shadow-none;
    @apply w-full pl-4;

    &:focus {
      @apply border-gray-500 ring-4 ring-gray-600 ring-opacity-15;
    }

    &:read-only {
      @apply border-gray-300 ring-0;
    }

    &:hover {
      @apply border-gray-400;
    }

    &::placeholder {
      @apply font-normal text-gray-400;
    }

    &-block {
      @apply relative flex;
    }

    &-icon-label {
      @apply flex items-center justify-center;
      @apply h-full w-11;
      @apply absolute right-0;
    }

    &-default-padding {
      @apply pr-4;
    }

    &-with-icon-padding {
      @apply pr-11;
    }
  }

  .label {
    @apply absolute top-px;
    @apply h-auto;
    width: calc(100% - 2rem);
    @apply bg-white;
    @apply font-normal text-gray-500;

    &.disabled {
      @apply bg-gray-100;
    }
  }

  .description {
    @apply text-xs font-normal text-gray-500/[85];
    @apply pl-4 pt-2;
  }

  .disabled {
    @apply border-none bg-gray-100 opacity-100;
  }

  .error {
    &-message {
      @apply text-xs font-normal text-red-500;
      @apply mt-2 pl-4;
    }

    &-label {
      @apply text-red-500;
    }

    &-textarea {
      @apply border-red-300;

      &:hover {
        @apply border-red-400;
      }

      &:focus {
        @apply border-red-500 ring-red-100;
      }
    }
  }
}

.size {
  &-sm {
    @apply text-xs;
    @apply pb-2 pr-4 pt-6;

    &::placeholder {
      @apply text-xs;
    }
  }

  &-md {
    @apply text-base;
    @apply pb-2.5 pr-4 pt-7;

    &::placeholder {
      @apply text-base;
    }
  }

  &-lg {
    @apply text-lg;
    @apply pb-3 pr-4 pt-8;

    &::placeholder {
      @apply text-lg;
    }
  }

  &-label {
    &-sm {
      @apply text-xs;
      @apply left-4;
      @apply pt-2;
    }

    &-md {
      @apply text-sm;
      @apply left-4;
      @apply pt-2.5;
    }

    &-lg {
      @apply text-base;
      @apply left-4;
      @apply pt-3;
    }
  }
}
</style>
