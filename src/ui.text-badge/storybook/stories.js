import { getArgTypes, getSlotNames, getSlotsFragment } from "../../utils/utilStorybook.js";

import UBadge from "../../ui.text-badge/UBadge.vue";
import UIcon from "../../ui.image-icon/UIcon.vue";
import URow from "../../ui.container-row/URow.vue";
import UCol from "../../ui.container-col/UCol.vue";

/**
 * The `UBadge` component. | [View on GitHub](https://github.com/vuelessjs/vueless/tree/main/src/ui.text-badge)
 */
export default {
  id: "4090",
  title: "Text & Content / Badge",
  component: UBadge,
  args: {
    label: "Badge",
  },
  argTypes: {
    ...getArgTypes(UBadge.name),
  },
};

const DefaultTemplate = (args) => ({
  components: { UBadge, UIcon },
  setup() {
    const slots = getSlotNames(UBadge.name);

    return { args, slots };
  },
  template: `
    <UBadge v-bind="args">
      ${args.slotTemplate || getSlotsFragment()}
    </UBadge>
  `,
});

const ColorsTemplate = (args, { argTypes } = {}) => ({
  components: { UBadge, URow, UCol },
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
        <UBadge
          v-for="(color, index) in colors"
          :key="index"
          v-bind="args"
          :color="color"
          :variant="variant"
          :label="color"
        />
      </URow>
    </UCol>
  `,
});

const EnumVariantTemplate = (args, { argTypes } = {}) => ({
  components: { UBadge, URow },
  setup() {
    function getText(value) {
      return `Badge ${value}`;
    }

    return { args, options: argTypes[args.enum].options, getText };
  },
  template: `
    <URow>
      <UBadge
        v-for="(option, index) in options"
        :key="index"
        v-bind="args"
        :[args.enum]="option"
        :label="getText(option)"
      />
    </URow>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const Variants = EnumVariantTemplate.bind({});
Variants.args = { enum: "variant" };

export const Sizes = EnumVariantTemplate.bind({});
Sizes.args = { enum: "size" };

export const Colors = ColorsTemplate.bind({});
Colors.args = {};

export const leftIcon = DefaultTemplate.bind({});
leftIcon.args = {
  leftIcon: "star",
};

export const rightIcon = DefaultTemplate.bind({});
rightIcon.args = {
  rightIcon: "star",
};

export const leftIconSlot = DefaultTemplate.bind({});
leftIconSlot.args = {
  slotTemplate: `
    <template #left-icon>
      <UIcon
        name="info"
        color="red"
      />
    </template>
  `,
};

export const rightIconSlot = DefaultTemplate.bind({});
rightIconSlot.args = {
  slotTemplate: `
    <template #right-icon>
      <UIcon
        name="info"
        color="red"
      />
    </template>
  `,
};

export const slotLeft = DefaultTemplate.bind({});
slotLeft.args = {
  slotTemplate: `
    <template #left>
      🤘
    </template>
  `,
};

export const slotRight = DefaultTemplate.bind({});
slotRight.args = {
  slotTemplate: `
    <template #right>
      🤘
    </template>
  `,
};