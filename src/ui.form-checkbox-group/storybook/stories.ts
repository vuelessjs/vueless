import { getArgTypes, getSlotNames, getSlotsFragment } from "../../utils/storybook.ts";

import UCheckboxGroup from "../../ui.form-checkbox-group/UCheckboxGroup.vue";
import UCheckbox from "../../ui.form-checkbox/UCheckbox.vue";
import UAlert from "../../ui.text-alert/UAlert.vue";
import UCol from "../../ui.container-col/UCol.vue";
import URow from "../../ui.container-row/URow.vue";

import type { Meta, StoryFn } from "@storybook/vue3";
import type { UCheckboxGroupProps } from "../types.ts";
import type { UnknownObject, UnknownArray } from "../../types.ts";

interface UCheckboxGroupArgs extends UCheckboxGroupProps {
  slotTemplate?: string;
  enum: "size" | "color";
  value?: boolean | string | number | UnknownArray | UnknownObject;
}

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
    ...getArgTypes(UCheckboxGroup.__name),
  },
} as Meta;

const DefaultTemplate: StoryFn<UCheckboxGroupArgs> = (args: UCheckboxGroupArgs) => ({
  components: { UCheckboxGroup, UCheckbox, UAlert, URow, UCol },
  setup() {
    const slots = getSlotNames(UCheckboxGroup.__name);

    return { args, slots };
  },
  data() {
    return {
      value: args.value,
    };
  },
  template: `
    <UCol>
      <UCheckboxGroup v-bind="args" v-model="value">
        ${args.slotTemplate || getSlotsFragment("")}
      </UCheckboxGroup>

      <URow>
        <UAlert size="sm" color="gray">
          <p>Selected value: {{ value }}</p>
        </UAlert>
      </URow>
    </UCol>
  `,
});

const EnumVariantTemplate: StoryFn<UCheckboxGroupArgs> = (
  args: UCheckboxGroupArgs,
  { argTypes },
) => ({
  components: { UCheckboxGroup, UCol },
  setup() {
    return { args };
  },
  data() {
    return {
      value: args.value,
      options: argTypes?.[args.enum]?.options,
    };
  },
  template: `
    <UCol>
      <UCheckboxGroup
        v-for="(option, index) in options"
        :key="index"
        v-bind="args"
        v-model="value"
        :label="option"
        :[args.enum]="option"
        :options="args.options"
        name="option"
      />
    </UCol>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {
  name: "Default",
  slotTemplate: `
    <template v-for="(radio, index) in args.options" :key="index">
      <UCheckbox v-bind="radio"/>
    </template>
  `,
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
      label: "Array",
      value: ["Array", 1],
    },
  ],
};

export const Options = DefaultTemplate.bind({});
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

export const Disabled = DefaultTemplate.bind({});
Disabled.args = { name: "Disabled", disabled: true };

export const Error = DefaultTemplate.bind({});
Error.args = { name: "Error", error: "some error" };

export const Colors = EnumVariantTemplate.bind({});
Colors.args = { enum: "color", name: "Colors" };

export const Sizes = EnumVariantTemplate.bind({});
Sizes.args = { enum: "size", name: "Sizes" };
