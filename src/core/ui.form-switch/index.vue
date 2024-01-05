<template>
  <div class="mono-switch-wrapper">
    <div class="mono-switch" :class="switchClasses" :data-cy="dataCy" @click="onClickChangeSwitch">
      <div class="mono-switch-block" :class="switchBlockClasses">
        <input
          v-model="checkedValue"
          class="mono-switch-input"
          type="checkbox"
          :disabled="disabled"
          @focus="onFocus"
          @blur="onBlur"
        />
        <div class="mono-switch-circle" :class="circleClass">
          <UIcon
            v-if="withIcon"
            :name="checkedValue ? 'check' : 'close'"
            :color="iconColor"
            :size="iconSize"
          />
        </div>
      </div>
      <div v-if="!checkLabelVariant('hidden')" class="mono-switch-title" :class="labelClasses">
        {{ switchLabel }}
      </div>
    </div>

    <div class="mono-switch-info">
      <slot name="label">
        <div v-if="label" class="mono-switch-info-label" :class="labelSizeClass">{{ label }}</div>
      </slot>

      <div v-if="description" class="mono-switch-info-description">{{ description }}</div>
    </div>
  </div>
</template>

<script>
import I18nServiceDefault from "vueless/service.i18n";

import UIcon from "vueless/ui.image-icon";

const LABEL_VARIANT = {
  hidden: "hidden",
  inside: "inside",
  left: "left",
};

export default {
  name: "USwitch",

  components: {
    UIcon,
  },

  props: {
    /**
     * Set switch value.
     */
    modelValue: {
      type: Boolean,
      default: false,
    },

    /**
     * Set label.
     */
    label: {
      type: String,
      default: "",
    },

    /**
     * The label variant of the switch.
     * @values hidden, inside, left, right
     */
    labelVariant: {
      type: String,
      default: "hidden",
    },

    /**
     * Set description.
     */
    description: {
      type: String,
      default: "",
    },

    /**
     * The size of the switch.
     * @values sm, md, lg
     */
    size: {
      type: String,
      default: "md",
    },

    /**
     * The color of the switch.
     * @values gray, red, orange, yellow, green, blue, violet, fuchsia
     */
    color: {
      type: String,
      default: "",
    },

    /**
     * Show on / off icon inside circle.
     */
    withIcon: {
      type: Boolean,
      default: false,
    },

    /**
     * Show on / off icon inside circle.
     */
    disabled: {
      type: Boolean,
      default: false,
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

  setup() {
    const { getTranslation } = new I18nServiceDefault();

    return { getTranslation };
  },

  data() {
    return {
      focus: false,
    };
  },

  computed: {
    i18n() {
      return {
        active: this.getTranslation("active"),
        inactive: this.getTranslation("inactive"),
      };
    },

    checkedValue: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit("update:modelValue", value);
      },
    },

    switchLabel() {
      return this.checkedValue ? this.i18n.active : this.i18n.inactive;
    },

    isLabelInside() {
      return (
        this.checkLabelVariant(LABEL_VARIANT.inside) && this.checkLabelVariant(LABEL_VARIANT.hidden)
      );
    },

    labelPositionClass() {
      return this.checkLabelVariant(LABEL_VARIANT.left) && !this.isLabelInside
        ? "mono-switch-left"
        : "mono-switch-right";
    },

    switchClasses() {
      const size = `size-${this.size}`;
      const position = this.labelPositionClass;

      const width =
        this.checkLabelVariant(LABEL_VARIANT.hidden) || this.checkLabelVariant(LABEL_VARIANT.inside)
          ? "width-content"
          : "";

      const state = this.checkedValue ? "mono-switch-on" : "mono-switch-off";
      const disabled = this.disabled ? "mono-switch-disabled" : "";

      return [size, position, width, state, disabled];
    },

    switchBlockClasses() {
      const label = this.checkLabelVariant(LABEL_VARIANT.inside) ? "label-inside" : "";
      const focus = this.focus ? "focus" : "";

      return [label, focus, this.color];
    },

    labelSizeClass() {
      return `size-${this.size}`;
    },

    circleClass() {
      const margin = {
        "circle-ml-sm": this.size === "sm",
        "circle-ml-md": this.size === "md",
        "circle-ml-lg": this.size === "lg",
      };

      return this.checkedValue ? margin : "";
    },

    iconSize() {
      const sizes = {
        sm: "2xs",
        md: "xs",
        lg: "sm",
      };

      return sizes[this.size];
    },

    iconColor() {
      return this.checkedValue ? this.color : "gray";
    },

    labelBackgroundClass() {
      let background = "";

      if (!this.checkLabelVariant(LABEL_VARIANT.inside)) {
        background = this.checkedValue ? this.color : "bg-gray";
      }

      return background;
    },

    labelClasses() {
      const variant = this.labelBackgroundClass;

      const labelPosition = this.checkLabelVariant(LABEL_VARIANT.inside)
        ? "label-inside"
        : "mono-switch-title-outside";

      return [labelPosition, variant];
    },
  },

  methods: {
    onFocus() {
      this.focus = true;
    },

    onBlur() {
      this.focus = false;
    },

    checkLabelVariant(variant) {
      return variant === this.labelVariant;
    },

    onClickChangeSwitch() {
      if (this.disabled) return;

      this.checkedValue = !this.checkedValue;
    },
  },
};
</script>

<i18n>
en:
  inactive: "Off"
  active: "On"
ru:
  inactive: "Выкл"
  active: "Вкл"
ua:
  inactive: "Викл"
  active: "Вкл"
</i18n>

<style lang="postcss" scoped>
.gray {
  @apply bg-gray-500;

  &.focus {
    @apply border-gray-800 ring-gray-800;
  }

  &:hover {
    @apply bg-gray-600;
  }

  &:active {
    @apply bg-gray-700;
  }
}

.red {
  @apply bg-red-500;

  &.focus {
    @apply border-red-700 ring-red-700;
  }

  &:hover {
    @apply bg-red-600;
  }

  &:active {
    @apply bg-red-700;
  }
}

.orange {
  @apply bg-orange-500;

  &.focus {
    @apply border-orange-700 ring-orange-700;
  }

  &:hover {
    @apply bg-orange-600;
  }

  &:active {
    @apply bg-orange-700;
  }
}

.yellow {
  @apply bg-yellow-500;

  &.focus {
    @apply border-yellow-700 ring-yellow-700;
  }

  &:hover {
    @apply bg-yellow-600;
  }

  &:active {
    @apply bg-yellow-700;
  }
}

.green {
  @apply bg-green-500;

  &.focus {
    @apply border-green-700 ring-green-700;
  }

  &:hover {
    @apply bg-green-600;
  }

  &:active {
    @apply bg-green-700;
  }
}

.blue {
  @apply bg-blue-500;

  &.focus {
    @apply border-blue-700 ring-blue-700;
  }

  &:hover {
    @apply bg-blue-600;
  }

  &:active {
    @apply bg-blue-700;
  }
}

.violet {
  @apply bg-violet-500;

  &.focus {
    @apply border-violet-700 ring-violet-700;
  }

  &:hover {
    @apply bg-violet-600;
  }

  &:active {
    @apply bg-violet-700;
  }
}

.fuchsia {
  @apply bg-fuchsia-500;

  &.focus {
    @apply border-fuchsia-700 ring-fuchsia-700;
  }

  &:hover {
    @apply bg-fuchsia-600;
  }

  &:active {
    @apply bg-fuchsia-700;
  }
}

.mono-switch-disabled {
  .gray {
    &:hover,
    &:active {
      @apply bg-gray-500;
    }
  }

  .red {
    &:hover,
    &:active {
      @apply bg-red-500;
    }
  }

  .orange {
    &:hover,
    &:active {
      @apply bg-orange-500;
    }
  }

  .yellow {
    &:hover,
    &:active {
      @apply bg-yellow-500;
    }
  }

  .green {
    &:hover,
    &:active {
      @apply bg-green-500;
    }
  }

  .blue {
    &:hover,
    &:active {
      @apply bg-blue-500;
    }
  }

  .violet {
    &:hover,
    &:active {
      @apply bg-violet-500;
    }
  }

  .fuchsia {
    &:hover,
    &:active {
      @apply bg-fuchsia-500;
    }
  }
}

.circle-ml-sm {
  margin-left: calc(100% - 1.25rem);
}

.circle-ml-md {
  margin-left: calc(100% - 1.5rem);
}

.circle-ml-lg {
  margin-left: calc(100% - 1.625rem);
}

.width-content {
  @apply w-min;
}

.bg-gray {
  @apply bg-gray-300;
}

.focus {
  @apply ring-4 !ring-opacity-10;
}

.mono-switch-wrapper {
  @apply flex w-full items-start space-x-2;
}

.mono-switch {
  @apply relative flex items-center;

  &.size {
    &-sm {
      .mono-switch-block {
        @apply w-10;
      }

      .mono-switch-block.label-inside {
        @apply w-14;
      }

      .mono-switch-circle {
        @apply h-5 w-5;
      }

      &.mono-switch-info-label {
        @apply text-sm;
      }
    }

    &-md {
      .mono-switch-block {
        @apply w-12;
      }

      .mono-switch-block.label-inside {
        @apply w-[4rem];
      }

      .mono-switch-circle {
        @apply h-6 w-6;
      }
    }

    &-lg {
      .mono-switch-block {
        @apply w-14;
      }

      .mono-switch-block.label-inside {
        @apply w-[4.2rem];
      }

      .mono-switch-circle {
        @apply h-[1.625rem] w-[1.625rem];
      }

      &.mono-switch-info-label {
        @apply text-lg;
      }
    }
  }

  &-block {
    @apply relative flex items-center;
    @apply rounded-3xl p-0.5;
    @apply cursor-pointer;
    @apply transition-all duration-300 ease-in-out;
  }

  &-input {
    @apply absolute;
    @apply h-0 w-0;
    @apply opacity-0;
  }

  &-circle {
    @apply h-4 w-4 rounded-full bg-white;
    @apply transition-all duration-300 ease-in-out;
    @apply flex items-center justify-center;
  }

  &-title {
    @apply absolute right-0;
    @apply text-center text-2xs font-medium uppercase text-white;
    @apply cursor-pointer transition-all duration-300 ease-in-out;

    &-outside {
      @apply h-[0.87rem] w-[1.875rem] rounded-sm;
      @apply pt-px text-center;
    }
  }

  &-off {
    .mono-switch-block {
      @apply bg-gray-300;

      &:hover {
        @apply bg-gray-400;
      }

      &:active {
        @apply bg-gray-500;
      }
    }

    &.mono-switch-disabled {
      .mono-switch-block {
        @apply bg-opacity-50;

        &:hover,
        &:active {
          @apply cursor-default bg-gray-300 bg-opacity-50;
        }
      }
    }

    .mono-switch-circle {
      @apply ml-0;
    }

    .mono-switch-title.label-inside {
      @apply w-1/2;
      @apply right-1;
    }

    .focus {
      @apply border-gray-800 ring-gray-800;
    }
  }

  &-on {
    .mono-switch-title.label-inside {
      @apply left-1 right-auto;
      @apply w-1/2;
    }

    &.mono-switch-disabled {
      .mono-switch-block {
        @apply bg-opacity-50;

        &:hover,
        &:active {
          @apply cursor-default bg-opacity-50;
        }
      }
    }
  }

  &-left {
    @apply pl-[2.125rem];

    .mono-switch-title {
      @apply left-0 right-auto;
    }
  }

  &-info {
    &-label {
      @apply font-normal text-gray-900;
    }

    &-description {
      @apply text-xs font-normal text-gray-500/[85];
    }
  }
}
</style>

<!-- Brand theme -->
<style lang="postcss" scoped>
.brand {
  &.focus {
    @apply border-brand ring-brand;
  }

  &.mono-switch-on {
    & > .brand {
      @apply bg-brand;
    }
  }
}
</style>
