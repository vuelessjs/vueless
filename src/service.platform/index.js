const isBrowser = typeof window !== "undefined";
const isMac = isBrowser && checkIsMac();
const isPWA = isBrowser && checkIsPWA();
const isIOS = isBrowser && checkIsIOS();
const isWindows = isBrowser && checkIsWindows();
const isAndroid = isBrowser && checkIsAndroid();
const isMobileApp = isPWA || isIOS || isAndroid;

function checkIsWindows() {
  return getPlatform().toUpperCase().indexOf("WINDOWS") >= 0;
}

function checkIsMac() {
  return getPlatform().toUpperCase().indexOf("MAC") >= 0;
}

function checkIsPWA() {
  return !!navigator.standalone;
}

function checkIsIOS() {
  const iOSDevices = [
    "iPad Simulator",
    "iPhone Simulator",
    "iPod Simulator",
    "iPad",
    "iPhone",
    "iPod",
  ];

  const platform = getPlatform();
  const isIpodIOS13 = platform.includes("Mac") && "ontouchend" in document;

  return iOSDevices.includes(platform) || isIpodIOS13;
}

function checkIsAndroid() {
  return getPlatform().toUpperCase().indexOf("ANDROID") >= 0;
}

function getPlatform() {
  return navigator.userAgentData?.platform || navigator.platform || "unknown";
}

export { isBrowser, isMac, isPWA, isIOS, isAndroid, isMobileApp, isWindows };
