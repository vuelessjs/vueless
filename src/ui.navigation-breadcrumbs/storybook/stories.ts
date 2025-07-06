import { getArgs, getArgTypes, getSlotNames, getSlotsFragment } from "../../utils/storybook.ts";

import UBreadcrumbs from "../../ui.navigation-breadcrumbs/UBreadcrumbs.vue";
import UCol from "../../ui.container-col/UCol.vue";
import UBadge from "../../ui.text-badge/UBadge.vue";
import UButton from "../../ui.button/UButton.vue";
import URow from "../../ui.container-row/URow.vue";
import UIcon from "../../ui.image-icon/UIcon.vue";
import ULabel from "../../ui.form-label/ULabel.vue";
import UText from "../../ui.text-block/UText.vue";

import type { Meta, StoryFn } from "@storybook/vue3";
import type { Props } from "../types.ts";

interface UBreadcrumbsArgs extends Props {
  slotTemplate?: string;
  enum: "size" | "color";
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
  components: { UBreadcrumbs, UButton, UBadge, UIcon },
  setup: () => ({ args, slots: getSlotNames(UBreadcrumbs.__name) }),
  template: `
    <UBreadcrumbs v-bind="args">
      ${args.slotTemplate || getSlotsFragment("")}
    </UBreadcrumbs>
  `,
});

const EnumTemplate: StoryFn<UBreadcrumbsArgs> = (args: UBreadcrumbsArgs, { argTypes }) => ({
  components: { UBreadcrumbs, UCol, URow, ULabel },
  setup: () => ({ args, argTypes, getArgs }),
  template: `
    <UBreadcrumbs
      v-for="option in argTypes?.[args.enum]?.options"
      :key="option"
      v-bind="getArgs(args, option)"
    />
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const Sizes = EnumTemplate.bind({});
Sizes.args = { enum: "size" };

export const Colors = EnumTemplate.bind({});
Colors.args = { enum: "color" };

export const UnderlineVariants: StoryFn<UBreadcrumbsArgs> = (args: UBreadcrumbsArgs) => ({
  components: { UBreadcrumbs, UText, UCol },
  setup: () => ({ args }),
  template: `
    <UCol gap="lg">
      <UCol gap="none">
        <UText label="Default" weight="semibold" variant="lifted" />
        <UBreadcrumbs :links="args.links" />
      </UCol>

      <UCol gap="none">
        <UText label="Dashed" weight="semibold" variant="lifted" />
        <UBreadcrumbs :links="args.links" dashed />
      </UCol>

      <UCol gap="none">
        <UText label="Underlined" weight="semibold" variant="lifted" />
        <UBreadcrumbs :links="args.links" underlined />
      </UCol>

      <UCol gap="none">
        <UText label="Without Underline" weight="semibold" variant="lifted" />
        <UBreadcrumbs :links="args.links" :underlined="false" />
      </UCol>
    </UCol>
  `,
});

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

export const Slots = DefaultTemplate.bind({});
Slots.args = {
  slotTemplate: `
    <template #before-link="{ index }">
      <UBadge
        v-if="index === 1"
        label="Info"
        color="success"
        size="sm"
      />
    </template>

    <template #after-link="{ index }">
      <UIcon
        v-if="index === 2"
        name="brightness_1"
        color="primary"
        size="xs"
      />
    </template>
  `,
};

export const LabelSlot = DefaultTemplate.bind({});
LabelSlot.args = {
  slotTemplate: `
    <template #label="{ label, index }">
      <UButton v-if="index === 0" :label="label" size="2xs" variant="soft" />
    </template>
  `,
};

export const DividerSlot = DefaultTemplate.bind({});
DividerSlot.args = {
  slotTemplate: `
    <template #divider>
      <UIcon name="double_arrow" size="xs" />
    </template>
  `,
};
