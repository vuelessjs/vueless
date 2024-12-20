import {
  getArgTypes,
  getSlotNames,
  getSlotsFragment,
  getDocsDescription,
} from "../../utils/storybook.ts";

import UInputRating from "../../ui.form-input-rating/UInputRating.vue";
import URow from "../../ui.container-row/URow.vue";

import type { Meta, StoryFn } from "@storybook/vue3";
import type { Props } from "../types.ts";

interface UInputRatingArgs extends Props {
  slotTemplate?: string;
  enum: "size";
}

export default {
  id: "3060",
  title: "Form Inputs & Controls / Input Rating",
  component: UInputRating,
  args: {
    modelValue: 2,
    label: "Label",
  },
  argTypes: {
    ...getArgTypes(UInputRating.__name),
  },
  parameters: {
    docs: {
      ...getDocsDescription(UInputRating.__name),
    },
  },
} as Meta;

const DefaultTemplate: StoryFn<UInputRatingArgs> = (args: UInputRatingArgs) => ({
  components: { UInputRating },
  setup() {
    const slots = getSlotNames(UInputRating.__name);

    return { args, slots };
  },
  template: `
    <UInputRating
      v-bind="args"
      v-model="args.modelValue"
    >
      ${args.slotTemplate || getSlotsFragment("")}
    </UInputRating>
  `,
});

const EnumVariantTemplate: StoryFn<UInputRatingArgs> = (args: UInputRatingArgs, { argTypes }) => ({
  components: { UInputRating, URow },
  setup() {
    return {
      args,
      options: argTypes?.[args.enum]?.options,
    };
  },
  template: `
    <URow gap="2xl">
      <UInputRating
        v-for="(option, index) in options"
        :key="index"
        v-bind="args"
        v-model="args.modelValue"
        :[args.enum]="option"
      />
    </URow>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const Sizes = EnumVariantTemplate.bind({});
Sizes.args = { enum: "size" };

export const StarAmount = DefaultTemplate.bind({});
StarAmount.args = { modelValue: 4, stars: 7 };

export const Selectable = DefaultTemplate.bind({});
Selectable.args = { selectable: true };

export const Description = DefaultTemplate.bind({});
Description.args = { description: "Some description" };

export const Error = DefaultTemplate.bind({});
Error.args = { error: "Some error" };

export const WithCounter = DefaultTemplate.bind({});
WithCounter.args = { counter: true };

export const WithTotal = DefaultTemplate.bind({});
WithTotal.args = { total: 250 };

export const SlotCounter = DefaultTemplate.bind({});
SlotCounter.args = {
  slotTemplate: `
    <template #counter="{counter}">
      Rating: {{counter}}
    </template>
  `,
};

export const SlotTotal = DefaultTemplate.bind({});
SlotTotal.args = {
  total: 250,
  slotTemplate: `
    <template #total="{total}">
      ({{total}}) reviews
    </template>
  `,
};
