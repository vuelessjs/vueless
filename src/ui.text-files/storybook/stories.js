import { getArgTypes, getSlotNames, getSlotsFragment } from "../../utils/utilStorybook.ts";

import UFiles from "../../ui.text-files/UFiles.vue";

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
    ...getArgTypes(UFiles.__name),
  },
};

const DefaultTemplate = (args) => ({
  components: { UFiles },
  setup() {
    const slots = getSlotNames(UFiles.__name);

    return { args, slots };
  },
  template: `
    <UFiles v-bind="args">
      ${args.slotTemplate || getSlotsFragment()}
    </UFiles>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};
