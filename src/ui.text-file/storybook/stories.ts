import {
  getArgs,
  getArgTypes,
  getSlotNames,
  getSlotsFragment,
  getDocsDescription,
} from "../../utils/storybook.ts";

import UFile from "../../ui.text-file/UFile.vue";
import URow from "../../ui.container-row/URow.vue";
import UIcon from "../../ui.image-icon/UIcon.vue";
import UBadge from "../../ui.text-badge/UBadge.vue";

import tooltip from "../../directives/tooltip/vTooltip.ts";

import type { Meta, StoryFn } from "@storybook/vue3";
import type { Props } from "../types.ts";

interface UFileArgs extends Props {
  slotTemplate?: string;
  enum: "size";
}

export default {
  id: "4070",
  title: "Text & Content / File",
  component: UFile,
  args: {
    label: "Invoice_123.pdf",
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

    function showAlert() {
      return alert("File removed");
    }

    return { args, slots, showAlert };
  },
  template: `
    <UFile v-bind="args" @remove="() => showAlert()">
      ${args.slotTemplate || getSlotsFragment("")}
    </UFile>
  `,
});

const EnumTemplate: StoryFn<UFileArgs> = (args: UFileArgs, { argTypes }) => ({
  components: { UFile, URow },
  directives: { tooltip },
  setup: () => ({ args, argTypes, getArgs }),
  template: `
    <URow>
      <UFile
        v-for="option in argTypes?.[args.enum]?.options"
        v-bind="getArgs(args, option)"
        :key="option"
        v-tooltip="option"
      />
    </URow>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const ImageURL = DefaultTemplate.bind({});
ImageURL.args = {
  imageUrl: "https://cdn-icons-png.flaticon.com/256/11039/11039912.png",
};

export const Removable = DefaultTemplate.bind({});
Removable.args = { removable: true };

export const Sizes = EnumTemplate.bind({});
Sizes.args = { enum: "size" };

export const Slots: StoryFn<UFileArgs> = (args) => ({
  components: { UFile, URow, UBadge, UIcon },
  setup() {
    return { args };
  },
  template: `
    <URow>
      <UFile v-bind="args">
        <template #left>
          <UIcon name="info" color="warning" size="xs" />
        </template>
      </UFile>

      <UFile v-bind="args">
        <template #right>
          <UBadge label="File uploaded" color="success" size="sm" variant="subtle" right-icon="done_all" />
        </template>
      </UFile>
    </URow>
  `,
});
