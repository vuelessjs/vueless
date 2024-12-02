import {
  getArgTypes,
  getSlotNames,
  getSlotsFragment,
  getDocsDescription,
} from "../../utils/storybook.ts";

import UHeader from "../../ui.text-header/UHeader.vue";
import UCol from "../../ui.container-col/UCol.vue";

import type { Meta, StoryFn } from "@storybook/vue3";
import type { UHeaderProps } from "../types.ts";

interface UHeaderArgs extends UHeaderProps {
  slotTemplate?: string;
  enum: "size" | "color";
}

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
    ...getArgTypes(UHeader.__name),
  },
  parameters: {
    ...getDocsDescription(UHeader.__name),
  },
} as Meta;

const DefaultTemplate: StoryFn<UHeaderArgs> = (args: UHeaderArgs) => ({
  components: { UHeader },
  setup() {
    const slots = getSlotNames(UHeader.__name);

    return { args, slots };
  },
  template: `
    <UHeader v-bind="args">
      ${args.slotTemplate || getSlotsFragment("")}
    </UHeader>
  `,
});

const EnumVariantTemplate: StoryFn<UHeaderArgs> = (args: UHeaderArgs, { argTypes }) => ({
  components: { UHeader, UCol },
  setup() {
    return {
      args,
      options: argTypes?.[args.enum]?.options,
    };
  },
  template: `
    <UCol>
      <UHeader
        v-for="(option, index) in options"
        :key="index"
        v-bind="args"
        :[args.enum]="option"
        :label="'Header ' + option"
      />
    </UCol>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const Sizes = EnumVariantTemplate.bind({});
Sizes.args = { enum: "size" };

export const Underlined = EnumVariantTemplate.bind({});
Underlined.args = { enum: "size", underlined: true };

export const Line = DefaultTemplate.bind({});
Line.args = {
  size: "2xl",
  line: false,
  label: "Some very long header you ever may imagine in your whole long and beautiful life",
};

export const Colors = EnumVariantTemplate.bind({});
Colors.args = { enum: "color" };
