import { getArgTypes, getSlotNames } from "../service.storybook";

import UToggle from "../ui.button-toggle";
import UIcon from "../ui.image-icon";
import UToggleItem from "../ui.button-toggle-item";
import URow from "../ui.container-row";

export default {
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
    const groupOptions = [
      { value: "11", label: "label 1" },
      { value: "12", label: "label 2" },
      { value: "13", label: "label 3" },
      { value: "14", label: "label 4" },
    ];

    return { args, groupOptions };
  },
  template: `
    <UToggle
      v-model="value"
      v-bind="args"
      :options="groupOptions"
      name="defaultTemplate"
    />
  `,
});

const checkboxTemplate = (args) => ({
  components: { UToggle },
  data() {
    return {
      value: [],
    };
  },
  setup() {
    const groupOptions = [
      { value: "11", label: "label 1" },
      { value: "12", label: "label 2" },
      { value: "13", label: "label 3" },
      { value: "14", label: "label 4" },
    ];

    return { args, groupOptions };
  },
  template: `
    <UToggle
      v-model="value"
      v-bind="args"
      multiple
      :options="groupOptions"
      name="defaultTemplate"
    />
  `,
});

const SizesTemplate = (args, { argTypes } = {}) => ({
  components: { UToggle, URow },
  data() {
    return {
      value: "",
    };
  },
  setup() {
    const slots = getSlotNames(UToggle.name);

    return {
      args,
      slots,
      sizes: argTypes.size.options,
    };
  },
  template: `
    <URow>
      <UToggle
        v-for="(size, index) in sizes"
        v-bind="args"
        :size="size"
        :label="size"
        :options="[
          { value: size + 1, label: size },
          { value: size + 2, label: size },
        ]"
        v-model="value"
        :key="index"
        name="sizeTemplate"
      >
        <template v-for="(slot, index) of slots" :key="index" v-slot:[slot]>
          <template v-if="args[slot]">{{ args[slot] }}</template>
        </template>
      </UToggle>
    </URow>
  `,
});

const SlotTemplate = (args) => ({
  components: { UToggle, UIcon, UToggleItem },
  setup() {
    return {
      args,
      selected: "55",
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
  name: "first name",
};

export const multiple = checkboxTemplate.bind({});
multiple.args = {
  name: "second name",
};

export const sizes = SizesTemplate.bind({});
sizes.args = {
  name: "four name",
};

export const block = DefaultTemplate.bind({});
block.args = {
  name: "five name",
  block: true,
};

export const slotDefault = SlotTemplate.bind({});
slotDefault.args = {
  name: "third name",
  slotTemplate: `
    <template #default>
      <UToggleItem label="label" />
    </template>
  `,
};
