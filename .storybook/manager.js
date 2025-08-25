import { addons } from "storybook/manager-api";

/* Theme styles */
import "./themes/manager.css";
import themeDark from "./themes/themeDark.js";
import themeLight from "./themes/themeLight.js";

/* Set Storybook manager theme when system color mode changed. */
const prefersColorSchemeDark = window.matchMedia("(prefers-color-scheme: dark)");

function setSystemTheme(colorMode) {
  addons.setConfig({
    theme: colorMode === "dark" ? themeDark : themeLight,
    panelPosition: "right",
  });
}

setSystemTheme(prefersColorSchemeDark.matches);

prefersColorSchemeDark.addEventListener("change", (event) => {
  const sbAddonThemesConfig = localStorage.getItem("sb-addon-themes-3") || "{}";
  const storybookColorMode = JSON.parse(sbAddonThemesConfig).current || "light";
  const systemColorMode = event.matches ? "dark" : "light";

  setSystemTheme(storybookColorMode || systemColorMode);
});
