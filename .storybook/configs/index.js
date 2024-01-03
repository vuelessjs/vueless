import { renderToHTML } from "vueless/service.storybook";
import { convertHexInRgb } from "vueless/service.ui";
import monoDocsTheme from "./themes/vueless.docs.theme";

import twConfig from "/tailwind.config.js";

const brandColor = twConfig.theme.colors.gray[900] || "#181C32";
const cssVariables = `--brand-color: ${convertHexInRgb(brandColor)}`;

export const decorators = [
  (story) => ({
    components: { story },
    template: `<div style="padding: 2rem 1.5rem 3rem 1.5rem; ${cssVariables}"><story/></div>`,
  }),
];

export const docs = {
  theme: monoDocsTheme,
  source: {
    transform: (src, { args, argTypes }) => renderToHTML(src, { args, argTypes }),
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
