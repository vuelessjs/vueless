import type { Meta, StoryFn } from "@storybook/vue3";
import { getArgTypes, getSlotNames, getSlotsFragment } from "../../utils/storybook.ts";

import UFile from "../../ui.text-file/UFile.vue";

import type { UFileProps } from "../types.ts";

interface UFileArgs extends UFileProps {
  slotTemplate?: string;
}

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
    ...getArgTypes(UFile.__name),
  },
} as Meta;

const DefaultTemplate: StoryFn<UFileArgs> = (args: UFileArgs) => ({
  components: { UFile },
  setup() {
    const slots = getSlotNames(UFile.__name);

    return { args, slots };
  },
  template: `
    <UFile v-bind="args">
      ${args.slotTemplate || getSlotsFragment("")}
    </UFile>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};
