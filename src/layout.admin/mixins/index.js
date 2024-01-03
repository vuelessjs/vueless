import { getBasePath, layout } from "vueless/service.ui";
import store from "@/store";
import packageJson from "/package.json";

export default {
  computed: {
    layoutConfig() {
      const configKey = store.state.layout.configKey;

      return layout.admin[configKey] || layout.admin;
    },

    appName() {
      return packageJson.name;
    },

    appVersion() {
      return `v.${packageJson.version}`;
    },
  },

  methods: {
    checkCurrentPage(page) {
      return this.$route.name === page;
    },

    checkActivePage({ page, subItems }) {
      const parentRoute = page ? this.$router.resolve({ name: page }).href : page;
      const pageSubItems = subItems ? subItems.map((subItem) => subItem.page) : [];
      const { path: routePath, name: routeName } = this.$route;
      const path = `${getBasePath()}${routePath}`;

      return (
        this.checkCurrentPage(page) ||
        path.includes(parentRoute) ||
        pageSubItems.includes(routeName)
      );
    },

    getRoute({ page, subItems, link }) {
      const isActivePage = this.checkActivePage({ page, subItems });
      const isPresentSubItems = !!subItems?.length;
      const route = { name: "" };

      if (link) return;

      if (!this.checkCurrentPage(page) && (!isActivePage || !isPresentSubItems)) {
        route.name = page;
      }

      return route;
    },
  },
};
