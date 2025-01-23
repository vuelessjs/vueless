import { getArgTypes, getSlotNames, getSlotsFragment } from "../../utils/storybook.ts";

import UBreadcrumbs from "../../ui.navigation-breadcrumbs/UBreadcrumbs.vue";
import UCol from "../../ui.container-col/UCol.vue";
import UBadge from "../../ui.text-badge/UBadge.vue";
import UButton from "../../ui.button/UButton.vue";

import type { Meta, StoryFn } from "@storybook/vue3";
import type { Props } from "../types.ts";

interface UBreadcrumbsArgs extends Props {
  slotTemplate?: string;
  enum: "size";
}

interface UBreadcrumbsArgs extends Props {
  slotTemplate?: string;
}

export default {
  id: "8030",
  title: "Navigation / Breadcrumbs",
  component: UBreadcrumbs,
  args: {
    links: [
      { label: "Vueless Docs", href: "https://docs.vueless.com/" },
      { label: "Global Customization", href: "https://docs.vueless.com/global-customization/" },
      { label: "Rounding", href: "https://docs.vueless.com/global-customization/rounding" },
    ],
    target: "_blank",
  },
  argTypes: {
    ...getArgTypes(UBreadcrumbs.__name),
  },
} as Meta;

const DefaultTemplate: StoryFn<UBreadcrumbsArgs> = (args: UBreadcrumbsArgs) => ({
  components: { UBreadcrumbs },
  setup() {
    const slots = getSlotNames(UBreadcrumbs.__name);

    return { args, slots };
  },
  template: `
    <UBreadcrumbs v-bind="args">
      ${args.slotTemplate || getSlotsFragment("")}
    </UBreadcrumbs>
  `,
});

const EnumVariantTemplate: StoryFn<UBreadcrumbsArgs> = (args: UBreadcrumbsArgs, { argTypes }) => ({
  components: { UBreadcrumbs, UCol },
  setup() {
    return {
      args,
      options: argTypes?.[args.enum]?.options,
    };
  },
  template: `
    <UCol>
      <UBreadcrumbs
        v-for="(option, index) in options"
        :key="index"
        v-bind="args"
        :[args.enum]="option"
      />
    </UCol>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const Sizes = EnumVariantTemplate.bind({});
Sizes.args = { enum: "size" };

export const Styles = DefaultTemplate.bind({});
Styles.args = { color: "green", dashed: true };
Styles.parameters = {
  docs: {
    description: {
      story:
        "For a full list of ULink's supported colors, underlined/dashed styles, etc., see the [ULink Documentation](https://ui.vueless.com/?path=/docs/1060--docs).",
    },
  },
};

export const LinkStates = DefaultTemplate.bind({});
LinkStates.args = {
  links: [
    { label: "Default link", href: "https://vueless.com/" },
    { label: "Empty link (no `route` or `href` properties)" },
    {
      label: "Manually disabled link",
      href: "https://docs.vueless.com/",
      disabled: true,
    },
  ],
};
LinkStates.parameters = {
  docs: {
    description: {
      story:
        // eslint-disable-next-line vue/max-len
        "A breadcrumb is automatically disabled, if: <br /> - it does not have both `route` and `href` properties; <br /> - it has `disabled` property set to `true.",
    },
  },
};

export const LinkIcon = DefaultTemplate.bind({});
LinkIcon.args = {
  links: [
    { label: "Vueless", href: "https://vueless.com/", icon: "palette" },
    { label: "Settings", icon: "settings" },
    { label: "Breadcrumbs", href: "https://ui.vueless.com/?path=/docs/8030--docs" },
  ],
};
LinkIcon.parameters = {
  docs: {
    description: {
      story:
        "You can pass an icon for a specific breadcrumb in the `links` array via the `icon` property.",
    },
  },
};

export const Slots: StoryFn<UBreadcrumbsArgs> = (args) => ({
  components: { UBreadcrumbs, UBadge, UButton },
  setup() {
    return { args };
  },
  template: `
    <UBreadcrumbs v-bind="args">
      <template #icon="{ index }">
        <UBadge
          v-if="index === 1"
          label="Info"
          color="green"
          size="sm"
        />
      </template>
    </UBreadcrumbs>

    <UBreadcrumbs v-bind="args">
      <template #label="{ label, index }">
        <UButton v-if="index === 0" :label="label" size="2xs" />
      </template>
    </UBreadcrumbs>

    <UBreadcrumbs v-bind="args">
      <template #divider="{ index }">
        <span>/</span>
      </template>
    </UBreadcrumbs>
  `,
});
