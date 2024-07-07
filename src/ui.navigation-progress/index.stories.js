import UProgress from "./index.vue";
import UButton from "../ui.button/index.vue";
import UIcon from "../ui.image-icon";
import URow from "../ui.container-row";

import { getArgTypes } from "../service.storybook";

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
  components: { UProgress, UButton, UIcon },
  setup() {
    return { args };
  },
  data() {
    return {
      progress: 10,
    };
  },
  methods: {
    updateProgress() {
      this.progress += 10;

      if (this.progress > 100) {
        this.progress = 0;
      }
    },
  },
  template: `
    <UProgress v-bind="args" :value="progress">
      ${args.slotTemplate}
    </UProgress>

    <UButton class="mt-4" @click="updateProgress">Update Progress</UButton>
  `,
});

const StepsTemplate = (args) => ({
  components: { UProgress, UButton, UIcon },
  setup() {
    return { args };
  },
  data() {
    return {
      progress: 1,
      max: ["Step 1", "Step 2", "Step 3"],
    };
  },
  methods: {
    updateProgress() {
      this.progress += 1;

      if (this.progress > 3) {
        this.progress = 0;
      }
    },
  },
  template: `
    <UProgress v-bind="args" :max="max" :value="progress">
      ${args.slotTemplate}
    </UProgress>

    <UButton class="mt-4" @click="updateProgress">Update Progress</UButton>
  `,
});

const ColorsTemplate = (args, { argTypes } = {}) => ({
  components: { UProgress, URow },
  setup() {
    return {
      args,
      colors: argTypes.color.options,
    };
  },
  data() {
    return {
      progress: 10,
    };
  },
  template: `
    <URow class="!flex-col">
      <UProgress
        v-for="(color, index) in colors"
        :key="index"
        :color="color"
        v-bind="args" 
        :value="progress" 
      />
    </URow>
  `,
});

const SizesTemplate = (args, { argTypes } = {}) => ({
  components: { UProgress, URow },
  setup() {
    return {
      args,
      sizes: argTypes.size.options,
    };
  },
  data() {
    return {
      progress: 10,
    };
  },
  template: `
    <URow class="!flex-col">
      <UProgress
        v-for="(size, index) in sizes"
        :key="index"
        :size="size"
        v-bind="args" 
        :value="progress" 
      />
    </URow>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const Variant = StepsTemplate.bind({});
Variant.args = { variant: "stepper", stepperTitle: "Title" };

export const Indicator = DefaultTemplate.bind({});
Indicator.args = { indicator: true };

export const Steps = StepsTemplate.bind({});
Steps.args = {};

export const Colors = ColorsTemplate.bind({});
Colors.args = {};

export const Sizes = SizesTemplate.bind({});
Sizes.args = {};

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

export const stepSlot = StepsTemplate.bind({});
stepSlot.args = {
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
