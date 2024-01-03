<template>
  <ULink class="mono-file" :url="url" no-focus-ring target-blank :data-cy="dataCy">
    <div class="mono-file-info">
      <UIcon
        name="description"
        color="gray"
        class="icon"
        interactive
        @focus="onFocus"
        @blur="onBlur"
      />
      <span class="text" :class="focusClass">{{ text }}</span>
    </div>
  </ULink>
</template>

<script>
import ULink from "vueless/ui.button-link";
import UIcon from "vueless/ui.image-icon";

export default {
  name: "UFile",

  components: {
    ULink,
    UIcon,
  },

  props: {
    /**
     * Set url link for the file.
     */
    url: {
      type: String,
      default: "",
    },

    /**
     * Set text.
     */
    text: {
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

  data() {
    return {
      focus: false,
    };
  },

  computed: {
    focusClass() {
      return this.focus ? "focus" : "";
    },
  },

  methods: {
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
.mono-file {
  &-info {
    @apply flex items-start;
  }

  .icon {
    @apply mr-3;
  }

  .text {
    @apply whitespace-normal;
    @apply pt-0.5;

    &:hover {
      @apply underline decoration-dashed underline-offset-4;
    }
  }
}

.focus {
  @apply underline decoration-dashed underline-offset-4;
}
</style>
