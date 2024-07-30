import { getArgTypes } from "../service.storybook";

import UCheckboxGroup from "../ui.form-checkbox-group";
import UCheckbox from "../ui.form-checkbox";
import UAlert from "../ui.text-alert";
import URow from "../ui.container-row";

/**
 * The `UCheckboxGroup` component. | [View on GitHub](https://github.com/vuelessjs/vueless/tree/main/src/ui.form-checkbox-group)
 */
export default {
  id: "3110",
  title: "Form Inputs & Controls / Checkbox Group",
  component: UCheckboxGroup,
  args: {
    label: "Label",
    options: [
      { label: "checkbox 1", value: "1" },
      { label: "checkbox 2", value: "2" },
      { label: "checkbox 3", value: "3" },
    ],
    value: ["One"],
  },
  argTypes: {
    ...getArgTypes(UCheckboxGroup.name),
  },
};

const DefaultTemplate = (args) => ({
  components: { UCheckboxGroup, UCheckbox, UAlert, URow },
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
      <UCheckboxGroup v-bind="args" v-model="value">
        <template v-for="(radio, index) in args.options" :key="index">
          <UCheckbox v-bind="radio"/>
        </template>
      </UCheckboxGroup>

      <URow>
        <UAlert size="sm" color="blue">
          <p>Selected value: {{ value }}</p>
        </UAlert>
      </URow>
    </URow>
  `,
});

const OptionsTemplate = (args) => ({
  components: { UCheckboxGroup, UCheckbox, UAlert, URow },
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
      <UCheckboxGroup v-bind="args" v-model="value" :options="args.options" />

      <URow>
        <UAlert color="blue">
          <p>Selected value: {{ value }}</p>
        </UAlert>
      </URow>
    </URow>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {
  name: "Default",
  isDefaultStory: true,
  options: [
    { name: "Default", label: "String", value: "One" },
    { name: "Default", label: "Boolean", value: false },
    {
      name: "Default",
      label: "Object",

      value: { key: "value" },
    },
    {
      name: "Default",
      label: "Object",
      value: ["Array", 1],
    },
  ],
};

export const Options = OptionsTemplate.bind({});
Options.args = {
  name: "Options",
  options: [
    { name: "Options", label: "Boolean", value: false },
    { name: "Options", label: "String", value: "One" },
    { name: "Options", label: "Number", value: 3 },
    { name: "Options", label: "Object", value: { key: "value" } },
    { name: "Options", label: "Array", value: ["Array", 1] },
  ],
};

const ColorsTemplate = (args, { argTypes } = {}) => ({
  components: { UCheckboxGroup, URow },
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
      <UCheckboxGroup
        v-bind="args"
        v-for="color in colors"
        :key="color"
        :label="color"
        :color="color"
        :options="args.options"
        name="color"
        v-model="value"
      />
    </URow>
  `,
});

const SizesTemplate = (args, { argTypes } = {}) => ({
  components: { UCheckboxGroup, URow },
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
      <UCheckboxGroup
        v-bind="args"
        v-for="size in sizes"
        :key="size"
        :label="size"
        :size="size"
        :options="args.options"
        name="size"
        v-model="value"
      />
    </URow>
  `,
});

export const disabled = DefaultTemplate.bind({});
disabled.args = { name: "Disabled", disabled: true };

export const error = DefaultTemplate.bind({});
error.args = { name: "Error", error: "some error" };

export const Colors = ColorsTemplate.bind({});
Colors.args = { name: "Colors" };

export const Sizes = SizesTemplate.bind({});
Sizes.args = { name: "Sizes" };
