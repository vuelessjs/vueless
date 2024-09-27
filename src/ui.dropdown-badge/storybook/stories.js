import { getArgTypes, getSlotNames, getSlotsFragment } from "../../utils/utilStorybook.js";

import UDropdownBadge from "../../ui.dropdown-badge/UDropdownBadge.vue";
import URow from "../../ui.container-row/URow.vue";
import UIcon from "../../ui.image-icon/UIcon.vue";

/**
 * The `UDropdownBadge` component. | [View on GitHub](https://github.com/vuelessjs/vueless/tree/main/src/ui.dropdown-badge)
 */
export default {
  id: "2020",
  title: "Dropdowns / Dropdown Badge",
  component: UDropdownBadge,
  args: {
    label: "Dropdown",
    options: [{ label: "option 1" }, { label: "option 2" }, { label: "option 3" }],
  },
  argTypes: {
    ...getArgTypes(UDropdownBadge.__name),
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
  components: { UDropdownBadge, UIcon },
  setup() {
    const slots = getSlotNames(UDropdownBadge.__name);

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

export const Sizes = EnumVariantTemplate.bind({});
Sizes.args = { enum: "size" };

export const Colors = EnumVariantTemplate.bind({});
Colors.args = { enum: "color" };

export const WithoutDropdownIcon = DefaultTemplate.bind({});
WithoutDropdownIcon.args = { noIcon: true };

export const DefaultSlot = DefaultTemplate.bind({});
DefaultSlot.args = {
  slotTemplate: `
    <template #default>
      Custom label
    </template>
  `,
};

export const LeftSlot = DefaultTemplate.bind({});
LeftSlot.args = {
  slotTemplate: `
    <template #left>
      <UIcon
        name="archive"
        color="red"
        size="sm"
      />
    </template>
  `,
};

export const RightSlot = DefaultTemplate.bind({});
RightSlot.args = {
  slotTemplate: `
    <template #right>
      <UIcon
        name="archive"
        color="red"
        size="sm"
      />
    </template>
  `,
};
