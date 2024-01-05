<template>
  <div class="mono-input-wrapper">
    <label :for="id" :class="inputBlockClass" class="mono-input-block">
      <t-input
        :id="id"
        ref="input"
        class="mono-input"
        :model-value="modelValue"
        :placeholder="placeholder"
        :type="inputType"
        :class="inputClass"
        :readonly="readonly"
        :disabled="disabled"
        :maxlength="maxLength"
        :inputmode="inputMode"
        :data-cy="dataCy"
        @focus="onFocus"
        @blur="onBlur"
        @update:modelValue="onInput"
        @change="onChange"
        @mousedown="onMousedown"
        @click="onClick"
      />

      <label v-if="isTypePassword" class="icon-label" :for="id">
        <UIcon
          color="gray"
          class="icon-label-password"
          :name="isShownPassword ? 'visibility' : 'visibility_off'"
          :data-cy="`${dataCy}-show-password`"
          @click="onClickShowPassword"
        />
      </label>

      <label v-if="isShownSlot.icon" class="icon-label" :for="id">
        <!-- @slot Use it to add icon after text. -->
        <slot name="icon" />
      </label>

      <span v-else-if="isShownSlot.rightSlot" class="mono-input-right-slot">
        <!-- @slot Use it to add some component after text. -->

        <slot name="right" />
      </span>
    </label>

    <label class="label" :class="labelClass" :for="id">
      {{ label }}
    </label>

    <p v-if="error" class="error-message" :data-cy="`${dataCy}-error-message`">
      {{ error }}
    </p>

    <p v-if="description && !error" class="description">
      {{ description }}
    </p>
  </div>
</template>

<script>
import { getRandomId } from "vueless/service.ui";
import ValidationServiceDefault from "vueless/service.validation";

import UIcon from "vueless/ui.image-icon";
import TInput from "vueless/library.vue-tailwind-3/t-input";

const {
  NUMBER_REG_EXP,
  INTEGER_REG_EXP,
  LETTERS_REG_EXP,
  LETTERS_AND_SYMBOLS_REG_EXP,
  LETTERS_AND_NUMBERS_REG_EXP,
} = new ValidationServiceDefault();

const VALIDATION_RULES = {
  integer: INTEGER_REG_EXP,
  number: NUMBER_REG_EXP,
  string: LETTERS_REG_EXP,
  stringAndNumber: LETTERS_AND_NUMBERS_REG_EXP,
  symbol: LETTERS_AND_SYMBOLS_REG_EXP,
};

export default {
  name: "UInput",

  components: {
    UIcon,
    TInput,
  },

  props: {
    /**
     * Set input size.
     * @values sm, md, lg
     */
    size: {
      type: String,
      default: "md",
    },

    /**
     * Set input value.
     */
    modelValue: {
      type: [String, Number],
      default: "",
    },

    /**
     * Set input placeholder.
     */
    placeholder: {
      type: String,
      default: "",
    },

    /**
     * Set input label.
     */
    label: {
      type: String,
      default: "",
    },

    /**
     * Set description for input.
     */
    description: {
      type: String,
      default: "",
    },

    /**
     * Set the maximum length of the input value.
     */
    maxLength: {
      type: [String, Number],
      default: "",
    },

    /**
     * Make input read only.
     */
    readonly: {
      type: Boolean,
      default: false,
    },

    /**
     * Make input inactive.
     */
    disabled: {
      type: Boolean,
      default: false,
    },

    /**
     * Set input type.
     * @values text, number, email, tel, password, url
     */
    type: {
      type: String,
      default: "text",
      validator: (value) => !Object.keys(VALIDATION_RULES).includes(value),
    },

    /**
     * Set input mode.
     * @values none, text, decimal, numeric, tel, email, url
     */
    inputMode: {
      type: String,
      default: "text",
    },

    /**
     * Disable browsers autocomplete.
     */
    noAutocomplete: {
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
     * Prevents inputting some characters (for ex. input numbers only).
     * You can use predefined values or your own RegExp.
     * @values symbol, string, stringAndNumber, number, integer
     */
    validationRule: {
      type: [String, RegExp],
      default: "",
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

  emits: ["update:modelValue", "change", "click", "focus", "mousedown", "blur", "input"],

  data: () => ({
    isShownPassword: false,
  }),

  computed: {
    inputClass() {
      return {
        "size-sm": this.size === "sm",
        "size-md": this.size === "md",
        "size-lg": this.size === "lg",
        "mono-input-with-icon-padding": this.isShownSlot.icon,
        "mono-input-password-emulation":
          this.isTypePassword && !this.isShownPassword && this.modelValue,
        "error-input": this.error,
      };
    },

    inputBlockClass() {
      return {
        disabled: this.disabled,
        "error-input": this.error,
      };
    },

    isShownSlot() {
      return {
        icon: !!this.$slots["icon"],
        rightSlot: !!this.$slots["right"],
      };
    },

    labelClass() {
      return {
        "error-label": this.error,
        "size-label-sm": this.size === "sm",
        "size-label-md": this.size === "md",
        "size-label-lg": this.size === "lg",
      };
    },

    isTypePassword() {
      return this.type === "password";
    },

    inputType() {
      return this.isShownPassword || this.noAutocomplete ? "text" : this.type;
    },
  },

  mounted() {
    this.toggleReadonlyToPreventAutocomplete(true);
  },

  methods: {
    onInput(value) {
      if (this.validationRule) {
        const input = document.querySelector(`#${this.id}`);

        if (VALIDATION_RULES[this.validationRule]) {
          value = this.transformValue(value, VALIDATION_RULES[this.validationRule]);
        } else {
          value = this.transformValue(value, this.validationRule);
        }

        input.value = value;
      }

      this.$emit("update:modelValue", value);
      this.$emit("input", value);
    },

    onChange() {
      this.$emit("change");
    },

    onClick(event) {
      this.toggleReadonlyToPreventAutocomplete(false);

      this.$emit("click", event);
    },

    onFocus() {
      this.toggleReadonlyToPreventAutocomplete(false);

      this.$emit("focus");
    },

    onBlur() {
      this.toggleReadonlyToPreventAutocomplete(true);

      this.$emit("blur");
    },

    onMousedown() {
      this.toggleReadonlyToPreventAutocomplete(false);

      this.$emit("mousedown");
    },

    onClickShowPassword() {
      this.isShownPassword = !this.isShownPassword;
    },

    /**
     * This trick prevents default browser autocomplete behaviour.
     * @param toggleState { boolean }
     */
    toggleReadonlyToPreventAutocomplete(toggleState) {
      if (this.noAutocomplete && !this.readonly) {
        const input = document.getElementById(this.id);

        toggleState
          ? input.setAttribute("readonly", "readonly")
          : input.removeAttribute("readonly");
      }
    },

    transformValue(value, exp) {
      const regExp = new RegExp(exp, "ig");
      const matches = String(value).match(regExp);

      return matches ? matches.join("") : "";
    },
  },
};
</script>

<style lang="postcss" scoped>
@font-face {
  font-family: text-security-disc;
  src: url("./text-security-disc.woff");
}

.mono-input {
  @apply font-normal text-gray-900;
  @apply rounded-lg border-none bg-white shadow-none;
  @apply w-full px-4;

  &-wrapper {
    @apply relative w-full;
  }

  &:focus {
    @apply ring-0;
  }

  &:read-only {
    @apply border-gray-300 ring-0;
  }

  &::placeholder {
    @apply font-normal text-gray-400;
  }

  &:disabled {
    @apply text-gray-900;
    @apply border-gray-100 bg-gray-100 opacity-100;
    @apply cursor-default;
  }

  /* this trick replace characters to dots same as in input type="password" */
  &-password-emulation {
    @apply pr-11 leading-5 tracking-widest;
    font-family: text-security-disc, serif;
    -webkit-text-security: disc;
  }

  &-block {
    @apply relative flex;
    @apply rounded-lg border border-solid border-gray-300 bg-white !opacity-100;

    &:hover {
      @apply border-gray-400;
    }

    &:focus-within {
      @apply border-gray-500 ring-4 ring-gray-600 ring-opacity-15;
    }
  }

  &-right-slot {
    @apply block;
    @apply flex w-full items-center justify-end;
    @apply whitespace-nowrap pr-4;
  }

  &-with-icon-padding {
    @apply pr-11;
  }
}

.label {
  @apply absolute font-normal text-gray-500;
}

.description {
  @apply text-xs font-normal text-gray-500/[85];
  @apply pl-4 pt-2;
}

.disabled {
  @apply text-gray-900;
  @apply border-gray-100 bg-gray-100 opacity-100;
  @apply cursor-default;

  &:hover {
    @apply border-gray-100;
  }
}

.error {
  &-message {
    @apply text-xs font-normal text-red-500;
    @apply mt-2 pl-4;
  }

  &-label {
    @apply text-red-500;
  }

  &-input {
    @apply border-red-300;

    &:hover {
      @apply border-red-400;
    }

    &:focus {
      @apply border-red-500 ring-red-100;
    }

    &:focus-within {
      @apply border-red-500 ring-red-100;
    }
  }
}

.icon {
  &-label {
    @apply flex items-center justify-center;
    @apply h-full w-11;
    @apply absolute right-0;

    &-password {
      @apply cursor-pointer;

      &:hover {
        :deep(g [fill]) {
          @apply transition duration-100 ease-in-out;
          @apply text-gray-500;
        }
      }
    }
  }
}

.size {
  &-sm {
    @apply text-sm;
    @apply pb-2 pt-6;

    &::placeholder {
      @apply text-sm font-normal;
    }
  }

  &-md {
    @apply text-base;
    @apply pb-2.5 pt-7;

    &::placeholder {
      @apply text-base font-normal;
    }
  }

  &-lg {
    @apply text-lg;
    @apply pb-3 pt-8;

    &::placeholder {
      @apply text-lg font-normal;
    }
  }

  &-label {
    &-sm {
      @apply text-xs;
      @apply left-4 top-2;
    }

    &-md {
      @apply text-sm;
      @apply left-4 top-2.5;
    }

    &-lg {
      @apply text-base;
      @apply left-4 top-3;
    }
  }
}
</style>
