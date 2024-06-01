import { getArgTypes } from "../service.storybook";

import UDropdownList from "../ui.dropdown-list";
import URow from "../ui.container-row";

/**
 * The `UDropdownList` component. | [View on GitHub](https://github.com/vuelessjs/vueless/tree/main/src/ui.dropdown-list)
 */
export default {
  id: "2050",
  title: "Dropdowns / Dropdown List",
  component: UDropdownList,
  args: {
    options: [
      { label: "option 1", id: "1" },
      { label: "option 2", id: "2" },
      { label: "option 3", id: "3" },
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

const SizesTemplate = (args, { argTypes } = {}) => ({
  components: { UDropdownList, URow },
  setup() {
    return {
      args,
      sizes: argTypes.size.options,
    };
  },
  template: `
    <div class="flex flex-col gap-6">
      <URow>
        <UDropdownList
          v-for="(size, index) in sizes"
          :key="index"
          v-bind="args"
          :size="size"
        />
      </URow>
    </div>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const sizes = SizesTemplate.bind({});
sizes.args = {};

export const maxHeight = DefaultTemplate.bind({});
maxHeight.args = { maxHeight: 80 };

export const withoutOptions = DefaultTemplate.bind({});
withoutOptions.args = { options: [] };
