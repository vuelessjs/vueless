import { ref, computed, onMounted, onUnmounted, type Ref } from "vue";
import { FULL_CIRCLE, HALF_CIRCLE } from "./constants";

interface UseKnobOptions {
  modelValue: Ref<number>;
  min: number;
  max: number;
  step: number;
  arcRange: number;
  disabled: Ref<boolean>;
  onUpdate: (value: number) => void;
  onChange: (value: number) => void;
}

export function useKnob(options: UseKnobOptions) {
  const { modelValue, min, max, step, arcRange, disabled, onUpdate, onChange } = options;

  const isDragging = ref(false);
  const startAngle = ref(0);
  const currentAngle = ref(0);

  const normalizedValue = computed(() => {
    return Math.max(min, Math.min(max, modelValue.value));
  });

  const valuePercent = computed(() => {
    return ((normalizedValue.value - min) / (max - min)) * 100;
  });

  const startAngleDeg = computed(() => {
    return (FULL_CIRCLE - arcRange) / 2;
  });

  const endAngleDeg = computed(() => {
    return startAngleDeg.value + arcRange;
  });

  const valueAngle = computed(() => {
    const percent = (normalizedValue.value - min) / (max - min);

    return startAngleDeg.value + percent * arcRange;
  });

  function clampValue(value: number): number {
    const steppedValue = Math.round(value / step) * step;

    return Math.max(min, Math.min(max, steppedValue));
  }

  function angleToValue(angle: number): number {
    let normalizedAngle = angle % FULL_CIRCLE;

    if (normalizedAngle < 0) normalizedAngle += FULL_CIRCLE;

    if (normalizedAngle < startAngleDeg.value) {
      normalizedAngle += FULL_CIRCLE;
    }

    if (normalizedAngle > endAngleDeg.value + HALF_CIRCLE) {
      return min;
    }

    if (normalizedAngle > endAngleDeg.value) {
      return max;
    }

    const percent = (normalizedAngle - startAngleDeg.value) / arcRange;
    const value = min + percent * (max - min);

    return clampValue(value);
  }

  function getAngleFromPoint(
    centerX: number,
    centerY: number,
    pointX: number,
    pointY: number,
  ): number {
    const dx = pointX - centerX;
    const dy = pointY - centerY;
    const angle = (Math.atan2(dy, dx) * HALF_CIRCLE) / Math.PI;

    return angle;
  }

  function handleDragStart(event: MouseEvent | TouchEvent, element: HTMLElement) {
    if (disabled.value) return;

    event.preventDefault();
    isDragging.value = true;

    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const clientX = "touches" in event ? event.touches[0].clientX : event.clientX;
    const clientY = "touches" in event ? event.touches[0].clientY : event.clientY;

    startAngle.value = getAngleFromPoint(centerX, centerY, clientX, clientY);
    currentAngle.value = startAngle.value;

    const newValue = angleToValue(startAngle.value);

    onUpdate(newValue);
  }

  function handleDragMove(event: MouseEvent | TouchEvent, element: HTMLElement) {
    if (!isDragging.value || disabled.value) return;

    event.preventDefault();

    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const clientX = "touches" in event ? event.touches[0].clientX : event.clientX;
    const clientY = "touches" in event ? event.touches[0].clientY : event.clientY;

    currentAngle.value = getAngleFromPoint(centerX, centerY, clientX, clientY);

    const newValue = angleToValue(currentAngle.value);

    onUpdate(newValue);
  }

  function handleDragEnd() {
    if (!isDragging.value) return;

    isDragging.value = false;
    onChange(normalizedValue.value);
  }

  function handleWheel(event: WheelEvent) {
    if (disabled.value) return;

    event.preventDefault();

    const delta = event.deltaY > 0 ? -step : step;
    const newValue = clampValue(normalizedValue.value + delta);

    onUpdate(newValue);
    onChange(newValue);
  }

  function handleKeydown(event: KeyboardEvent) {
    if (disabled.value) return;

    let delta = 0;

    switch (event.code) {
      case "ArrowUp":
      case "ArrowRight":
        delta = step;
        break;
      case "ArrowDown":
      case "ArrowLeft":
        delta = -step;
        break;
      case "Home":
        onUpdate(min);
        onChange(min);
        event.preventDefault();

        return;
      case "End":
        onUpdate(max);
        onChange(max);
        event.preventDefault();

        return;
      case "PageUp":
        delta = step * 10;
        break;
      case "PageDown":
        delta = -step * 10;
        break;
      default:
        return;
    }

    event.preventDefault();
    const newValue = clampValue(normalizedValue.value + delta);

    onUpdate(newValue);
    onChange(newValue);
  }

  function getCirclePathData(radius: number, percent: number): string {
    const circumference = 2 * Math.PI * radius;
    const arcLength = (percent / 100) * (arcRange / FULL_CIRCLE) * circumference;

    return `${arcLength} ${circumference}`;
  }

  function getHandlePosition(radius: number) {
    const angle = ((valueAngle.value - 90) * Math.PI) / HALF_CIRCLE;
    const handleRadius = radius;
    const cx = 50 + handleRadius * Math.cos(angle);
    const cy = 50 + handleRadius * Math.sin(angle);

    return { cx, cy };
  }

  onMounted(() => {
    document.addEventListener("mousemove", (e) => handleDragMove(e, document.body));
    document.addEventListener("mouseup", handleDragEnd);
    document.addEventListener("touchmove", (e) => handleDragMove(e, document.body));
    document.addEventListener("touchend", handleDragEnd);
  });

  onUnmounted(() => {
    document.removeEventListener("mousemove", (e) => handleDragMove(e, document.body));
    document.removeEventListener("mouseup", handleDragEnd);
    document.removeEventListener("touchmove", (e) => handleDragMove(e, document.body));
    document.removeEventListener("touchend", handleDragEnd);
  });

  return {
    isDragging,
    normalizedValue,
    valuePercent,
    valueAngle,
    startAngleDeg,
    endAngleDeg,
    handleDragStart,
    handleDragMove,
    handleDragEnd,
    handleWheel,
    handleKeydown,
    getCirclePathData,
    getHandlePosition,
  };
}
