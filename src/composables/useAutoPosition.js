import { computed, toValue, ref } from "vue";
import { isSSR } from "../utils/utilHelper.js";

export const POSITION = {
  left: "left",
  right: "right",
  top: "top",
  bottom: "bottom",
  auto: "auto",
};

export function useAutoPosition(anchorElement, targetElement, position, preferredPosition) {
  const localAnchorElement = computed(() => toValue(anchorElement));
  const localTargetElement = computed(() => toValue(targetElement));
  const localPosition = computed(() => toValue(position));
  const localPreferredPosition = computed(() => toValue(preferredPosition));

  const preferredOpenDirectionY = ref(localPreferredPosition.value?.y || POSITION.bottom);
  const preferredOpenDirectionX = ref(localPreferredPosition.value?.x || POSITION.left);

  const isTop = computed(() => {
    if (localPosition.value.y !== POSITION.auto) {
      return localPosition.value.y === POSITION.top;
    }

    return preferredOpenDirectionY.value === POSITION.top;
  });

  const isLeft = computed(() => {
    if (localPosition.value.x !== POSITION.auto) {
      return localPosition.value.x === POSITION.left;
    }

    return preferredOpenDirectionX.value === POSITION.left;
  });

  const isBottom = computed(() => {
    if (localPosition.value.y !== POSITION.auto) {
      return localPosition.value.y === POSITION.bottom;
    }

    return preferredOpenDirectionY.value === POSITION.bottom;
  });

  const isRight = computed(() => {
    if (localPosition.value.x !== POSITION.auto) {
      return localPosition.value.x === POSITION.right;
    }

    return preferredOpenDirectionX.value === POSITION.right;
  });

  function adjustPositionY() {
    if (isSSR) return;

    const spaceAbove = localAnchorElement.value.getBoundingClientRect().top;
    const spaceBelow = window.innerHeight - localAnchorElement.value.getBoundingClientRect().bottom;
    const hasEnoughSpaceBelow =
      spaceBelow > localTargetElement.value.getBoundingClientRect().height;
    const hasEnoughSpaceAbove =
      spaceAbove > localTargetElement.value.getBoundingClientRect().height;

    if (localPreferredPosition.value.y === POSITION.top) {
      preferredOpenDirectionY.value =
        hasEnoughSpaceBelow || spaceBelow > spaceAbove ? POSITION.bottom : POSITION.top;
    }

    if (localPreferredPosition.value.y === POSITION.bottom) {
      preferredOpenDirectionY.value =
        hasEnoughSpaceAbove || spaceAbove > spaceBelow ? POSITION.top : POSITION.bottom;
    }
  }

  function adjustPositionX() {
    if (isSSR) return;

    const spaceRight = localAnchorElement.value.getBoundingClientRect().right;
    const spaceLeft = window.innerWidth - localAnchorElement.value.getBoundingClientRect().left;
    const hasEnoughSpaceLeft = spaceLeft > localTargetElement.value.getBoundingClientRect().width;
    const hasEnoughSpaceRight = spaceRight > localTargetElement.value.getBoundingClientRect().width;

    if (localPreferredPosition.value.x === POSITION.left) {
      preferredOpenDirectionX.value =
        hasEnoughSpaceRight || spaceRight > spaceLeft ? POSITION.right : POSITION.left;
    }

    if (localPreferredPosition.value.x === POSITION.right) {
      preferredOpenDirectionX.value =
        hasEnoughSpaceLeft || spaceLeft > spaceRight ? POSITION.left : POSITION.right;
    }
  }

  return { isTop, isRight, isBottom, isLeft, adjustPositionY, adjustPositionX };
}
