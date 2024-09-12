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
    options: [
      { label: "option 1", id: "1" },
      { label: "option 2", id: "2" },
      { label: "option 3", id: "3" },
    ],
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

export const sizes = EnumVariantTemplate.bind({});
sizes.args = { enum: "size" };

export const colors = EnumVariantTemplate.bind({});
colors.args = { enum: "color" };

export const withoutDropdownIcon = DefaultTemplate.bind({});
withoutDropdownIcon.args = { noIcon: true };

export const defaultSlot = DefaultTemplate.bind({});
defaultSlot.args = {
  slotTemplate: `
    <template #default>
      Custom label
    </template>
  `,
};

export const leftSlot = DefaultTemplate.bind({});
leftSlot.args = {
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

export const rightSlot = DefaultTemplate.bind({});
rightSlot.args = {
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
