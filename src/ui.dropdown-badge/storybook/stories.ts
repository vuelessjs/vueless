import {
  getArgs,
  getArgTypes,
  getSlotNames,
  getSlotsFragment,
  getDocsDescription,
} from "../../utils/storybook.ts";

import UDropdownBadge from "../../ui.dropdown-badge/UDropdownBadge.vue";
import URow from "../../ui.container-row/URow.vue";
import UCol from "../../ui.container-col/UCol.vue";
import UIcon from "../../ui.image-icon/UIcon.vue";
import ULink from "../../ui.button-link/ULink.vue";
import UAvatar from "../../ui.image-avatar/UAvatar.vue";

import type { Meta, StoryFn } from "@storybook/vue3";
import type { Props } from "../types.ts";

interface DefaultUDropdownBadgeArgs extends Props {
  slotTemplate?: string;
}

interface EnumUDropdownBadgeArgs extends DefaultUDropdownBadgeArgs {
  enum: keyof Pick<Props, "color" | "size" | "variant" | "xPosition" | "yPosition">;
  outerEnum: "variant";
  class?: string;
}

export default {
  id: "2020",
  title: "Dropdowns / Dropdown Badge",
  component: UDropdownBadge,
  args: {
    label: "Order Status",
    options: [
      { label: "Pending", id: "pending" },
      { label: "Delivered", id: "delivered" },
      { label: "Cancelled", id: "cancelled" },
    ],
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
  components: { UDropdownBadge, UIcon, ULink, UAvatar, URow, UCol },
  setup: () => ({ args, slots: getSlotNames(UDropdownBadge.__name) }),
  template: `
    <UDropdownBadge v-bind="args">
      ${args.slotTemplate || getSlotsFragment("")}
    </UDropdownBadge>
  `,
});

const SelectableTemplate: StoryFn<DefaultUDropdownBadgeArgs> = (
  args: DefaultUDropdownBadgeArgs,
) => ({
  components: { UDropdownBadge, UIcon, ULink },
  setup: () => ({ args, slots: getSlotNames(UDropdownBadge.__name) }),
  template: `
    <UDropdownBadge v-bind="args" v-model="args.modelValue">
      ${args.slotTemplate || getSlotsFragment("")}
    </UDropdownBadge>
  `,
});

const EnumTemplate: StoryFn<EnumUDropdownBadgeArgs> = (
  args: EnumUDropdownBadgeArgs,
  { argTypes },
) => ({
  components: { UDropdownBadge, URow },
  setup: () => ({ args, argTypes, getArgs }),
  template: `
    <URow>
      <UDropdownBadge
        v-for="option in argTypes?.[args.enum]?.options"
        v-bind="getArgs(args, option)"
        :key="option"
      />
    </URow>
  `,
});

const MultiEnumTemplate: StoryFn<EnumUDropdownBadgeArgs> = (
  args: EnumUDropdownBadgeArgs,
  { argTypes },
) => ({
  components: { UDropdownBadge, URow, UCol },
  setup: () => ({ args, argTypes, getArgs }),
  template: `
    <UCol>
      <URow v-for="outerOption in argTypes?.[args.outerEnum]?.options" :key="outerOption">
        <UDropdownBadge
          v-for="option in argTypes?.[args.enum]?.options"
          v-bind="getArgs(args, option, outerOption)"
          :key="option"
        />
      </URow>
    </UCol>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const OptionSelection = SelectableTemplate.bind({});
OptionSelection.args = { modelValue: "pending" };

export const MultipleOptionSelection = SelectableTemplate.bind({});
MultipleOptionSelection.args = {
  modelValue: ["pending", "delivered", "cancelled"],
  multiple: true,
};

export const Variants = EnumTemplate.bind({});
Variants.args = { enum: "variant", label: "{enumValue}" };

export const Size = EnumTemplate.bind({});
Size.args = { enum: "size", label: "{enumValue}" };

export const ListboxXPosition = EnumTemplate.bind({});
ListboxXPosition.args = {
  enum: "xPosition",
  label: "{enumValue}",
  class: "w-40",
};

export const ListboxYPosition = EnumTemplate.bind({});
ListboxYPosition.args = { enum: "yPosition", label: "{enumValue}" };
ListboxYPosition.parameters = {
  storyClasses: "h-[350px] flex items-center px-6 pt-8 pb-12",
};

export const Color = MultiEnumTemplate.bind({});
Color.args = {
  outerEnum: "variant",
  enum: "color",
  label: "{enumValue}",
  options: [],
};

export const Disabled = DefaultTemplate.bind({});
Disabled.args = { disabled: true };

export const WithoutToggleIcon = Default.bind({});
WithoutToggleIcon.args = { toggleIcon: false };

export const CustomToggleIcon = DefaultTemplate.bind({});
CustomToggleIcon.args = { toggleIcon: "expand_circle_down" };

export const DefaultSlot = DefaultTemplate.bind({});
DefaultSlot.args = {
  round: true,
  toggleIcon: false,
  options: [
    { label: "Change avatar", id: "avatar" },
    { label: "Profile settings", id: "settings" },
    { label: "Delete profile", id: "delete" },
  ],
  slotTemplate: `
    <template #default>
      <URow align="center" gap="xs">
        <UAvatar size="3xs" src="https://avatar.iran.liara.run/public/boy" />
        <span class="text-small font-semibold">John Doe</span>
      </URow>
    </template>
  `,
};

export const LeftSlot = DefaultTemplate.bind({});
LeftSlot.args = {
  slotTemplate: `
    <template #left>
      <UIcon name="delivery_truck_speed" size="xs" color="inherit" />
    </template>
  `,
};

export const ToggleSlot = DefaultTemplate.bind({});
ToggleSlot.args = {
  slotTemplate: `
    <template #toggle="{ opened }">
      <ULink
        :label="opened ? 'collapse' : 'expand'"
        color="inherit"
        size="sm"
        class="mx-1"
        underlined
      />
    </template>
  `,
};
