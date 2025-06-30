import {
  getArgs,
  getArgTypes,
  getSlotNames,
  getSlotsFragment,
  getDocsDescription,
  getEnumVariantDescription,
} from "../../utils/storybook.ts";

import UInputOTP from "../UInputOTP.vue";
import URow from "../../ui.container-row/URow.vue";

import type { Meta, StoryFn } from "@storybook/vue3";
import type { Props } from "../types.ts";

interface UInputOTPArgs extends Props {
  slotTemplate?: string;
  enum: "size";
}

/**
 * The `UInputOTP` component. | [View on GitHub](https://github.com/vuelessjs/vueless/tree/main/src/ui.form-input-otp)
 */
export default {
  id: "3081",
  title: "Form Inputs & Controls / Input OTP",
  component: UInputOTP,
  argTypes: {
    ...getArgTypes(UInputOTP.__name),
  },
  parameters: {
    docs: {
      ...getDocsDescription(UInputOTP.__name),
    },
  },
} as Meta;

const DefaultTemplate: StoryFn<UInputOTPArgs> = (args: UInputOTPArgs) => ({
  components: { UInputOTP },
  setup() {
    const slots = getSlotNames(UInputOTP.__name);

    return { args, slots };
  },
  template: `
    <UInputOTP v-bind="args">
      ${getSlotsFragment("")}
    </UInputOTP>
  `,
});

const EnumTemplate: StoryFn<UInputOTPArgs> = (args: UInputOTPArgs, { argTypes }) => ({
  components: { UInputOTP, URow },
  setup() {
    return { args, argTypes, getArgs };
  },
  template: `
    <URow>
      <UInputOTP
        v-for="option in argTypes?.[args.enum]?.options"
        v-bind="getArgs(args, option)"
        :key="option"
        :label="option"
      />
    </URow>
  `,
});

const VariantsTemplate: StoryFn<UInputOTPArgs> = (args: UInputOTPArgs) => ({
  components: { UInputOTP, URow },
  setup() {
    return { args };
  },
  template: `
    <URow>
      <UInputOTP v-bind="args" label="Default" />
      <UInputOTP v-bind="args" label="Masked" mask />
      <UInputOTP v-bind="args" label="Integer Only" integer-only />
      <UInputOTP v-bind="args" label="6 Digits" :length="6" />
    </URow>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {
  label: "Enter OTP",
  length: 4,
};

export const Sizes = EnumTemplate.bind({});
Sizes.args = { enum: "size" };
Sizes.parameters = getEnumVariantDescription();

export const Variants = VariantsTemplate.bind({});
Variants.args = {};

export const Masked = DefaultTemplate.bind({});
Masked.args = {
  label: "Enter OTP (Masked)",
  mask: true,
};

export const IntegerOnly = DefaultTemplate.bind({});
IntegerOnly.args = {
  label: "Enter OTP (Numbers Only)",
  integerOnly: true,
};

export const SixDigits = DefaultTemplate.bind({});
SixDigits.args = {
  label: "Enter 6-digit OTP",
  length: 6,
};
