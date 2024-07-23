import { getArgTypes, allSlotsFragment, getSlotNames } from "../service.storybook";

import UProgress from "./index.vue";
import UGroup from "../ui.container-group";
import UButton from "../ui.button";
import UIcon from "../ui.image-icon";

/**
 * The `UProgress` component. | [View on GitHub](https://github.com/vuelessjs/vueless/tree/main/src/ui.navigation-progress)
 */
export default {
  id: "8040",
  title: "Navigation / Progress",
  component: UProgress,
  argTypes: {
    ...getArgTypes(UProgress.name),
  },
};

const DefaultTemplate = (args) => ({
  components: { UGroup, UProgress, UButton, UIcon },
  setup() {
    const slots = getSlotNames(UProgress.name);

    args.value = args.max ? 1 : 10;
    args.iterator = args.max ? 1 : 10;

    function updateProgress() {
      args.value = args.value < (args.max?.length || 100) ? args.value + args.iterator : 0;
    }

    return { slots, args, updateProgress };
  },
  template: `
    <UGroup align="start">
      <UProgress v-bind="args">${args.slotTemplate || allSlotsFragment}</UProgress>
      <UButton label="Next →" size="sm" variant="thirdary" filled @click="updateProgress" />
    </UGroup>
  `,
});

const EnumVariantTemplate = (args, { argTypes } = {}) => ({
  components: { UGroup, UButton, UProgress },
  setup() {
    args.progress = 10;

    function updateProgress() {
      args.progress = args.progress < 100 ? args.progress + 10 : 0;
    }

    return { args, updateProgress, options: argTypes[args.enum].options };
  },
  template: `
    <UGroup align="start">
      <UGroup>
        <UProgress
          v-for="(option, index) in options"
          :key="index"
          :[args.enum]="option"
          v-bind="args"
          :value="args.progress"
        />
      </UGroup>

      <UButton label="Next →" size="sm" variant="thirdary" filled @click="updateProgress" />
      </UGroup>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const VariantStepper = DefaultTemplate.bind({});
VariantStepper.args = { variant: "stepper", max: ["Step 1", "Step 2", "Step 3"] };

export const Indicator = DefaultTemplate.bind({});
Indicator.args = { indicator: true };

export const Steps = DefaultTemplate.bind({});
Steps.args = { max: ["Step 1", "Step 2", "Step 3"] };

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

export const stepSlot = DefaultTemplate.bind({});
stepSlot.args = {
  max: ["Step 1", "Step 2", "Step 3"],
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
