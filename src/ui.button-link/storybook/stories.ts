import {
  getArgs,
  getArgTypes,
  getSlotNames,
  getSlotsFragment,
  getDocsDescription,
} from "../../utils/storybook.ts";

import ULink from "../../ui.button-link/ULink.vue";
import UIcon from "../../ui.image-icon/UIcon.vue";
import UButton from "../../ui.button/UButton.vue";
import URow from "../../ui.container-row/URow.vue";

import type { Meta, StoryFn } from "@storybook/vue3";
import type { Props } from "../types.ts";

interface ULinkArgs extends Props {
  slotTemplate?: string;
  enum: "size" | "color";
}

export default {
  id: "1060",
  title: "Buttons & Links / Link",
  component: ULink,
  args: {
    label: "View on GitHub",
  },
  argTypes: {
    ...getArgTypes(ULink.__name),
  },
  parameters: {
    docs: {
      ...getDocsDescription(ULink.__name),
    },
  },
} as Meta;

const DefaultTemplate: StoryFn<ULinkArgs> = (args: ULinkArgs) => ({
  components: { ULink, UButton, UIcon },
  setup: () => ({ args, slots: getSlotNames(ULink.__name) }),
  template: `
    <ULink v-bind="args">
      ${args.slotTemplate || getSlotsFragment("")}
    </ULink>
  `,
});

const EnumVariantTemplate: StoryFn<ULinkArgs> = (args: ULinkArgs, { argTypes }) => ({
  components: { ULink, URow },
  setup: () => ({ args, argTypes, getArgs }),
  template: `
    <URow>
      <ULink
        v-for="option in argTypes?.[args.enum]?.options"
        :key="option"
        v-bind="getArgs(args, option)"
      />
    </URow>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const Sizes = EnumVariantTemplate.bind({});
Sizes.args = { enum: "size" };

export const Colors = EnumVariantTemplate.bind({});
Colors.args = { enum: "color", label: "{enumValue}" };

export const Types: StoryFn<ULinkArgs> = (args: ULinkArgs) => ({
  components: { ULink, URow },
  setup: () => ({ args }),
  template: `
    <URow>
      <ULink
        type="phone"
        label="+1 (000) 123-4567"
        href="+1(000)123-4567"
      />
      <ULink
        type="email"
        label="hello@vueless.com"
        href="hello@vueless.com"
      />
      <ULink
        type="link"
        label="Vueless.com"
        href="https://vueless.com/"
        target="_blank"
      />
    </URow>
  `,
});

export const UnderlineVariants: StoryFn<ULinkArgs> = (args: ULinkArgs) => ({
  components: { ULink, URow },
  setup: () => ({ args }),
  template: `
    <URow>
      <ULink label="Default" />
      <ULink label="Dashed" dashed underlined />
      <ULink label="Dotted" dotted underlined />
      <ULink label="Underlined" underlined />
      <ULink label="Without Underline" :underlined="false" />
    </URow>
  `,
});

export const Disabled = DefaultTemplate.bind({});
Disabled.args = { disabled: true };

export const Block: StoryFn<ULinkArgs> = (args: ULinkArgs) => ({
  components: { ULink },
  setup: () => ({ args, slots: getSlotNames(ULink.__name) }),
  template: `
    <div class="border-2 border-dashed border-green-500 p-2 rounded-medium">
      <ULink v-bind="args" block>
        ${args.slotTemplate || getSlotsFragment("")}
      </ULink>
    </div>
  `,
});

export const DefaultSlot = DefaultTemplate.bind({});
DefaultSlot.args = {
  slotTemplate: `
    <template #default>
      <UButton label="View on GitHub" />
    </template>
  `,
};
