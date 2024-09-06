import { getArgTypes, getSlotNames, getSlotsFragment } from "../service.storybook";

import UCalendar from "../ui.form-calendar";

/**
 * The `UCalendar` component. | [View on GitHub](https://github.com/vuelessjs/vueless/tree/main/src/ui.form-calendar)
 */
export default {
  id: "3165",
  title: "Form Inputs & Controls / Calendar",
  component: UCalendar,
  args: {},
  argTypes: {
    ...getArgTypes(UCalendar.name),
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
    const slots = getSlotNames(UCalendar.name);

    return { args, slots };
  },
  data() {
    return {
      value: this.args.value,
    };
  },
  template: `
      <UCalendar v-bind="args" v-model="value">
        ${args.slotTemplate || getSlotsFragment()}
      </UCalendar>

      <div class="mt-4">
        {{ value }}
      </div>
    `,
});

export const Default = DefaultTemplate.bind({});
Default.args = { value: new Date() };

export const Range = DefaultTemplate.bind({});
Range.args = {
  range: true,
  value: {
    from: new Date(new Date().setDate(new Date().getDate() - new Date().getDay())),
    to: new Date(new Date().setDate(new Date().getDate() + (6 - new Date().getDay()))),
  },
};

export const Timepicker = DefaultTemplate.bind({});
Timepicker.args = { value: new Date(2024, 2, 14, 12, 24, 14), timepicker: true };

export const MinMax = DefaultTemplate.bind({});
MinMax.args = {
  minDate: new Date(2022, 2, 22),
  maxDate: new Date(2022, 2, 26),
  value: new Date(2022, 2, 24),
};

export const DateFormat = DefaultTemplate.bind({});
DateFormat.args = { dateFormat: "d.m.Y", userDateFormat: "d.m.Y", value: "28.06.2024" };
