import { getArgTypes, getSlotNames } from "vueless/service.storybook";

import UButtonGroup from "vueless/ui.button-group";
import UIcon from "vueless/ui.image-icon";
import UButtonGroupItem from "vueless/ui.button-group-item";
import URow from "vueless/ui.container-row";
export default {
  title: "Buttons & Links / Button Group",
  component: UButtonGroup,
  argTypes: {
    ...getArgTypes(UButtonGroup.name),
    modelValue: { control: { type: "text" } },
  },
};

const DefaultTemplate = (args) => ({
  components: { UButtonGroup },
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
    <UButtonGroup :options="groupOptions" name="defaultTemplate" v-bind="args"/>
  `,
});

const SizesTemplate = (args, { argTypes }) => ({
  components: { UButtonGroup, URow },
  setup() {
    const slots = getSlotNames(UButtonGroup.name);

    return {
      args,
      slots,
      sizes: argTypes.size.options,
    };
  },
  template: `
    <URow>
      <UButtonGroup
        v-for="(size, index) in sizes"
        :size="size"
        :text="size"
        :options="[
          { value: size + 1, label: size },
          { value: size + 2, label: size },
        ]"
        v-bind="args"
        :key="index"
        name="sizeTemplate"
      >
        <template v-for="(slot, index) of slots" :key="index" v-slot:[slot]>
          <template v-if="args[slot]">{{ args[slot] }}</template>
        </template>
      </UButtonGroup>
    </URow>
  `,
});

const SlotTemplate = (args) => ({
  components: { UButtonGroup, UIcon, UButtonGroupItem },
  setup() {
    return {
      args,
      selected: "55",
    };
  },
  template: `
    <UButtonGroup v-model="selected">
      ${args.slotTemplate}
    </UButtonGroup>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {
  name: "first name",
};

export const slotDefault = SlotTemplate.bind({});
slotDefault.args = {
  name: "third name",
  slotTemplate: `
    <template #default>
      <UButtonGroupItem label="label" />
    </template>
  `,
};

export const sizes = SizesTemplate.bind({});
sizes.args = {
  name: "second name",
};

export const wide = DefaultTemplate.bind({});
wide.args = {
  wide: true,
};
