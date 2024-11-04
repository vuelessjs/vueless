import { getArgTypes, getSlotNames, getSlotsFragment } from "../../utils/storybook.ts";

import UCalendar from "../../ui.form-calendar/UCalendar.vue";

/**
 * The `UCalendar` component. | [View on GitHub](https://github.com/vuelessjs/vueless/tree/main/src/ui.form-calendar)
 */
export default {
  id: "3165",
  title: "Form Inputs & Controls / Calendar",
  component: UCalendar,
  args: {},
  argTypes: {
    ...getArgTypes(UCalendar.__name),
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
  components: { UCalendar },
  setup() {
    const slots = getSlotNames(UCalendar.__name);

    return { args, slots };
  },
  template: `
      <UCalendar v-bind="args" v-model="args.modelValue">
        ${args.slotTemplate || getSlotsFragment()}
      </UCalendar>

      <div class="mt-4">
        {{ args.modelValue }}
      </div>
    `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

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
