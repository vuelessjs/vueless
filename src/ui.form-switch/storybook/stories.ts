import {
  getArgTypes,
  getSlotNames,
  getSlotsFragment,
  getDocsDescription,
} from "../../utils/storybook.ts";

import USwitch from "../../ui.form-switch/USwitch.vue";
import UIcon from "../../ui.image-icon/UIcon.vue";
import URow from "../../ui.container-row/URow.vue";

import type { Meta, StoryFn } from "@storybook/vue3";
import type { USwitchProps } from "../types.ts";

interface USwitchArgs extends USwitchProps {
  slotTemplate?: string;
  enum: "size" | "color";
}

export default {
  id: "3130",
  title: "Form Inputs & Controls / Switch",
  component: USwitch,
  args: {
    modelValue: false,
  },
  argTypes: {
    ...getArgTypes(USwitch.__name),
  },
  parameters: {
    ...getDocsDescription(USwitch.__name),
  },
} as Meta;

const DefaultTemplate: StoryFn<USwitchArgs> = (args: USwitchArgs) => ({
  components: { USwitch, UIcon },
  setup() {
    const slots = getSlotNames(USwitch.__name);

    return { args, slots };
  },
  template: `
    <USwitch v-bind="args" v-model="args.modelValue">
      ${args.slotTemplate || getSlotsFragment("")}
    </USwitch>
  `,
});

const EnumVariantTemplate: StoryFn<USwitchArgs> = (args: USwitchArgs, { argTypes }) => ({
  components: { USwitch, URow },
  setup() {
    return {
      args,
      options: argTypes?.[args.enum]?.options,
    };
  },
  template: `
    <URow>
      <USwitch
        v-for="(option, index) in options"
        :key="index"
        v-bind="args"
        v-model="args.modelValue"
        :[args.enum]="option"
        :label="option"
      />
    </URow>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const Label = DefaultTemplate.bind({});
Label.args = { label: "Some label" };

export const Description = DefaultTemplate.bind({});
Description.args = { label: "Label", description: "Some description" };

export const Colors = EnumVariantTemplate.bind({});
Colors.args = { enum: "color", modelValue: true };

export const ToggleLabel = DefaultTemplate.bind({});
ToggleLabel.args = { toggleLabel: true };

export const Sizes = EnumVariantTemplate.bind({});
Sizes.args = { enum: "size", color: "yellow" };

export const Icon = DefaultTemplate.bind({});
Icon.args = { toggleIcon: true, color: "yellow" };

export const Disabled = DefaultTemplate.bind({});
Disabled.args = { disabled: true };
