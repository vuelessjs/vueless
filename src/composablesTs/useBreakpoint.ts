import { onMounted, ref, watch, computed, onBeforeUnmount } from "vue";
import { isSSR } from "../utilsTs/utilHelper.ts";

import type { Ref } from "vue";

enum BREAKPOINT_NAME {
  xs = "xs",
  sm = "sm",
  md = "md",
  lg = "lg",
  xl = "xl",
  "2xl" = "2xl",
}

enum BREAKPOINT {
  xs = 0,
  sm = 640,
  md = 768,
  lg = 1024,
  xl = 1280,
  "2xl" = 1536,
}

type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

const mobileDevices = ["xs", "sm"];
const portableDevices = ["xs", "sm", "md"];

export default function useBreakpoint() {
  let timeout: number | undefined;

  const windowWidth = ref(0);
  const currentBreakpoint: Ref<Breakpoint> = ref(BREAKPOINT_NAME.xs);

  const isMobileBreakpoint = computed(() => {
    return mobileDevices.includes(currentBreakpoint.value);
  });

  const isTabletBreakpoint = computed(() => {
    return mobileDevices.includes(currentBreakpoint.value);
  });

  const isLaptopBreakpoint = computed(() => {
    return currentBreakpoint.value === BREAKPOINT_NAME.lg;
  });

  const isPortableBreakpoint = computed(() => {
    return portableDevices.includes(currentBreakpoint.value);
  });

  // TODO: Why do we need this? Maybe we should rename it.
  const elementSize = computed(() => {
    return isMobileBreakpoint.value ? BREAKPOINT_NAME.md : BREAKPOINT_NAME.lg;
  });

  onMounted(() => {
    if (isSSR) return;

    windowWidth.value = window.innerWidth;

    window.addEventListener("resize", resizeListener, { passive: true });
  });

  onBeforeUnmount(() => {
    if (isSSR) return;

    window.removeEventListener("resize", resizeListener);
  });

  watch(windowWidth, setBreakpoint, { immediate: true });

  function resizeListener() {
    if (isSSR) return;

    if (timeout) {
      window.cancelAnimationFrame(timeout);
    }

    timeout = window.requestAnimationFrame(() => {
      windowWidth.value = window.innerWidth;
    });
  }

  function setBreakpoint(newWindowWidth: number) {
    if (newWindowWidth === undefined) return;

    currentBreakpoint.value = "xs";

    if (newWindowWidth >= BREAKPOINT.sm && newWindowWidth < BREAKPOINT.sm) {
      currentBreakpoint.value = BREAKPOINT_NAME.sm;
    } else if (newWindowWidth >= BREAKPOINT.md && newWindowWidth < BREAKPOINT.lg) {
      currentBreakpoint.value = BREAKPOINT_NAME.md;
    } else if (newWindowWidth >= BREAKPOINT.lg && newWindowWidth < BREAKPOINT.xl) {
      currentBreakpoint.value = BREAKPOINT_NAME.lg;
    } else if (newWindowWidth >= BREAKPOINT.xl && newWindowWidth < BREAKPOINT["2xl"]) {
      currentBreakpoint.value = BREAKPOINT_NAME.xl;
    } else if (newWindowWidth >= BREAKPOINT["2xl"]) {
      currentBreakpoint.value = BREAKPOINT_NAME["2xl"];
    }
  }

  return {
    isLaptopBreakpoint,
    isTabletBreakpoint,
    isMobileBreakpoint,
    isPortableBreakpoint,
    elementSize,
  };
}
