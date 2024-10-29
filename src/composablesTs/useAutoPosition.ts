import { computed, toValue, ref } from "vue";
import { isSSR } from "../utilsTs/utilHelper.ts";

import type { Ref, ComputedRef } from "vue";

interface PositionXY {
  x: Position;
  y: Position;
}

export enum Position {
  Left = "left",
  Right = "right",
  Top = "top",
  Bottom = "bottom",
  Auto = "auto",
}

// TODO: Remove after full TS migration, use enum instead.
export const POSITION = {
  left: "left",
  right: "right",
  top: "top",
  bottom: "bottom",
  auto: "auto",
};

export function useAutoPosition(
  anchorElement: Ref<HTMLElement | null>,
  targetElement: Ref<HTMLElement | null>,
  position: PositionXY | ComputedRef<PositionXY>,
  preferredPosition: PositionXY | ComputedRef<PositionXY>,
) {
  const localAnchorElement = computed(() => toValue(anchorElement));
  const localTargetElement = computed(() => toValue(targetElement));
  const localPosition = computed(() => toValue(position));
  const localPreferredPosition = computed(() => toValue(preferredPosition));

  const preferredOpenDirectionY = ref(localPreferredPosition.value?.y || Position.Bottom);
  const preferredOpenDirectionX = ref(localPreferredPosition.value?.x || Position.Left);

  const isTop = computed(() => {
    if (localPosition.value.y !== Position.Auto) {
      return localPosition.value.y === Position.Top;
    }

    return preferredOpenDirectionY.value === Position.Top;
  });

  const isLeft = computed(() => {
    if (localPosition.value.x !== Position.Auto) {
      return localPosition.value.x === Position.Left;
    }

    return preferredOpenDirectionX.value === Position.Left;
  });

  const isBottom = computed(() => {
    if (localPosition.value.y !== Position.Auto) {
      return localPosition.value.y === Position.Bottom;
    }

    return preferredOpenDirectionY.value === Position.Bottom;
  });

  const isRight = computed(() => {
    if (localPosition.value.x !== Position.Auto) {
      return localPosition.value.x === Position.Right;
    }

    return preferredOpenDirectionX.value === Position.Right;
  });

  function adjustPositionY(): void {
    if (isSSR || !localAnchorElement.value || !localTargetElement.value) return;

    const spaceAbove = localAnchorElement.value.getBoundingClientRect().top;
    const spaceBelow = window.innerHeight - localAnchorElement.value.getBoundingClientRect().bottom;
    const hasEnoughSpaceBelow =
      spaceBelow > localTargetElement.value.getBoundingClientRect().height;
    const hasEnoughSpaceAbove =
      spaceAbove > localTargetElement.value.getBoundingClientRect().height;

    if (localPreferredPosition.value.y === Position.Bottom) {
      preferredOpenDirectionY.value =
        hasEnoughSpaceBelow || spaceBelow > spaceAbove ? Position.Bottom : Position.Top;
    }

    if (localPreferredPosition.value.y === Position.Top) {
      preferredOpenDirectionY.value =
        hasEnoughSpaceAbove || spaceAbove > spaceBelow ? Position.Top : Position.Bottom;
    }
  }

  function adjustPositionX(): void {
    if (isSSR || !localAnchorElement.value || !localTargetElement.value) return;

    const spaceRight = localAnchorElement.value.getBoundingClientRect().right;
    const spaceLeft = window.innerWidth - localAnchorElement.value.getBoundingClientRect().left;
    const hasEnoughSpaceLeft = spaceLeft > localTargetElement.value.getBoundingClientRect().width;
    const hasEnoughSpaceRight = spaceRight > localTargetElement.value.getBoundingClientRect().width;

    if (localPreferredPosition.value.x === Position.Right) {
      preferredOpenDirectionX.value =
        hasEnoughSpaceRight || spaceRight > spaceLeft ? Position.Right : Position.Left;
    }

    if (localPreferredPosition.value.x === Position.Left) {
      preferredOpenDirectionX.value =
        hasEnoughSpaceLeft || spaceLeft > spaceRight ? Position.Left : Position.Right;
    }
  }

  return { isTop, isRight, isBottom, isLeft, adjustPositionY, adjustPositionX };
}
