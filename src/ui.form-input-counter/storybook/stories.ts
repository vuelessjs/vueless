import {
  getArgs,
  getArgTypes,
  getSlotNames,
  getSlotsFragment,
  getDocsDescription,
} from "../../utils/storybook";

import UInputCounter from "../UInputCounter.vue";
import UCol from "../../ui.container-col/UCol.vue";
import UBadge from "../../ui.text-badge/UBadge.vue";

import type { Meta, StoryFn } from "@storybook/vue3-vite";
import type { Props } from "../types";

interface UInputCounterArgs extends Props {
  slotTemplate?: string;
  enum: "size";
}

export default {
  id: "3040",
  title: "Form Inputs & Controls / Input Counter",
  component: UInputCounter,
  args: {
    modelValue: 1,
    step: 1,
    min: 1,
    max: 100,
  },
  argTypes: {
    ...getArgTypes(UInputCounter.__name),
  },
  parameters: {
    docs: {
      ...getDocsDescription(UInputCounter.__name),
    },
  },
} as Meta;

const DefaultTemplate: StoryFn<UInputCounterArgs> = (args: UInputCounterArgs) => ({
  components: { UInputCounter, UBadge },
  setup: () => ({ args, slots: getSlotNames(UInputCounter.__name) }),
  template: `
    <UInputCounter v-bind="args" v-model="args.modelValue">
      ${args.slotTemplate || getSlotsFragment("")}
    </UInputCounter>
  `,
});

const EnumTemplate: StoryFn<UInputCounterArgs> = (args: UInputCounterArgs, { argTypes }) => ({
  components: { UInputCounter, UCol },
  setup: () => ({ args, argTypes, getArgs }),
  template: `
    <UCol gap="xl">
      <UInputCounter
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

export const ValueLimit = DefaultTemplate.bind({});
ValueLimit.args = {
  modelValue: 7,
  step: 1,
  min: 5,
  max: 10,
};
ValueLimit.parameters = {
  docs: {
    description: {
      story: "To set the minimum and maximum values, use the `min` and `max` props.",
    },
  },
};

export const Step = DefaultTemplate.bind({});
Step.args = {
  modelValue: 1,
  step: 5,
  min: 1,
  max: 100,
};
Step.parameters = {
  docs: {
    description: {
      story: "`step` prop determines the increment/decrement value.",
    },
  },
};
