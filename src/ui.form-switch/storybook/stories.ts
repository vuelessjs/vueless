import {
  getArgs,
  getArgTypes,
  getSlotNames,
  getSlotsFragment,
  getDocsDescription,
} from "../../utils/storybook.ts";

import USwitch from "../../ui.form-switch/USwitch.vue";
import UIcon from "../../ui.image-icon/UIcon.vue";
import URow from "../../ui.container-row/URow.vue";
import UBadge from "../../ui.text-badge/UBadge.vue";

import type { Meta, StoryFn } from "@storybook/vue3";
import type { Props } from "../types.ts";

interface USwitchArgs extends Props {
  slotTemplate?: string;
  enum: "size" | "color" | "labelAlign";
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
    docs: {
      ...getDocsDescription(USwitch.__name),
    },
  },
} as Meta;

const DefaultTemplate: StoryFn<USwitchArgs> = (args: USwitchArgs) => ({
  components: { USwitch, UIcon, UBadge },
  setup: () => ({ args, slots: getSlotNames(USwitch.__name) }),
  template: `
    <USwitch v-bind="args" v-model="args.modelValue">
      ${args.slotTemplate || getSlotsFragment("")}
    </USwitch>
  `,
});

const EnumTemplate: StoryFn<USwitchArgs> = (args: USwitchArgs, { argTypes }) => ({
  components: { USwitch, URow },
  setup: () => ({ args, argTypes, getArgs }),
  template: `
    <URow :class="{ '!flex-col max-w-fit': args.enum === 'labelAlign' }">
      <USwitch
        v-for="option in argTypes?.[args.enum]?.options"
        v-bind="getArgs(args, option)"
        :key="option"
        v-model="args.modelValue"
      />
    </URow>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const Label = DefaultTemplate.bind({});
Label.args = { label: "Enable Notifications" };

export const Description = DefaultTemplate.bind({});
Description.args = {
  label: "Enable Dark Mode",
  description: "Switch to a darker color scheme to reduce eye strain.",
};

export const LabelPlacement = EnumTemplate.bind({});
LabelPlacement.args = { enum: "labelAlign", label: "{enumValue}" };

export const Sizes = EnumTemplate.bind({});
Sizes.args = { enum: "size", color: "warning", label: "{enumValue}" };

export const Colors = EnumTemplate.bind({});
Colors.args = { enum: "color", modelValue: true, label: "{enumValue}" };

export const ToggleLabel = DefaultTemplate.bind({});
ToggleLabel.args = { toggleLabel: true };

export const ToggleIcon = DefaultTemplate.bind({});
ToggleIcon.args = { toggleIcon: true, color: "warning" };

export const Disabled = DefaultTemplate.bind({});
Disabled.args = { disabled: true };

export const LabelSlot = DefaultTemplate.bind({});
LabelSlot.args = {
  label: "Enable Notifications",
  slotTemplate: `
    <template #label="{ label }">
      <UBadge :label="label" color="success" />
    </template>
  `,
};
