import { ref } from "vue";
import {
  getArgTypes,
  getSlotNames,
  getSlotsFragment,
  getDocsDescription,
} from "../../utils/storybook.ts";

import UToggle from "../../ui.button-toggle/UToggle.vue";
import UIcon from "../../ui.image-icon/UIcon.vue";
import UToggleItem from "../../ui.button-toggle-item/UToggleItem.vue";
import URow from "../../ui.container-row/URow.vue";
import UBadge from "../../ui.text-badge/UBadge.vue";

import type { Meta, StoryFn } from "@storybook/vue3";
import type { Props } from "../types.ts";

interface UToggleArgs extends Props {
  slotTemplate?: string;
  enum: "size";
}

export default {
  components: { UIcon, UToggleItem },
  title: "Buttons & Links / Toggle",
  component: UToggle,
  args: {
    label: "Please choose an option",
    modelValue: "11",
    options: [
      { value: "11", label: "Item 1" },
      { value: "12", label: "Item 2" },
      { value: "13", label: "Item 3" },
      { value: "14", label: "Item 4" },
    ],
  },
  argTypes: {
    ...getArgTypes(UToggle.__name),
    modelValue: { control: { type: "text" } },
  },
  parameters: {
    docs: {
      ...getDocsDescription(UToggle.__name),
    },
  },
} as Meta;

const DefaultTemplate: StoryFn<UToggleArgs> = (args: UToggleArgs) => ({
  components: { UToggle, UIcon, UToggleItem, UBadge },
  setup() {
    const slots = getSlotNames(UToggle.__name);

    return { args, slots };
  },
  template: `
    <UToggle v-bind="args" v-model="args.modelValue">
      ${args.slotTemplate || getSlotsFragment("")}
    </UToggle>
  `,
});

const EnumVariantTemplate: StoryFn<UToggleArgs> = (args: UToggleArgs, { argTypes }) => ({
  components: { UToggle, URow },
  setup() {
    const value = ref("");

    return {
      args,
      value,
      options: argTypes?.[args.enum]?.options,
    };
  },
  template: `
    <URow>
      <UToggle
        v-for="(option, index) in options"
        :key="index"
        v-bind="args"
        v-model="value"
        :[args.enum]="option"
        :label="option"
        :options="[
          { value: option + 1, label: option },
          { value: option + 2, label: option },
        ]"
        class="w-auto"
      />
    </URow>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {
  name: "Default",
};

export const Disabled = DefaultTemplate.bind({});
Disabled.args = {
  name: "Disabled",
  disabled: true,
  label: "You can't choose an option",
};

export const Description = DefaultTemplate.bind({});
Description.args = { name: "Description", description: "Also add description if you want to" };

export const Sizes = EnumVariantTemplate.bind({});
Sizes.args = { name: "sizeTemplate", enum: "size" };

export const Multiple = DefaultTemplate.bind({});
Multiple.args = {
  name: "multipleTemplate",
  multiple: true,
  label: "You can choose more than one option",
};

export const Block = DefaultTemplate.bind({});
Block.args = { name: "block", block: true };

export const Split = DefaultTemplate.bind({});
Split.args = { name: "split", split: true };

export const Round = DefaultTemplate.bind({});
Round.args = { name: "round", round: true, split: true };

export const Square = DefaultTemplate.bind({});
Square.args = {
  name: "square",
  square: true,
  label: "Square prop is useful when icons are present",
  slotTemplate: `
    <template #default>
      <UToggleItem value="1">
        <UIcon name="star" color="inherit" />
      </UToggleItem>

      <UToggleItem value="2" >
        <UIcon name="add" color="inherit" />
      </UToggleItem>

      <UToggleItem value="3">
        <UIcon name="timer" color="inherit" />
      </UToggleItem>
    </template>
  `,
};

export const DefaultSlot = DefaultTemplate.bind({});
DefaultSlot.args = {
  name: "defaultSlot",
  label: "Please select an operation to proceed",
  slotTemplate: `
    <template #default>
      <UToggleItem value="1">
        <UBadge label="Download" color="green" right-icon="download" />
      </UToggleItem>
      <UToggleItem value="2">
        <UBadge label="Edit" color="amber" right-icon="edit" />
      </UToggleItem>
      <UToggleItem value="3">
        <UBadge label="Delete" color="red" right-icon="delete" />
      </UToggleItem>
    </template>
  `,
};
