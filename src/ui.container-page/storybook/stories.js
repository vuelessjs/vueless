import { getArgTypes, getSlotNames, getSlotsFragment } from "../../utils/utilStorybook.js";

import UPage from "../../ui.container-page/UPage.vue";
import UCard from "../../ui.container-card/UCard.vue";
import URow from "../../ui.container-row/URow.vue";
import UInput from "../../ui.form-input/UInput.vue";
import UTextarea from "../../ui.form-textarea/UTextarea.vue";
import UButton from "../../ui.button/UButton.vue";
import UIcon from "../../ui.image-icon/UIcon.vue";
import UHeader from "../../ui.text-header/UHeader.vue";

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
    ...getArgTypes(UPage.name),
  },
};

const defaultTemplate = `
  <UCard title="Card title">
    <URow>
      <UInput label="Name" />
      <UInput label="Lastname" />
    </URow>
    <UTextarea class="mb-7 mt-4" label="Comments" rows="3" />
  </UCard>
`;

const DefaultTemplate = (args) => ({
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
    const slots = getSlotNames(UPage.name);

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

export const titleSizeSm = DefaultTemplate.bind({});
titleSizeSm.args = { titleSize: "sm" };

export const classes = DefaultTemplate.bind({});
classes.args = {
  classes: {
    header: "text-violet-300",
  },
};

export const description = DefaultTemplate.bind({});
description.args = { description: "Page description" };

export const width = DefaultTemplate.bind({});
width.args = { width: "md", title: "Width = md" };

export const widePage = DefaultTemplate.bind({});
widePage.args = { widePage: true, width: "sm" };

export const backRoute = DefaultTemplate.bind({});
backRoute.args = {
  backLabel: "back",
  backRoute: {
    path: "/",
    params: {},
  },
};

export const slotHeaderLeftBefore = DefaultTemplate.bind({});
slotHeaderLeftBefore.args = {
  slotTemplate: `
    <template #header-left-before>
      <UIcon
        name="close"
        color="gray"
      />
    </template>
    ${defaultTemplate}
  `,
};

export const slotHeaderLeft = DefaultTemplate.bind({});
slotHeaderLeft.args = {
  slotTemplate: `
    <template #header-left>
      <UHeader size="lg" label="Large title" />
    </template>
    ${defaultTemplate}
  `,
};

export const slotHeaderLeftAfter = DefaultTemplate.bind({});
slotHeaderLeftAfter.args = {
  slotTemplate: `
    <template #header-left-after>
      <UIcon
        name="close"
        color="gray"
      />
    </template>
    ${defaultTemplate}
  `,
};

export const slotHeaderRight = DefaultTemplate.bind({});
slotHeaderRight.args = {
  slotTemplate: `
    <template #header-right>
      <UButton size="sm" color="gray" label="button" />
    </template>
    ${defaultTemplate}
  `,
};

export const slotFooterLeft = DefaultTemplate.bind({});
slotFooterLeft.args = {
  slotTemplate: `
    ${defaultTemplate}
    <template #footer-left>
        <UButton label="button" />
    </template>
  `,
};

export const slotFooterRight = DefaultTemplate.bind({});
slotFooterRight.args = {
  slotTemplate: `
    ${defaultTemplate}
    <template #footer-right>
      <UButton label="button" />
    </template>
  `,
};