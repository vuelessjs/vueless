export function loaderRenderingOn() {
  window.dispatchEvent(new Event("setRenderingStarted"));
}

export function loaderRenderingOff() {
  window.dispatchEvent(new Event("setRenderingFinished"));
}
