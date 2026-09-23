# General utils

A set of small, framework-agnostic helpers exported from `vueless`.

### isSSR / isCSR

Two constant booleans (not functions) evaluated once when the module loads. Use them to guard environment-specific code.

```javascript
import { isSSR, isCSR } from "vueless";

if (isCSR) {
  localStorage.setItem("visited", "1"); // browser-only
}
```

* `isSSR` — `true` when running on the server (no `window`).
* `isCSR` — `true` when running in the browser. Exact inverse of `isSSR`.

### setTitle

Set the document title, optionally combined with a suffix (e.g. your app name).

```javascript
import { setTitle } from "vueless";

setTitle({ title: "Dashboard", suffix: "MyApp" }); // → "Dashboard / MyApp"
```

Accepts a single options object — all keys optional:

* `title` — main page title.
* `separator` — string placed between title and suffix (default `" / "`).
* `suffix` — trailing text such as the site/app name.

When `title` is empty, the document title is set to just the `suffix`. No-op on the server.

### getStored

SSR-safe wrapper over `localStorage.getItem`.

```javascript
import { getStored } from "vueless";

const theme = getStored("theme") ?? "light";
```

Returns the stored string, or `undefined` if the key is missing or running on the server.

### getRandomId

Generate a random, non-cryptographic identifier made of letters (A–Z, a–z).

```javascript
import { getRandomId } from "vueless";

const id = getRandomId();   // e.g. "QmZkRtBwLpKxNvA" (15 chars)
const short = getRandomId(6); // custom length
```

* `length` — desired id length (default `15`).

### getCookie / setCookie / deleteCookie

Read, write, and remove browser cookies.

```javascript
import { getCookie, setCookie, deleteCookie } from "vueless";

setCookie("lang", "en", { expires: new Date(Date.now() + 864e5), secure: true });

const lang = getCookie("lang"); // "en" | undefined

deleteCookie("lang");
```

* `getCookie(name)` — returns the decoded cookie value, or `undefined` if not found.
* `setCookie(name, value, attributes?)` — writes a cookie. `attributes` may include `expires` (a `Date` is converted to UTC), `path` (defaults to `"/"`), `max-age`, `secure`, etc. Boolean-`true` attributes are emitted as bare flags.
* `deleteCookie(name)` — immediately expires the cookie.

{% hint style="warning" %}
The cookie helpers access `document` directly and are client-side only — calling them during SSR will throw. Guard with `isCSR` if needed.
{% endhint %}

### createDebounce

Create a debounced version of a function that only fires after a period of inactivity.

```javascript
import { createDebounce } from "vueless";

const onSearch = createDebounce((query) => fetchResults(query), 300);

input.addEventListener("input", (e) => onSearch(e.target.value));
```

* `func` — the function to debounce.
* `ms` — delay in milliseconds.

Returns a new function that preserves the original argument types and `this` binding. Each call resets the timer, so `func` runs only once after `ms` of silence (trailing edge).

### hasSlotContent

Check whether a Vue slot actually renders non-empty content. Useful for conditionally rendering wrappers around optional slots.

```vue
<script setup>
import { computed, useSlots } from "vue";
import { hasSlotContent } from "vueless";

const slots = useSlots();
const showFooter = computed(() => hasSlotContent(slots.footer));
</script>
```

* `slot` — a Vue slot function (or `undefined`/`null`).
* `props` — optional props passed to the slot when evaluating it.

Returns `false` for missing slots or slots that render only comments, empty text, or empty fragments.
