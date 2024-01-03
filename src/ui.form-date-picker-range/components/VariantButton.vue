<template>
  <div class="date-button" :data-cy="dataCy">
    <t-button
      class="arrow arrow-left"
      :data-cy="`${dataCy}-prev`"
      @click="onClickShiftRange('prev')"
    >
      <UIcon class="icon" size="sm" name="arrow_back_ios_new" />
    </t-button>

    <t-button
      :id="id"
      class="date-current"
      :text="title"
      :data-cy="`${dataCy}-title`"
      @blur="onBlur"
      @click="onClickRangeSet"
    />

    <t-button
      class="arrow arrow-right"
      :data-cy="`${dataCy}-next`"
      @click="onClickShiftRange('next')"
    >
      <UIcon class="icon" size="sm" name="arrow_forward_ios" />
    </t-button>
  </div>
</template>

<script>
import UIcon from "vueless/ui.image-icon";
import TButton from "vueless/library.vue-tailwind-3/t-button";

export default {
  components: {
    UIcon,
    TButton,
  },

  props: {
    title: {
      type: String,
      default: "",
    },

    id: {
      type: String,
      default: "",
    },

    dataCy: {
      type: String,
      default: "",
    },
  },

  emits: ["clickShiftRange", "clickRangeSet", "blur"],

  methods: {
    onClickShiftRange(action) {
      this.$emit("clickShiftRange", action);
    },

    onClickRangeSet() {
      this.$emit("clickRangeSet");
    },

    onBlur() {
      this.$emit("blur");
    },
  },
};
</script>

<style lang="postcss" scoped>
.date {
  &-button {
    @apply flex rounded-lg max-md:justify-between;
    @apply h-full;

    &:active {
      @apply bg-opacity-5;
    }

    &:focus-within {
      @apply ring-4 ring-gray-600 ring-opacity-15;
    }
  }

  &-current {
    @apply rounded-none shadow-none;
    @apply text-base font-medium text-gray-900;
    @apply border-0 bg-gray-900 bg-opacity-5;
    @apply shrink-0 flex-grow;

    &:hover {
      @apply bg-opacity-10 bg-gray-600/15 ring-gray-600 ring-opacity-15;
    }

    &:focus {
      @apply border-0 ring-0 bg-gray-600/15 ring-gray-600 ring-opacity-15;
    }
  }
}

.arrow {
  @apply flex items-center;
  @apply bg-gray-900 bg-opacity-5 shadow-none;
  @apply border-0;
  @apply py-[0.71875rem];

  &:hover {
    @apply bg-opacity-10 bg-gray-600/15 ring-gray-600 ring-opacity-15;
  }

  &:focus {
    @apply border-0 ring-0 bg-gray-600/15 ring-gray-600 ring-opacity-15;
  }

  &-left {
    @apply rounded-l-lg rounded-r-none;
  }

  &-right {
    @apply rounded-l-none rounded-r-lg;
  }
}

.icon {
  @apply cursor-pointer;

  &:deep(g [fill]) {
    @apply fill-current text-gray-900;
  }
}
</style>
