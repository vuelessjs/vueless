import { getArgTypes } from "../service.storybook";

import URadioGroup from "../ui.form-radio-group";
import URadio from "../ui.form-radio";
import UAlert from "../ui.text-alert";
import URow from "../ui.container-row";
import UGroup from "../ui.container-group";

/**
 * The `URadioGroup` component. | [View on GitHub](https://github.com/vuelessjs/vueless/tree/main/src/ui.form-radio-group)
 */
export default {
  id: "3160",
  title: "Form Inputs & Controls / Radio Group",
  component: URadioGroup,
  args: {
    label: "Label",
    value: "One",
    radios: [
      { name: "radio", label: "Radio 1", value: "1" },
      { name: "radio", label: "Radio 2", value: "2" },
      { name: "radio", label: "Radio 3", value: "3" },
    ],
  },
  argTypes: {
    ...getArgTypes(URadioGroup.name),
  },
};

const DefaultTemplate = (args) => ({
  components: { URadioGroup, URadio, UAlert, URow, UGroup },
  setup() {
    return { args };
  },
  data() {
    return {
      value: args.value,
    };
  },
  template: `
    <UGroup>
      <URadioGroup v-bind="args" v-model="value">
        <template v-for="(radio,index) in args.radios" :key="index">
          <URadio
            v-bind="radio"
          >
          </URadio>
        </template>
      </URadioGroup>

      <URow>
        <UAlert color="green" size="sm">
          <p>Selected value: <b>{{ value }}</b></p>
        </UAlert>
      </URow>
    </UGroup>
  `,
});

const OptionsTemplate = (args) => ({
  components: { URadioGroup, URadio, UAlert, URow },
  setup() {
    return { args };
  },
  data() {
    return {
      value: args.value,
    };
  },
  template: `
    <URow class="!flex-col">
      <URadioGroup v-bind="args" v-model="value" :options="args.radios" />

      <URow>
        <UAlert color="blue">
          <p>Selected value: {{ value }}</p>
        </UAlert>
      </URow>
    </URow>
  `,
});

const ColorsTemplate = (args, { argTypes } = {}) => ({
  components: { URadioGroup, URow },
  setup() {
    return { args };
  },
  data() {
    return {
      value: args.value,
      colors: argTypes.color.options,
    };
  },
  template: `
    <URow class="!flex-col">
      <URadioGroup
        v-bind="args"
        v-for="color in colors"
        :key="color"
        :label="color"
        :color="color"
        :options="args.radios"
        name="color"
        v-model="value"
      />
    </URow>
  `,
});

const SizesTemplate = (args, { argTypes } = {}) => ({
  components: { URadioGroup, URow },
  setup() {
    return { args };
  },
  data() {
    return {
      value: args.value,
      sizes: argTypes.size.options,
    };
  },
  template: `
    <URow class="!flex-col">
      <URadioGroup
        v-bind="args"
        v-for="size in sizes"
        :key="size"
        :label="size"
        :size="size"
        :options="args.radios"
        name="size"
        v-model="value"
      />
    </URow>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {
  name: "Default",
  isDefaultStory: true,
  radios: [
    { name: "slotValues", label: "Boolean", value: false },
    { name: "slotValues", label: "String", value: "One" },
    { name: "slotValues", label: "Number", value: 3 },
    { name: "slotValues", label: "Object", value: { key: "value" } },
    { name: "slotValues", label: "Array", value: ["Array", 1] },
  ],
};

export const Options = OptionsTemplate.bind({});
Options.args = {
  name: "Options",
  radios: [
    { name: "radioValues", label: "Boolean", value: false },
    { name: "radioValues", label: "String", value: "One" },
    { name: "radioValues", label: "Number", value: 3 },
    { name: "radioValues", label: "Object", value: { key: "value" } },
    { name: "radioValues", label: "Array", value: ["Array", 1] },
  ],
};

export const Colors = ColorsTemplate.bind({});
Colors.args = { name: "Colors" };

export const Sizes = SizesTemplate.bind({});
Sizes.args = { name: "Sizes" };
