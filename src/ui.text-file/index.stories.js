import { getArgTypes } from "vueless/service.storybook";

import UFile from "vueless/ui.text-file";

export default {
  title: "Text & Content / File",
  component: UFile,
  args: {
    text: "some file text",
    url: "https://storybook.js.org/",
  },
  argTypes: {
    ...getArgTypes(UFile.name),
  },
};

const DefaultTemplate = (args) => ({
  components: { UFile },
  setup() {
    return { args };
  },
  template: `
    <UFile v-bind="args" />
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};
