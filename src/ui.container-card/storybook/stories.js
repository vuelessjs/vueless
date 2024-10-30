import { getArgTypes, getSlotNames, getSlotsFragment } from "../../utils/utilStorybook.ts";

import UCard from "../../ui.container-card/UCard.vue";
import UInput from "../../ui.form-input/UInput.vue";
import UButton from "../../ui.button/UButton.vue";
import UIcon from "../../ui.image-icon/UIcon.vue";
import UHeader from "../../ui.text-header/UHeader.vue";

/**
 * The `UCard` component. | [View on GitHub](https://github.com/vuelessjs/vueless/tree/main/src/ui.container-card)
 */
export default {
  id: "5060",
  title: "Containers / Card",
  component: UCard,
  args: {
    title: "Title",
  },
  argTypes: {
    ...getArgTypes(UCard.__name),
  },
};

const defaultTemplate = `
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
`;

const DefaultTemplate = (args) => ({
  components: { UCard, UButton, UInput, UIcon, UHeader },
  setup() {
    const slots = getSlotNames(UCard.__name);

    return { args, slots };
  },
  template: `
    <UCard v-bind="args">
      ${args.slotTemplate || getSlotsFragment(defaultTemplate)}
    </UCard>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const Description = DefaultTemplate.bind({});
Description.args = { description: "Card description" };

export const SlotHeaderLeftBefore = DefaultTemplate.bind({});
SlotHeaderLeftBefore.args = {
  slotTemplate: `
    <template #header-left-before>
      <UIcon name="star" size="sm" />
    </template>
    ${defaultTemplate}
  `,
};

export const SlotHeaderLeft = DefaultTemplate.bind({});
SlotHeaderLeft.args = {
  slotTemplate: `
    <template #header-left>
      <UHeader size="lg" label="Large title" />
    </template>
    ${defaultTemplate}
  `,
};

export const SlotHeaderLeftAfter = DefaultTemplate.bind({});
SlotHeaderLeftAfter.args = {
  slotTemplate: `
    <template #header-left-after>
      <UIcon name="star" size="sm" />
    </template>
    ${defaultTemplate}
  `,
};

export const SlotHeaderRight = DefaultTemplate.bind({});
SlotHeaderRight.args = {
  slotTemplate: `
    <template #header-right>
      <UButton size="sm" color="gray" label="Read more" />
    </template>
    ${defaultTemplate}
  `,
};

export const SlotFooterLeft = DefaultTemplate.bind({});
SlotFooterLeft.args = {
  slotTemplate: `
    ${defaultTemplate}
    <template #footer-left>
      <UButton size="sm" label="Read more" />
    </template>
  `,
};

export const SlotFooterRight = DefaultTemplate.bind({});
SlotFooterRight.args = {
  slotTemplate: `
    ${defaultTemplate}
    <template #footer-right>
      <UButton size="sm" label="Read more" />
    </template>
  `,
};
