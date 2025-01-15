import { getArgTypes, getSlotNames, getSlotsFragment } from "../../utils/storybook.ts";

import UNumber from "../../ui.text-number/UNumber.vue";
import UIcon from "../../ui.image-icon/UIcon.vue";
import URow from "../../ui.container-row/URow.vue";
import UText from "../../ui.text-block/UText.vue";
import UBadge from "../../ui.text-badge/UBadge.vue";

import type { Meta, StoryFn } from "@storybook/vue3";
import type { Props } from "../types.ts";

interface UNumberArgs extends Props {
  slotTemplate?: string;
  enum: "color" | "size" | "sign";
}

export default {
  id: "120020",
  title: "Text & Content / Number",
  component: UNumber,
  args: {
    value: -14.24,
    sign: "auto",
  },
  argTypes: {
    ...getArgTypes(UNumber.__name),
  },
} as Meta;

const DefaultTemplate: StoryFn<UNumberArgs> = (args: UNumberArgs) => ({
  components: { UNumber, UIcon, UBadge },
  setup() {
    const slots = getSlotNames(UNumber.__name);

    return { args, slots };
  },
  template: `
    <UNumber v-bind="args">
      ${args.slotTemplate || getSlotsFragment("")}
    </UNumber>
  `,
});

const EnumVariantTemplate: StoryFn<UNumberArgs> = (args: UNumberArgs, { argTypes }) => ({
  components: { UNumber, URow, UText },
  setup() {
    return { args, options: argTypes?.[args.enum]?.options };
  },
  template: `
    <URow>
      <UNumber
        v-for="(option, index) in options"
        :key="index"
        v-bind="args"
        :[args.enum]="option"
        :class="args.enum === 'sign' ? 'border-green-500 border rounded-dynamic p-2' : ''"
      >
        <template #right v-if="args.enum === 'sign'">
          <UText size="lg">{{ option }}</UText>
        </template>
      </UNumber>
    </URow>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const Colors = EnumVariantTemplate.bind({});
Colors.args = {
  enum: "color",
  sign: "auto",
};

export const Sizes = EnumVariantTemplate.bind({});
Sizes.args = { enum: "size" };

export const Sign = EnumVariantTemplate.bind({});
Sign.args = { enum: "sign" };

export const MinFractionDigits4 = DefaultTemplate.bind({});
MinFractionDigits4.args = { minFractionDigits: 4, maxFractionDigits: 4 };

export const Slots: StoryFn<UNumberArgs> = (args) => ({
  components: { UNumber, UIcon, URow, UBadge },
  setup() {
    return { args };
  },
  template: `
    <URow>
      <UNumber v-bind="args">
        <template #left>
          <UIcon name="confirmation_number" color="green" />
        </template>
      </UNumber>

      <UNumber v-bind="args">
        <template #right>
          <UBadge label="Quantity" color="green" />
        </template>
      </UNumber>
    </URow>
  `,
});
