import UDot from "vueless/ui.other-dot";
import URow from "vueless/ui.container-row";

import { getArgTypes } from "vueless/service.storybook";

export default {
  title: "Other / Dot",
  component: UDot,
  argTypes: {
    ...getArgTypes(UDot.name),
  },
};

const DefaultTemplate = (args) => ({
  components: { UDot },
  setup() {
    return { args };
  },
  template: `
    <UDot v-bind="args" />
  `,
});

const ColorsTemplate = (args, { argTypes }) => ({
  components: { UDot, URow },
  setup() {
    return {
      args,
      colors: argTypes.color.options,
    };
  },
  template: `
    <URow>
      <UDot
        v-for="(color, index) in colors"
        :color="color"
        v-bind="args"
        :key="index"
      />
    </URow>
  `,
});

const SizesTemplate = (args, { argTypes }) => ({
  components: { UDot, URow },
  setup() {
    return {
      args,
      sizes: argTypes.size.options,
    };
  },
  template: `
    <URow>
      <UDot
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
      return `Tag ${value}`;
    },
  },
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const Colors = ColorsTemplate.bind({});
Colors.args = {};

export const Sizes = SizesTemplate.bind({});
Sizes.args = {};
