# Notifications

Programmatically trigger toast notifications rendered by the `UNotify` component. All notify functions are client-side (they dispatch window events).

### notify

Show a notification with full control over its appearance.

```javascript
import { notify } from "vueless";

notify({
  type: "success",
  label: "Saved",
  description: "Profile updated.",
  ignoreDuplicates: true,
});
```

Accepts a config object (all fields optional):

| Field              | Type      | Description                                                      |
| ------------------ | --------- | ---------------------------------------------------------------- |
| `type`             | `string`  | `"success"`, `"warning"`, `"error"`, or `"info"`.                |
| `label`            | `string`  | Notification title.                                              |
| `description`      | `string`  | Notification body.                                               |
| `duration`         | `number`  | Display time in ms. Falls back to the global / default duration. |
| `ignoreDuplicates` | `boolean` | Skip if an identical notification is already active.             |
| `notifyId`         | `string`  | Target a specific `UNotify` instance.                            |

### notifySuccess / notifyWarning / notifyInfo / notifyError

Convenience wrappers that call `notify()` with a fixed `type` and a type-appropriate default duration. They accept the same config as `notify` minus `type`.

```javascript
import { notifySuccess, notifyError } from "vueless";

notifySuccess({ label: "Done", description: "Changes saved." });
notifyError({ label: "Error", description: "Request failed." });
```

Default durations: success → short (4s), warning / info → medium (8s), error → long (12s). These fall back to the global `UNotify` config when defined.

### clearNotifications

Dismiss all visible notifications, optionally scoped to a single instance.

```javascript
import { clearNotifications } from "vueless";

clearNotifications();         // clear all (default instance)
clearNotifications("topbar"); // clear a specific instance by notifyId
```

### setDelayedNotify / getDelayedNotify

Queue a notification to be shown after a page navigation or reload. `setDelayedNotify` persists the config to `localStorage`; `getDelayedNotify` (typically called on mount) reads it, fires the notification, and clears the stored entry. Both are no-ops during SSR.

```javascript
import { setDelayedNotify, getDelayedNotify } from "vueless";

// Before navigating / reloading:
setDelayedNotify({ type: "success", description: "Logged in!" });

// On the next page (e.g. in onMounted):
getDelayedNotify();
```

Both accept an optional `notifyId` to scope storage to a specific instance.

### Enums

For convenience the following enums are exported:

```javascript
import { NotificationType, NotificationPosition, NotificationDuration } from "vueless";
```

**`NotificationType`** — `Success` `"success"`, `Warning` `"warning"`, `Error` `"error"`, `Info` `"info"`.

**`NotificationPosition`** — `Left` `"left"`, `Right` `"right"`, `Top` `"top"`, `Bottom` `"bottom"`, `Center` `"center"`.

**`NotificationDuration`** (ms) — `Short` `4000`, `Medium` `8000`, `Long` `12000`.
