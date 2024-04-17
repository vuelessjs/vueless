import { getArgTypes } from "../service.storybook";

import UFiles from "../ui.text-files";

export default {
  id: "4060",
  title: "Text & Content / Files",
  component: UFiles,
  args: {
    label: "Label",
    options: [
      { text: "some file text 1", url: "https://storybook.js.org/" },
      { text: "some file text 2", url: "https://storybook.js.org/" },
    ],
  },
  argTypes: {
    ...getArgTypes(UFiles.name),
  },
};

const DefaultTemplate = (args) => ({
  components: { UFiles },
  setup() {
    return { args };
  },
  template: `
    <UFiles v-bind="args" />
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};
