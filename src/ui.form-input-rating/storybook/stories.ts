import { computed } from "vue";
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
  enum: "size" | "labelAlign";
}

export default {
  id: "3060",
  title: "Form Inputs & Controls / Input Rating",
  component: UInputRating,
  args: {
    modelValue: 2,
    label: "Rate your experience: ",
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
    const errorMessage = computed(() => (!args.modelValue ? args.error : ""));

    return { args, slots, errorMessage };
  },
  template: `
    <UInputRating
      v-bind="args"
      v-model="args.modelValue"
      :error="errorMessage"
    >
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

export const Description = DefaultTemplate.bind({});
Description.args = { description: "Your review helps us improve our services." };

export const Error = DefaultTemplate.bind({});
Error.args = {
  selectable: true,
  modelValue: 0,
  error: "Please select a rating before submitting your review.",
};

export const Disabled = DefaultTemplate.bind({});
Disabled.args = { disabled: true };

export const Sizes = EnumVariantTemplate.bind({});
Sizes.args = { enum: "size" };

export const LabelPlacement = EnumVariantTemplate.bind({});
LabelPlacement.args = { enum: "labelAlign" };

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
