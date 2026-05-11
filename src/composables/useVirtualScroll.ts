import { ref, computed, watch } from "vue";
import type { Ref } from "vue";

export interface UseVirtualScrollOptions {
  containerRef: Ref<HTMLElement | null>;
  totalCount: Ref<number>;
  rowHeight: number;
  bufferSize?: number;
}

export interface UseVirtualScrollReturn {
  startIndex: Ref<number>;
  endIndex: Ref<number>;
  topSpacerHeight: Ref<number>;
  bottomSpacerHeight: Ref<number>;
  onScroll: () => void;
  scrollToIndex: (index: number) => void;
}

export function useVirtualScroll(options: UseVirtualScrollOptions): UseVirtualScrollReturn {
  const { containerRef, totalCount, rowHeight, bufferSize = 5 } = options;

  const startIndex = ref(0);
  const endIndex = ref(0);
  const topSpacerHeight = ref(0);
  const bottomSpacerHeight = ref(0);
  let rafId: number | null = null;

  const visibleCount = computed(() => {
    if (!containerRef.value) return 0;

    return Math.ceil(containerRef.value.clientHeight / rowHeight);
  });

  function calculateIndices() {
    if (!containerRef.value) return;

    const scrollTop = containerRef.value.scrollTop;
    const newStartIndex = Math.max(0, Math.floor(scrollTop / rowHeight) - bufferSize);
    const newEndIndex = Math.min(
      totalCount.value,
      newStartIndex + visibleCount.value + bufferSize * 2,
    );

    startIndex.value = newStartIndex;
    endIndex.value = newEndIndex;

    topSpacerHeight.value = newStartIndex * rowHeight;
    bottomSpacerHeight.value = Math.max(0, (totalCount.value - newEndIndex) * rowHeight);
  }

  function onScroll() {
    if (rafId !== null) {
      cancelAnimationFrame(rafId);
    }

    rafId = requestAnimationFrame(() => {
      calculateIndices();
      rafId = null;
    });
  }

  function scrollToIndex(index: number) {
    if (!containerRef.value) return;

    const clampedIndex = Math.max(0, Math.min(index, totalCount.value - 1));

    containerRef.value.scrollTop = clampedIndex * rowHeight;
    calculateIndices();
  }

  // Watch for container ref to become available and recalculate
  watch(
    [containerRef, totalCount],
    () => {
      if (!containerRef.value || totalCount.value === 0) return;

      // Clamp indices if totalCount decreased
      if (startIndex.value >= totalCount.value) {
        startIndex.value = Math.max(0, totalCount.value - visibleCount.value);
      }

      if (endIndex.value > totalCount.value) {
        endIndex.value = totalCount.value;
      }

      calculateIndices();
    },
    { immediate: true },
  );

  return {
    startIndex,
    endIndex,
    topSpacerHeight,
    bottomSpacerHeight,
    onScroll,
    scrollToIndex,
  };
}
