export function loaderOverlayOn(): void {
  window.dispatchEvent(new Event("loaderOverlayOn"));
}

export function loaderOverlayOff(): void {
  window.dispatchEvent(new Event("loaderOverlayOff"));
}
