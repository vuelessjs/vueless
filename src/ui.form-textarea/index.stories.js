import { getArgTypes, getSlotNames } from "vueless/service.storybook";

import UTextarea from "vueless/ui.form-textarea";
import UIcon from "vueless/ui.image-icon";
import URow from "vueless/ui.container-row";

export default {
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

const SizesTemplate = (args, { argTypes }) => ({
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
          :size="size"
          v-bind="args"
        />
      </div>
    </URow>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

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

export const slotIcon = SlotTemplate.bind({});
slotIcon.args = {
  slotTemplate: `
    <template #icon>
      <UIcon
        name="star"
        color="black"
        size="md"
      />
    </template>
  `,
};
