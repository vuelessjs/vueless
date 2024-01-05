<template>
  <div>
    <div class="money" :class="moneyClass">
      <label v-if="!hideLabel" class="money-label" :for="`moneyInput${id}`" :class="labelClass">
        {{ label }}
      </label>

      <t-input
        :id="`moneyInput${id}`"
        ref="initialCurrency"
        class="money-input"
        :placeholder="placeholder"
        :model-value="money.initialCurrency.sum"
        :data-cy="`${dataCy}-base-currency`"
        :disabled="disabled"
        inputmode="decimal"
        @keyup="onKeyupInput"
        @blur="onBlur"
        @input="onInput"
      />

      <div v-if="isShownRightSlot" class="money-slot-wrapper">
        <slot name="right" />
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
import MoneyService, { SYMBOL_MINUS, DOUBLE_ZERO } from "vueless/service.money";
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
      type: Number,
      default: 2,
    },

    disabled: {
      type: Boolean,
      default: false,
    },

    withMinus: {
      type: Boolean,
      default: false,
    },

    i18n: {
      type: Object,
      default: () => ({}),
    },

    placeholder: {
      type: String,
      default: "",
    },

    dataCy: {
      type: String,
      default: "",
    },
  },

  emits: ["update:modelValue", "keyup", "blur", "input"],

  data() {
    return {
      cleaveMoneyInput: undefined,
      money: {
        initialCurrency: {
          symbol: "",
          sum: "",
          label: "",
        },
      },
    };
  },

  computed: {
    isShownRightSlot() {
      return !!this.$slots["right"];
    },

    moneyClass() {
      return {
        "error-input": this.error,
        disabled: this.disabled,
      };
    },

    labelClass() {
      return {
        "error-label": this.error,
      };
    },

    label() {
      const comma = this.money?.initialCurrency?.symbol ? "," : "";

      return `${this.money?.initialCurrency?.label}${comma} ${this.money?.initialCurrency?.symbol}`;
    },

    isShownMinus() {
      return this.withMinus ? SYMBOL_MINUS : "";
    },

    moneyInput() {
      return this.$el.querySelector(`#moneyInput${this.id}`);
    },
  },

  watch: {
    money: {
      handler: "onChangeMoney",
      deep: true,
    },
    modelValue: {
      handler: "onChangeValue",
      deep: true,
    },
    withMinus: "onChangeWithMinus",
  },

  created() {
    this.prefillInput();
  },

  mounted() {
    this.cleaveMoneyInput = new Cleave(this.moneyInput, {
      ...this.cleaveSettings,
      numeralDecimalScale: this.numeralDecimalScale,
      prefix: this.isShownMinus,
    });

    this.moneyInput.addEventListener("paste", (event) => this.onPaste(event));
    this.moneyInput.addEventListener("keydown", (event) => this.onKeydown(event));

    this.money.initialCurrency.sum = this.cleaveMoneyInput.getFormattedValue();
  },

  beforeUnmount() {
    this.moneyInput.removeEventListener("paste", (event) => this.onPaste(event));
    this.moneyInput.removeEventListener("keydown", (event) => this.onKeydown(event));
  },

  methods: {
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

    onChangeWithMinus() {
      this.cleaveMoneyInput = new Cleave(this.moneyInput, {
        ...this.cleaveSettings,
        numeralDecimalScale: this.numeralDecimalScale,
        prefix: this.isShownMinus,
      });

      this.money.initialCurrency.sum = this.cleaveMoneyInput.getFormattedValue();
    },

    prefillInput() {
      const separatedSum = new MoneyService().separatedMoney(
        Number(this.modelValue?.initialCurrency?.sum),
      );

      const sum =
        separatedSum.penny === DOUBLE_ZERO
          ? separatedSum.integer
          : `${separatedSum.integer}${separatedSum.delimiter}${separatedSum.penny}`;

      this.money.initialCurrency = {
        symbol: this.modelValue?.initialCurrency?.symbol || "",
        sum: Number(sum) === 0 ? "" : sum,
        placeholder: this.modelValue?.initialCurrency?.placeholder,
        label: this.modelValue?.initialCurrency?.label || this.i18n.amount,
      };
    },

    onChangeMoney() {
      if (!this.cleaveMoneyInput) return;

      let preparedMoney = {
        initialCurrency: {
          label: this.money.initialCurrency.label,
          symbol: this.money.initialCurrency.symbol,
          placeholder: this.money.initialCurrency.placeholder,
          sum: this.cleaveMoneyInput?.getRawValue(),
        },
      };

      if (this.modelValue?.convertibleCurrency) {
        preparedMoney.convertibleCurrency = {
          symbol: this.modelValue?.convertibleCurrency?.symbol || "",
          sum: this.modelValue?.convertibleCurrency?.sum || "",
          placeholder: this.modelValue?.convertibleCurrency?.placeholder || "",
          label: this.modelValue?.convertibleCurrency?.label || "",
        };
      }

      if (this.modelValue?.firstRate) {
        preparedMoney.firstRate = {
          symbol: this.modelValue?.firstRate?.symbol || "",
          sum: this.modelValue?.firstRate?.sum || "",
          placeholder: this.modelValue?.firstRate?.placeholder || "",
          label: this.modelValue?.firstRate?.label || "",
        };
      }

      if (this.modelValue?.secondRate) {
        preparedMoney.secondRate = {
          symbol: this.modelValue?.secondRate?.symbol || "",
          sum: this.modelValue?.secondRate?.sum || "",
          placeholder: this.modelValue?.secondRate?.placeholder || "",
          label: this.modelValue?.secondRate?.label || "",
        };
      }

      this.$emit("update:modelValue", preparedMoney);
    },

    onChangeValue(value) {
      if (!this.cleaveMoneyInput) return;

      const inputElement = this.$refs?.initialCurrency?.$el;

      const cursorStart = inputElement?.selectionStart;
      const cursorEnd = inputElement?.selectionEnd;

      this.cleaveMoneyInput.setRawValue(value.initialCurrency.sum);

      if (cursorEnd && cursorStart) {
        inputElement.setSelectionRange(cursorStart, cursorEnd);
      }

      this.money.initialCurrency.sum = this.cleaveMoneyInput.getFormattedValue();
      this.money.initialCurrency.symbol = value.initialCurrency.symbol;
    },

    onKeyupInput(event) {
      if (!this.cleaveMoneyInput) return;

      this.money.initialCurrency.sum = this.cleaveMoneyInput.getFormattedValue();

      this.$nextTick(() => {
        this.$emit("keyup", event);
      });
    },

    onBlur() {
      this.$nextTick(() => {
        this.$emit("blur");
      });
    },

    onInput(event) {
      this.$nextTick(() => {
        this.$emit("input", event);
      });
    },
  },
};
</script>

<style lang="postcss" scoped>
.money {
  @apply flex;
  @apply rounded-lg border border-gray-300 bg-white;
  @apply px-4 py-2.5;
  @apply transition-all duration-100;
  @apply relative;

  &:hover {
    @apply border-gray-400;
  }

  &:focus-within {
    @apply border-gray-500 ring-4 ring-gray-600 ring-opacity-15;
  }

  &-label {
    @apply absolute block;
    @apply whitespace-nowrap text-sm font-normal text-gray-500;
    @apply pb-0.5;
  }

  &-input {
    @apply text-base font-normal text-gray-900;
    @apply rounded-none border-0 shadow-none ring-0;
    @apply mt-[1.125rem] flex-auto py-0 pl-0 pr-4;

    &:focus {
      @apply ring-0;
    }
  }

  &-slot-wrapper {
    @apply flex w-full flex-1 items-center whitespace-nowrap;
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
