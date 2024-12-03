import {
  getArgTypes,
  getSlotNames,
  getSlotsFragment,
  getDocsDescription,
} from "../../utils/storybook.ts";

import UColorPicker from "../../ui.form-color-picker/UColorPicker.vue";
import UCol from "../../ui.container-col/UCol.vue";

import type { Meta, StoryFn } from "@storybook/vue3";
import type { UColorPickerProps } from "../types.ts";

interface UColorPickerArgs extends UColorPickerProps {
  slotTemplate?: string;
  enum: "size";
}

export default {
  id: "3210",
  title: "Form Inputs & Controls / Color Picker",
  component: UColorPicker,
  args: {
    label: "Label",
    modelValue: "",
  },
  argTypes: {
    ...getArgTypes(UColorPicker.__name),
  },
  parameters: {
    ...getDocsDescription(UColorPicker.__name),
  },
} as Meta;

const DefaultTemplate: StoryFn<UColorPickerArgs> = (args: UColorPickerArgs) => ({
  components: { UColorPicker },
  setup() {
    const slots = getSlotNames(UColorPicker.__name);

    return { args, slots };
  },
  template: `
    <UColorPicker v-bind="args" v-model="args.modelValue">
      ${args.slotTemplate || getSlotsFragment("")}
    </UColorPicker>
  `,
});

const EnumVariantTemplate: StoryFn<UColorPickerArgs> = (args: UColorPickerArgs, { argTypes }) => ({
  components: { UCol, UColorPicker },
  setup() {
    return {
      args,
      options: argTypes?.[args.enum]?.options,
    };
  },
  template: `
    <UCol>
      <UColorPicker
        v-for="(option, index) in options"
        :key="index"
        v-bind="args"
        v-model="args.modelValue"
        :[args.enum]="option"
        :name="option"
      />
    </UCol>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = { name: "Default" };

export const Sizes = EnumVariantTemplate.bind({});
Sizes.args = { name: "Sizes", enum: "size" };

export const Description = DefaultTemplate.bind({});
Description.args = { name: "Description", description: "Description" };

export const Error = DefaultTemplate.bind({});
Error.args = { name: "Error", error: "some error" };

export const Disabled = DefaultTemplate.bind({});
Disabled.args = { name: "Disabled", disabled: true };
