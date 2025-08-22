import {
  getArgs,
  getArgTypes,
  getSlotNames,
  getSlotsFragment,
  getDocsDescription,
} from "../../utils/storybook";

import UProgress from "../../ui.navigation-progress/UProgress.vue";
import UCol from "../../ui.container-col/UCol.vue";
import UButton from "../../ui.button/UButton.vue";
import UIcon from "../../ui.image-icon/UIcon.vue";
import UBadge from "../../ui.text-badge/UBadge.vue";

import type { Meta, StoryFn } from "@storybook/vue3-vite";
import type { Props } from "../types";

interface UProgressArgs extends Props {
  slotTemplate?: string;
  enum: "color" | "size";
  iterator?: number;
  progress?: number;
  class?: string;
}

export default {
  id: "8040",
  title: "Navigation / Progress",
  component: UProgress,
  args: {
    progress: 10,
    value: 0,
  },
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
  components: { UCol, UProgress, UButton, UIcon, UBadge },
  setup() {
    const slots = getSlotNames(UProgress.__name);

    const iterator = args.max ? 1 : 10;

    function updateProgress() {
      const maxValue = Array.isArray(args.max) ? args.max.length - 1 : 100;

      args.value = args.value < maxValue ? args.value + (iterator || 0) : 0;
    }

    return { slots, args, updateProgress };
  },
  template: `
    <UCol>
      <UProgress v-bind="args">${args.slotTemplate || getSlotsFragment("")}</UProgress>
      <UButton label="Next Step" size="sm" variant="soft" @click="updateProgress" />
    </UCol>
  `,
});

const EnumTemplate: StoryFn<UProgressArgs> = (args: UProgressArgs, { argTypes }) => ({
  components: { UCol, UButton, UProgress },
  setup: () => ({ args, argTypes, getArgs }),
  template: `
    <UCol>
      <UProgress
        v-for="option in argTypes?.[args.enum]?.options"
        v-bind="getArgs(args, option)"
        :key="option"
        :value="args.progress"
        indicator
      >
        <template #indicator>
          {{ option }}
        </template>
      </UProgress>
      <UButton
        label="Next Step"
        size="sm"
        variant="soft"
        @click="args.progress = args.progress < 100 ? args.progress + 10 : 0"
      />
    </UCol>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const Max = DefaultTemplate.bind({});
Max.args = { max: ["Step 0", "Step 1", "Step 2"] };
Max.parameters = {
  docs: {
    description: {
      story: "Control Progress max amount of steps using the `max` prop.",
    },
  },
};

export const VariantStepper = DefaultTemplate.bind({});
VariantStepper.args = {
  variant: "stepper",
  max: ["Introduction", "Personal Information", "Shipment Address"],
  class: "flex-row-reverse",
};

export const Indicator = DefaultTemplate.bind({});
Indicator.args = { indicator: true };
Indicator.parameters = {
  docs: {
    description: {
      story: "This prop controls Progress indicator visibility.",
    },
  },
};

export const Sizes = EnumTemplate.bind({});
Sizes.args = { enum: "size" };

export const Colors = EnumTemplate.bind({});
Colors.args = { enum: "color" };

export const IndicatorSlot = DefaultTemplate.bind({});
IndicatorSlot.args = {
  indicator: true,
  slotTemplate: `
    <template #indicator="{ percent }">
      <UBadge :label="'Current percent is: ' + percent" variant="subtle" />
    </template>
  `,
};

export const StepSlot = DefaultTemplate.bind({});
StepSlot.args = {
  max: ["Order Placed", "Processing", "Shipped", "Delivered"],
  slotTemplate: `
  <template #step-0="{ step, value, max }">
    <div class="flex items-center gap-2">
      📦 <span>Step: {{ step }} ({{ value + 1 }} / {{ max.length }})</span>
    </div>
  </template>
  <template #step-1="{ step, value, max }">
    <div class="flex items-center gap-2">
      ⚙️ <span>Step: {{ step }} ({{ value + 1 }} / {{ max.length }})</span>
    </div>
  </template>
  <template #step-2="{ step, value, max }">
    <div class="flex items-center gap-2">
      🚚 <span>Step: {{ step }} ({{ value + 1 }} / {{ max.length }})</span>
    </div>
  </template>
  <template #step-3="{ step, value, max }">
    <div class="flex items-center gap-2">
      🏠 <span>Step: {{ step }} ({{ value + 1 }} / {{ max.length }})</span>
    </div>
  </template>
  `,
};
