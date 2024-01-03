import { getArgTypes } from "vueless/service.storybook";

import UInputNumber from "vueless/ui.form-input-number";

export default {
  title: "Form Inputs & Controls / Input Number",
  component: UInputNumber,
  argTypes: {
    ...getArgTypes(UInputNumber.name),
    value: 1,
  },
};

const DefaultTemplate = (args) => ({
  components: { UInputNumber },
  setup() {
    return { args };
  },
  template: `
    <UInputNumber v-model="count" v-bind="args" />
  `,
  data: () => ({
    count: 1,
  }),
});

export const Default = DefaultTemplate.bind({});
Default.args = {
  value: 1,
  step: 1,
  min: 1,
  max: 100,
};
