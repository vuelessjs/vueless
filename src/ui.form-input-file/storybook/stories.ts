import {
  getArgs,
  getArgTypes,
  getSlotNames,
  getSlotsFragment,
  getDocsDescription,
} from "../../utils/storybook.ts";

import UInputFile from "../../ui.form-input-file/UInputFile.vue";
import UCol from "../../ui.container-col/UCol.vue";
import UBadge from "../../ui.text-badge/UBadge.vue";
import UIcon from "../../ui.image-icon/UIcon.vue";

import type { Meta, StoryFn } from "@storybook/vue3";
import type { Props } from "../types.ts";

interface UInputFileArgs extends Props {
  slotTemplate?: string;
  enum: "labelAlign" | "size";
}

export default {
  id: "3020",
  title: "Form Inputs & Controls / Input File",
  component: UInputFile,
  args: {
    label: "Choose a file to upload",
    files: [],
  },
  argTypes: {
    ...getArgTypes(UInputFile.__name),
  },
  parameters: {
    docs: {
      ...getDocsDescription(UInputFile.__name),
    },
  },
} as Meta;

const DefaultTemplate: StoryFn<UInputFileArgs> = (args: UInputFileArgs) => ({
  components: { UInputFile, UBadge },
  setup: () => ({ args, slots: getSlotNames(UInputFile.__name) }),
  template: `
    <UInputFile v-bind="args" v-model="args.files">
      ${args.slotTemplate || getSlotsFragment("")}
    </UInputFile>
  `,
});

const EnumTemplate: StoryFn<UInputFileArgs> = (args: UInputFileArgs, { argTypes }) => ({
  components: { UInputFile, UCol },
  setup: () => ({ args, argTypes, getArgs }),
  template: `
    <UCol gap="xl">
      <UInputFile
        v-for="option in argTypes?.[args.enum]?.options"
        v-bind="getArgs(args, option)"
        :key="option"
      />
    </UCol>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const Description = DefaultTemplate.bind({});
Description.args = { description: "Ensure the document is clear and readable before uploading." };

export const Error = DefaultTemplate.bind({});
Error.args = { error: "Upload failed. Please try again later." };

export const Disabled = DefaultTemplate.bind({});
Disabled.args = { disabled: true };

export const Multiple = DefaultTemplate.bind({});
Multiple.args = { multiple: true };

export const MaxFileSize = DefaultTemplate.bind({});
MaxFileSize.args = {
  description: "File size limit is 5 MB.",
  maxFileSize: 5,
};

export const AllowedFileTypes = DefaultTemplate.bind({});
AllowedFileTypes.args = {
  allowedFileTypes: ["png", "jpeg"],
  description: "Only png and jpeg formats are allowed.",
};

export const Sizes = EnumTemplate.bind({});
Sizes.args = { enum: "size", label: "{enumValue}" };

export const LabelAlign = EnumTemplate.bind({});
LabelAlign.args = { enum: "labelAlign", label: "{enumValue}" };

export const LabelSlot = DefaultTemplate.bind({});
LabelSlot.args = {
  slotTemplate: `
    <template #label="{ label }">
      <UBadge :label="label" />
    </template>
  `,
};

export const Slots: StoryFn<UInputFileArgs> = (args) => ({
  components: { UInputFile, UCol, UBadge, UIcon },
  setup() {
    return { args };
  },
  template: `
    <UCol>
      <UInputFile
        v-bind="args"
        v-model="args.files"
        label="Slot Top"
      >
        <template #top>
          <UBadge label="Pending Review..." />
        </template>
      </UInputFile>

      <UInputFile
        v-bind="args"
        v-model="args.files"
        label="Slot Left"
      >
        <template #left>
          <UIcon name="info" color="warning" />
        </template>
      </UInputFile>

      <UInputFile
        v-bind="args"
        v-model="args.files"
        label="Slot Bottom"
      >
        <template #bottom>
          <UBadge label="An antivirus check will be performed after file upload." />
        </template>
      </UInputFile>
    </UCol>
  `,
});
