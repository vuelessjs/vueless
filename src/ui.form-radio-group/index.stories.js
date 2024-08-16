import { getArgTypes, getSlotNames, getSlotsFragment } from "../service.storybook";

import URadioGroup from "../ui.form-radio-group";
import URadio from "../ui.form-radio";
import UAlert from "../ui.text-alert";
import URow from "../ui.container-row";
import UCol from "../ui.container-col";

/**
 * The `URadioGroup` component. | [View on GitHub](https://github.com/vuelessjs/vueless/tree/main/src/ui.form-radio-group)
 */
export default {
  id: "3160",
  title: "Form Inputs & Controls / Radio Group",
  component: URadioGroup,
  args: {},
  argTypes: {
    ...getArgTypes(URadioGroup.name),
  },
};

const defaultRadios = [
  { name: "slotValues", label: "Boolean", value: false },
  { name: "slotValues", label: "String", value: "One" },
  { name: "slotValues", label: "Number", value: 3 },
  { name: "slotValues", label: "Object", value: { key: "value" } },
  { name: "slotValues", label: "Array", value: ["Array", 1] },
];

const DefaultTemplate = (args) => ({
  components: { URadioGroup, URadio, UAlert, URow, UCol },
  setup() {
    const slots = getSlotNames(URadioGroup.name);

    const radios = args.radios ? args.radios : defaultRadios;

    return { args, slots, radios };
  },
  data() {
    return {
      value: args.value,
    };
  },
  template: `
    <UCol gap="2xl">
      <URadioGroup v-bind="args" v-model="value">
        <URadio
          v-for="(radio, index) in radios"
          :key="index"
          v-bind="radio"
        >
          ${args.slotTemplate || getSlotsFragment()}
        </URadio>
      </URadioGroup>
      <UAlert color="gray" size="xs">
        <code>Selected value: <b>{{ value }}</b></code>
      </UAlert>
    </UCol>
  `,
});

const EnumVariantTemplate = (args, { argTypes } = {}) => ({
  components: { URadioGroup, URow },
  setup() {
    const radios = defaultRadios;

    return {
      args,
      options: argTypes[args.enum].options,
      radios,
    };
  },
  data() {
    return {
      value: args.value,
    };
  },
  template: `
    <URow class="!flex-col">
      <URadioGroup
        v-for="(option, index) in options"
        :key="index"
        v-bind="args"
        v-model="value"
        :[args.enum]="option"
        :label="option"
        :options="radios"
        :name="option"
      />
    </URow>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {
  name: "Default",
};

export const Options = DefaultTemplate.bind({});
Options.args = {
  name: "Options",
  radios: [
    { name: "radioValues", label: "Boolean", value: false },
    { name: "radioValues", label: "String", value: "Custom string value" },
    { name: "radioValues", label: "Number", value: 4 },
    { name: "radioValues", label: "Object", value: { key: "Custom object value" } },
    { name: "radioValues", label: "Array", value: ["Custom array value", 2] },
  ],
};

export const Colors = EnumVariantTemplate.bind({});
Colors.args = { enum: "color", name: "Colors" };

export const Sizes = EnumVariantTemplate.bind({});
Sizes.args = { enum: "size", name: "Sizes" };
