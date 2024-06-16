import { getArgTypes } from "../service.storybook";

import UInputFile from "../ui.form-input-file";
import URow from "../ui.container-row";

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
  components: { UInputFile, URow },
  setup() {
    return { args };
  },
  data() {
    return {
      files: [],
      error: args.error || "",
    };
  },
  template: `
    <URow>
      <UInputFile
        v-bind="args"
        v-model="files"
        v-model:error="error"
      />
    </URow>
  `,
});

const LabelAlignTemplate = (args, { argTypes } = {}) => ({
  components: { UInputFile, URow },
  setup() {
    return {
      args,
      alignOptions: argTypes.labelAlign.options,
    };
  },
  template: `
    <URow class="!flex-col" gap="xl">
      <div v-for="(align, index) in alignOptions" :key="index">
        <UInputFile
          :label-align="align"
          v-bind="args"
          :label="align"
        />
      </div>
    </URow>
  `,
});

const SizesTemplate = (args, { argTypes } = {}) => ({
  components: { UInputFile, URow },
  setup() {
    return {
      args,
      sizes: argTypes.size.options,
    };
  },
  template: `
    <URow>
      <div v-for="(size, index) in sizes" :key="index">
        <UInputFile
          :size="size"
          v-bind="args"
        />
      </div>
    </URow>
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

export const sizes = SizesTemplate.bind({});
sizes.args = {};

export const labelAlign = LabelAlignTemplate.bind({});
labelAlign.args = {};
