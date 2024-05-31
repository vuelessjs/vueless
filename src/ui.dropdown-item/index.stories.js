import { getArgTypes } from "../service.storybook";

import UDropdownItem from "../ui.dropdown-item";

/**
 * The `UDropdownItem` component. | [View on GitHub](https://github.com/vuelessjs/vueless/tree/main/src/ui.dropdown-item)
 */
export default {
  id: "2040",
  title: "Dropdowns / Dropdown Item",
  component: UDropdownItem,
  args: {
    label: "Dropdown Item",
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
