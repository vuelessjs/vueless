# Auto position

### useAutoPosition

A composable that decides whether a floating element (dropdown, popover, tooltip, etc.) should open up/down and left/right, based on the available space around its anchor in the viewport. When an axis is set to `Direction.Auto`, it flips to the side with more room; otherwise it honors the explicit direction you pass.

```vue
<script setup>
import { ref, reactive, computed } from "vue";
import { useAutoPosition, Direction } from "vueless";

const anchorRef = ref(null);
const dropdownRef = ref(null);

const position = reactive({ x: Direction.Auto, y: Direction.Auto });
const preferredPosition = computed(() => ({ x: Direction.Left, y: Direction.Bottom }));

const { isTop, isBottom, isLeft, adjustPositionY, adjustPositionX } = useAutoPosition(
  anchorRef,
  dropdownRef,
  position,
  preferredPosition,
);

function open() {
  adjustPositionY();
  adjustPositionX();
}
</script>

<template>
  <button ref="anchorRef" @click="open">Toggle</button>
  <div
    ref="dropdownRef"
    :class="[isTop && 'bottom-full', isBottom && 'top-full', isLeft ? 'left-0' : 'right-0']"
  >
    Menu
  </div>
</template>
```

Arguments:

* `anchorElement` — the trigger element to position against.
* `targetElement` — the floating element being positioned (its measured size decides if there's room).
* `position` — the requested `{ x, y }` position; set an axis to `Direction.Auto` to enable automatic flipping for that axis.
* `preferredPosition` — the default `{ x, y }` to prefer in auto mode (defaults to bottom / left).

Returns:

| Property          | Type                   | Description                                                  |
| ----------------- | ---------------------- | ------------------------------------------------------------ |
| `isTop`           | `ComputedRef<boolean>` | `true` if the target should open upward.                     |
| `isBottom`        | `ComputedRef<boolean>` | `true` if it should open downward.                           |
| `isLeft`          | `ComputedRef<boolean>` | `true` if it should open to the left.                        |
| `isRight`         | `ComputedRef<boolean>` | `true` if it should open to the right.                       |
| `adjustPositionY` | `() => void`           | Recalculate vertical space (call on open / scroll / resize). |
| `adjustPositionX` | `() => void`           | Recalculate horizontal space.                                |

### Direction

The `Direction` enum is exported for setting positions:

```javascript
import { Direction } from "vueless";

Direction.Left;   // "left"
Direction.Right;  // "right"
Direction.Top;    // "top"
Direction.Bottom; // "bottom"
Direction.Auto;   // "auto" — let useAutoPosition choose
```
