import {
  getArgTypes,
  getSlotNames,
  getSlotsFragment,
  getDocsDescription,
} from "../../utils/storybook.ts";

import UInputMoney from "../../ui.form-input-money/UInputMoney.vue";
import UCol from "../../ui.container-col/UCol.vue";
import UIcon from "../../ui.image-icon/UIcon.vue";
import UButton from "../../ui.button/UButton.vue";

import type { Meta, StoryFn } from "@storybook/vue3";
import type { Props } from "../types.ts";

interface UInputMoneyArgs extends Props {
  slotTemplate?: string;
  enum: "labelAlign" | "size";
}

export default {
  id: "3030",
  title: "Form Inputs & Controls / Input Money",
  component: UInputMoney,
  args: {
    label: "Label",
  },
  argTypes: {
    ...getArgTypes(UInputMoney.__name),
    modelValue: { control: { type: "number" } },
  },
  parameters: {
    docs: {
      ...getDocsDescription(UInputMoney.__name),
    },
  },
} as Meta;

const DefaultTemplate: StoryFn<UInputMoneyArgs> = (args: UInputMoneyArgs) => ({
  components: { UInputMoney, UIcon, UButton },
  setup() {
    const slots = getSlotNames(UInputMoney.__name);

    return { args, slots };
  },
  template: `
    <UInputMoney
      v-bind="args"
      v-model="args.modelValue"
    >
      ${args.slotTemplate || getSlotsFragment("")}
    </UInputMoney>
  `,
});

const EnumVariantTemplate: StoryFn<UInputMoneyArgs> = (args: UInputMoneyArgs, { argTypes }) => ({
  components: { UInputMoney, UCol },
  setup() {
    return {
      args,
      options: argTypes?.[args.enum]?.options,
    };
  },
  template: `
    <UCol>
      <UInputMoney
        v-for="(option, index) in options"
        :key="index"
        v-bind="args"
        :[args.enum]="option"
        :label="option"
      />
    </UCol>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = { modelValue: 245000.42 };

export const Sizes = EnumVariantTemplate.bind({});
Sizes.args = { enum: "size" };

export const Symbol = DefaultTemplate.bind({});
Symbol.args = { symbol: "€" };

export const LabelAlign = EnumVariantTemplate.bind({});
LabelAlign.args = { enum: "labelAlign" };

export const Placeholder = DefaultTemplate.bind({});
Placeholder.args = { placeholder: "Placeholder" };

export const Error = DefaultTemplate.bind({});
Error.args = { error: "Some error." };

export const Description = DefaultTemplate.bind({});
Description.args = { description: "Some description." };

export const MinFractionDigits = DefaultTemplate.bind({});
MinFractionDigits.args = { minFractionDigits: 2, maxFractionDigits: 4 };

export const MaxFractionDigits = DefaultTemplate.bind({});
MaxFractionDigits.args = { maxFractionDigits: 4 };

export const DecimalSeparator = DefaultTemplate.bind({});
DecimalSeparator.args = { decimalSeparator: "." };

export const ThousandsSeparator = DefaultTemplate.bind({});
ThousandsSeparator.args = { thousandsSeparator: "-" };

export const PositiveOnly = DefaultTemplate.bind({});
PositiveOnly.args = { positiveOnly: true };

export const Prefix = DefaultTemplate.bind({});
Prefix.args = { prefix: "+" };

export const ReadOnly = DefaultTemplate.bind({});
ReadOnly.args = { readonly: true };

export const Disabled = DefaultTemplate.bind({});
Disabled.args = { disabled: true };

export const LeftIcon = DefaultTemplate.bind({});
LeftIcon.args = { leftIcon: "star" };

export const RightIcon = DefaultTemplate.bind({});
RightIcon.args = { rightIcon: "star" };

export const LeftSlot = DefaultTemplate.bind({});
LeftSlot.args = {
  slotTemplate: `
    <template #left>
      <UButton variant="thirdary" filled square label="Filter" class="rounded-r-none h-full" />
    </template>
  `,
};

export const RightSlot = DefaultTemplate.bind({});
RightSlot.args = {
  slotTemplate: `
    <template #right>
      <UButton variant="thirdary" filled square label="Filter" class="rounded-l-none" />
    </template>
  `,
};
