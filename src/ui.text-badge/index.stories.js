import { getArgTypes, getSlotNames, getSlotsFragment } from "../service.storybook";

import UBadge from "../ui.text-badge";
import UIcon from "../ui.image-icon";
import URow from "../ui.container-row";
import UGroup from "../ui.container-group";

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
  components: { UBadge, URow, UGroup },
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
        <UBadge
          v-for="(color, index) in colors"
          v-bind="args"
          :color="color"
          :variant="variant"
          :label="color"
          :key="index"
        />
      </URow>
    </UGroup>
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
        v-bind="args"
        :[args.enum]="option"
        :label="getText(option)"
        :key="index"
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

export const Weight = EnumVariantTemplate.bind({});
Weight.args = { enum: "weight" };

export const Colors = ColorsTemplate.bind({});
Colors.args = {};

export const slotRight = DefaultTemplate.bind({});
slotRight.args = {
  slotTemplate: `
    <template #right>
      <UIcon
        tooltip="tooltip text"
        name="info"
        size="xs"
      />
    </template>
  `,
};

export const slotLeft = DefaultTemplate.bind({});
slotLeft.args = {
  slotTemplate: `
    <template #left>
      <UIcon
        tooltip="tooltip text"
        name="info"
        size="xs"
      />
    </template>
  `,
};
