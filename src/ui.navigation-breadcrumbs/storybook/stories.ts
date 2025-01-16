import { getArgTypes, getSlotNames, getSlotsFragment } from "../../utils/storybook.ts";

import UBreadcrumbs from "../../ui.navigation-breadcrumbs/UBreadcrumbs.vue";
import UCol from "../../ui.container-col/UCol.vue";

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
      { label: "Vueless", href: "https://vueless.com/" },
      { label: "Empty link" },
      {
        label: "Breadcrumbs",
        href: "https://ui.vueless.com/?path=/docs/8030--docs",
        disabled: true,
      },
      { label: "Vueless", href: "https://docs.vueless.com/" },
    ],
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
Default.parameters = {
  docs: {
    description: {
      story:
        // eslint-disable-next-line vue/max-len
        "A breadcrumb is automatically disabled, if: <br /> - it does not have both `route` and `href` properties; <br /> - it has `disabled` property set to `true`; <br /> - it is the last one in the array.",
    },
  },
};

export const Sizes = EnumVariantTemplate.bind({});
Sizes.args = { enum: "size" };
Sizes.parameters = {
  docs: {
    description: {
      story: "Supported sizes: `sm`, `md`, `lg` ",
    },
  },
};

export const Colors = DefaultTemplate.bind({});
Colors.args = { color: "green" };
Colors.parameters = {
  docs: {
    description: {
      story:
        "For a full list of ULink's supported colors, see [ULink Colors Documentation](https://ui.vueless.com/?path=/docs/1060--docs#colors).",
    },
  },
};

export const LinkIcon = DefaultTemplate.bind({});
LinkIcon.args = {
  links: [
    { label: "Vueless", href: "https://vueless.com/", icon: "home" },
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
