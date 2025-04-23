import {
  getArgs,
  getArgTypes,
  getSlotNames,
  getSlotsFragment,
  getDocsDescription,
} from "../../utils/storybook.ts";
import { ref } from "vue";

import UDropdownButton from "../../ui.dropdown-button/UDropdownButton.vue";
import URow from "../../ui.container-row/URow.vue";
import UCol from "../../ui.container-col/UCol.vue";
import UIcon from "../../ui.image-icon/UIcon.vue";
import ULink from "../../ui.button-link/ULink.vue";

import type { Meta, StoryFn } from "@storybook/vue3";
import type { Props } from "../types.ts";

interface DefaultUDropdownButtonArgs extends Props {
  slotTemplate?: string;
}

interface EnumUDropdownButtonArgs extends DefaultUDropdownButtonArgs {
  enum: keyof Pick<Props, "size" | "variant" | "xPosition" | "yPosition" | "color">;
  outerEnum: "variant";
}

export default {
  id: "2010",
  title: "Dropdowns / Dropdown Button",
  component: UDropdownButton,
  args: {
    label: "Dropdown",
    options: [
      { label: "option 1", id: 1 },
      { label: "option 2", id: 2 },
      { label: "option 3", id: 3 },
    ],
  },
  argTypes: {
    ...getArgTypes(UDropdownButton.__name),
  },
  parameters: {
    docs: {
      ...getDocsDescription(UDropdownButton.__name),
      story: {
        height: "250px",
      },
    },
  },
} as Meta;

const DefaultTemplate: StoryFn<DefaultUDropdownButtonArgs> = (
  args: DefaultUDropdownButtonArgs,
) => ({
  components: { UDropdownButton, UIcon, ULink },
  setup: () => ({ args, slots: getSlotNames(UDropdownButton.__name) }),
  template: `
    <UDropdownButton v-bind="args">
      ${args.slotTemplate || getSlotsFragment("")}
    </UDropdownButton>
  `,
});

const SelectableTemplate: StoryFn<DefaultUDropdownButtonArgs> = (
  args: DefaultUDropdownButtonArgs,
) => ({
  components: { UDropdownButton, UIcon, ULink },
  setup() {
    const slots = getSlotNames(UDropdownButton.__name);

    const value = ref();

    return { args, slots, value };
  },
  template: `
    <UDropdownButton v-bind="args" v-model="value">
      ${args.slotTemplate || getSlotsFragment("")}
    </UDropdownButton>
  `,
});

const EnumTemplate: StoryFn<EnumUDropdownButtonArgs> = (
  args: EnumUDropdownButtonArgs,
  { argTypes },
) => ({
  components: { UDropdownButton, URow },
  setup: () => ({ args, argTypes, getArgs }),
  template: `
    <URow>
      <UDropdownButton
        v-for="option in argTypes?.[args.enum]?.options"
        v-bind="getArgs(args, option)"
        :key="option"
      />
    </URow>
  `,
});

const MultiEnumTemplate: StoryFn<EnumUDropdownButtonArgs> = (
  args: EnumUDropdownButtonArgs,
  { argTypes },
) => ({
  components: { UDropdownButton, URow, UCol },
  setup: () => ({ args, argTypes, getArgs }),
  template: `
    <UCol>
      <URow v-for="outerOption in argTypes?.[args.outerEnum]?.options" :key="outerOption">
        <UDropdownButton
          v-for="option in argTypes?.[args.enum]?.options"
          v-bind="getArgs(args, option, outerOption)"
          :key="option"
        />
      </URow>
    </UCol>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const Selectable = SelectableTemplate.bind({});
Selectable.args = {};

export const SelectableMultiple = SelectableTemplate.bind({});
SelectableMultiple.args = { multiple: true };

export const Variants = EnumTemplate.bind({});
Variants.args = { enum: "variant", label: "{enumValue}" };

export const Size = EnumTemplate.bind({});
Size.args = { enum: "size", label: "{enumValue}" };

export const ListboxXPosition = EnumTemplate.bind({});
ListboxXPosition.args = { enum: "xPosition", label: "{enumValue}" };

export const ListboxYPosition = EnumTemplate.bind({});
ListboxYPosition.args = { enum: "yPosition", label: "{enumValue}" };
ListboxYPosition.parameters = {
  storyClasses: "h-[350px] flex items-center px-6 pt-8 pb-12",
};

export const Color = MultiEnumTemplate.bind({});
Color.args = { outerEnum: "variant", enum: "color", label: "{enumValue}" };

export const WithoutDropdownIcon = EnumTemplate.bind({});
WithoutDropdownIcon.args = { enum: "variant", label: "{enumValue}", noIcon: true };

export const CustomDropdownIcon = DefaultTemplate.bind({});
CustomDropdownIcon.args = {
  config: {
    defaults: {
      dropdownIcon: "expand_circle_down",
    },
  },
};

export const DefaultSlot = DefaultTemplate.bind({});
DefaultSlot.args = {
  slotTemplate: `
    <template #default>
      <UIcon name="unfold_more" color="inherit" />
    </template>
  `,
  noIcon: true,
  square: true,
};

export const LeftSlot = DefaultTemplate.bind({});
LeftSlot.args = {
  slotTemplate: `
    <template #left>
      <UIcon name="heart_plus" size="sm" color="inherit" />
    </template>
  `,
};

export const SlotToggle = DefaultTemplate.bind({});
SlotToggle.args = {
  slotTemplate: `
    <template #toggle="{ opened }">
      <ULink :label="opened ? 'collapse' : 'expand'" color="inherit" />
    </template>
  `,
};
