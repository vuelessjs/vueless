import {
  getArgs,
  getArgTypes,
  getSlotNames,
  getSlotsFragment,
  getDocsDescription,
} from "../../utils/storybook.ts";

import ULabel from "../../ui.form-label/ULabel.vue";
import UCol from "../../ui.container-col/UCol.vue";
import UText from "../../ui.text-block/UText.vue";
import UIcon from "../../ui.image-icon/UIcon.vue";
import UBadge from "../../ui.text-badge/UBadge.vue";

import type { Meta, StoryFn } from "@storybook/vue3";
import type { Props } from "../types.ts";

interface ULabelArgs extends Props {
  slotTemplate?: string;
  enum: "align" | "size";
}

const argTypes = getArgTypes(ULabel.__name);

export default {
  id: "3210",
  title: "Form Inputs & Controls / Label",
  component: ULabel,
  args: {
    label: "Email Address",
    description: "We'll never share your email with anyone else.",
  },
  argTypes: {
    ...argTypes,
    align: {
      ...argTypes?.align,
      options: (argTypes?.align?.table?.type?.summary as string)
        ?.split(" | ")
        ?.filter((option) => option !== "topInside"),
    },
  },
  parameters: {
    docs: {
      ...getDocsDescription(ULabel.__name),
    },
  },
} as Meta;

const defaultTemplate = "johndoe@example.com";

const DefaultTemplate: StoryFn<ULabelArgs> = (args: ULabelArgs) => ({
  components: { ULabel, UText, UIcon, UBadge },
  setup: () => ({ args, slots: getSlotNames(ULabel.__name) }),
  template: `
    <ULabel v-bind="args">
      <UText v-bind="args">${getSlotsFragment(defaultTemplate)}</UText>
      ${args.slotTemplate ? args.slotTemplate : ""}
    </ULabel>
  `,
});

const EnumTemplate: StoryFn<ULabelArgs> = (args: ULabelArgs, { argTypes }) => ({
  components: { ULabel, UCol, UText },
  setup: () => ({ args, argTypes, getArgs }),
  template: `
    <UCol class="gap-10">
      <ULabel
        v-for="option in argTypes?.[args.enum]?.options"
        v-bind="getArgs(args, option)"
        :key="option"
      >
        <UText :[args.enum]="option">{{ option }}</UText>
      </ULabel>
    </UCol>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = { description: "" };

export const Description = DefaultTemplate.bind({});
Description.args = {};

export const Error = DefaultTemplate.bind({});
Error.args = { error: "Please enter a valid email address." };

export const Disabled = DefaultTemplate.bind({});
Disabled.args = { disabled: true };

export const For = DefaultTemplate.bind({});
For.args = {
  for: "input-id",
  slotTemplate: `
    <template #default>
      <input class="px-4 py-2 text-sm text-black rounded-small" id="input-id" />
    </template>
  `,
};
For.parameters = {
  docs: {
    description: {
      story: "Make the label interactive (cursor pointer on hover) and bind input to it.",
    },
  },
};

export const Centred = DefaultTemplate.bind({});
Centred.args = { centred: true };

export const Sizes = EnumTemplate.bind({});
Sizes.args = { enum: "size" };

export const LabelAlign = EnumTemplate.bind({});
LabelAlign.args = { enum: "align" };

export const LabelSlot = DefaultTemplate.bind({});
LabelSlot.args = {
  label: "Email Address",
  slotTemplate: `
    <template #label="{ label }">
      <UBadge :label="label" color="success" />
    </template>
  `,
};

export const BottomSlot = DefaultTemplate.bind({});
BottomSlot.args = {
  slotTemplate: `
    <template #bottom>
      <UBadge label="Your opinion is important for us!" color="success" class="max-w-fit" />
    </template>
  `,
};
