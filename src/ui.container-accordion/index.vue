<template>
  <div class="mono-accordion" :class="sizeClass" :data-cy="dataCy" @click="onClickItem">
    <div class="item-info">
      <div class="info-title">
        <div>
          {{ title }}
        </div>

        <UIcon :name="isOpened ? 'remove' : 'add'" class="info-icon" :size="size" color="gray" />
      </div>

      <div :ref="name" class="info-description">
        {{ description }}
      </div>
    </div>

    <div class="separator" />
  </div>
</template>

<script>
import UIcon from "vueless/ui.image-icon";

export default {
  name: "UAccordion",
  components: {
    UIcon,
  },

  props: {
    /**
     * Set component title.
     */
    title: {
      type: String,
      required: true,
    },

    /**
     * Set component description.
     */
    description: {
      type: String,
      required: true,
    },

    /**
     * Set unique block name.
     * @ignore
     */
    name: {
      type: String,
      required: true,
    },

    /**
     * The size of component.
     * @values sm, md, lg
     */
    size: {
      type: String,
      default: "md",
    },

    /**
     * Sets data-cy attribute for automated testing.
     */
    dataCy: {
      type: String,
      default: "",
    },
  },

  emits: ["itemClicked"],

  data: () => ({
    isOpened: false,
  }),

  computed: {
    // TODO: This is super weird, need to be removed!
    descriptionNode() {
      return this.$refs[this.name];
    },

    sizeClass() {
      return `size-${this.size}`;
    },
  },

  methods: {
    onClickItem() {
      this.isOpened = !this.isOpened;
      this.descriptionNode.classList.toggle("show-description");

      this.$emit("itemClicked", this.name);
    },
  },
};
</script>

<style scoped lang="postcss">
.mono-accordion {
  @apply cursor-pointer;

  &:not(:first-child) {
    @apply pt-6;
  }

  &:last-child {
    .separator {
      @apply hidden;
    }
  }

  .item-info {
    @apply leading-6;

    .info-title {
      @apply flex items-center justify-between;
      @apply font-medium text-gray-800;
    }

    .info-description {
      @apply h-0 overflow-hidden opacity-0;
      @apply text-gray-600 leading-normal;
    }

    .show-description {
      @apply h-full pt-3 opacity-100;
      @apply transition-all duration-100 ease-in-out;
    }
  }

  .separator {
    @apply mt-2 h-px w-full lg:mt-6;
    @apply bg-gray-100;
    @apply mt-2.5;
  }
}

.size {
  &-sm {
    @apply text-sm;

    .info-description {
      @apply text-xs;
    }
  }

  &-md {
    @apply text-base;

    .info-description {
      @apply text-sm;
    }
  }

  &-lg {
    @apply text-lg;

    .info-description {
      @apply text-base;
    }
  }
}
</style>
