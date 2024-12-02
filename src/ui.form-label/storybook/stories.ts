import { getArgTypes, getSlotNames, getSlotsFragment } from "../../utils/storybook.ts";

import ULabel from "../../ui.form-label/ULabel.vue";
import UCol from "../../ui.container-col/UCol.vue";
import UText from "../../ui.text-block/UText.vue";
import UIcon from "../../ui.image-icon/UIcon.vue";

import type { Meta, StoryFn } from "@storybook/vue3";
import type { ULabelProps } from "../types.ts";

interface ULabelArgs extends ULabelProps {
  slotTemplate?: string;
  enum: "align" | "size";
}

/**
 * The `ULabel` component. | [View on GitHub](https://github.com/vuelessjs/vueless/tree/main/src/ui.form-label)
 */
export default {
  id: "3240",
  title: "Form Inputs & Controls / Label",
  component: ULabel,
  args: {
    label: "Label",
    description: "Description",
  },
  argTypes: {
    ...getArgTypes(ULabel.__name),
  },
} as Meta;

const defaultTemplate = "This is plain text";

const DefaultTemplate: StoryFn<ULabelArgs> = (args: ULabelArgs) => ({
  components: { ULabel, UText, UIcon },
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
    <UCol>
      <ULabel
        v-for="(option, index) in options"
        :key="index"
        v-bind="args"
        :[args.enum]="option"
        class="border border-gray-200 rounded p-4"
      >
        <UText :[args.enum]="option">
          {{ prefixedOptions[index] }}
        </UText>
      </ULabel>
    </UCol>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const Sizes = EnumVariantTemplate.bind({});
Sizes.args = { enum: "size" };

export const LabelPlacement = EnumVariantTemplate.bind({});
LabelPlacement.args = { enum: "align" };

export const Error = DefaultTemplate.bind({});
Error.args = { error: "Error description" };

export const Disabled = DefaultTemplate.bind({});
Disabled.args = { disabled: true };

export const SlotFooter = DefaultTemplate.bind({});
SlotFooter.args = {
  slotTemplate: `
    <template #footer>
      <UIcon name="star" color="green" />
    </template>
  `,
};
