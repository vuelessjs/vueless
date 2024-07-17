import { getArgTypes, getSlotNames, allSlotsFragment } from "../service.storybook";

import UEmpty from "../ui.text-empty";
import UButton from "../ui.button";
import UIcon from "../ui.image-icon";
import URow from "../ui.container-row";

/**
 * The `UEmpty` component. | [View on GitHub](https://github.com/vuelessjs/vueless/tree/main/src/ui.text-empty)
 */
export default {
  id: "4080",
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
      ${allSlotsFragment}
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

const SizesTemplate = (args, { argTypes } = {}) => ({
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
        <UButton label="Add new one" size="sm" variant="thirdary" filled />
    </template>
  `,
};
