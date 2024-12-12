import {
  getArgTypes,
  getSlotNames,
  getSlotsFragment,
  getDocsDescription,
} from "../../utils/storybook.ts";

import UProgress from "../../ui.navigation-progress/UProgress.vue";
import UCol from "../../ui.container-col/UCol.vue";
import UButton from "../../ui.button/UButton.vue";
import UIcon from "../../ui.image-icon/UIcon.vue";

import type { Meta, StoryFn } from "@storybook/vue3";
import type { UProgressProps } from "../types.ts";

interface UProgressArgs extends UProgressProps {
  slotTemplate?: string;
  enum: "color" | "size";
  iterator?: number;
  progress?: number;
}

export default {
  id: "8040",
  title: "Navigation / Progress",
  component: UProgress,
  argTypes: {
    ...getArgTypes(UProgress.__name),
  },
  parameters: {
    docs: {
      ...getDocsDescription(UProgress.__name),
    },
  },
} as Meta;

const DefaultTemplate: StoryFn<UProgressArgs> = (args: UProgressArgs) => ({
  components: { UCol, UProgress, UButton, UIcon },
  setup() {
    const slots = getSlotNames(UProgress.__name);

    args.value = args.max ? 1 : 10;
    args.iterator = args.max ? 1 : 10;

    function updateProgress() {
      const maxValue = Array.isArray(args.max) ? args.max.length - 1 : 100;

      args.value = args.value < maxValue ? args.value + (args.iterator || 0) : 0;
    }

    return { slots, args, updateProgress };
  },
  template: `
    <UCol>
      <UProgress v-bind="args">${args.slotTemplate || getSlotsFragment("")}</UProgress>
      <UButton label="Next →" size="sm" variant="thirdary" filled @click="updateProgress" />
    </UCol>
  `,
});

const EnumVariantTemplate: StoryFn<UProgressArgs> = (args: UProgressArgs, { argTypes }) => ({
  components: { UCol, UButton, UProgress },
  setup() {
    args.progress = 10;

    function updateProgress() {
      args.progress = args.progress && args.progress < 100 ? args.progress + 10 : 0;
    }

    return { args, updateProgress, options: argTypes?.[args.enum]?.options };
  },
  template: `
    <UCol>
      <UProgress
        v-for="(option, index) in options"
        :key="index"
        v-bind="args"
        :[args.enum]="option"
        :value="args.progress"
      />
    <UButton label="Next →" size="sm" variant="thirdary" filled @click="updateProgress" />
    </UCol>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const VariantStepper = DefaultTemplate.bind({});
VariantStepper.args = { variant: "stepper", max: ["Step 0", "Step 1", "Step 2"] };

export const Indicator = DefaultTemplate.bind({});
Indicator.args = { indicator: true };

export const Steps = DefaultTemplate.bind({});
Steps.args = { max: ["Step 0", "Step 1", "Step 2"] };

export const Colors = EnumVariantTemplate.bind({});
Colors.args = { enum: "color" };

export const Sizes = EnumVariantTemplate.bind({});
Sizes.args = { enum: "size" };

export const IndicatorSlot = DefaultTemplate.bind({});
IndicatorSlot.args = {
  indicator: true,
  slotTemplate: `
  <template #indicator>
    <UIcon
      name="star"
      color="black"
    />
  </template>
`,
};

export const StepSlot = DefaultTemplate.bind({});
StepSlot.args = {
  max: ["Step 0", "Step 1", "Step 2"],
  slotTemplate: `
  <template #step-0>
    💻
  </template>
  <template #step-1>
    🧇
  </template>
  <template #step-2>
    😴
  </template>
`,
};
