import type { Meta, StoryFn } from "@storybook/vue3";
import {
  getArgTypes,
  getSlotNames,
  getSlotsFragment,
  getDocsDescription,
} from "../../utils/storybook.ts";
import { getRandomId } from "../../utils/helper.ts";

import UTable from "../UTable.vue";
import UButton from "../../ui.button/UButton.vue";
import ULink from "../../ui.button-link/ULink.vue";
import UMoney from "../../ui.text-money/UMoney.vue";
import UBadge from "../../ui.text-badge/UBadge.vue";
import URow from "../../ui.container-row/URow.vue";

import type { Row, UTableProps } from "../types.ts";

interface UTableArgs extends UTableProps {
  slotTemplate?: string;
  enum: "size";
  numberOfRows: number;
  row: Row | typeof getRow | typeof getNestedRow | typeof getNestedContentRow;
}

const SHORT_STORY_PARAMETERS = {
  docs: {
    story: {
      inline: false,
      iframeHeight: 450,
    },
  },
};

export default {
  id: "7010",
  title: "Data / Table",
  component: UTable,
  argTypes: {
    ...getArgTypes(UTable.__name),
    row: {
      table: {
        disable: true,
      },
    },
    numberOfRows: {
      description: "The number of table rows (not a component prop).",
    },
  },
  args: {
    columns: [
      { key: "key_1", label: "title 1", thClass: "w-2/5" },
      { key: "key_2", label: "title 2" },
      { key: "key_3", label: "title 3" },
      { key: "key_4", label: "title 4" },
    ],
    row: getRow,
    numberOfRows: 5,
  },
  parameters: {
    docs: {
      ...getDocsDescription(UTable.__name),
    },
  },
} as Meta;

function getDateDividerRow() {
  return {
    id: getRandomId(),
    isChecked: false,
    rowDate: new Date().toString(),
    key_1: "Info",
    key_2: "Statistics",
    key_3: "Reports",
    key_4: "Discounts",
  };
}

function getNestedRow() {
  return {
    id: getRandomId(),
    isChecked: false,
    key_1: "Click to expand",
    key_2: "Some data",
    key_3: "Numbers",
    key_4: "Statistics",
    row: [
      {
        id: getRandomId(),
        isChecked: false,
        isShown: false,
        key_1: "Nesting",
        key_2: "Nesting",
        key_3: "Nesting",
        key_4: "Nesting",
        row: {
          id: getRandomId(),
          isChecked: false,
          isShown: false,
          key_1: "Second level nesting",
          key_2: "Second level nesting",
          key_3: "Second level nesting",
          key_4: "Second level nesting",
        },
      },
      {
        id: getRandomId(),
        isChecked: false,
        isShown: false,
        key_1: "Nesting",
        key_2: "Nesting",
        key_3: "Nesting",
        key_4: "Nesting",
        row: {
          id: getRandomId(),
          isChecked: false,
          isShown: false,
          key_1: "Second level nesting",
          key_2: "Second level nesting",
          key_3: "Second level nesting",
          key_4: "Second level nesting",
          row: {
            id: getRandomId(),
            isChecked: false,
            isShown: false,
            key_1: "Third level nesting",
            key_2: "Third level nesting",
            key_3: "Third level nesting",
            key_4: "Third level nesting",
          },
        },
      },
    ],
  };
}

function getRow() {
  return {
    id: getRandomId(),
    isChecked: false,
    key_1: "Info",
    key_2: "Statistics",
    key_3: "Reports",
    key_4: "Discounts",
  };
}

function getNestedContentRow(index: number) {
  if (index === 0) {
    return {
      id: getRandomId(),
      isChecked: false,
      key_1: "Row with nested content",
      key_2: "Basic data",
      key_3: "More info",
      nestedData: {
        isChecked: false,
        isShown: false,
        rows: [
          {
            id: getRandomId(),
            key_1: "Detail 1A",
            key_2: "Info 1B",
            key_3: "Data 1C",
          },
          {
            id: getRandomId(),
            key_1: "Detail 2A",
            key_2: "Info 2B",
            key_3: "Data 2C",
          },
          {
            id: getRandomId(),
            key_1: "Detail 3A",
            key_2: "Info 3B",
            key_3: "Data 3C",
          },
        ],
      },
    };
  } else {
    return {
      id: getRandomId(),
      isChecked: false,
      key_1: `Regular row ${index}`,
      key_2: "Standard info",
      key_3: "Basic data",
    };
  }
}

const DefaultTemplate: StoryFn<UTableArgs> = (args: UTableArgs) => ({
  components: { UTable, UButton, ULink, UMoney, UBadge, URow },
  setup() {
    const slots = getSlotNames(UTable.__name);

    return { args, slots };
  },
  template: `
    <UTable
      v-bind="args"
      :rows="args.rows || itemsData"
    >
      ${args.slotTemplate || getSlotsFragment("")}
    </UTable>
  `,
  computed: {
    itemsData() {
      const rows = [];

      if (typeof args.row === "function") {
        for (let i = 0; i < args.numberOfRows; i++) {
          rows.push(args.row(i));
        }
      } else {
        rows.push(args.row);
      }

      return rows;
    },
  },
});

const EmptyTemplate: StoryFn<UTableArgs> = (args: UTableArgs) => ({
  components: { UTable },
  setup() {
    const slots = getSlotNames(UTable.__name);

    return { args, slots };
  },
  template: `
    <UTable v-bind="args" :rows="[]" />
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const Nesting = DefaultTemplate.bind({});
Nesting.args = { row: getNestedRow, selectable: true };

export const NestedContent = DefaultTemplate.bind({});
NestedContent.args = {
  columns: [
    { key: "key_1", label: "Title 1" },
    { key: "key_2", label: "Title 2" },
    { key: "key_3", label: "Title 3" },
  ],
  row: getNestedContentRow,
  slotTemplate: `
    <template #nested-content="{ row }">
      <div class="p-4 bg-gray-100">
        <UTable
          :columns="[
            { key: 'key_1', label: 'Detail' },
            { key: 'key_2', label: 'Info' },
            { key: 'key_3', label: 'Data' },
          ]"
          :rows="row.nestedData.rows"
          compact
        />
      </div>
    </template>
  `,
};

export const RowAndCellClasses = DefaultTemplate.bind({});
RowAndCellClasses.args = {
  rows: [
    {
      id: getRandomId(),
      isChecked: false,
      key_1: "Info",
      key_2: "Statistics",
      key_3: { value: "Reports", class: "bg-red-200" },
      key_4: "Discounts",
    },
    {
      id: getRandomId(),
      isChecked: false,
      class: "bg-green-100",
      key_1: "Data",
      key_2: "Meetings",
      key_3: "Calendar",
      key_4: "Departments",
    },
    {
      id: getRandomId(),
      isChecked: false,
      key_1: "Events",
      key_2: "Sales",
      key_3: "Renovation",
      key_4: "Calendar",
    },
  ],
};

export const Empty = EmptyTemplate.bind({});
Empty.args = {};

export const Selectable = DefaultTemplate.bind({});
Selectable.args = { selectable: true };

export const StickyHeader = DefaultTemplate.bind({});
StickyHeader.parameters = SHORT_STORY_PARAMETERS;
StickyHeader.args = { numberOfRows: 50, selectable: true, stickyHeader: true };

export const StickyFooter = DefaultTemplate.bind({});
StickyFooter.parameters = SHORT_STORY_PARAMETERS;
StickyFooter.args = {
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

export const Compact = DefaultTemplate.bind({});
Compact.args = { compact: true };

export const DateDivider = DefaultTemplate.bind({});
DateDivider.args = { dateDivider: true, row: getDateDividerRow };

export const DateDividerCustomLabel = DefaultTemplate.bind({});
DateDividerCustomLabel.args = {
  rows: Array(10)
    .fill({})
    .map(() => getDateDividerRow()),
  dateDivider: [{ date: new Date().toString(), label: "Custom label for specific date" }],
};

export const SlotDefault = DefaultTemplate.bind({});
SlotDefault.args = {
  slotTemplate: `
    <template #cell-key_3="{value}">
      🤘🤘🤘
    </template>
  `,
};

export const SlotExpand = DefaultTemplate.bind({});
SlotExpand.args = {
  row: getNestedRow,
  slotTemplate: `
    <template #expand="{ row, isExpanded }">
      <div v-if="isExpanded">
        🔼
      </div>
      <div v-if="!isExpanded">
        🔽
      </div>
    </template>
  `,
};

export const SlotHeaderActions = DefaultTemplate.bind({});
SlotHeaderActions.parameters = SHORT_STORY_PARAMETERS;
SlotHeaderActions.args = {
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

export const SlotBeforeFirstRow = DefaultTemplate.bind({});
SlotBeforeFirstRow.args = {
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

export const SlotAfterLastRow = DefaultTemplate.bind({});
SlotAfterLastRow.args = {
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

export const SlotFooter = DefaultTemplate.bind({});
SlotFooter.args = {
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

export const CellSlots = DefaultTemplate.bind({});
CellSlots.args = {
  columns: [
    { key: "link", label: "link" },
    { key: "money", label: "money", thClass: "text-right" },
    { key: "email", label: "email" },
    { key: "tags", label: "tags" },
  ],
  row: {
    id: getRandomId(),
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
    row: [
      {
        id: getRandomId(),
        isShown: true,
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
      {
        id: getRandomId(),
        isShown: true,
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
    ],
  },

  slotTemplate: `
    <template #cell-link="{ value }">
      <ULink :url="value" :label="value" />
    </template>

    <template #cell-money="{ value }">
      <UMoney :sum="value.sum" :symbol="value.currencySymbol" />
    </template>

    <template #cell-email="{ value }">
      <ULink :label="value" :url="value" type="email" />
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
