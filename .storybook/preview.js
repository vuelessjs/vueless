import { setup } from "@storybook/vue3";

import { getRandomId } from "../src/utils/ui.ts";

import themeLight from "./themes/themeLight.js";
import themeDark from "./themes/themeDark.js";
import themeLightDocs from "./themes/themeLightDocs.js";
import { storyDarkModeDecorator } from "./decorators/storyDarkModeDecorator.js";
import { vue3SourceDecorator } from "./decorators/vue3SourceDecorator.js";

/* Tailwind styles */
import "./index.css";

/* Vue plugins */
import { createVueless } from "../src/index";
import { createRouter, createWebHistory } from "vue-router";

const vueless = createVueless();
const router = createRouter({ history: createWebHistory(), routes: [] });

/* Setup storybook */
setup((app) => {
  app.config.idPrefix = getRandomId();

  if (!app._context.config.globalProperties.$route) {
    app.use(router);
    app.use(vueless);
  }
});

/* Set storybook decorators */
export const decorators = [vue3SourceDecorator, storyDarkModeDecorator()];

/* Set storybook parameters */
export const parameters = {
  layout: "fullscreen",
  backgrounds: { disable: true },
  docs: {
    theme: themeLightDocs,
    source: { language: "html" },
  },
  darkMode: {
    light: themeLight,
    dark: themeDark,
    classTarget: "body",
    stylePreview: true,
  },
  options: {
    storySort: (a, b) => {
      const idA = a.id.split("--")[0];
      const idB = b.id.split("--")[0];

      return idA.localeCompare(idB, undefined, { numeric: true });
    },
  },
};
