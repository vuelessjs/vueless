import {
  getArgs,
  getArgTypes,
  getSlotNames,
  getSlotsFragment,
  getDocsDescription,
} from "../../utils/storybook";

import UColorToggle from "../UColorToggle.vue";
import UCol from "../../ui.container-col/UCol.vue";
import UButton from "../../ui.button/UButton.vue";

import type { Meta, StoryFn } from "@storybook/vue3-vite";
import type { Props } from "../types";

interface UColorToggleArgs extends Props {
  slotTemplate?: string;
  enum: "size";
}

export default {
  id: "3190",
  title: "Form Inputs & Controls / Color Toggle",
  component: UColorToggle,
  args: {
    modelValue: "",
    colors: /*tw*/ {
      grayscale: "bg-grayscale",
      neutral: "bg-neutral-600 dark:bg-neutral-400",
      red: "bg-red-600 dark:bg-red-400",
      orange: "bg-orange-600 dark:bg-orange-400",
      amber: "bg-amber-600 dark:bg-amber-400",
      yellow: "bg-yellow-600 dark:bg-yellow-400",
      lime: "bg-lime-600 dark:bg-lime-400",
      green: "bg-green-600 dark:bg-green-400",
      emerald: "bg-emerald-600 dark:bg-emerald-400",
      teal: "bg-teal-600 dark:bg-teal-400",
      cyan: "bg-cyan-600 dark:bg-cyan-400",
      sky: "bg-sky-600 dark:bg-sky-400",
      blue: "bg-blue-600 dark:bg-blue-400",
      indigo: "bg-indigo-600 dark:bg-indigo-400",
      violet: "bg-violet-600 dark:bg-violet-400",
      purple: "bg-purple-600 dark:bg-purple-400",
      fuchsia: "bg-fuchsia-600 dark:bg-fuchsia-400",
      pink: "bg-pink-600 dark:bg-pink-400",
      rose: "bg-rose-600 dark:bg-rose-400",
    },
  },
  argTypes: {
    ...getArgTypes(UColorToggle.__name),
  },
  parameters: {
    docs: {
      ...getDocsDescription(UColorToggle.__name),
    },
  },
} as Meta;

const DefaultTemplate: StoryFn<UColorToggleArgs> = (args: UColorToggleArgs) => ({
  components: { UColorToggle, UButton, UCol },
  setup: () => ({ args, slots: getSlotNames(UColorToggle.__name) }),
  template: `
    <UColorToggle v-bind="args" v-model="args.modelValue">
      ${args.slotTemplate || getSlotsFragment("")}
    </UColorToggle>
  `,
});

const EnumTemplate: StoryFn<UColorToggleArgs> = (args: UColorToggleArgs, { argTypes }) => ({
  components: { UCol, UColorToggle },
  setup: () => ({ args, argTypes, getArgs }),
  template: `
    <UCol>
      <UColorToggle
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
