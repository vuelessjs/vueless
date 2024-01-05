import { getArgTypes, getSlotNames } from "vueless/service.storybook";

import UTabs from "vueless/ui.navigation-tabs";

export default {
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

    return {
      args,
      slots,
    };
  },
  template: `
    <UTabs v-bind="args" v-model="args.modelValue"/>
  `,
});

const SizesTemplate = (args, { argTypes }) => ({
  components: { UTabs },
  setup() {
    return {
      args,
      sizes: argTypes.size.options,
    };
  },
  template: `
    <div class="space-y-16">
      <UTabs
        v-model="args.modelValue"
        v-for="(size, index) in sizes"
        :size="size"
        :key="index"
        v-bind="args"
      />
    </div>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const sizes = SizesTemplate.bind({});
sizes.args = {};

export const bottomLine = DefaultTemplate.bind({});
bottomLine.args = { bottomLine: true };

export const disabledTab = DefaultTemplate.bind({});
disabledTab.args = {
  options: [
    { label: "Tab 1", value: 1 },
    { label: "Tab 2", value: 2, disabled: true },
    { label: "Tab 3", value: 3 },
  ],
};
