import { addons } from "@storybook/manager-api";
import vuelessTheme from "./themes/vueless.theme.js";

addons.setConfig({
  theme: vuelessTheme,
});
