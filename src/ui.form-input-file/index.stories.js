import { getArgTypes } from "../service.storybook";

import UInputFile from "../ui.form-input-file";
import UButton from "../ui.button";
import URow from "../ui.container-row";

export default {
  id: "3020",
  title: "Form Inputs & Controls / Input File",
  component: UInputFile,
  argTypes: {
    ...getArgTypes(UInputFile.name),
  },
};

const DefaultTemplate = (args) => ({
  components: { UInputFile, URow },
  setup() {
    return { args };
  },
  template: `
    <URow>
      <UInputFile
        v-bind="args"
      />
    </URow>
  `,
});

const SlotTemplate = (args) => ({
  components: { UInputFile, UButton },
  setup() {
    return { args };
  },
  template: `
    <UInputFile
      v-bind="args"
    >
      ${args.slotTemplate}
    </UInputFile>
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

export const allowedSomeFileType = DefaultTemplate.bind({});
allowedSomeFileType.args = { allowedFileTypes: [".png", ".jpg", ".jpeg"] };

export const sizes = SizesTemplate.bind({});
sizes.args = {};

export const multiple = DefaultTemplate.bind({});
multiple.args = { multiple: true };

export const error = DefaultTemplate.bind({});
error.args = { error: "some error" };

export const slotDefault = SlotTemplate.bind({});
slotDefault.args = {
  slotTemplate: `
    <template #default>
       <UButton class="w-[40rem]" label="Select file" color="red" />
    </template>
  `,
};
