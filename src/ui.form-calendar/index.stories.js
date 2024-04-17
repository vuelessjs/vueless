import { getArgTypes, getSlotNames } from "../service.storybook";

import UCalendar from "../ui.form-calendar";

export default {
  id: "3171",
  title: "Form Inputs & Controls / Calendar",
  component: UCalendar,
  args: {
    label: "Label",
  },
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
  template: `
      <UCalendar v-bind="args" v-model="args.value">
        <template v-for="(slot, index) of slots" :key="index" v-slot:[slot]>
          <template v-if="args[slot]">{{ args[slot] }}</template>
        </template>
      </UCalendar>
    `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const Range = DefaultTemplate.bind({});
Range.args = {
  range: true,
  value: {
    from: 1651813634,
    to: 1654492034,
  },
};

export const Timepicker = DefaultTemplate.bind({});
Timepicker.args = { value: 1645653600, timepicker: true };

export const MinMax = DefaultTemplate.bind({});
MinMax.args = { minDate: "2022-02-22", maxDate: "2022-02-26", value: 1645653600 };

export const DateFormat = DefaultTemplate.bind({});
DateFormat.args = { dateFormat: "d.m.Y", userFormat: "d.m.Y", value: 1645653600 };
