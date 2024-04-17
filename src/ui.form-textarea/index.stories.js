import { getArgTypes, getSlotNames } from "../service.storybook";

import UTextarea from "../ui.form-textarea";
import UIcon from "../ui.image-icon";
import URow from "../ui.container-row";
import UGroup from "../ui.container-group";

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
  components: { UTextarea },
  setup() {
    const slots = getSlotNames(UTextarea.name);

    return { args, slots };
  },
  template: `
    <UTextarea
      v-bind="args"
    >
      <template v-for="(slot, index) of slots" :key="index" v-slot:[slot]>
        <template v-if="args[slot]">{{ args[slot] }}</template>
      </template>
    </UTextarea>
  `,
});

const SlotTemplate = (args) => ({
  components: { UTextarea, UIcon },
  setup() {
    return { args };
  },
  template: `
    <UTextarea
      v-bind="args"
    >
      ${args.slotTemplate}
    </UTextarea>
  `,
});

const SizesTemplate = (args, { argTypes } = {}) => ({
  components: { UTextarea, URow },
  setup() {
    return {
      args,
      sizes: argTypes.size.options,
    };
  },
  template: `
    <URow>
      <div class="w-1/3" v-for="(size, index) in sizes" :key="index">
        <UTextarea
          v-bind="args"
          :size="size"
        />
      </div>
    </URow>
  `,
});

const LabelPlacementTemplate = (args) => ({
  components: { UTextarea, UGroup },
  setup() {
    return {
      args,
    };
  },
  template: `
    <UGroup size="lg">
      <UTextarea
        v-bind="args"
        label-align="top"
        label="top"
      />

      <UTextarea
        v-bind="args"
        label-align="topInside"
        label="topInside"
      />
    </UGroup>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const labelPlacement = LabelPlacementTemplate.bind({});
labelPlacement.args = {};

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

export const sizes = SizesTemplate.bind({});
sizes.args = {};

export const slotLeft = SlotTemplate.bind({});
slotLeft.args = {
  slotTemplate: `
    <template #left>
      <UIcon
        name="star"
        color="black"
        size="md"
      />
    </template>
  `,
};

export const slotRight = SlotTemplate.bind({});
slotLeft.args = {
  slotTemplate: `
    <template #right>
      <UIcon
        name="star"
        color="black"
        size="md"
      />
    </template>
  `,
};
