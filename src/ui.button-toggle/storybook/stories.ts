import { ref } from "vue";
import {
  getArgTypes,
  getSlotNames,
  getSlotsFragment,
  getDocsDescription,
} from "../../utils/storybook.ts";

import UToggle from "../../ui.button-toggle/UToggle.vue";
import UIcon from "../../ui.image-icon/UIcon.vue";
import UToggleItem from "../../ui.button-toggle-item/UToggleItem.vue";
import URow from "../../ui.container-row/URow.vue";

import type { Meta, StoryFn } from "@storybook/vue3";
import type { UToggleProps } from "../types.ts";

interface UToggleArgs extends UToggleProps {
  slotTemplate?: string;
  enum: "variant" | "size";
}

export default {
  components: { UIcon, UToggleItem },
  title: "Buttons & Links / Toggle",
  component: UToggle,
  args: {
    options: () => [
      { value: "11", label: "label 1" },
      { value: "12", label: "label 2" },
      { value: "13", label: "label 3" },
      { value: "14", label: "label 4" },
    ],
  },
  argTypes: {
    ...getArgTypes(UToggle.__name),
    modelValue: { control: { type: "text" } },
  },
  parameters: {
    ...getDocsDescription(UToggle.__name),
  },
} as Meta;

const DefaultTemplate: StoryFn<UToggleArgs> = (args: UToggleArgs) => ({
  components: { UToggle, UIcon, UToggleItem },
  setup() {
    const slots = getSlotNames(UToggle.__name);

    return { args, slots };
  },
  template: `
    <UToggle v-bind="args" v-model="args.modelValue">
      ${args.slotTemplate || getSlotsFragment("")}
    </UToggle>
  `,
});

const EnumVariantTemplate: StoryFn<UToggleArgs> = (args: UToggleArgs, { argTypes }) => ({
  components: { UToggle, URow },
  setup() {
    const value = ref("");

    return {
      args,
      value,
      options: argTypes?.[args.enum]?.options,
    };
  },
  template: `
    <URow>
      <UToggle
        v-for="(option, index) in options"
        :key="index"
        v-bind="args"
        v-model="value"
        :[args.enum]="option"
        :label="option"
        :options="() => [
          { value: option + 1, label: option },
          { value: option + 2, label: option },
        ]"
      />
    </URow>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {
  name: "Default",
};

export const Disabled = DefaultTemplate.bind({});
Disabled.args = {
  name: "Disabled",
  disabled: true,
};

export const Label = DefaultTemplate.bind({});
Label.args = {
  name: "Label",
  label: "Label",
  description: "description",
};

export const Sizes = EnumVariantTemplate.bind({});
Sizes.args = {
  name: "sizeTemplate",
  enum: "size",
};

export const Variants = EnumVariantTemplate.bind({});
Variants.args = {
  name: "sizeTemplate",
  enum: "variant",
};

export const Multiple = DefaultTemplate.bind({});
Multiple.args = { name: "multipleTemplate", multiple: true };

export const Block = DefaultTemplate.bind({});
Block.args = { name: "block", block: true };

export const Separated = DefaultTemplate.bind({});
Separated.args = { name: "separated", separated: true };

export const Round = DefaultTemplate.bind({});
Round.args = { name: "round", round: true, separated: true };

export const Square = DefaultTemplate.bind({});
Square.args = {
  name: "square",
  variant: "secondary",
  square: true,
  slotTemplate: `
    <template #default>
      <UToggleItem value="1">
        <UIcon name="star" />
      </UToggleItem>

      <UToggleItem value="2" >
        <UIcon name="add" />
      </UToggleItem>

      <UToggleItem value="3">
        <UIcon name="timer" />
      </UToggleItem>
    </template>
  `,
};

export const SlotDefault = DefaultTemplate.bind({});
SlotDefault.args = {
  name: "slotDefault",
  slotTemplate: `
    <template #default>
      <UToggleItem label="label 1" value="1" />
      <UToggleItem label="label 2" value="2" />
      <UToggleItem label="label 3" value="3" />
    </template>
  `,
};
