import { getArgTypes } from "../service.storybook";

import UPage from "../ui.container-page";
import UCard from "../ui.container-card";
import URow from "../ui.container-row";
import UInput from "../ui.form-input";
import UTextarea from "../ui.form-textarea";
import UButton from "../ui.button";
import UIcon from "../ui.image-icon";
import UHeader from "../ui.text-header";

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
    slotDefaultTemplate: `
      <template #default>
        <UCard title="Card title">
          <URow>
            <UInput label="Name" />
            <UInput label="Lastname" />
          </URow>
          <UTextarea class="mb-7 mt-4" label="Comments" rows="3" />
        </UCard>
      </template>
    `,
  },
  argTypes: {
    ...getArgTypes(UPage.name),
  },
};

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
    return { args };
  },
  template: `
    <UPage v-bind="args">
      ${args.slotDefaultTemplate}
      ${args.slotTemplate || ""}
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
  backRoute: {
    name: "",
    title: "some route title",
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
        name="close"
        color="gray"
       />
    </template>
  `,
};

export const slotHeaderRight = DefaultTemplate.bind({});
slotHeaderRight.args = {
  slotTemplate: `
    <template #header-right>
       <UButton size="sm" color="gray" label="button" />
    </template>
  `,
};

export const slotFooterLeft = DefaultTemplate.bind({});
slotFooterLeft.args = {
  slotTemplate: `
    <template #footer-left>
        <UButton label="button" />
    </template>
  `,
};

export const slotFooterRight = DefaultTemplate.bind({});
slotFooterRight.args = {
  slotTemplate: `
    <template #footer-right>
        <UButton label="button" />
    </template>
  `,
};
