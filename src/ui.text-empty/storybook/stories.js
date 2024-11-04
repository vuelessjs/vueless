import { getArgTypes, getSlotNames, getSlotsFragment } from "../../utils/storybook.ts";

import UEmpty from "../../ui.text-empty/UEmpty.vue";
import UButton from "../../ui.button/UButton.vue";
import UIcon from "../../ui.image-icon/UIcon.vue";
import URow from "../../ui.container-row/URow.vue";

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
    ...getArgTypes(UEmpty.__name),
  },
};

const DefaultTemplate = (args) => ({
  components: { UEmpty, UIcon, UButton },
  setup() {
    const slots = getSlotNames(UEmpty.__name);

    return { args, slots };
  },
  template: `
    <UEmpty v-bind="args">
      ${args.slotTemplate || getSlotsFragment()}
    </UEmpty>
  `,
});

const EnumVariantTemplate = (args, { argTypes }) => ({
  components: { UEmpty, URow },
  setup() {
    return {
      args,
      options: argTypes[args.enum].options,
    };
  },
  template: `
    <URow>
      <UEmpty
        v-for="(option, index) in options"
        :key="index"
        v-bind="args"
        :[args.enum]="option"
        :title="option"
      />
    </URow>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const Sizes = EnumVariantTemplate.bind({});
Sizes.args = { enum: "size", title: "" };

export const SlotHeader = DefaultTemplate.bind({});
SlotHeader.args = {
  slotTemplate: `
    <template #header>
      <UIcon
        name="person"
        color="blue"
        size="2xl"
      />
    </template>
  `,
};

export const SlotDefault = DefaultTemplate.bind({});
SlotDefault.args = {
  slotTemplate: `
    <template #default>
      <span>Some unique <b><code>HTML</code></b> or <b><code>Components</code></b>...</span>
    </template>
  `,
};

export const SlotFooter = DefaultTemplate.bind({});
SlotFooter.args = {
  slotTemplate: `
    <template #footer>
      <UButton label="Add new one" size="sm" variant="thirdary" filled />
    </template>
  `,
};
