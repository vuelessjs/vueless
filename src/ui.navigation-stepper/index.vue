<template>
  <div class="mono-stepper-wrapper" :data-cy="dataCy">
    <UHeader :text="title" size="xs" />

    <div class="mono-stepper">
      <svg width="100%" height="100%" viewBox="0 0 40 40">
        <defs>
          <linearGradient id="gradient" class="svg-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" class="stop-1" />
            <stop offset="100%" class="stop-2" />
          </linearGradient>
        </defs>

        <circle
          class="mono-stepper-ring"
          cx="20"
          cy="20"
          r="15.91549430918954"
          fill="transparent"
          stroke-width="4"
        ></circle>

        <circle
          cx="20"
          cy="20"
          r="15.91549430918954"
          fill="transparent"
          stroke="url(#gradient)"
          stroke-width="4"
          :stroke-dasharray="accountOccupancyInPercent"
          stroke-dashoffset="0"
        ></circle>
        <g class="mono-stepper-count">
          <text y="45%" transform="translate(0, 2)">
            <tspan x="50%" text-anchor="middle" class="mono-stepper-count">{{ step }}</tspan>
          </text>
        </g>
      </svg>
    </div>
  </div>
</template>

<script>
import UHeader from "vueless/ui.text-header";

export default {
  name: "UStepper",

  components: {
    UHeader,
  },

  props: {
    /**
     * Set component title.
     */
    title: {
      type: String,
      default: "",
    },

    /**
     * Set step number.
     */
    step: {
      type: Number,
      default: null,
    },

    /**
     * Set total number of steps.
     */
    totalSteps: {
      type: Number,
      default: null,
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
    accountOccupancyInPercent() {
      const maxCountPercent = 100;
      const activePercent = (this.step / this.totalSteps) * maxCountPercent;

      return `${activePercent} ${maxCountPercent}`;
    },
  },
};
</script>

<style lang="postcss" scoped>
.wrapper {
  @apply flex items-center justify-between;
}

.mono-stepper {
  @apply h-12 w-12;

  &-wrapper {
    @apply flex items-center justify-between;
  }

  .svg-gradient {
    .stop-1 {
      stop-color: theme("colors.blue.500");
    }

    .stop-2 {
      stop-color: theme("colors.blue.500");
    }
  }

  &-ring {
    @apply stroke-current text-gray-100;
  }

  &-count {
    @apply text-xl font-bold text-gray-900;
    @apply translate-y-2 transform;
  }
}
</style>
