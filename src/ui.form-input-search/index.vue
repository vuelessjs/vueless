<template>
  <div class="mono-search-wrapper" :class="focusClass" @keyup.enter="onClickSearch">
    <!-- @slot Use it to add something before text. -->
    <slot name="left" />

    <t-input
      :id="id"
      ref="searchInput"
      v-model="search"
      class="mono-search-input"
      type="search"
      inputmode="search"
      :class="inputSizeClass"
      :data-cy="dataCy"
      @focus="onFocus"
      @blur="onBlur"
    />

    <UIcon
      name="close"
      class="mono-search-icon-close"
      color="gray"
      interactive
      :data-cy="`${dataCy}-close`"
      :size="iconSize"
      @click="onClickClear"
    />

    <UIcon
      name="search"
      class="mono-search-icon"
      interactive
      :size="iconSize"
      :data-cy="`${dataCy}-search`"
      @click="onClickSearch"
    />
  </div>
</template>

<script>
import UIcon from "vueless/ui.image-icon";
import TInput from "vueless/library.vue-tailwind-3/t-input";
import { getRandomId } from "vueless/service.ui";

export default {
  name: "UInputSearch",

  components: {
    UIcon,
    TInput,
  },

  props: {
    /**
     * Set component value.
     */
    modelValue: {
      type: String,
      default: "",
    },

    /**
     * Set input size.
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

  emits: ["update:modelValue", "clear", "search"],

  data() {
    return {
      focus: false,
    };
  },

  computed: {
    search: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit("update:modelValue", value);
      },
    },

    focusClass() {
      return this.focus ? "focus" : "";
    },

    inputSizeClass() {
      return {
        "size-sm": this.size === "sm",
        "size-md": this.size === "md",
        "size-lg": this.size === "lg",
      };
    },

    iconSize() {
      const sizes = {
        sm: "xs",
        md: "sm",
        lg: "md",
      };

      return sizes[this.size];
    },
  },

  methods: {
    onClickClear() {
      this.search = "";
      this.$emit("clear");
    },

    onClickSearch() {
      this.focus = true;
      if (!this.search) return;
      this.$emit("search", this.search);
    },

    onFocus() {
      this.focus = true;
    },

    onBlur() {
      this.focus = false;
    },
  },
};
</script>

<style lang="postcss" scoped>
.mono-search {
  &-wrapper {
    @apply relative;
    @apply flex items-center justify-between;
    @apply w-full rounded-lg;
    @apply bg-gray-900 bg-opacity-5;
    @apply pr-3;
  }

  &-input {
    @apply h-full;
    @apply border-0 bg-transparent shadow-none focus:ring-0;
    @apply font-normal text-gray-900;

    &::-webkit-search-decoration,
    &::-webkit-search-cancel-button,
    &::-webkit-search-results-button,
    &::-webkit-search-results-decoration {
      -webkit-appearance: none;
    }
  }

  &-icon {
    @apply flex h-full items-center;
    @apply ml-2;

    &:deep(g [fill]) {
      @apply fill-current text-gray-900 opacity-100;
    }

    &-close {
      @apply flex h-full items-center;
      @apply absolute right-8 top-0;
    }
  }
}

.focus {
  @apply ring-4 ring-gray-900 ring-opacity-15;
}

.size {
  &-sm {
    @apply mb-0.5;
    @apply text-sm;
  }

  &-md {
    @apply mb-1 mt-0.5;
  }

  &-lg {
    @apply mb-2 mt-1.5;
    @apply text-lg;
  }
}
</style>
