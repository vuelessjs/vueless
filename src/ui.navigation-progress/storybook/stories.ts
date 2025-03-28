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
import UBadge from "../../ui.text-badge/UBadge.vue";

import type { Meta, StoryFn } from "@storybook/vue3";
import type { Props } from "../types.ts";

interface UProgressArgs extends Props {
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
  components: { UCol, UProgress, UButton, UIcon, UBadge },
  setup() {
    const slots = getSlotNames(UProgress.__name);

    args.value = args.max ? 0 : 10;
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
      <UButton label="Next Step" size="sm" variant="soft" @click="updateProgress" />
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
        indicator
      >
        <template #indicator>
          {{ option }}
        </template>
      </UProgress>
    <UButton label="Next Step" size="sm" variant="soft" @click="updateProgress" />
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

export const Sizes = EnumVariantTemplate.bind({});
Sizes.args = { enum: "size" };

export const Colors = EnumVariantTemplate.bind({});
Colors.args = { enum: "color" };

export const SlotIndicator = DefaultTemplate.bind({});
SlotIndicator.args = {
  indicator: true,
  slotTemplate: `
  <template #indicator="{ percent }">
    <UBadge :label="'Current percent is: ' + percent" />
  </template>
`,
};

export const SlotStep = DefaultTemplate.bind({});
SlotStep.args = {
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
