import { getArgTypes, getSlotNames, allSlotsFragment } from "../service.storybook";

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
  components: { UBadge },
  setup() {
    const slots = getSlotNames(UBadge.name);

    return { args, slots };
  },
  template: `
    <UBadge v-bind="args">
      ${allSlotsFragment}
    </UBadge>
  `,
});

const SlotTemplate = (args) => ({
  components: { UBadge, UIcon },
  setup() {
    return { args };
  },
  template: `
    <UBadge v-bind="args">
      ${args.slotTemplate}
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

const SizesTemplate = (args, { argTypes } = {}) => ({
  components: { UBadge, URow },
  setup() {
    return {
      args,
      sizes: argTypes.size.options,
    };
  },
  template: `
    <URow>
      <UBadge
        v-for="(size, index) in sizes"
        v-bind="args"
        :size="size"
        :label="getText(size)"
        :key="index"
      />
    </URow>
  `,
  methods: {
    getText(value) {
      return `badge ${value}`;
    },
  },
});

const WeightTemplate = (args, { argTypes } = {}) => ({
  components: { UBadge, URow },
  setup() {
    return {
      args,
      weights: argTypes.weight.options,
    };
  },
  template: `
    <URow>
      <UBadge
        v-for="(weight, index) in weights"
        v-bind="args"
        :weight="weight"
        :label="getText(weight)"
        :key="index"
      />
    </URow>
  `,
  methods: {
    getText(value) {
      return `badge ${value}`;
    },
  },
});

const VariantsTemplate = (args, { argTypes } = {}) => ({
  components: { UBadge, URow },
  setup() {
    return {
      args,
      variants: argTypes.variant.options,
    };
  },
  template: `
    <URow>
      <UBadge
        v-for="(variant, index) in variants"
        v-bind="args"
        :variant="variant"
        :label="getText(variant)"
        :key="index"
      />
    </URow>
  `,
  methods: {
    getText(value) {
      return `badge ${value}`;
    },
  },
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const Variants = VariantsTemplate.bind({});
Variants.args = {};

export const Sizes = SizesTemplate.bind({});
Sizes.args = {};

export const Weight = WeightTemplate.bind({});
Weight.args = {};

export const Colors = ColorsTemplate.bind({});
Colors.args = {};

export const slotRight = SlotTemplate.bind({});
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

export const slotLeft = SlotTemplate.bind({});
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
