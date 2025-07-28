import type { Meta, StoryFn } from "@storybook/vue3-vite";
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
import UNumber from "../../ui.text-number/UNumber.vue";
import UBadge from "../../ui.text-badge/UBadge.vue";
import URow from "../../ui.container-row/URow.vue";
import UIcon from "../../ui.image-icon/UIcon.vue";
import ULoader from "../../ui.loader/ULoader.vue";

import type { Row, Props } from "../types.ts";

interface UTableArgs extends Props {
  slotTemplate?: string;
  enum: "size";
  numberOfRows: number;
  row: Row | typeof getRow;
}

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
  },
  args: {
    columns: [
      { key: "orderId", label: "Order Id", thClass: "w-2/5" },
      { key: "customerName", label: "Customer Name" },
      { key: "status", label: "Status" },
      { key: "totalPrice", label: "Total Price" },
    ],
    rows: [
      {
        id: getRandomId(),
        orderId: `ORD-${Math.floor(Math.random() * 10000)}`,
        customerName: ["Alice Johnson", "Michael Smith", "Emma Brown", "James Wilson"][
          Math.floor(Math.random() * 4)
        ],
        status: ["Pending", "Shipped", "Delivered", "Cancelled"][Math.floor(Math.random() * 4)],
        totalPrice: `$${(Math.random() * 500).toFixed(2)}`,
      },
      {
        id: getRandomId(),
        orderId: `ORD-${Math.floor(Math.random() * 10000)}`,
        customerName: ["Alice Johnson", "Michael Smith", "Emma Brown", "James Wilson"][
          Math.floor(Math.random() * 4)
        ],
        status: ["Pending", "Shipped", "Delivered", "Cancelled"][Math.floor(Math.random() * 4)],
        totalPrice: `$${(Math.random() * 500).toFixed(2)}`,
      },
      {
        id: "row-3",
        orderId: `ORD-${Math.floor(Math.random() * 10000)}`,
        customerName: ["Alice Johnson", "Michael Smith", "Emma Brown", "James Wilson"][
          Math.floor(Math.random() * 4)
        ],
        status: ["Pending", "Shipped", "Delivered", "Cancelled"][Math.floor(Math.random() * 4)],
        totalPrice: `$${(Math.random() * 500).toFixed(2)}`,
      },
      {
        id: getRandomId(),
        orderId: `ORD-${Math.floor(Math.random() * 10000)}`,
        customerName: ["Alice Johnson", "Michael Smith", "Emma Brown", "James Wilson"][
          Math.floor(Math.random() * 4)
        ],
        status: ["Pending", "Shipped", "Delivered", "Cancelled"][Math.floor(Math.random() * 4)],
        totalPrice: `$${(Math.random() * 500).toFixed(2)}`,
      },
    ],
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

        date.setFullYear(date.getFullYear());

        rowDate = date.toDateString();
      }

      return {
        id: getRandomId(),
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

function getRow(numberOfRows: number) {
  return Array.from({ length: numberOfRows }, () => ({
    id: getRandomId(),
    orderId: `ORD-${Math.floor(Math.random() * 10000)}`,
    customerName: ["Alice Johnson", "Michael Smith", "Emma Brown", "James Wilson"][
      Math.floor(Math.random() * 4)
    ],
    status: ["Pending", "Shipped", "Delivered", "Cancelled"][Math.floor(Math.random() * 4)],
    totalPrice: `$${(Math.random() * 500).toFixed(2)}`,
  }));
}

const DefaultTemplate: StoryFn<UTableArgs> = (args: UTableArgs) => ({
  components: { UTable, UButton, ULink, UNumber, UBadge, URow, UIcon, ULoader },
  setup: () => ({ args, slots: getSlotNames(UTable.__name) }),
  template: `
    <UTable v-bind="args">
      ${args.slotTemplate || getSlotsFragment("")}
    </UTable>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const Loading: StoryFn<UTableArgs> = (args: UTableArgs) => ({
  components: { UTable, UButton },
  setup: () => ({ args }),
  template: `
    <UButton
      label="Toggle loading"
      size="sm"
      class="mb-4"
      @click="args.loading = !args.loading"
    />

    <UTable
      :columns="[
        { key: 'orderId', label: 'Order Id', thClass: 'w-2/5' },
        { key: 'customerName', label: 'Customer Name' },
        { key: 'status', label: 'Status' },
        { key: 'totalPrice', label: 'Total Price' },
      ]"
      :rows="[]"
      :loading="args.loading"
    />
  `,
});
Loading.parameters = {
  docs: {
    description: {
      story: "Set table loader state.",
    },
  },
};

export const EmptyCellLabel = DefaultTemplate.bind({});
EmptyCellLabel.args = {
  emptyCellLabel: "---",
  rows: [
    {
      id: getRandomId(),
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
Nesting.args = {
  rows: [
    {
      id: getRandomId(),
      orderId: `ORD-${Math.floor(Math.random() * 10000)}`,
      customerName: ["Alice Johnson", "Michael Smith", "Emma Brown", "James Wilson"][
        Math.floor(Math.random() * 4)
      ],
      status: ["Pending", "Shipped", "Delivered", "Cancelled"][Math.floor(Math.random() * 4)],
      totalPrice: `$${(Math.random() * 500).toFixed(2)}`,
    },
    {
      id: getRandomId(),
      orderId: `ORD-${Math.floor(Math.random() * 10000)}`,
      customerName: ["Alice Johnson", "Michael Smith", "Emma Brown", "James Wilson"][
        Math.floor(Math.random() * 4)
      ],
      status: ["Processing", "Shipped", "Delivered", "Cancelled"][Math.floor(Math.random() * 4)],
      totalPrice: `$${(Math.random() * 500).toFixed(2)}`,
      row: [
        {
          id: getRandomId(),
          orderId: "Suborder-1",
          customerName: "",
          status: "",
          totalPrice: `$${(Math.random() * 500).toFixed(2)}`,
          row: {
            id: getRandomId(),
            orderId: "Extra Services",
            customerName: "",
            status: "",
            totalPrice: `$${(Math.random() * 500).toFixed(2)}`,
          },
        },
        {
          id: getRandomId(),
          orderId: "Suborder-2",
          customerName: "",
          status: "",
          totalPrice: `$${(Math.random() * 500).toFixed(2)}`,
          row: {
            id: getRandomId(),
            orderId: "Extra Services",
            customerName: "",
            status: "",
            totalPrice: `$${(Math.random() * 500).toFixed(2)}`,
          },
        },
      ],
    },
  ],
};
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
      orderId: { value: `ORD-${Math.floor(Math.random() * 10000)}`, class: "bg-error/25" },
      customerName: "John Doe",
      status: "Cancelled",
      totalPrice: "$18.92",
    },
    {
      id: getRandomId(),
      class: "!bg-success/25",
      orderId: `ORD-${Math.floor(Math.random() * 10000)}`,
      customerName: "Bob Smith",
      status: "Delivered",
      totalPrice: "$173.11",
    },
    {
      id: getRandomId(),
      orderId: {
        value: `ORD-${Math.floor(Math.random() * 10000)}`,
        contentClass: "text-green-300 line-through",
      },
      customerName: "Helen Williams",
      status: "Delivered",
      totalPrice: "$314.26",
    },
  ],
};
CellClasses.parameters = {
  docs: {
    description: {
      story:
        // eslint-disable-next-line vue/max-len
        "To apply classes to a table content, you may use different approaches: <br/> 1. Pass a string with classes to the `class` key in a row object (classes are applied to the whole row). <br/> 2. Pass a string with classes to the `class` key in a cell object (classes are applied to the table cell, while the value is passed via a `value` key). <br/> 3. Pass a string with classes to the `contentClass` key in a cell object (classes are applied to the cell content, while the value is passed via a `value` key).",
    },
  },
};

export const Empty = DefaultTemplate.bind({});
Empty.args = { rows: [] };

export const Selectable = DefaultTemplate.bind({});
Selectable.args = { selectable: true };

export const StickyHeader = DefaultTemplate.bind({});
StickyHeader.args = {
  rows: getRow(10),
  selectable: true,
  stickyHeader: true,
};
StickyHeader.parameters = {
  docs: {
    story: {
      inline: false,
      iframeHeight: 450,
    },
    source: {
      code: `
        <UTable
          sticky-header
          selectable
          :columns="[
            {'key':'orderId','label':'Order Id','thClass':'w-2/5'},
            {'key':'customerName','label':'Customer Name'},
            {'key':'status','label':'Status'},
            {'key':'totalPrice','label':'Total Price'}
          ]"
          :rows="[
            {
              'id': 'xsJCpznyamFLstB',
              'orderId': 'ORD-2339',
              'customerName': 'James Wilson',
              'status': 'Pending',
              'totalPrice': '$240.15'
            },
            {
              'id': 'RMHWrRRYAfpmPtR',
              'orderId': 'ORD-2927',
              'customerName': 'James Wilson',
              'status': 'Cancelled',
              'totalPrice': '$350.40'
            },
            {
              'id': 'HqCFkWgubiNvVhd',
              'orderId': 'ORD-5975',
              'customerName': 'Alice Johnson',
              'status': 'Shipped',
              'totalPrice': '$180.41'
            },
            {
              'id': 'nQyrwynyqIRUTPM',
              'orderId': 'ORD-8643',
              'customerName': 'Michael Smith',
              'status': 'Pending',
              'totalPrice': '$318.30'
            }
          ]"
        />
      `,
    },
  },
};

export const StickyFooter = DefaultTemplate.bind({});
StickyFooter.args = {
  rows: getRow(10),
  selectable: true,
  stickyFooter: true,
  slotTemplate: `
    <template #footer>
      <td colspan="4" class="p-4">
        <p class="font-semibold text-accented">
          📊 Summary: 50 transactions processed | Total Revenue: <strong>$12,345.67</strong>
        </p>
      </td>
    </template>
  `,
};
StickyFooter.parameters = {
  docs: {
    story: {
      inline: false,
      iframeHeight: 450,
    },
    source: {
      code: `
        <UTable
          sticky-footer
          selectable
          :columns="[
            {'key':'orderId','label':'Order Id','thClass':'w-2/5'},
            {'key':'customerName','label':'Customer Name'},
            {'key':'status','label':'Status'},
            {'key':'totalPrice','label':'Total Price'}
          ]"
          :rows="[
            {
              'id': 'xsJCpznyamFLstB',
              'orderId': 'ORD-2339',
              'customerName': 'James Wilson',
              'status': 'Pending',
              'totalPrice': '$240.15'
            },
            {
              'id': 'RMHWrRRYAfpmPtR',
              'orderId': 'ORD-2927',
              'customerName': 'James Wilson',
              'status': 'Cancelled',
              'totalPrice': '$350.40'
            },
            {
              'id': 'HqCFkWgubiNvVhd',
              'orderId': 'ORD-5975',
              'customerName': 'Alice Johnson',
              'status': 'Shipped',
              'totalPrice': '$180.41'
            },
            {
              'id': 'nQyrwynyqIRUTPM',
              'orderId': 'ORD-8643',
              'customerName': 'Michael Smith',
              'status': 'Pending',
              'totalPrice': '$318.30'
            }
          ]"
        />
      `,
    },
  },
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
      label: new Date().toLocaleDateString(undefined, {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
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

export const HeaderKeySlot = DefaultTemplate.bind({});
HeaderKeySlot.args = {
  slotTemplate: `
    <template #header-status="{ column }">
      <UBadge :label="column?.label" />
    </template>
  `,
};

export const HeaderActionsSlot = DefaultTemplate.bind({});
HeaderActionsSlot.args = {
  selectable: true,
  selectedRows: [{ id: "row-3" }],
  slotTemplate: `
    <template #header-actions>
      <URow gap="2xs">
        <UButton
          label="Edit"
          variant="ghost"
          color="primary"
          size="sm"
        />

        <UButton
          label="Delete"
          variant="ghost"
          color="primary"
          size="sm"
        />
      </URow>
    </template>
  `,
};

export const BeforeHeaderSlot = DefaultTemplate.bind({});
BeforeHeaderSlot.args = {
  slotTemplate: `
    <template #before-header="{ colsCount, classes }">
      <th :colspan="colsCount" :class="classes">📊 Latest orders report.</th>
    </template>
  `,
};

export const BeforeFirstRowSlot = DefaultTemplate.bind({});
BeforeFirstRowSlot.args = {
  slotTemplate: `
    <template #before-first-row>
      <UButton label="Load planned" size="xs" class="my-3" />
    </template>
  `,
};

export const CellSlots = DefaultTemplate.bind({});
CellSlots.args = {
  slotTemplate: `
    <template #cell-orderId="{ value }">
      <ULink :label="value" color="success" />
    </template>

    <template #cell-status="{ value }">
      <UBadge
        :label="value"
        variant="soft"
        :color="
          value === 'Delivered' ? 'success' :
          value === 'Cancelled' ? 'error' :
          value === 'Pending' ? 'notice' :
          value === 'Shipped' ? 'info' : ''
        "
      />
    </template>

    <template #cell-totalPrice="{ value }">
      <UNumber :value="value.slice(1)" currency="€" currency-align="left" />
    </template>
  `,
};

export const ExpandSlot = DefaultTemplate.bind({});
ExpandSlot.args = {
  rows: [
    {
      id: getRandomId(),
      orderId: `ORD-${Math.floor(Math.random() * 10000)}`,
      customerName: ["Alice Johnson", "Michael Smith", "Emma Brown", "James Wilson"][
        Math.floor(Math.random() * 4)
      ],
      status: ["Pending", "Shipped", "Delivered", "Cancelled"][Math.floor(Math.random() * 4)],
      totalPrice: `$${(Math.random() * 500).toFixed(2)}`,
    },
    {
      id: getRandomId(),
      orderId: `ORD-${Math.floor(Math.random() * 10000)}`,
      customerName: ["Alice Johnson", "Michael Smith", "Emma Brown", "James Wilson"][
        Math.floor(Math.random() * 4)
      ],
      status: ["Processing", "Shipped", "Delivered", "Cancelled"][Math.floor(Math.random() * 4)],
      totalPrice: `$${(Math.random() * 500).toFixed(2)}`,
      row: [
        {
          id: getRandomId(),
          orderId: "Suborder-1",
          customerName: "",
          status: "",
          totalPrice: `$${(Math.random() * 500).toFixed(2)}`,
          row: {
            id: getRandomId(),
            orderId: "Extra Services",
            customerName: "",
            status: "",
            totalPrice: `$${(Math.random() * 500).toFixed(2)}`,
          },
        },
        {
          id: getRandomId(),
          orderId: "Suborder-2",
          customerName: "",
          status: "",
          totalPrice: `$${(Math.random() * 500).toFixed(2)}`,
          row: {
            id: getRandomId(),
            orderId: "Extra Services",
            customerName: "",
            status: "",
            totalPrice: `$${(Math.random() * 500).toFixed(2)}`,
          },
        },
      ],
    },
  ],
  slotTemplate: `
    <template #expand="{ expanded }">
      <UButton
        :icon="expanded ? 'remove' : 'add'"
        variant="ghost"
        size="xs"
        square
      />
    </template>
  `,
};

export const NestedRowSlot = DefaultTemplate.bind({});
NestedRowSlot.args = {
  columns: [
    { key: "orderId", label: "Order Id" },
    { key: "customerName", label: "Customer Name" },
    { key: "status", label: "Status" },
  ],
  rows: [
    {
      id: getRandomId(),
      orderId: `ORD-${Math.floor(Math.random() * 10000)}`,
      customerName: ["Alice Johnson", "Michael Smith", "Emma Brown", "James Wilson"][
        Math.floor(Math.random() * 4)
      ],
      status: ["Processing", "Shipped", "Delivered", "Cancelled"][Math.floor(Math.random() * 4)],
      totalPrice: `$${(Math.random() * 500).toFixed(2)}`,
    },
    {
      id: getRandomId(),
      orderId: `ORD-${Math.floor(Math.random() * 10000)}`,
      customerName: "John Doe",
      status: "Processing",
      row: {
        id: getRandomId(),
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
    },
    {
      id: getRandomId(),
      orderId: `ORD-${Math.floor(Math.random() * 10000)}`,
      customerName: ["Alice Johnson", "Michael Smith", "Emma Brown", "James Wilson"][
        Math.floor(Math.random() * 4)
      ],
      status: ["Processing", "Shipped", "Delivered", "Cancelled"][Math.floor(Math.random() * 4)],
      totalPrice: `$${(Math.random() * 500).toFixed(2)}`,
    },
    {
      id: getRandomId(),
      orderId: `ORD-${Math.floor(Math.random() * 10000)}`,
      customerName: ["Alice Johnson", "Michael Smith", "Emma Brown", "James Wilson"][
        Math.floor(Math.random() * 4)
      ],
      status: ["Processing", "Shipped", "Delivered", "Cancelled"][Math.floor(Math.random() * 4)],
      totalPrice: `$${(Math.random() * 500).toFixed(2)}`,
    },
  ],
  slotTemplate: `
    <template #nested-row="{ row }">
      <div class="p-4 bg-lifted">
          <UTable
            :columns="[
              { key: 'category', label: 'Category' },
              { key: 'itemName', label: 'Product' },
              { key: 'quantity', label: 'Quantity' },
            ]"
            :rows="row.rows"
            compact
          />
      </div>
    </template>
  `,
};

export const AfterLastRowSlot = DefaultTemplate.bind({});
AfterLastRowSlot.args = {
  slotTemplate: `
    <template #after-last-row="{ colsCount, classes }">
      <td :colspan="colsCount" :class="classes">
        <URow block justify="end">
          Totals:
          <UNumber
            color="success"
            :value="${Math.random() * 500}"
            currency="$"
          />
        </URow>
      </td>
    </template>
  `,
};

export const EmptyStateSlot = DefaultTemplate.bind({});
EmptyStateSlot.args = {
  rows: [],
  config: {
    i18n: { noData: "Fetching data..." },
    bodyEmptyStateCell: "py-10",
  },
  slotTemplate: `
    <template #empty-state>
      <ULoader loading size="lg" :config="{ loader: 'mx-auto mb-4' }" />
      <p class="text-center">Fetching latest data, please wait...</p>
    </template>
  `,
};

export const FooterSlot = DefaultTemplate.bind({});
FooterSlot.args = {
  slotTemplate: `
    <template #footer>
      <td colspan="100%" class="px-2">
        🔍 For more detailed insights, please visit our data analysis page or reach out to support for assistance.
      </td>
    </template>
  `,
};
