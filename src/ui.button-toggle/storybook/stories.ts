import { ref, computed } from "vue";
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
    label: "Please choose an option",
    modelValue: "11",
    options: [
      { value: "11", label: "Admin" },
      { value: "12", label: "Editor" },
      { value: "13", label: "Viewer" },
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
    const errorMessage = computed(() => {
      if (args.name === "error" && Array.isArray(args.modelValue)) {
        return args.modelValue.length === 0 ? "Please select at least one option" : "";
      }

      return "";
    });

    return { args, slots, errorMessage };
  },
  template: `
    <UToggle
      v-bind="args"
      v-model="args.modelValue"
      :error="errorMessage"
    >
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
  label: "You can disable the whole toggle or specific items",
  options: [
    { value: "11", label: "Admin" },
    { value: "12", label: "Editor", disabled: true },
    { value: "13", label: "Viewer" },
    { value: "14", label: "Guest", disabled: true },
  ],
};

export const Description = DefaultTemplate.bind({});
Description.args = { name: "Description", description: "You can also add description" };

export const Sizes = EnumVariantTemplate.bind({});
Sizes.args = { name: "sizeTemplate", enum: "size" };

export const Multiple = DefaultTemplate.bind({});
Multiple.args = {
  name: "multiple",
  multiple: true,
  modelValue: [],
  label: "You can choose more than one option",
};

export const Error = DefaultTemplate.bind({});
Error.args = {
  name: "error",
  multiple: true,
  modelValue: [],
  label: "If no option is selected, error message is displayed",
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

export const SlotLabel = DefaultTemplate.bind({});
SlotLabel.args = {
  name: "slotLabel",
  label: "Please select an operation to proceed",
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
