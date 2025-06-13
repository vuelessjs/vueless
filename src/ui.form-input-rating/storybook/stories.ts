import {
  getArgs,
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
  setup: () => ({ args, slots: getSlotNames(UInputRating.__name) }),
  template: `
    <UInputRating v-bind="args" v-model="args.modelValue">
      ${args.slotTemplate || getSlotsFragment("")}
    </UInputRating>
  `,
});

const EnumTemplate: StoryFn<UInputRatingArgs> = (args: UInputRatingArgs, { argTypes }) => ({
  components: { UInputRating, UCol },
  setup: () => ({ args, argTypes, getArgs }),
  template: `
    <UCol>
      <UInputRating
        v-for="option in argTypes?.[args.enum]?.options"
        v-bind="getArgs(args, option)"
        :key="option"
        v-model="args.modelValue"
      />
    </UCol>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const Readonly = DefaultTemplate.bind({});
Readonly.args = { readonly: true };

export const Disabled = DefaultTemplate.bind({});
Disabled.args = { disabled: true };

export const Sizes = EnumTemplate.bind({});
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

export const WithCounter = DefaultTemplate.bind({});
WithCounter.args = { counter: true };
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

export const RatingIcons = DefaultTemplate.bind({});
RatingIcons.args = { activeIcon: "check_circle", inactiveIcon: "add_circle" };
RatingIcons.parameters = {
  docs: {
    description: {
      story:
        "Use the `activeIcon` and `inactiveIcon` props to customize the icons for the respective rating states.",
    },
  },
};

export const CounterSlot = DefaultTemplate.bind({});
CounterSlot.args = {
  counter: true,
  stars: 5,
  modelValue: 0,
  slotTemplate: `
    <template #counter="{ counter }">
      <UBadge
        :label="counter === 0
          ? 'No rating yet'
          : counter + ' out of ' + args.stars + ' stars'"
        :color="counter ? 'success' : 'warning'"
      />
    </template>
  `,
};

export const TotalSlot = DefaultTemplate.bind({});
TotalSlot.args = {
  total: 250,
  slotTemplate: `
    <template #total="{ total }">
      <UBadge
        :label="total + ' reviews'"
        color="info"
        size="sm"
      />
    </template>
  `,
};
