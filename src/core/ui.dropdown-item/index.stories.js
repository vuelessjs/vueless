import { getArgTypes } from "vueless/service.storybook";

import UDropdownItem from "vueless/ui.dropdown-item";

export default {
  title: "Dropdowns / Dropdown Item",
  component: UDropdownItem,
  args: {
    text: "Dropdown Item",
  },
  argTypes: {
    ...getArgTypes(UDropdownItem.name),
  },
};

const DefaultTemplate = (args) => ({
  components: { UDropdownItem },
  setup() {
    return { args };
  },
  template: `
    <UDropdownItem
        v-bind="args"
    />
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};
