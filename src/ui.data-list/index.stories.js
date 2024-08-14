import { getArgTypes, getSlotNames, getSlotsFragment } from "../service.storybook";

import UDataList from "../ui.data-list";
import UIcon from "../ui.image-icon";
import URow from "../ui.container-row";

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
    ...getArgTypes(UDataList.name),
  },
};

const DefaultTemplate = (args) => ({
  components: { UDataList, UIcon, URow },
  setup() {
    function onDragSort(value) {
      this.list = value;
    }

    const slots = getSlotNames(UDataList.name);

    return { args, slots, onDragSort };
  },
  template: `
    <UDataList v-bind="args" @dragSort="onDragSort">
      ${args.slotTemplate || getSlotsFragment()}
    </UDataList>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const emptyState = DefaultTemplate.bind({});
emptyState.args = {
  list: [],
  emptyTitle: "The list is empty.",
  emptyDescription: "There is no data in the list.",
};

export const nesting = DefaultTemplate.bind({});
nesting.args = { nesting: true };

export const slotLabel = DefaultTemplate.bind({});
slotLabel.args = {
  slotTemplate: `
    <template #label="{ item }">
      <URow gap="xs" align="center">
        {{ item.label }}
        <UIcon name="check" color="green" size="sm" />
      </URow>
    </template>
  `,
};

export const slotActions = DefaultTemplate.bind({});
slotActions.args = {
  slotTemplate: `
    <template #actions>
      <UIcon interactive name="star" color="red" />
    </template>
  `,
};
