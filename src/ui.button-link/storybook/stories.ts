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
  enum: "size" | "color" | "target";
}

export default {
  id: "1060",
  title: "Buttons & Links / Link",
  component: ULink,
  args: {
    label: "Learn more",
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

export const Size = EnumVariantTemplate.bind({});
Size.args = { enum: "size", label: "{enumValue}" };

export const Color = EnumVariantTemplate.bind({});
Color.args = { enum: "color", label: "{enumValue}" };

export const Types: StoryFn<ULinkArgs> = (args: ULinkArgs) => ({
  components: { ULink, URow },
  setup() {
    function getTypeLabel(type: string): string {
      switch (type) {
        case "phone":
          return "+1 (000) 123-4567";
        case "email":
          return "hello@vueless.com";
        case "link":
          return "Vueless.com";
        default:
          return "Unknown";
      }
    }

    function getTypeHref(type: string, label: string) {
      switch (type) {
        case "phone": {
          const phoneNumber = label.replace(/\D/g, "");

          return `+${phoneNumber}`;
        }

        case "email":
          return `${label}`;
        case "link":
          return "https://vueless.com/";
        default:
          return "#";
      }
    }

    const options = ["phone", "email", "link"];
    const links = options.map((type) => ({
      type,
      label: getTypeLabel(type),
      href: getTypeHref(type, getTypeLabel(type)),
    }));

    return { args, links };
  },
  template: `
    <URow>
      <ULink
        v-for="(link, index) in links"
        :key="index"
        v-bind="args"
        :type="link.type"
        :label="link.label"
        :href="link.href"
        target-blank
      />
    </URow>
  `,
});

export const UnderlineVariants: StoryFn<ULinkArgs> = (args: ULinkArgs, { argTypes }) => ({
  components: { ULink, URow },
  setup() {
    const variants = [
      { name: "Default", props: {} },
      { name: "Dashed", props: { dashed: true } },
      { name: "Dotted", props: { dotted: true } },
      { name: "Underlined", props: { underlined: true } },
      { name: "No underline", props: { underlined: false } },
    ];

    const colors = argTypes?.color?.options;

    return {
      args,
      variants,
      colors,
    };
  },
  template: `
    <div v-for="variant in variants" :key="variant.name" class="mb-8">
      <div class="text-medium font-medium mb-2">{{ variant.name }}</div>
      <URow>
        <ULink
          v-for="color in colors"
          :key="color"
          v-bind="variant.props"
          :color="color"
          :label="color"
        />
      </URow>
    </div>
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

export const SlotDefault = DefaultTemplate.bind({});
SlotDefault.args = {
  slotTemplate: `
    <template #default>
      <UButton label="Learn more" />
    </template>
  `,
};
