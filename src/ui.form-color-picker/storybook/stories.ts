import {
  getArgs,
  getArgTypes,
  getSlotNames,
  getSlotsFragment,
  getDocsDescription,
} from "../../utils/storybook.ts";

import UColorPicker from "../UColorPicker.vue";
import UCol from "../../ui.container-col/UCol.vue";
import UButton from "../../ui.button/UButton.vue";

import type { Meta, StoryFn } from "@storybook/vue3";
import type { Props } from "../types.ts";

interface UColorPickerArgs extends Props {
  slotTemplate?: string;
  enum: "size";
}

export default {
  id: "3190",
  title: "Form Inputs & Controls / Color Picker",
  component: UColorPicker,
  args: {
    modelValue: "",
    colors: /*tw*/ {
      grayscale: "bg-grayscale",
      neutral: "bg-neutral-600",
      red: "bg-red-600",
      orange: "bg-orange-600",
      amber: "bg-amber-600",
      yellow: "bg-yellow-600",
      lime: "bg-lime-600",
      green: "bg-green-600",
      emerald: "bg-emerald-600",
      teal: "bg-teal-600",
      cyan: "bg-cyan-600",
      sky: "bg-sky-600",
      blue: "bg-blue-600",
      indigo: "bg-indigo-600",
      violet: "bg-violet-600",
      purple: "bg-purple-600",
      fuchsia: "bg-fuchsia-600",
      pink: "bg-pink-600",
      rose: "bg-rose-600",
    },
  },
  argTypes: {
    ...getArgTypes(UColorPicker.__name),
  },
  parameters: {
    docs: {
      ...getDocsDescription(UColorPicker.__name),
    },
  },
} as Meta;

const DefaultTemplate: StoryFn<UColorPickerArgs> = (args: UColorPickerArgs) => ({
  components: { UColorPicker, UButton, UCol },
  setup: () => ({ args, slots: getSlotNames(UColorPicker.__name) }),
  template: `
    <UColorPicker v-bind="args" v-model="args.modelValue">
      ${args.slotTemplate || getSlotsFragment("")}
    </UColorPicker>
  `,
});

const EnumTemplate: StoryFn<UColorPickerArgs> = (args: UColorPickerArgs, { argTypes }) => ({
  components: { UCol, UColorPicker },
  setup: () => ({ args, argTypes, getArgs }),
  template: `
    <UCol>
      <UColorPicker
        v-for="option in argTypes?.[args.enum]?.options"
        v-bind="getArgs(args, option)"
        :key="option"
        v-model="args.modelValue"
      />
    </UCol>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const Sizes = EnumTemplate.bind({});
Sizes.args = { enum: "size" };
