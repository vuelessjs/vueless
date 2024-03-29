import { getArgTypes, getSlotNames } from "vueless/service.storybook";

import UEmpty from "vueless/ui.text-empty";
import UButton from "vueless/ui.button";
import UIcon from "vueless/ui.image-icon";
import URow from "vueless/ui.container-row";

export default {
  title: "Text & Content / Empty",
  component: UEmpty,
  args: {
    title: "No contacts",
    description: "There is no contacts in the list.",
  },
  argTypes: {
    ...getArgTypes(UEmpty.name),
  },
};

const DefaultTemplate = (args) => ({
  components: { UEmpty },
  setup() {
    const slots = getSlotNames(UEmpty.name);

    return { args, slots };
  },
  template: `
    <UEmpty v-bind="args">
      <template v-for="(slot, index) of slots" :key="index" v-slot:[slot]>
        <template v-if="args[slot]">{{ args[slot] }}</template>
      </template>
    </UEmpty>
  `,
});

const SlotTemplate = (args) => ({
  components: { UEmpty, UIcon, UButton },
  setup() {
    return { args };
  },
  template: `
    <UEmpty v-bind="args">
      ${args.slotTemplate}
    </UEmpty>
  `,
});

const SizesTemplate = (args, { argTypes }) => ({
  components: { UEmpty, URow },
  setup() {
    return {
      args,
      sizes: argTypes.size.options,
    };
  },
  template: `
    <URow>
      <UEmpty
        v-for="(size, index) in sizes"
        v-bind="args"
        :size="size"
        :title="size"
        :key="index"
      />
    </URow>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const sizes = SizesTemplate.bind({});
sizes.args = { title: "" };

export const slotHeader = SlotTemplate.bind({});
slotHeader.args = {
  slotTemplate: `
    <template #header>
      <UIcon
        name="person"
        color="blue"
        variant="dark"
        size="2xl"
        pill
       />
    </template>
  `,
};

export const slotDefault = SlotTemplate.bind({});
slotDefault.args = {
  slotTemplate: `
    <template #default>
      <span>Some unique <b><code>HTML</code></b> or <b><code>Components</code></b>...</span>
    </template>
  `,
};

export const slotFooter = SlotTemplate.bind({});
slotFooter.args = {
  slotTemplate: `
    <template #footer>
        <UButton text="Add new one" size="sm" variant="thirdary" filled />
    </template>
  `,
};
