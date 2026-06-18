# Responsive Props

Use the `r()` shorthand to return a different value depending on the current screen breakpoint. It is reactive — Vue tracks the breakpoint as a dependency and re-renders the component whenever the window crosses a breakpoint (e.g. on resize or device rotation), so it can be used directly in templates.

```vue
<template>
  <UButton :size="r({ sm: 'sm', md: 'md', xl: 'lg' })">Click me</UButton>
</template>

<script setup>
import { r } from "vueless";
</script>
```

It accepts a config object that maps breakpoint names to values and returns the value matching the current breakpoint.

#### Breakpoints

The breakpoint names and their min-widths match Tailwind CSS defaults:

| Name  | Min width |
| ----- | --------- |
| `xs`  | `0px`     |
| `sm`  | `640px`   |
| `md`  | `768px`   |
| `lg`  | `1024px`  |
| `xl`  | `1280px`  |
| `2xl` | `1536px`  |

#### Resolution rules

`r()` is mobile-first and uses the nearest defined breakpoint that is less than or equal to the current one:

* You don't need to define every breakpoint — only the ones where the value changes. The value is carried upward until the next defined breakpoint.
* If the current breakpoint is **smaller** than the smallest one you defined, the smallest defined value is used.
* If the current breakpoint is **larger** than the largest one you defined, the largest defined value is used.
* If the config is empty, `r()` returns `undefined`.

```javascript
// Current breakpoint: lg (1024px)
r({ sm: "sm", md: "md", xl: "lg" }); // → "md"  (md carried up to lg, since xl is not yet reached)

// Current breakpoint: xs (mobile)
r({ md: "md", lg: "lg" }); // → "md"  (smaller than the smallest defined → smallest is used)

// Current breakpoint: 2xl
r({ sm: "sm", md: "md" }); // → "md"  (larger than the largest defined → largest is used)
```

{% hint style="info" %}
`r()` works with values of any type, not just strings — booleans, numbers, objects, arrays, etc. The return type is inferred from the values you pass in.
{% endhint %}

```vue
<template>
  <UCol :gap="r({ xs: 'sm', lg: 'lg' })">
    <UInput :size="r({ xs: 'sm', md: 'md' })" />
    <URow v-if="r({ xs: false, md: true })">...</URow>
  </UCol>
</template>

<script setup>
import { r } from "vueless";
</script>
```

### useBreakpoint

When you need the current breakpoint state in script (rather than picking a value), use the `useBreakpoint()` composable. It returns reactive computed flags and the current breakpoint name.

```vue
<script setup>
import { useBreakpoint } from "vueless";

const {
  breakpoint, // current breakpoint name: "xs" | "sm" | "md" | "lg" | "xl" | "2xl"
  isPhone, // xs
  isLargePhone, // sm
  isPhoneGroup, // xs or sm
  isPortraitTablet, // md
  isLandscapeTablet, // lg
  isTabletGroup, // md or lg
  isDesktop, // xl
  isLargeDesktop, // 2xl
  isDesktopGroup, // xl or 2xl
} = useBreakpoint();
</script>
```
