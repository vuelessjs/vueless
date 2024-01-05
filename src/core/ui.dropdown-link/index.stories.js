import { getArgTypes, getSlotNames } from "vueless/service.storybook";

import UDropdownLink from "vueless/ui.dropdown-link";
import UDropdownItem from "vueless/ui.dropdown-item";
import URow from "vueless/ui.container-row";

export default {
  title: "Dropdowns / Dropdown Link",
  component: UDropdownLink,
  args: {
    text: "Dropdown",
    options: [
      { label: "option 1", value: "1" },
      { label: "option 2", value: "2" },
      { label: "option 3", value: "3" },
    ],
    noFocusRing: true,
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

const SizesTemplate = (args, { argTypes }) => ({
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
        :size="size"
        v-bind="args"
        :key="index"
      />
    </URow>
  `,
});

const ColorsTemplate = (args, { argTypes }) => ({
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
          :color="color"
          :text="color"
          v-bind="args"
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
WithoutDropdownIcon.args = { dropdownIcon: false };

export const dropdownListSlot = SlotTemplate.bind({});
dropdownListSlot.args = {
  slotTemplate: `
    <template #default>
      <UDropdownItem text="Some option" />
      <UDropdownItem text="Some option 2" />
      <UDropdownItem text="Some option 3" />
    </template>
  `,
};
