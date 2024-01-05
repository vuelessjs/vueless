import { getArgTypes, getSlotNames } from "vueless/service.storybook";

import UCheckbox from "vueless/ui.form-checkbox";
import UIcon from "vueless/ui.image-icon";
import URow from "vueless/ui.container-row";

export default {
  title: "Form Inputs & Controls / Checkbox",
  component: UCheckbox,
  args: {
    label: "Label",
    modelValue: "",
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
      <template v-for="(slot, index) of slots" :key="index" v-slot:[slot]>
        <template v-if="args[slot]">{{ args[slot] }}</template>
      </template>
    </UCheckbox>
  `,
});

const SizesTemplate = (args, { argTypes }) => ({
  components: { UCheckbox, URow },
  setup() {
    return {
      args,
      sizes: argTypes.size.options,
    };
  },
  template: `
    <URow>
      <UCheckbox
        v-for="(size, index) in sizes"
        :size="size"
        :label="size"
        :key="index"
        v-bind="args"
      />
    </URow>
  `,
});

const SlotTemplate = (args) => ({
  components: { UCheckbox, UIcon },
  setup() {
    return { args };
  },
  template: `
    <UCheckbox v-bind="args">
      ${args.slotTemplate}
    </UCheckbox>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const Sizes = SizesTemplate.bind({});
Sizes.args = {};

export const Disabled = DefaultTemplate.bind({});
Disabled.args = { disabled: true };

export const Description = DefaultTemplate.bind({});
Description.args = { description: "Some description" };

export const slotDescription = SlotTemplate.bind({});
slotDescription.args = {
  slotTemplate: `
    <template #description>
    <div class="flex">
      <div>
        Hello
      </div>

      <UIcon
        name="star"
        color="black"
        size="md"
      />
    </div>

    </template>
  `,
};
