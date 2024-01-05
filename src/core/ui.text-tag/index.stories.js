import UTag from "vueless/ui.text-tag";
import URow from "vueless/ui.container-row";

import { getArgTypes, getSlotNames } from "vueless/service.storybook";

export default {
  title: "Text & Content / Tag",
  component: UTag,
  args: {
    text: "Tag",
  },
  argTypes: {
    ...getArgTypes(UTag.name),
  },
};

const DefaultTemplate = (args) => ({
  components: { UTag },
  setup() {
    const slots = getSlotNames(UTag.name);

    return { args, slots };
  },
  template: `
    <UTag v-bind="args">
      <template v-for="(slot, index) of slots" :key="index" v-slot:[slot]>
        <template v-if="args[slot]">{{ args[slot] }}</template>
      </template>
    </UTag>
  `,
});

const ColorsTemplate = (args, { argTypes }) => ({
  components: { UTag, URow },
  setup() {
    return {
      args,
      colors: argTypes.color.options,
    };
  },
  template: `
    <URow>
      <UTag
        v-for="(color, index) in colors"
        :color="color"
        :text="color"
        v-bind="args"
        :key="index"
      />
    </URow>
  `,
});

const SizesTemplate = (args, { argTypes }) => ({
  components: { UTag, URow },
  setup() {
    return {
      args,
      sizes: argTypes.size.options,
    };
  },
  template: `
    <URow>
      <UTag
        v-for="(size, index) in sizes"
        :size="size"
        :text="getText(size)"
        v-bind="args"
        :key="index"
      />
    </URow>
  `,
  methods: {
    getText(value) {
      return `Tag ${value}`;
    },
  },
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const Colors = ColorsTemplate.bind({});
Colors.args = {};

export const Sizes = SizesTemplate.bind({});
Sizes.args = {};

export const Tooltip = DefaultTemplate.bind({});
Tooltip.args = { tooltipText: "some tooltip text" };
