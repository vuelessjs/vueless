import {
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
import { computed } from "vue";

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
  setup() {
    const slots = getSlotNames(UCheckbox.__name);

    return { args, slots };
  },
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

        <span class="font-normal text-gray-400 text-small pl-0 mt-1">
          {{ arrayValue }}
        </span>
      </div>
    </UCol>
  `,
});

const EnumVariantTemplate: StoryFn<UCheckboxArgs> = (args: UCheckboxArgs, { argTypes }) => ({
  components: { UCheckbox, UCol },
  setup() {
    const isColorStory = computed(() => args.enum === "color");

    return {
      args,
      options: argTypes?.[args.enum]?.options,
      isColorStory,
    };
  },
  template: `
    <UCol gap="xl" :class="{ 'flex-row': isColorStory }">
      <UCheckbox
        v-for="(option, index) in options"
        :key="index"
        v-bind="args"
        :[args.enum]="option"
        :label="isColorStory ? option : args.label"
        :description="isColorStory ? '' : option"
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

export const Sizes = EnumVariantTemplate.bind({});
Sizes.args = { enum: "size" };

export const LabelPlacement = EnumVariantTemplate.bind({});
LabelPlacement.args = { enum: "labelAlign" };

export const Color = EnumVariantTemplate.bind({});
Color.args = { enum: "color", modelValue: true };

export const Partial = DefaultTemplate.bind({});
Partial.args = { partial: true };
Partial.parameters = {
  docs: {
    description: {
      story: "Make checkbox partially checked (change the checked tick to a minus).",
    },
  },
};

export const SlotLabel = DefaultTemplate.bind({});
SlotLabel.args = {
  slotTemplate: `
    <template #label>
      <UBadge label="This option is required" color="error" size="sm" />
    </template>
  `,
};

export const SlotBottom = DefaultTemplate.bind({});
SlotBottom.args = {
  slotTemplate: `
    <template #bottom>
      <UBadge label="Subscription is optional" color="success" size="sm" />
    </template>
  `,
};
