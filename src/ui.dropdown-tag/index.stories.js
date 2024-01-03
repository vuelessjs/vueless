import { getArgTypes, getSlotNames } from "vueless/service.storybook";

import UDropdownTag from "vueless/ui.dropdown-tag";
import UDropdownItem from "vueless/ui.dropdown-item";
import URow from "vueless/ui.container-row";

export default {
  title: "Dropdowns / Dropdown Tag",
  component: UDropdownTag,
  args: {
    text: "Dropdown",
    options: [
      { label: "option 1", value: "1" },
      { label: "option 2", value: "2" },
      { label: "option 3", value: "3" },
    ],
  },
  argTypes: {
    ...getArgTypes(UDropdownTag.name),
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
  components: { UDropdownTag },
  setup() {
    const slots = getSlotNames(UDropdownTag.name);

    return { args, slots };
  },
  template: `
    <UDropdownTag
      v-bind="args"
    >
      <template v-for="(slot, index) of slots" :key="index" v-slot:[slot]>
        <template v-if="args[slot]">{{ args[slot] }}</template>
      </template>
    </UDropdownTag>
  `,
});

const SlotTemplate = (args) => ({
  components: { UDropdownTag, UDropdownItem },
  setup() {
    return { args };
  },
  template: `
    <UDropdownTag
      v-bind="args"
    >
      ${args.slotTemplate}
    </UDropdownTag>
  `,
});

const SizesTemplate = (args, { argTypes }) => ({
  components: { UDropdownTag, URow },
  setup() {
    return {
      args,
      sizes: argTypes.size.options,
    };
  },
  template: `
    <URow>
      <UDropdownTag
        v-for="(size, index) in sizes"
        :size="size"
        :text="size"
        v-bind="args"
        :key="index"
      />
    </URow>
  `,
});

const ColorsTemplate = (args, { argTypes }) => ({
  components: { UDropdownTag, URow },
  setup() {
    return {
      args,
      colors: argTypes.color.options,
    };
  },
  template: `
    <URow>
      <UDropdownTag
        v-for="(color, index) in colors"
        :color="color"
        :text="color"
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
withoutDropdownIcon.args = { dropdownIcon: false };

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
