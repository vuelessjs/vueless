# Platform detection

A set of constant booleans (not functions) that describe the current platform. Each is computed once when the module is first imported and is SSR-safe — on the server every flag is `false`.

```javascript
import { isMac, isWindows } from "vueless";

const shortcutLabel = isMac ? "⌘ + K" : "Ctrl + K";
```

{% hint style="warning" %}
These are boolean values, so use them directly (`if (isMac)`). Do **not** call them — `isMac()` will throw.
{% endhint %}

| Flag          | `true` when…                                                                       |
| ------------- | ---------------------------------------------------------------------------------- |
| `isMac`       | The platform is macOS. May also be `true` on iPadOS 13+ iPads (they report "Mac"). |
| `isWindows`   | The platform is Windows.                                                           |
| `isIOS`       | The device is an iPhone, iPad, or iPod (incl. iPadOS iPads reporting as "Mac").    |
| `isAndroid`   | The platform is Android.                                                           |
| `isPWA`       | The app runs as an installed standalone web app (iOS-standalone signal).           |
| `isMobileApp` | Aggregate of \`isPWA                                                               |

```javascript
import { isMobileApp, isIOS } from "vueless";

if (isMobileApp) enableTouchGestures();
if (isIOS) applyIOSScrollFix();
```

{% hint style="info" %}
Detection is best-effort: it relies on `navigator.userAgentData.platform` with a fallback to the deprecated `navigator.platform`.
{% endhint %}
