import { getArgTypes, getSlotNames, getSlotsFragment } from "../../utils/utilStorybook.js";

import UPagination from "../../ui.navigation-pagination/UPagination.vue";

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
    ...getArgTypes(UPagination.__name),
  },
};

const DefaultTemplate = (args) => ({
  components: { UPagination },
  setup() {
    const slots = getSlotNames(UPagination.__name);

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

export const PerPage1 = DefaultTemplate.bind({});
PerPage1.args = { perPage: 1 };

export const Limit = DefaultTemplate.bind({});
Limit.args = { limit: 3 };

export const HideEllipsis = DefaultTemplate.bind({});
HideEllipsis.args = { ellipses: false };

export const Disabled = DefaultTemplate.bind({});
Disabled.args = { disabled: true };

export const HideNavButtons = DefaultTemplate.bind({});
HideNavButtons.args = { showLast: false, showFirst: false };

export const SetCustomNavigationLabel = DefaultTemplate.bind({});
SetCustomNavigationLabel.args = {
  prevLabel: "◀️",
  nextLabel: "▶️",
  lastLabel: "⏩",
  firstLabel: "⏪",
};
