import { onMounted, ref, watch, computed, onBeforeUnmount } from "vue";

const BREAKPOINT_NAME = {
  xs: "xs",
  sm: "sm",
  md: "md",
  lg: "lg",
  xl: "xl",
  "2xl": "2xl",
};

const BREAKPOINT = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};

const mobileDevices = ["xs", "sm"];
const portableDevices = ["xs", "sm", "md"];

export default function useBreakpoint() {
  let timeout;

  const windowWidth = ref(undefined);
  const currentBreakpoint = ref(BREAKPOINT_NAME.xs);

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

  const elementSize = computed(() => {
    return isMobileBreakpoint.value ? BREAKPOINT_NAME.md : BREAKPOINT_NAME.lg;
  });

  onMounted(() => {
    windowWidth.value = window.innerWidth;

    window.addEventListener("resize", resizeListener, { passive: true });
  });

  onBeforeUnmount(() => {
    window.removeEventListener("resize", resizeListener, { passive: true });
  });

  watch(windowWidth, setBreakpoint, { immediate: true });

  function resizeListener() {
    if (timeout) {
      window.cancelAnimationFrame(timeout);
    }

    timeout = window.requestAnimationFrame(() => {
      windowWidth.value = window.innerWidth;
    });
  }

  function setBreakpoint(newWindowWidth) {
    if (newWindowWidth === undefined) return;

    currentBreakpoint.value = "xs";

    if (newWindowWidth >= BREAKPOINT.sm && newWindowWidth < BREAKPOINT.smd) {
      currentBreakpoint.value = "sm";
    } else if (newWindowWidth >= BREAKPOINT.md && newWindowWidth < BREAKPOINT.lg) {
      currentBreakpoint.value = "md";
    } else if (newWindowWidth >= BREAKPOINT.lg && newWindowWidth < BREAKPOINT.xl) {
      currentBreakpoint.value = "lg";
    } else if (newWindowWidth >= BREAKPOINT.xl && newWindowWidth < BREAKPOINT["2xl"]) {
      currentBreakpoint.value = "xl";
    } else if (newWindowWidth >= BREAKPOINT["2xl"]) {
      currentBreakpoint.value = "2xl";
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
