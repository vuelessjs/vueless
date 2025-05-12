import {
  getArgs,
  getArgTypes,
  getSlotNames,
  getSlotsFragment,
  getDocsDescription,
} from "../../utils/storybook.ts";

import UFiles from "../../ui.text-files/UFiles.vue";
import URow from "../../ui.container-row/URow.vue";
import UIcon from "../../ui.image-icon/UIcon.vue";

import type { Meta, StoryFn } from "@storybook/vue3";
import type { Props } from "../types.ts";

interface UFilesArgs extends Props {
  slotTemplate?: string;
  enum: "size" | "labelAlign";
}

export default {
  id: "4080",
  title: "Text & Content / Files",
  component: UFiles,
  args: {
    label: "Documents",
    fileList: [
      new File(["Company_Report_2025"], "Company_Report_2025.pdf", { type: "application/pdf" }),
      new File(["Employee_Resumes"], "Employee_Resumes.xlsx", {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      }),
    ],
  },
  argTypes: {
    ...getArgTypes(UFiles.__name),
  },
  parameters: {
    docs: {
      ...getDocsDescription(UFiles.__name),
    },
  },
} as Meta;

const DefaultTemplate: StoryFn<UFilesArgs> = (args: UFilesArgs) => ({
  components: { UFiles },
  setup: () => ({ args, slots: getSlotNames(UFiles.__name) }),
  template: `
    <UFiles v-bind="args">
      ${args.slotTemplate || getSlotsFragment("")}
    </UFiles>
  `,
});

const EnumTemplate: StoryFn<UFilesArgs> = (args: UFilesArgs, { argTypes }) => ({
  components: { UFiles, URow },
  setup: () => ({ args, argTypes, getArgs }),
  template: `
    <URow>
      <UFiles
        v-for="option in argTypes?.[args.enum]?.options"
        v-bind="getArgs(args, option)"
        :key="option"
      />
    </URow>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const Description = DefaultTemplate.bind({});
Description.args = {
  description: "These files include important documents like reports and employee data.",
};

export const Removable = DefaultTemplate.bind({});
Removable.args = { removable: true };

export const Sizes = EnumTemplate.bind({});
Sizes.args = { enum: "size" };

export const LabelPlacement = EnumTemplate.bind({});
LabelPlacement.args = {
  enum: "labelAlign",
  description: "These files include important documents like reports and employee data.",
};

export const Slots: StoryFn<UFilesArgs> = (args) => ({
  components: { UFiles, URow, UIcon },
  setup() {
    return { args };
  },
  template: `
    <UFiles v-bind="args">
      <template #left="{ index }">
        <UIcon v-if="index === 0" name="info" color="warning" size="xs" />
      </template>
      <template #right="{ index }">
        <UIcon v-if="index === 1" name="check_circle" color="success" size="xs" />
      </template>
    </UFiles>
  `,
});
