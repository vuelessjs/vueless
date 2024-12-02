import {
  getArgTypes,
  getSlotNames,
  getSlotsFragment,
  getDocsDescription,
} from "../../utils/storybook.ts";

import UIcon from "../../ui.image-icon/UIcon.vue";
import URow from "../../ui.container-row/URow.vue";

import type { Meta, StoryFn } from "@storybook/vue3";
import type { UIconProps } from "../types.ts";

interface UIconArgs extends UIconProps {
  slotTemplate?: string;
  enum: "color" | "size" | "variant";
}

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
  parameters: {
    ...getDocsDescription(UIcon.__name),
  },
} as Meta;

const DefaultTemplate: StoryFn<UIconArgs> = (args: UIconArgs) => ({
  components: { UIcon },
  setup() {
    const slots = getSlotNames(UIcon.__name);

    return { args, slots };
  },
  template: `
    <UIcon v-bind="args">
      ${args.slotTemplate || getSlotsFragment("")}
    </UIcon>
  `,
});

const EnumVariantTemplate: StoryFn<UIconArgs> = (args: UIconArgs, { argTypes }) => ({
  components: { UIcon, URow },
  setup() {
    return {
      args,
      options: argTypes?.[args.enum]?.options,
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
