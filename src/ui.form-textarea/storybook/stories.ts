import {
  getArgTypes,
  getSlotNames,
  getSlotsFragment,
  getDocsDescription,
} from "../../utils/storybook.ts";

import UTextarea from "../../ui.form-textarea/UTextarea.vue";
import UIcon from "../../ui.image-icon/UIcon.vue";
import UCol from "../../ui.container-col/UCol.vue";

import type { Meta, StoryFn } from "@storybook/vue3";
import type { Props } from "../types.ts";

interface UTextareaArgs extends Props {
  slotTemplate?: string;
  enum: "size" | "labelAlign";
}

export default {
  id: "3070",
  title: "Form Inputs & Controls / Textarea",
  component: UTextarea,
  args: {
    label: "Label",
  },
  argTypes: {
    ...getArgTypes(UTextarea.__name),
  },
  parameters: {
    docs: {
      ...getDocsDescription(UTextarea.__name),
    },
  },
} as Meta;

const DefaultTemplate: StoryFn<UTextareaArgs> = (args: UTextareaArgs) => ({
  components: { UTextarea, UIcon },
  setup() {
    const slots = getSlotNames(UTextarea.__name);

    return { args, slots };
  },
  template: `
    <UTextarea v-bind="args" v-model="args.modelValue">
      ${args.slotTemplate || getSlotsFragment("")}
    </UTextarea>
  `,
});

const EnumVariantTemplate: StoryFn<UTextareaArgs> = (args: UTextareaArgs, { argTypes }) => ({
  components: { UTextarea, UCol },
  setup() {
    return {
      args,
      options: argTypes?.[args.enum]?.options,
    };
  },
  template: `
    <UCol>
      <div class="w-1/3" v-for="(option, index) in options" :key="index">
        <UTextarea
          v-bind="args"
          :[args.enum]="option"
          :label="option"
        />
      </div>
    </UCol>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const LabelPlacement = EnumVariantTemplate.bind({});
LabelPlacement.args = { enum: "labelAlign" };

export const Placeholder = DefaultTemplate.bind({});
Placeholder.args = { placeholder: "some placeholder text" };

export const Disabled = DefaultTemplate.bind({});
Disabled.args = { disabled: true };

export const Error = DefaultTemplate.bind({});
Error.args = { error: "some error text" };

export const Description = DefaultTemplate.bind({});
Description.args = { description: "some description text" };

export const Rows1 = DefaultTemplate.bind({});
Rows1.args = { rows: "1" };

export const Readonly = DefaultTemplate.bind({});
Readonly.args = { readonly: true, modelValue: "some value for read" };

export const NoAutocomplete = DefaultTemplate.bind({});
NoAutocomplete.args = { noAutocomplete: true };

export const Sizes = EnumVariantTemplate.bind({});
Sizes.args = { enum: "size" };

export const SlotLeft = DefaultTemplate.bind({});
SlotLeft.args = {
  slotTemplate: `
    <template #left>
      <UIcon
        name="star"
        color="black"
      />
    </template>
  `,
};

export const SlotRight = DefaultTemplate.bind({});
SlotRight.args = {
  slotTemplate: `
    <template #right>
      <UIcon
        name="star"
        color="black"
      />
    </template>
  `,
};
