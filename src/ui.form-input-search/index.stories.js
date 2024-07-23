import { getArgTypes, getSlotNames, allSlotsFragment } from "../service.storybook";

import UInputSearch from "../ui.form-input-search";
import UButton from "../ui.button";
import URow from "../ui.container-row";

/**
 * The `UInputSearch` component. | [View on GitHub](https://github.com/vuelessjs/vueless/tree/main/src/ui.form-input-search)
 */
export default {
  id: "3040",
  title: "Form Inputs & Controls / Input Search",
  component: UInputSearch,
  argTypes: {
    ...getArgTypes(UInputSearch.name),
  },
};

const DefaultTemplate = (args) => ({
  components: { UInputSearch },
  setup() {
    const slots = getSlotNames(UInputSearch.name);

    return {
      args,
      slots,
    };
  },
  template: `
    <UInputSearch v-bind="args">
      ${allSlotsFragment}
    </UInputSearch>
  `,
});

const SlotTemplate = (args) => ({
  components: { UInputSearch, UButton },
  setup() {
    return {
      args,
    };
  },
  template: `
    <UInputSearch v-bind="args">
      ${args.slotTemplate || ""}
    </UInputSearch>
  `,
});

const SizesTemplate = (args, { argTypes } = {}) => ({
  components: { UInputSearch, URow },
  setup() {
    return {
      args,
      sizes: argTypes.size.options,
    };
  },
  template: `
    <URow>
      <UInputSearch
        v-for="(size, index) in sizes"
        v-bind="args"
        :size="size"
        :key="index"
      >
      </UInputSearch>
    </URow>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const searchButton = DefaultTemplate.bind({});
searchButton.args = { searchButtonLabel: "Search" };

export const sizes = SizesTemplate.bind({});
sizes.args = {};

export const slotLeft = SlotTemplate.bind({});
slotLeft.args = {
  slotTemplate: `
    <template #left>
      <UButton
        label="filter"
        variant="thirdary"
        filled
        class="rounded-r-none !ring-0"
      />
    </template>
  `,
};
