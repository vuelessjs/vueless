import { getArgTypes } from "vueless/service.storybook";

import UInputFile from "vueless/ui.form-input-file";
import UButton from "vueless/ui.button";
import URow from "vueless/ui.container-row";

export default {
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

const SizesTemplate = (args, { argTypes }) => ({
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
       <UButton class="w-[40rem]" text="Select file" color="red" />
    </template>
  `,
};
