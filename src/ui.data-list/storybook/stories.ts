import {
  getArgs,
  getArgTypes,
  getSlotNames,
  getSlotsFragment,
  getDocsDescription,
} from "../../utils/storybook.ts";

import UDataList from "../../ui.data-list/UDataList.vue";
import UIcon from "../../ui.image-icon/UIcon.vue";
import UButton from "../../ui.button/UButton.vue";
import URow from "../../ui.container-row/URow.vue";
import ULink from "../../ui.button-link/ULink.vue";
import UAvatar from "../../ui.image-avatar/UAvatar.vue";
import UHeader from "../../ui.text-header/UHeader.vue";
import ULoader from "../../ui.loader/ULoader.vue";
import tooltip from "../../directives/tooltip/vTooltip.ts";

import type { Meta, StoryFn } from "@storybook/vue3";
import type { Props, DataListItem } from "../types.ts";

interface UDataListArgs extends Props {
  slotTemplate?: string;
  enum: "size";
}

export default {
  id: "7020",
  title: "Data / Data List",
  component: UDataList,
  args: {
    list: [
      {
        label: "Expenses",
        id: 1,
        nesting: true,
        children: [
          { label: "Office Supplies", id: 1.1 },
          { label: "Travel & Lodging", id: 1.2 },
          { label: "Utilities", id: 1.3 },
        ],
      },
      {
        label: "Revenue Streams",
        id: 2,
        nesting: true,
        children: [
          { label: "Product Sales", id: 2.1 },
          { label: "Subscription Services", id: 2.2 },
          { label: "Consulting", id: 2.3 },
        ],
      },
      {
        label: "Departments",
        id: 3,
        nesting: true,
        children: [
          { label: "Engineering", id: 3.1 },
          { label: "Marketing", id: 3.2 },
          { label: "Finance", id: 3.3 },
        ],
      },
    ],
  },
  argTypes: {
    ...getArgTypes(UDataList.__name),
  },
  parameters: {
    docs: {
      ...getDocsDescription(UDataList.__name),
    },
  },
} as Meta;

const DefaultTemplate: StoryFn<UDataListArgs> = (args: UDataListArgs) => ({
  components: { UDataList, UIcon, URow, UButton, UAvatar, ULoader, UHeader, ULink },
  directives: { tooltip },
  setup: () => ({
    args,
    slots: getSlotNames(UDataList.__name),
    removeItem: (targetItem: DataListItem) =>
      alert(`Removed item: ${JSON.stringify(targetItem, null, 2)}`),
    editItem: (targetItem: DataListItem) =>
      alert(`Edit item: ${JSON.stringify(targetItem, null, 2)}`),
  }),
  template: `
    <UDataList v-bind="args">
      ${args.slotTemplate || getSlotsFragment("")}
    </UDataList>
  `,
});

const EnumTemplate: StoryFn<UDataListArgs> = (args: UDataListArgs, { argTypes }) => ({
  components: { URow, UDataList },
  setup: () => ({ args, argTypes, getArgs }),
  template: `
    <UDataList
      v-for="option in argTypes?.[args.enum]?.options"
      v-bind="getArgs(args, option)"
      :key="option"
      class="mb-4"
    />
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const EmptyState = DefaultTemplate.bind({});
EmptyState.args = { list: [] };

export const Nesting = DefaultTemplate.bind({});
Nesting.args = { nesting: true };

export const Sizes = EnumTemplate.bind({});
Sizes.args = { enum: "size" };

export const LabelSlot = DefaultTemplate.bind({});
LabelSlot.args = {
  slotTemplate: `
    <template #label="{ item }">
      <ULink :label="item.label" />
    </template>
  `,
};

export const EmptySlot = DefaultTemplate.bind({});
EmptySlot.args = {
  list: [],
  config: {
    wrapper: "flex flex-col items-center justify-center py-10 gap-4",
    i18n: {
      emptyTitle: "Fetching data...",
      emptyDescription: "Please wait until data is received.",
    },
  },
  slotTemplate: `
    <template #empty="{ emptyTitle, emptyDescription }">
      <ULoader loading size="lg" />
      <UHeader :label="emptyTitle" size="xs" />
      <p>{{ emptyDescription }}</p>
    </template>
  `,
};
EmptySlot.parameters = {
  docs: {
    description: {
      story:
        "You can customize the `empty` slot's props (`emptyTitle` and `emptyDescription`) using the `i18n` config key.",
    },
  },
};

export const DragSlot = DefaultTemplate.bind({});
DragSlot.args = {
  list: [
    {
      label: "John Doe (Engineering)",
      id: 1,
      avatar: "https://cdn-icons-png.flaticon.com/128/1999/1999625.png",
    },
    {
      label: "Michael Johnson (Finance)",
      id: 2,
      avatar: "https://cdn-icons-png.flaticon.com/128/4140/4140057.png",
    },
    {
      label: "Emma Smith (Marketing)",
      id: 3,
      avatar: "https://cdn-icons-png.flaticon.com/128/4140/4140047.png",
    },
  ],
  slotTemplate: `
    <template #drag="{ item }">
      <UAvatar :src="item.avatar" rounded="full" />
    </template>
  `,
};

export const ActionsSlot = DefaultTemplate.bind({});
ActionsSlot.args = {
  nesting: true,
  list: [
    {
      label: "Expenses",
      id: 1,
    },
    {
      label: "Revenue Streams",
      id: 2,
      actions: false,
      nesting: true,
      children: [
        { label: "Product Sales", id: 2.1 },
        { label: "Subscription Services", id: 2.2 },
        { label: "Consulting", id: 2.3 },
      ],
    },
    {
      label: "Departments",
      id: 3,
      crossed: true,
    },
  ],
  slotTemplate: `
    <template #actions="{ item }">
      <UButton label="Export" variant="soft" size="xs" />
      <UIcon
        name="delete"
        size="sm"
        color="error"
        interactive
        v-tooltip="'Delete'"
        @click="removeItem(item)"
      />
      <UIcon
        name="edit_note"
        size="sm"
        color="grayscale"
        interactive
        v-tooltip="'Edit'"
        @click="editItem(item)"
      />
    </template>
  `,
};
ActionsSlot.parameters = {
  docs: {
    description: {
      story: `
You can use meta keys on list items such as \`crossed\` (for line-through style),
\`actions\` (to toggle actions visibility), \`nesting\` (to enable nesting for the item),
and \`children\` (for nested items). See the the docs below for more info.
      `,
    },
  },
};
