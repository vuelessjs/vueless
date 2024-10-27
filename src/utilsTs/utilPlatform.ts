import { isCSR } from "./utilHelper";

interface ModernNavigator extends Navigator {
  standalone: string;
  userAgentData: {
    platform: string;
  };
}

const isWindows = isCSR && checkIsWindows();
const isMac = isCSR && checkIsMac();
const isPWA = isCSR && checkIsPWA();
const isIOS = isCSR && checkIsIOS();
const isAndroid = isCSR && checkIsAndroid();
const isMobileApp = isPWA || isIOS || isAndroid;

function checkIsWindows() {
  return getPlatform().toUpperCase().indexOf("WINDOWS") >= 0;
}

function checkIsMac() {
  return getPlatform().toUpperCase().indexOf("MAC") >= 0;
}

function checkIsPWA() {
  return !!(navigator as ModernNavigator).standalone;
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
  return (navigator as ModernNavigator).userAgentData?.platform || navigator.platform || "unknown";
}

export { isMac, isPWA, isIOS, isAndroid, isMobileApp, isWindows };
