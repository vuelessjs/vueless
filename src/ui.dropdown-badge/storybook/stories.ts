import {
  getArgs,
  getArgTypes,
  getSlotNames,
  getSlotsFragment,
  getDocsDescription,
} from "../../utils/storybook";

import UDropdownBadge from "../../ui.dropdown-badge/UDropdownBadge.vue";
import URow from "../../ui.container-row/URow.vue";
import UCol from "../../ui.container-col/UCol.vue";
import UIcon from "../../ui.image-icon/UIcon.vue";
import ULink from "../../ui.button-link/ULink.vue";
import UAvatar from "../../ui.image-avatar/UAvatar.vue";
import UText from "../../ui.text-block/UText.vue";
import UBadge from "../../ui.text-badge/UBadge.vue";
import ULoader from "../../ui.loader/ULoader.vue";

import type { Meta, StoryFn } from "@storybook/vue3-vite";
import type { Props } from "../types";

import johnDoe from "../../ui.form-select/storybook/assets/images/john-doe.png";
import emilyDavis from "../../ui.form-select/storybook/assets/images/emily-davis.png";
import alexJohnson from "../../ui.form-select/storybook/assets/images/alex-johnson.png";
import patMorgan from "../../ui.form-select/storybook/assets/images/pat-morgan.png";

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
      { label: "Pending", value: "pending" },
      { label: "Delivered", value: "delivered" },
      { label: "Cancelled", value: "cancelled" },
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
  components: { UDropdownBadge, UIcon, ULink, UAvatar, URow, UCol, UText, ULoader },
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

const GroupValuesTemplate: StoryFn<DefaultUDropdownBadgeArgs> = (
  args: DefaultUDropdownBadgeArgs,
) => ({
  components: { UDropdownBadge },
  setup() {
    return {
      args,
    };
  },
  template: `
    <UDropdownBadge
      v-bind="args"
      v-model="args.modelValue"
      label="Single"
      :config="{ listbox: 'min-w-[200px]' }"
      class="max-w-96 mr-20"
    />

    <UDropdownBadge
      v-bind="args"
      v-model="args.modelValueMultiple"
      label="Multiple"
      multiple
      :config="{ listbox: 'min-w-[200px]' }"
      class="mt-5 max-w-96"
    />
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
      height: "250px",
    },
  },
};

export const SearchModelValue = DefaultTemplate.bind({});
SearchModelValue.args = { searchable: true, search: "Delivered" };
SearchModelValue.parameters = {
  docs: {
    story: {
      height: "250px",
    },
  },
};

export const NoCloseOnSelect = SelectableTemplate.bind({});
NoCloseOnSelect.args = { modelValue: "delivered", closeOnSelect: false };

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

export const GroupValue = GroupValuesTemplate.bind({});
GroupValue.args = {
  modelValue: "",
  groupValueKey: "libs",
  groupLabelKey: "language",
  labelKey: "name",
  valueKey: "name",
  options: [
    {
      language: "Javascript",
      libs: [{ name: "Vue.js" }, { name: "Adonis" }],
    },
    {
      language: "Ruby",
      libs: [
        { name: "Frameworks", isSubGroup: true, level: 2 },
        { name: "Rails", level: 3 },
        { name: "Sinatra", level: 3 },
      ],
    },
    {
      language: "Other",
      libs: [{ name: "Laravel" }, { name: "Phoenix" }],
    },
  ],
};
GroupValue.parameters = {
  docs: {
    story: {
      height: "400px",
    },
  },
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

export const Color = MultiEnumTemplate.bind({});
Color.args = {
  outerEnum: "variant",
  enum: "color",
  label: "{enumValue}",
  options: [],
};

export const WithoutToggleIcon = Default.bind({});
WithoutToggleIcon.args = { toggleIcon: false };

export const CustomToggleIcon = DefaultTemplate.bind({});
CustomToggleIcon.args = { toggleIcon: "expand_circle_down" };

export const DefaultSlot = DefaultTemplate.bind({});
DefaultSlot.args = {
  round: true,
  toggleIcon: false,
  options: [
    { label: "Change avatar", value: "avatar" },
    { label: "Profile settings", value: "settings" },
    { label: "Delete profile", value: "delete" },
  ],
  slotTemplate: `
    <template #default>
      <URow align="center" gap="xs">
        <UAvatar size="3xs" src="https://i.pravatar.cc/300" />
        <UText weight="semibold" size="sm" class="text-inverted">John Doe</UText>
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

export const OptionSlots: StoryFn<DefaultUDropdownBadgeArgs> = (args) => ({
  components: { UDropdownBadge, URow, UCol, UAvatar, UIcon, UBadge, UText },
  setup: () => ({ args, johnDoe, emilyDavis, alexJohnson, patMorgan }),
  template: `
    <URow>
      <UDropdownBadge
        v-model="args.beforeOptionModel"
        label="Before option slot"
        :options="[
          {
            label: 'John Doe',
            value: '1',
            role: 'Developer',
            avatar: johnDoe,
            status: 'online',
            statusColor: 'success',
          },
          {
            label: 'Jane Smith',
            value: '2',
            role: 'Designer',
            avatar: emilyDavis,
            status: 'away',
            statusColor: 'warning',
          },
          {
            label: 'Mike Johnson',
            value: '3',
            role: 'Product Manager',
            avatar: alexJohnson,
            status: 'offline',
            statusColor: 'grayscale',
          },
          {
            label: 'Sarah Wilson',
            value: '4',
            role: 'QA Engineer',
            avatar: patMorgan,
            status: 'online',
            statusColor: 'success',
          },
        ]"
      >
        <template #before-option="{ option }">
          <UAvatar :src="option.avatar" size="xs" />
        </template>
      </UDropdownBadge>

      <UDropdownBadge
        v-model="args.optionModel"
        label="Option slot"
        :options="[
          {
            label: 'John Doe',
            value: '1',
            role: 'Developer',
            avatar: johnDoe,
            status: 'online',
            statusColor: 'success',
          },
          {
            label: 'Jane Smith',
            value: '2',
            role: 'Designer',
            avatar: emilyDavis,
            status: 'away',
            statusColor: 'warning',
          },
          {
            label: 'Mike Johnson',
            value: '3',
            role: 'Product Manager',
            avatar: alexJohnson,
            status: 'offline',
            statusColor: 'grayscale',
          },
          {
            label: 'Sarah Wilson',
            value: '4',
            role: 'QA Engineer',
            avatar: patMorgan,
            status: 'online',
            statusColor: 'success',
          },
        ]"
      >
        <template #option="{ option }">
          <URow justify="between" align="center" gap="xs" block>
            <UCol gap="none">
              <UText size="sm">{{ option.label }}</UText>
              <UText variant="lifted" size="xs">{{ option.role }}</UText>
            </UCol>
            <UBadge
              :label="option.status"
              :color="option.statusColor"
              size="sm"
              variant="subtle"
            />
          </URow>
        </template>
      </UDropdownBadge>

      <UDropdownBadge
        v-model="args.afterOptionModel"
        label="After option slot"
        :options="[
          { label: 'John Doe', value: '1', verified: true },
          { label: 'Jane Smith', value: '2', verified: true },
          { label: 'Mike Johnson', value: '3', verified: false },
        ]"
      >
        <template #after-option="{ option }">
          <UIcon v-if="option.verified" name="verified" size="xs" color="success" />
        </template>
      </UDropdownBadge>
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
