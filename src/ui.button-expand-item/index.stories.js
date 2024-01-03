import { getArgTypes } from "vueless/service.storybook";

import UButtonExpandItem from "vueless/ui.button-expand-item";
import URow from "vueless/ui.container-row";

export default {
  title: "Buttons & Links / Button Expand Item",
  component: UButtonExpandItem,
  args: {
    text: "Button Expand Item",
    iconName: "star-fill",
  },
  argTypes: {
    ...getArgTypes(UButtonExpandItem.name),
  },
};

const DefaultTemplate = (args) => ({
  components: { UButtonExpandItem },
  setup() {
    return { args };
  },
  template: `
    <UButtonExpandItem v-bind="args" />
  `,
});

const SizesTemplate = (args, { argTypes }) => ({
  components: { UButtonExpandItem, URow },
  setup() {
    return {
      args,
      sizes: argTypes.size.options,
    };
  },
  template: `
    <URow>
      <UButtonExpandItem
        v-for="(size, index) in sizes"
        :size="size"
        :text="size"
        v-bind="args"
        :key="index"
      />
    </URow>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const Sizes = SizesTemplate.bind({});
Sizes.args = {};

export const Disabled = DefaultTemplate.bind({});
Disabled.args = { disabled: true };

export const Icon = DefaultTemplate.bind({});
Icon.args = {
  slotTemplate: `
    <template #left>
      <UIcon
        name="star"
        color="gray"
        size="md"
       />
    </template>
  `,
};
