import { getArgTypes, getSlotNames, getSlotsFragment } from "../service.storybook";
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
    const slots = getSlotNames(UColorPicker.name);

    return { args, slots };
  },
  template: `
    <UColorPicker v-bind="args" v-model="args.value">
      ${args.slotTemplate || getSlotsFragment()}
    </UColorPicker>
  `,
});

const EnumVariantTemplate = (args, { argTypes } = {}) => ({
  components: { UCol, UColorPicker },
  setup() {
    return {
      args,
      options: argTypes[args.enum].options,
    };
  },
  template: `
    <UCol>
      <UColorPicker
        v-for="(option, index) in options"
        :key="index"
        v-bind="args"
        v-model="args.value"
        :[args.enum]="option"
        :name="option"
      />
    </UCol>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const Sizes = EnumVariantTemplate.bind({});
Sizes.args = { enum: "size" };

export const Description = DefaultTemplate.bind({});
Description.args = { description: "Description" };

export const Error = DefaultTemplate.bind({});
Error.args = { error: "some error" };

export const Disabled = DefaultTemplate.bind({});
Disabled.args = { disabled: true };
