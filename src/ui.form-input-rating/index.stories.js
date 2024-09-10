import { getArgTypes, getSlotNames, getSlotsFragment } from "../utils/utilsStorybook";

import UInputRating from "../ui.form-input-rating";
import URow from "../ui.container-row";

/**
 * The `UInputRating` component. | [View on GitHub](https://github.com/vuelessjs/vueless/tree/main/src/ui.form-input-rating)
 */
export default {
  id: "3060",
  title: "Form Inputs & Controls / Input Rating",
  component: UInputRating,
  args: {
    modelValue: 2,
    label: "Label",
  },
  argTypes: {
    ...getArgTypes(UInputRating.name),
  },
};

const DefaultTemplate = (args) => ({
  components: { UInputRating },
  setup() {
    const slots = getSlotNames(UInputRating.name);

    return { args, slots };
  },
  template: `
    <UInputRating
      v-bind="args"
      v-model="args.modelValue"
    >
      ${args.slotTemplate || getSlotsFragment()}
    </UInputRating>
  `,
});

const EnumVariantTemplate = (args, { argTypes } = {}) => ({
  components: { UInputRating, URow },
  setup() {
    return {
      args,
      options: argTypes[args.enum].options,
    };
  },
  template: `
    <URow gap="2xl">
      <UInputRating
        v-for="(option, index) in options"
        :key="index"
        v-bind="args"
        v-model="args.modelValue"
        :[args.enum]="option"
      />
    </URow>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const sizes = EnumVariantTemplate.bind({});
sizes.args = { enum: "size" };

export const starAmount = DefaultTemplate.bind({});
starAmount.args = { value: 4, stars: 7 };

export const selectable = DefaultTemplate.bind({});
selectable.args = { selectable: true };

export const description = DefaultTemplate.bind({});
description.args = { description: "Some description" };

export const error = DefaultTemplate.bind({});
error.args = { error: "Some error" };

export const withCounter = DefaultTemplate.bind({});
withCounter.args = { counter: true };

export const withTotal = DefaultTemplate.bind({});
withTotal.args = { total: 250 };

export const slotCounter = DefaultTemplate.bind({});
slotCounter.args = {
  slotTemplate: `
    <template #counter="{counter}">
      Rating: {{counter}}
    </template>
  `,
};

export const slotTotal = DefaultTemplate.bind({});
slotTotal.args = {
  total: 250,
  slotTemplate: `
    <template #total="{total}">
      ({{total}}) reviews
    </template>
  `,
};
