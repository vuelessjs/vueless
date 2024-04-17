import { getArgTypes } from "../service.storybook";
import UColorPicker from "../ui.form-color-picker";
import UGroup from "../ui.container-group";

export default {
  id: "3210",
  title: "Form Inputs & Controls / Color Picker",
  component: UColorPicker,
  args: {
    label: "Label",
    value: "red",
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
  components: { UGroup, UColorPicker },
  setup() {
    return {
      args,
      sizes: argTypes.size.options,
    };
  },
  template: `
    <UGroup>
      <UColorPicker
        v-for="(size, index) in sizes"
        v-bind="args"
        :size="size"
        :key="index"
        :name="size"
        v-model="args.value"
      />
    </UGroup>
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
