import { ref } from "vue";

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
import UText from "../../ui.text-block/UText.vue";

import { addDays } from "../../ui.form-calendar/utilDate.ts";

import { COMPONENT_NAME } from "../constants.ts";

import type { Props } from "../types.ts";

interface DefaultUDatePickerRangeArgs extends Props<unknown> {
  slotTemplate?: string;
}

interface EnumUDatePickerRangeArgs extends Props<unknown> {
  slotTemplate?: string;
  enum: "size" | "variant" | "labelAlign";
  wrapperClass?: string;
}

const currentDate = new Date();

const oneDayMs = 24 * 60 * 60 * 1000;
const fromDate = new Date(currentDate.getTime());
const toDate = new Date(currentDate.getTime() + oneDayMs * 14);

export default {
  id: "3180",
  title: "Form Inputs & Controls / Date Picker Range",
  component: UDatePickerRange,
  args: {
    label: "Select date range",
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
        height: "600px",
      },
    },
  },
} as Meta;

const DefaultTemplate: StoryFn<DefaultUDatePickerRangeArgs> = (
  args: DefaultUDatePickerRangeArgs,
) => ({
  components: { UDatePickerRange, UIcon, UButton, UText },
  setup: () => ({ args, slots: getSlotNames(COMPONENT_NAME) }),
  template: `
    <UDatePickerRange v-bind="args" v-model="args.modelValue" class="w-full max-w-96">
      ${args.slotTemplate || getSlotsFragment("")}
    </UDatePickerRange>

    <UText color="neutral" class="mt-4">{{ args.modelValue }}</UText>
  `,
});

const EnumTemplate: StoryFn<EnumUDatePickerRangeArgs> = (
  args: EnumUDatePickerRangeArgs,
  { argTypes },
) => ({
  components: { UDatePickerRange, UCol, UText },
  setup: () => ({ args, argTypes, getArgs }),
  template: `
    <UCol :class="args.wrapperClass">
      <UDatePickerRange
        v-for="option in argTypes?.[args.enum]?.options"
        v-bind="getArgs(args, option)"
        :key="option"
        v-model="args.modelValue"
        class="w-full max-w-96"
      />
    </UCol>

    <UText color="neutral" class="mt-4">{{ args.modelValue }}</UText>
  `,
});

const OpenDirectionTemplate: StoryFn<DefaultUDatePickerRangeArgs> = (
  args: DefaultUDatePickerRangeArgs,
) => ({
  components: { UDatePickerRange, UCol, UText },
  setup() {
    return { args };
  },
  template: `
    <UCol>
      <UDatePickerRange
        open-direction-y="top"
        open-direction-x="left"
        v-bind="args"
        v-model="args.modelValue"
        label="Top Left"
        class="w-full"
      />
      <UDatePickerRange
        open-direction-y="top"
        open-direction-x="right"
        v-bind="args"
        v-model="args.modelValue"
        label="Top Right"
        class="w-full"
      />
      <UDatePickerRange
        open-direction-y="bottom"
        open-direction-x="left"
        v-bind="args"
        v-model="args.modelValue"
        label="Bottom Left"
        class="w-full"
      />
      <UDatePickerRange
        open-direction-y="bottom"
        open-direction-x="right"
        v-bind="args"
        v-model="args.modelValue"
        label="Bottom Right"
        class="w-full"
      />
    </UCol>

    <UText color="neutral" class="mt-4">{{ args.modelValue }}</UText>
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

export const Error: StoryFn<DefaultUDatePickerRangeArgs> = (args: DefaultUDatePickerRangeArgs) => ({
  components: { UDatePickerRange, UText },
  setup: () => ({ args }),
  template: `
    <UDatePickerRange
      v-bind="args"
      v-model="args.modelValue"
      variant="input"
      :error="args.modelValue.from && args.modelValue.to ? '' : 'Please select a valid date.'"
      class="w-full max-w-96"
    />

    <UText color="neutral" class="mt-4">{{ args.modelValue }}</UText>
  `,
});
Error.args = { modelValue: { from: null, to: null } };

export const Disabled = DefaultTemplate.bind({});
Disabled.args = { disabled: true };

export const Variants = EnumTemplate.bind({});
Variants.args = { enum: "variant" };

export const LabelAlign = EnumTemplate.bind({});
LabelAlign.args = {
  variant: "input",
  enum: "labelAlign",
  description: "{enumValue}",
  wrapperClass: "gap-16",
};

export const Sizes: StoryFn<EnumUDatePickerRangeArgs> = (
  args: EnumUDatePickerRangeArgs,
  { argTypes },
) => ({
  components: { UDatePickerRange, URow, UText },
  setup: () => ({ args, argTypes, getArgs }),
  template: `
    <URow block>
      <UDatePickerRange
        v-for="option in argTypes?.[args.enum]?.options"
        v-bind="getArgs(args, option)"
        :key="option"
        v-model="args.modelValue"
        variant="input"
        class="w-full max-w-96"
      />
    </URow>

    <UText color="neutral" class="mt-4">{{ args.modelValue }}</UText>
  `,
});
Sizes.args = { enum: "size" };

export const OpenDirection = OpenDirectionTemplate.bind({});
OpenDirection.args = { variant: "input" };
OpenDirection.parameters = {
  docs: {
    story: {
      height: "800px",
    },
  },
};

export const DateFormat = DefaultTemplate.bind({});
DateFormat.args = { variant: "input", dateFormat: "Y-m-d" };
DateFormat.parameters = {
  docs: {
    description: {
      story: "Date string format.",
    },
  },
};

export const UserDateFormat = DefaultTemplate.bind({});
UserDateFormat.args = { variant: "input", userDateFormat: "d/m/Y" };
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
  setup: () => ({ args, fromDate, toDate, leftModel: ref({ from: null, to: null }) }),
  template: `
    <URow align="stretch">
      <UDatePickerRange
        label="Select date range"
        v-model="leftModel"
        variant="input"
        class="w-full"
        :config="{ datepickerInput: { wrapper: 'pl-0' } }"
      >
        <template #left>
          <UButton
            label="2 weeks"
            size="sm"
            variant="soft"
            class="h-full rounded-r-none"
            @click="leftModel = { from: fromDate, to: toDate }"
          />
        </template>
      </UDatePickerRange>
      <UDatePickerRange
        label="Select date range"
        v-model="args.modelValue"
        variant="input"
        class="w-full"
        :config="{ datepickerInput: { wrapper: 'pr-0' } }"
      >
        <template #right>
          <UButton
            label="Clear"
            size="sm"
            variant="ghost"
            class="h-full rounded-l-none"
            @click="args.modelValue = { from: null, to: null }"
          />
        </template>
      </UDatePickerRange>
    </URow>
  `,
});
