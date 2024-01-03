<template>
  <div class="mono-money-input">
    <SingleInput
      v-if="isShownInput.single"
      ref="input"
      v-model="form"
      :hide-label="hideLabel"
      :cleave-settings="cleaveSettings"
      :error="error"
      :numeral-decimal-scale="numeralDecimalScale.initialCurrency"
      :disabled="disabled.initialCurrency"
      :with-minus="withMinus"
      :i18n="i18n"
      :placeholder="placeholder"
      :data-cy="dataCy"
      @keyup="onKeyupInput"
      @blur="onBlur"
      @input="onInput"
    >
      <template #right>
        <!-- @slot Use it to add right slot. -->
        <slot name="right" />
      </template>
    </SingleInput>

    <RangeInput
      v-if="isShownInput.range"
      v-model="form"
      :hide-label="hideLabel"
      :cleave-settings="cleaveSettings"
      :error="error"
      :numeral-decimal-scale="numeralDecimalScale"
      :disabled="disabled"
      :i18n="i18n"
      :data-cy="dataCy"
    />

    <ConvertibleInput
      v-if="isShownInput.convertible"
      ref="input"
      v-model="form"
      :hide-label="hideLabel"
      :cleave-settings="cleaveSettings"
      :error="error"
      :base-currency-symbol="baseCurrencySymbol"
      :numeral-decimal-scale="numeralDecimalScale"
      :disabled="disabled"
      :with-minus="withMinus"
      :i18n="i18n"
      :data-cy="dataCy"
    >
      <template #right>
        <!-- @slot Use it to add right slot. -->
        <slot name="right" />
      </template>
    </ConvertibleInput>
  </div>
</template>

<script>
import I18nServiceDefault from "vueless/service.i18n";

import SingleInput from "./_components/SingleInput.vue";
import RangeInput from "./_components/RangeInput.vue";
import ConvertibleInput from "./_components/ConvertibleInput.vue";

const SINGLE = "single";
const RANGE = "range";
const CONVERTIBLE = "convertible";

export default {
  name: "UInputMoney",

  components: {
    ConvertibleInput,
    RangeInput,
    SingleInput,
  },

  props: {
    /**
     * Set input money value.
     */
    modelValue: {
      type: Object,
      default: () => ({}),
    },

    /**
     * Set component type.
     * @values single, range, convertible
     */
    type: {
      type: String,
      default: SINGLE,
    },

    /**
     * Set base currency symbol for CONVERTIBLE type (For example, "₴". It's possible to use the symbol of any currency).
     */
    baseCurrencySymbol: {
      type: String,
      default: "",
    },

    /**
     * Hide / show label.
     */
    hideLabel: {
      type: Boolean,
      default: false,
    },

    /**
     * Set error text.
     */
    error: {
      type: String,
      default: "",
    },

    /**
     * Allows only positive values.
     */
    positiveOnly: {
      type: Boolean,
      default: false,
    },

    /**
     * Show / hide minus sign.
     */
    withMinus: {
      type: Boolean,
      default: false,
    },

    /**
     * Set the numeral decimal scale after the comma.
     */
    numeralDecimalScale: {
      type: Object,
      default: () => ({
        initialCurrency: 2,
        convertibleCurrency: 2,
        firstRate: 4,
        secondRate: 4,
        startRange: 2,
        endRange: 2,
      }),
    },

    /**
     * Set disabled options for component types.
     */
    disabled: {
      type: Object,
      default: () => ({
        initialCurrency: false,
        convertibleCurrency: false,
        firstRate: false,
        secondRate: false,
        startRange: false,
        endRange: false,
      }),
    },
    /**
     * Set placeholder text.
     */
    placeholder: {
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

  emits: ["update:modelValue", "keyup", "blur", "input"],

  setup() {
    const { getTranslation } = new I18nServiceDefault();

    return { getTranslation };
  },

  data: () => ({
    cleaveSettings: {
      numeral: true,
      numeralThousandsGroupStyle: "thousand",
      delimiter: " ",
      numeralDecimalMark: ",",
      numeralPositiveOnly: false,
      rawValueTrimPrefix: true,
    },
  }),

  computed: {
    i18n() {
      return {
        rate: this.getTranslation("rate"),
        amount: this.getTranslation("amount"),
      };
    },

    isShownInput() {
      return {
        single: this.type === SINGLE,
        range: this.type === RANGE,
        convertible: this.type === CONVERTIBLE,
      };
    },

    form: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit("update:modelValue", value);
      },
    },
  },

  created() {
    this.cleaveSettings.numeralPositiveOnly = this.positiveOnly;
    this.form = this.modelValue;
  },

  methods: {
    onKeyupInput(event) {
      this.$emit("keyup", event);
    },

    onBlur() {
      this.$emit("blur");
    },

    onInput(event) {
      this.$emit("input", event);
    },
  },
};
</script>

<i18n>
en:
  rate: "Rate"
  amount: "Amount"
ru:
  rate: "Курс"
  amount: "Сумма"
ua:
  rate: "Курс"
  amount: "Сума"
</i18n>
