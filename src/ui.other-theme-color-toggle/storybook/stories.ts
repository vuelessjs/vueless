import {
  getArgs,
  getArgTypes,
  getSlotNames,
  getSlotsFragment,
  getDocsDescription,
} from "../../utils/storybook.ts";

import UThemeColorToggle from "../UThemeColorToggle.vue";
import UCol from "../../ui.container-col/UCol.vue";
import URow from "../../ui.container-row/URow.vue";
import UButton from "../../ui.button/UButton.vue";

import type { Meta, StoryFn } from "@storybook/vue3";
import type { Props } from "../types.ts";

interface UThemeColorToggleArgs extends Props {
  slotTemplate?: string;
  enum: "size";
}

export default {
  id: "100030",
  title: "Other / Theme Color Toggle",
  component: UThemeColorToggle,
  args: {
    primary: "",
    neutral: "",
    primaryColors: {
      grayscale: "bg-grayscale",
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
    neutralColors: {
      slate: "bg-slate-600",
      gray: "bg-gray-600",
      zinc: "bg-zinc-600",
      neutral: "bg-neutral-600",
      stone: "bg-stone-600",
    },
  },
  argTypes: {
    ...getArgTypes(UThemeColorToggle.__name),
  },
  parameters: {
    docs: {
      ...getDocsDescription(UThemeColorToggle.__name),
    },
  },
} as Meta;

const DefaultTemplate: StoryFn<UThemeColorToggleArgs> = (args: UThemeColorToggleArgs) => ({
  components: { UThemeColorToggle, UButton, UCol, URow },
  setup: () => ({ args, slots: getSlotNames(UThemeColorToggle.__name) }),
  template: `
    <UCol>
      <UThemeColorToggle v-bind="args" v-model:primary="args.primary" v-model:neutral="args.neutral">
        ${args.slotTemplate || getSlotsFragment("")}
      </UThemeColorToggle>

      <URow>
        <UButton label="Primary button" color="primary" />
        <UButton label="Neutral button" color="neutral" />
      </URow>
    </UCol>
  `,
});

const EnumTemplate: StoryFn<UThemeColorToggleArgs> = (
  args: UThemeColorToggleArgs,
  { argTypes },
) => ({
  components: { UCol, UThemeColorToggle },
  setup: () => ({ args, argTypes, getArgs }),
  template: `
    <UCol>
      <UThemeColorToggle
        v-for="option in argTypes?.[args.enum]?.options"
        v-bind="getArgs(args, option)"
        :key="option"
        v-model:primary="args.primary"
        v-model:neutral="args.neutral"
      />
    </UCol>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const Sizes = EnumTemplate.bind({});
Sizes.args = { enum: "size" };
