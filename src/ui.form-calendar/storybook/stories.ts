import type { Meta, StoryFn } from "@storybook/vue3";
import {
  getArgTypes,
  getSlotNames,
  getSlotsFragment,
  getDocsDescription,
} from "../../utils/storybook.ts";

import UCalendar from "../../ui.form-calendar/UCalendar.vue";
import URow from "../../ui.container-row/URow.vue";
import UDatePicker from "../../ui.form-date-picker/UDatePicker.vue";

import { COMPONENT_NAME } from "../constants.ts";

import type { DateValue, Props } from "../types.ts";

interface UCalendarArgs extends Props<DateValue> {
  slotTemplate?: string;
  enum: "view";
}

export default {
  id: "3165",
  title: "Form Inputs & Controls / Calendar",
  component: UCalendar,
  args: {
    modelValue: null,
  },
  argTypes: {
    ...getArgTypes(COMPONENT_NAME),
  },
  parameters: {
    docs: {
      ...getDocsDescription(COMPONENT_NAME),
      story: {
        height: "380px",
      },
    },
  },
} as Meta;

const DefaultTemplate: StoryFn<UCalendarArgs> = (args: UCalendarArgs) => ({
  components: { UCalendar },
  setup() {
    const slots = getSlotNames(COMPONENT_NAME);

    return { args, slots };
  },
  template: `
      <UCalendar v-bind="args" v-model="args.modelValue">
        ${args.slotTemplate || getSlotsFragment("")}
      </UCalendar>

      <div class="mt-4">
        {{ args.modelValue }}
      </div>
    `,
});

const EnumVariantTemplate: StoryFn<UCalendarArgs> = (args: UCalendarArgs, { argTypes }) => ({
  components: { UCalendar, URow },
  setup() {
    return {
      args,
      options: argTypes[args.enum]?.options,
    };
  },
  template: `
      <URow>
        <UCalendar
          v-for="(option, index) in options"
          :key="index"
          v-bind="args"
          v-model="args.modelValue"
          :[args.enum]="option"
        />
      </URow>
  `,
});

const UserDateFormatTemplate: StoryFn<UCalendarArgs> = (args: UCalendarArgs) => ({
  components: { UDatePicker },
  setup() {
    const slots = getSlotNames(COMPONENT_NAME);

    return { args, slots };
  },
  template: `
      <UDatePicker v-bind="args" v-model="args.modelValue" />
    `,
});

export const Default = DefaultTemplate.bind({});
Default.args = { modelValue: null };

export const View = EnumVariantTemplate.bind({});
View.args = { enum: "view" };
View.parameters = {
  docs: {
    description: {
      story: "Calendar view variant (`day`, `month`, `year`).",
    },
  },
};

export const Range = DefaultTemplate.bind({});
Range.args = {
  range: true,
  modelValue: {
    from: new Date(new Date().setDate(new Date().getDate() - new Date().getDay())),
    to: new Date(new Date().setDate(new Date().getDate() + (6 - new Date().getDay()))),
  },
};

export const Timepicker = DefaultTemplate.bind({});
Timepicker.args = { modelValue: new Date(2024, 2, 14, 12, 24, 14), timepicker: true };

export const DateFormat = DefaultTemplate.bind({});
DateFormat.args = { dateFormat: "Y-m-d" };
DateFormat.parameters = {
  docs: {
    description: {
      story: "Date string format.",
    },
  },
};

export const DateTimeFormat = DefaultTemplate.bind({});
DateTimeFormat.args = { timepicker: true, dateTimeFormat: "Y-m-d H:i:S" };
DateTimeFormat.parameters = {
  docs: {
    description: {
      story: "Same as date format, but used when timepicker is enabled.",
    },
  },
};

export const UserDateFormat = UserDateFormatTemplate.bind({});
UserDateFormat.args = { userDateFormat: "d/m/Y" };
UserDateFormat.parameters = {
  docs: {
    description: {
      story: "User-friendly date format (it will be shown in UI).",
    },
  },
};

export const UserDateTimeFormat = UserDateFormatTemplate.bind({});
UserDateTimeFormat.args = { timepicker: true, userDateTimeFormat: "d/m/Y H:i:S" };
UserDateTimeFormat.parameters = {
  docs: {
    description: {
      story: "Same as user format, but used when timepicker is enabled.",
    },
  },
};

export const MinMax = DefaultTemplate.bind({});
MinMax.args = {
  minDate: new Date(2022, 2, 22),
  maxDate: new Date(2022, 2, 26),
  modelValue: new Date(2022, 2, 24),
};
MinMax.parameters = {
  docs: {
    description: {
      story: "Use `minDate` and `maxDate` props to set the minimum and maximum date.",
    },
  },
};
