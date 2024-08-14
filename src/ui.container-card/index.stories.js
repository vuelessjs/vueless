import { getArgTypes, getSlotNames, getSlotsFragment } from "../service.storybook";

import UCard from "../ui.container-card";
import URow from "../ui.container-row";
import UInput from "../ui.form-input";
import UButton from "../ui.button";
import UIcon from "../ui.image-icon";
import UHeader from "../ui.text-header";

/**
 * The `UCard` component. | [View on GitHub](https://github.com/vuelessjs/vueless/tree/main/src/ui.container-card)
 */
export default {
  id: "5060",
  title: "Containers / Card",
  component: UCard,
  args: {
    title: "Title",
    defaultTemplate: `
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
        sed do eiusmod tempor incididunt ut labore et dolore magna
        aliqua. Ut enim ad minim veniam, quis nostrud exercitation
        ullamco laboris nisi ut aliquip ex ea commodo consequat.
        Duis aute irure dolor in reprehenderit in voluptate velit
        esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia
        deserunt mollit anim id est laborum.
      </p>
    `,
  },
  argTypes: {
    ...getArgTypes(UCard.name),
  },
};

const DefaultTemplate = (args) => ({
  components: { UCard, UButton, UInput, UIcon, UHeader },
  setup() {
    const slots = getSlotNames(UCard.name);

    return { args, slots };
  },
  template: `
    <UCard v-if="args.slotTemplate" v-bind="args">
      ${args.slotTemplate}
      ${args.defaultTemplate}
    </UCard>
    <UCard v-else v-bind="args">
      ${getSlotsFragment(args.defaultTemplate)}
    </UCard>
  `,
});

const EnumVariantTemplate = (args, { argTypes } = {}) => ({
  components: { UCard, URow },
  setup() {
    return {
      args,
      options: argTypes[args.enum].options,
    };
  },
  template: `
    <URow>
      <UCard
        v-for="(option, index) in options"
        v-bind="args"
        :[args.enum]="option"
        :key="index"
      >
        ${args.defaultTemplate}
      </UCard>
    </URow>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const description = DefaultTemplate.bind({});
description.args = { description: "Card description" };

export const padding = EnumVariantTemplate.bind({});
padding.args = { enum: "padding" };

export const slotHeaderLeftBefore = DefaultTemplate.bind({});
slotHeaderLeftBefore.args = {
  slotTemplate: `
    <template #header-left-before>
      <UIcon
        name="star"
        size="sm"
        pill
      />
    </template>
  `,
};

export const slotHeaderLeft = DefaultTemplate.bind({});
slotHeaderLeft.args = {
  slotTemplate: `
    <template #header-left>
      <UHeader size="lg" label="Large title" />
    </template>
  `,
};

export const slotHeaderLeftAfter = DefaultTemplate.bind({});
slotHeaderLeftAfter.args = {
  slotTemplate: `
    <template #header-left-after>
      <UIcon
        name="star"
        size="sm"
        pill
      />
    </template>
  `,
};

export const slotHeaderRight = DefaultTemplate.bind({});
slotHeaderRight.args = {
  slotTemplate: `
    <template #header-right>
      <UButton size="sm" color="gray" label="Read more" />
    </template>
  `,
};

export const slotFooterLeft = DefaultTemplate.bind({});
slotFooterLeft.args = {
  slotTemplate: `
    <template #footer-left>
      <UButton label="Read more" />
    </template>
  `,
};

export const slotFooterRight = DefaultTemplate.bind({});
slotFooterRight.args = {
  slotTemplate: `
    <template #footer-right>
      <UButton label="Read more" />
    </template>
  `,
};
