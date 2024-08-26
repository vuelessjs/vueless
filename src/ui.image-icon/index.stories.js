import { getArgTypes, getSlotNames, getSlotsFragment } from "../service.storybook";

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
    const slots = getSlotNames(UIcon.name);

    return { args, slots };
  },
  template: `
    <UIcon v-bind="args">
      ${args.slotTemplate || getSlotsFragment()}
    </UIcon>
  `,
});

const EnumVariantTemplate = (args, { argTypes } = {}) => ({
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

export const colors = EnumVariantTemplate.bind({});
colors.args = { enum: "color" };

export const sizes = EnumVariantTemplate.bind({});
sizes.args = { enum: "size" };

export const variants = EnumVariantTemplate.bind({});
variants.args = { enum: "variant", color: "red" };

export const tooltip = DefaultTemplate.bind({});
tooltip.args = { tooltip: "Some text" };

export const interactive = DefaultTemplate.bind({});
interactive.args = { interactive: true };
