import {
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

const EnumVariantTemplate: StoryFn<UFilesArgs> = (args: UFilesArgs, { argTypes }) => ({
  components: { UFiles, URow },
  setup() {
    return { args, options: argTypes?.[args.enum]?.options };
  },
  template: `
    <URow>
      <UFiles
        v-for="(option, index) in options"
        :key="index"
        v-bind="args"
        :[args.enum]="option"
        :label="option"
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

export const Sizes = EnumVariantTemplate.bind({});
Sizes.args = { enum: "size" };

export const LabelPlacement = EnumVariantTemplate.bind({});
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
        <UIcon v-if="index === 0" name="info" internal="storybook" color="warning" size="xs" />
      </template>
      <template #right="{ index }">
        <UIcon v-if="index === 1" name="check_circle" internal="storybook" color="success" size="xs" />
      </template>
    </UFiles>
  `,
});
