import { getArgTypes, getSlotNames } from "../service.storybook";

import UDropdownLink from "../ui.dropdown-link";
import UDropdownItem from "../ui.dropdown-item";
import URow from "../ui.container-row";

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
  components: { UDropdownLink },
  setup() {
    const slots = getSlotNames(UDropdownLink.name);

    return { args, slots };
  },
  template: `
    <UDropdownLink
      v-bind="args"
    >
      <template v-for="(slot, index) of slots" :key="index" v-slot:[slot]>
        <template v-if="args[slot]">{{ args[slot] }}</template>
      </template>
    </UDropdownLink>
  `,
});

const SlotTemplate = (args) => ({
  components: { UDropdownLink, UDropdownItem },
  setup() {
    return { args };
  },
  template: `
    <UDropdownLink
      v-bind="args"
    >
      ${args.slotTemplate}
    </UDropdownLink>
  `,
});

const SizesTemplate = (args, { argTypes } = {}) => ({
  components: { UDropdownLink, URow },
  setup() {
    return {
      args,
      sizes: argTypes.size.options,
    };
  },
  template: `
    <URow>
      <UDropdownLink
        v-for="(size, index) in sizes"
        v-bind="args"
        :size="size"
        :key="index"
      />
    </URow>
  `,
});

const ColorsTemplate = (args, { argTypes } = {}) => ({
  components: { UDropdownLink, URow },
  setup() {
    return {
      args,
      colors: argTypes.color.options,
    };
  },
  template: `
    <div>
      <URow>
        <UDropdownLink
          v-for="(color, id) in colors"
          v-bind="args"
          :color="color"
          :label="color"
          :key="id"
        />
      </URow>
    </div>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const sizes = SizesTemplate.bind({});
sizes.args = {};

export const colors = ColorsTemplate.bind({});
colors.args = {};

export const WithoutDropdownIcon = DefaultTemplate.bind({});
WithoutDropdownIcon.args = { noIcon: true };

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
