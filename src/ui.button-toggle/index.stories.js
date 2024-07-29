import { ref } from "vue";
import { getArgTypes } from "../service.storybook";

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
  components: { UToggle },
  data() {
    return {
      value: "",
    };
  },
  setup() {
    return { args, OPTIONS };
  },
  template: `
    <UToggle
      v-model="value"
      v-bind="args"
      :options="OPTIONS"
    />
  `,
});

const multipleTemplate = (args) => ({
  components: { UToggle },
  data() {
    return {
      value: [],
    };
  },
  setup() {
    return { args, OPTIONS };
  },
  template: `
    <UToggle
      v-model="value"
      v-bind="args"
      multiple
      :options="OPTIONS"
      name="multipleTemplate"
    />
  `,
});

const SizesTemplate = (args, { argTypes } = {}) => ({
  components: { UToggle, URow },
  setup() {
    const value = ref("");

    return {
      args,
      value,
      sizes: argTypes.size.options,
    };
  },
  template: `
    <URow>
      <UToggle
        v-for="(size, index) in sizes"
        :key="index"
        name="sizeTemplate"
        v-model="value"
        v-bind="args"
        :size="size"
        :label="size"
        :options="[
          { value: size + 1, label: size },
          { value: size + 2, label: size },
        ]"
      />
    </URow>
  `,
});

const VariantsTemplate = (args, { argTypes } = {}) => ({
  components: { UToggle, URow },
  setup() {
    const value = ref("");

    return {
      args,
      value,
      variants: argTypes.variant.options,
    };
  },
  template: `
    <URow>
      <UToggle
        v-for="(variant, index) in variants"
        :key="index"
        name="sizeTemplate"
        v-model="value"
        v-bind="args"
        :variant="variant"
        :label="variant"
        :options="[
          { value: variant + 1, label: variant },
          { value: variant + 2, label: variant },
        ]"
      />
    </URow>
  `,
});

const SlotTemplate = (args) => ({
  components: { UToggle, UIcon, UToggleItem },
  setup() {
    const selected = ref("");

    return {
      args,
      selected,
    };
  },
  template: `
    <UToggle v-bind="args" name="slotTemplate" v-model="selected">
      ${args.slotTemplate}
    </UToggle>
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

export const sizes = SizesTemplate.bind({});
sizes.args = {
  name: "sizes",
};

export const variants = VariantsTemplate.bind({});
variants.args = {
  name: "variants",
};

export const multiple = multipleTemplate.bind({});
multiple.args = {
  name: "multiple",
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

export const square = SlotTemplate.bind({});
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

export const slotDefault = SlotTemplate.bind({});
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
