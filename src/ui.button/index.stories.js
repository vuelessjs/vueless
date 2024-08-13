import { getArgTypes, getSlotNames, getSlotsFragment } from "../service.storybook";

import UButton from "../ui.button";
import UIcon from "../ui.image-icon";
import URow from "../ui.container-row";
import UGroup from "../ui.container-group";

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
  components: { UButton, URow, UGroup },
  setup() {
    return { args, options: argTypes[args.enum].options };
  },
  template: `
    <UGroup>
      <URow>
        <UButton
          v-for="(option, index) in options"
          v-bind="args"
          :[args.enum]="option"
          :label="option"
          :key="index"
        />
      </URow>
    </UGroup>
  `,
});

const ColorTemplate = (args, { argTypes } = {}) => ({
  components: { UButton, URow, UGroup },
  setup() {
    return {
      args,
      variants: argTypes.variant.options,
      colors: argTypes.color.options,
    };
  },
  template: `
    <UGroup>
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
    </UGroup>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const variants = EnumVariantTemplate.bind({});
variants.args = { enum: "variant" };

export const sizes = EnumVariantTemplate.bind({});
sizes.args = { enum: "size" };

export const pilled = EnumVariantTemplate.bind({});
pilled.args = { enum: "variant", pill: true };

export const disabled = EnumVariantTemplate.bind({});
disabled.args = { enum: "variant", disabled: true };

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
