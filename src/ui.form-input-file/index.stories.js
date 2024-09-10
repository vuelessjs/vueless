import { getArgTypes, getSlotNames, getSlotsFragment } from "../utils/utilstorybook";

import UInputFile from "../ui.form-input-file";
import UCol from "../ui.container-col";

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
    ...getArgTypes(UInputFile.name),
  },
};

const DefaultTemplate = (args) => ({
  components: { UInputFile },
  setup() {
    const slots = getSlotNames(UInputFile.name);

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

export const multiple = DefaultTemplate.bind({});
multiple.args = { multiple: true };

export const allowedFileTypes = DefaultTemplate.bind({});
allowedFileTypes.args = { allowedFileTypes: ["png", "jpeg"], label: "Allow only png and jpeg" };

export const error = DefaultTemplate.bind({});
error.args = { error: "some error" };

export const sizes = EnumVariantTemplate.bind({});
sizes.args = { enum: "size" };

export const labelAlign = EnumVariantTemplate.bind({});
labelAlign.args = { enum: "labelAlign" };

export const slotLeft = DefaultTemplate.bind({});
slotLeft.args = {
  slotTemplate: `
    <template #left>
      🤘
    </template>
  `,
};
