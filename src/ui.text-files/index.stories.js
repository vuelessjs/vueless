import { getArgTypes, getSlotsFragment } from "../service.storybook";

import UFiles from "../ui.text-files";

/**
 * The `UFiles` component. | [View on GitHub](https://github.com/vuelessjs/vueless/tree/main/src/ui.text-files)
 */
export default {
  id: "4060",
  title: "Text & Content / Files",
  component: UFiles,
  args: {
    label: "Label",
    fileList: [
      new File(["foo"], "foo.txt", { type: "text/plain" }),
      new File(["bar"], "foo.txt", { type: "text/plain" }),
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
    <UFiles v-bind="args">
      ${args.slotTemplate || getSlotsFragment()}
    </UFiles>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};
