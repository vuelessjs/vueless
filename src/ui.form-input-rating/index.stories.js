import { getArgTypes, getSlotNames } from "vueless/service.storybook";

import UInputRating from "vueless/ui.form-input-rating";
import URow from "vueless/ui.container-row";

export default {
  title: "Form Inputs & Controls / Input Rating",
  component: UInputRating,
  args: {
    label: "Label",
    value: 2,
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
      v-model="args.value"
    >
      <template v-for="(slot, index) of slots" :key="index" v-slot:[slot]>
        <template v-if="args[slot]">{{ args[slot] }}</template>
      </template>

    </UInputRating>
  `,
});

const SlotTemplate = (args) => ({
  components: { UInputRating },
  setup() {
    return { args };
  },
  template: `
    <UInputRating
      v-bind="args"
      v-model="args.value"
    >
      ${args.slotTemplate}
    </UInputRating>
  `,
});

const SizesTemplate = (args, { argTypes }) => ({
  components: { UInputRating, URow },
  setup() {
    return {
      args,
      sizes: argTypes.size.options,
    };
  },
  template: `
    <URow>
      <UInputRating
        v-for="(size, index) in sizes"
        :size="size"
        :key="index"
        v-bind="args"
      />
    </URow>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const sizes = SizesTemplate.bind({});
sizes.args = {};

export const selectable = DefaultTemplate.bind({});
selectable.args = { selectable: true };

export const starsNumber = DefaultTemplate.bind({});
starsNumber.args = { value: 4, starsNumber: 7 };

export const error = DefaultTemplate.bind({});
error.args = { error: "some error" };

export const withoutCounter = DefaultTemplate.bind({});
withoutCounter.args = { withCounter: false };

export const slotCounter = SlotTemplate.bind({});
slotCounter.args = {
  slotTemplate: `
    <template #counter>
      some counter
    </template>
  `,
};

export const slotRight = SlotTemplate.bind({});
slotRight.args = {
  slotTemplate: `
    <template #right>
      🤘🤘🤘
    </template>
  `,
};
