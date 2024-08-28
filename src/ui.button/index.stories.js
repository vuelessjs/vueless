import { getArgTypes, getSlotNames, getSlotsFragment } from "../service.storybook";

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
      ${args.slotTemplate || getSlotsFragment()}
    </UButton>
  `,
});

const EnumVariantTemplate = (args, { argTypes } = {}) => ({
  components: { UButton, URow, UCol },
  setup() {
    return { args, options: argTypes[args.enum].options };
  },
  template: `
    <UCol>
      <URow>
        <UButton
          v-for="(option, index) in options"
          :key="index"
          v-bind="args"
          :[args.enum]="option"
          :label="option"
        />
      </URow>
    </UCol>
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

export const variants = EnumVariantTemplate.bind({});
variants.args = { enum: "variant" };

export const sizes = EnumVariantTemplate.bind({});
sizes.args = { enum: "size" };

export const round = EnumVariantTemplate.bind({});
round.args = { enum: "variant", round: true };

export const disabled = EnumVariantTemplate.bind({});
disabled.args = { enum: "variant", disabled: true };

export const noRing = DefaultTemplate.bind({});
noRing.args = { noRing: true };

export const colors = ColorTemplate.bind({});
colors.args = {};

export const leftIcon = DefaultTemplate.bind({});
leftIcon.args = {
  leftIcon: "star",
};

export const rightIcon = DefaultTemplate.bind({});
rightIcon.args = {
  rightIcon: "star",
};

export const slotDefault = DefaultTemplate.bind({});
slotDefault.args = {
  slotTemplate: `
    <template #default>
      🤘🤘🤘
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
        size="sm"
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
        size="sm"
      />
    </template>
  `,
};
