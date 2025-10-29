import {
  getArgs,
  getArgTypes,
  getSlotNames,
  getSlotsFragment,
  getDocsDescription,
} from "../../utils/storybook";

import UDropdown from "../../ui.dropdown/UDropdown.vue";
import URow from "../../ui.container-row/URow.vue";
import UCol from "../../ui.container-col/UCol.vue";
import UButton from "../../ui.button/UButton.vue";
import UIcon from "../../ui.image-icon/UIcon.vue";
import ULink from "../../ui.button-link/ULink.vue";
import UBadge from "../../ui.text-badge/UBadge.vue";
import UText from "../../ui.text-block/UText.vue";
import ULoader from "../../ui.loader/ULoader.vue";
import UAvatar from "../../ui.image-avatar/UAvatar.vue";

import type { Meta, StoryFn } from "@storybook/vue3-vite";
import type { Props } from "../types";

interface DefaultUDropdownArgs extends Props {
  slotTemplate?: string;
}

interface EnumUDropdownArgs extends DefaultUDropdownArgs {
  enum: keyof Pick<Props, "size" | "xPosition" | "yPosition" | "color">;
  class?: string;
}

export default {
  id: "2000",
  title: "Dropdowns / Dropdown",
  component: UDropdown,
  args: {
    label: "Select option",
    options: [
      { label: "Edit", value: "edit" },
      { label: "Copy", value: "copy" },
      { label: "Remove", value: "delete" },
    ],
  },
  argTypes: {
    ...getArgTypes(UDropdown.__name),
  },
  parameters: {
    docs: {
      ...getDocsDescription(UDropdown.__name),
      story: {
        height: "200px",
      },
    },
  },
} as Meta;

const DefaultTemplate: StoryFn<DefaultUDropdownArgs> = (args: DefaultUDropdownArgs) => ({
  components: { UDropdown, UButton, UIcon, ULink, UBadge, ULoader, URow, UText, UAvatar },
  setup: () => ({ args, slots: getSlotNames(UDropdown.__name) }),
  template: `
    <UDropdown v-bind="args">
      <template #default="{ opened, label, toggle, elementId }">
        <UButton :id="elementId" :label="label" @click="toggle">
          <template #right>
            <UIcon name="keyboard_arrow_down" color="inherit" />
          </template>
        </UButton>
      </template>
      ${args.slotTemplate || getSlotsFragment("")}
    </UDropdown>
  `,
});

const SelectableTemplate: StoryFn<DefaultUDropdownArgs> = (args: DefaultUDropdownArgs) => ({
  components: { UDropdown, UButton, UIcon },
  setup: () => ({ args, slots: getSlotNames(UDropdown.__name) }),
  template: `
    <UDropdown v-bind="args" v-model="args.modelValue">
      <template #default="{ opened, label, toggle, elementId }">
        <UButton :id="elementId" :label="label" @click="toggle">
          <template #right>
            <UIcon name="keyboard_arrow_down" color="inherit" />
          </template>
        </UButton>
      </template>
      ${args.slotTemplate || getSlotsFragment("")}
    </UDropdown>
  `,
});

const EnumTemplate: StoryFn<EnumUDropdownArgs> = (args: EnumUDropdownArgs, { argTypes }) => ({
  components: { UDropdown, UButton, UIcon, URow },
  setup: () => ({ args, argTypes, getArgs }),
  template: `
    <URow>
      <UDropdown
        v-for="option in argTypes?.[args.enum]?.options"
        v-bind="getArgs(args, option)"
        :key="option"
      >
        <template #default="{ opened, label, toggle, elementId }">
          <UButton :id="elementId" :label="label" @click="toggle">
            <template #right>
              <UIcon name="keyboard_arrow_down" color="inherit" />
            </template>
          </UButton>
        </template>
      </UDropdown>
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

export const Disabled = DefaultTemplate.bind({});
Disabled.args = { disabled: true };

export const Searchable = DefaultTemplate.bind({});
Searchable.args = { searchable: true };
Searchable.parameters = {
  docs: {
    story: {
      height: "250px",
    },
  },
};

export const SearchModelValue = DefaultTemplate.bind({});
SearchModelValue.args = { searchable: true, search: "Copy" };
SearchModelValue.parameters = {
  docs: {
    story: {
      height: "250px",
    },
  },
};

export const NoCloseOnSelect = SelectableTemplate.bind({});
NoCloseOnSelect.args = {
  modelValue: "pending",
  options: [
    { label: "Active", value: "active" },
    { label: "Pending", value: "pending" },
    { label: "Archived", value: "archived" },
  ],
  closeOnSelect: false,
};

export const OptionSelection = SelectableTemplate.bind({});
OptionSelection.args = {
  label: "Select status",
  modelValue: "active",
  options: [
    { label: "Active", value: "active" },
    { label: "Pending", value: "pending" },
    { label: "Archived", value: "archived" },
  ],
};

export const MultipleOptionSelection = SelectableTemplate.bind({});
MultipleOptionSelection.args = {
  label: "Select status",
  modelValue: ["active", "pending", "archived"],
  multiple: true,
  options: [
    { label: "Active", value: "active" },
    { label: "Pending", value: "pending" },
    { label: "Archived", value: "archived" },
  ],
};

export const Size = EnumTemplate.bind({});
Size.args = { enum: "size", label: "{enumValue}" };

export const Color = EnumTemplate.bind({});
Color.args = { enum: "color", label: "{enumValue}", options: [] };

export const ListboxXPosition = EnumTemplate.bind({});
ListboxXPosition.args = {
  enum: "xPosition",
  label: "{enumValue}",
};

export const ListboxYPosition = EnumTemplate.bind({});
ListboxYPosition.args = { enum: "yPosition", label: "{enumValue}" };
ListboxYPosition.parameters = {
  storyClasses: "h-[350px] flex items-center px-6 pt-8 pb-12",
};

export const OptionsLimit = DefaultTemplate.bind({});
OptionsLimit.args = { optionsLimit: 2 };
OptionsLimit.parameters = {
  docs: {
    description: {
      story: "`optionsLimit` prop controls the number of options displayed in the dropdown.",
    },
  },
};

export const VisibleOptions = DefaultTemplate.bind({});
VisibleOptions.args = { visibleOptions: 2 };
VisibleOptions.parameters = {
  docs: {
    description: {
      story: "`visibleOptions` prop controls the number of options you can see without a scroll.",
    },
  },
};

export const CustomTriggerBadge = DefaultTemplate.bind({});
CustomTriggerBadge.args = {
  label: "Custom Trigger",
  slotTemplate: `
    <template #default="{ opened, label, toggle, elementId }">
      <UBadge :id="elementId" :label="label" color="primary" @click="toggle">
        <template #right>
          <UIcon name="expand_more" color="inherit" size="xs" />
        </template>
      </UBadge>
    </template>
  `,
};

export const CustomTriggerAvatar = DefaultTemplate.bind({});
CustomTriggerAvatar.args = {
  label: "John Doe",
  slotTemplate: `
    <template #default="{ opened, label, toggle, elementId }">
      <UAvatar :id="elementId" :label="label" interactive @click="toggle" />
    </template>
  `,
};

export const EmptySlot = DefaultTemplate.bind({});
EmptySlot.args = {
  options: [],
  slotTemplate: `
    <template #empty>
      <URow align="center">
        <ULoader loading size="sm" />
        <UText label="Loading, this may take a while..." />
      </URow>
    </template>
  `,
};

export const OptionSlots: StoryFn<DefaultUDropdownArgs> = (args) => ({
  components: { UDropdown, UButton, UIcon, URow, UCol, UBadge, UText },
  setup: () => ({ args }),
  template: `
    <URow>
      <UDropdown
        v-model="args.beforeOptionModel"
        label="Before option slot"
        :options="[
          { label: 'John Doe', value: '1', role: 'Developer', status: 'online', statusColor: 'success' },
          { label: 'Jane Smith', value: '2', role: 'Designer', status: 'away', statusColor: 'warning' },
          { label: 'Mike Johnson', value: '3', role: 'Product Manager', status: 'offline', statusColor: 'grayscale' },
        ]"
      >
        <template #default="{ opened, label, toggle, elementId }">
          <UButton :id="elementId" :label="label" @click="toggle">
            <template #right>
              <UIcon name="keyboard_arrow_down" color="inherit" />
            </template>
          </UButton>
        </template>
        <template #before-option="{ option }">
          <UIcon name="person" size="sm" />
        </template>
      </UDropdown>

      <UDropdown
        v-model="args.optionModel"
        label="Option slot"
        :options="[
          { label: 'John Doe', value: '1', role: 'Developer', status: 'online', statusColor: 'success' },
          { label: 'Jane Smith', value: '2', role: 'Designer', status: 'away', statusColor: 'warning' },
          { label: 'Mike Johnson', value: '3', role: 'Product Manager', status: 'offline', statusColor: 'grayscale' },
        ]"
      >
        <template #default="{ opened, label, toggle, elementId }">
          <UButton :id="elementId" :label="label" @click="toggle">
            <template #right>
              <UIcon name="keyboard_arrow_down" color="inherit" />
            </template>
          </UButton>
        </template>
        <template #option="{ option }">
          <URow align="center" gap="xs">
            <UCol gap="none">
              <UText size="sm">{{ option.label }}</UText>
              <UText variant="lifted" size="xs">{{ option.role }}</UText>
            </UCol>
            <UBadge :label="option.status" :color="option.statusColor" size="sm" variant="subtle" />
          </URow>
        </template>
      </UDropdown>
    </URow>
  `,
});
OptionSlots.parameters = {
  docs: {
    story: {
      height: "300px",
    },
  },
};

export const CustomDropdownSlot: StoryFn<DefaultUDropdownArgs> = (args) => ({
  components: { UDropdown, UAvatar, URow, UCol, UText, UButton },
  setup: () => ({ args }),
  template: `
    <UDropdown label="John Doe">
      <template #default="{ opened, label, toggle, elementId }">
        <UAvatar :id="elementId" :label="label" interactive @click="toggle" />
      </template>
      <template #dropdown="{ hide }">
        <div class="bg-white rounded-lg shadow-lg p-4 w-64">
          <URow gap="sm" align="center">
            <UAvatar label="John Doe" size="lg" />
            <UCol gap="none">
              <UText size="md" weight="semibold">John Doe</UText>
              <UText size="sm" variant="lifted">john.doe@example.com</UText>
            </UCol>
          </URow>
          <div class="border-t border-gray-200 my-3"></div>
          <UCol gap="xs">
            <UButton label="Profile" variant="thirdary" size="sm" block @click="hide" />
            <UButton label="Settings" variant="thirdary" size="sm" block @click="hide" />
            <UButton label="Logout" variant="thirdary" size="sm" block color="red" @click="hide" />
          </UCol>
        </div>
      </template>
    </UDropdown>
  `,
});
CustomDropdownSlot.parameters = {
  docs: {
    description: {
      story:
        "The `dropdown` slot allows you to replace the default UListbox with completely custom content. " +
        "This is useful for creating custom menus, user profile dropdowns, or any other custom dropdown content.",
    },
    story: {
      height: "350px",
    },
  },
};
