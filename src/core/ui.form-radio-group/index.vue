<template>
  <div ref="URadioGroup" class="mono-radio-group" :data-cy="dataCy">
    <h3 v-if="label" class="mono-radio-group-label">{{ label }}</h3>

    <div :class="labelClass" class="mono-radio-group-wrapper">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: "URadioGroup",

  provide() {
    return {
      setRadioGroupSelectedItem: (value) => {
        this.selectedItem = value;
      },

      getRadioGroupName: () => {
        return this.name;
      },
    };
  },

  props: {
    /**
     * Set radio group label.
     */
    label: {
      type: String,
      default: "",
    },

    /**
     * Set component value.
     */
    modelValue: {
      type: [String, Number],
      default: "",
    },

    /**
     * Set the name for radio group for each radio.
     */
    name: {
      type: String,
      default: "",
    },

    /**
     * Set test dataCy for a radio group.
     */
    dataCy: {
      type: String,
      default: "radio",
    },
  },

  emits: ["update:modelValue"],

  computed: {
    labelClass() {
      return {
        "mono-radio-group-label-margin": this.label,
      };
    },

    selectedItem: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit("update:modelValue", value);
      },
    },
  },
};
</script>

<style lang="postcss" scoped>
.mono-radio-group {
  &-wrapper {
    @apply flex flex-col;
    @apply space-y-4;
  }

  &-label {
    @apply text-sm font-normal text-gray-500;
    @apply mb-6;

    &-margin {
      @apply mb-4 ml-4;
    }
  }
}
</style>
