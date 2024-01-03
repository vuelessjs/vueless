<template>
  <TopProgress
    ref="topProgress"
    :color="loaderColor"
    class="mono-top-loader"
    :class="topLoaderClasses"
  />
</template>

<script>
import { mapGetters, mapMutations, mapState } from "vuex";
import { globalComponentConfig, isMobileApp, tailwindConfig } from "vueless/service.ui";

import TopProgress from "./components/TopProgress.vue";

export default {
  name: "ULoaderTop",
  components: {
    TopProgress,
  },

  props: {
    /**
     * The name of API resource (endpoint URI).
     */
    resourceNames: {
      type: [String, Array],
      default: "",
    },

    /**
     * The z-list of the loader stripe.
     * @values auto, 50, 100
     */
    zIndex: {
      type: String,
      default: "auto",
    },

    /**
     * Loader position.
     * @values fixed, absolute, relative
     */
    position: {
      type: String,
      default: "fixed",
    },

    /**
     * The color of the loader stripe.
     * @values gray, red, orange, yellow, green, blue, violet, fuchsia
     */
    color: {
      type: String,
      default: globalComponentConfig.UTopLoader?.color || "blue",
    },
  },

  computed: {
    ...mapState("loaderTop", ["loaderRequestQueue", "componentLoaderRequestQueue", "isLoading"]),
    ...mapGetters({ hexColor: globalComponentConfig.UTopLoader?.colorGetter }),

    loaderColor() {
      const isExistHexColorGetter = globalComponentConfig.UTopLoader?.colorGetter;

      const color = isExistHexColorGetter ? this.hexColor : this.color;
      const colorSet = tailwindConfig.theme.colors[this.color];
      const colorNumber = 500;

      const colorHexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
      const isColorHex = colorHexRegex.test(color);

      if (!isColorHex && !colorSet) {
        return "blue";
      }

      return isColorHex ? color : colorSet[colorNumber];
    },

    resourceNamesArray() {
      return Array.isArray(this.resourceNames) ? [...this.resourceNames] : [this.resourceNames];
    },

    topLoaderClasses() {
      const zIndex = {
        auto: "mono-top-loader-z-auto",
        50: "mono-top-loader-z-50",
        100: "mono-top-loader-z-100",
      };
      const position = `mono-top-loader-position-${this.position}`;
      const mobileApp = isMobileApp ? "mono-top-loader-mobile-app" : "";

      return [zIndex[this.zIndex], position, mobileApp];
    },
  },

  watch: {
    loaderRequestQueue: {
      deep: true,
      handler: "onChangeRequestsQuare",
    },

    isLoading: {
      deep: true,
      handler: "onChangeLoadingState",
    },
  },

  created() {
    if (this.resourceNames) {
      this.SET_COMPONENT_REQUEST_QUEUE(this.resourceNamesArray);
    }
  },

  beforeUnmount() {
    if (this.resourceNames) {
      this.REMOVE_COMPONENT_REQUEST_QUEUE();
    }
  },

  methods: {
    ...mapMutations("loaderTop", ["SET_COMPONENT_REQUEST_QUEUE", "REMOVE_COMPONENT_REQUEST_QUEUE"]),

    requestWithoutQuery(request) {
      const [requestWithoutQuery] = request.split("?");

      return requestWithoutQuery;
    },

    onChangeLoadingState() {
      if (!this.$refs.topProgress) return;

      if (
        !this.resourceNames &&
        this.$refs.topProgress.isStarted &&
        this.$refs.topProgress.show &&
        !this.isLoading
      ) {
        this.$refs.topProgress.done();
      }
    },

    onChangeRequestsQuare() {
      if (!this.$refs.topProgress) return;

      let isActiveRequests = false;

      if (this.resourceNames) {
        this.resourceNamesArray.forEach((item) => {
          if (!isActiveRequests) {
            const activeRequest = this.loaderRequestQueue.find(
              (request) => this.requestWithoutQuery(request) === item,
            );

            isActiveRequests = !!activeRequest;
          }
        });

        if (isActiveRequests && !this.$refs.topProgress.isStarted) {
          this.$refs.topProgress.start();
        } else if (
          !isActiveRequests &&
          this.$refs.topProgress.isStarted &&
          this.$refs.topProgress.show
        ) {
          this.$refs.topProgress.done();
        }
      } else {
        this.loaderRequestQueue.forEach((item) => {
          const activeRequest = this.componentLoaderRequestQueue.find(
            (request) => request === this.requestWithoutQuery(item),
          );

          isActiveRequests = !activeRequest;
        });

        if (this.isLoading && isActiveRequests && !this.$refs.topProgress.isStarted) {
          this.$refs.topProgress.start();
        }
      }
    },
  },
};
</script>

<style lang="postcss" scoped>
.mono-top-loader {
  &-position {
    &-fixed {
      @apply !fixed;
    }

    &-absolute {
      @apply !absolute;
    }
  }

  &-z-auto {
    @apply !z-auto;
  }

  &-z-50 {
    @apply !z-50;
  }

  &-z-100 {
    @apply !z-[100];
  }

  &-mobile-app {
    @apply mt-safe-top mx-3 rounded max-w-[calc(100%-1.5rem)];
  }

  &:deep(.peg) {
    @apply !hidden;
  }
}
</style>
