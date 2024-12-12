import {
  getArgTypes,
  getSlotNames,
  getSlotsFragment,
  getDocsDescription,
} from "../../utils/storybook.ts";

import UFile from "../../ui.text-file/UFile.vue";

import type { Meta, StoryFn } from "@storybook/vue3";
import type { Props } from "../types.ts";

interface UFileArgs extends Props {
  slotTemplate?: string;
}

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
  parameters: {
    docs: {
      ...getDocsDescription(UFile.__name),
    },
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
