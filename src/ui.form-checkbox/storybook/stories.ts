import {
  getArgs,
  getArgTypes,
  getSlotNames,
  getSlotsFragment,
  getDocsDescription,
} from "../../utils/storybook.ts";

import UCheckbox from "../../ui.form-checkbox/UCheckbox.vue";
import UCheckboxGroup from "../../ui.form-checkbox-group/UCheckboxGroup.vue";
import UBadge from "../../ui.text-badge/UBadge.vue";
import UCol from "../../ui.container-col/UCol.vue";

import type { Meta, StoryFn } from "@storybook/vue3";
import type { Props } from "../types.ts";

interface UCheckboxArgs extends Props {
  slotTemplate?: string;
  enum: "size" | "labelAlign" | "color";
}

export default {
  id: "3100",
  title: "Form Inputs & Controls / Checkbox",
  component: UCheckbox,
  args: {
    label: "Subscribe to the newsletter",
  },
  argTypes: {
    ...getArgTypes(UCheckbox.__name),
  },
  parameters: {
    docs: {
      ...getDocsDescription(UCheckbox.__name),
    },
  },
} as Meta;

const DefaultTemplate: StoryFn<UCheckboxArgs> = (args: UCheckboxArgs) => ({
  components: { UCheckbox, UBadge },
  setup: () => ({ args, slots: getSlotNames(UCheckbox.__name) }),
  template: `
    <UCheckbox v-bind="args" v-model="args.modelValue">
      ${args.slotTemplate || getSlotsFragment("")}
    </UCheckbox>
  `,
});

const ValueTypesTemplate: StoryFn<UCheckboxArgs> = (args: UCheckboxArgs) => ({
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

        <span class="font-normal text-muted text-small pl-0 mt-1">
          {{ arrayValue }}
        </span>
      </div>
    </UCol>
  `,
});

const EnumTemplate: StoryFn<UCheckboxArgs> = (args: UCheckboxArgs, { argTypes }) => ({
  components: { UCheckbox, UCol },
  setup: () => ({ args, argTypes, getArgs }),
  template: `
    <UCol gap="xl">
      <UCheckbox
        v-for="option in argTypes?.[args.enum]?.options"
        v-bind="getArgs(args, option)"
        :key="option"
        v-model="args.modelValue"
      />
    </UCol>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const Description = DefaultTemplate.bind({});
Description.args = { description: "Receive updates and exclusive offers directly to your inbox." };

export const Error = DefaultTemplate.bind({});
Error.args = { error: "Please agree to the Terms and Conditions before proceeding." };

export const Disabled = DefaultTemplate.bind({});
Disabled.args = { disabled: true };

export const CustomValues = ValueTypesTemplate.bind({});
CustomValues.args = {};
CustomValues.parameters = {
  docs: {
    description: {
      story:
        // eslint-disable-next-line vue/max-len
        "You can pass custom `trueValue` and `falseValue` props, that can be of different types (see object meta keys table below).",
    },
  },
};

export const Sizes = EnumTemplate.bind({});
Sizes.args = { enum: "size" };

export const LabelAlign = EnumTemplate.bind({});
LabelAlign.args = { enum: "labelAlign" };

export const Colors = EnumTemplate.bind({});
Colors.args = { enum: "color", modelValue: true, description: "{enumValue}" };

export const Partial = DefaultTemplate.bind({});
Partial.args = { partial: true };
Partial.parameters = {
  docs: {
    description: {
      story: "Make checkbox partially checked (change the checked tick to a minus).",
    },
  },
};

export const LabelSlot = DefaultTemplate.bind({});
LabelSlot.args = {
  slotTemplate: `
    <template #label>
      <UBadge label="This option is required" color="error" size="sm" />
    </template>
  `,
};

export const BottomSlot = DefaultTemplate.bind({});
BottomSlot.args = {
  slotTemplate: `
    <template #bottom>
      <UBadge label="Subscription is optional" color="success" size="sm" />
    </template>
  `,
};
