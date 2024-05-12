import { getArgTypes, getSlotNames } from "../service.storybook";

import UDataList from "../ui.data-list";
import UIcon from "../ui.image-icon";

export default {
  id: "7020",
  title: "Data / Data List",
  component: UDataList,
  args: {
    list: [
      {
        name: "name 1",
        id: 1,
        children: [
          { name: "name 1.1", id: 1.1 },
          { name: "name 1.2", id: 1.2 },
          { name: "name 1.3", id: 1.3 },
        ],
      },
      {
        name: "name 2",
        id: 2,
        children: [
          { name: "name 2.1", id: 2.1 },
          { name: "name 2.2", id: 2.2 },
        ],
      },
      {
        name: "name 3",
        id: 3,
      },
    ],
  },
  argTypes: {
    ...getArgTypes(UDataList.name),
  },
};

const DefaultTemplate = (args) => ({
  components: { UDataList },
  setup() {
    const slots = getSlotNames(UDataList.name);

    return { args, slots };
  },
  template: `
    <UDataList v-bind="args" @dragSort="onDragSort"/>
  `,
  methods: {
    onDragSort(value) {
      this.list = value;
    },
  },
});

const SlotTemplate = (args) => ({
  components: { UDataList, UIcon },
  setup() {
    return { args };
  },
  template: `
    <UDataList v-bind="args" @dragSort="onDragSort">
      ${args.slotTemplate}
    </UDataList>
  `,
  methods: {
    onDragSort(value) {
      this.list = value;
    },
  },
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const nesting = DefaultTemplate.bind({});
nesting.args = { nesting: true };

export const slotIcons = SlotTemplate.bind({});
slotIcons.args = {
  slotTemplate: `
    <template #icons>
      <UIcon
        name="star"
        color="red"
       />
    </template>
  `,
};
