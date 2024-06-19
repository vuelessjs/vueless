import { getArgTypes, getSlotNames } from "../service.storybook";
import { getRandomId } from "../service.ui";

import UTable from "../ui.data-table";
import UButton from "../ui.button";
import ULink from "../ui.button-link";
import UMoney from "../ui.text-money";
import UBadge from "../ui.text-badge";
import URow from "../ui.container-row";

const STICKY_PARAMETERS = {
  docs: {
    story: {
      inline: false,
      iframeHeight: 450,
    },
  },
};

/**
 * The `UTable` component. | [View on GitHub](https://github.com/vuelessjs/vueless/tree/main/src/ui.data-table)
 */
export default {
  id: "7010",
  title: "Data / Table",
  component: UTable,
  argTypes: {
    ...getArgTypes(UTable.name),
    row: {
      description:
        "The row of the table. It's not a prop (it created for ease of work with storybook).",
    },
    numberOfRows: {
      description:
        "The number of table rows. It's not a prop (it created for ease of work with storybook).",
    },
  },
  args: {
    columns: [
      { key: "key_1", label: "title 1", thClass: "w-2/5" },
      { key: "key_2", label: "title 2" },
      { key: "key_3", label: "title 3" },
      { key: "key_4", label: "title 4" },
    ],
    row: {
      id: 1,
      isChecked: false,
      key_1: {
        primary: "primary",
        secondary: "secondary",
      },
      key_2: {
        primary: "primary",
        secondary: "secondary",
      },
      key_3: {
        primary: "primary",
        secondary: "secondary",
      },
      key_4: {
        primary: "primary",
        secondary: "secondary",
      },
    },
    numberOfRows: 5,
  },
};

const DefaultTemplate = (args) => ({
  components: { UTable },
  setup() {
    const slots = getSlotNames(UTable.name);

    return { args, slots };
  },
  template: `
    <UTable
      v-bind="args"
      :rows="itemsData"
    >
    </UTable>
  `,
  computed: {
    itemsData() {
      let rows = [];

      for (let i = 0; i < args.numberOfRows; i++) {
        const newRow = { ...args.row };

        newRow.id = getRandomId();
        rows.push(newRow);
      }

      return rows;
    },
  },
});

const EmptyTemplate = (args) => ({
  components: { UTable },
  setup() {
    const slots = getSlotNames(UTable.name);

    return { args, slots };
  },
  template: `
    <UTable v-bind="args" :rows="[]" />
  `,
});

const SlotTemplate = (args) => ({
  components: { UTable, UButton, ULink, UMoney, UBadge, URow },
  setup() {
    return { args };
  },
  template: `
    <UTable
      v-bind="args"
      :rows="itemsData"
    >
      ${args.slotTemplate}
    </UTable>
  `,
  computed: {
    itemsData() {
      let rows = [];

      for (let i = 0; i < args.numberOfRows; i++) {
        const newRow = { ...args.row };

        newRow.id = getRandomId();
        rows.push(newRow);
      }

      return rows;
    },
  },
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const Empty = EmptyTemplate.bind({});
Empty.args = {};

export const Filters = EmptyTemplate.bind({});
Filters.args = { filters: true };

export const selectable = DefaultTemplate.bind({});
selectable.args = { selectable: true };

export const stickyHeader = DefaultTemplate.bind({});
stickyHeader.parameters = STICKY_PARAMETERS;
stickyHeader.args = {
  numberOfRows: 50,
  selectable: true,
  stickyHeader: true,
};

export const stickyFooter = SlotTemplate.bind({});
stickyFooter.parameters = STICKY_PARAMETERS;
stickyFooter.args = {
  numberOfRows: 50,
  selectable: true,
  stickyFooter: true,
  slotTemplate: `
    <template #footer>
      <td>
        <p>
          🤘🤘🤘
          Lorem ipsum dolor sit amet.
        </p>
      </td>
    </template>
  `,
};

export const compact = DefaultTemplate.bind({});
compact.args = { compact: true };

export const DateDivider = DefaultTemplate.bind({});
DateDivider.args = { dateDivider: true };

export const DateDividerCustomLabel = DefaultTemplate.bind({});
DateDividerCustomLabel.args = {
  dateDivider: [
    {
      date: new Date(1709046013 * 1000).toString(),
      label: "Label for this date",
    },
  ],
};

export const slotDefault = SlotTemplate.bind({});
slotDefault.args = {
  slotTemplate: `
    <template #cell-key_3="{value}">
      🤘🤘🤘
    </template>
  `,
};

export const slotHeaderActions = SlotTemplate.bind({});
slotHeaderActions.args = {
  numberOfRows: 50,
  stickyHeader: true,
  selectable: true,
  slotTemplate: `
    <template #header-actions>
      <URow gap="2xs">
        <UButton
          label="Edit"
          variant="thirdary"
          color="blue"
          size="sm"
        />

        <UButton
          label="Delete"
          variant="thirdary"
          color="blue"
          size="sm"
        />
      </URow>
    </template>
  `,
};

export const slotBeforeFirstRow = SlotTemplate.bind({});
slotBeforeFirstRow.args = {
  slotTemplate: `
    <template #before-first-row>
      <p>
        🤘🤘🤘
        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
        sed do eiusmod tempor incididunt ut labore et dolore magna
        aliqua.
      </p>
    </template>
  `,
};

export const slotAfterLastRow = SlotTemplate.bind({});
slotAfterLastRow.args = {
  slotTemplate: `
    <template #after-last-row>
      <p>
        🤘🤘🤘
        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
        sed do eiusmod tempor incididunt ut labore et dolore magna
        aliqua.
      </p>
    </template>
  `,
};

export const slotFooter = SlotTemplate.bind({});
slotFooter.args = {
  slotTemplate: `
    <template #footer>
      <td>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          sed do eiusmod tempor incididunt ut labore et dolore magna
          aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
      </td>
    </template>
  `,
};

export const cellSlots = SlotTemplate.bind({});
cellSlots.args = {
  columns: [
    { key: "link", label: "link" },
    { key: "money", label: "money", thClass: "text-right" },
    { key: "email", label: "email" },
    { key: "tags", label: "tags" },
  ],
  row: {
    link: "some link",
    money: {
      sum: 10,
      currencySymbol: "$",
    },
    email: "some@email.ua",
    tags: {
      tags: { label: "some tag" },
      variant: "orange",
    },
  },

  slotTemplate: `
    <template #cell-link="{ value }">
      <ULink :url="value" :label="value" />
    </template>

    <template #cell-money="{ value }">
      <UMoney :sum="value.sum" :symbol="value.currencySymbol" />
    </template>

    <template #cell-email="{ value }">
      <ULink :label="value" :url="value" type="email" size="sm" />
    </template>

    <template #cell-tags="{ value }">
      <UBadge
        v-for="item in value.tags"
        :key="item"
        :label="item"
        :color="value.variant"
      />
    </template>
  `,
};
