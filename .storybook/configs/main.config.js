import monoDocsTheme from "../themes/vueless.docs.theme";

import twConfig from "/tailwind.config.js";

export const docs = {
  theme: monoDocsTheme,
  source: {
    language: "html",
  },
};

export const backgrounds = {
  default: "white",
  values: [
    { name: "white", value: twConfig.theme.colors.white },
    { name: "light", value: twConfig.theme.colors.gray[50] },
    { name: "dark", value: twConfig.theme.colors.gray[900] },
  ],
};

export const layout = "fullscreen";
