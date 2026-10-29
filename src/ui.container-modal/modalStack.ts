import { nextTick } from "vue";

// Modal instances share the document's scroll lock and keyboard handling.
const activeModals = new Map<symbol, () => void>();
let previousOverflow = "";

export function registerModal(id: symbol, focus: () => void): void {
  if (!activeModals.size) previousOverflow = document.body.style.overflow;

  activeModals.delete(id);
  activeModals.set(id, focus);
  document.body.style.overflow = "hidden";
}

export function unregisterModal(id: symbol): void {
  const wasTopModal = isTopModal(id);

  if (!activeModals.delete(id)) return;

  if (!activeModals.size) document.body.style.overflow = previousOverflow;
  else if (wasTopModal) {
    const previousId = Array.from(activeModals.keys()).at(-1);

    nextTick(() => {
      if (previousId && isTopModal(previousId)) {
        activeModals.get(previousId)?.();
      }
    });
  }
}

export function isTopModal(id: symbol): boolean {
  return Array.from(activeModals.keys()).at(-1) === id;
}
