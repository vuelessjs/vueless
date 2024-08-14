import { getArgTypes, getSlotNames, getSlotsFragment } from "../service.storybook";

import UTabs from "../ui.navigation-tabs";

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
    ...getArgTypes(UTabs.name),
  },
};

const DefaultTemplate = (args) => ({
  components: { UTabs },
  setup() {
    const slots = getSlotNames(UTabs.name);

    return { args, slots };
  },
  template: `
    <UTabs v-model="args.modelValue" v-bind="args">
      ${args.slotTemplate || getSlotsFragment()}
    </UTabs>
  `,
});

const EnumVariantTemplate = (args, { argTypes } = {}) => ({
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
        v-model="args.modelValue"
        v-for="(option, index) in options"
        v-bind="args"
        :[args.enum]="option"
        :key="index"
      />
    </div>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const sizes = EnumVariantTemplate.bind({});
sizes.args = { enum: "size" };

export const bottomLine = DefaultTemplate.bind({});
bottomLine.args = { underlined: true };

export const disabledTab = DefaultTemplate.bind({});
disabledTab.args = {
  options: [
    { label: "Tab 1", value: 1 },
    { label: "Tab 2", value: 2, disabled: true },
    { label: "Tab 3", value: 3 },
  ],
};
