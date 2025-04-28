import {
  getArgs,
  getArgTypes,
  getSlotNames,
  getSlotsFragment,
  getDocsDescription,
} from "../../utils/storybook.ts";
import { ref } from "vue";

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
  setup() {
    const slots = getSlotNames(UDropdownBadge.__name);

    const value = ref();

    return { args, slots, value };
  },
  template: `
    <UDropdownBadge v-bind="args" v-model="value">
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

export const Selectable = SelectableTemplate.bind({});
Selectable.args = {};

export const SelectableMultiple = SelectableTemplate.bind({});
SelectableMultiple.args = { multiple: true };

export const Variants = EnumTemplate.bind({});
Variants.args = { enum: "variant", label: "{enumValue}" };

export const Size = EnumTemplate.bind({});
Size.args = { enum: "size", label: "{enumValue}" };

export const ListboxXPosition = EnumTemplate.bind({});
ListboxXPosition.args = {
  enum: "xPosition",
  label: "{enumValue}",
  config: { dropdownBadge: { badge: "w-40", body: "justify-center" } },
};

export const ListboxYPosition = EnumTemplate.bind({});
ListboxYPosition.args = { enum: "yPosition", label: "{enumValue}" };
ListboxYPosition.parameters = {
  storyClasses: "h-[350px] flex items-center px-6 pt-8 pb-12",
};

export const Color = MultiEnumTemplate.bind({});
Color.args = { outerEnum: "variant", enum: "color", label: "{enumValue}" };

export const WithoutDropdownIcon = DefaultTemplate.bind({});
WithoutDropdownIcon.args = { noIcon: true };

export const CustomDropdownIcon = DefaultTemplate.bind({});
CustomDropdownIcon.args = {
  config: {
    dropdownIcon: {
      defaults: {
        size: "sm",
      },
    },
    defaults: {
      dropdownIcon: "expand_circle_down",
    },
  },
};

export const DefaultSlot = DefaultTemplate.bind({});
DefaultSlot.args = {
  round: true,
  options: [
    { label: "Change avatar", id: "avatar" },
    { label: "Profile settings", id: "settings" },
    { label: "Delete profile", id: "delete" },
  ],
  slotTemplate: `
    <template #default>
      <URow align="center" gap="xs">
        <UAvatar size="sm" src="https://avatar.iran.liara.run/public/boy" />
        <UCol gap="2xs">
          <span class="text-small font-semibold">John Doe</span>
          <span class="text-tiny">Admin</span>
        </UCol>
      </URow>
    </template>
  `,
};

export const LeftSlot = DefaultTemplate.bind({});
LeftSlot.args = {
  slotTemplate: `
    <template #left>
      <UIcon name="heart_plus" size="sm" color="inherit" />
    </template>
  `,
};

export const SlotToggle = DefaultTemplate.bind({});
SlotToggle.args = {
  slotTemplate: `
    <template #toggle="{ opened }">
      <ULink
        :label="opened ? 'collapse' : 'expand'"
        color="inherit"
        size="sm"
        class="mx-1"
      />
    </template>
  `,
};
