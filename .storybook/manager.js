import { addons } from "storybook/manager-api";
import themeLight from "./themes/themeLight.js";
import themeDark from "./themes/themeDark.js";

const prefersColorSchemeDark = window.matchMedia("(prefers-color-scheme: dark)");

function setSystemTheme(theme) {
  addons.setConfig({
    theme: theme ? themeDark : themeLight,
    panelPosition: "right",
  });
}

setSystemTheme(prefersColorSchemeDark.matches);

prefersColorSchemeDark.addEventListener("change", (event) => {
  setSystemTheme(event.matches);
});
