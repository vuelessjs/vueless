import { getArgTypes, getSlotNames, getSlotsFragment } from "../../utils/utilStorybook.js";

import URow from "../../ui.container-row/URow.vue";
import UDivider from "../../ui.container-divider/UDivider.vue";

/**
 * The `UDivider` component. | [View on GitHub](https://github.com/vuelessjs/vueless/tree/main/src/ui.container-divider)
 */
export default {
  id: "5010",
  title: "Containers / Divider",
  component: UDivider,
  argTypes: {
    ...getArgTypes(UDivider.__name),
  },
};

const DefaultTemplate = (args) => ({
  components: { UDivider },
  setup() {
    const slots = getSlotNames(UDivider.__name);

    return { args, slots };
  },
  template: `
    <UDivider v-bind="args">
      ${args.slotTemplate || getSlotsFragment()}
    </UDivider>
  `,
});

const EnumVariantTemplate = (args, { argTypes } = {}) => ({
  components: { UDivider, URow },
  setup() {
    return {
      args,
      options: argTypes[args.enum].options,
    };
  },
  template: `
    <URow>
      <UDivider
        class="w-1/4"
        v-for="(option, index) in options"
        v-bind="args"
        :[args.enum]="option"
        :key="index"
      />
    </URow>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const Sizes = EnumVariantTemplate.bind({});
Sizes.args = { enum: "size" };

export const Variants = EnumVariantTemplate.bind({});
Variants.args = { enum: "variant" };

export const Dashed = DefaultTemplate.bind({});
Dashed.args = { dashed: true };

export const Dotted = DefaultTemplate.bind({});
Dotted.args = { dotted: true };

export const Vertical = DefaultTemplate.bind({});
Vertical.args = {
  vertical: true,
  config: {
    wrapper: {
      base: "min-h-8",
    },
  },
};

export const NoBorder = DefaultTemplate.bind({});
NoBorder.args = { noBorder: true };

export const NoTopPadding = DefaultTemplate.bind({});
NoTopPadding.args = { noTopPadding: true };

export const NoBottomPadding = DefaultTemplate.bind({});
NoBottomPadding.args = { noBottomPadding: true };

export const NoRightPadding = DefaultTemplate.bind({});
NoRightPadding.args = {
  noRightPadding: true,
  vertical: true,
  config: {
    wrapper: {
      base: "min-h-8",
    },
  },
};

export const NoLeftPadding = DefaultTemplate.bind({});
NoLeftPadding.args = {
  noLeftPadding: true,
  vertical: true,
  config: {
    wrapper: {
      base: "min-h-8",
    },
  },
};
