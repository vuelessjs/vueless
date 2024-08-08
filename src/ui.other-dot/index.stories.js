import UDot from "../ui.other-dot";
import URow from "../ui.container-row";
import UGroup from "../ui.container-group";
import UBadge from "../ui.text-badge";

import { getArgTypes } from "../service.storybook";

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
    return { args };
  },
  template: `
    <UDot v-bind="args" />
  `,
});

const EnumVariantTemplate = (args, { argTypes } = {}) => ({
  components: { UGroup, URow, UDot, UBadge },
  setup() {
    return {
      args,
      options: argTypes[args.enum].options,
    };
  },
  template: `
    <UGroup>
      <URow
        v-for="(option, index) in options"
        :key="index"
        gap="none"
        align="center"
      >
        <UDot v-bind="args" :[args.enum]="option"/>
        <UBadge
          :label="option"
          :[args.enum]="option"
          variant="thirdary"
        />
      </URow>
    </UGroup>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const Colors = EnumVariantTemplate.bind({});
Colors.args = { enum: "color" };

export const Sizes = EnumVariantTemplate.bind({});
Sizes.args = { enum: "size" };
