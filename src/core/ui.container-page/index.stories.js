import { getArgTypes } from "vueless/service.storybook";

import UPage from "vueless/ui.container-page";
import UCard from "vueless/ui.container-card";
import URow from "vueless/ui.container-row";
import UInput from "vueless/ui.form-input";
import UTextarea from "vueless/ui.form-textarea";
import UButton from "vueless/ui.button";
import UIcon from "vueless/ui.image-icon";
import UHeader from "vueless/ui.text-header";

export default {
  title: "Containers / Page",
  component: UPage,
  args: {
    title: "Page title",
    gray: true,
    slotDefaultTemplate: `
      <template #default>
        <UCard title="Card title">
          <URow>
            <UInput label="Name" />
            <UInput label="Lastname" />
          </URow>
          <UTextarea class="mb-7" label="Comments" rows="3" />
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

export const headerPadding = DefaultTemplate.bind({});
headerPadding.args = {
  headerPadding: true,
  slotTemplate: `
    <template #header-left>
      <UHeader size="lg" text="Some title" />
    </template>

     <template #header-right>
      <UButton size="sm" color="gray" text="button" />
    </template>
  `,
};

export const footerPadding = DefaultTemplate.bind({});
footerPadding.args = {
  footerPadding: true,
  slotTemplate: `
    <template #footer-left>
      <UButton text="button" />
    </template>

    <template #footer-right>
      <UButton text="button" />
    </template>
  `,
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
      <UHeader size="lg" text="Large title" />
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
       <UButton size="sm" color="gray" text="button" />
    </template>
  `,
};

export const slotFooterLeft = DefaultTemplate.bind({});
slotFooterLeft.args = {
  slotTemplate: `
    <template #footer-left>
        <UButton text="button" />
    </template>
  `,
};

export const slotFooterRight = DefaultTemplate.bind({});
slotFooterRight.args = {
  slotTemplate: `
    <template #footer-right>
        <UButton text="button" />
    </template>
  `,
};
