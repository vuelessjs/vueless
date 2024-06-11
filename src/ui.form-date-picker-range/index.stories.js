import { getArgTypes, getSlotNames } from "../service.storybook";

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
      from: 1651813634,
      to: 1654492034,
    },
  },
  argTypes: {
    ...getArgTypes(UDatePickerRange.name),
  },
  parameters: {
    docs: {
      story: {
        height: "580px",
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
  template: `
    <UDatePickerRange v-bind="args" v-model="args.value">
      <template v-for="(slot, index) of slots" :key="index" v-slot:[slot]>
        <template v-if="args[slot]">{{ args[slot] }}</template>
      </template>
    </UDatePickerRange>
  `,
});

const SlotTemplate = (args) => ({
  components: { UDatePickerRange },
  setup() {
    return { args };
  },
  template: `
    <UDatePickerRange v-bind="args" v-model="args.value">
      ${args.slotTemplate}
    </UDatePickerRange>
  `,
});

const VariantsTemplate = (args, { argTypes } = {}) => ({
  components: { UDatePickerRange, URow },
  setup() {
    return {
      args,
      variants: argTypes.variant.options,
    };
  },
  template: `
    <URow>
      <UDatePickerRange
        v-for="(variant, index) in variants"
        :variant="variant"
        v-bind="args"
        v-model="args.value"
        :key="index"
      />
    </URow>
  `,
});

const OpenDirectionTemplate = (args, { argTypes } = {}) => ({
  components: { UDatePickerRange, URow },
  setup() {
    return {
      args,
      directions: argTypes.openDirection.options,
    };
  },
  template: `
    <URow class="!flex-col">
      <UDatePickerRange
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

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const variants = VariantsTemplate.bind({});
variants.args = {};

export const openDirection = OpenDirectionTemplate.bind({});
openDirection.args = {};

export const disabled = VariantsTemplate.bind({});
disabled.args = { disabled: true };

export const label = DefaultTemplate.bind({});
label.args = { variant: "input", label: "some label" };

export const description = DefaultTemplate.bind({});
description.args = { variant: "input", description: "some description" };

export const error = DefaultTemplate.bind({});
error.args = { variant: "input", error: "some error" };

export const MinMax = DefaultTemplate.bind({});
MinMax.args = {
  minDate: "22.02.2022",
  maxDate: "26.02.2022",
  value: { from: 1645653600, to: null },
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

export const slotLeft = SlotTemplate.bind({});
slotLeft.args = {
  variant: "input",
  slotTemplate: `
    <template #left>
      🤘
    </template>
  `,
};

export const slotRight = SlotTemplate.bind({});
slotRight.args = {
  variant: "input",
  slotTemplate: `
    <template #right>
      🤘
    </template>
  `,
};
