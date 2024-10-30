import { getArgTypes, getSlotNames, getSlotsFragment } from "../../utils/utilStorybook.ts";

import UIcon from "../../ui.image-icon/UIcon.vue";
import URow from "../../ui.container-row/URow.vue";

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
    ...getArgTypes(UIcon.__name),
  },
};

const DefaultTemplate = (args) => ({
  components: { UIcon },
  setup() {
    const slots = getSlotNames(UIcon.__name);

    return { args, slots };
  },
  template: `
    <UIcon v-bind="args">
      ${args.slotTemplate || getSlotsFragment()}
    </UIcon>
  `,
});

const EnumVariantTemplate = (args, { argTypes }) => ({
  components: { UIcon, URow },
  setup() {
    return {
      args,
      options: argTypes[args.enum].options,
    };
  },
  template: `
    <URow>
      <UIcon
        v-for="(option, index) in options"
        :key="index"
        v-bind="args"
        :[args.enum]="option"
      />
    </URow>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const Colors = EnumVariantTemplate.bind({});
Colors.args = { enum: "color" };

export const Sizes = EnumVariantTemplate.bind({});
Sizes.args = { enum: "size" };

export const Variants = EnumVariantTemplate.bind({});
Variants.args = { enum: "variant", color: "red" };

export const Tooltip = DefaultTemplate.bind({});
Tooltip.args = { tooltip: "Some text" };

export const Interactive = DefaultTemplate.bind({});
Interactive.args = { interactive: true };
