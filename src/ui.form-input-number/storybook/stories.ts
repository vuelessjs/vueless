import { ref } from "vue";
import {
  getArgs,
  getArgTypes,
  getSlotNames,
  getSlotsFragment,
  getDocsDescription,
} from "../../utils/storybook";

import UInputNumber from "../UInputNumber.vue";
import UCol from "../../ui.container-col/UCol.vue";
import UIcon from "../../ui.image-icon/UIcon.vue";
import UButton from "../../ui.button/UButton.vue";
import URow from "../../ui.container-row/URow.vue";
import UDropdownButton from "../../ui.dropdown-button/UDropdownButton.vue";
import UText from "../../ui.text-block/UText.vue";

import type { Meta, StoryFn } from "@storybook/vue3-vite";
import type { Props } from "../types";

interface UInputNumberArgs extends Props {
  slotTemplate?: string;
  enum: "labelAlign" | "size";
  wrapperClass?: string;
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
  setup: () => ({ args, slots: getSlotNames(UInputNumber.__name) }),
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

const EnumTemplate: StoryFn<UInputNumberArgs> = (args: UInputNumberArgs, { argTypes }) => ({
  components: { UInputNumber, UCol },
  setup: () => ({ args, argTypes, getArgs }),
  template: `
    <UCol :class="args.wrapperClass">
      <UInputNumber
        v-for="option in argTypes?.[args.enum]?.options"
        v-bind="getArgs(args, option)"
        :key="option"
        v-model="args.modelValue"
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

export const Error: StoryFn<UInputNumberArgs> = (args: UInputNumberArgs) => ({
  components: { UInputNumber },
  setup: () => ({ args, modelValue: ref(null) }),
  template: `
    <UInputNumber
      v-bind="args"
      v-model="modelValue"
      class="!max-w-96"
      :error="modelValue ? '' : 'Invalid amount.'"
    />
  `,
});

export const ReadOnly = DefaultTemplate.bind({});
ReadOnly.args = { readonly: true };

export const Disabled = DefaultTemplate.bind({});
Disabled.args = { disabled: true };

export const Currency = DefaultTemplate.bind({});
Currency.args = { currency: "€" };

export const Sizes = EnumTemplate.bind({});
Sizes.args = { enum: "size", label: "{enumValue}" };

export const LabelAlign = EnumTemplate.bind({});
LabelAlign.args = {
  enum: "labelAlign",
  label: "{enumValue}",
  description: "Please enter the transaction amount.",
  wrapperClass: "gap-16",
};

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
ThousandsSeparator.args = { thousandsSeparator: "." };
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
  components: { UInputNumber, URow, UButton, UDropdownButton, UText },
  setup() {
    const currencies = [
      { label: "USD", value: "usd" },
      { label: "EUR", value: "eur" },
      { label: "UAH", value: "uah" },
    ];

    const currency = ref("usd");

    return { args, currency, currencies };
  },
  template: `
    <URow class="gap-4">
      <UInputNumber
        label="Left slot"
        placeholder="Enter discount amount"
        :config="{ numberInput: { wrapper: 'pl-0' } }"
      >
        <template #left>
          <UDropdownButton
            v-model="currency"
            :options="currencies"
            size="sm"
            variant="soft"
            class="rounded-r-none h-[49px]"
          />
        </template>
      </UInputNumber>

      <UInputNumber
        label="Right slot"
        placeholder="Enter your annual payment"
      >
        <template #right>
          <UText label="%, per year" variant="lifted" size="sm" :wrap="false" />
        </template>
      </UInputNumber>
    </URow>
  `,
});
Slots.parameters = {
  docs: {
    story: {
      height: "250px",
    },
  },
};
