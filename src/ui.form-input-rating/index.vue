<template>
  <div class="mono-rating" :class="sizeClass" :data-cy="dataCy">
    <h3 v-if="label" class="label">{{ label }}</h3>

    <div class="star-rating-wrapper">
      <div v-if="!noCounter" class="counter">
        <!-- @slot Use it to add counter. -->
        <slot name="counter">
          {{ ratingCounter }}
        </slot>
      </div>

      <div class="icons">
        <UIcon
          v-for="star in starsNumber"
          :key="star"
          :data-cy="`${dataCy}-rating-star-${star}`"
          :name="star <= ratingCounter ? 'star-fill' : 'star'"
          :size="iconSize"
          class="mono-rating-star"
          :class="getIconClasses(star)"
          color="yellow"
          variant="light"
          @mouseover="onMouseHover(star)"
          @mouseleave="onMouseHover()"
          @click="onClickStar(star)"
        />

        <p v-if="error" class="error-message" :data-cy="`${dataCy}-error-message`">
          {{ error }}
        </p>
      </div>

      <!-- @slot Use it to add something right. -->
      <slot name="right" />
    </div>
  </div>
</template>

<script>
import UIcon from "vueless/ui.image-icon";

export default {
  name: "UInputRating",

  components: {
    UIcon,
  },

  props: {
    /**
     * Set input rating  label.
     */
    label: {
      type: String,
      default: "",
    },

    /**
     * Set input rating value.
     */
    modelValue: {
      type: Number,
      default: 0,
    },

    /**
     * Set the number of stars.
     */
    starsNumber: {
      type: Number,
      default: 5,
    },

    /**
     * Set component size.
     * @values sm, md, lg
     */
    size: {
      type: String,
      default: "md",
    },

    /**
     * Make stars selectable.
     */
    selectable: {
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
     * Hide / show counter.
     */
    noCounter: {
      type: Boolean,
      default: false,
    },

    /**
     * Sets data-cy attribute for automated testing.
     */
    dataCy: {
      type: String,
      default: "",
    },
  },

  emits: ["update:modelValue"],

  data: () => ({
    hovered: null,
  }),

  computed: {
    iconSize() {
      const sizes = {
        sm: "xs",
        md: "sm",
        lg: "md",
      };

      return sizes[this.size];
    },

    sizeClass() {
      return `size-${this.size}`;
    },

    ratingCounter() {
      return this.hovered || this.modelValue;
    },
  },

  methods: {
    onClickStar(newValue) {
      if (this.selectable) {
        const selected = newValue !== this.modelValue ? newValue : 0;

        this.hovered = null;

        this.$emit("update:modelValue", selected);
      }
    },

    onMouseHover(overStar) {
      if (this.selectable) this.hovered = overStar;
    },

    getIconClasses(star) {
      const roundedValue = Math.ceil(this.ratingCounter);
      const isSelected = star <= roundedValue;

      return {
        "elected-star": isSelected,
        "cursor-pointer": this.selectable,
      };
    },
  },
};
</script>

<style lang="postcss" scoped>
.mono-rating {
  @apply flex flex-col;

  .label {
    @apply text-sm font-normal text-gray-500;
    @apply mb-0.5;
  }

  &-wrapper {
    @apply flex items-center space-x-2;

    .counter {
      @apply leading-none;
    }

    .icons {
      @apply leading-none;

      .star:deep(:not(.selected-star) [stroke]) {
        @apply stroke-current text-yellow-400;
      }

      .error-message {
        @apply font-normal text-red-500;
        @apply pl-1.5;
      }
    }
  }
}

.size {
  &-sm {
    .label {
      @apply text-xs;
    }

    .counter {
      @apply text-2xs;
    }

    .error-message {
      @apply text-2xs;
    }
  }

  &-md {
    .counter {
      @apply text-xs;
    }

    .error-message {
      @apply text-xs;
    }
  }

  &-lg {
    .label {
      @apply text-base;
      @apply mb-1;
    }

    .counter {
      @apply text-sm;
    }

    .error-message {
      @apply text-sm;
    }
  }
}
</style>
