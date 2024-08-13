import { getArgTypes } from "../service.storybook";
import UColorPicker from "../ui.form-color-picker";
import UCol from "../ui.container-col";

/**
 * The `UColorPicker` component. | [View on GitHub](https://github.com/vuelessjs/vueless/tree/main/src/ui.form-color-picker)
 */
export default {
  id: "3210",
  title: "Form Inputs & Controls / Color Picker",
  component: UColorPicker,
  args: {
    label: "Label",
    value: "",
  },
  argTypes: {
    ...getArgTypes(UColorPicker.name),
  },
};

const DefaultTemplate = (args) => ({
  components: { UColorPicker },
  setup() {
    return { args };
  },
  template: `
    <UColorPicker v-bind="args" v-model="args.value"/>
  `,
});

const SizesTemplate = (args, { argTypes } = {}) => ({
  components: { UCol, UColorPicker },
  setup() {
    return {
      args,
      sizes: argTypes.size.options,
    };
  },
  template: `
    <UCol>
      <UColorPicker
        v-for="(size, index) in sizes"
        v-bind="args"
        :size="size"
        :key="index"
        :name="size"
        v-model="args.value"
      />
    </UCol>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const Sizes = SizesTemplate.bind({});
Sizes.args = {};

export const Description = DefaultTemplate.bind({});
Description.args = { description: "Description" };

export const Error = DefaultTemplate.bind({});
Error.args = { error: "some error" };

export const Disabled = DefaultTemplate.bind({});
Disabled.args = { disabled: true };
