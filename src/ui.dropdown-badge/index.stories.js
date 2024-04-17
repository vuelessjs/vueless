import { getArgTypes, getSlotNames } from "../service.storybook";

import UDropdownBadge from "../ui.dropdown-badge";
import UDropdownItem from "../ui.dropdown-item";
import URow from "../ui.container-row";

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
  components: { UDropdownBadge },
  setup() {
    const slots = getSlotNames(UDropdownBadge.name);

    return { args, slots };
  },
  template: `
    <UDropdownBadge
      v-bind="args"
    >
      <template v-for="(slot, index) of slots" :key="index" v-slot:[slot]>
        <template v-if="args[slot]">{{ args[slot] }}</template>
      </template>
    </UDropdownBadge>
  `,
});

const SlotTemplate = (args) => ({
  components: { UDropdownBadge, UDropdownItem },
  setup() {
    return { args };
  },
  template: `
    <UDropdownBadge
      v-bind="args"
    >
      ${args.slotTemplate}
    </UDropdownBadge>
  `,
});

const SizesTemplate = (args, { argTypes } = {}) => ({
  components: { UDropdownBadge, URow },
  setup() {
    return {
      args,
      sizes: argTypes.size.options,
    };
  },
  template: `
    <URow>
      <UDropdownBadge
        v-for="(size, index) in sizes"
        v-bind="args"
        :size="size"
        :label="size"
        :key="index"
      />
    </URow>
  `,
});

const ColorsTemplate = (args, { argTypes } = {}) => ({
  components: { UDropdownBadge, URow },
  setup() {
    return {
      args,
      colors: argTypes.color.options,
    };
  },
  template: `
    <URow>
      <UDropdownBadge
        v-for="(color, index) in colors"
        :color="color"
        :label="color"
        v-bind="args"
        :key="index"
      />
    </URow>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const sizes = SizesTemplate.bind({});
sizes.args = {};

export const colors = ColorsTemplate.bind({});
colors.args = {};

export const withoutDropdownIcon = DefaultTemplate.bind({});
withoutDropdownIcon.args = { noIcon: true };

export const dropdownListSlot = SlotTemplate.bind({});
dropdownListSlot.args = {
  slotTemplate: `
    <template #default>
      <UDropdownItem label="Some option" />
      <UDropdownItem label="Some option 2" />
      <UDropdownItem label="Some option 3" />
    </template>
  `,
};
