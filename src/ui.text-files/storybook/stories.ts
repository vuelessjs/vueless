import {
  getArgs,
  getArgTypes,
  getSlotNames,
  getSlotsFragment,
  getDocsDescription,
} from "../../utils/storybook";

import UFiles from "../../ui.text-files/UFiles.vue";
import URow from "../../ui.container-row/URow.vue";
import UCol from "../../ui.container-col/UCol.vue";
import UIcon from "../../ui.image-icon/UIcon.vue";
import UText from "../../ui.text-block/UText.vue";
import ULink from "../../ui.button-link/ULink.vue";

import type { Meta, StoryFn } from "@storybook/vue3-vite";
import type { Props } from "../types";

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

export const Slots: StoryFn<UFilesArgs> = (args) => ({
  components: { UFiles, URow, UCol, UIcon, UText, ULink },
  setup() {
    return { args };
  },
  template: `
    <UCol gap="3xl">
      <URow block>
        <UFiles v-bind="args">
          <template #before-file="{ index }">
            <UIcon v-if="index === 0" name="info" color="warning" size="xs" />
            <UIcon v-if="index === 1" name="check_circle" color="success" size="xs" />
          </template>
        </UFiles>

        <UFiles v-bind="args">
          <template #after-file="{ index }">
            <UIcon v-if="index === 0" name="info" color="warning" size="xs" />
            <UIcon v-if="index === 1" name="check_circle" color="success" size="xs" />
          </template>
        </UFiles>
      </URow>

      <UFiles v-bind="args" label="Documents">
        <template #description>
          <URow align="center" gap="2xs" class="text-neutral">
            <UIcon name="folder" size="xs" class="mt-0.5" color="primary" />
            <UText size="sm">
              Files are read-only here.
              <ULink label="Manage in storage" underlined size="sm" />.
            </UText>
          </URow>
        </template>
      </UFiles>
    </UCol>
  `,
});
