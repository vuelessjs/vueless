import { getArgTypes, getSlotNames, getSlotsFragment } from "../service.storybook";

import UDropdownBadge from "../ui.dropdown-badge";
import UDropdownItem from "../ui.dropdown-item";
import URow from "../ui.container-row";

/**
 * The `UDropdownBadge` component. | [View on GitHub](https://github.com/vuelessjs/vueless/tree/main/src/ui.dropdown-badge)
 */
export default {
  id: "2020",
  title: "Dropdowns / Dropdown Badge",
  component: UDropdownBadge,
  args: {
    label: "Dropdown",
    options: [
      { label: "option 1", value: "1" },
      { label: "option 2", value: "2" },
      { label: "option 3", value: "3" },
    ],
  },
  argTypes: {
    ...getArgTypes(UDropdownBadge.name),
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
  components: { UDropdownBadge, UDropdownItem },
  setup() {
    const slots = getSlotNames(UDropdownBadge.name);

    return { args, slots };
  },
  template: `
    <UDropdownBadge
      v-bind="args"
    >
      ${args.slotTemplate || getSlotsFragment()}
    </UDropdownBadge>
  `,
});

const EnumVariantTemplate = (args, { argTypes } = {}) => ({
  components: { UDropdownBadge, URow },
  setup() {
    return {
      args,
      options: argTypes[args.enum].options,
    };
  },
  template: `
    <URow>
      <UDropdownBadge
        v-for="(option, index) in options"
        v-bind="args"
        :[args.enum]="option"
        :label="option"
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

export const withoutDropdownIcon = DefaultTemplate.bind({});
withoutDropdownIcon.args = { noIcon: true };

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
