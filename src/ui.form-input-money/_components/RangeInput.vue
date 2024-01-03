<template>
  <div>
    <div class="money" :class="moneyClass">
      <div class="money-wrapper" :class="disabledClass.startRange">
        <label v-if="!hideLabel" class="money-label" :for="`startRange${id}`" :class="labelClass">
          {{ label.startRange }}
        </label>

        <t-input
          :id="`startRange${id}`"
          class="money-input"
          :placeholder="money.startRange.placeholder"
          :model-value="money.startRange.sum"
          :data-cy="`${dataCy}-start-range-input`"
          :disabled="disabled.startRange"
          inputmode="decimal"
          @keyup="onKeyupInput"
        />
      </div>

      <div class="money-wrapper" :class="disabledClass.endRange">
        <label v-if="!hideLabel" class="money-label" :for="`endRange${id}`" :class="labelClass">
          {{ label.endRange }}
        </label>

        <t-input
          :id="`endRange${id}`"
          class="money-input"
          :placeholder="money.endRange.placeholder"
          :model-value="money.endRange.sum"
          :data-cy="`${dataCy}-end-range-input`"
          :disabled="disabled.endRange"
          inputmode="decimal"
          @keyup="onKeyupInput"
        />
      </div>
    </div>

    <div v-if="error" class="error-message" :data-cy="`${dataCy}-error-message`">
      {{ error }}
    </div>
  </div>
</template>

<script>
import Cleave from "cleave.js";
import { getRandomId } from "vueless/service.ui";
import TInput from "vueless/library.vue-tailwind-3/t-input";

export default {
  components: {
    TInput,
  },

  props: {
    modelValue: {
      type: Object,
      default: () => ({}),
    },

    cleaveSettings: {
      type: Object,
      default: () => ({}),
    },

    hideLabel: {
      type: Boolean,
      default: false,
    },

    id: {
      type: String,
      default: () => getRandomId(),
    },

    error: {
      type: String,
      default: "",
    },

    numeralDecimalScale: {
      type: Object,
      default: () => ({
        startRange: 2,
        endRange: 2,
      }),
    },

    disabled: {
      type: Object,
      default: () => ({
        startRange: false,
        endRange: false,
      }),
    },

    i18n: {
      type: Object,
      default: () => ({}),
    },

    dataCy: {
      type: String,
      default: "",
    },
  },

  emits: ["update:modelValue"],

  data: () => ({
    money: {
      startRange: {
        symbol: "",
        sum: "",
        placeholder: "",
        label: "",
      },
      endRange: {
        symbol: "",
        sum: "",
        placeholder: "",
        label: "",
      },
    },
  }),

  computed: {
    startRange() {
      return this.$el.querySelector(`#startRange${this.id}`);
    },

    endRange() {
      return this.$el.querySelector(`#endRange${this.id}`);
    },

    moneyClass() {
      return {
        "error-input": this.error,
      };
    },

    disabledClass() {
      return {
        startRange: this.disabled.startRange ? "disabled" : "",
        endRange: this.disabled.endRange ? "disabled" : "",
      };
    },

    labelClass() {
      return {
        "error-label": this.error,
      };
    },

    label() {
      const separatedSymbol =
        this.money?.startRange?.symbol || this.money?.startRange?.symbol ? "," : "";

      const startRange = `${this.money?.startRange?.label}${separatedSymbol} ${this.money?.startRange?.symbol}`;
      const endRange = `${this.money?.endRange?.label}${separatedSymbol} ${this.money?.endRange?.symbol}`;

      return {
        startRange,
        endRange,
      };
    },
  },

  watch: {
    money: {
      handler: "onChangeMoney",
      deep: true,
    },
    value: {
      handler: "onChangeValue",
      deep: true,
    },
  },

  mounted() {
    this.prefillInput();

    this.cleaveStartRange = new Cleave(this.startRange, {
      ...this.cleaveSettings,
      numeralDecimalScale: this.numeralDecimalScale.startRange,
    });

    this.cleaveStartRange.setRawValue(this.money.startRange.sum);

    this.cleaveEndRange = new Cleave(this.endRange, {
      ...this.cleaveSettings,
      numeralDecimalScale: this.numeralDecimalScale.endRange,
    });

    this.cleaveEndRange.setRawValue(this.money.endRange.sum);

    this.addEventListeners(this.startRange);
    this.addEventListeners(this.endRange);
  },

  beforeUnmount() {
    this.removeEventListeners(this.startRange);
    this.removeEventListeners(this.endRange);
  },

  methods: {
    addEventListeners(element) {
      element.addEventListener("paste", (event) => this.onPaste(event));
      element.addEventListener("keydown", (event) => this.onKeydown(event));
    },

    removeEventListeners(element) {
      element.removeEventListener("paste", (event) => this.onPaste(event));
      element.removeEventListener("keydown", (event) => this.onKeydown(event));
    },

    onPaste(event) {
      event.preventDefault();
      event.target.value = (event.clipboardData || window.clipboardData)
        .getData("text")
        .replace(".", ",");
    },

    onKeydown(event) {
      if (event.key === ".") {
        event.preventDefault();
        event.target.value += ",";
      }
    },

    prefillInput() {
      this.money.startRange = {
        symbol: this.modelValue?.startRange?.symbol || "",
        sum: this.modelValue?.startRange?.sum,
        placeholder: this.modelValue?.startRange?.placeholder,
        label: this.modelValue?.startRange?.label || this.i18n.amount,
      };

      this.money.endRange = {
        symbol: this.modelValue?.endRange?.symbol || "",
        sum: this.modelValue?.endRange?.sum,
        placeholder: this.modelValue?.endRange?.placeholder,
        label: this.modelValue?.endRange?.label || this.i18n.amount,
      };
    },

    onChangeMoney() {
      if (!this.cleaveStartRange || !this.cleaveEndRange) return;

      let newMoney = {};

      newMoney.startRange = this.cleaveStartRange?.getRawValue();

      newMoney.endRange = this.cleaveEndRange?.getRawValue();

      this.$emit("update:modelValue", newMoney);
    },

    onChangeValue(value) {
      if (!this.cleaveStartRange || !this.cleaveEndRange) return;

      this.cleaveStartRange.setRawValue(value.startRange);
      this.cleaveEndRange.setRawValue(value.endRange);

      this.onKeyupInput();
    },

    onKeyupInput() {
      if (!this.cleaveStartRange || !this.cleaveEndRange) return;

      this.money.startRange.sum = this.cleaveStartRange.getFormattedValue();

      this.money.endRange.sum = this.cleaveEndRange.getFormattedValue();
    },
  },
};
</script>

<style lang="postcss" scoped>
.money {
  @apply flex w-full;
  @apply rounded-lg border border-gray-300 bg-white;
  @apply transition-all duration-100;
  @apply overflow-hidden;

  &:hover {
    @apply border-gray-400;
  }

  &:focus-within {
    @apply border-gray-500 ring-4 ring-gray-600 ring-opacity-15;
  }

  &-wrapper {
    @apply flex-auto;
    @apply px-4 py-2.5;
    @apply relative;

    &:first-child {
      &::after {
        content: "";
        @apply absolute right-0 top-2;
        @apply bg-gray-300;
        @apply h-[2.625rem] w-px;
      }
    }
  }

  &-label {
    @apply block;
    @apply whitespace-nowrap text-sm font-normal text-gray-500;
    @apply pb-0.5;
  }

  &-input {
    @apply text-base font-normal text-gray-900;
    @apply rounded-none border-0 shadow-none ring-0;
    @apply p-0;

    &:focus {
      @apply ring-0;
    }
  }
}

.error-message {
  @apply text-xs font-normal text-red-500;
  @apply mt-2 pl-4;
}

.error-label {
  @apply text-red-500;
}

.error-input {
  @apply border-red-300;

  &:hover {
    @apply border-red-400;
  }

  &:focus-within {
    @apply border-red-500 ring-red-100;
  }
}

.disabled {
  @apply bg-gray-100 border-none;
  @apply cursor-not-allowed;

  &:deep(.money-input) {
    @apply bg-gray-100;
    @apply text-gray-900 opacity-100;
  }
}
</style>
