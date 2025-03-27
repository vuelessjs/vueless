import { onMounted, ref, watch, computed, onBeforeUnmount } from "vue";
import { isSSR } from "../utils/helper.ts";

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

export default function useBreakpoint() {
  let animationId: number | undefined;

  const windowWidth = ref(0);
  const currentBreakpoint: Ref<BreakpointName> = ref(BreakpointName.Xs);

  const isPhone = computed(() => {
    return currentBreakpoint.value === BreakpointName.Xs;
  });

  const isLargePhone = computed(() => {
    return currentBreakpoint.value === BreakpointName.Sm;
  });

  const isPhoneGroup = computed(() => {
    return isPhone.value || isLargePhone.value;
  });

  const isPortraitTablet = computed(() => {
    return currentBreakpoint.value === BreakpointName.Md;
  });

  const isLandscapeTablet = computed(() => {
    return currentBreakpoint.value === BreakpointName.Lg;
  });

  const isTabletGroup = computed(() => {
    return isPortraitTablet.value || isLandscapeTablet.value;
  });

  const isDesktop = computed(() => {
    return currentBreakpoint.value === BreakpointName.Xl;
  });

  const isLargeDesktop = computed(() => {
    return currentBreakpoint.value === BreakpointName["2xl"];
  });

  const isDesktopGroup = computed(() => {
    return isDesktop.value || isLargeDesktop.value;
  });

  watch(windowWidth, setBreakpoint, { immediate: true });

  onMounted(() => {
    if (isSSR) return;

    windowWidth.value = window.innerWidth;

    window.addEventListener("resize", resizeListener, { passive: true });
  });

  onBeforeUnmount(() => {
    if (isSSR) return;

    window.removeEventListener("resize", resizeListener);
  });

  function resizeListener() {
    if (isSSR) return;

    if (animationId) {
      window.cancelAnimationFrame(animationId);
    }

    animationId = window.requestAnimationFrame(() => {
      windowWidth.value = window.innerWidth;
    });
  }

  function setBreakpoint(newWindowWidth: number) {
    if (newWindowWidth === undefined) return;

    const breakpoints = [
      { width: BreakpointWidth["2xl"], name: BreakpointName["2xl"] },
      { width: BreakpointWidth.Xl, name: BreakpointName.Xl },
      { width: BreakpointWidth.Lg, name: BreakpointName.Lg },
      { width: BreakpointWidth.Md, name: BreakpointName.Md },
      { width: BreakpointWidth.Sm, name: BreakpointName.Sm },
    ];

    currentBreakpoint.value =
      breakpoints.find((breakpoint) => newWindowWidth >= breakpoint.width)?.name ||
      BreakpointName.Xs;
  }

  return {
    isPhone,
    isLargePhone,
    isPhoneGroup,
    isPortraitTablet,
    isLandscapeTablet,
    isTabletGroup,
    isDesktop,
    isLargeDesktop,
    isDesktopGroup,
    breakpoint: currentBreakpoint,
  };
}
