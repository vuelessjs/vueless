import {
  getArgs,
  getArgTypes,
  getSlotNames,
  getSlotsFragment,
  getDocsDescription,
} from "../../utils/storybook.ts";

import UDropdownButton from "../../ui.dropdown-button/UDropdownButton.vue";
import URow from "../../ui.container-row/URow.vue";
import UCol from "../../ui.container-col/UCol.vue";
import UIcon from "../../ui.image-icon/UIcon.vue";
import ULink from "../../ui.button-link/ULink.vue";
import UAvatar from "../../ui.image-avatar/UAvatar.vue";

import type { Meta, StoryFn } from "@storybook/vue3";
import type { Props } from "../types.ts";

interface DefaultUDropdownButtonArgs extends Props {
  slotTemplate?: string;
}

interface EnumUDropdownButtonArgs extends DefaultUDropdownButtonArgs {
  enum: keyof Pick<Props, "size" | "variant" | "xPosition" | "yPosition" | "color">;
  outerEnum: "variant";
  class?: string;
}

export default {
  id: "2010",
  title: "Dropdowns / Dropdown Button",
  component: UDropdownButton,
  args: {
    label: "Actions",
    options: [
      { label: "Edit", id: "edit" },
      { label: "Copy", id: "copy" },
      { label: "Remove", id: "delete" },
    ],
  },
  argTypes: {
    ...getArgTypes(UDropdownButton.__name),
  },
  parameters: {
    docs: {
      ...getDocsDescription(UDropdownButton.__name),
      story: {
        height: "200px",
      },
    },
  },
} as Meta;

const DefaultTemplate: StoryFn<DefaultUDropdownButtonArgs> = (
  args: DefaultUDropdownButtonArgs,
) => ({
  components: { UDropdownButton, UIcon, ULink, UAvatar },
  setup: () => ({ args, slots: getSlotNames(UDropdownButton.__name) }),
  template: `
    <UDropdownButton v-bind="args">
      ${args.slotTemplate || getSlotsFragment("")}
    </UDropdownButton>
  `,
});

const SelectableTemplate: StoryFn<DefaultUDropdownButtonArgs> = (
  args: DefaultUDropdownButtonArgs,
) => ({
  components: { UDropdownButton, UIcon, ULink },
  setup: () => ({ args, slots: getSlotNames(UDropdownButton.__name) }),
  template: `
    <UDropdownButton v-bind="args" v-model="args.modelValue">
      ${args.slotTemplate || getSlotsFragment("")}
    </UDropdownButton>
  `,
});

const EnumTemplate: StoryFn<EnumUDropdownButtonArgs> = (
  args: EnumUDropdownButtonArgs,
  { argTypes },
) => ({
  components: { UDropdownButton, URow },
  setup: () => ({ args, argTypes, getArgs }),
  template: `
    <URow>
      <UDropdownButton
        v-for="option in argTypes?.[args.enum]?.options"
        v-bind="getArgs(args, option)"
        :key="option"
      />
    </URow>
  `,
});

const MultiEnumTemplate: StoryFn<EnumUDropdownButtonArgs> = (
  args: EnumUDropdownButtonArgs,
  { argTypes },
) => ({
  components: { UDropdownButton, URow, UCol },
  setup: () => ({ args, argTypes, getArgs }),
  template: `
    <UCol>
      <URow v-for="outerOption in argTypes?.[args.outerEnum]?.options" :key="outerOption">
        <UDropdownButton
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
OptionSelection.args = {
  label: "Select status",
  modelValue: "active",
  options: [
    { label: "Active", id: "active" },
    { label: "Pending", id: "pending" },
    { label: "Archived", id: "archived" },
  ],
};

export const MultipleOptionSelection = SelectableTemplate.bind({});
MultipleOptionSelection.args = {
  label: "Select status",
  modelValue: ["active", "pending", "archived"],
  multiple: true,
  options: [
    { label: "Active", id: "active" },
    { label: "Pending", id: "pending" },
    { label: "Archived", id: "archived" },
  ],
};

export const Variants = EnumTemplate.bind({});
Variants.args = { enum: "variant", label: "{enumValue}" };

export const Size = EnumTemplate.bind({});
Size.args = { enum: "size", label: "{enumValue}" };

export const Color = MultiEnumTemplate.bind({});
Color.args = { outerEnum: "variant", enum: "color", label: "{enumValue}", options: [] };

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

export const Disabled = DefaultTemplate.bind({});
Disabled.args = { disabled: true };

export const WithoutToggleIcon = Default.bind({});
WithoutToggleIcon.args = { toggleIcon: false };

export const CustomToggleIcon = DefaultTemplate.bind({});
CustomToggleIcon.args = { toggleIcon: "expand_circle_down" };

export const DefaultSlot = DefaultTemplate.bind({});
DefaultSlot.args = {
  variant: "subtle",
  toggleIcon: false,
  square: true,
  options: [
    { label: "Change avatar", id: "avatar" },
    { label: "Profile settings", id: "settings" },
    { label: "Delete profile", id: "delete" },
  ],
  slotTemplate: `
    <template #default>
      <UAvatar size="sm" rounded="full" src="https://i.pravatar.cc/300" />
    </template>
  `,
};
DefaultSlot.parameters = {
  docs: {
    story: {
      height: "250px",
    },
  },
};

export const LeftSlot = DefaultTemplate.bind({});
LeftSlot.args = {
  toggleIcon: false,
  variant: "subtle",
  slotTemplate: `
    <template #left>
      <UIcon name="settings" size="sm" color="inherit" />
    </template>
  `,
};

export const ToggleSlot = DefaultTemplate.bind({});
ToggleSlot.args = {
  slotTemplate: `
    <template #toggle="{ opened }">
      <ULink :label="opened ? 'collapse' : 'expand'" color="inherit" underlined />
    </template>
  `,
};
