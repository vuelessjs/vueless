<template>
  <div>
    <slot :breakpoint="breakpoint" />
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  name: "UViewport",

  data() {
    return {
      windowWidth: 0,
      breakpoint: "",
    };
  },

  watch: {
    windowWidth: {
      immediate: true,
      handler: "setBreakpoint",
    },
  },

  mounted() {
    this.setWindowWidth();
    this.setListener();
  },

  methods: {
    ...mapMutations("breakpoint", ["SET_BREAKPOINT"]),

    setWindowWidth() {
      this.windowWidth = window.innerWidth;
    },

    setListener() {
      let timeout;

      window.addEventListener(
        "resize",
        () => {
          if (timeout) {
            window.cancelAnimationFrame(timeout);
          }

          timeout = window.requestAnimationFrame(() => {
            this.setWindowWidth();
          });
        },
        { passive: true },
      );
    },

    setBreakpoint(windowWidth) {
      if (!windowWidth) return;

      this.breakpoint = "xs";

      if (windowWidth >= 640 && windowWidth < 768) {
        this.breakpoint = "sm";
      } else if (windowWidth >= 768 && windowWidth < 1024) {
        this.breakpoint = "md";
      } else if (windowWidth >= 1024 && windowWidth < 1280) {
        this.breakpoint = "lg";
      } else if (windowWidth >= 1280 && windowWidth < 1536) {
        this.breakpoint = "xl";
      } else if (windowWidth >= 1536) {
        this.breakpoint = "2xl";
      }

      this.SET_BREAKPOINT(this.breakpoint);
    },
  },
};
</script>
