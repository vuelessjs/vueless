import { getArgTypes } from "vueless/service.storybook";

import UCard from "vueless/ui.container-card";
import UInput from "vueless/ui.form-input";
import UButton from "vueless/ui.button";
import UIcon from "vueless/ui.image-icon";
import UHeader from "vueless/ui.text-header";

export default {
  title: "Containers / Card",
  component: UCard,
  args: {
    title: "Card title",
    slotDefaultTemplate: `
    <template #default>
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
    </template>
  `,
  },
  argTypes: {
    ...getArgTypes(UCard.name),
  },
};

const DefaultTemplate = (args) => ({
  components: { UCard, UButton, UInput, UIcon, UHeader },
  setup() {
    return { args };
  },
  template: `
    <UCard v-bind="args">
      ${args.slotDefaultTemplate}
      ${args.slotTemplate || ""}
    </UCard>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {
  slotTemplate: `
    <template #default>
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
    </template>
  `,
};

export const description = DefaultTemplate.bind({});
description.args = { description: "Card description" };

export const slotHeaderLeftBefore = DefaultTemplate.bind({});
slotHeaderLeftBefore.args = {
  slotTemplate: `
    <template #header-left-before>
      <UIcon
        name="star"
        color="gray"
        pill-filled
      />
    </template>
  `,
};

export const slotHeaderLeft = DefaultTemplate.bind({});
slotHeaderLeft.args = {
  slotTemplate: `
    <template #header-left>
      <UHeader size="lg" text="Large title" />
    </template>
  `,
};

export const slotHeaderLeftAfter = DefaultTemplate.bind({});
slotHeaderLeftAfter.args = {
  slotTemplate: `
    <template #header-left-after>
      <UIcon
        name="star"
        color="gray"
        pill-filled
      />
    </template>
  `,
};

export const slotHeaderRight = DefaultTemplate.bind({});
slotHeaderRight.args = {
  slotTemplate: `
    <template #header-right>
      <UButton size="sm" color="gray" text="some button" />
    </template>
  `,
};

export const slotFooterLeft = DefaultTemplate.bind({});
slotFooterLeft.args = {
  slotTemplate: `
    <template #footer-left>
      <UButton text="some button" />
    </template>
  `,
};

export const slotFooterRight = DefaultTemplate.bind({});
slotFooterRight.args = {
  slotTemplate: `
    <template #footer-right>
      <UButton text="some button" />
    </template>
  `,
};
