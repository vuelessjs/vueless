import { getArgTypes, getSlotNames, allSlotsFragment } from "../service.storybook";

import UButton from "../ui.button";
import UIcon from "../ui.image-icon";
import URow from "../ui.container-row";
import UCol from "../ui.container-col";

/**
 * The `UButton` component. | [View on GitHub](https://github.com/vuelessjs/vueless/tree/main/src/ui.button)
 */
export default {
  id: "1010",
  title: "Buttons & Links / Button",
  component: UButton,
  args: {
    label: "Button",
  },
  argTypes: {
    ...getArgTypes(UButton.name),
  },
};

const DefaultTemplate = (args) => ({
  components: { UButton, UIcon },
  setup() {
    const slots = getSlotNames(UButton.name);

    return { args, slots };
  },
  template: `
    <UButton v-bind="args">
      ${args.slotTemplate || allSlotsFragment}
    </UButton>
  `,
});

const VariantsTemplate = (args, { argTypes } = {}) => ({
  components: { UButton, URow },
  setup() {
    return {
      args,
      variants: argTypes.variant.options,
    };
  },
  template: `
    <URow>
      <UButton
        v-for="(variant, index) in variants"
        v-bind="args"
        :variant="variant"
        :label="variant"
        :key="index"
      />
    </URow>
  `,
});

const SizesTemplate = (args, { argTypes } = {}) => ({
  components: { UButton, URow },
  setup() {
    return {
      args,
      sizes: argTypes.size.options,
    };
  },
  template: `
    <URow>
      <UButton
        v-for="(size, index) in sizes"
        v-bind="args"
        :size="size"
        :label="size"
        :key="index"
      />
    </URow>
  `,
});

const ColorTemplate = (args, { argTypes } = {}) => ({
  components: { UButton, URow, UCol },
  setup() {
    return {
      args,
      variants: argTypes.variant.options,
      colors: argTypes.color.options,
    };
  },
  template: `
    <UCol>
      <URow v-for="(variant, index) in variants" :key="index">
        <UButton
          v-for="(color, index) in colors"
          v-bind="args"
          :variant="variant"
          :color="color"
          :label="color"
          :key="index"
        />
      </URow>
    </UCol>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const variants = VariantsTemplate.bind({});
variants.args = {};

export const sizes = SizesTemplate.bind({});
sizes.args = {};

export const pilled = VariantsTemplate.bind({});
pilled.args = { pill: true };

export const disabled = VariantsTemplate.bind({});
disabled.args = { disabled: true };

export const noRing = DefaultTemplate.bind({});
noRing.args = { noRing: true };

export const colors = ColorTemplate.bind({});
colors.args = {};

export const iconLeft = DefaultTemplate.bind({});
iconLeft.args = {
  iconLeft: "star",
};

export const iconRight = DefaultTemplate.bind({});
iconRight.args = {
  iconRight: "star",
};

export const slotDefault = DefaultTemplate.bind({});
slotDefault.args = {
  slotTemplate: `
    <template #default>
      🤘🤘🤘
    </template>
  `,
};

export const iconLeftSlot = DefaultTemplate.bind({});
iconLeftSlot.args = {
  slotTemplate: `
    <template #icon-left>
      <UIcon
        name="star"
        color="green"
      />
    </template>
  `,
};

export const iconRightSlot = DefaultTemplate.bind({});
iconRightSlot.args = {
  slotTemplate: `
    <template #icon-right>
      <UIcon
        name="star"
        color="green"
      />
    </template>
  `,
};

export const leftSlot = DefaultTemplate.bind({});
leftSlot.args = {
  slotTemplate: `
    <template #left>
      <UIcon
        name="archive"
        color="red"
      />
    </template>
  `,
};

export const rightSlot = DefaultTemplate.bind({});
rightSlot.args = {
  slotTemplate: `
    <template #right>
      <UIcon
        name="archive"
        color="red"
      />
    </template>
  `,
};
