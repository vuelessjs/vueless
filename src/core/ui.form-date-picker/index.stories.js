import { getArgTypes, getSlotNames } from "vueless/service.storybook";

import UDatePicker from "vueless/ui.form-date-picker";
import UIcon from "vueless/ui.image-icon";
import URow from "vueless/ui.container-row";

export default {
  title: "Form Inputs & Controls / Date Picker",
  component: UDatePicker,
  args: {
    label: "Label",
  },
  argTypes: {
    ...getArgTypes(UDatePicker.name),
  },
  parameters: {
    docs: {
      story: {
        height: "380px",
      },
    },
  },
};

const DefaultTemplate = (args) => ({
  components: { UDatePicker },
  setup() {
    const slots = getSlotNames(UDatePicker.name);

    return { args, slots };
  },
  template: `
    <UDatePicker v-bind="args" v-model="args.value">
      <template v-for="(slot, index) of slots" :key="index" v-slot:[slot]>
        <template v-if="args[slot]">{{ args[slot] }}</template>
      </template>
    </UDatePicker>
  `,
});

const SizesTemplate = (args, { argTypes }) => ({
  components: { UDatePicker, URow },
  setup() {
    return {
      args,
      sizes: argTypes.size.options,
    };
  },
  template: `
    <URow>
      <UDatePicker
        v-for="(size, index) in sizes"
        :size="size"
        :label="size"
        v-bind="args"
        :key="index"
      >
      </UDatePicker>
    </URow>
  `,
});

const SlotTemplate = (args) => ({
  components: { UDatePicker, UIcon },
  setup() {
    return { args };
  },
  template: `
    <UDatePicker v-bind="args">
      ${args.slotTemplate}
    </UDatePicker>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = { value: 1645653600 };

export const sizes = SizesTemplate.bind({});
sizes.args = { label: "" };

export const description = DefaultTemplate.bind({});
description.args = { description: "some description" };

export const disabled = DefaultTemplate.bind({});
disabled.args = { disabled: true };

export const error = DefaultTemplate.bind({});
error.args = { error: "some error" };

export const placeholder = DefaultTemplate.bind({});
placeholder.args = { placeholder: "some placeholder" };

export const value = DefaultTemplate.bind({});
value.args = { value: 1645653600 };

export const customDateFormat = DefaultTemplate.bind({});
customDateFormat.args = { customDateFormat: "d.m.Y", value: 1645653600 };

export const slotIcon = SlotTemplate.bind({});
slotIcon.args = {
  slotTemplate: `
    <template #icon>
      <UIcon
        name="star"
        color="black"
        size="md"
       />
    </template>
  `,
};

export const slotRight = SlotTemplate.bind({});
slotRight.args = {
  slotTemplate: `
    <template #right>
        🤘🤘🤘
    </template>
  `,
};
