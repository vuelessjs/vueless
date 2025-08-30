import { storyDarkModeDecorator, vue3SourceDecorator } from "@vueless/storybook";
import { getRandomId } from "vueless";
import { setup } from "@storybook/vue3-vite";

import type { Preview } from "@storybook/vue3-vite";

/* Theme styles */
import "./themes/preview.css";
import { themeDark } from "./themes/themeDark";
import { themeLight } from "./themes/themeLight";
import { themeLightPreview } from "./themes/themeLightPreview";

/* Vue plugins */
import { createVueless } from "vueless";
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

export default {
  /* Set storybook decorators */
  decorators: [vue3SourceDecorator, storyDarkModeDecorator],

  /* Set storybook tags */
  tags: ["autodocs"],

  /* Set storybook parameters */
  parameters: {
    layout: "fullscreen",
    backgrounds: { disable: true },
    docs: {
      theme: themeLightPreview,
      source: { language: "html" },
    },
    darkMode: {
      light: themeLight,
      dark: themeDark,
      classTarget: "body",
      stylePreview: true,
    },
    options: {
      // @ts-expect-error: Storybook types are not correct.
      storySort: (a, b) => {
        const idA = a.id.split("--")[0];
        const idB = b.id.split("--")[0];

        return idA.localeCompare(idB, undefined, { numeric: true });
      },
    },
  },
} as Preview;

/* Reload the page on the error "Failed to fetch dynamically imported module..." */
window.addEventListener("error", (ev) => onFailedToFetchModule(ev.message));
window.addEventListener("unhandledrejection", (ev) => onFailedToFetchModule(ev?.reason?.message));

function onFailedToFetchModule(message: string) {
  const isProd = import.meta.env.MODE === "production";

  if (isProd && message?.includes("Failed to fetch dynamically imported module")) {
    window.location.reload();
  }
}
