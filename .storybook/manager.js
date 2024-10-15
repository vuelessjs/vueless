import { addons } from "@storybook/manager-api";
import themeLight from "./themes/themeLight.js";

addons.setConfig({
  theme: themeLight,
  panelPosition: "right",
});
