import { setup } from "@storybook/vue3";
import { backgrounds, docs, layout } from "./configs/main.config";
import { vue3SourceDecorator } from "./decorators/vue3SourceDecorator";

// Vue plugins
import { createStore } from "vuex";
import NotifyServiceDefault from "vueless/ui.notify/services";

// Tailwind styles
import "./index.pcss";

// Common stores
import loader from "vueless/ui.loader-rendering/store";
import loaderTop from "vueless/ui.other-loader-top/store";
import breakpoint from "vueless/ui.viewport/store";

// Create store instance
const store = createStore({
  modules: { loader, loaderTop, breakpoint },
});

// Create storybook app instance
const storybookApp = (app) => {
  app.use(store);
  app.use(new NotifyServiceDefault().notifyInstance);
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
      storySort: (a, b) => (a.id === b.id ? 0 : a.name === "Docs" && a.id.localeCompare(b.id, undefined, { numeric: true })),
    },
  },
};
