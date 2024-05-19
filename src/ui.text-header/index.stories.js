import { getArgTypes, getSlotNames } from "../service.storybook";

import UHeader from "../ui.text-header";
import UGroup from "../ui.container-group";

export default {
  id: "4010",
  title: "Text & Content / Header",
  component: UHeader,
  args: {
    label: "Header",
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

const WeightTemplate = (args, { argTypes } = {}) => ({
  components: { UHeader, UGroup },
  setup() {
    return {
      args,
      weights: argTypes.weight.options,
    };
  },
  template: `
    <UGroup>
      <UHeader
        v-for="(weight, index) in weights"
        :key="index"
        v-bind="args"
        :weight="weight"
        :label="'Header ' + weight"
      />
    </UGroup>
  `,
});

const SizesTemplate = (args, { argTypes } = {}) => ({
  components: { UHeader, UGroup },
  setup() {
    return {
      args,
      sizes: argTypes.size.options,
    };
  },
  template: `
    <UGroup>
      <UHeader
        v-for="(size, index) in sizes"
        :key="index"
        v-bind="args"
        :size="size"
        :label="'Header ' + size"
      />
    </UGroup>
  `,
});

const ColorsTemplate = (args, { argTypes } = {}) => ({
  components: { UHeader, UGroup },
  setup() {
    return {
      args,
      colors: argTypes.color.options,
    };
  },
  template: `
    <UGroup>
      <UHeader
        v-for="(color, index) in colors"
        v-bind="args"
        :key="index"
        :color="color"
        :label="'Header ' + color"
      />
    </UGroup>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const Weights = WeightTemplate.bind({});
Weights.args = {};

export const Sizes = SizesTemplate.bind({});
Sizes.args = {};

export const Underlined = SizesTemplate.bind({});
Underlined.args = { underlined: true };

export const Multiline = SizesTemplate.bind({});
Multiline.args = {
  size: "2xl",
  multiline: true,
  label: "Some very long header you ever may imagine in your whole long and beautiful life",
};

export const Colors = ColorsTemplate.bind({});
Colors.args = {};
