import { getArgTypes, getSlotNames, getSlotsFragment } from "../../utils/utilStorybook.js";
import { getRandomId } from "../../utils/utilUI.js";

import UTable from "../../ui.data-table/UTable.vue";
import UButton from "../../ui.button/UButton.vue";
import ULink from "../../ui.button-link/ULink.vue";
import UMoney from "../../ui.text-money/UMoney.vue";
import UBadge from "../../ui.text-badge/UBadge.vue";
import URow from "../../ui.container-row/URow.vue";

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
    ...getArgTypes(UTable.__name),
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
    row: getRow,
    numberOfRows: 5,
  },
};

function getNestedRow() {
  return {
    id: getRandomId(),
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
    row: {
      id: getRandomId(),
      isChecked: false,
      isHidden: true,
      key_1: {
        primary: "Nesting",
        secondary: "secondary",
      },
      key_2: {
        primary: "Nesting",
        secondary: "secondary",
      },
      key_3: {
        primary: "Nesting",
        secondary: "secondary",
      },
      key_4: {
        primary: "Nesting",
        secondary: "secondary",
      },
      row: {
        id: getRandomId(),
        isChecked: false,
        isHidden: true,
        key_1: {
          primary: "Two level nesting",
          secondary: "secondary",
        },
        key_2: {
          primary: "Two level nesting",
          secondary: "secondary",
        },
        key_3: {
          primary: "Two level nesting",
          secondary: "secondary",
        },
        key_4: {
          primary: "Two level nesting",
          secondary: "secondary",
        },
        row: {
          id: getRandomId(),
          isChecked: false,
          isHidden: true,
          key_1: {
            primary: "Three level nesting",
            secondary: "secondary",
          },
          key_2: {
            primary: "Three level nesting",
            secondary: "secondary",
          },
          key_3: {
            primary: "Three level nesting",
            secondary: "secondary",
          },
          key_4: {
            primary: "Three level nesting",
            secondary: "secondary",
          },
        },
      },
    },
  };
}

function getRow() {
  return {
    id: getRandomId(),
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
  };
}

const DefaultTemplate = (args) => ({
  components: { UTable, UButton, ULink, UMoney, UBadge, URow },
  setup() {
    const slots = getSlotNames(UTable.__name);

    return { args, slots };
  },
  template: `
    <UTable
      v-bind="args"
      :rows="itemsData"
    >
      ${args.slotTemplate || getSlotsFragment()}
    </UTable>
  `,
  computed: {
    itemsData() {
      let rows = [];

      if (typeof args.row === "function") {
        for (let i = 0; i < args.numberOfRows; i++) {
          rows.push(args.row());
        }
      } else {
        rows.push(args.row);
      }

      return rows;
    },
  },
});

const EmptyTemplate = (args) => ({
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
Nesting.args = {
  row: getNestedRow,
  selectable: true,
};

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

export const stickyFooter = DefaultTemplate.bind({});
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

export const slotDefault = DefaultTemplate.bind({});
slotDefault.args = {
  slotTemplate: `
    <template #cell-key_3="{value}">
      🤘🤘🤘
    </template>
  `,
};

export const slotHeaderActions = DefaultTemplate.bind({});
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

export const slotBeforeFirstRow = DefaultTemplate.bind({});
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

export const slotAfterLastRow = DefaultTemplate.bind({});
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

export const slotFooter = DefaultTemplate.bind({});
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

export const cellSlots = DefaultTemplate.bind({});
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
