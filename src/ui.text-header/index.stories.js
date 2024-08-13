import { getArgTypes, getSlotNames, getSlotsFragment } from "../service.storybook";

import UHeader from "../ui.text-header";
import UGroup from "../ui.container-group";

/**
 * The `UHeader` component. | [View on GitHub](https://github.com/vuelessjs/vueless/tree/main/src/ui.text-header)
 */
export default {
  id: "4010",
  title: "Text & Content / Header",
  component: UHeader,
  args: {
    label: "Header",
  },
  argTypes: {
    ...getArgTypes(UHeader.name),
  },
};

const DefaultTemplate = (args) => ({
  components: { UHeader },
  setup() {
    const slots = getSlotNames(UHeader.name);

    return { args, slots };
  },
  template: `
    <UHeader v-bind="args">
      ${args.slotTemplate || getSlotsFragment()}
    </UHeader>
  `,
});

const EnumVariantTemplate = (args, { argTypes } = {}) => ({
  components: { UHeader, UGroup },
  setup() {
    return {
      args,
      options: argTypes[args.enum].options,
    };
  },
  template: `
    <UGroup>
      <UHeader
        v-for="(option, index) in options"
        :key="index"
        v-bind="args"
        :[args.enum]="option"
        :label="'Header ' + option"
      />
    </UGroup>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const Weights = EnumVariantTemplate.bind({});
Weights.args = { enum: "weight" };

export const Sizes = EnumVariantTemplate.bind({});
Sizes.args = { enum: "size" };

export const Underlined = EnumVariantTemplate.bind({});
Underlined.args = { enum: "size", underlined: true };

export const Multiline = DefaultTemplate.bind({});
Multiline.args = {
  size: "2xl",
  multiline: true,
  label: "Some very long header you ever may imagine in your whole long and beautiful life",
};

export const Colors = EnumVariantTemplate.bind({});
Colors.args = { enum: "color" };
