import { getArgTypes, getSlotNames, getSlotsFragment } from "../../utils/utilStorybook.js";

import UFile from "../ui.text-file";

/**
 * The `UFile` component. | [View on GitHub](https://github.com/vuelessjs/vueless/tree/main/src/ui.text-file)
 */
export default {
  id: "4050",
  title: "Text & Content / File",
  component: UFile,
  args: {
    label: "some file text",
    url: "https://storybook.js.org/",
  },
  argTypes: {
    ...getArgTypes(UFile.name),
  },
};

const DefaultTemplate = (args) => ({
  components: { UFile },
  setup() {
    const slots = getSlotNames(UFile.name);

    return { args, slots };
  },
  template: `
    <UFile v-bind="args">
      ${args.slotTemplate || getSlotsFragment()}
    </UFile>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};
