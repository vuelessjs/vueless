import { onMounted, ref, watch, computed, onBeforeUnmount } from "vue";
import { isSSR } from "../utils/helper";

type ResponsiveConfig<T> = Partial<Record<BreakpointName, T>>;

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

let isInitialized = false;
let animationId: number | undefined;

const windowWidth = ref(0);
const currentBreakpoint = ref(BreakpointName.Xs);
const BREAKPOINT_KEYS = Object.keys(BreakpointName) as (keyof typeof BreakpointName)[];

watch(windowWidth, setBreakpoint, { immediate: true });

export function useBreakpoint() {
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

  onMounted(() => {
    initBreakpointListener();
  });

  onBeforeUnmount(() => {
    window.removeEventListener("resize", resizeListener);
  });

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

/**
 * Shorthand function that can be used directly in templates.
 * Returns the appropriate value based on the current breakpoint.
 * Vue will track the reactive dependency and re-render when the breakpoint changes.
 *
 * @example
 * ```vue
 * <template>
 *   <UButton :size="r({ sm: 'sm', md: 'md' })">Click me</UButton>
 * </template>
 *
 * <script setup>
 * import { r } from "vueless";
 * </script>
 * ```
 */
export function r<T>(config: ResponsiveConfig<T>): T {
  initBreakpointListener();

  const definedKeys = BREAKPOINT_KEYS.filter((key) => BreakpointName[key] in config);

  if (!definedKeys.length) {
    return undefined as T;
  }

  const currentIndex = BREAKPOINT_KEYS.findIndex(
    (key) => BreakpointName[key] === currentBreakpoint.value,
  );
  const smallestDefinedIndex = BREAKPOINT_KEYS.indexOf(definedKeys[0]);
  const largestDefinedIndex = BREAKPOINT_KEYS.indexOf(definedKeys[definedKeys.length - 1]);

  if (currentIndex <= smallestDefinedIndex) {
    return config[BreakpointName[definedKeys[0]]] as T;
  }

  if (currentIndex >= largestDefinedIndex) {
    return config[BreakpointName[definedKeys[definedKeys.length - 1]]] as T;
  }

  for (let i = currentIndex; i >= 0; i--) {
    const bp = BreakpointName[BREAKPOINT_KEYS[i]];

    if (bp in config) {
      return config[bp] as T;
    }
  }

  return config[BreakpointName[definedKeys[0]]] as T;
}

function setBreakpoint(newWindowWidth: number) {
  if (newWindowWidth === undefined) return;

  for (let i = BREAKPOINT_KEYS.length - 1; i >= 0; i--) {
    const key = BREAKPOINT_KEYS[i];

    if (newWindowWidth >= BreakpointWidth[key]) {
      currentBreakpoint.value = BreakpointName[key];

      return;
    }
  }

  currentBreakpoint.value = BreakpointName.Xs;
}

function resizeListener() {
  if (isSSR) return;

  if (animationId) {
    window.cancelAnimationFrame(animationId);
  }

  animationId = window.requestAnimationFrame(() => {
    windowWidth.value = window.innerWidth;
  });
}

function initBreakpointListener() {
  if (isInitialized || isSSR) return;

  isInitialized = true;
  windowWidth.value = window.innerWidth;

  window.addEventListener("resize", resizeListener, { passive: true });
}
