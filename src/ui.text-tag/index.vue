<template>
  <div
    class="mono-tag"
    :class="[colorClass, sizeClass]"
    tabindex="1"
    :data-cy="dataCy"
    @focus="onFocus"
    @keydown="onKeydown"
    @blur="onBlur"
    @mousedown="onMousedown"
  >
    <div class="mono-tag-body">
      <div>{{ text }}</div>

      <slot name="right">
        <UIcon
          v-if="tooltipText"
          :tooltip="tooltipText"
          :data-cy="`${dataCy}-info`"
          name="info"
          size="xs"
          class="icon"
        />
      </slot>
    </div>
  </div>
</template>

<script>
import UIcon from "vueless/ui.image-icon";

export default {
  name: "UTag",
  components: {
    UIcon,
  },

  props: {
    /**
     * The color of the tag.
     * @values gray, red, orange, yellow, green, blue, violet, fuchsia
     */
    color: {
      type: String,
      default: "blue",
    },

    /**
     * The size of the tag.
     * @values sm, md, lg
     */
    size: {
      type: String,
      default: "md",
    },

    /**
     * Set tag text.
     */
    text: {
      type: String,
      required: true,
    },

    /**
     * Set tooltip text.
     */
    tooltipText: {
      type: String,
      default: "",
    },

    /**
     * Sets data-cy attribute for automated testing.
     */
    dataCy: {
      type: String,
      default: "",
    },
  },

  emits: ["focus", "keydown", "blur", "mousedown"],

  computed: {
    sizeClass() {
      return `mono-tag-size-${this.size}`;
    },

    colorClass() {
      return `mono-tag-${this.color}`;
    },
  },

  methods: {
    onFocus() {
      this.$emit("focus");
    },

    onKeydown() {
      this.$emit("keydown");
    },

    onBlur(event) {
      this.$emit("blur", event);
    },

    onMousedown() {
      this.$emit("mousedown");
    },
  },
};
</script>

<style lang="postcss" scoped>
.mono-tag {
  @apply rounded-full;
  @apply inline-block;

  &-body {
    @apply flex items-center;
  }

  .icon {
    @apply ml-1;

    &:deep(g [fill]) {
      @apply fill-current;
    }
  }

  &-size-sm {
    @apply p-0.5 px-2;
    @apply text-2xs;
  }

  &-size-md {
    @apply px-2 py-1;
    @apply text-xs;
  }

  &-size-lg {
    @apply px-3 py-1.5;
    @apply text-sm;
  }

  &-gray {
    @apply bg-gray-100 text-gray-900;
  }

  &-red {
    @apply bg-red-100 text-red-800;
  }

  &-orange {
    @apply bg-orange-100 text-orange-800;
  }

  &-yellow {
    @apply bg-yellow-100 text-yellow-800;
  }

  &-green {
    @apply bg-green-100 text-green-800;
  }

  &-blue {
    @apply bg-blue-100 text-blue-800;
  }

  &-violet {
    @apply bg-violet-100 text-violet-800;
  }

  &-fuchsia {
    @apply bg-fuchsia-100 text-fuchsia-800;
  }
}
</style>
