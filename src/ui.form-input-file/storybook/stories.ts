import {
  getArgTypes,
  getSlotNames,
  getSlotsFragment,
  getDocsDescription,
} from "../../utils/storybook.ts";

import UInputFile from "../../ui.form-input-file/UInputFile.vue";
import UCol from "../../ui.container-col/UCol.vue";

import type { Meta, StoryFn } from "@storybook/vue3";
import type { Props } from "../types.ts";

interface UInputFileArgs extends Props {
  slotTemplate?: string;
  enum: "labelAlign" | "size";
}

export default {
  id: "30232",
  title: "Form Inputs & Controls / Input File",
  component: UInputFile,
  args: {
    label: "Vueless file input",
  },
  argTypes: {
    ...getArgTypes(UInputFile.__name),
  },
  parameters: {
    ...getDocsDescription(UInputFile.__name),
  },
} as Meta;

const DefaultTemplate: StoryFn<UInputFileArgs> = (args: UInputFileArgs) => ({
  components: { UInputFile },
  setup() {
    const slots = getSlotNames(UInputFile.__name);

    return { args, slots };
  },
  data() {
    return {
      files: [],
      error: args.error || "",
    };
  },
  template: `
    <UInputFile
      v-bind="args"
      v-model="files"
      v-model:error="error"
    >
      ${args.slotTemplate || getSlotsFragment("")}
    </UInputFile>
  `,
});

const EnumVariantTemplate: StoryFn<UInputFileArgs> = (args: UInputFileArgs, { argTypes }) => ({
  components: { UInputFile, UCol },
  setup() {
    return {
      args,
      options: argTypes?.[args.enum]?.options,
    };
  },
  template: `
    <UCol gap="xl">
      <div v-for="(option, index) in options" :key="index">
        <UInputFile
          v-bind="args"
          :[args.enum]="option"
          :label="option"
        />
      </div>
    </UCol>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const Multiple = DefaultTemplate.bind({});
Multiple.args = { multiple: true };

export const AllowedFileTypes = DefaultTemplate.bind({});
AllowedFileTypes.args = { allowedFileTypes: ["png", "jpeg"], label: "Allow only png and jpeg" };

export const Error = DefaultTemplate.bind({});
Error.args = { error: "some error" };

export const Sizes = EnumVariantTemplate.bind({});
Sizes.args = { enum: "size" };

export const LabelAlign = EnumVariantTemplate.bind({});
LabelAlign.args = { enum: "labelAlign" };

export const SlotLeft = DefaultTemplate.bind({});
SlotLeft.args = {
  slotTemplate: `
    <template #left>
      🤘
    </template>
  `,
};
