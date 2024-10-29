import { getArgTypes, getSlotNames, getSlotsFragment } from "../../utils/utilStorybook.js";

import UTabs from "../../ui.navigation-tabs/UTabs.vue";

/**
 * The `UTabs` component. | [View on GitHub](https://github.com/vuelessjs/vueless/tree/main/src/ui.navigation-tabs)
 */
export default {
  id: "8020",
  title: "Navigation / Tabs",
  component: UTabs,
  args: {
    modelValue: "1",
    options: [
      { label: "Tab 1", value: "1" },
      { label: "Tab 2", value: "2" },
      { label: "Tab 3", value: "3" },
    ],
  },
  argTypes: {
    ...getArgTypes(UTabs.__name),
  },
};

const DefaultTemplate = (args) => ({
  components: { UTabs },
  setup() {
    const slots = getSlotNames(UTabs.__name);

    return { args, slots };
  },
  template: `
    <UTabs v-bind="args" v-model="args.modelValue">
      ${args.slotTemplate || getSlotsFragment()}
    </UTabs>
  `,
});

const EnumVariantTemplate = (args, { argTypes }) => ({
  components: { UTabs },
  setup() {
    return {
      args,
      options: argTypes[args.enum].options,
    };
  },
  template: `
    <div class="space-y-16">
      <UTabs
        v-for="(option, index) in options"
        :key="index"
        v-bind="args"
        v-model="args.modelValue"
        :[args.enum]="option"
      />
    </div>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const Sizes = EnumVariantTemplate.bind({});
Sizes.args = { enum: "size" };

export const BottomLine = DefaultTemplate.bind({});
BottomLine.args = { underlined: true };

export const DisabledTab = DefaultTemplate.bind({});
DisabledTab.args = {
  options: [
    { label: "Tab 1", value: 1 },
    { label: "Tab 2", value: 2, disabled: true },
    { label: "Tab 3", value: 3 },
  ],
};
