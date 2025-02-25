import {
  getArgTypes,
  getSlotNames,
  getSlotsFragment,
  getDocsDescription,
} from "../../utils/storybook.ts";

import UInputRating from "../../ui.form-input-rating/UInputRating.vue";
import UCol from "../../ui.container-col/UCol.vue";
import UBadge from "../../ui.text-badge/UBadge.vue";

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
  components: { UInputRating, UBadge },
  setup() {
    const slots = getSlotNames(UInputRating.__name);

    return { args, slots };
  },
  template: `
    <UInputRating v-bind="args" v-model="args.modelValue">
      ${args.slotTemplate || getSlotsFragment("")}
    </UInputRating>
  `,
});

const EnumVariantTemplate: StoryFn<UInputRatingArgs> = (args: UInputRatingArgs, { argTypes }) => ({
  components: { UInputRating, UCol },
  setup() {
    return {
      args,
      options: argTypes?.[args.enum]?.options,
    };
  },
  template: `
    <UCol>
      <UInputRating
        v-for="(option, index) in options"
        :key="index"
        v-bind="args"
        v-model="args.modelValue"
        :[args.enum]="option"
        :description="option"
        modelValue="2"
      />
    </UCol>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const Disabled = DefaultTemplate.bind({});
Disabled.args = { disabled: true };

export const Sizes = EnumVariantTemplate.bind({});
Sizes.args = { enum: "size" };

export const StarAmount = DefaultTemplate.bind({});
StarAmount.args = { stars: 7 };
StarAmount.parameters = {
  docs: {
    description: {
      story: "You can set the amount of stars to display via the `stars` prop.",
    },
  },
};

export const Selectable = DefaultTemplate.bind({});
Selectable.args = { selectable: true };
Selectable.parameters = {
  docs: {
    description: {
      story: "If you want to allow users to select a rating, set the `selectable` prop to `true`.",
    },
  },
};

export const WithCounter = DefaultTemplate.bind({});
WithCounter.args = { counter: true, selectable: true };
WithCounter.parameters = {
  docs: {
    description: {
      story:
        "You can display a counter of the current rating by setting the `counter` prop to `true`.",
    },
  },
};

export const WithTotal = DefaultTemplate.bind({});
WithTotal.args = { total: 250 };
WithTotal.parameters = {
  docs: {
    description: {
      story: "You can display the total amount of reviews by setting the `total` prop to a number.",
    },
  },
};

export const SlotCounter = DefaultTemplate.bind({});
SlotCounter.args = {
  slotTemplate: `
    <template #counter="{ counter }">
      <UBadge :label="'Current rating is: ' + String(counter)" color="green" />
    </template>
  `,
};

export const SlotTotal = DefaultTemplate.bind({});
SlotTotal.args = {
  total: 250,
  slotTemplate: `
    <template #total="{total}">
      <UBadge :label="'Total reviews: ' + String(total)" color="green" />
    </template>
  `,
};
