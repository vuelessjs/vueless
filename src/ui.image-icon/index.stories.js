import { getArgTypes } from "../service.storybook";

import UIcon from "../ui.image-icon";
import URow from "../ui.container-row";

/**
 * The `UIcon` component. | [View on GitHub](https://github.com/vuelessjs/vueless/tree/main/src/ui.image-icon)
 */
export default {
  id: "6010",
  title: "Images & Icons / Icon",
  component: UIcon,
  args: {
    name: "close",
  },
  argTypes: {
    ...getArgTypes(UIcon.name),
  },
};

const DefaultTemplate = (args) => ({
  components: { UIcon },
  setup() {
    return { args };
  },
  template: `
    <UIcon v-bind="args"/>
  `,
});

const ColorsTemplate = (args, { argTypes } = {}) => ({
  components: { UIcon, URow },
  setup() {
    return {
      args,
      colors: argTypes.color.options,
    };
  },
  template: `
    <URow>
      <UIcon
        v-for="(color, index) in colors"
        v-bind="args"
        :color="color"
        name="close"
        :key="index"
      />
    </URow>
  `,
});

const SizesTemplate = (args, { argTypes } = {}) => ({
  components: { UIcon, URow },
  setup() {
    return {
      args,
      sizes: argTypes.size.options,
    };
  },
  template: `
    <URow>
      <UIcon
        v-for="(size, index) in sizes"
        v-bind="args"
        :size="size"
        name="close"
        :key="index"
      />
    </URow>
  `,
});

const VariantsTemplate = (args, { argTypes } = {}) => ({
  components: { UIcon, URow },
  setup() {
    return {
      args,
      variants: argTypes.variant.options,
    };
  },
  template: `
    <URow>
      <UIcon
        v-for="(variant, index) in variants"
        :variant="variant"
        name="close"
        v-bind="args"
        :key="index"
      />
    </URow>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const colors = ColorsTemplate.bind({});
colors.args = {};

export const sizes = SizesTemplate.bind({});
sizes.args = {};

export const variants = VariantsTemplate.bind({});
variants.args = { color: "red" };

export const tooltip = DefaultTemplate.bind({});
tooltip.args = { tooltip: "Some text" };

export const interactive = DefaultTemplate.bind({});
interactive.args = { interactive: true };

export const pill = ColorsTemplate.bind({});
pill.args = { pill: true };
