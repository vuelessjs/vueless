import {
  getArgTypes,
  getSlotNames,
  getSlotsFragment,
  getDocsDescription,
} from "../../utils/storybook.ts";

import UIcon from "../../ui.image-icon/UIcon.vue";
import URow from "../../ui.container-row/URow.vue";
import tooltip from "../../directives/tooltip/vTooltip.ts";

import Beverage from "../../assets/icons/vueless/emoji_food_beverage.svg?component";

import type { Meta, StoryFn } from "@storybook/vue3";
import type { Props } from "../types.ts";

interface UIconArgs extends Props {
  slotTemplate?: string;
  enum: "color" | "size" | "variant";
}

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
    docs: {
      ...getDocsDescription(UIcon.__name),
    },
  },
} as Meta;

const DefaultTemplate: StoryFn<UIconArgs> = (args: UIconArgs) => ({
  components: { UIcon },
  directives: { tooltip },
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
  directives: { tooltip },
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
        v-tooltip="option"
      />
    </URow>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const Src = DefaultTemplate.bind({});
Src.args = { src: Beverage };
Src.parameters = {
  docs: {
    description: {
      story:
        // eslint-disable-next-line vue/max-len
        "To use a custom icon, import it with the suffix `?component` and pass the imported component in the `src` prop, like this: <br/> `import Beverage from '../../assets/icons/vueless/emoji_food_beverage.svg?component'`",
    },
  },
};

export const Colors = EnumVariantTemplate.bind({});
Colors.args = { enum: "color" };

export const Sizes = EnumVariantTemplate.bind({});
Sizes.args = { enum: "size" };

export const Variants = EnumVariantTemplate.bind({});
Variants.args = { enum: "variant", color: "green" };

export const Interactive = DefaultTemplate.bind({});
Interactive.args = { interactive: true };
