import { getArgTypes, getSlotNames } from "../service.storybook";

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
      <template v-for="(slot, index) of slots" :key="index" v-slot:[slot]>
        <template v-if="args[slot]">{{ args[slot] }}</template>
      </template>
    </UButton>
  `,
});

const SlotTemplate = (args) => ({
  components: { UButton, UIcon },
  setup() {
    return { args };
  },
  template: `
    <UButton v-bind="args">
      ${args.slotTemplate || ""}
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

export const variants = VariantsTemplate.bind({});
variants.args = {};

export const sizes = SizesTemplate.bind({});
sizes.args = {};

export const pilled = VariantsTemplate.bind({});
pilled.args = { pill: true };

export const disabled = VariantsTemplate.bind({});
disabled.args = { disabled: true };

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

export const slotDefault = SlotTemplate.bind({});
slotDefault.args = {
  slotTemplate: `
    <template #default>
      🤘🤘🤘
    </template>
  `,
};

export const iconLeftSlot = SlotTemplate.bind({});
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

export const iconRightSlot = SlotTemplate.bind({});
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
