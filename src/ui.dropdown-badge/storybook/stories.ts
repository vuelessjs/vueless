import {
  getArgTypes,
  getSlotNames,
  getSlotsFragment,
  getDocsDescription,
} from "../../utils/storybook.ts";

import UDropdownBadge from "../../ui.dropdown-badge/UDropdownBadge.vue";
import URow from "../../ui.container-row/URow.vue";
import UIcon from "../../ui.image-icon/UIcon.vue";

import type { Meta, StoryFn } from "@storybook/vue3";
import type { Props } from "../types.ts";

interface DefaultUDropdownBadgeArgs extends Props {
  slotTemplate?: string;
}

interface EnumUDropdownBadgeArgs extends DefaultUDropdownBadgeArgs {
  enum: keyof Pick<Props, "color" | "size">;
}

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
      ...getDocsDescription(UDropdownBadge.__name),
      story: {
        height: "200px",
      },
    },
  },
} as Meta;

const DefaultTemplate: StoryFn<DefaultUDropdownBadgeArgs> = (args: DefaultUDropdownBadgeArgs) => ({
  components: { UDropdownBadge, UIcon },
  setup() {
    const slots = getSlotNames(UDropdownBadge.__name);

    return { args, slots };
  },
  template: `
    <UDropdownBadge
      v-bind="args"
    >
      ${args.slotTemplate || getSlotsFragment("")}
    </UDropdownBadge>
  `,
});

const EnumVariantTemplate: StoryFn<EnumUDropdownBadgeArgs> = (
  args: EnumUDropdownBadgeArgs,
  { argTypes },
) => ({
  components: { UDropdownBadge, URow },
  setup() {
    return {
      args,
      options: argTypes[args.enum]?.options,
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
