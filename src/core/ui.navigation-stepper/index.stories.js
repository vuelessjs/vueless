import { getArgTypes } from "vueless/service.storybook";

import UStepper from "vueless/ui.navigation-stepper";

export default {
  title: "Navigation / Stepper",
  component: UStepper,
  args: {
    title: "Title",
    step: 1,
    totalSteps: 10,
  },
  argTypes: {
    ...getArgTypes(UStepper.name),
  },
};

const DefaultTemplate = (args) => ({
  components: { UStepper },
  setup() {
    return { args };
  },
  template: `
    <UStepper v-bind="args" />
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};
