import {
  getArgTypes,
  getSlotNames,
  getSlotsFragment,
  getDocsDescription,
} from "../../utils/storybook.ts";

import UFiles from "../../ui.text-files/UFiles.vue";

import type { Meta, StoryFn } from "@storybook/vue3";
import type { Props } from "../types.ts";

interface UFilesArgs extends Props {
  slotTemplate?: string;
}

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
  parameters: {
    ...getDocsDescription(UFiles.__name),
  },
} as Meta;

const DefaultTemplate: StoryFn<UFilesArgs> = (args: UFilesArgs) => ({
  components: { UFiles },
  setup() {
    const slots = getSlotNames(UFiles.__name);

    return { args, slots };
  },
  template: `
    <UFiles v-bind="args">
      ${args.slotTemplate || getSlotsFragment("")}
    </UFiles>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};
