import type { Meta, StoryFn } from "@storybook/vue3";
import {
  getArgs,
  getArgTypes,
  getSlotNames,
  getSlotsFragment,
  getDocsDescription,
} from "../../utils/storybook.ts";

import UDatePickerRange from "../UDatePickerRange.vue";
import URow from "../../ui.container-row/URow.vue";
import UCol from "../../ui.container-col/UCol.vue";
import UIcon from "../../ui.image-icon/UIcon.vue";
import UButton from "../../ui.button/UButton.vue";

import { addDays } from "../../ui.form-calendar/utilDate.ts";

import { COMPONENT_NAME } from "../constants.ts";

import type { Props } from "../types.ts";

interface DefaultUDatePickerRangeArgs extends Props<unknown> {
  slotTemplate?: string;
}

interface EnumUDatePickerRangeArgs extends Props<unknown> {
  slotTemplate?: string;
  enum: "size" | "variant" | "labelAlign";
}

const currentDate = new Date();

const oneDayMs = 24 * 60 * 60 * 1000;
const fromDate = new Date(currentDate.getTime());
const toDate = new Date(currentDate.getTime() + oneDayMs * 24);

export default {
  id: "3180",
  title: "Form Inputs & Controls / Date Picker Range",
  component: UDatePickerRange,
  args: {
    label: "Select a date",
    modelValue: {
      from: fromDate,
      to: toDate,
    },
  },
  argTypes: {
    ...getArgTypes(COMPONENT_NAME),
  },
  parameters: {
    docs: {
      ...getDocsDescription(COMPONENT_NAME),
      story: {
        height: "620px",
      },
    },
  },
} as Meta;

const DefaultTemplate: StoryFn<DefaultUDatePickerRangeArgs> = (
  args: DefaultUDatePickerRangeArgs,
) => ({
  components: { UDatePickerRange, UIcon, UButton },
  setup: () => ({ args, slots: getSlotNames(COMPONENT_NAME) }),
  template: `
    <UDatePickerRange open-direction-y="bottom" v-bind="args" v-model="args.modelValue">
      ${args.slotTemplate || getSlotsFragment("")}
    </UDatePickerRange>

    <div class="mt-4">
      {{ args.modelValue }}
    </div>
  `,
});

const EnumTemplate: StoryFn<EnumUDatePickerRangeArgs> = (
  args: EnumUDatePickerRangeArgs,
  { argTypes },
) => ({
  components: { UDatePickerRange, UCol },
  setup: () => ({ args, argTypes, getArgs }),
  template: `
    <UCol>
      <UDatePickerRange
        v-for="option in argTypes?.[args.enum]?.options"
        v-bind="getArgs(args, option)"
        :key="option"
        v-model="args.modelValue"
        class="w-full"
      />
    </UCol>
  `,
});

const OpenDirectionTemplate: StoryFn<DefaultUDatePickerRangeArgs> = (
  args: DefaultUDatePickerRangeArgs,
) => ({
  components: { UDatePickerRange, UCol },
  setup() {
    return { args };
  },
  template: `
    <UCol>
      <UDatePickerRange
        class="w-full"
        open-direction-y="top"
        open-direction-x="left"
        v-bind="args"
        v-model="args.modelValue"
        label="Top Left"
      />
      <UDatePickerRange
        class="w-full"
        open-direction-y="top"
        open-direction-x="right"
        v-bind="args"
        v-model="args.modelValue"
        label="Top Right"
      />
      <UDatePickerRange
        class="w-full"
        open-direction-y="bottom"
        open-direction-x="left"
        v-bind="args"
        v-model="args.modelValue"
        label="Bottom Left"
      />
      <UDatePickerRange
        class="w-full"
        open-direction-y="bottom"
        open-direction-x="right"
        v-bind="args"
        v-model="args.modelValue"
        label="Bottom Right"
      />
    </UCol>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const Placeholder = DefaultTemplate.bind({});
Placeholder.args = {
  variant: "input",
  placeholder: "MM/DD/YYYY",
  modelValue: { from: null, to: null },
};

export const Description = DefaultTemplate.bind({});
Description.args = {
  variant: "input",
  description: "Please choose a date range from the calendar.",
};

export const Error = DefaultTemplate.bind({});
Error.args = { variant: "input", error: "Please select a valid date." };

export const Disabled = DefaultTemplate.bind({});
Disabled.args = { disabled: true };

export const Variants = EnumTemplate.bind({});
Variants.args = { enum: "variant", placeholder: "{enumValue}" };

export const LabelAlign = EnumTemplate.bind({});
LabelAlign.args = {
  variant: "input",
  enum: "labelAlign",
  modelValue: { from: null, to: null },
  placeholder: "{enumValue}",
};

export const Sizes = EnumTemplate.bind({});
Sizes.args = {
  variant: "input",
  enum: "size",
  modelValue: { from: null, to: null },
  placeholder: "{enumValue}",
};

export const OpenDirection = OpenDirectionTemplate.bind({});
OpenDirection.args = { variant: "input" };

export const DateFormat = DefaultTemplate.bind({});
DateFormat.args = {
  modelValue: { from: null, to: null },
  variant: "input",
  dateFormat: "Y-m-d",
};
DateFormat.parameters = {
  docs: {
    description: {
      story: "Date string format.",
    },
  },
};

export const UserDateFormat = DefaultTemplate.bind({});
UserDateFormat.args = {
  modelValue: { from: null, to: null },
  variant: "input",
  userDateFormat: "d/m/Y",
};
UserDateFormat.parameters = {
  docs: {
    description: {
      story: "User-friendly date format (it will be shown in UI).",
    },
  },
};

export const MinMax = DefaultTemplate.bind({});
MinMax.args = {
  minDate: currentDate,
  maxDate: new Date(currentDate.getTime() + oneDayMs * 35),
  modelValue: { from: fromDate, to: toDate },
};
MinMax.parameters = {
  docs: {
    description: {
      story: "Use `minDate` and `maxDate` props to set the minimum and maximum date.",
    },
  },
};

export const CustomRangeButton = DefaultTemplate.bind({});
CustomRangeButton.args = {
  customRangeButton: {
    range: {
      from: new Date(),
      to: addDays(new Date(), 2),
    },
    label: "Next 2 days",
    description: "Select next couple days",
  },
  modelValue: { from: null, to: null },
};

export const IconProps: StoryFn<DefaultUDatePickerRangeArgs> = (args) => ({
  components: { UDatePickerRange, URow },
  setup() {
    return { args };
  },
  template: `
    <URow>
      <UDatePickerRange
        v-bind="args"
        v-model="args.modelValue"
        variant="input"
        left-icon="update"
        class="w-full"
      />
      <UDatePickerRange
        v-bind="args"
        v-model="args.modelValue"
        variant="input"
        right-icon="edit_calendar"
        class="w-full"
      />
    </URow>
  `,
});

export const Slots: StoryFn<DefaultUDatePickerRangeArgs> = (args) => ({
  components: { UDatePickerRange, URow, UButton },
  setup() {
    return { args };
  },
  template: `
    <URow align="stretch">
      <UDatePickerRange
        v-bind="args"
        v-model="args.modelValue"
        variant="input"
        class="w-full"
        :config="{ datepickerInput: { leftSlot: 'pl-0' } }"
      >
        <template #left>
          <UButton label="Export" size="xs" class="h-full rounded-r-none" />
        </template>
      </UDatePickerRange>
      <UDatePickerRange
        v-bind="args"
        v-model="args.modelValue"
        variant="input"
        class="w-full"
        :config="{ datepickerInput: { rightSlot: 'pr-0' } }"
      >
        <template #right>
          <UButton label="Schedule" size="xs" class="h-full rounded-l-none" />
        </template>
      </UDatePickerRange>
    </URow>
  `,
});
