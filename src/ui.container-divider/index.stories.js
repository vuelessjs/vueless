import { getArgTypes } from "../service.storybook";
import URow from "../ui.container-row";

import UDivider from "../ui.container-divider";

/**
 * The `UDivider` component. | [View on GitHub](https://github.com/vuelessjs/vueless/tree/main/src/ui.container-divider)
 */
export default {
  id: "5010",
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

const SizesTemplate = (args, { argTypes } = {}) => ({
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
        v-bind="args"
        :size="size"
        :key="index"
      />
    </URow>
  `,
  created() {
    this.mxArgTypes = argTypes;
  },
});

const VariantTemplate = (args, { argTypes } = {}) => ({
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
        v-bind="args"
        :variant="variant"
        :key="index"
      />
    </URow>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const sizes = SizesTemplate.bind({});
sizes.args = {};

export const variants = VariantTemplate.bind({});
variants.args = {};

export const dashed = DefaultTemplate.bind({});
dashed.args = { dashed: true };

export const dotted = DefaultTemplate.bind({});
dotted.args = { dotted: true };

export const vertical = DefaultTemplate.bind({});
vertical.args = {
  vertical: true,
  config: {
    wrapper: {
      base: "min-h-8",
    },
  },
};

export const noBorder = DefaultTemplate.bind({});
noBorder.args = { noBorder: true };

export const noTopPadding = DefaultTemplate.bind({});
noTopPadding.args = { noTopPadding: true };

export const noBottomPadding = DefaultTemplate.bind({});
noBottomPadding.args = { noBottomPadding: true };

export const noRightPadding = DefaultTemplate.bind({});
noRightPadding.args = {
  noRightPadding: true,
  vertical: true,
  config: {
    wrapper: {
      base: "min-h-8",
    },
  },
};

export const noLeftPadding = DefaultTemplate.bind({});
noLeftPadding.args = {
  noLeftPadding: true,
  vertical: true,
  config: {
    wrapper: {
      base: "min-h-8",
    },
  },
};
