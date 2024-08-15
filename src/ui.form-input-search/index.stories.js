import { getArgTypes, getSlotNames, getSlotsFragment } from "../service.storybook";

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
  components: { UInputSearch, UButton },
  setup() {
    const slots = getSlotNames(UInputSearch.name);

    return { args, slots };
  },
  template: `
    <UInputSearch v-bind="args" v-model="args.modelValue">
      ${args.slotTemplate || getSlotsFragment()}
    </UInputSearch>
  `,
});

const EnumVariantTemplate = (args, { argTypes } = {}) => ({
  components: { UInputSearch, URow },
  setup() {
    return {
      args,
      options: argTypes[args.enum].options,
    };
  },
  template: `
    <URow>
      <UInputSearch
        v-for="(option, index) in options"
        v-bind="args"
        v-model="args.modelValue"
        :[args.enum]="option"
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

export const sizes = EnumVariantTemplate.bind({});
sizes.args = { enum: "size" };

export const slotLeft = DefaultTemplate.bind({});
slotLeft.args = {
  slotTemplate: `
    <template #left>
      <UButton
        label="Filter"
        variant="thirdary"
        filled
        no-ring
        class="rounded-r-none"
      />
    </template>
  `,
};
