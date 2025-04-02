import {
  getArgTypes,
  getSlotNames,
  getSlotsFragment,
  getDocsDescription,
} from "../../utils/storybook.ts";

import UDropdownLink from "../../ui.dropdown-link/UDropdownLink.vue";
import URow from "../../ui.container-row/URow.vue";
import UIcon from "../../ui.image-icon/UIcon.vue";
import UBadge from "../../ui.text-badge/UBadge.vue";
import ULink from "../../ui.button-link/ULink.vue";

import type { Meta, StoryFn } from "@storybook/vue3";
import type { Props } from "../types.ts";

interface DefaultUDropdownLinkArgs extends Props {
  slotTemplate?: string;
}

interface EnumUDropdownLinkArgs extends DefaultUDropdownLinkArgs {
  enum: keyof Pick<Props, "size" | "color" | "xPosition" | "yPosition">;
}

export default {
  id: "2030",
  title: "Dropdowns / Dropdown Link",
  component: UDropdownLink,
  args: {
    label: "Dropdown",
    options: [
      { label: "option 1", value: "1" },
      { label: "option 2", value: "2" },
      { label: "option 3", value: "3" },
    ],
  },
  argTypes: {
    ...getArgTypes(UDropdownLink.__name),
  },
  parameters: {
    docs: {
      ...getDocsDescription(UDropdownLink.__name),
      story: {
        height: "200px",
      },
    },
  },
} as Meta;

const DefaultTemplate: StoryFn<DefaultUDropdownLinkArgs> = (args: DefaultUDropdownLinkArgs) => ({
  components: { UDropdownLink, UIcon, ULink },
  setup() {
    const slots = getSlotNames(UDropdownLink.__name);

    return { args, slots };
  },
  template: `
    <UDropdownLink v-bind="args">
      ${args.slotTemplate || getSlotsFragment("")}
    </UDropdownLink>
  `,
});

const EnumVariantTemplate: StoryFn<EnumUDropdownLinkArgs> = (
  args: EnumUDropdownLinkArgs,
  { argTypes },
) => ({
  components: { UDropdownLink, URow },
  setup() {
    function getText(value: unknown) {
      return `Dropdown ${value}`;
    }

    let prefixedOptions = argTypes[args.enum]?.options || [];

    if (argTypes[args.enum]?.name === "size") {
      prefixedOptions = prefixedOptions.map((option) => getText(option));
    }

    return { args, options: argTypes[args.enum]?.options, prefixedOptions };
  },
  template: `
    <URow>
      <UDropdownLink
        v-for="(option, index) in options"
        v-bind="args"
        :[args.enum]="option"
        :label="prefixedOptions[index]"
        :key="index"
      />
    </URow>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const Sizes = EnumVariantTemplate.bind({});
Sizes.args = { enum: "size" };

export const DropdownListXPosition = EnumVariantTemplate.bind({});
DropdownListXPosition.args = { enum: "xPosition" };

export const DropdownListYPosition = EnumVariantTemplate.bind({});
DropdownListYPosition.args = { enum: "yPosition" };

export const Disabled = DefaultTemplate.bind({});
Disabled.args = { disabled: true };

export const Colors = EnumVariantTemplate.bind({});
Colors.args = { enum: "color" };

export const UnderlineVariants: StoryFn<EnumUDropdownLinkArgs> = (
  args: EnumUDropdownLinkArgs,
  { argTypes },
) => ({
  components: { UDropdownLink, URow },
  setup() {
    const variants = [
      { name: "Default", props: {} },
      { name: "Underlined (on hover)", props: { underlined: undefined, dashed: false } },
      { name: "Underlined", props: { underlined: true, dashed: false } },
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
      <URow no-mobile>
        <UDropdownLink
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

export const WithoutDropdownIcon = DefaultTemplate.bind({});
WithoutDropdownIcon.args = { noIcon: true };

export const Slots: StoryFn<DefaultUDropdownLinkArgs> = (args) => ({
  components: { UDropdownLink, UIcon, URow, UBadge },
  setup() {
    return { args };
  },
  template: `
    <URow no-mobile>
      <UDropdownLink v-bind="args" label="Add to favorite">
        <template #left>
          <UIcon
            name="heart_plus"
            internal="storybook"
            size="sm"
            color="success"
            class="mx-1"
          />
        </template>
      </UDropdownLink>

      <UDropdownLink v-bind="args">
        <template #default>
          <UBadge label="Dropdown" color="success" variant="soft" />
        </template>
      </UDropdownLink>
    </URow>
  `,
});

export const SlotToggle = DefaultTemplate.bind({});
SlotToggle.args = {
  slotTemplate: `
    <template #toggle="{ opened }">
      <UIcon
        name="expand_circle_down"
        internal="storybook"
        color="success"
        class="mx-1"
        :class="{ 'rotate-180' : opened }"
      />
    </template>
  `,
};
