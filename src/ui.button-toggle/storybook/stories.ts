import { ref, computed } from "vue";
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
    const modelValueRef = ref(args.modelValue);
    const error = computed(() => {
      if (args.name === "error") {
        if (Array.isArray(modelValueRef.value)) {
          return modelValueRef.value.length === 0 ? "Please select at least one option" : "";
        }

        return !modelValueRef.value ? "Please select an option" : "";
      }

      return "";
    });

    return { args, slots, modelValueRef, error };
  },
  template: `
    <UToggle
      v-bind="args"
      v-model="modelValueRef"
      :error="error"
    >
      ${args.slotTemplate || getSlotsFragment("")}
    </UToggle>
  `,
});

const EnumVariantTemplate: StoryFn<UToggleArgs> = (args: UToggleArgs, { argTypes }) => ({
  components: { UToggle, URow },
  setup() {
    const values = ref({
      "2xs": "",
      xs: "",
      sm: "",
      md: "",
      lg: "",
      xl: "",
    });

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
    { value: "11", label: "Item 1" },
    { value: "12", label: "Item 2", disabled: true },
    { value: "13", label: "Item 3" },
    { value: "14", label: "Item 4", disabled: true },
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
