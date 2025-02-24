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
import UIcon from "../../ui.image-icon/UIcon.vue";
import ULoader from "../../ui.loader/ULoader.vue";

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
      { key: "orderId", label: "Order Id", thClass: "w-2/5" },
      { key: "customerName", label: "Customer Name" },
      { key: "status", label: "Status" },
      { key: "totalPrice", label: "Total Price" },
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

function getDateDividerRow(rowAmount: number) {
  return Array(rowAmount)
    .fill({})
    .map((_, index) => {
      let rowDate = new Date().toString();

      if (index > 1) {
        const date = new Date();

        date.setFullYear(date.getFullYear() + 1);

        rowDate = date.toDateString();
      }

      return {
        id: getRandomId(),
        isChecked: false,
        rowDate,
        orderId: `ORD-${Math.floor(Math.random() * 10000)}`,
        customerName: ["Alice Johnson", "Michael Smith", "Emma Brown", "James Wilson"][
          Math.floor(Math.random() * 4)
        ],
        status: ["Pending", "Shipped", "Delivered", "Cancelled"][Math.floor(Math.random() * 4)],
        totalPrice: `$${(Math.random() * 500).toFixed(2)}`,
      };
    });
}

function getRow() {
  return {
    id: getRandomId(),
    isChecked: false,
    orderId: `ORD-${Math.floor(Math.random() * 10000)}`,
    customerName: ["Alice Johnson", "Michael Smith", "Emma Brown", "James Wilson"][
      Math.floor(Math.random() * 4)
    ],
    status: ["Pending", "Shipped", "Delivered", "Cancelled"][Math.floor(Math.random() * 4)],
    totalPrice: `$${(Math.random() * 500).toFixed(2)}`,
  };
}

function getNestedRow() {
  return {
    id: getRandomId(),
    isChecked: false,
    orderId: `ORD-${Math.floor(Math.random() * 10000)}`,
    customerName: ["Alice Johnson", "Michael Smith", "Emma Brown", "James Wilson"][
      Math.floor(Math.random() * 4)
    ],
    status: ["Processing", "Shipped", "Delivered", "Cancelled"][Math.floor(Math.random() * 4)],
    totalPrice: `$${(Math.random() * 500).toFixed(2)}`,
    row: [
      {
        id: getRandomId(),
        isChecked: false,
        isShown: false,
        orderId: "Suborder-1",
        customerName: "",
        status: "",
        totalPrice: `$${(Math.random() * 500).toFixed(2)}`,
        row: {
          id: getRandomId(),
          isChecked: false,
          isShown: false,
          orderId: "Extra Services",
          customerName: "",
          status: "",
          totalPrice: `$${(Math.random() * 500).toFixed(2)}`,
        },
      },
      {
        id: getRandomId(),
        isChecked: false,
        isShown: false,
        orderId: "Suborder-2",
        customerName: "",
        status: "",
        totalPrice: `$${(Math.random() * 500).toFixed(2)}`,
        row: {
          id: getRandomId(),
          isChecked: false,
          isShown: false,
          orderId: "Extra Services",
          customerName: "",
          status: "",
          totalPrice: `$${(Math.random() * 500).toFixed(2)}`,
        },
      },
    ],
  };
}

function getNestedContentRow(index: number) {
  if (index === 1) {
    return {
      id: getRandomId(),
      isChecked: false,
      orderId: `ORD-${Math.floor(Math.random() * 10000)}`,
      customerName: "John Doe",
      status: "Processing",
      nestedData: {
        isChecked: false,
        isShown: false,
        rows: [
          {
            id: getRandomId(),
            category: "Gadgets",
            itemName: "Ergonomic Mouse",
            quantity: 2,
          },
          {
            id: getRandomId(),
            category: "Gadgets",
            itemName: "Wireless Keyboard",
            quantity: 1,
          },
          {
            id: getRandomId(),
            category: "Electronics",
            itemName: "USB-C Hub",
            quantity: 3,
          },
        ],
      },
    };
  } else {
    return {
      id: getRandomId(),
      isChecked: false,
      orderId: `ORD-${Math.floor(Math.random() * 10000)}`,
      customerName: ["Alice Johnson", "Michael Smith", "Emma Brown", "James Wilson"][
        Math.floor(Math.random() * 4)
      ],
      status: ["Processing", "Shipped", "Delivered", "Cancelled"][Math.floor(Math.random() * 4)],
      totalPrice: `$${(Math.random() * 500).toFixed(2)}`,
    };
  }
}

const DefaultTemplate: StoryFn<UTableArgs> = (args: UTableArgs) => ({
  components: { UTable, UButton, ULink, UMoney, UBadge, URow, UIcon, ULoader },
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

export const Default = DefaultTemplate.bind({});
Default.args = {};

const LoadingTemplate: StoryFn<UTableArgs> = (args: UTableArgs) => ({
  components: { UTable, UButton },
  setup() {
    const slots = getSlotNames(UTable.__name);

    return { args, slots };
  },
  template: `
    <UButton
      label="Toggle loading"
      @click="args.loading = !args.loading"
      class="mb-4"
    />

    <UTable
      v-bind="args"
      :rows="args.rows"
    >
      ${args.slotTemplate || getSlotsFragment("")}
    </UTable>
  `,
});

export const Loading = LoadingTemplate.bind({});
Loading.args = {};
Loading.parameters = {
  docs: {
    description: {
      story: "Set table loader state.",
    },
  },
};

export const EmptyCellLabel = DefaultTemplate.bind({});
EmptyCellLabel.args = {
  emptyCellLabel: "NO DATA FOUND",
  rows: [
    {
      id: getRandomId(),
      isChecked: false,
      orderId: `ORD-${Math.floor(Math.random() * 10000)}`,
      customerName: "",
      status: "",
      totalPrice: `$${(Math.random() * 500).toFixed(2)}`,
    },
  ],
};
EmptyCellLabel.parameters = {
  docs: {
    description: {
      story: "Label to display for empty cell values.",
    },
  },
};

export const Nesting = DefaultTemplate.bind({});
Nesting.args = { row: getNestedRow };
Nesting.parameters = {
  docs: {
    description: {
      story:
        "If you need to have nested row(s) in the table, you can use the `row` key inside a row object.",
    },
  },
};

export const CellClasses = DefaultTemplate.bind({});
CellClasses.args = {
  rows: [
    {
      id: getRandomId(),
      isChecked: false,
      orderId: `ORD-${Math.floor(Math.random() * 10000)}`,
      customerName: "John Doe",
      status: { value: "Cancelled", class: "bg-red-200" },
      totalPrice: "$18.92",
    },
    {
      id: getRandomId(),
      isChecked: false,
      class: "bg-green-100",
      orderId: `ORD-${Math.floor(Math.random() * 10000)}`,
      customerName: "Bob Smith",
      status: "Delivered",
      totalPrice: "$173.11",
    },
    {
      id: getRandomId(),
      isChecked: false,
      orderId: `ORD-${Math.floor(Math.random() * 10000)}`,
      customerName: "Helen Williams",
      status: { value: "Delivered", contentClasses: "line-through" },
      totalPrice: "$314.26",
    },
  ],
};
CellClasses.parameters = {
  docs: {
    description: {
      story:
        // eslint-disable-next-line vue/max-len
        "To apply classes to a table content, you may use different approaches: <br/> 1. Pass a string with classes to the `class` key in a row object (classes are applied to the whole row). <br/> 2. Pass a string with classes to the `class` key in a cell object (classes are applied to the table cell, while the value is passed via a `value` key). <br/> 3. Pass a string with classes to the `contentClasses` key in a cell object (classes are applied to the cell content, while the value is passed via a `value` key).",
    },
  },
};

export const Empty = DefaultTemplate.bind({});
Empty.args = { rows: [] };

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
      <td colspan="4">
        <p class="font-semibold text-gray-700">
          📊 Summary: 50 transactions processed | Total Revenue: <strong>$12,345.67</strong>
        </p>
      </td>
    </template>
  `,
};

export const Compact = DefaultTemplate.bind({});
Compact.args = { compact: true };
Compact.parameters = {
  docs: {
    description: {
      story: "`compact` prop makes the table compact (fewer spacings).",
    },
  },
};

export const DateDivider = DefaultTemplate.bind({});
DateDivider.args = { dateDivider: true, rows: getDateDividerRow(4) };
DateDivider.parameters = {
  docs: {
    description: {
      story: "Show date divider line between dates.",
    },
  },
};

export const DateDividerCustomLabel = DefaultTemplate.bind({});
DateDividerCustomLabel.args = {
  rows: getDateDividerRow(4),
  dateDivider: [
    {
      date: getDateDividerRow(4).at(2)!.rowDate,
      label: "Custom label for specific date",
      config: { label: "!text-orange-400", divider: "!border-orange-300" },
    },
  ],
};
DateDividerCustomLabel.parameters = {
  docs: {
    description: {
      story:
        "You can customize date divider by passing necessary data in `date`, `label` and `config` object keys.",
    },
  },
};

export const SlotHeaderKey = DefaultTemplate.bind({});
SlotHeaderKey.args = {
  slotTemplate: `
    <template #header-status="{ column }">
      <UBadge :label="column?.label" />
    </template>
  `,
};

export const SlotHeaderKeyAfter = DefaultTemplate.bind({});
SlotHeaderKeyAfter.args = {
  columns: [
    { key: "orderId", label: "Order Id", thClass: "w-2/5" },
    {
      key: "customerName",
      label: "Customer Name",
      thClass: "grid grid-rows-none grid-cols-3 leading-normal",
    },
    { key: "status", label: "Status" },
    { key: "totalPrice", label: "Total Price" },
  ],
  slotTemplate: `
    <template #header-customerName-after>
      <UButton label="Sort clients" size="2xs" class="w-fit" />
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
          color="brand"
          size="sm"
        />

        <UButton
          label="Delete"
          variant="thirdary"
          color="brand"
          size="sm"
        />
      </URow>
    </template>
  `,
};

export const SlotBeforeHeader = DefaultTemplate.bind({});
SlotBeforeHeader.args = {
  slotTemplate: `
    <template #before-header>
      <p class="py-2">
        📅 Latest data updated on {{ new Date().toLocaleDateString() }}.
        Please verify all entries for accuracy before proceeding.
      </p>
    </template>
  `,
};

export const SlotBeforeFirstRow = DefaultTemplate.bind({});
SlotBeforeFirstRow.args = {
  slotTemplate: `
    <template #before-first-row>
      <p class="py-2">
        📌 Showing the latest data as of {{ new Date().toLocaleDateString() }}.
        Please ensure all entries are up to date.
      </p>
    </template>
  `,
};

export const CellSlots = DefaultTemplate.bind({});
CellSlots.args = {
  slotTemplate: `
    <template #cell-orderId="{ value }">
      <ULink :label="value" color="green" />
    </template>

    <template #cell-customerName="{ value }">
      <UBadge :label="value" />
    </template>

    <template #cell-totalPrice="{ value }">
      <UMoney :value="value.slice(1)" symbol="€" symbolAlign="left" />
    </template>
  `,
};

export const SlotExpand = DefaultTemplate.bind({});
SlotExpand.args = {
  row: getNestedRow,
  slotTemplate: `
    <template #expand="{ row, expanded }">
      <UBadge v-if="expanded" label="Collapse" class="cursor-pointer" />
      <UBadge v-if="!expanded" label="Expand" class="cursor-pointer" />
    </template>
  `,
};

export const SlotNestedContent = DefaultTemplate.bind({});
SlotNestedContent.args = {
  columns: [
    { key: "orderId", label: "Order Id" },
    { key: "customerName", label: "Customer Name" },
    { key: "status", label: "Status" },
  ],
  row: getNestedContentRow,
  slotTemplate: `
    <template #nested-content="{ row }">
      <div class="p-4 bg-gray-100">
        <UTable
          :columns="[
            { key: 'category', label: 'Category' },
            { key: 'itemName', label: 'Product' },
            { key: 'quantity', label: 'Quantity' },
          ]"
          :rows="row.nestedData.rows"
          compact
        />
      </div>
    </template>
  `,
};
SlotNestedContent.parameters = {
  docs: {
    description: {
      story:
        // eslint-disable-next-line vue/max-len
        "You can also pass nested content inside the row (to render a nested table, for example). Use the `nestedData` key inside a row object.",
    },
  },
};

export const SlotAfterLastRow = DefaultTemplate.bind({});
SlotAfterLastRow.args = {
  slotTemplate: `
    <template #after-last-row>
      <p class="py-2">
        ✅ End of results. If you need more data, try adjusting your filters or loading more entries.
      </p>
    </template>
  `,
};

export const SlotEmptyState = DefaultTemplate.bind({});
SlotEmptyState.args = {
  rows: [],
  config: {
    i18n: { noData: "Fetching data..." },
    bodyEmptyStateCell: "py-10",
  },
  slotTemplate: `
    <template #empty-state="{ noData }">
      <ULoader loading size="lg" :config="{ loader: 'mx-auto mb-2' }" />
      <p class="text-center">{{ noData }}</p>
    </template>
  `,
};
SlotEmptyState.parameters = {
  docs: {
    description: {
      story:
        "You can customize the `empty-state` slot's prop (`noData`) using the `i18n` config key.",
    },
  },
};

export const SlotFooter = DefaultTemplate.bind({});
SlotFooter.args = {
  slotTemplate: `
    <template #footer>
      <td colspan="100%" class="text-center">
        🔍 For more detailed insights, please visit our data analysis page or reach out to support for assistance.
      </td>
    </template>
  `,
};
