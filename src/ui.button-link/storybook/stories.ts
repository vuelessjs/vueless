import { getArgTypes, getSlotNames, getSlotsFragment } from "../../utils/storybook.ts";

import ULink from "../../ui.button-link/ULink.vue";
import UIcon from "../../ui.image-icon/UIcon.vue";
import UButton from "../../ui.button/UButton.vue";
import URow from "../../ui.container-row/URow.vue";

import type { Meta, StoryFn } from "@storybook/vue3";
import type { ULinkProps } from "../types.ts";

interface ULinkArgs extends ULinkProps {
  slotTemplate?: string;
  enum: "size" | "color";
}

/**
 * The `ULink` component. | [View on GitHub](https://github.com/vuelessjs/vueless/tree/main/src/ui.button-link)
 */
export default {
  id: "1060",
  title: "Buttons & Links / Link",
  component: ULink,
  args: {
    label: "Link",
  },
  argTypes: {
    ...getArgTypes(ULink.__name),
  },
} as Meta;

const DefaultTemplate: StoryFn<ULinkArgs> = (args: ULinkArgs) => ({
  components: { ULink, UButton, UIcon },
  setup() {
    const slots = getSlotNames(ULink.__name);

    return { args, slots };
  },
  template: `
    <ULink v-if="args.block" v-bind="args" :config="{ wrapper: 'border-2 border-dashed border-green-500 p-2' }">
      ${args.slotTemplate || getSlotsFragment("")}
    </ULink>
    <ULink v-else v-bind="args">
      ${args.slotTemplate || getSlotsFragment("")}
    </ULink>
  `,
});

const EnumVariantTemplate: StoryFn<ULinkArgs> = (args: ULinkArgs, { argTypes }) => ({
  components: { ULink, URow },
  setup() {
    function getText(value: string) {
      return `Link ${value}`;
    }

    let prefixedOptions = argTypes?.[args.enum]?.options;

    if (argTypes?.[args.enum]?.name === "size") {
      prefixedOptions = prefixedOptions?.map((option) => getText(option));
    }

    return { args, options: argTypes?.[args.enum]?.options, prefixedOptions };
  },
  template: `
    <URow no-mobile>
      <ULink
        v-for="(option, index) in options"
        :key="index"
        v-bind="args"
        :[args.enum]="option"
        :label="prefixedOptions[index]"
      />
    </URow>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const Sizes = EnumVariantTemplate.bind({});
Sizes.args = { enum: "size" };

export const Colors = EnumVariantTemplate.bind({});
Colors.args = { enum: "color" };

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
      { name: "Underlined", props: { underlined: true } },
      { name: "Dashed", props: { dashed: true } },
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
      <div class="text-sm font-medium mb-2">{{ variant.name }}</div>
      <URow no-mobile>
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

export const NoRing = DefaultTemplate.bind({});
NoRing.args = { noRing: true };

export const Block = DefaultTemplate.bind({});
Block.args = { block: true };

export const DefaultSlot = DefaultTemplate.bind({});
DefaultSlot.args = {
  slotTemplate: `
    <template #default>
      <UButton label="Text" />
    </template>
  `,
};

export const LeftAndRightSlots: StoryFn<ULinkArgs> = (args: ULinkArgs) => ({
  components: { ULink, UIcon, URow },
  setup() {
    return { args };
  },
  template: `
    <URow no-mobile>
      <ULink label="Download">
        <template #left>
          <UIcon name="download" size="xs" color="green" />
        </template>
      </ULink>

      <ULink label="Open">
        <template #right>
          <UIcon name="open_in_new" size="xs" color="green" />
        </template>
      </ULink>
    </URow>
  `,
});
