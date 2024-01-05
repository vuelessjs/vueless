<template>
  <div class="mono-money">
    <div class="mono-money-block" :class="moneyBlockClasses">
      <div v-if="isExistSlot('left')" class="mono-money-block-left-slot">
        <!-- @slot Use it to add something before money amount. -->
        <slot name="left" />
      </div>

      <div :data-cy="dataCy" class="mono-money-block-sum">
        <span v-if="currencySymbolPosition.left" class="currency-symbol">
          {{ currencySymbol + "&nbsp;" }}
        </span>

        <span v-if="sum">{{ typeSymbol }}</span>

        <span>{{ preparedMoney.integer }}</span>

        <span v-if="!integer" class="mono-money-block-penny"
          >{{ preparedMoney.delimiter }}{{ preparedMoney.penny }}
        </span>

        <span v-if="currencySymbolPosition.right" class="mono-money-block-currency-symbol">
          {{ "&nbsp;" + currencySymbol }}
        </span>
      </div>

      <div v-if="isExistSlot('right')" class="mono-money-block-right-slot">
        <!-- @slot Use it to add something after money amount. -->
        <slot name="right" />
      </div>
    </div>
  </div>
</template>

<script>
import MoneyService, { MONEY_SIGN_TYPE } from "vueless/service.money";

export default {
  name: "UMoney",

  props: {
    /**
     * Set sum.
     */
    sum: {
      type: Number,
      default: 0,
    },

    /**
     * Set currency symbol.
     */
    currencySymbol: {
      type: String,
      default: "",
    },

    /**
     * Make sum planned (add brackets).
     */
    planned: {
      type: Boolean,
      default: false,
    },

    /**
     * Make sum integer.
     */
    integer: {
      type: Boolean,
      default: false,
    },

    /**
     * Set sign for sum.
     * @values default, positive, negative
     */
    sign: {
      type: String,
      default: "default",
    },

    /**
     * Set align for currency symbol.
     * @values right, left
     */
    currencySymbolAlign: {
      type: String,
      default: "right",
    },

    /**
     * Set text size of sum.
     * @values xs, sm, md, lg, xl, 2xl, 3xl, 4xl
     */
    size: {
      type: String,
      default: "md",
    },

    /**
     * Set weight.
     * @values regular, medium, bold
     */
    weight: {
      type: String,
      default: "regular",
    },

    /**
     * The color of the icon.
     * @values brand, gray, red, yellow, orange, green, blue, violet, fuchsia, black, white
     */
    color: {
      type: String,
      default: "black",
    },

    /**
     * The variant of the link.
     * @values light, default, dark
     */
    variant: {
      type: String,
      default: "default",
    },

    /**
     * Set the numeral decimal scale after the comma.
     */
    numeralDecimalScale: {
      type: Number,
      default: 2,
    },

    /**
     * Set align for money block.
     * @values right, left
     */
    align: {
      type: String,
      default: "right",
    },

    /**
     * Sets data-cy attribute for automated testing.
     */
    dataCy: {
      type: String,
      default: "",
    },
  },

  computed: {
    currencySymbolPosition() {
      return {
        left: this.currencySymbolAlign === "left",
        right: this.currencySymbolAlign === "right",
      };
    },

    typeSymbol() {
      let type = "";

      if (this.sign === MONEY_SIGN_TYPE.positive) type = "+";
      if (this.sign === MONEY_SIGN_TYPE.negative) type = "–";

      return type;
    },

    preparedMoney() {
      return new MoneyService().separatedMoney(Math.abs(this.sum), this.numeralDecimalScale);
    },

    moneyBlockClasses() {
      const size = `mono-money-block-size-${this.size}`;
      const weight = `mono-money-block-weight-${this.weight}`;
      const color = `mono-money-block-color-${this.color}-${this.variant}`;
      const blockAlink = this.align === "left" ? "mono-money-block-left" : "mono-money-block-right";
      const planned = this.planned ? "mono-money-block-planned" : "";

      return [size, weight, color, blockAlink, planned];
    },
  },

  methods: {
    isExistSlot(slotName) {
      return !!this.$slots[slotName];
    },
  },
};
</script>

<style lang="postcss" scoped>
.mono-money-block {
  @apply flex items-center;
  @apply whitespace-nowrap;

  &-right {
    @apply justify-end;
  }

  &-left {
    @apply justify-start;
  }

  &-right-slot {
    @apply ml-2;
  }

  &-left-slot {
    @apply mr-2;
  }

  &-planned {
    .mono-money-block-sum {
      @apply !opacity-75;

      &:before {
        content: "(";
      }

      &:after {
        content: ")";
      }
    }
  }

  &-size {
    &-xs {
      > .mono-money-block-sum {
        @apply text-xs;

        .mono-money-block-penny {
          @apply text-2xs;
        }
      }
    }

    &-sm {
      > .mono-money-block-sum {
        @apply text-sm;

        .mono-money-block-penny {
          @apply text-xs;
        }
      }
    }

    &-md {
      > .mono-money-block-sum {
        @apply text-base;

        .mono-money-block-penny {
          @apply text-xs;
        }
      }
    }

    &-lg {
      > .mono-money-block-sum {
        @apply text-lg;

        .mono-money-block-penny {
          @apply text-sm;
        }
      }
    }

    &-xl {
      > .mono-money-block-sum {
        @apply text-xl;

        .mono-money-block-penny {
          @apply text-base;
        }
      }
    }

    &-2xl {
      > .mono-money-block-sum {
        @apply text-2xl;

        .mono-money-block-penny {
          @apply text-lg;
        }
      }
    }

    &-3xl {
      > .mono-money-block-sum {
        @apply text-3xl;

        .mono-money-block-penny {
          @apply text-xl;
        }
      }
    }

    &-4xl {
      > .mono-money-block-sum {
        @apply text-4xl;

        .mono-money-block-penny {
          @apply text-2xl;
        }
      }
    }
  }

  &-weight {
    &-regular {
      .mono-money-block-sum {
        @apply font-normal;
      }
    }

    &-medium {
      .mono-money-block-sum {
        @apply font-medium;
      }
    }

    &-bold {
      .mono-money-block-sum {
        @apply font-bold;
      }
    }
  }

  &-color {
    &-brand {
      &-default,
      &-light,
      &-dark {
        .mono-money-block-sum {
          @apply text-brand;
        }
      }
    }

    &-gray {
      &-default {
        .mono-money-block-sum {
          @apply text-gray-600;
        }
      }

      &-light {
        .mono-money-block-sum {
          @apply text-gray-400;
        }
      }

      &-dark {
        .mono-money-block-sum {
          @apply text-gray-900;
        }
      }
    }

    &-red {
      &-default {
        .mono-money-block-sum {
          @apply text-red-600;
        }
      }

      &-light {
        .mono-money-block-sum {
          @apply text-red-400;
        }
      }

      &-dark {
        .mono-money-block-sum {
          @apply text-red-700;
        }
      }
    }

    &-orange {
      &-default {
        .mono-money-block-sum {
          @apply text-orange-600;
        }
      }

      &-light {
        .mono-money-block-sum {
          @apply text-orange-400;
        }
      }

      &-dark {
        .mono-money-block-sum {
          @apply text-orange-700;
        }
      }
    }

    &-yellow {
      &-default {
        .mono-money-block-sum {
          @apply text-yellow-600;
        }
      }

      &-light {
        .mono-money-block-sum {
          @apply text-yellow-400;
        }
      }

      &-dark {
        .mono-money-block-sum {
          @apply text-yellow-700;
        }
      }
    }

    &-green {
      &-default {
        .mono-money-block-sum {
          @apply text-green-600;
        }
      }

      &-light {
        .mono-money-block-sum {
          @apply text-green-400;
        }
      }

      &-dark {
        .mono-money-block-sum {
          @apply text-green-700;
        }
      }
    }

    &-blue {
      &-default {
        .mono-money-block-sum {
          @apply text-blue-600;
        }
      }

      &-light {
        .mono-money-block-sum {
          @apply text-blue-400;
        }
      }

      &-dark {
        .mono-money-block-sum {
          @apply text-blue-700;
        }
      }
    }

    &-violet {
      &-default {
        .mono-money-block-sum {
          @apply text-violet-600;
        }
      }

      &-light {
        .mono-money-block-sum {
          @apply text-violet-400;
        }
      }

      &-dark {
        .mono-money-block-sum {
          @apply text-violet-700;
        }
      }
    }

    &-fuchsia {
      &-default {
        .mono-money-block-sum {
          @apply text-fuchsia-600;
        }
      }

      &-light {
        .mono-money-block-sum {
          @apply text-fuchsia-400;
        }
      }

      &-dark {
        .mono-money-block-sum {
          @apply text-fuchsia-700;
        }
      }
    }

    &-black {
      &-default,
      &-light,
      &-dark {
        .mono-money-block-sum {
          @apply text-black;
        }
      }
    }

    &-white {
      &-default,
      &-light,
      &-dark {
        .mono-money-block-sum {
          @apply text-white;
        }
      }
    }
  }
}
</style>
