import { getArgTypes, getSlotNames } from "../service.storybook";

import UDatePicker from "../ui.form-date-picker";
import UIcon from "../ui.image-icon";
import URow from "../ui.container-row";

/**
 * The `UDatePicker` component. | [View on GitHub](https://github.com/vuelessjs/vueless/tree/main/src/ui.form-date-picker)
 */
export default {
  id: "3170",
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
    <UDatePicker v-bind="args" v-model="args.date">
      <template v-for="(slot, index) of slots" :key="index" v-slot:[slot]>
        <template v-if="args[slot]">{{ args[slot] }}</template>
      </template>
    </UDatePicker>
  `,
});

const SizesTemplate = (args, { argTypes } = {}) => ({
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

const OpenDirectionTemplate = (args, { argTypes } = {}) => ({
  components: { UDatePicker, URow },
  setup() {
    return {
      args,
      directions: argTypes.openDirection.options,
    };
  },
  template: `
    <URow class="!flex-col">
      <UDatePicker
        class="w-full"
        v-for="(direction, index) in directions"
        :open-direction="direction"
        v-bind="args"
        v-model="args.value"
        :key="index"
      />
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
Default.args = { date: 1645653600 };

export const sizes = SizesTemplate.bind({});
sizes.args = { label: "" };

export const openDirection = OpenDirectionTemplate.bind({});
openDirection.args = {};

export const description = DefaultTemplate.bind({});
description.args = { description: "some description" };

export const disabled = DefaultTemplate.bind({});
disabled.args = { disabled: true };

export const error = DefaultTemplate.bind({});
error.args = { error: "some error" };

export const placeholder = DefaultTemplate.bind({});
placeholder.args = { placeholder: "some placeholder" };

export const DateFormat = DefaultTemplate.bind({});
DateFormat.args = { dateFormat: "d.m.Y", userFormat: "d.m.Y", date: 1645653600 };

export const Timepicker = DefaultTemplate.bind({});
Timepicker.args = { timepicker: true, date: 1645653600 };

export const MinMax = DefaultTemplate.bind({});
MinMax.args = { minDate: "2022-02-22", maxDate: "2022-02-26", date: 1645653600 };

export const slotIcon = SlotTemplate.bind({});
slotIcon.args = {
  slotTemplate: `
    <template #right-icon>
      <UIcon
        name="star"
        color="black"
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

export const slotLeft = SlotTemplate.bind({});
slotRight.args = {
  slotTemplate: `
    <template #left>
        🤘🤘🤘
    </template>
  `,
};
