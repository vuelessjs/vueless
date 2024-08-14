import { getArgTypes, getSlotNames, getSlotsFragment } from "../service.storybook";
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
    const slots = getSlotNames(UDivider.name);

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

export const sizes = EnumVariantTemplate.bind({});
sizes.args = { enum: "size" };

export const variants = EnumVariantTemplate.bind({});
variants.args = { enum: "variant" };

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
