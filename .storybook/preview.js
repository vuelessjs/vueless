import { setup } from "@storybook/vue3";
import { backgrounds, docs, layout } from "./configs/main.config";
import { vue3SourceDecorator } from "./decorators/vue3SourceDecorator";

// Vue plugins
import { createStore } from "vuex";
import { createRouter, createWebHistory } from "vue-router";
import NotifyServiceDefault from "vueless/service.notify";
import i18nInstanceDefault from "vueless/service.i18n";

// Tailwind styles
import "../index.pcss";

// Common stores
import loader from "vueless/layout-ui.loader/store";
import loaderTop from "vueless/layout-ui.loader-top/store";
import breakpoint from "vueless/layout-ui.viewport/store";

// Create store instance
const store = createStore({
  modules: { loader, loaderTop, breakpoint },
});

// Create router instance
const router = createRouter({
  history: createWebHistory("/"),
  routes: [{ path: "/:pathMatch(.*)*", component: () => import("vueless/ui.container-page") }],
});

// Create storybook app instance
const storybookApp = (app) => {
  app.use(store);
  app.use(router);
  app.use(new i18nInstanceDefault().i18nInstance);
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
      storySort: {
        order: [
          "Buttons & Links",
          ["Button", "Button Group", "Button Group Item", "Button Expand", "Button Expand Item", "Link"],

          "Dropdowns",
          ["Dropdown Button", "Dropdown Tag", "Dropdown Link", "Dropdown Item", "Dropdown List"],

          "Form Inputs & Controls",
          ["Input", "Input File", "Input Money", "Input Search", "Input Number", "Input Rating", "Textarea", "Select", "Multiselect", "Checkbox", "Checkbox Group", "Checkbox Multistate", "Switch", "Radio", "Radio Card", "Radio Group", "Date Picker", "Date Picker Range"],

          "Text & Content",
          ["Header", "Text", "Alert", "Money", "File", "Files", "Field"],

          "Containers",
          ["Divider", "Row", "Group", "Groups", "Accordion", "Card", "Modal", "Modal Confirm", "Page"],

          "Images & Icons",
          ["Icon", "Logo", "Avatar"],

          "Data",
          ["Table", "Data List"],

          "Navigation",
          ["Tab", "Tabs", "Stepper", "Pagination"],

          "Other",
          ["Dot", "Loader"],
        ],
      },
    },
  },
};
