import {
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

export default {
  id: "3210",
  title: "Form Inputs & Controls / Label",
  component: ULabel,
  args: {
    label: "Email Address",
    description: "We'll never share your email with anyone else.",
  },
  argTypes: {
    ...getArgTypes(ULabel.__name),
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
  setup() {
    const slots = getSlotNames(ULabel.__name);

    return { args, slots };
  },
  template: `
    <ULabel v-bind="args">
      <UText v-bind="args">${getSlotsFragment(defaultTemplate)}</UText>
      ${args.slotTemplate ? args.slotTemplate : ""}
    </ULabel>
  `,
});

const EnumVariantTemplate: StoryFn<ULabelArgs> = (args: ULabelArgs, { argTypes }) => ({
  components: { ULabel, UCol, UText },
  setup() {
    function getText(value: string, name: string) {
      return name === "size" ? `This is ${value} size.` : `This is ${value} label placement.`;
    }

    let prefixedOptions;

    const enumArgType = argTypes?.[args.enum];

    if (enumArgType && "name" in enumArgType && "options" in enumArgType) {
      const { name, options } = enumArgType;

      prefixedOptions = options?.map((option: string) => getText(option, name));
    }

    return {
      args,
      options: argTypes?.[args.enum]?.options,
      prefixedOptions,
    };
  },
  template: `
    <UCol class="gap-10">
      <ULabel
        v-for="(option, index) in options"
        :key="index"
        v-bind="args"
        :[args.enum]="option"
      >
        <UText :[args.enum]="option">
          {{ prefixedOptions[index] }}
        </UText>
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

export const Interactive = DefaultTemplate.bind({});
Interactive.args = { interactive: true };
Interactive.parameters = {
  docs: {
    description: {
      story: "Make the label interactive (cursor pointer on hover).",
    },
  },
};

export const Centred = DefaultTemplate.bind({});
Centred.args = { centred: true };

export const Sizes = EnumVariantTemplate.bind({});
Sizes.args = { enum: "size" };

export const LabelPlacement = EnumVariantTemplate.bind({});
LabelPlacement.args = { enum: "align" };

export const SlotLabel = DefaultTemplate.bind({});
SlotLabel.args = {
  label: "Email Address",
  slotTemplate: `
    <template #label="{ label }">
      <UBadge :label="label" color="green" />
    </template>
  `,
};

export const SlotBottom = DefaultTemplate.bind({});
SlotBottom.args = {
  slotTemplate: `
    <template #bottom>
      <UBadge label="Your opinion is important for us!" color="green" class="max-w-fit" />
    </template>
  `,
};
