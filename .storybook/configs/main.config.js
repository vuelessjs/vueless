import vuelessDocsTheme from "../themes/vueless.docs.theme.js";
import colors from "tailwindcss/colors.js";

export const docs = {
  theme: vuelessDocsTheme,
  source: {
    language: "html",
  },
};

export const backgrounds = {
  default: "white",
  values: [
    { name: "white", value: colors.white },
    { name: "light", value: colors.gray[50] },
    { name: "dark", value: colors.gray[900] },
  ],
};

export const layout = "fullscreen";
