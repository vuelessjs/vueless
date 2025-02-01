import { ref } from "vue";
import {
  getArgTypes,
  getSlotNames,
  getSlotsFragment,
  getDocsDescription,
} from "../../utils/storybook.ts";

import UToggle from "../../ui.button-toggle/UToggle.vue";
import UIcon from "../../ui.image-icon/UIcon.vue";
import URow from "../../ui.container-row/URow.vue";
import UBadge from "../../ui.text-badge/UBadge.vue";

import type { Meta, StoryFn } from "@storybook/vue3";
import type { Props } from "../types.ts";

interface UToggleArgs extends Props {
  slotTemplate?: string;
  enum: "size";
}

export default {
  components: { UIcon },
  title: "Buttons & Links / Toggle",
  component: UToggle,
  args: {
    modelValue: "11",
    options: [
      { value: "11", label: "Admin" },
      { value: "12", label: "Manager" },
      { value: "13", label: "Employee" },
      { value: "14", label: "Guest" },
    ],
  },
  argTypes: {
    ...getArgTypes(UToggle.__name),
  },
  parameters: {
    docs: {
      ...getDocsDescription(UToggle.__name),
    },
  },
} as Meta;

const DefaultTemplate: StoryFn<UToggleArgs> = (args: UToggleArgs) => ({
  components: { UToggle, UIcon, UBadge },
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
    const values = ref(["2xs", "xs", "sm", "md", "lg", "xl"]);

    return {
      args,
      values,
      options: argTypes?.[args.enum]?.options,
    };
  },
  template: `
    <URow>
      <UToggle
        v-for="(option, index) in options"
        :key="index"
        v-bind="args"
        v-model="values[option]"
        :[args.enum]="option"
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
  options: [
    { value: "11", label: "Admin" },
    { value: "12", label: "Editor", disabled: true },
    { value: "13", label: "Viewer" },
    { value: "14", label: "Guest", disabled: true },
  ],
};

export const Sizes = EnumVariantTemplate.bind({});
Sizes.args = { name: "sizeTemplate", enum: "size" };

export const Multiple = DefaultTemplate.bind({});
Multiple.args = {
  name: "multiple",
  multiple: true,
  modelValue: [],
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
  options: [
    { value: "11", label: "star" },
    { value: "12", label: "add" },
    { value: "13", label: "timer" },
  ],
  slotTemplate: `
    <template #default="{ label, index }">
      <UIcon :name="label" color="inherit" />
    </template>
  `,
};

export const DefaultSlot = DefaultTemplate.bind({});
DefaultSlot.args = {
  name: "defaultSlot",
  options: [
    { value: "1", label: "Download", rightIcon: "download", color: "green" },
    { value: "2", label: "Edit", rightIcon: "edit_note", color: "orange" },
    { value: "3", label: "Delete", rightIcon: "delete", color: "red" },
  ],
  slotTemplate: `
    <template #default="{ label, index }">
      <UBadge
        :label="label"
        :color="args.options[index].color"
        :right-icon="args.options[index].rightIcon"
      />
    </template>
  `,
};

export const Slots: StoryFn<UToggleArgs> = (args) => ({
  components: { UToggle, URow, UIcon },
  setup() {
    const leftModel = ref("11");
    const rightModel = ref("13");

    return { args, leftModel, rightModel };
  },
  template: `
    <URow no-mobile>
      <UToggle v-bind="args" v-model="leftModel" name="leftSlot">
        <template #left="{ index }">
          <UIcon size="sm" color="inherit" v-if="index === 0" name="settings" />
        </template>
      </UToggle>

      <UToggle v-bind="args" v-model="rightModel" name="rightSlot">
        <template #right="{ index }">
          <UIcon size="sm" color="inherit" v-if="index === 2" name="person" />
        </template>
      </UToggle>
    </URow>
  `,
});
