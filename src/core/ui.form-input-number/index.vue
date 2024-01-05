<template>
  <div class="mono-counter" :data-cy="dataCy">
    <div class="mono-counter-button" @click="onClickMinus">
      <UIcon name="remove" size="xs" :data-cy="`${dataCy}-minus`" />
    </div>

    <div class="mono-counter-value">
      {{ count }}
    </div>

    <div class="mono-counter-button" @click="onClickPlus">
      <UIcon class="plus" name="add" size="xs" :data-cy="`${dataCy}-plus`" />
    </div>
  </div>
</template>

<script>
import UIcon from "vueless/ui.image-icon";

export default {
  name: "UInputNumber",

  components: {
    UIcon,
  },

  props: {
    /**
     * Set value.
     */
    modelValue: {
      type: Number,
      required: true,
    },

    /**
     * Set step size.
     */
    step: {
      type: Number,
      default: 1,
    },

    /**
     * Set min value.
     */
    min: {
      type: Number,
      default: 1,
    },

    /**
     * Set max value.
     */
    max: {
      type: Number,
      default: 999,
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

  computed: {
    count: {
      get() {
        return this.modelValue;
      },

      set(value) {
        this.$emit("update:modelValue", value);
      },
    },
  },

  methods: {
    onClickMinus() {
      const newCount = this.count - this.step;

      this.count = newCount >= this.min ? newCount : this.count;
    },

    onClickPlus() {
      const newCount = this.count + this.step;

      this.count = newCount <= this.max ? newCount : this.count;
    },
  },
};
</script>

<style lang="postcss" scoped>
.mono-counter {
  @apply flex items-center justify-between;
  @apply space-x-3;

  &-button {
    @apply flex items-center justify-center;
    @apply h-6 w-6 rounded-full;
    @apply bg-gray-100;
    @apply cursor-pointer;

    &:hover {
      @apply bg-gray-200;
    }

    &:active {
      @apply bg-gray-300;
    }
  }

  &-value {
    @apply select-none text-sm font-normal;
    -moz-user-select: -moz-none;
    -o-user-select: none;
    -khtml-user-select: none;
    -webkit-user-select: none;
  }
}
</style>
