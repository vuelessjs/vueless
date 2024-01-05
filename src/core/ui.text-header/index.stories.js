import { getArgTypes, getSlotNames } from "vueless/service.storybook";

import UHeader from "vueless/ui.text-header";
import URow from "vueless/ui.container-row";

export default {
  title: "Text & Content / Header",
  component: UHeader,
  args: {
    text: "Header",
  },
  argTypes: {
    ...getArgTypes(UHeader.name),
  },
};

const DefaultTemplate = (args) => ({
  components: { UHeader },
  setup() {
    const slots = getSlotNames(UHeader.name);

    return { args, slots };
  },
  template: `
    <UHeader v-bind="args" />
  `,
});

const ColorsTemplate = (args, { argTypes }) => ({
  components: { UHeader, URow },
  setup() {
    return {
      args,
      colors: argTypes.color.options,
    };
  },
  template: `
    <URow>
      <UHeader
        v-for="(color, index) in colors"
        :color="color"
        :text="color"
        v-bind="args"
        :key="index"
      />
    </URow>
  `,
});

const SizesTemplate = (args, { argTypes }) => ({
  components: { UHeader, URow },
  setup() {
    return {
      args,
      sizes: argTypes.size.options,
    };
  },
  template: `
    <URow>
      <UHeader
        v-for="(size, index) in sizes"
        :size="size"
        :text="getText(size)"
        v-bind="args"
        :key="index"
      />
    </URow>
  `,
  methods: {
    getText(value) {
      return `Header ${value}`;
    },
  },
});

const WeightTemplate = (args, { argTypes }) => ({
  components: { UHeader, URow },
  setup() {
    return {
      args,
      weights: argTypes.weight.options,
    };
  },
  template: `
    <URow>
      <UHeader
        v-for="(weight, index) in weights"
        :weight="weight"
        :text="weight"
        v-bind="args"
        :key="index"
      />
    </URow>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const Colors = ColorsTemplate.bind({});
Colors.args = {};

export const Underlined = SizesTemplate.bind({});
Underlined.args = { underlined: true };

export const Sizes = SizesTemplate.bind({});
Sizes.args = {};

export const Weights = WeightTemplate.bind({});
Weights.args = {};
