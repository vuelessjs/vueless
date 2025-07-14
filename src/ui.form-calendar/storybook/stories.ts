import { computed } from "vue";

import type { Meta, StoryFn } from "@storybook/vue3";
import {
  getArgs,
  getArgTypes,
  getSlotNames,
  getSlotsFragment,
  getDocsDescription,
} from "../../utils/storybook.ts";

import UCalendar from "../../ui.form-calendar/UCalendar.vue";
import URow from "../../ui.container-row/URow.vue";

import { COMPONENT_NAME } from "../constants.ts";
import { formatDate } from "../utilCalendar.ts";
import defaultConfig from "../config.ts";

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
    modelValue: new Date(new Date().getFullYear(), new Date().getMonth(), 10, 12, 35, 50),
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
  setup: () => ({ args, slots: getSlotNames(COMPONENT_NAME) }),
  template: `
      <UCalendar v-bind="args" v-model="args.modelValue">
        ${args.slotTemplate || getSlotsFragment("")}
      </UCalendar>

      <div class="text-neutral mt-4">{{ args.modelValue }}</div>
    `,
});

const EnumTemplate: StoryFn<UCalendarArgs> = (args: UCalendarArgs, { argTypes }) => ({
  components: { UCalendar, URow },
  setup: () => ({ args, argTypes, getArgs }),
  template: `
    <URow>
      <UCalendar
        v-for="option in argTypes?.[args.enum]?.options"
        v-bind="getArgs(args, option)"
        :key="option"
        v-model="args.modelValue"
      />
    </URow>

    <div class="text-neutral mt-4">{{ args.modelValue }}</div>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const View = EnumTemplate.bind({});
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

export const DateFormat: StoryFn<UCalendarArgs> = (args: UCalendarArgs) => ({
  components: { UCalendar },
  setup: () => {
    const formattedValue = computed(() => {
      if (args.modelValue instanceof Date) {
        return formatDate(args.modelValue, "Y-m-d", defaultConfig.i18n);
      }

      return args.modelValue;
    });

    return { args, formattedValue };
  },
  template: `
      <UCalendar v-model="args.modelValue" date-format="Y-m-d" />

      <div class="text-neutral mt-4">{{ formattedValue }}</div>
    `,
});
DateFormat.parameters = {
  docs: {
    description: {
      story: "Date string format.",
    },
  },
};

export const DateTimeFormat: StoryFn<UCalendarArgs> = (args: UCalendarArgs) => ({
  components: { UCalendar },
  setup: () => {
    const formattedValue = computed(() => {
      if (args.modelValue instanceof Date) {
        return formatDate(args.modelValue, "Y-m-d H:i:S", defaultConfig.i18n);
      }

      return args.modelValue;
    });

    return { args, formattedValue };
  },
  template: `
      <UCalendar
        v-model="args.modelValue"
        timepicker
        date-time-format="Y-m-d H:i:S"
      />

      <div class="text-neutral mt-4">{{ formattedValue }}</div>
    `,
});
DateTimeFormat.parameters = {
  docs: {
    description: {
      story: "Same as date format, but used when timepicker is enabled.",
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
