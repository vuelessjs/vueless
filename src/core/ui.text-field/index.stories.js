import { getArgTypes, getSlotNames } from "vueless/service.storybook";

import UField from "vueless/ui.text-field";
import URow from "vueless/ui.container-row";

export default {
  title: "Text & Content / Field",
  component: UField,
  args: {
    label: "Label",
    value: "Value",
  },
  argTypes: {
    ...getArgTypes(UField.name),
  },
};

const DefaultTemplate = (args) => ({
  components: { UField },
  setup() {
    const slots = getSlotNames(UField.name);

    return { args, slots };
  },
  template: `
    <UField v-bind="args">
      <template v-for="(slot, index) of slots" :key="index" v-slot:[slot]>
        <template v-if="args[slot]">{{ args[slot] }}</template>
      </template>
    </UField>
  `,
});

const SizesTemplate = (args, { argTypes }) => ({
  components: { UField, URow },
  setup() {
    return {
      args,
      sizes: argTypes.size.options,
    };
  },
  template: `
    <URow>
      <UField
        v-for="(size, index) in sizes"
        :size="size"
        :value="size"
        labe="Label"
        v-bind="args"
        :key="index"
       />
    </URow>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const Sizes = SizesTemplate.bind({});
Sizes.args = {};
