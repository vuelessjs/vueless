import { getArgTypes, getSlotNames, getSlotsFragment } from "../service.storybook";

import UDatePickerRange from "../ui.form-date-picker-range";
import URow from "../ui.container-row";

import { addDays } from "../ui.form-calendar/services/date.service";

/**
 * The `UDatePickerRange` component. | [View on GitHub](https://github.com/vuelessjs/vueless/tree/main/src/ui.form-date-picker-range)
 */
export default {
  id: "3180",
  title: "Form Inputs & Controls / Date Picker Range",
  component: UDatePickerRange,
  args: {
    value: {
      from: new Date(2022, 1, 14),
      to: new Date(2022, 2, 20),
    },
  },
  argTypes: {
    ...getArgTypes(UDatePickerRange.name),
  },
  parameters: {
    docs: {
      story: {
        height: "620px",
      },
    },
  },
};

const DefaultTemplate = (args) => ({
  components: { UDatePickerRange },
  setup() {
    const slots = getSlotNames(UDatePickerRange.name);

    return { args, slots };
  },
  data() {
    return {
      value: this.args.value,
    };
  },
  template: `
    <UDatePickerRange v-model="value" v-bind="args">
      ${args.slotTemplate || getSlotsFragment()}
    </UDatePickerRange>

    <div class="mt-4">
      {{ value }}
    </div>
  `,
});

const EnumVariantTemplate = (args, { argTypes } = {}) => ({
  components: { UDatePickerRange, URow },
  setup() {
    return {
      args,
      options: argTypes[args.enum].options,
    };
  },
  template: `
    <URow>
      <UDatePickerRange
        v-for="(option, index) in options"
        :key="index"
        v-model="args.value"
        v-bind="args"
        :[args.enum]="option"
      />
    </URow>
  `,
});

const OpenDirectionTemplate = (args) => ({
  components: { UDatePickerRange, URow },
  setup() {
    return { args };
  },
  template: `
    <URow class="!flex-col">
      <UDatePickerRange
        class="w-full"
        open-direction-y="top"
        open-direction-x="left"
        v-model="args.value"
        v-bind="args"
        label="Top Left"
      />
      <UDatePickerRange
        class="w-full"
        open-direction-y="top"
        open-direction-x="right"
        v-model="args.value"
        v-bind="args"
        label="Top Right"
      />
      <UDatePickerRange
        class="w-full"
        open-direction-y="bottom"
        open-direction-x="left"
        v-model="args.value"
        v-bind="args"
        label="Bottom Left"
      />
      <UDatePickerRange
        class="w-full"
        open-direction-y="bottom"
        open-direction-x="right"
        v-model="args.value"
        v-bind="args"
        label="Bottom Right"
      />
    </URow>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const variants = EnumVariantTemplate.bind({});
variants.args = { enum: "variant" };

export const openDirection = OpenDirectionTemplate.bind({});
openDirection.args = {};

export const disabled = EnumVariantTemplate.bind({});
disabled.args = { enum: "variant", disabled: true };

export const label = DefaultTemplate.bind({});
label.args = { variant: "input", label: "some label" };

export const description = DefaultTemplate.bind({});
description.args = { variant: "input", description: "some description" };

export const error = DefaultTemplate.bind({});
error.args = { variant: "input", error: "some error" };

export const MinMax = DefaultTemplate.bind({});
MinMax.args = {
  minDate: new Date(2022, 2, 22),
  maxDate: new Date(2022, 2, 26),
  value: { from: new Date(2022, 2, 24), to: new Date(2022, 2, 25) },
};

export const DateFormat = DefaultTemplate.bind({});
DateFormat.args = {
  dateFormat: "d.m.Y",
  userFormat: "d.m.Y",
  value: { from: "28.06.2024", to: "30.06.2024" },
};

export const customRangeButton = DefaultTemplate.bind({});
customRangeButton.args = {
  customRangeButton: {
    range: {
      from: new Date(),
      to: addDays(new Date(), 2),
    },
    label: "Next 2 days",
    description: "Some description",
  },
  value: { from: null, to: null },
};

export const slotLeft = DefaultTemplate.bind({});
slotLeft.args = {
  variant: "input",
  slotTemplate: `
    <template #left>
      🤘
    </template>
  `,
};

export const slotRight = DefaultTemplate.bind({});
slotRight.args = {
  variant: "input",
  slotTemplate: `
    <template #right>
      🤘
    </template>
  `,
};
