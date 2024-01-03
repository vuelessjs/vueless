<template>
  <div
    :data-cy="dataCy"
    class="mono-link-wrapper"
    @focus="onFocus"
    @keydown="onKeydown"
    @blur="onBlur"
    @click.self="onClick"
    @mouseover="onMouseover"
  >
    <router-link
      v-if="isPresentRoute"
      class="mono-link"
      :class="linkClasses"
      :to="route"
      :target="targetValue"
    >
      <span class="mono-link-content" @click="onClick">
        <slot>
          {{ text }}
        </slot>
      </span>
    </router-link>

    <a v-else class="mono-link" :class="linkClasses" :href="href" @click.prevent="onClick">
      <slot>
        {{ text }}
      </slot>
    </a>
  </div>
</template>

<script>
export default {
  name: "ULink",

  props: {
    /**
     * Set button text.
     */
    text: {
      type: String,
      default: "",
    },

    /**
     * Set url link for the button.
     */
    url: {
      type: String,
      default: "",
    },

    /**
     * Set the router link for the button.
     */
    route: {
      type: Object,
      default: () => ({}),
    },

    /**
     * The color of the link.
     * @values gray, red, orange, yellow, green, blue, violet, fuchsia, black, white
     */
    color: {
      type: String,
      default: "",
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
     * The size of the button.
     * @values xs, sm, md, lg
     */
    size: {
      type: String,
      default: "md",
    },

    /**
     * Make a button border dashed.
     */
    dashed: {
      type: Boolean,
      default: undefined,
    },

    /**
     * Open url link in new window.
     */
    targetBlank: {
      type: Boolean,
      default: false,
    },

    /**
     * Makes a link inactive.
     */
    disabled: {
      type: Boolean,
      default: false,
    },

    /**
     * Makes outline ring during focus inactive.
     */
    noFocusRing: {
      type: Boolean,
      default: false,
    },

    /**
     * Makes link inline.
     */
    inline: {
      type: Boolean,
      default: false,
    },

    /**
     * Sets a button type.
     * @values phone, email, link
     */
    type: {
      type: String,
      default: "link",
    },

    /**
     * Disable hover styles.
     */
    noHover: {
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

  emits: ["click", "mouseover", "focus", "blur", "keydown"],

  computed: {
    targetValue() {
      return this.targetBlank ? "_blank" : "_self";
    },

    href() {
      const types = {
        phone: "tel:",
        email: "mailto:",
        link: "",
      };

      return `${types[this.type]}${this.url}`;
    },

    linkClasses() {
      const size = `size-${this.size}`;
      const focusRing = this.noFocusRing || this.$slots["default"] ? "" : "focus-ring";
      const display = this.$slots["default"] ? "flex" : this.inline ? "inline" : "inline-block";
      const color = `${this.color}-${this.variant}`;
      const classes = {
        "mono-link-dashed": this.dashed === true,
        "mono-link-dashed-hidden": this.dashed === false || this.$slots["default"],
        "mono-link-dashed-hover": this.dashed === undefined && !this.$slots["default"],
        "mono-link-no-hover": this.noHover,
      };

      const disabled = this.disabled ? "mono-link-disabled" : "";

      return [size, focusRing, display, classes, color, disabled];
    },

    isPresentRoute() {
      for (let key in this.route) return true;

      return false;
    },
  },

  methods: {
    onClick() {
      if (!this.url || this.disabled) {
        this.$emit("click");
      } else {
        window.open(this.href, this.targetValue);
      }
    },

    onMouseover() {
      this.$emit("mouseover");
    },

    onFocus() {
      this.$emit("focus");
    },

    onKeydown() {
      this.$emit("keydown");
    },

    onBlur(event) {
      this.$emit("blur", event);
    },
  },
};
</script>

<style lang="postcss" scoped>
.size {
  &-xs {
    @apply text-xs ring-offset-1;
  }

  &-sm {
    @apply text-sm ring-offset-1;
  }

  &-md {
    @apply text-base ring-offset-2;
  }

  &-lg {
    @apply text-lg ring-offset-4;
  }
}

.mono-link {
  @apply transition duration-100 ease-in-out;

  &-wrapper {
    @apply inline-block;
  }

  &-content {
    @apply w-full;
  }

  &-dashed {
    @apply border-b border-dashed;

    &-hover {
      @apply mb-px border-none;

      &:hover {
        @apply mb-0 border-b border-dashed;
      }
    }

    &-hidden {
      @apply border-none;
    }

    &-disabled {
      @apply pointer-events-none;
    }
  }

  &:hover {
    @apply !text-opacity-80;
  }

  &-no-hover:hover {
    @apply !text-opacity-100;
  }

  &:active {
    @apply !text-opacity-70;
  }

  &:focus {
    @apply !text-opacity-80;
  }
}

.focus-ring {
  &:focus {
    @apply rounded;
    @apply ring-4 !ring-opacity-10;
  }
}

.brand {
  &-default,
  &-light,
  &-dark {
    @apply border-brand text-brand;

    &:focus {
      @apply ring-brand;
    }
  }
}

.gray {
  &-default {
    @apply border-gray-500 text-gray-500;

    &:focus {
      @apply ring-gray-500;
    }
  }

  &-light {
    @apply border-gray-400 text-gray-400;

    &:focus {
      @apply ring-gray-400;
    }
  }

  &-dark {
    @apply border-gray-700 text-gray-700;

    &:focus {
      @apply ring-gray-700;
    }
  }
}

.red {
  &-default {
    @apply border-red-500 text-red-500;

    &:focus {
      @apply ring-red-500;
    }
  }

  &-light {
    @apply border-red-400 text-red-400;

    &:focus {
      @apply ring-red-400;
    }
  }

  &-dark {
    @apply border-red-700 text-red-700;

    &:focus {
      @apply ring-red-700;
    }
  }
}

.orange {
  &-default {
    @apply border-orange-500 text-orange-500;

    &:focus {
      @apply ring-orange-500;
    }
  }

  &-light {
    @apply border-orange-400 text-orange-400;

    &:focus {
      @apply ring-orange-400;
    }
  }

  &-dark {
    @apply border-orange-700 text-orange-700;

    &:focus {
      @apply ring-orange-700;
    }
  }
}

.yellow {
  &-default {
    @apply border-yellow-500 text-yellow-500;

    &:focus {
      @apply ring-yellow-500;
    }
  }

  &-light {
    @apply border-yellow-400 text-yellow-400;

    &:focus {
      @apply ring-yellow-400;
    }
  }

  &-dark {
    @apply border-yellow-700 text-yellow-700;

    &:focus {
      @apply ring-yellow-700;
    }
  }
}

.green {
  &-default {
    @apply border-green-500 text-green-500;

    &:focus {
      @apply ring-green-500;
    }
  }

  &-light {
    @apply border-green-400 text-green-400;

    &:focus {
      @apply ring-green-400;
    }
  }

  &-dark {
    @apply border-green-700 text-green-700;

    &:focus {
      @apply ring-green-700;
    }
  }
}

.blue {
  &-default {
    @apply border-blue-500 text-blue-500;

    &:focus {
      @apply ring-blue-500;
    }
  }

  &-light {
    @apply border-blue-400 text-blue-400;

    &:focus {
      @apply ring-blue-400;
    }
  }

  &-dark {
    @apply border-blue-700 text-blue-700;

    &:focus {
      @apply ring-blue-700;
    }
  }
}

.violet {
  &-default {
    @apply border-violet-500 text-violet-500;

    &:focus {
      @apply ring-violet-500;
    }
  }

  &-light {
    @apply border-violet-400 text-violet-400;

    &:focus {
      @apply ring-violet-400;
    }
  }

  &-dark {
    @apply border-violet-700 text-violet-700;

    &:focus {
      @apply ring-violet-700;
    }
  }
}

.fuchsia {
  &-default {
    @apply border-fuchsia-500 text-fuchsia-500;

    &:focus {
      @apply ring-fuchsia-500;
    }
  }

  &-light {
    @apply border-fuchsia-400 text-fuchsia-400;

    &:focus {
      @apply ring-fuchsia-400;
    }
  }

  &-dark {
    @apply border-fuchsia-700 text-fuchsia-700;

    &:focus {
      @apply ring-fuchsia-700;
    }
  }
}

.black {
  &-default,
  &-light,
  &-dark {
    @apply border-gray-900 text-gray-900;

    &:focus {
      @apply ring-gray-900;
    }
  }
}

.white {
  &-default,
  &-light,
  &-dark {
    @apply border-white text-white;

    &:focus {
      @apply ring-white;
    }
  }
}
</style>
