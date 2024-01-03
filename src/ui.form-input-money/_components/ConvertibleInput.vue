<template>
  <div>
    <div class="wrapper">
      <div class="money" :class="moneyClass">
        <div class="money-block currency-block">
          <div class="money-wrapper" :class="[disabledClass.initialCurrency, initialCurrencyClass]">
            <label
              v-if="!hideLabel"
              class="money-label"
              :for="`initialCurrency${id}`"
              :class="labelClass"
            >
              {{ label.initialCurrency }}
            </label>

            <t-input
              :id="`initialCurrency${id}`"
              ref="initialCurrency"
              class="money-input"
              :placeholder="money.initialCurrency.placeholder"
              :model-value="money.initialCurrency.sum"
              :data-cy="`${dataCy}-base-currency`"
              :disabled="disabled.initialCurrency"
              inputmode="decimal"
              @keyup="onKeyupInput('base')"
              @blur="onBlur"
            />

            <div v-if="isShownRightSlot" class="money-slot-wrapper">
              <slot name="right" />
            </div>
          </div>

          <div
            :id="`convertibleCurrencyBlock${id}`"
            class="money-wrapper convertible-block"
            :class="disabledClass.convertibleCurrency"
          >
            <label
              v-if="!hideLabel"
              class="money-label"
              :for="`convertibleCurrency${id}`"
              :class="labelClass"
            >
              {{ label.convertibleCurrency }}
            </label>

            <t-input
              :id="`convertibleCurrency${id}`"
              ref="convertibleInput"
              class="money-input"
              :placeholder="money.convertibleCurrency.placeholder"
              :model-value="money.convertibleCurrency.sum"
              :data-cy="`${dataCy}-convertible-currency`"
              :disabled="disabled.convertibleCurrency"
              inputmode="decimal"
              @keyup="onKeyupInput('convertible')"
              @blur="onBlur"
            />
          </div>
        </div>

        <div class="money-block">
          <div class="money-wrapper rate-block" :class="disabledClass.firstRate">
            <label
              v-if="!hideLabel"
              class="money-label"
              :for="`firstRate${id}`"
              :class="labelClass"
            >
              {{ label.firstRate }}
            </label>

            <t-input
              :id="`firstRate${id}`"
              v-model="money.firstRate.sum"
              class="money-input"
              :placeholder="money.firstRate.placeholder"
              :data-cy="`${dataCy}-first-rate`"
              :disabled="disabled.firstRate"
              inputmode="decimal"
              @keyup="onKeyupInput('base')"
              @blur="onBlur"
            />
          </div>
        </div>
      </div>
    </div>

    <div v-if="error" class="error-message" :data-cy="`${dataCy}-error-message`">
      {{ error }}
    </div>
  </div>
</template>

<script>
import Cleave from "cleave.js";
import MoneyService, { DOUBLE_ZERO, SYMBOL_MINUS } from "vueless/service.money";
import { getRandomId } from "vueless/service.ui";
import { mapGetters } from "vuex";
import TInput from "vueless/library.vue-tailwind-3/t-input";

const FIND_SPACE_REG_EXP = /\s/g;
const FIND_COMMA_REG_EXP = /,/;
const DECIMAL_PLACES = 4;

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

    id: {
      type: String,
      default: () => getRandomId(),
    },

    hideLabel: {
      type: Boolean,
      default: false,
    },

    baseCurrencySymbol: {
      type: String,
      default: "",
    },

    error: {
      type: String,
      default: "",
    },

    withMinus: {
      type: Boolean,
      default: false,
    },

    numeralDecimalScale: {
      type: Object,
      default: () => ({
        initialCurrency: 2,
        convertibleCurrency: 2,
        firstRate: 4,
      }),
    },

    disabled: {
      type: Object,
      default: () => ({
        initialCurrency: false,
        convertibleCurrency: false,
        firstRate: false,
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
    isPreparedCleaveElements: false,
    money: {
      initialCurrency: {
        symbol: "",
        sum: "",
        placeholder: "",
        label: "",
      },
      convertibleCurrency: {
        symbol: "",
        sum: "",
        placeholder: "",
        label: "",
      },
      firstRate: {
        symbol: "",
        sum: "",
        placeholder: "",
        label: "",
      },
    },
    minConvertibleCurrencyWidth: "",
  }),

  computed: {
    ...mapGetters("breakpoint", ["isMobileDevice"]),

    disabledClass() {
      return {
        initialCurrency: this.disabled.initialCurrency ? "disabled" : "",
        convertibleCurrency: this.disabled.convertibleCurrency ? "disabled" : "",
        firstRate: this.disabled.firstRate ? "disabled" : "",
      };
    },

    moneyClass() {
      return {
        "error-input": this.error,
      };
    },

    labelClass() {
      return {
        "error-label": this.error,
      };
    },

    label() {
      const initialCurrency = `${this.money?.initialCurrency?.label}, ${this.money?.initialCurrency?.symbol}`;
      const firstRate = `${this.money?.firstRate?.label}, ${this.money?.firstRate?.symbol}`;
      const convertibleCurrency = `${this.money?.convertibleCurrency?.label},
       ${this.money?.convertibleCurrency?.symbol}`;

      return {
        initialCurrency,
        convertibleCurrency,
        firstRate,
      };
    },

    isShownRightSlot() {
      return !!this.$slots["right"];
    },

    initialCurrencyClass() {
      return this.isShownRightSlot ? "money-with-slot" : "";
    },

    isShownMinus() {
      return this.withMinus ? SYMBOL_MINUS : "";
    },

    convertibleCurrency() {
      return this.$el.querySelector(`#convertibleCurrency${this.id}`);
    },

    firstRate() {
      return this.$el.querySelector(`#firstRate${this.id}`);
    },

    convertibleCurrencyBlock() {
      return this.$el.querySelector(`#convertibleCurrencyBlock${this.id}`);
    },
  },

  watch: {
    money: {
      handler: "onChangeMoney",
      deep: true,
    },
    modelValue: {
      handler: "onChangeModelValue",
      deep: true,
    },

    isPreparedCleaveElements: "onChangeCalculateBaseCurrency",
    "money.initialCurrency.symbol": "onChangeCalculateBaseCurrency",
    "money.convertibleCurrency.symbol": "onChangeCalculateBaseCurrency",
    "money.convertibleCurrency.sum": "onChangeConvertibleCurrencySum",
    withMinus: "onChangeWithMinus",
  },

  created() {
    this.prefillInput();
  },

  mounted() {
    this.cleaveInitialCurrency = new Cleave(this.getInitialCurrencyElement(), {
      ...this.cleaveSettings,
      numeralDecimalScale: this.numeralDecimalScale.initialCurrency,
      prefix: this.isShownMinus,
    });

    this.cleaveConvertibleCurrency = new Cleave(this.convertibleCurrency, {
      ...this.cleaveSettings,
      numeralDecimalScale: this.numeralDecimalScale.convertibleCurrency,
      prefix: this.isShownMinus,
    });

    this.cleaveFirstRate = new Cleave(this.firstRate, {
      ...this.cleaveSettings,
      numeralPositiveOnly: true,
      numeralDecimalScale: this.numeralDecimalScale.firstRate,
    });

    this.addEventListeners(this.getInitialCurrencyElement());
    this.addEventListeners(this.convertibleCurrency);
    this.addEventListeners(this.firstRate);

    this.money.initialCurrency.sum = this.cleaveInitialCurrency.getFormattedValue();
    this.money.convertibleCurrency.sum = this.cleaveConvertibleCurrency.getFormattedValue();
    this.money.firstRate.sum = this.cleaveFirstRate.getFormattedValue();

    this.isPreparedCleaveElements = true;
  },

  beforeUnmount() {
    this.removeEventListeners(this.getInitialCurrencyElement());
    this.removeEventListeners(this.convertibleCurrency);
    this.removeEventListeners(this.firstRate);
  },

  methods: {
    getInitialCurrencyElement() {
      return this.$el.querySelector(`#initialCurrency${this.id}`);
    },

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

    onChangeWithMinus() {
      this.cleaveInitialCurrency = new Cleave(this.getInitialCurrencyElement(), {
        ...this.cleaveSettings,
        numeralDecimalScale: this.numeralDecimalScale.initialCurrency,
        prefix: this.isShownMinus,
      });

      this.cleaveConvertibleCurrency = new Cleave(this.convertibleCurrency, {
        ...this.cleaveSettings,
        numeralDecimalScale: this.numeralDecimalScale.convertibleCurrency,
        prefix: this.isShownMinus,
      });

      this.money.initialCurrency.sum = this.cleaveInitialCurrency.getFormattedValue();
      this.money.convertibleCurrency.sum = this.cleaveConvertibleCurrency.getFormattedValue();
    },

    onChangeCalculateBaseCurrency() {
      this.calculateCurrency("base");

      this.calculateConvertibleInputWidth();
    },

    onChangeConvertibleCurrencySum() {
      this.calculateConvertibleInputWidth();
    },

    onBlur() {
      if (!this.cleaveInitialCurrency || !this.cleaveConvertibleCurrency) return;

      const firstRate = this.money.firstRate.sum;
      const initialCurrency = this.cleaveInitialCurrency?.getRawValue();

      if (Number(firstRate) === 0 && firstRate !== "") {
        this.money.firstRate.sum = "";
        let convertibleCurrency;

        if (this.baseCurrencySymbol === this.money.initialCurrency.symbol) {
          convertibleCurrency = this.prepareSum(
            initialCurrency / Number(this.modelValue.firstRate?.placeholder),
          );
        } else {
          convertibleCurrency = this.prepareSum(
            initialCurrency * Number(this.modelValue.firstRate?.placeholder),
          );
        }

        this.cleaveConvertibleCurrency.setRawValue(convertibleCurrency || "");
        this.money.convertibleCurrency.sum = this.cleaveConvertibleCurrency.getFormattedValue();
      }
    },

    prefillInput() {
      let preparedInitialCurrency = "";
      let preparedConvertibleCurrency = "";
      let preparedFirstRate = "";

      if (this.modelValue?.initialCurrency?.sum) {
        preparedInitialCurrency = this.prepareSum(this.modelValue?.initialCurrency?.sum);
      }

      if (this.modelValue?.convertibleCurrency?.sum) {
        preparedConvertibleCurrency = this.prepareSum(this.modelValue?.convertibleCurrency?.sum);
      }

      if (this.modelValue?.firstRate?.sum) {
        preparedFirstRate = this.prepareSum(this.modelValue?.firstRate?.sum, DECIMAL_PLACES);
      }

      this.money.initialCurrency = {
        symbol: this.modelValue?.initialCurrency?.symbol || "",
        sum: preparedInitialCurrency,
        placeholder: this.modelValue?.initialCurrency?.placeholder,
        label: this.modelValue?.initialCurrency?.label || this.i18n.amount,
      };

      this.money.convertibleCurrency = {
        symbol: this.modelValue?.convertibleCurrency?.symbol || "",
        sum: preparedConvertibleCurrency,
        placeholder: this.modelValue?.convertibleCurrency?.placeholder,
        label: this.modelValue?.convertibleCurrency?.label || this.i18n.amount,
      };

      this.money.firstRate = {
        symbol: this.modelValue?.firstRate?.symbol || "",
        sum: preparedFirstRate,
        placeholder: this.prepareSum(this.modelValue?.firstRate?.placeholder, DECIMAL_PLACES),
        label: this.modelValue?.firstRate?.label || this.i18n.rate,
      };
    },

    onChangeMoney() {
      if (!this.cleaveInitialCurrency || !this.cleaveConvertibleCurrency) return;

      let newMoney = {};

      let preparedInitialCurrency = this.money.initialCurrency.sum.replace(FIND_SPACE_REG_EXP, "");

      preparedInitialCurrency = preparedInitialCurrency.replace(FIND_COMMA_REG_EXP, ".");

      newMoney.initialCurrency = {
        sum: this.cleaveInitialCurrency?.getRawValue() || preparedInitialCurrency,
        symbol: this.money.initialCurrency.symbol,
      };

      newMoney.convertibleCurrency = {
        sum: this.cleaveConvertibleCurrency?.getRawValue(),
        symbol: this.money.convertibleCurrency.symbol,
      };

      this.cleaveFirstRate.setRawValue(this.money.firstRate.sum);

      newMoney.firstRate = {
        sum: this.cleaveFirstRate?.getRawValue(),
        symbol: this.money.firstRate.symbol,
        placeholder: this.modelValue.firstRate?.placeholder,
      };

      this.$emit("update:modelValue", newMoney);
    },

    onChangeModelValue(value) {
      if (!this.cleaveInitialCurrency || !this.cleaveConvertibleCurrency) return;

      if (value.initialCurrency.symbol !== this.money.initialCurrency.symbol) {
        this.money.initialCurrency.symbol = value.initialCurrency?.symbol;
      }

      if (value.convertibleCurrency.symbol !== this.money.convertibleCurrency.symbol) {
        this.money.convertibleCurrency.symbol = value.convertibleCurrency?.symbol;
      }

      if (value.firstRate.symbol !== this.money.firstRate.symbol) {
        const firstRateSum = this.prepareSum(value?.firstRate?.sum, DECIMAL_PLACES);

        this.money.firstRate.sum = Number(firstRateSum) === 0 ? "" : firstRateSum;
        this.money.firstRate.symbol = value.firstRate?.symbol;
        this.money.firstRate.placeholder = this.prepareSum(
          value?.firstRate?.placeholder,
          DECIMAL_PLACES,
        );
      }
    },

    prepareSum(sum, decimalPlaces) {
      const separatedSum = new MoneyService().separatedMoney(Number(sum), decimalPlaces);

      return separatedSum.penny === DOUBLE_ZERO
        ? separatedSum.integer
        : `${separatedSum.integer}${separatedSum.delimiter}${separatedSum.penny}`;
    },

    onKeyupInput(currencyType) {
      if (!this.cleaveInitialCurrency || !this.cleaveConvertibleCurrency) return;

      this.calculateCurrency(currencyType);

      this.money.initialCurrency.sum = this.cleaveInitialCurrency.getFormattedValue();
      this.money.convertibleCurrency.sum = this.cleaveConvertibleCurrency.getFormattedValue();
      this.money.firstRate.sum = this.cleaveFirstRate.getFormattedValue();
    },

    calculateConvertibleInputWidth() {
      if (!this.cleaveInitialCurrency || !this.cleaveConvertibleCurrency) return;

      if (this.isMobileDevice || !this.cleaveConvertibleCurrency) {
        return;
      }

      if (!this.minConvertibleCurrencyWidth) {
        this.minConvertibleCurrencyWidth = this.convertibleCurrencyBlock.clientWidth;
      }

      const length = this.cleaveConvertibleCurrency.element.value.length;
      const minWidth = this.minConvertibleCurrencyWidth;
      const maxWidth = this.$el.querySelector(".money").offsetWidth;
      const initialCurrencyWidth = this.getInitialCurrencyElement().offsetWidth;

      const maxConvertibleCurrencyWidth = maxWidth - initialCurrencyWidth;
      const oneSymbolPixelCount = 12;

      let width = length * oneSymbolPixelCount;

      if (minWidth > width) {
        width = minWidth;
      }

      if (width >= maxConvertibleCurrencyWidth) {
        return (this.convertibleCurrencyBlock.style.width = `${maxConvertibleCurrencyWidth}px`);
      }

      this.convertibleCurrencyBlock.style.width = `${width}px`;

      const currentWidth = this.convertibleCurrencyBlock.offsetWidth;

      if (minWidth >= currentWidth) {
        this.convertibleCurrencyBlock.style.width = `${minWidth}px`;
      }
    },

    calculateCurrency(currencyType) {
      if (!this.cleaveInitialCurrency || !this.cleaveConvertibleCurrency) return;

      let initialCurrency = this.cleaveInitialCurrency?.getRawValue();
      let convertibleCurrency = this.cleaveConvertibleCurrency?.getRawValue();
      let firstRate = Number(this.cleaveFirstRate?.getRawValue());

      let firstRatePlaceholder = this.money.firstRate.placeholder.replace(FIND_SPACE_REG_EXP, "");

      firstRatePlaceholder = firstRatePlaceholder.replace(FIND_COMMA_REG_EXP, ".");

      if (currencyType === "base") {
        let convertibleCurrency;

        if (!initialCurrency) {
          return this.cleaveConvertibleCurrency.setRawValue("");
        }

        if (this.baseCurrencySymbol === this.money.initialCurrency.symbol) {
          convertibleCurrency = initialCurrency / (firstRate || firstRatePlaceholder);
        } else {
          convertibleCurrency = initialCurrency * (firstRate || firstRatePlaceholder);
        }

        this.cleaveConvertibleCurrency.setRawValue(this.prepareSum(convertibleCurrency));
        this.money.convertibleCurrency.sum = this.cleaveConvertibleCurrency.getFormattedValue();
      }

      if (currencyType === "convertible") {
        let initialCurrency;

        if (!convertibleCurrency) {
          return this.cleaveInitialCurrency.setRawValue(initialCurrency);
        }

        if (this.baseCurrencySymbol === this.money.initialCurrency.symbol) {
          initialCurrency = convertibleCurrency * (firstRate || firstRatePlaceholder);
        } else {
          initialCurrency = convertibleCurrency / (firstRate || firstRatePlaceholder);
        }

        this.cleaveInitialCurrency.setRawValue(this.prepareSum(initialCurrency));
        this.money.initialCurrency.sum = this.cleaveInitialCurrency.getFormattedValue();

        this.calculateConvertibleInputWidth();
      }
    },
  },
};
</script>

<style lang="postcss" scoped>
.wrapper {
  @apply flex;
}

.money {
  @apply flex w-full flex-col md:flex-row;
  @apply rounded-lg border border-gray-300 bg-white;
  @apply transition-all duration-100;
  @apply overflow-hidden;

  &:hover {
    @apply border-gray-400;
  }

  &:focus-within {
    @apply border-gray-500 ring-4 ring-gray-600 ring-opacity-15;
  }

  &-block {
    @apply flex;

    &:first-child {
      @apply border-b border-dashed border-gray-300 md:border-b-0;
    }
  }

  &-wrapper {
    @apply px-4 py-2.5;
    @apply relative;
    @apply w-full md:w-auto;

    &:first-child {
      @apply flex-auto;
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

    &::placeholder {
      @apply font-normal text-gray-400;
    }

    &:focus {
      @apply ring-0;
    }
  }
}

.separated-money {
  &-wrapper {
    @apply rounded-lg border border-gray-300 bg-white;
    @apply mr-6 px-4 pb-2.5 pt-2;
    @apply w-2/4;
    @apply transition-all duration-100;

    &:hover {
      @apply border-gray-400;
    }

    &:focus-within {
      @apply border-gray-500 ring-4 ring-gray-300;
    }
  }

  &-input {
    @apply text-base font-normal text-gray-900;
    @apply rounded-none border-0 shadow-none ring-0;
    @apply p-0;

    &::placeholder {
      @apply font-normal text-gray-400;
    }

    &:focus {
      @apply ring-0;
    }
  }

  &-label {
    @apply block;
    @apply whitespace-nowrap text-sm font-normal text-gray-500;
    @apply pb-0.5;
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

.rate-block {
  @apply w-full md:w-[5.75rem];
}

.convertible-block {
  @apply w-full pr-4 md:w-24;

  &::before {
    content: "";
    @apply absolute -left-px top-2;
    @apply bg-gray-300;
    @apply h-[2.625rem] w-px;
  }

  &::after {
    content: "";
    @apply absolute right-0 top-2;
    @apply bg-gray-300;
    @apply h-0 w-0 md:h-[2.625rem] md:w-px;
  }
}

.currency-block {
  @apply flex-auto overflow-hidden;
}

.disabled {
  @apply bg-gray-100 border-none;
  @apply cursor-not-allowed;

  &:deep(.money-input, .separated-money-input) {
    @apply bg-gray-100;
    @apply text-gray-900 opacity-100;

    &:focus {
      @apply ring-0;
    }
  }
}

.money-with-slot {
  @apply flex;

  .money-label {
    @apply absolute;
  }

  .money-input {
    @apply mt-[1.125rem] flex-auto pr-4;
  }

  .money-slot-wrapper {
    @apply flex w-full flex-1 items-center whitespace-nowrap;
  }
}
</style>
