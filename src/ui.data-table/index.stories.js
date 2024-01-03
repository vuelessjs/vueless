import { getArgTypes, getSlotNames } from "vueless/service.storybook";

import UTable from "vueless/ui.data-table";
import UButton from "vueless/ui.button";

const ROW_CLASS = "pt-4 p-3";
const FOOTER_CLASS = "flex justify-between p-3";

export default {
  title: "Data / Table",
  component: UTable,
  argTypes: {
    ...getArgTypes(UTable.name),
    itemsRow: {
      description:
        "The row of the table. It's not a prop (it created for ease of work with storybook).",
    },
    numberOfRow: {
      description:
        "The number of table rows. It's not a prop (it created for ease of work with storybook).",
    },
  },
  args: {
    headers: [
      { value: "value_1", text: "title 1", thClass: "w-2/5" },
      { value: "value_2", text: "title 2" },
      { value: "value_3", text: "title 3" },
      { value: "value_4", text: "title 4" },
    ],
    itemsRow: {
      value_1: {
        primaryRow: "primaryRow",
        secondaryRow: "secondaryRow",
      },
      value_2: {
        primaryRow: "primaryRow",
        secondaryRow: "secondaryRow",
      },
      value_3: {
        primaryRow: "primaryRow",
        secondaryRow: "secondaryRow",
      },
      value_4: {
        primaryRow: "primaryRow",
        secondaryRow: "secondaryRow",
      },
    },
    numberOfRow: 5,
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
      :items="itemsData"
    >
    </UTable>
  `,
  computed: {
    itemsData() {
      const items = [];

      for (let i = 0; i < args.numberOfRow; i++) items.push(args.itemsRow);

      return items;
    },
  },
});

const SlotTemplate = (args) => ({
  components: { UTable, UButton },
  setup() {
    return { args };
  },
  template: `
    <UTable
      v-bind="args"
      :items="itemsData"
    >
      ${args.slotTemplate}
    </UTable>
  `,
  computed: {
    itemsData() {
      const items = [];

      for (let i = 0; i < args.numberOfRow; i++) items.push(args.itemsRow);

      return items;
    },
  },
});

// TODO: Find how to interrupt styles inside a component for UMoney.
export const Default = DefaultTemplate.bind({});
Default.args = {};

export const defaultCells = DefaultTemplate.bind({});
defaultCells.args = {
  headers: [
    { value: "date", text: "date" },
    { value: "link", text: "link" },
    { value: "money", text: "money", thClass: "text-right" },
    { value: "email", text: "email" },
    { value: "tags", text: "tags" },
  ],
  itemsRow: {
    date: 1645692407,
    link: "some link",
    money: {
      sum: 10,
      currencySymbol: "$",
    },
    email: "some email",
    tags: {
      tags: { text: "some tag" },
      variant: "orange",
    },
  },
};

export const selectable = DefaultTemplate.bind({});
selectable.args = { selectable: true };

// TODO: Don't work fixed footer. Find how to fix it.
export const fixedFooter = SlotTemplate.bind({});
fixedFooter.args = {
  fixedFooter: true,
  selectable: true,
  slotTemplate: `
    <template #tfoot>
      <p class="${ROW_CLASS}">
        🤘🤘🤘
        Lorem ipsum dolor sit amet.
      </p>
    </template>
  `,
};

export const stickyHeader = DefaultTemplate.bind({});
stickyHeader.args = { stickyHeader: true };

export const compact = DefaultTemplate.bind({});
compact.args = { compact: true };

export const slotDefault = SlotTemplate.bind({});
slotDefault.args = {
  slotTemplate: `
    <template #cell-value_3="{value}">
      🤘🤘🤘
    </template>
  `,
};

export const slotTheadActions = SlotTemplate.bind({});
slotTheadActions.args = {
  selectable: true,
  slotTemplate: `
    <template #thead-actions>
      <p class="${ROW_CLASS}">
        🤘🤘🤘
        Lorem ipsum dolor sit amet.
      </p>

      <UButton
        size="sm"
        variant="thirdary"
        filled
        text="some button"
      />

      <UButton
        size="sm"
        variant="thirdary"
        filled
        text="some button"
      />
    </template>
  `,
};

export const slotBeforeFirstRow = SlotTemplate.bind({});
slotBeforeFirstRow.args = {
  slotTemplate: `
    <template #before-first-row>
      <p class="${ROW_CLASS}">
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
      <p class="${ROW_CLASS}">
        🤘🤘🤘
        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
        sed do eiusmod tempor incididunt ut labore et dolore magna
        aliqua.
      </p>
    </template>
  `,
};

export const slotTfoot = SlotTemplate.bind({});
slotTfoot.args = {
  slotTemplate: `
    <template #tfoot>
      <div class="${FOOTER_CLASS}">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          sed do eiusmod tempor incididunt ut labore et dolore magna
          aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
      </div>
    </template>
  `,
};
