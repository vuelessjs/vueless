import { getArgTypes, getSlotNames, getSlotsFragment } from "../../utils/utilStorybook.ts";

import URadioGroup from "../../ui.form-radio-group/URadioGroup.vue";
import URadio from "../../ui.form-radio/URadio.vue";
import UAlert from "../../ui.text-alert/UAlert.vue";
import UCol from "../../ui.container-col/UCol.vue";

/**
 * The `URadioGroup` component. | [View on GitHub](https://github.com/vuelessjs/vueless/tree/main/src/ui.form-radio-group)
 */
export default {
  id: "3160",
  title: "Form Inputs & Controls / Radio Group",
  component: URadioGroup,
  args: {
    label: "Radio Group",
    modelValue: "One",
    options: [
      { label: "Boolean", value: false },
      { label: "String", value: "One" },
      { label: "Number", value: 3 },
      { label: "Object", value: { key: "value" } },
      { label: "Array", value: ["Array", 1] },
    ],
  },
  argTypes: {
    ...getArgTypes(URadioGroup.__name),
  },
};

const DefaultTemplate = (args) => ({
  components: { URadioGroup, URadio, UAlert, UCol },
  setup() {
    const slots = getSlotNames(URadioGroup.__name);

    return { args, slots };
  },
  template: `
    <UCol gap="2xl">
      <URadioGroup v-bind="args" v-model="args.modelValue">
        <URadio
          v-for="(radio, index) in args.options"
          :key="index"
          v-bind="radio"
        >
          ${args.slotTemplate || getSlotsFragment()}
        </URadio>
      </URadioGroup>

      <UAlert color="gray" size="xs">
        <code>Selected value: <b>{{ args.modelValue }}</b></code>
      </UAlert>
    </UCol>
  `,
});

const EnumVariantTemplate = (args, { argTypes }) => ({
  components: { URadioGroup, UCol },
  setup() {
    return {
      args,
      options: argTypes[args.enum].options,
    };
  },
  template: `
    <UCol>
      <URadioGroup
        v-for="(option, index) in options"
        :key="index"
        v-bind="args"
        v-model="args.modelValue"
        :[args.enum]="option"
        :label="option"
        :options="args.options"
        :name="option"
      />
    </UCol>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {
  name: "Default",
};

export const Options = DefaultTemplate.bind({});
Options.args = {
  name: "Options",
  modelValue: "Custom string value",
  options: [
    { label: "Boolean", value: false },
    { label: "String", value: "Custom string value" },
    { label: "Number", value: 4 },
    { label: "Object", value: { key: "Custom object value" } },
    { label: "Array", value: ["Custom array value", 2] },
  ],
};

export const Colors = EnumVariantTemplate.bind({});
Colors.args = { enum: "color", name: "Colors" };

export const Sizes = EnumVariantTemplate.bind({});
Sizes.args = { enum: "size", name: "Sizes" };
