import { getArgTypes, getSlotNames, getSlotsFragment } from "../service.storybook";

import UDropdownLink from "../ui.dropdown-link";
import UDropdownItem from "../ui.dropdown-item";
import URow from "../ui.container-row";

/**
 * The `UDropdownLink` component. | [View on GitHub](https://github.com/vuelessjs/vueless/tree/main/src/ui.dropdown-link)
 */
export default {
  id: "2030",
  title: "Dropdowns / Dropdown Link",
  component: UDropdownLink,
  args: {
    label: "Dropdown",
    options: [
      { label: "option 1", value: "1" },
      { label: "option 2", value: "2" },
      { label: "option 3", value: "3" },
    ],
  },
  argTypes: {
    ...getArgTypes(UDropdownLink.name),
  },
  parameters: {
    docs: {
      story: {
        height: "200px",
      },
    },
  },
};

const DefaultTemplate = (args) => ({
  components: { UDropdownLink, UDropdownItem },
  setup() {
    const slots = getSlotNames(UDropdownLink.name);

    return { args, slots };
  },
  template: `
    <UDropdownLink v-bind="args">
      ${args.slotTemplate || getSlotsFragment()}
    </UDropdownLink>
  `,
});

const EnumVariantTemplate = (args, { argTypes } = {}) => ({
  components: { UDropdownLink, URow },
  setup() {
    function getText(value) {
      return `Dropdown ${value}`;
    }

    let prefixedOptions = argTypes[args.enum].options;

    if (argTypes[args.enum].name === "size") {
      prefixedOptions = prefixedOptions.map((option) => getText(option));
    }

    return { args, options: argTypes[args.enum].options, prefixedOptions };
  },
  template: `
    <URow>
      <UDropdownLink
        v-for="(option, index) in options"
        v-bind="args"
        :[args.enum]="option"
        :label="prefixedOptions[index]"
        :key="index"
      />
    </URow>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const sizes = EnumVariantTemplate.bind({});
sizes.args = { enum: "size" };

export const colors = EnumVariantTemplate.bind({});
colors.args = { enum: "color" };

export const WithoutDropdownIcon = DefaultTemplate.bind({});
WithoutDropdownIcon.args = { noIcon: true };

export const dropdownListSlot = DefaultTemplate.bind({});
dropdownListSlot.args = {
  slotTemplate: `
    <template #default>
      <UDropdownItem label="Some option" />
      <UDropdownItem label="Some option 2" />
      <UDropdownItem label="Some option 3" />
    </template>
  `,
};
