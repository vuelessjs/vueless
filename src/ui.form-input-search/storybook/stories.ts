import {
  getArgTypes,
  getSlotNames,
  getSlotsFragment,
  getDocsDescription,
} from "../../utils/storybook.ts";

import UInputSearch from "../../ui.form-input-search/UInputSearch.vue";
import UButton from "../../ui.button/UButton.vue";
import UIcon from "../../ui.image-icon/UIcon.vue";
import URow from "../../ui.container-row/URow.vue";

import type { Meta, StoryFn } from "@storybook/vue3";
import type { Props } from "../types.ts";

interface UInputSearchArgs extends Props {
  slotTemplate?: string;
  enum: "size";
}

export default {
  id: "3040",
  title: "Form Inputs & Controls / Input Search",
  component: UInputSearch,
  argTypes: {
    ...getArgTypes(UInputSearch.__name),
  },
  parameters: {
    docs: {
      ...getDocsDescription(UInputSearch.__name),
    },
  },
} as Meta;

const DefaultTemplate: StoryFn<UInputSearchArgs> = (args: UInputSearchArgs) => ({
  components: { UInputSearch, UButton, UIcon },
  setup() {
    const slots = getSlotNames(UInputSearch.__name);

    return { args, slots };
  },
  template: `
    <UInputSearch v-bind="args" v-model="args.modelValue">
      ${args.slotTemplate || getSlotsFragment("")}
    </UInputSearch>
  `,
});

const EnumVariantTemplate: StoryFn<UInputSearchArgs> = (args: UInputSearchArgs, { argTypes }) => ({
  components: { UInputSearch, URow },
  setup() {
    return {
      args,
      options: argTypes?.[args.enum]?.options,
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

export const SearchButton = DefaultTemplate.bind({});
SearchButton.args = { searchButtonLabel: "Search" };

export const MinLength = DefaultTemplate.bind({});
MinLength.args = { minLength: 4 };

export const Sizes = EnumVariantTemplate.bind({});
Sizes.args = { enum: "size" };

export const LeftIcon = DefaultTemplate.bind({});
LeftIcon.args = { leftIcon: "star" };

export const RightIcon = DefaultTemplate.bind({});
RightIcon.args = { rightIcon: "star" };

export const LeftSlot = DefaultTemplate.bind({});
LeftSlot.args = {
  slotTemplate: `
    <template #left>
      <UIcon name="star" />
    </template>
  `,
};

export const RightSlot = DefaultTemplate.bind({});
RightSlot.args = {
  slotTemplate: `
    <template #right>
      <UIcon name="star" />
    </template>
  `,
};
