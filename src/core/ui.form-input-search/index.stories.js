import { getArgTypes, getSlotNames } from "vueless/service.storybook";

import UInputSearch from "vueless/ui.form-input-search";
import UButton from "vueless/ui.button";
import URow from "vueless/ui.container-row";

export default {
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
      <template v-for="(slot, index) of slots" :key="index" v-slot:[slot]>
        <template v-if="args[slot]">{{ args[slot] }}</template>
      </template>
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
    ${args.slotTemplate}
    </UInputSearch>
  `,
});

const SizesTemplate = (args, { argTypes }) => ({
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
        v-bind="args"
        v-for="(size, index) in sizes"
        :size="size"
        :key="index"
      >
      </UInputSearch>
    </URow>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const sizes = SizesTemplate.bind({});
sizes.args = {};

export const slotLeft = SlotTemplate.bind({});
slotLeft.args = {
  slotTemplate: `
    <template #left>
      <UButton
        text="filter"
        variant="thirdary"
        filled
      />
    </template>
  `,
};
