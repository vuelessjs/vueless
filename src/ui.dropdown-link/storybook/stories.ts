import {
  getArgs,
  getArgTypes,
  getSlotNames,
  getSlotsFragment,
  getDocsDescription,
} from "../../utils/storybook.ts";

import UDropdownLink from "../../ui.dropdown-link/UDropdownLink.vue";
import URow from "../../ui.container-row/URow.vue";
import UIcon from "../../ui.image-icon/UIcon.vue";
import UBadge from "../../ui.text-badge/UBadge.vue";
import ULink from "../../ui.button-link/ULink.vue";
import UAvatar from "../../ui.image-avatar/UAvatar.vue";

import type { Meta, StoryFn } from "@storybook/vue3";
import type { Props } from "../types.ts";

interface DefaultUDropdownLinkArgs extends Props {
  slotTemplate?: string;
}

interface EnumUDropdownLinkArgs extends DefaultUDropdownLinkArgs {
  enum: keyof Pick<Props, "size" | "color" | "xPosition" | "yPosition">;
  class?: string;
}

export default {
  id: "2030",
  title: "Dropdowns / Dropdown Link",
  component: UDropdownLink,
  args: {
    label: "Account",
    options: [
      { label: "Profile", id: "profile" },
      { label: "Settings", id: "settings" },
      { label: "Logout", id: "logout" },
    ],
  },
  argTypes: {
    ...getArgTypes(UDropdownLink.__name),
  },
  parameters: {
    docs: {
      ...getDocsDescription(UDropdownLink.__name),
      story: {
        height: "200px",
      },
    },
  },
} as Meta;

const DefaultTemplate: StoryFn<DefaultUDropdownLinkArgs> = (args: DefaultUDropdownLinkArgs) => ({
  components: { UDropdownLink, UIcon, ULink, UBadge, UAvatar },
  setup: () => ({ args, slots: getSlotNames(UDropdownLink.__name) }),
  template: `
    <UDropdownLink v-bind="args">
      ${args.slotTemplate || getSlotsFragment("")}
    </UDropdownLink>
  `,
});

const SelectableTemplate: StoryFn<DefaultUDropdownLinkArgs> = (args: DefaultUDropdownLinkArgs) => ({
  components: { UDropdownLink, UIcon, ULink },
  setup: () => ({ args, slots: getSlotNames(UDropdownLink.__name) }),
  template: `
    <UDropdownLink v-bind="args" v-model="args.modelValue">
      ${args.slotTemplate || getSlotsFragment("")}
    </UDropdownLink>
  `,
});

const EnumTemplate: StoryFn<EnumUDropdownLinkArgs> = (
  args: EnumUDropdownLinkArgs,
  { argTypes },
) => ({
  components: { UDropdownLink, URow },
  setup: () => ({ args, argTypes, getArgs }),
  template: `
    <URow>
      <UDropdownLink
        v-for="option in argTypes?.[args.enum]?.options"
        v-bind="getArgs(args, option)"
        :key="option"
      />
    </URow>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};
Default.parameters = {
  docs: {
    story: {
      height: "250px",
    },
  },
};

export const Searchable = DefaultTemplate.bind({});
Searchable.args = { searchable: true };
Searchable.parameters = {
  docs: {
    story: {
      height: "250px",
    },
  },
};

export const OptionSelection = SelectableTemplate.bind({});
OptionSelection.args = { modelValue: "profile" };

export const MultipleOptionSelection = SelectableTemplate.bind({});
MultipleOptionSelection.args = {
  modelValue: ["profile", "settings", "logout"],
  multiple: true,
};

export const Size = EnumTemplate.bind({});
Size.args = { enum: "size", label: "{enumValue}" };

export const ListboxXPosition = EnumTemplate.bind({});
ListboxXPosition.args = {
  enum: "xPosition",
  label: "{enumValue}",
  class: "w-40 py-1 px-2.5 border border-dashed border-primary",
};

export const ListboxYPosition = EnumTemplate.bind({});
ListboxYPosition.args = { enum: "yPosition", label: "{enumValue}" };
ListboxYPosition.parameters = {
  storyClasses: "h-[350px] flex items-center px-6 pt-8 pb-12",
};

export const Color = EnumTemplate.bind({});
Color.args = { enum: "color", label: "{enumValue}" };

export const UnderlineVariants: StoryFn<EnumUDropdownLinkArgs> = (args: EnumUDropdownLinkArgs) => ({
  components: { UDropdownLink, URow },
  setup: () => ({ args, slots: getSlotNames(UDropdownLink.__name) }),
  template: `
    <URow>
      <UDropdownLink label="Default" />
      <UDropdownLink label="Dashed" dashed underlined />
      <UDropdownLink label="Dotted" dotted underlined />
      <UDropdownLink label="Underlined" underlined />
      <UDropdownLink label="Without Underline" :underlined="false" />
    </URow>
  `,
});

export const Disabled = DefaultTemplate.bind({});
Disabled.args = { disabled: true };

export const WithoutToggleIcon = Default.bind({});
WithoutToggleIcon.args = { toggleIcon: false };

export const CustomToggleIcon = DefaultTemplate.bind({});
CustomToggleIcon.args = { toggleIcon: "expand_circle_down" };

export const DefaultSlot = DefaultTemplate.bind({});
DefaultSlot.args = {
  toggleIcon: false,
  slotTemplate: `
    <template #default>
      <UAvatar rounded="full" src="https://avatar.iran.liara.run/public" />
    </template>
  `,
};

export const LeftSlot = DefaultTemplate.bind({});
LeftSlot.args = {
  slotTemplate: `
    <template #left>
      <UIcon name="person" size="xs" color="primary" class="mr-0.5" />
    </template>
  `,
};

export const ToggleSlot = DefaultTemplate.bind({});
ToggleSlot.args = {
  slotTemplate: `
    <template #toggle="{ opened, toggle }">
      <UAvatar
        src="https://avatar.iran.liara.run/public"
        size="3xs"
        rounded="full"
        :class="{ 'outline-medium outline-primary': opened }"
        class="ml-1 cursor-pointer"
      />
    </template>
  `,
};
