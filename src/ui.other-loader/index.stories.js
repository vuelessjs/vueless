import ULoader from "../ui.other-loader";
import URow from "../ui.container-row";

import { getArgTypes } from "../service.storybook";

export default {
  id: "9020",
  title: "Other / Loader",
  component: ULoader,
  argTypes: {
    ...getArgTypes(ULoader.name),
  },
};

const DefaultTemplate = (args) => ({
  components: { ULoader },
  setup() {
    return { args };
  },
  template: `
    <ULoader v-bind="args" />
  `,
});

const ColorsTemplate = (args, { argTypes } = {}) => ({
  components: { ULoader, URow },
  setup() {
    return {
      args,
      colors: argTypes.color.options,
    };
  },
  template: `
    <URow>
      <ULoader
        v-for="(color, index) in colors"
        :color="color"
        v-bind="args"
        :key="index"
      />
    </URow>
  `,
});

const SizesTemplate = (args, { argTypes } = {}) => ({
  components: { ULoader, URow },
  setup() {
    return {
      args,
      sizes: argTypes.size.options,
    };
  },
  template: `
    <URow>
      <ULoader
        v-for="(size, index) in sizes"
        :size="size"
        :label="getText(size)"
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
