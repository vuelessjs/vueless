import { getArgTypes } from "vueless/service.storybook";

import UDropdownList from "vueless/ui.dropdown-list";

export default {
  title: "Dropdowns / Dropdown List",
  component: UDropdownList,
  args: {
    options: [
      { label: "option 1", value: "1" },
      { label: "option 2", value: "2" },
      { label: "option 3", value: "3" },
    ],
  },
  argTypes: {
    ...getArgTypes(UDropdownList.name),
  },
  parameters: {
    backgrounds: {
      default: "white",
    },
    docs: {
      story: {
        iframeHeight: 160,
      },
    },
  },
};

const DefaultTemplate = (args) => ({
  components: { UDropdownList },
  setup() {
    return { args };
  },
  template: `
    <UDropdownList
      v-bind="args"
    />
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const withoutOptions = DefaultTemplate.bind({});
withoutOptions.args = { options: [] };
