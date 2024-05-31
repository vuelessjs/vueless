import { getArgTypes } from "../service.storybook";

import UCheckboxGroup from "../ui.form-checkbox-group";

/**
 * The `UCheckboxGroup` component. | [View on GitHub](https://github.com/vuelessjs/vueless/tree/main/src/ui.form-checkbox-group)
 */
export default {
  id: "3110",
  title: "Form Inputs & Controls / Checkbox Group",
  component: UCheckboxGroup,
  args: {
    label: "Label",
    options: [
      { label: "checkbox 1", description: "some description 1", value: "1" },
      { label: "checkbox 2", description: "some description 2", value: "2" },
      { label: "checkbox 3", description: "some description 3", value: "3" },
    ],
    value: ["1"],
  },
  argTypes: {
    ...getArgTypes(UCheckboxGroup.name),
  },
};

const DefaultTemplate = (args) => ({
  components: { UCheckboxGroup },
  setup() {
    return { args };
  },
  data() {
    return {
      test: ["1"],
    };
  },
  template: `
    <UCheckboxGroup v-bind="args" name="default" v-model="test" />
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const disabled = DefaultTemplate.bind({});
disabled.args = { disabled: true };

export const error = DefaultTemplate.bind({});
error.args = { error: "some error" };
