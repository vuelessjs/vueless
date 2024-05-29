import UDot from "../ui.other-dot";
import URow from "../ui.container-row";
import UGroup from "../ui.container-group";
import UBadge from "../ui.text-badge";

import { getArgTypes } from "../service.storybook";

export default {
  id: "100010",
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

const ColorsTemplate = (args, { argTypes } = {}) => ({
  components: { UGroup, URow, UDot, UBadge },
  setup() {
    return {
      args,
      colors: argTypes.color.options,
    };
  },
  template: `
    <UGroup>
      <URow v-for="(color, index) in colors" :key="index" gap="none" align="center">
        <UDot v-bind="args" :color="color"/>
        <UBadge :label="color" :color="color" variant="thirdary" />
      </URow>
    </UGroup>
  `,
});

const SizesTemplate = (args, { argTypes } = {}) => ({
  components: { UGroup, URow, UDot, UBadge },
  setup() {
    return {
      args,
      sizes: argTypes.size.options,
    };
  },
  template: `
    <UGroup>
      <URow v-for="(size, index) in sizes" :key="index" gap="none" align="center">
        <UDot v-bind="args" :size="size"/>
        <UBadge :label="size" variant="thirdary" />
      </URow>
    </UGroup>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const Colors = ColorsTemplate.bind({});
Colors.args = {};

export const Sizes = SizesTemplate.bind({});
Sizes.args = {};
