import {
  getArgTypes,
  getSlotNames,
  getSlotsFragment,
  getDocsDescription,
} from "../../utils/storybook.ts";

import UInputNumber from "../UInputNumber.vue";
import UCol from "../../ui.container-col/UCol.vue";
import UIcon from "../../ui.image-icon/UIcon.vue";
import UButton from "../../ui.button/UButton.vue";
import URow from "../../ui.container-row/URow.vue";
import UAvatar from "../../ui.image-avatar/UAvatar.vue";

import type { Meta, StoryFn } from "@storybook/vue3";
import type { Props } from "../types.ts";

interface UInputNumberArgs extends Props {
  slotTemplate?: string;
  enum: "labelAlign" | "size";
}

const argTypes = getArgTypes(UInputNumber.__name);

export default {
  id: "3030",
  title: "Form Inputs & Controls / Input Number",
  component: UInputNumber,
  args: {
    label: "Expected amount",
    modelValue: 245000.42,
  },
  argTypes: {
    ...argTypes,
    valueType: {
      ...argTypes?.valueType,
      options: (argTypes?.valueType?.table?.type?.summary as string)?.split(" | "),
      control: "select",
    },
  },
  parameters: {
    docs: {
      ...getDocsDescription(UInputNumber.__name),
    },
  },
} as Meta;

const DefaultTemplate: StoryFn<UInputNumberArgs> = (args: UInputNumberArgs) => ({
  components: { UInputNumber, UIcon, UButton },
  setup() {
    const slots = getSlotNames(UInputNumber.__name);

    return { args, slots };
  },
  template: `
    <UInputNumber
      v-bind="args"
      v-model="args.modelValue"
      class="max-w-96"
    >
      ${args.slotTemplate || getSlotsFragment("")}
    </UInputNumber>
  `,
});

const EnumVariantTemplate: StoryFn<UInputNumberArgs> = (args: UInputNumberArgs, { argTypes }) => ({
  components: { UInputNumber, UCol },
  setup() {
    let filteredOptions = argTypes?.[args.enum]?.options;

    if (args.enum === "labelAlign") {
      filteredOptions = argTypes?.[args.enum]?.options?.filter(
        (item) => item !== "right" && item !== "topWithDesc",
      );
    }

    return {
      args,
      filteredOptions,
    };
  },
  template: `
    <UCol>
      <UInputNumber
        v-for="(option, index) in filteredOptions"
        :key="index"
        :[args.enum]="option"
        label="Expected amount"
        :placeholder="option"
        class="max-w-96"
      />
    </UCol>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const Placeholder = DefaultTemplate.bind({});
Placeholder.args = { placeholder: "Enter amount in USD" };

export const Description = DefaultTemplate.bind({});
Description.args = { description: "Please enter the transaction amount." };

export const Error = DefaultTemplate.bind({});
Error.args = {
  modelValue: -245000.42,
  error: "Invalid amount. Please enter a positive number with up to two decimal places.",
};

export const ReadOnly = DefaultTemplate.bind({});
ReadOnly.args = { readonly: true };

export const Disabled = DefaultTemplate.bind({});
Disabled.args = { disabled: true };

export const Currency = DefaultTemplate.bind({});
Currency.args = { currency: "€" };

export const Sizes = EnumVariantTemplate.bind({});
Sizes.args = { enum: "size" };

export const LabelAlign = EnumVariantTemplate.bind({});
LabelAlign.args = { enum: "labelAlign" };

export const LimitFractionDigits = DefaultTemplate.bind({});
LimitFractionDigits.args = {
  minFractionDigits: 4,
  maxFractionDigits: 6,
  description: "You can enter from 4 to 6 decimal places.",
};
LimitFractionDigits.parameters = {
  docs: {
    description: {
      story:
        // eslint-disable-next-line vue/max-len
        "`minFractionDigits` and `maxFractionDigits` props determine the minimum/maximum number of digits to display after the decimal separator.",
    },
  },
};

export const DecimalSeparator = DefaultTemplate.bind({});
DecimalSeparator.args = { decimalSeparator: "." };
DecimalSeparator.parameters = {
  docs: {
    description: {
      story: "A symbol used to separate the integer part from the fractional part of a number.",
    },
  },
};

export const ThousandsSeparator = DefaultTemplate.bind({});
ThousandsSeparator.args = { thousandsSeparator: "-" };
ThousandsSeparator.parameters = {
  docs: {
    description: {
      story: "A symbol used to separate the thousand parts of a number.",
    },
  },
};

export const PositiveOnly = DefaultTemplate.bind({});
PositiveOnly.args = { positiveOnly: true };
PositiveOnly.parameters = {
  docs: {
    description: {
      story: "Allow only positive values.",
    },
  },
};

export const Prefix = DefaultTemplate.bind({});
Prefix.args = { prefix: "+" };
Prefix.parameters = {
  docs: {
    description: {
      story: "Prefix to display before input value.",
    },
  },
};

export const IconProps: StoryFn<UInputNumberArgs> = (args) => ({
  components: { UInputNumber, URow },
  setup() {
    return { args };
  },
  template: `
    <URow>
      <UInputNumber
        left-icon="payments"
        label="Annual payment"
        placeholder="Enter your annual payment"
      />
      <UInputNumber
        right-icon="currency_exchange"
        label="Total amount"
        currency="£"
        placeholder="Enter the amount you want to exchange"
      />
    </URow>
  `,
});

export const Slots: StoryFn<UInputNumberArgs> = (args) => ({
  components: { UInputNumber, URow, UButton, UAvatar },
  setup() {
    return { args };
  },
  template: `
    <URow>
      <UInputNumber v-bind="args">
        <template #left>
          <UAvatar />
        </template>
      </UInputNumber>

      <UInputNumber v-bind="args" :config="{ moneyInput: { rightSlot: 'pr-0' } }">
        <template #right>
          <UButton label="Calculate" size="sm" class="rounded-l-none h-full" />
        </template>
      </UInputNumber>
    </URow>
  `,
});
