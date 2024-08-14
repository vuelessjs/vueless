import UDot from "../ui.other-dot";
import URow from "../ui.container-row";
import UCol from "../ui.container-col";
import UBadge from "../ui.text-badge";

import { getArgTypes, getSlotNames, getSlotsFragment } from "../service.storybook";

/**
 * The `UDot` component. | [View on GitHub](https://github.com/vuelessjs/vueless/tree/main/src/ui.other-dot)
 */
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
    const slots = getSlotNames(UDot.name);

    return { args, slots };
  },
  template: `
    <UDot v-bind="args">
      ${args.slotTemplate || getSlotsFragment()}
    </UDot>
  `,
});

const EnumVariantTemplate = (args, { argTypes } = {}) => ({
  components: { UCol, URow, UDot, UBadge },
  setup() {
    return {
      args,
      options: argTypes[args.enum].options,
    };
  },
  template: `
    <UCol>
      <URow
        v-for="(color, index) in colors"
        :key="index"
        gap="none"
        align="center"
      >
        <UDot v-bind="args" :[args.enum]="option"/>
        <UBadge
          :label="option"
          :[args.enum]="option"
          variant="thirdary" />
      </URow>
    </UCol>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const Colors = EnumVariantTemplate.bind({});
Colors.args = { enum: "color" };

export const Sizes = EnumVariantTemplate.bind({});
Sizes.args = { enum: "size" };
