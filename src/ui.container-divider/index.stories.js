import { getArgTypes } from "vueless/service.storybook";
import URow from "vueless/ui.container-row";

import UDivider from "vueless/ui.container-divider";

export default {
  title: "Containers / Divider",
  component: UDivider,
  argTypes: {
    ...getArgTypes(UDivider.name),
  },
};

const DefaultTemplate = (args) => ({
  components: { UDivider },
  setup() {
    return { args };
  },
  template: `
    <UDivider v-bind="args" />
  `,
});

const SizesTemplate = (args, { argTypes }) => ({
  components: { UDivider, URow },
  setup() {
    return {
      args,
      sizes: argTypes.size.options,
    };
  },
  template: `
    <URow>
      <UDivider
        class="w-1/4"
        v-for="(size, index) in sizes"
        :size="size"
        v-bind="args"
        :key="index"
      />
    </URow>
  `,
  created() {
    this.mxArgTypes = argTypes;
  },
});

const VariantsTemplate = (args, { argTypes }) => ({
  components: { UDivider, URow },
  setup() {
    return {
      args,
      variants: argTypes.variant.options,
    };
  },
  template: `
    <URow>
      <UDivider
        class="w-1/3"
        v-for="(variant, index) in variants"
        :variant="variant"
        v-bind="args"
        :key="index"
      />
    </URow>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const dashed = DefaultTemplate.bind({});
dashed.args = { dashed: true };

export const dotted = DefaultTemplate.bind({});
dotted.args = { dotted: true };

export const noBorder = DefaultTemplate.bind({});
noBorder.args = { noBorder: true };

export const noTopPadding = DefaultTemplate.bind({});
noTopPadding.args = { noTopPadding: true };

export const noBottomPadding = DefaultTemplate.bind({});
noBottomPadding.args = { noBottomPadding: true };

export const sizes = SizesTemplate.bind({});
sizes.args = {};

export const variants = VariantsTemplate.bind({});
variants.args = {};
