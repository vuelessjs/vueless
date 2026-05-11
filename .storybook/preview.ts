import { getRandomId } from "vueless";
import { vue3SourceDecorator, storyDarkModeDecorator } from "@vueless/storybook";
import { getThemeDark, getThemeLight, getThemeLightPreview } from "@vueless/storybook/themes";
import { setup } from "@storybook/vue3-vite";

import type { Preview } from "@storybook/vue3-vite";

/* Theme styles */
import "./theme/theme.css";
import "@vueless/storybook/preview.css";
import { theme } from "./theme/theme";

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
      theme: getThemeLightPreview(theme),
      source: { language: "html" },
    },
    darkMode: {
      light: getThemeLight(theme),
      dark: getThemeDark(theme),
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
