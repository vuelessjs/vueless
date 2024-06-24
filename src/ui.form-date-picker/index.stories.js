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
        height: "480px",
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
  data() {
    return {
      value: this.args.value,
    };
  },
  template: `
    <UDatePicker v-bind="args" v-model="value">
      <template v-for="(slot, index) of slots" :key="index" v-slot:[slot]>
        <template v-if="args[slot]">{{ args[slot] }}</template>
      </template>
    </UDatePicker>

    <div class="mt-4">
      {{ value }}
    </div>
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

const OpenDirectionTemplate = (args) => ({
  components: { UDatePicker, URow },
  setup() {
    return {
      args,
    };
  },
  template: `
    <URow class="!flex-col">
      <UDatePicker
        class="w-full"
        open-direction-y="top"
        v-bind="args"
        v-model="args.value"
      />
      <UDatePicker
        class="w-full"
        open-direction-y="bottom"
        open-direction-x="right"
        v-bind="args"
        v-model="args.value"
      />
      <UDatePicker
        class="w-full"
        open-direction-y="bottom"
        v-bind="args"
        v-model="args.value"
      />
      <UDatePicker
        class="w-full"
        open-direction-y="bottom"
        open-direction-x="left"
        v-bind="args"
        v-model="args.value"
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
Default.args = { value: new Date() };

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
DateFormat.args = { dateFormat: "d.m.Y", userFormat: "d.m.Y", value: "28.06.2024" };

export const Timepicker = DefaultTemplate.bind({});
Timepicker.args = { timepicker: true, value: new Date(2024, 2, 14, 12, 24, 14) };

export const MinMax = DefaultTemplate.bind({});
MinMax.args = {
  minDate: new Date(2022, 2, 22),
  maxDate: new Date(2022, 2, 26),
  value: new Date(2022, 2, 24),
};

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
