import { getArgTypes, getSlotNames, getSlotsFragment } from "../../utils/utilStorybook.js";

import UDatePickerRange from "../UDatePickerRange.vue";
import URow from "../../ui.container-row/URow.vue";
import UIcon from "../../ui.image-icon/UIcon.vue";
import UButton from "../../ui.button/UButton.vue";

import { addDays } from "../../ui.form-calendar/utilDate.js";

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
    ...getArgTypes(UDatePickerRange.__name),
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
  components: { UDatePickerRange, UIcon, UButton },
  setup() {
    const slots = getSlotNames(UDatePickerRange.__name);

    return { args, slots };
  },
  data() {
    return {
      value: this.args.value,
    };
  },
  template: `
    <UDatePickerRange v-bind="args" v-model="value">
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
        v-bind="args"
        v-model="args.value"
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
        v-bind="args"
        v-model="args.value"
        label="Top Left"
      />
      <UDatePickerRange
        class="w-full"
        open-direction-y="top"
        open-direction-x="right"
        v-bind="args"
        v-model="args.value"
        label="Top Right"
      />
      <UDatePickerRange
        class="w-full"
        open-direction-y="bottom"
        open-direction-x="left"
        v-bind="args"
        v-model="args.value"
        label="Bottom Left"
      />
      <UDatePickerRange
        class="w-full"
        open-direction-y="bottom"
        open-direction-x="right"
        v-bind="args"
        v-model="args.value"
        label="Bottom Right"
      />
    </URow>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const Variants = EnumVariantTemplate.bind({});
Variants.args = { enum: "variant" };

export const OpenDirection = OpenDirectionTemplate.bind({});
OpenDirection.args = {};

export const Disabled = EnumVariantTemplate.bind({});
Disabled.args = { enum: "variant", disabled: true };

export const Label = DefaultTemplate.bind({});
Label.args = { variant: "input", label: "some label" };

export const Description = DefaultTemplate.bind({});
Description.args = { variant: "input", description: "some description" };

export const Error = DefaultTemplate.bind({});
Error.args = { variant: "input", error: "some error" };

export const MinMax = DefaultTemplate.bind({});
MinMax.args = {
  minDate: new Date(2022, 2, 22),
  maxDate: new Date(2022, 2, 26),
  value: { from: new Date(2022, 2, 24), to: new Date(2022, 2, 25) },
};

export const DateFormat = DefaultTemplate.bind({});
DateFormat.args = {
  dateFormat: "d.m.Y",
  userDateFormat: "d.m.Y",
  value: { from: "28.06.2024", to: "30.06.2024" },
};

export const CustomRangeButton = DefaultTemplate.bind({});
CustomRangeButton.args = {
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

export const LeftIcon = DefaultTemplate.bind({});
LeftIcon.args = {
  leftIcon: "star",
  variant: "input",
};

export const RightIcon = DefaultTemplate.bind({});
RightIcon.args = {
  rightIcon: "star",
  variant: "input",
};

export const LeftIconSlot = DefaultTemplate.bind({});
LeftIconSlot.args = {
  variant: "input",
  slotTemplate: `
    <template #left-icon>
      <UIcon
        name="archive"
        color="red"
      />
    </template>
  `,
};

export const RightIconSlot = DefaultTemplate.bind({});
RightIconSlot.args = {
  variant: "input",
  slotTemplate: `
    <template #right-icon>
      <UIcon
        name="archive"
        color="red"
      />
    </template>
  `,
};

export const LeftSlot = DefaultTemplate.bind({});
LeftSlot.args = {
  variant: "input",
  slotTemplate: `
    <template #left>
      <UButton variant="thirdary" filled square label="Filter" class="rounded-r-none h-full" />
    </template>
  `,
};

export const RightSlot = DefaultTemplate.bind({});
RightSlot.args = {
  variant: "input",
  slotTemplate: `
    <template #right>
      <UButton variant="thirdary" filled square label="Filter" class="rounded-l-none" />
    </template>
  `,
};
