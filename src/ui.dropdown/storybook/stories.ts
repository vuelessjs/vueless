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
  buttonClass?: string;
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
        height: "230px",
      },
    },
  },
} as Meta;

const defaultTemplate = `
  <UAvatar label="John Doe" />
`;

const DefaultTemplate: StoryFn<DefaultUDropdownArgs> = (args: DefaultUDropdownArgs) => ({
  components: { UDropdown, UButton, UIcon, ULink, UBadge, ULoader, URow, UCol, UText, UAvatar },
  setup: () => ({ args, slots: getSlotNames(UDropdown.__name) }),
  template: `
    <UDropdown v-bind="args">
      ${args.slotTemplate || getSlotsFragment(defaultTemplate)}
    </UDropdown>
  `,
});

const SelectableTemplate: StoryFn<DefaultUDropdownArgs> = (args: DefaultUDropdownArgs) => ({
  components: { UDropdown, UButton, UIcon, UAvatar },
  setup: () => ({ args, slots: getSlotNames(UDropdown.__name) }),
  template: `
    <UDropdown v-bind="args" v-model="args.modelValue">
      ${args.slotTemplate || getSlotsFragment(defaultTemplate)}
    </UDropdown>
  `,
});

const EnumTemplate: StoryFn<EnumUDropdownArgs> = (args: EnumUDropdownArgs, { argTypes }) => ({
  components: { UDropdown, UButton, UIcon, URow, UAvatar },
  setup: () => ({ args, argTypes, getArgs }),
  template: `
    <URow>
      <UDropdown
        v-for="option in argTypes?.[args.enum]?.options"
        v-bind="getArgs(args, option)"
        :key="option"
        #default="{ opened }"
      >
        <UButton :[args.enum]="option" :label="option" :class="args.buttonClass" />
      </UDropdown>
    </URow>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const Disabled = DefaultTemplate.bind({});
Disabled.args = { disabled: true };
Disabled.parameters = {
  docs: {
    story: {
      height: "120px",
    },
  },
};

export const Searchable = DefaultTemplate.bind({});
Searchable.args = { searchable: true };
Searchable.parameters = {
  docs: {
    story: {
      height: "270px",
    },
  },
};

export const SearchModelValue = DefaultTemplate.bind({});
SearchModelValue.args = { searchable: true, search: "Copy" };
SearchModelValue.parameters = {
  docs: {
    story: {
      height: "270px",
    },
  },
};

export const NoCloseOnSelect = SelectableTemplate.bind({});
NoCloseOnSelect.args = {
  modelValue: "pending",
  closeOnSelect: false,
  options: [
    { label: "Active", value: "active" },
    { label: "Pending", value: "pending" },
    { label: "Archived", value: "archived" },
  ],
  slotTemplate: `
    <template #default>
      <UButton label="Select status" />
    </template>
  `,
};

export const OptionSelection = SelectableTemplate.bind({});
OptionSelection.args = {
  modelValue: "active",
  options: [
    { label: "Active", value: "active" },
    { label: "Pending", value: "pending" },
    { label: "Archived", value: "archived" },
  ],
  slotTemplate: `
    <template #default>
      <UButton label="Select status" />
    </template>
  `,
};

export const MultipleOptionSelection = SelectableTemplate.bind({});
MultipleOptionSelection.args = {
  modelValue: ["active", "pending", "archived"],
  multiple: true,
  options: [
    { label: "Active", value: "active" },
    { label: "Pending", value: "pending" },
    { label: "Archived", value: "archived" },
  ],
  slotTemplate: `
    <template #default>
      <UButton label="Select status" />
    </template>
  `,
};

export const Size = EnumTemplate.bind({});
Size.args = { enum: "size" };

export const Color = EnumTemplate.bind({});
Color.args = { enum: "color" };

export const ListboxXPosition = EnumTemplate.bind({});
ListboxXPosition.args = { enum: "xPosition", buttonClass: "min-w-32" };

export const ListboxYPosition = EnumTemplate.bind({});
ListboxYPosition.args = { enum: "yPosition" };
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

export const EmptySlot = DefaultTemplate.bind({});
EmptySlot.args = {
  options: [],
  slotTemplate: `
    ${defaultTemplate}
    <template #empty>
      <UCol align="center" gap="xs" class="w-32 p-2">
        <ULoader loading size="sm" />
        <UText align="center" label="Loading, this may take a while..." />
      </UCol>
    </template>
  `,
};

export const OptionSlots: StoryFn<DefaultUDropdownArgs> = (args) => ({
  components: { UDropdown, UAvatar, UIcon, URow, UCol, UBadge, UText },
  setup: () => ({ args }),
  template: `
    <URow>
      <UDropdown
        :options="[
          { label: 'John Doe', value: '1', role: 'Developer' },
          { label: 'Jane Smith', value: '2', role: 'Designer' },
          { label: 'Mike Johnson', value: '3', role: 'Product Manager' },
        ]"
      >
        <UAvatar label="John Doe" />
        <template #before-option="{ option }">
          <UIcon name="person" size="xs" color="neutral" />
        </template>
      </UDropdown>

      <UDropdown
        :options="[
          { label: 'John Doe', value: '1', role: 'Developer', status: 'online', statusColor: 'success' },
          { label: 'Jane Smith', value: '2', role: 'Designer', status: 'away', statusColor: 'warning' },
          { label: 'Mike Johnson', value: '3', role: 'Product Manager', status: 'offline', statusColor: 'grayscale' },
        ]"
      >
        <UAvatar label="Jane Smith" />
        <template #option="{ option }">
          <URow align="center" gap="xs" justify="between" class="w-40">
            <UCol gap="none">
              <UText size="sm">{{ option.label }}</UText>
              <UText variant="lifted" size="xs">{{ option.role }}</UText>
            </UCol>
            <UBadge :label="option.status" :color="option.statusColor" size="sm" variant="subtle" />
          </URow>
        </template>
      </UDropdown>

      <UDropdown
        :options="[
          { label: 'John Doe', value: '1', verified: true },
          { label: 'Jane Smith', value: '2', verified: true },
          { label: 'Mike Johnson', value: '3', verified: false },
        ]"
      >
        <UAvatar label="Mike Johnson" />
        <template #after-option="{ option }">
          <UIcon v-if="option.verified" name="verified" size="xs" color="success" />
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
