export function loaderOverlayOn() {
  window.dispatchEvent(new Event("loaderOverlayOn"));
}

export function loaderOverlayOff() {
  window.dispatchEvent(new Event("loaderOverlayOff"));
}
