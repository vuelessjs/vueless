import {
  getArgTypes,
  getSlotNames,
  getSlotsFragment,
  getDocsDescription,
} from "../../utils/storybook.ts";

import UPage from "../../ui.container-page/UPage.vue";
import UCard from "../../ui.container-card/UCard.vue";
import URow from "../../ui.container-row/URow.vue";
import UInput from "../../ui.form-input/UInput.vue";
import UTextarea from "../../ui.form-textarea/UTextarea.vue";
import UButton from "../../ui.button/UButton.vue";
import UIcon from "../../ui.image-icon/UIcon.vue";
import UHeader from "../../ui.text-header/UHeader.vue";

import type { Meta, StoryFn } from "@storybook/vue3";
import type { UPageProps } from "../types.ts";

interface UPageArgs extends UPageProps {
  slotTemplate?: string;
}

/**
 * The `UPage` component. | [View on GitHub](https://github.com/vuelessjs/vueless/tree/main/src/ui.container-page)
 */
export default {
  id: "5090",
  title: "Containers / Page",
  component: UPage,
  args: {
    title: "Title",
    gray: true,
  },
  argTypes: {
    ...getArgTypes(UPage.__name),
  },
  parameters: {
    ...getDocsDescription(UPage.__name),
  },
} as Meta;

const defaultTemplate = `
  <UCard title="Card title">
    <URow>
      <UInput label="Name" />
      <UInput label="Lastname" />
    </URow>
    <UTextarea class="mb-7 mt-4" label="Comments" rows="3" />
  </UCard>
`;

const DefaultTemplate: StoryFn<UPageArgs> = (args: UPageArgs) => ({
  components: {
    UPage,
    UCard,
    URow,
    UInput,
    UTextarea,
    UButton,
    UIcon,
    UHeader,
  },
  setup() {
    const slots = getSlotNames(UPage.__name);

    return { args, slots };
  },
  template: `
    <UPage v-bind="args">
      ${args.slotTemplate || getSlotsFragment(defaultTemplate)}
    </UPage>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const TitleSizeSm = DefaultTemplate.bind({});
TitleSizeSm.args = { titleSize: "sm" };

export const Description = DefaultTemplate.bind({});
Description.args = { description: "Page description" };

export const Size = DefaultTemplate.bind({});
Size.args = { size: "sm", title: "size = md" };

export const BackLink = DefaultTemplate.bind({});
BackLink.args = {
  backLabel: "back",
  backTo: {
    path: "/",
  },
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

export const SlotBeforeTitle = DefaultTemplate.bind({});
SlotBeforeTitle.args = {
  slotTemplate: `
    <template #before-title>
      <UIcon name="close" color="gray" />
    </template>
    ${defaultTemplate}
  `,
};

export const SlotAfterTitle = DefaultTemplate.bind({});
SlotAfterTitle.args = {
  slotTemplate: `
    <template #after-title>
      <UIcon name="close" color="gray" />
    </template>
    ${defaultTemplate}
  `,
};

export const SlotHeaderRight = DefaultTemplate.bind({});
SlotHeaderRight.args = {
  slotTemplate: `
    <template #header-right>
      <UButton size="sm" color="gray" label="button" />
    </template>
    ${defaultTemplate}
  `,
};

export const SlotFooterLeft = DefaultTemplate.bind({});
SlotFooterLeft.args = {
  slotTemplate: `
    ${defaultTemplate}
    <template #footer-left>
        <UButton label="button" />
    </template>
  `,
};

export const SlotFooterRight = DefaultTemplate.bind({});
SlotFooterRight.args = {
  slotTemplate: `
    ${defaultTemplate}
    <template #footer-right>
      <UButton label="button" />
    </template>
  `,
};
