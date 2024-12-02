import { getArgTypes, getSlotNames, getSlotsFragment } from "../../utils/storybook.ts";

import UDataList from "../../ui.data-list/UDataList.vue";
import UIcon from "../../ui.image-icon/UIcon.vue";
import UButton from "../../ui.button/UButton.vue";
import URow from "../../ui.container-row/URow.vue";

import type { Meta, StoryFn } from "@storybook/vue3";
import type { UDataListProps } from "../types.ts";

interface UDataListArgs extends UDataListProps {
  slotTemplate?: string;
}

/**
 * The `UDataList` component. | [View on GitHub](https://github.com/vuelessjs/vueless/tree/main/src/ui.data-list)
 */
export default {
  id: "7020",
  title: "Data / Data List",
  component: UDataList,
  args: {
    list: [
      {
        label: "Salary",
        id: 1,
        children: [
          { label: "IT", id: 1.1 },
          { label: "HR", id: 1.2 },
          { label: "C Level", id: 1.3 },
        ],
      },
      {
        label: "Rent",
        id: 2,
        children: [
          { label: "Office", id: 2.1 },
          { label: "Shops", id: 2.2 },
        ],
      },
      {
        label: "Marketing",
        id: 3,
      },
    ],
  },
  argTypes: {
    ...getArgTypes(UDataList.__name),
  },
} as Meta;

const DefaultTemplate: StoryFn<UDataListArgs> = (args: UDataListArgs) => ({
  components: { UDataList, UIcon, URow, UButton },
  setup() {
    const slots = getSlotNames(UDataList.__name);

    return { args, slots };
  },
  template: `
    <UDataList v-bind="args">
      ${args.slotTemplate || getSlotsFragment("")}
    </UDataList>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const EmptyState = DefaultTemplate.bind({});
EmptyState.args = {
  list: [],
  emptyTitle: "The list is empty.",
  emptyDescription: "There is no data in the list.",
};

export const Nesting = DefaultTemplate.bind({});
Nesting.args = { nesting: true };

export const SlotLabel = DefaultTemplate.bind({});
SlotLabel.args = {
  slotTemplate: `
    <template #label="{ item }">
      <URow gap="xs" align="center">
        {{ item.label }}
        <UIcon name="check" color="green" size="sm" />
      </URow>
    </template>
  `,
};

export const SlotActions = DefaultTemplate.bind({});
SlotActions.args = {
  slotTemplate: `
    <template #actions>
      <UIcon interactive name="star" color="red" />
    </template>
  `,
};

export const SlotDrag = DefaultTemplate.bind({});
SlotDrag.args = {
  slotTemplate: `
    <template #drag>
      <UIcon interactive name="swap_vert" size="sm" />
    </template>
  `,
};

export const SlotDelete = DefaultTemplate.bind({});
SlotDelete.args = {
  slotTemplate: `
    <template #delete>
      <UButton label="Delete" size="xs" variant="secondary" color="red" />
    </template>
  `,
};

export const SlotEdit = DefaultTemplate.bind({});
SlotEdit.args = {
  slotTemplate: `
    <template #edit>
      <UButton label="Edit" size="xs" variant="secondary" color="grayscale" />
    </template>
  `,
};
