import { getArgTypes, getSlotNames, getSlotsFragment } from "../utils/utilstorybook";

import UPagination from "../ui.navigation-pagination";

/**
 * The `UPagination` component. | [View on GitHub](https://github.com/vuelessjs/vueless/tree/main/src/ui.navigation-pagination)
 */
export default {
  id: "8050",
  title: "Navigation / Pagination",
  component: UPagination,
  args: {
    modelValue: 1,
    total: 900,
  },
  argTypes: {
    ...getArgTypes(UPagination.name),
  },
};

const DefaultTemplate = (args) => ({
  components: { UPagination },
  setup() {
    const slots = getSlotNames(UPagination.name);

    return { args, slots };
  },
  template: `
    <UPagination v-bind="args" v-model="args.modelValue">
      ${args.slotTemplate || getSlotsFragment()}
    </UPagination>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const perPage1 = DefaultTemplate.bind({});
perPage1.args = { perPage: 1 };

export const limit = DefaultTemplate.bind({});
limit.args = { limit: 3 };

export const hideEllipsis = DefaultTemplate.bind({});
hideEllipsis.args = { ellipses: false };

export const disabled = DefaultTemplate.bind({});
disabled.args = { disabled: true };

export const hideNavButtons = DefaultTemplate.bind({});
hideNavButtons.args = { showLast: false, showFirst: false };

export const setCustomNavigationLabel = DefaultTemplate.bind({});
setCustomNavigationLabel.args = {
  prevLabel: "◀️",
  nextLabel: "▶️",
  lastLabel: "⏩",
  firstLabel: "⏪",
};
