<template>
  <span
    v-tippy="tippyConfig"
    class="mono-svg-icon"
    :class="[iconWrapClasses]"
    :data-cy="dataCy"
    @click="onClick"
    @focus="onFocus"
    @blur="onBlur"
  >
    <component :is="dynamicComponent" :class="iconClasses" class="mono-svg-icon-inline" />
  </span>
</template>

<script>
import { defineAsyncComponent } from "vue";
import { directive as tippyDirective, setDefaultProps as tippySetConfig } from "vue-tippy";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";
import "tippy.js/animations/shift-away.css";

tippySetConfig({
  arrow: true,
  theme: "light",
  animation: "shift-away",
});

export default {
  name: "UIcon",

  directives: {
    tippy: tippyDirective,
  },

  props: {
    /**
     * Icon SVG data source path.
     */
    src: {
      type: [String, Object],
      default: "",
    },

    /**
     * Icon SVG name which imported in global config file (deprecated).
     */
    name: {
      type: String,
      default: "",
    },

    /**
     * The color of the icon.
     * @values brand, gray, red, yellow, green, blue, violet, black, white
     */
    color: {
      type: String,
      default: "black",
    },

    /**
     * The size of the icon.
     * @values 3xs, 2xs, xs, sm, md, lg, xl, 2xl, 3xl, 4xl, 5xl
     */
    size: {
      type: String,
      default: "md",
    },

    /**
     * Set pill mild semi-transparent background and solid colour icon.
     */
    pill: {
      type: Boolean,
      default: false,
    },

    /**
     * Set pill solid background and white icon.
     */
    pillFilled: {
      type: Boolean,
      default: false,
    },

    /**
     * The variant of the icon.
     * @values light, default, dark
     */
    variant: {
      type: String,
      default: "default",
    },

    /**
     * Add interactive states to the icon (hover, clicked).
     */
    interactive: {
      type: Boolean,
      default: false,
    },

    /**
     * Set tooltip text.
     */
    tooltip: {
      type: String,
      default: "",
    },

    /**
     * Set tooltip settings.
     * [See all settings here](https://kabbouchi.github.io/vue-tippy/4.0/features/placement.html).
     */
    tooltipSettings: {
      type: Object,
      default: () => {},
    },

    /**
     * Sets data-cy attribute for automated testing.
     */
    dataCy: {
      type: String,
      default: "",
    },
  },

  emits: ["click", "focus", "blur"],

  computed: {
    dynamicComponent() {
      const name = this.name;
      const src = this.src;
      let component = "";

      // TODO: this one should be props
      const style = "rounded";
      const weight = "400";

      // Dynamic import
      if (name && !src) {
        component = defineAsyncComponent(() =>
          import.meta.env.PROD
            ? import(
                `../../src/assets/images/.generated/@material-symbols/svg-${weight}/${style}/${name}.svg`
              )
            : import(
                /* @vite-ignore */ `/node_modules/@material-symbols/svg-${weight}/${style}/${name}.svg`
              ),
        );
      }

      // Static import
      if (src && !name) {
        component = src.render();
      }

      return component;
    },

    tippyConfig() {
      return { onShow: () => !!this.tooltip, ...this.tooltipSettings, content: this.tooltip };
    },

    iconWrapClasses() {
      const pill = this.pill || this.pillFilled ? "pill" : "";
      const pillFilled = this.pillFilled ? "pill-filled" : "";
      const pillClasses = `${pill} ${pillFilled} pill-${this.color}`;

      return { [pillClasses]: this.pill || this.pillFilled };
    },

    iconClasses() {
      const color = `mono-svg-icon-${this.color}-${this.variant}`;
      const size = `size-${this.size}`;
      const classes = { interactive: this.interactive };

      return [color, size, classes];
    },
  },

  methods: {
    onClick() {
      this.$emit("click");
    },

    onFocus() {
      this.$emit("focus");
    },

    onBlur(event) {
      this.$emit("blur", event);
    },
  },
};
</script>

<style lang="postcss" scoped>
.size-3xs {
  @apply h-3 w-3;

  .pill > & {
    @apply m-1;
  }
}

.size-2xs {
  @apply h-3.5 w-3.5;

  .pill > & {
    @apply m-1.5;
  }
}

.size-xs {
  @apply h-4 w-4;

  .pill > & {
    @apply m-2;
  }
}

.size-sm {
  @apply h-5 w-5;

  .pill > & {
    @apply m-2.5;
  }
}

.size-md {
  @apply h-6 w-6;

  .pill > & {
    @apply m-3;
  }
}

.size-lg {
  @apply h-8 w-8;

  .pill > & {
    @apply m-3.5;
  }
}

.size-xl {
  @apply h-10 w-10;

  .pill > & {
    @apply m-4;
  }
}

.size-2xl {
  @apply h-12 w-12;

  .pill > & {
    @apply m-[1.125rem];
  }
}

.size-3xl {
  @apply h-14 w-14;

  .pill > & {
    @apply m-5;
  }
}

.size-4xl {
  @apply h-16 w-16;

  .pill > & {
    @apply m-6;
  }
}

.size-5xl {
  @apply h-20 w-20;

  .pill > & {
    @apply m-8;
  }
}

.mono-svg-icon {
  @apply inline-table fill-current;

  &:deep(g [fill]) {
    @apply fill-current;
  }

  .interactive {
    @apply cursor-pointer;

    &:hover,
    &:active {
      @apply opacity-50;
    }
  }

  &-inline {
    @apply fill-current;
  }

  &-brand {
    &-default,
    &-light,
    &-dark {
      @apply text-brand;
    }
  }

  &-black {
    &-default,
    &-light,
    &-dark {
      @apply text-black;
    }
  }

  &-white {
    &-default,
    &-light,
    &-dark {
      @apply text-white;
    }
  }

  &-gray {
    &-default {
      @apply text-gray-500;
    }

    &-light {
      @apply text-gray-400;
    }

    &-dark {
      @apply text-gray-700;
    }
  }

  &-red {
    &-default {
      @apply text-red-500;
    }

    &-light {
      @apply text-red-400;
    }

    &-dark {
      @apply text-red-700;
    }
  }

  &-orange {
    &-default {
      @apply text-orange-500;
    }

    &-light {
      @apply text-orange-400;
    }

    &-dark {
      @apply text-orange-700;
    }
  }

  &-yellow {
    &-default {
      @apply text-yellow-500;
    }

    &-light {
      @apply text-yellow-400;
    }

    &-dark {
      @apply text-yellow-700;
    }
  }

  &-green {
    &-default {
      @apply text-green-500;
    }

    &-light {
      @apply text-green-400;
    }

    &-dark {
      @apply text-green-700;
    }
  }

  &-blue {
    &-default {
      @apply text-blue-500;
    }

    &-light {
      @apply text-blue-400;
    }

    &-dark {
      @apply text-blue-700;
    }
  }

  &-violet {
    &-default {
      @apply text-violet-500;
    }

    &-light {
      @apply text-violet-400;
    }

    &-dark {
      @apply text-violet-700;
    }
  }

  &-fuchsia {
    &-default {
      @apply text-fuchsia-500;
    }

    &-light {
      @apply text-fuchsia-400;
    }

    &-dark {
      @apply text-fuchsia-700;
    }
  }
}

.pill {
  @apply rounded-full;

  &-brand {
    @apply bg-brand bg-opacity-5;
  }

  &-black {
    @apply bg-black bg-opacity-5;
  }

  &-white {
    @apply bg-white bg-opacity-5;
  }

  &-gray {
    @apply bg-gray-500 bg-opacity-5;
  }

  &-red {
    @apply bg-red-500 bg-opacity-5;
  }

  &-orange {
    @apply bg-orange-500 bg-opacity-5;
  }

  &-yellow {
    @apply bg-yellow-500 bg-opacity-5;
  }

  &-green {
    @apply bg-green-500 bg-opacity-5;
  }

  &-blue {
    @apply bg-blue-500 bg-opacity-5;
  }

  &-violet {
    @apply bg-violet-500 bg-opacity-5;
  }

  &-fuchsia {
    @apply bg-fuchsia-500 bg-opacity-5;
  }

  &-filled {
    &:deep(svg) {
      @apply text-white;
    }

    &.pill-brand,
    &.pill-black,
    &.pill-gray,
    &.pill-red,
    &.pill-orange,
    &.pill-yellow,
    &.pill-green,
    &.pill-blue,
    &.pill-violet,
    &.pill-fuchsia {
      @apply bg-opacity-100;
    }
  }
}
</style>
