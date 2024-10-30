import { onMounted, ref, watch, computed, onBeforeUnmount } from "vue";
import { isSSR } from "../utilsTs/utilHelper.ts";

import type { Ref } from "vue";

enum BreakpointName {
  Xs = "xs",
  Sm = "sm",
  Md = "md",
  Lg = "lg",
  Xl = "xl",
  "2xl" = "2xl",
}

enum BreakpointWidth {
  Xs = 0,
  Sm = 640,
  Md = 768,
  Lg = 1024,
  Xl = 1280,
  "2xl" = 1536,
}

type Breakpoint = `${BreakpointName}`;

const mobileDevices = ["xs", "sm"];
const portableDevices = ["xs", "sm", "md"];

export default function useBreakpoint() {
  let timeout: number | undefined;

  const windowWidth = ref(0);
  const currentBreakpoint: Ref<Breakpoint> = ref(BreakpointName.Xs);

  const isMobileBreakpoint = computed(() => {
    return mobileDevices.includes(currentBreakpoint.value);
  });

  const isTabletBreakpoint = computed(() => {
    return mobileDevices.includes(currentBreakpoint.value);
  });

  const isLaptopBreakpoint = computed(() => {
    return currentBreakpoint.value === BreakpointName.Lg;
  });

  const isPortableBreakpoint = computed(() => {
    return portableDevices.includes(currentBreakpoint.value);
  });

  // TODO: Why do we need this? Maybe we should rename it.
  const elementSize = computed(() => {
    return isMobileBreakpoint.value ? BreakpointName.Md : BreakpointName.Lg;
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

    if (newWindowWidth >= BreakpointWidth.Sm && newWindowWidth < BreakpointWidth.Sm) {
      currentBreakpoint.value = BreakpointName.Sm;
    } else if (newWindowWidth >= BreakpointWidth.Md && newWindowWidth < BreakpointWidth.Lg) {
      currentBreakpoint.value = BreakpointName.Md;
    } else if (newWindowWidth >= BreakpointWidth.Lg && newWindowWidth < BreakpointWidth.Xl) {
      currentBreakpoint.value = BreakpointName.Lg;
    } else if (newWindowWidth >= BreakpointWidth.Xl && newWindowWidth < BreakpointWidth["2xl"]) {
      currentBreakpoint.value = BreakpointName.Xl;
    } else if (newWindowWidth >= BreakpointWidth["2xl"]) {
      currentBreakpoint.value = BreakpointName["2xl"];
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
