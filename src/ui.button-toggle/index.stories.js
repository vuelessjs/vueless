import { ref } from "vue";
import { getArgTypes, getSlotNames, getSlotsFragment } from "../service.storybook";

import UToggle from "../ui.button-toggle";
import UIcon from "../ui.image-icon";
import UToggleItem from "../ui.button-toggle-item";
import URow from "../ui.container-row";

const OPTIONS = [
  { value: "11", label: "label 1" },
  { value: "12", label: "label 2" },
  { value: "13", label: "label 3" },
  { value: "14", label: "label 4" },
];

/**
 * The `UToggle` component. | [View on GitHub](https://github.com/vuelessjs/vueless/tree/main/src/ui.button-toggle)
 */
export default {
  components: { UIcon, UToggleItem },
  title: "Buttons & Links / Toggle",
  component: UToggle,
  argTypes: {
    ...getArgTypes(UToggle.name),
    modelValue: { control: { type: "text" } },
  },
};

const DefaultTemplate = (args) => ({
  components: { UToggle, UIcon, UToggleItem },
  setup() {
    const value = ref("");

    const slots = getSlotNames(UToggle.name);

    return { args, slots, value, OPTIONS };
  },
  template: `
    <UToggle
      v-bind="args"
      v-model="value"
      :options="OPTIONS"
    >
      ${args.slotTemplate || getSlotsFragment()}
    </UToggle>
  `,
});

const EnumVariantTemplate = (args, { argTypes } = {}) => ({
  components: { UToggle, URow },
  setup() {
    const value = ref("");

    return {
      args,
      value,
      options: argTypes[args.enum].options,
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
        :options="[
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

export const label = DefaultTemplate.bind({});
label.args = {
  name: "Label",
  label: "Label",
  description: "description",
};

export const sizes = EnumVariantTemplate.bind({});
sizes.args = {
  name: "sizeTemplate",
  enum: "size",
};

export const variants = EnumVariantTemplate.bind({});
variants.args = {
  name: "sizeTemplate",
  enum: "variant",
};

export const multiple = DefaultTemplate.bind({});
multiple.args = {
  name: "multipleTemplate",
  multiple: true,
};

export const block = DefaultTemplate.bind({});
block.args = {
  name: "block",
  block: true,
};

export const separated = DefaultTemplate.bind({});
separated.args = {
  name: "separated",
  separated: true,
};

export const pill = DefaultTemplate.bind({});
pill.args = {
  name: "pill",
  pill: true,
  separated: true,
};

export const square = DefaultTemplate.bind({});
square.args = {
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

export const slotDefault = DefaultTemplate.bind({});
slotDefault.args = {
  name: "slotDefault",
  slotTemplate: `
    <template #default>
      <UToggleItem label="label 1" value="1" />
      <UToggleItem label="label 2" value="2" />
      <UToggleItem label="label 3" value="3" />
    </template>
  `,
};
