import { getArgTypes, getSlotNames, getSlotsFragment } from "../../utils/utilStorybook.js";

import UInputFile from "../../ui.form-input-file/UInputFile.vue";
import UCol from "../../ui.container-col/UCol.vue";

/**
 * The `UInputFile` component. | [View on GitHub](https://github.com/vuelessjs/vueless/tree/main/src/ui.form-input-file)
 */
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
};

const DefaultTemplate = (args) => ({
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
      ${args.slotTemplate || getSlotsFragment()}
    </UInputFile>
  `,
});

const EnumVariantTemplate = (args, { argTypes } = {}) => ({
  components: { UInputFile, UCol },
  setup() {
    return {
      args,
      options: argTypes[args.enum].options,
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
