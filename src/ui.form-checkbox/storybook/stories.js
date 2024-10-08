import { getArgTypes, getSlotNames, getSlotsFragment } from "../../utils/utilStorybook.js";

import UCheckbox from "../../ui.form-checkbox/UCheckbox.vue";
import UCheckboxGroup from "../../ui.form-checkbox-group/UCheckboxGroup.vue";
import UBadge from "../../ui.text-badge/UBadge.vue";
import UCol from "../../ui.container-col/UCol.vue";

/**
 * The `UCheckbox` component. | [View on GitHub](https://github.com/vuelessjs/vueless/tree/main/src/ui.form-checkbox)
 */
export default {
  id: "3100",
  title: "Form Inputs & Controls / Checkbox",
  component: UCheckbox,
  args: {
    label: "Label",
  },
  argTypes: {
    ...getArgTypes(UCheckbox.__name),
    modelValue: { control: { type: "boolean" } },
  },
};

const DefaultTemplate = (args) => ({
  components: { UCheckbox, UBadge },
  setup() {
    const slots = getSlotNames(UCheckbox.__name);

    return { args, slots };
  },
  template: `
    <UCheckbox v-bind="args" v-model="args.modelValue">
      ${args.slotTemplate || getSlotsFragment()}
    </UCheckbox>
  `,
});

const ValueTypesTemplate = (args) => ({
  components: { UCheckbox, UCheckboxGroup, UCol },
  setup() {
    return { args };
  },
  data() {
    return {
      defaultValue: false,
      arrayValue: [],
      customValue: { vue: "less" },
    };
  },
  template: `
    <UCol gap="xl">
      <UCheckbox
        v-bind="args"
        v-model="defaultValue"
        label="Default"
        :description="String(defaultValue)"
      />

      <UCheckbox
        v-bind="args"
        v-model="customValue"
        :true-value="{ vue: 'less' }"
        false-value="0"
        :description="JSON.stringify(customValue)"
        label="Custom"
      />

      <div>
        <UCheckboxGroup name="checkboxGroup" label="Checkbox group">
          <UCheckbox
            v-bind="args"
            v-model="arrayValue"
            :value="{ key: 'value' }"
            label="Array with object value"
          />
          <UCheckbox
            v-bind="args"
            v-model="arrayValue"
            value="someString"
            label="Array with custom string value"
          />
        </UCheckboxGroup>

        <span class="font-normal text-gray-400 text-xs pl-0 mt-1">
          {{ arrayValue }}
        </span>
      </div>
    </UCol>
  `,
});

const EnumVariantTemplate = (args, { argTypes } = {}) => ({
  components: { UCheckbox, UCol },
  setup() {
    return {
      args,
      options: argTypes[args.enum].options,
    };
  },
  template: `
    <UCol gap="xl">
      <UCheckbox
        v-for="(option, index) in options"
        :key="index"
        v-bind="args"
        :[args.enum]="option"
        :label="option"
      />
    </UCol>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const CustomValues = ValueTypesTemplate.bind({});
CustomValues.args = {};

export const Sizes = EnumVariantTemplate.bind({});
Sizes.args = { enum: "size" };

export const Disabled = DefaultTemplate.bind({});
Disabled.args = { disabled: true };

export const Description = DefaultTemplate.bind({});
Description.args = { description: "Some description" };

export const SlotFooter = DefaultTemplate.bind({});
SlotFooter.args = {
  slotTemplate: `
    <template #footer>
      <UBadge label="favourite" color="green" size="sm" />
    </template>
  `,
};
