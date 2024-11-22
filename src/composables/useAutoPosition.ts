import { computed, toValue, ref } from "vue";
import { isSSR } from "../utils/helper.ts";

import type { ComputedRef, MaybeRef, Reactive } from "vue";

export enum Direction {
  Left = "left",
  Right = "right",
  Top = "top",
  Bottom = "bottom",
  Auto = "auto",
}

export type Align = `${Direction}`;
export type Position = { x: Align; y: Align };

export function useAutoPosition(
  anchorElement: MaybeRef<HTMLElement | null>,
  targetElement: MaybeRef<HTMLElement | null>,
  position: Reactive<Position> | ComputedRef<Position>,
  preferredPosition: Reactive<Position> | ComputedRef<Position>,
) {
  const localAnchorElement = computed(() => toValue(anchorElement));
  const localTargetElement = computed(() => toValue(targetElement));
  const localPosition = computed(() => toValue(position));
  const localPreferredPosition = computed(() => toValue(preferredPosition));

  const preferredOpenDirectionY = ref(localPreferredPosition.value.y || Direction.Bottom);
  const preferredOpenDirectionX = ref(localPreferredPosition.value.x || Direction.Left);

  const isTop = computed(() => {
    if (localPosition.value.y !== Direction.Auto) {
      return localPosition.value.y === Direction.Top;
    }

    return preferredOpenDirectionY.value === Direction.Top;
  });

  const isLeft = computed(() => {
    if (localPosition.value.x !== Direction.Auto) {
      return localPosition.value.x === Direction.Left;
    }

    return preferredOpenDirectionX.value === Direction.Left;
  });

  const isBottom = computed(() => {
    if (localPosition.value.y !== Direction.Auto) {
      return localPosition.value.y === Direction.Bottom;
    }

    return preferredOpenDirectionY.value === Direction.Bottom;
  });

  const isRight = computed(() => {
    if (localPosition.value.x !== Direction.Auto) {
      return localPosition.value.x === Direction.Right;
    }

    return preferredOpenDirectionX.value === Direction.Right;
  });

  function adjustPositionY() {
    if (isSSR || !localAnchorElement.value || !localTargetElement.value) return;

    const spaceAbove = localAnchorElement.value.getBoundingClientRect().top;
    const spaceBelow = window.innerHeight - localAnchorElement.value.getBoundingClientRect().bottom;
    const hasEnoughSpaceBelow =
      spaceBelow > localTargetElement.value.getBoundingClientRect().height;
    const hasEnoughSpaceAbove =
      spaceAbove > localTargetElement.value.getBoundingClientRect().height;

    if (localPreferredPosition.value.y === Direction.Bottom) {
      preferredOpenDirectionY.value =
        hasEnoughSpaceBelow || spaceBelow > spaceAbove ? Direction.Bottom : Direction.Top;
    }

    if (localPreferredPosition.value.y === Direction.Top) {
      preferredOpenDirectionY.value =
        hasEnoughSpaceAbove || spaceAbove > spaceBelow ? Direction.Top : Direction.Bottom;
    }
  }

  function adjustPositionX() {
    if (isSSR || !localAnchorElement.value || !localTargetElement.value) return;

    const spaceRight = localAnchorElement.value.getBoundingClientRect().right;
    const spaceLeft = window.innerWidth - localAnchorElement.value.getBoundingClientRect().left;
    const hasEnoughSpaceLeft = spaceLeft > localTargetElement.value.getBoundingClientRect().width;
    const hasEnoughSpaceRight = spaceRight > localTargetElement.value.getBoundingClientRect().width;

    if (localPreferredPosition.value.x === Direction.Right) {
      preferredOpenDirectionX.value =
        hasEnoughSpaceRight || spaceRight > spaceLeft ? Direction.Right : Direction.Left;
    }

    if (localPreferredPosition.value.x === Direction.Left) {
      preferredOpenDirectionX.value =
        hasEnoughSpaceLeft || spaceLeft > spaceRight ? Direction.Left : Direction.Right;
    }
  }

  return { isTop, isRight, isBottom, isLeft, adjustPositionY, adjustPositionX };
}
