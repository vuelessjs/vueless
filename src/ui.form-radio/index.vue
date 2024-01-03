<template>
  <div ref="radioInput" class="mono-radio-wrapper">
    <t-radio
      :id="id"
      :disabled="disabled"
      class="mono-radio"
      :name="radioName"
      :value="value"
      :checked="checked"
      :data-cy="dataCy"
      @focus="onFocus"
    />

    <div>
      <label v-if="label" :for="id" class="mono-radio-label">{{ label }}</label>

      <!-- @slot Use it to add some description. -->
      <div class="mono-radio-description">
        <slot name="description" :description="description">
          <label v-if="description" :for="id">{{ description }}</label>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
import TRadio from "vueless/library.vue-tailwind-3/t-radio";
import { getRandomId } from "vueless/service.ui";

export default {
  name: "URadio",

  components: { TRadio },

  inject: {
    setRadioGroupSelectedItem: { default: null },
    getRadioGroupName: { default: null },
  },

  props: {
    /**
     * Set radio value.
     */
    value: {
      type: [String, Number],
      default: "",
    },

    /**
     * Set label.
     */
    label: {
      type: String,
      default: "",
    },

    /**
     * Set description.
     */
    description: {
      type: [String, Object],
      default: "",
    },

    /**
     * Set name for radio.
     */
    name: {
      type: String,
      default: "",
    },

    /**
     * Make radio group inactive.
     */
    disabled: {
      type: Boolean,
      default: false,
    },

    /**
     * Make a radio group item checked.
     */
    checked: {
      type: Boolean,
      default: false,
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

  emits: ["update:value"],

  data() {
    return {
      radioName: "",
    };
  },

  mounted() {
    this.radioName = this.name || this.getRadioGroupName();
  },

  methods: {
    onFocus(event) {
      if (this.setRadioGroupSelectedItem) {
        this.setRadioGroupSelectedItem(this.value);
      }

      this.$emit("update:value", event.target.value);
    },
  },
};
</script>

<style lang="postcss" scoped>
.mono-radio {
  @apply border border-solid border-gray-300;
  @apply h-6 w-6;

  &:hover {
    @apply border-gray-400;
  }

  &:active {
    @apply border-gray-900 bg-gray-900;
  }

  &:focus {
    @apply border-gray-500 !bg-gray-900 ring-4 ring-gray-200;
  }

  &:checked {
    @apply border-gray-900 bg-gray-900;

    &:hover {
      @apply bg-gray-900;
    }
  }

  &:disabled {
    @apply border-gray-100 bg-gray-100;
  }

  &-wrapper {
    @apply inline-flex;
  }

  &-label {
    @apply block;
    @apply text-base font-normal text-gray-900;
    @apply pl-4 pt-0.5;
  }

  &-description {
    @apply text-xs font-normal text-gray-500/[85];
    @apply pl-4 pt-1;
  }
}
</style>
