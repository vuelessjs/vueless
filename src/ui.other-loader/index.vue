<template>
  <div class="mono-internal-loader" :class="loaderCLasses">
    <div
      v-for="ellipse in ellipsesAmount"
      :key="ellipse"
      class="mono-internal-loader-ellipse"
      :class="ellipseClasses"
    />
  </div>
</template>

<script>
export default {
  name: "ULoader",

  props: {
    /**
     * The size of the button.
     * @values sm, md, lg
     */
    size: {
      type: String,
      default: "md",
    },
  },

  data() {
    return {
      ellipsesAmount: 4,
    };
  },

  computed: {
    loaderCLasses() {
      const size = `mono-internal-loader-${this.size}`;

      return [size];
    },

    ellipseClasses() {
      const size = `mono-internal-loader-ellipse-${this.size}`;

      return [size];
    },
  },
};
</script>

<style scoped lang="postcss">
.mono-internal-loader {
  @apply relative mx-1 flex h-4 items-center;

  &-sm {
    @apply w-9;
  }

  &-md {
    @apply w-[3.625rem];
  }

  &-lg {
    @apply w-20;
  }

  &-ellipse {
    @apply absolute rounded-full bg-white ease-[cubic-bezier(0,1,1,0)];

    &:nth-child(1) {
      @apply animate-[lds-ellipsis1_0.6s_infinite];
    }

    &:nth-child(4) {
      @apply animate-[lds-ellipsis3_0.6s_infinite];
    }

    &-sm {
      @apply h-1.5 w-1.5;

      &:nth-child(1) {
        @apply left-1;
      }

      &:nth-child(2) {
        @apply left-1 animate-[lds-ellipsis2-sm_0.6s_infinite];
      }

      &:nth-child(3) {
        @apply left-4 animate-[lds-ellipsis2-sm_0.6s_infinite];
      }

      &:nth-child(4) {
        @apply left-7;
      }
    }

    &-md {
      @apply h-2.5 w-2.5;

      &:nth-child(1) {
        @apply left-1.5;
      }

      &:nth-child(2) {
        @apply left-1.5 animate-[lds-ellipsis2-md_0.6s_infinite];
      }

      &:nth-child(3) {
        @apply left-6 animate-[lds-ellipsis2-md_0.6s_infinite];
      }

      &:nth-child(4) {
        @apply left-[2.625rem];
      }
    }

    &-lg {
      @apply h-4 w-4;

      &:nth-child(1) {
        @apply left-2;
      }

      &:nth-child(2) {
        @apply left-2 animate-[lds-ellipsis2-lg_0.6s_infinite];
      }

      &:nth-child(3) {
        @apply left-8 animate-[lds-ellipsis2-lg_0.6s_infinite];
      }

      &:nth-child(4) {
        @apply left-14;
      }
    }
  }
}

@keyframes lds-ellipsis1 {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes lds-ellipsis3 {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}

@keyframes lds-ellipsis2-sm {
  0% {
    transform: translate(0, 0);
  }

  100% {
    transform: translate(12px, 0);
  }
}

@keyframes lds-ellipsis2-md {
  0% {
    transform: translate(0, 0);
  }

  100% {
    transform: translate(18px, 0);
  }
}

@keyframes lds-ellipsis2-lg {
  0% {
    transform: translate(0, 0);
  }

  100% {
    transform: translate(24px, 0);
  }
}
</style>
