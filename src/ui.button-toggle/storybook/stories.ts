import { ref } from "vue";
import {
  getArgs,
  getArgTypes,
  getSlotNames,
  getSlotsFragment,
  getDocsDescription,
} from "../../utils/storybook.ts";

import UToggle from "../../ui.button-toggle/UToggle.vue";
import UIcon from "../../ui.image-icon/UIcon.vue";
import URow from "../../ui.container-row/URow.vue";
import UBadge from "../../ui.text-badge/UBadge.vue";
import UDot from "../../ui.other-dot/UDot.vue";
import ULabel from "../../ui.form-label/ULabel.vue";

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
  components: { UToggle, UIcon, UBadge, UDot, ULabel },
  setup: () => ({ args, slots: getSlotNames(UToggle.__name) }),
  template: `
    <UToggle v-bind="args" v-model="args.modelValue">
      ${args.slotTemplate || getSlotsFragment("")}
    </UToggle>
  `,
});

const EnumTemplate: StoryFn<UToggleArgs> = (args: UToggleArgs, { argTypes }) => ({
  components: { UToggle, URow },
  setup: () => ({ args, argTypes, getArgs, values: ref(argTypes.size?.options) }),
  template: `
    <URow>
      <UToggle
        v-for="option in argTypes?.[args.enum]?.options"
        v-bind="getArgs(args, option)"
        :key="option"
        v-model="values[option]"
        class="w-auto"
      />
    </URow>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = { name: "Default" };

export const Sizes = EnumTemplate.bind({});
Sizes.args = {
  name: "sizeTemplate",
  enum: "size",
  options: [
    { value: 1, label: "{enumValue}" },
    { value: 2, label: "{enumValue}" },
  ],
};

export const Multiple = DefaultTemplate.bind({});
Multiple.args = { name: "multiple", multiple: true, modelValue: ["11", "12"] };

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
    { value: "11", icon: "star" },
    { value: "12", icon: "add" },
    { value: "13", icon: "timer" },
  ],
};

export const Disabled = DefaultTemplate.bind({});
Disabled.args = {
  name: "DisabledItems",
  disabled: true,
};

export const DisabledItems = DefaultTemplate.bind({});
DisabledItems.args = {
  name: "DisabledItems",
  options: [
    { value: "11", label: "Admin" },
    { value: "12", label: "Editor", disabled: true },
    { value: "13", label: "Viewer" },
    { value: "14", label: "Guest", disabled: true },
  ],
};

export const OptionSlot: StoryFn<UToggleArgs> = (args) => ({
  components: { UToggle, UDot, ULabel },
  setup() {
    const modelValue = ref("1");

    return { args, modelValue };
  },
  template: `
    <ULabel label="Select transaction status:">
      <UToggle
        name="optionSlot"
        v-model="modelValue"
        :options="[
          { value: '1', label: 'Success', color: 'success' },
          { value: '2', label: 'Warning', color: 'warning' },
          { value: '3', label: 'Error', color: 'error' },
        ]"
      >
        <template #option="{ option }">
          <UDot :color="option.color" />
          {{ option.label }}
        </template>
      </UToggle>
    </ULabel>
  `,
});

export const Slots: StoryFn<UToggleArgs> = (args) => ({
  components: { UToggle, URow, UIcon },
  setup() {
    const leftModel = ref("11");
    const rightModel = ref("13");

    return { args, leftModel, rightModel };
  },
  template: `
    <URow>
      <UToggle v-bind="args" v-model="leftModel" name="leftSlot">
        <template #left="{ index }">
          <UIcon size="sm" color="inherit" v-if="index === 0" name="settings" />
        </template>
      </UToggle>

      <UToggle v-bind="args" v-model="rightModel" name="rightSlot">
        <template #right="{ index }">
          <div class="font-medium" v-if="index === 2">(24)</div>
        </template>
      </UToggle>
    </URow>
  `,
});
