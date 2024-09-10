import { getArgTypes, getSlotNames, getSlotsFragment } from "../../utils/utilStorybook.js";

import UInputSearch from "../ui.form-input-search";
import UButton from "../ui.button/UButton.vue";
import UIcon from "../ui.image-icon/UIcon.vue";
import URow from "../ui.container-row/URow.vue";

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
  components: { UInputSearch, UButton, UIcon },
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
        :key="index"
        v-bind="args"
        v-model="args.modelValue"
        :[args.enum]="option"
      >
      </UInputSearch>
    </URow>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const searchButton = DefaultTemplate.bind({});
searchButton.args = { searchButtonLabel: "Search" };

export const minLength = DefaultTemplate.bind({});
minLength.args = { minLength: 4 };

export const sizes = EnumVariantTemplate.bind({});
sizes.args = { enum: "size" };

export const leftIcon = DefaultTemplate.bind({});
leftIcon.args = {
  leftIcon: "star",
};

export const rightIcon = DefaultTemplate.bind({});
rightIcon.args = {
  rightIcon: "star",
};

export const leftIconSlot = DefaultTemplate.bind({});
leftIconSlot.args = {
  slotTemplate: `
    <template #left-icon>
      <UIcon
        name="archive"
        color="red"
      />
    </template>
  `,
};

export const rightIconSlot = DefaultTemplate.bind({});
rightIconSlot.args = {
  slotTemplate: `
    <template #right-icon>
      <UIcon
        name="archive"
        color="red"
      />
    </template>
  `,
};

export const leftSlot = DefaultTemplate.bind({});
leftSlot.args = {
  slotTemplate: `
    <template #left>
      <UButton variant="thirdary" filled square label="Filter" class="rounded-r-none h-full" />
    </template>
  `,
};

export const rightSlot = DefaultTemplate.bind({});
rightSlot.args = {
  slotTemplate: `
    <template #right>
      <UButton variant="thirdary" filled square label="Filter" class="rounded-l-none" />
    </template>
  `,
};
