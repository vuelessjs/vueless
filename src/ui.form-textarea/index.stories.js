import { getArgTypes, getSlotNames, getSlotsFragment } from "../service.storybook";

import UTextarea from "../ui.form-textarea";
import UIcon from "../ui.image-icon";
import UCol from "../ui.container-col";

/**
 * The `UTextarea` component. | [View on GitHub](https://github.com/vuelessjs/vueless/tree/main/src/ui.form-textarea)
 */
export default {
  id: "3070",
  title: "Form Inputs & Controls / Textarea",
  component: UTextarea,
  args: {
    label: "Label",
  },
  argTypes: {
    ...getArgTypes(UTextarea.name),
    modelValue: { control: { type: "text" } },
  },
};

const DefaultTemplate = (args) => ({
  components: { UTextarea, UIcon },
  setup() {
    const slots = getSlotNames(UTextarea.name);

    return { args, slots };
  },
  template: `
    <UTextarea v-bind="args" v-model="args.modelValue">
      ${args.slotTemplate || getSlotsFragment()}
    </UTextarea>
  `,
});

const EnumVariantTemplate = (args, { argTypes } = {}) => ({
  components: { UTextarea, UCol },
  setup() {
    return {
      args,
      options: argTypes[args.enum].options,
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

export const labelPlacement = EnumVariantTemplate.bind({});
labelPlacement.args = { enum: "labelAlign" };

export const placeholder = DefaultTemplate.bind({});
placeholder.args = { placeholder: "some placeholder text" };

export const disabled = DefaultTemplate.bind({});
disabled.args = { disabled: true };

export const error = DefaultTemplate.bind({});
error.args = { error: "some error text" };

export const description = DefaultTemplate.bind({});
description.args = { description: "some description text" };

export const rows1 = DefaultTemplate.bind({});
rows1.args = { rows: "1" };

export const readonly = DefaultTemplate.bind({});
readonly.args = { readonly: true, value: "some value for read" };

export const noAutocomplete = DefaultTemplate.bind({});
noAutocomplete.args = { noAutocomplete: true };

export const sizes = EnumVariantTemplate.bind({});
sizes.args = { enum: "size" };

export const slotLeft = DefaultTemplate.bind({});
slotLeft.args = {
  slotTemplate: `
    <template #left>
      <UIcon
        name="star"
        color="black"
      />
    </template>
  `,
};

export const slotRight = DefaultTemplate.bind({});
slotRight.args = {
  slotTemplate: `
    <template #right>
      <UIcon
        name="star"
        color="black"
      />
    </template>
  `,
};
