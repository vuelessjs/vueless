import { getArgTypes } from "vueless/service.storybook";

import UIcon from "vueless/ui.image-icon";
import URow from "vueless/ui.container-row";

export default {
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

const ColorsTemplate = (args, { argTypes }) => ({
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
      :color="color"
      name="close"
      v-bind="args"
      :key="index"
    />
    </URow>
  `,
});

const SizesTemplate = (args, { argTypes }) => ({
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
        :size="size"
        name="close"
        v-bind="args"
        :key="index"
      />
    </URow>
  `,
});

const VariantsTemplate = (args, { argTypes }) => ({
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

const PillFilledTemplate = (args, { argTypes }) => ({
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
        :color="color"
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

export const pill = PillFilledTemplate.bind({});
pill.args = { pill: true };

export const pillFilled = PillFilledTemplate.bind({});
pillFilled.args = { pillFilled: true };
