import {
  getArgs,
  getArgTypes,
  getSlotNames,
  getSlotsFragment,
  getDocsDescription,
} from "../../utils/storybook.ts";
import { ref } from "vue";

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
      { label: "option 1", id: 1 },
      { label: "option 2", id: 2 },
      { label: "option 3", id: 3 },
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
  setup: () => ({ args, slots: getSlotNames(UDropdownLink.__name) }),
  template: `
    <UDropdownLink v-bind="args">
      ${args.slotTemplate || getSlotsFragment("")}
    </UDropdownLink>
  `,
});

const SelectableTemplate: StoryFn<DefaultUDropdownLinkArgs> = (args: DefaultUDropdownLinkArgs) => ({
  components: { UDropdownLink, UIcon, ULink },
  setup() {
    const slots = getSlotNames(UDropdownLink.__name);

    const value = ref();

    return { args, slots, value };
  },
  template: `
    <UDropdownLink v-bind="args" v-model="value">
      ${args.slotTemplate || getSlotsFragment("")}
    </UDropdownLink>
  `,
});

const EnumTemplate: StoryFn<EnumUDropdownLinkArgs> = (
  args: EnumUDropdownLinkArgs,
  { argTypes },
) => ({
  components: { UDropdownLink, URow },
  setup: () => ({ args, argTypes, getArgs }),
  template: `
    <URow>
      <UDropdownLink
        v-for="option in argTypes?.[args.enum]?.options"
        v-bind="getArgs(args, option)"
        :key="option"
      />
    </URow>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const Selectable = SelectableTemplate.bind({});
Selectable.args = {};

export const SelectableMultiple = SelectableTemplate.bind({});
SelectableMultiple.args = { multiple: true };

export const Size = EnumTemplate.bind({});
Size.args = { enum: "size", label: "{enumValue}" };

export const ListboxXPosition = EnumTemplate.bind({});
ListboxXPosition.args = { enum: "xPosition", label: "{enumValue}" };

export const ListboxYPosition = EnumTemplate.bind({});
ListboxYPosition.args = { enum: "yPosition", label: "{enumValue}" };
ListboxYPosition.parameters = {
  storyClasses: "h-[350px] flex items-center px-6 pt-8 pb-12",
};

export const Disabled = DefaultTemplate.bind({});
Disabled.args = { disabled: true };

export const Color = EnumTemplate.bind({});
Color.args = { enum: "color", label: "{enumValue}" };

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
      <URow>
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
    <URow>
      <UDropdownLink v-bind="args" label="Add to favorite">
        <template #left>
          <UIcon
            name="heart_plus"
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
    <template #toggle="{ opened, toggle }">
      <UIcon
        name="expand_circle_down"
        color="success"
        class="mx-1"
        interactive
        :class="{ 'rotate-180' : opened }"
        @click="toggle"
      />
    </template>
  `,
};
