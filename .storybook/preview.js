import { setup } from "@storybook/vue3";

import { backgrounds, docs, layout } from "./configs/main.config";
import { vue3SourceDecorator } from "./decorators/vue3SourceDecorator";

// Vue plugins
import { createVueless } from "vueless";

// Tailwind styles
import "./index.pcss";

// Create vueless instance
const vueless = createVueless();

// Create storybook app instance
const storybookApp = (app) => {
  app.use(vueless);
};

// Setup storybook
setup(storybookApp);

// Set storybook config
export default {
  decorators: [vue3SourceDecorator],
  parameters: {
    layout,
    docs,
    backgrounds,
    options: {
      storySort: (a, b) =>
        a.id === b.id
          ? 0
          : a.name === "Docs" && a.id.localeCompare(b.id, undefined, { numeric: true }),
    },
  },
};
