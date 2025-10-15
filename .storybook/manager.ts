import { addons } from "storybook/manager-api";

/* Theme styles */
import "./themes/manager.css";
import { themeDark } from "./themes/themeDark";
import { themeLight } from "./themes/themeLight";

const DARK_MODE_KEY = "dark";
const LIGHT_MODE_KEY = "light";

/* Set Storybook manager theme when system color mode changed. */
const prefersColorSchemeDark = window.matchMedia("(prefers-color-scheme: dark)");
const systemColorMode = getSystemColorMode(prefersColorSchemeDark.matches);

setSystemTheme(systemColorMode);

prefersColorSchemeDark.addEventListener("change", (event) => {
  const sbAddonThemesConfig = localStorage.getItem("sb-addon-themes-3") || "{}";
  const storybookColorMode = JSON.parse(sbAddonThemesConfig).current || LIGHT_MODE_KEY;
  const systemColorMode = getSystemColorMode(event.matches);

  setSystemTheme(storybookColorMode || systemColorMode);
});

function setSystemTheme(colorMode: string) {
  addons.setConfig({
    theme: colorMode === DARK_MODE_KEY ? themeDark : themeLight,
    panelPosition: "right",
  });
}

function getSystemColorMode(isDarkMode: boolean) {
  return isDarkMode ? DARK_MODE_KEY : LIGHT_MODE_KEY;
}

/* Change the Storybook manager favicon when system color mode changed. */
prefersColorSchemeDark.addEventListener("change", setFavicon);

setFavicon();

function setFavicon() {
  const link = document.createElement("link");

  link.rel = "icon";
  link.type = "image/svg+xml";
  link.href = prefersColorSchemeDark.matches
    ? "/favicons/favicon-dark.svg"
    : "/favicons/favicon-light.svg";

  document.head.appendChild(link);
}

/* This trick prevents showing users the default storybook theme. */
window.onload = () => {
  setTimeout(() => {
    const rootElement = document.getElementById("root");
    const vuelessLoader = document.getElementById("sb-vueless-loader");

    if (rootElement) rootElement.style.visibility = "visible";
    if (vuelessLoader) vuelessLoader.style.display = "none";
  }, 1500);
};
