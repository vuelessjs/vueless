import type { Meta, StoryFn } from "@storybook/vue3";
import {
  getArgTypes,
  getSlotNames,
  getSlotsFragment,
  getDocsDescription,
} from "../../utils/storybook.ts";

import UCalendar from "../../ui.form-calendar/UCalendar.vue";

import { UCalendar as UCalendarName } from "../constants.ts";

import type { DateValue, UCalendarProps } from "../types.ts";

interface UCalendarArgs extends UCalendarProps<DateValue> {
  slotTemplate?: string;
  enum: "size";
}

export default {
  id: "3165",
  title: "Form Inputs & Controls / Calendar",
  component: UCalendar,
  args: {},
  argTypes: {
    ...getArgTypes(UCalendarName),
  },
  parameters: {
    docs: {
      story: {
        height: "380px",
      },
    },
    ...getDocsDescription(UCalendarName),
  },
} as Meta;

const DefaultTemplate: StoryFn<UCalendarArgs> = (args: UCalendarArgs) => ({
  components: { UCalendar },
  setup() {
    const slots = getSlotNames(UCalendarName);

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

export const Default = DefaultTemplate.bind({});
Default.args = { modelValue: null };

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

export const MinMax = DefaultTemplate.bind({});
MinMax.args = {
  minDate: new Date(2022, 2, 22),
  maxDate: new Date(2022, 2, 26),
  modelValue: new Date(2022, 2, 24),
};

export const DateFormat = DefaultTemplate.bind({});
DateFormat.args = { dateFormat: "d.m.Y", userDateFormat: "d.m.Y", modelValue: "28.06.2024" };
