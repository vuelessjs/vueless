import { getArgTypes, getSlotNames, allSlotsFragment } from "../service.storybook";

import UCheckbox from "../ui.form-checkbox";
import UCheckboxGroup from "../ui.form-checkbox-group";
import UBadge from "../ui.text-badge";
import UCol from "../ui.container-col";

/**
 * The `UCheckbox` component. | [View on GitHub](https://github.com/vuelessjs/vueless/tree/main/src/ui.form-checkbox)
 */
export default {
  id: "3100",
  title: "Form Inputs & Controls / Checkbox",
  component: UCheckbox,
  args: {
    label: "Label",
    value: {},
  },
  argTypes: {
    ...getArgTypes(UCheckbox.name),
  },
};

const DefaultTemplate = (args) => ({
  components: { UCheckbox },
  setup() {
    const slots = getSlotNames(UCheckbox.name);

    return { args, slots };
  },
  template: `
    <UCheckbox v-bind="args" v-model="args.value">
      ${allSlotsFragment}
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

        <span class="font-normal text-gray-500/[85] text-xs pl-0 mt-1">
          {{ arrayValue }}
        </span>
      </div>
    </UCol>
  `,
});

const SizesTemplate = (args, { argTypes } = {}) => ({
  components: { UCheckbox, UCol },
  setup() {
    return {
      args,
      sizes: argTypes.size.options,
    };
  },
  template: `
    <UCol gap="xl">
      <UCheckbox
        v-for="(size, index) in sizes"
        :key="index"
        v-bind="args"
        v-model="args.value[size]"
        :size="size"
        :label="size"
      />
    </UCol>
  `,
});

const SlotTemplate = (args) => ({
  components: { UCheckbox, UBadge },
  setup() {
    return { args };
  },
  template: `
    <UCheckbox v-bind="args" v-model="args.value" description="hello">
      ${args.slotTemplate}
    </UCheckbox>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const CustomValues = ValueTypesTemplate.bind({});
CustomValues.args = {};

export const Sizes = SizesTemplate.bind({});
Sizes.args = {};

export const Disabled = DefaultTemplate.bind({});
Disabled.args = { disabled: true };

export const Description = DefaultTemplate.bind({});
Description.args = { description: "Some description" };

export const slotFooter = SlotTemplate.bind({});
slotFooter.args = {
  slotTemplate: `
    <template #footer>
      <UBadge label="favourite" color="green" size="sm" />
    </template>
  `,
};
