import { getArgTypes } from "vueless/service.storybook";

import UPagination from "vueless/ui.navigation-pagination";

export default {
  title: "Navigation / Pagination",
  component: UPagination,
  args: {
    total: 90,
  },
  argTypes: {
    ...getArgTypes(UPagination.name),
  },
};

const DefaultTemplate = (args) => ({
  components: { UPagination },
  setup() {
    return { args };
  },
  template: `
    <UPagination v-bind="args" @pageChange="onChange"/>
  `,
  methods: {
    onChange(value) {
      this.currentPage = value;
    },
  },
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const perPage1 = DefaultTemplate.bind({});
perPage1.args = { perPage: 1 };
