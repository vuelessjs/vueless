import { ref } from "vue";
import {
  getArgTypes,
  getSlotNames,
  getSlotsFragment,
  getDocsDescription,
} from "../../utils/storybook.ts";

import UDataList from "../../ui.data-list/UDataList.vue";
import UIcon from "../../ui.image-icon/UIcon.vue";
import UButton from "../../ui.button/UButton.vue";
import URow from "../../ui.container-row/URow.vue";
import UBadge from "../../ui.text-badge/UBadge.vue";
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
        children: [
          { label: "Office Supplies", id: 1.1 },
          { label: "Travel & Lodging", id: 1.2 },
          { label: "Utilities", id: 1.3 },
        ],
      },
      {
        label: "Revenue Streams",
        id: 2,
        children: [
          { label: "Product Sales", id: 2.1 },
          { label: "Subscription Services", id: 2.2 },
          { label: "Consulting", id: 2.3 },
        ],
      },
      {
        label: "Departments",
        id: 3,
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
  components: { UDataList, UIcon, URow, UButton, UBadge, UAvatar, ULoader, UHeader },
  directives: { tooltip },
  setup() {
    const slots = getSlotNames(UDataList.__name);

    const avatars = [
      "https://cdn-icons-png.flaticon.com/128/1999/1999625.png",
      "https://cdn-icons-png.flaticon.com/128/4140/4140057.png",
      "https://cdn-icons-png.flaticon.com/128/4140/4140047.png",
    ];

    const list = ref(
      args.list?.map((item, index) => ({
        ...item,
        id: item.id,
        avatar: avatars[index % avatars.length],
      })),
    );

    function removeItem(targetItem: DataListItem) {
      list.value = list.value?.filter((listItem) => listItem.id !== targetItem.id);

      return alert(`Removed item: ${JSON.stringify(targetItem, null, 2)}`);
    }

    function editItem(targetItem: DataListItem) {
      alert(`Edit item: ${JSON.stringify(targetItem, null, 2)}`);
    }

    return { args, slots, removeItem, editItem, list };
  },
  template: `
    <UDataList v-bind="args" :list="args.slotTemplate ? list : args.list">
      ${args.slotTemplate || getSlotsFragment("")}
    </UDataList>
  `,
});

const EnumVariantTemplate: StoryFn<UDataListArgs> = (args: UDataListArgs, { argTypes }) => ({
  components: { URow, UDataList, UHeader },
  setup() {
    return {
      args,
      options: argTypes?.[args.enum]?.options,
    };
  },
  template: `
    <div v-for="(option, index) in options" :key="index">
      <UHeader :label="option" size="xs" />
      <UDataList v-bind="args" :[args.enum]="option" class="mb-4" />
    </div>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const EmptyState = DefaultTemplate.bind({});
EmptyState.args = { list: [] };
EmptyState.parameters = {
  docs: {
    description: {
      story:
        "The `emptyTitle` and `emptyDescription` props are used to display a message when the list is empty.",
    },
  },
};

export const Nesting = DefaultTemplate.bind({});
Nesting.args = { nesting: true };

export const Size = EnumVariantTemplate.bind({});
Size.args = { enum: "size" };

export const SlotLabel = DefaultTemplate.bind({});
SlotLabel.args = {
  slotTemplate: `
    <template #label="{ item }">
      <UBadge :label="item.label" />
    </template>
  `,
};

export const SlotEmpty = DefaultTemplate.bind({});
SlotEmpty.args = {
  list: [],
  emptyTitle: "Fetching data...",
  emptyDescription: "Please wait until data is received.",
  config: {
    wrapper: "flex flex-col items-center justify-center py-10 gap-4",
  },
  slotTemplate: `
    <template #empty="{ emptyTitle, emptyDescription }">
      <ULoader loading size="lg" />
      <UHeader :label="emptyTitle" size="xs" />
      <p>{{ emptyDescription }}</p>
    </template>
  `,
};

export const SlotDrag = DefaultTemplate.bind({});
SlotDrag.args = {
  list: [
    { label: "John Doe (Engineering)", id: 1 },
    { label: "Michael Johnson (Finance)", id: 2 },
    { label: "Emma Smith (Marketing)", id: 3 },
  ],
  slotTemplate: `
    <template #drag="{ item }">
      <UAvatar :src="item.avatar" rounded="full" />
    </template>
  `,
};

export const SlotActions = DefaultTemplate.bind({});
SlotActions.args = {
  slotTemplate: `
    <template #actions="{ item }">
      <UButton label="Export" size="xs" />
      <UIcon
        name="delete"
        size="sm"
        color="red"
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
