import type { Meta, StoryFn } from "@storybook/vue3";
import { getArgTypes, getSlotNames, getSlotsFragment } from "../../utils/storybook.ts";

import UAlert from "../../ui.text-alert/UAlert.vue";
import URow from "../../ui.container-row/URow.vue";
import UCol from "../../ui.container-col/UCol.vue";
import UIcon from "../../ui.image-icon/UIcon.vue";
import UButton from "../../ui.button/UButton.vue";

import type { UAlertProps } from "../types.ts";

interface UAlertArgs extends UAlertProps {
  slotTemplate?: string;
  enum: "size" | "color" | "variant";
}

/**
 * The `UAlert` component. | [View on GitHub](https://github.com/vuelessjs/vueless/tree/main/src/ui.text-alert)
 */
export default {
  id: "4030",
  title: "Text & Content / Alert",
  component: UAlert,
  args: {
    title: "Default Title",
    description: "Default Description",
  },
  argTypes: {
    ...getArgTypes(UAlert.__name),
  },
} as Meta;

const DefaultTemplate: StoryFn<UAlertArgs> = (args: UAlertArgs) => ({
  components: { UAlert, UIcon, URow, UButton },
  setup() {
    const slots = getSlotNames(UAlert.__name);

    return { args, slots };
  },
  template: `
    <UAlert v-bind="args">
      ${args.slotTemplate || getSlotsFragment("")}
    </UAlert>
  `,
});

const EnumVariantTemplate: StoryFn<UAlertArgs> = (args: UAlertArgs, { argTypes }) => ({
  components: { UAlert, UCol },
  setup() {
    function getText(value: string) {
      return `This is Alert's ${value} size`;
    }

    let prefixedOptions = argTypes?.[args.enum]?.options;

    if (argTypes?.[args.enum]?.name === "size") {
      prefixedOptions = prefixedOptions?.map((option) => getText(option));
    }

    return { args, options: argTypes?.[args.enum]?.options, prefixedOptions };
  },
  template: `
    <UCol align="stretch">
      <UAlert
        v-for="(option, index) in options"
        :key="index"
        v-bind="args"
        :[args.enum]="option"
        :title="prefixedOptions[index]"
      />
    </UCol>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const Variants = EnumVariantTemplate.bind({});
Variants.args = { enum: "variant" };

export const Colors = EnumVariantTemplate.bind({});
Colors.args = { enum: "color" };

export const Sizes = EnumVariantTemplate.bind({});
Sizes.args = { enum: "size" };

export const HTML = DefaultTemplate.bind({});
HTML.args = {
  title: "",
  description: "",
  slotTemplate: `
    <h3 class="text-lg font-medium mb-2">Important Security Update</h3>
    <p class="mb-0.5">
      <b>Your account password will expire in 10 days,</b> please update it to maintain account security.
    </p>
    <a href="https://security.example.com/password-update" target="_blank">Update Password</a>
  `,
};

export const Closable = DefaultTemplate.bind({});
Closable.args = { closable: true };

export const Paragraphs = DefaultTemplate.bind({});
Paragraphs.args = {
  slotTemplate: `
    <template #default>
      <p>
        Please be aware that the scheduled maintenance will occur this Saturday,
        from 12 AM to 4 AM. During this time, some services may be temporarily
        unavailable.
      </p>
      <p>
        We apologize for any inconvenience this may cause and
        appreciate your understanding. Our team is committed to improving
        the system's performance and reliability.
      </p>
    </template>
  `,
};

export const List = DefaultTemplate.bind({});
List.args = {
  slotTemplate: `
    <URow>
      <ul>
        <li>Check your email for verification link.</li>
        <li>Update your password regularly to enhance security.</li>
        <li>Enable two-factor authentication for added protection.</li>
      </ul>
      <ol>
        <li>Sign in to your account using your credentials.</li>
        <li>Navigate to the settings menu to update your profile.</li>
        <li>Review your privacy settings and adjust them as needed.</li>
      </ol>
    </URow>
  `,
};

export const SlotTitleAndDescription = DefaultTemplate.bind({});
SlotTitleAndDescription.args = {
  slotTemplate: `
    <template #title>
      <div class="text-lg font-semibold">This is a custom title for the alert.</div>
    </template>
    <template #description>
      <div class="italic">This is a custom description for the alert.</div>
    </template>
  `,
};

export const SlotClose = DefaultTemplate.bind({});
SlotClose.args = {
  closable: true,
  slotTemplate: `
    <template #close>
      <UButton
        variant="primary"
        color="white"
        size="sm"
        label="Close"
      />
    </template>
  `,
};

export const SlotLeft = DefaultTemplate.bind({});
SlotLeft.args = {
  slotTemplate: `
    <template #left>
      <UIcon
        name="star"
        color="gray"
      />
    </template>
  `,
};

export const SlotRight = DefaultTemplate.bind({});
SlotRight.args = {
  slotTemplate: `
    <template #right>
        <UIcon
        name="star"
        color="gray"
      />
    </template>
  `,
};

export const SlotTop = DefaultTemplate.bind({});
SlotTop.args = {
  slotTemplate: `
    <template #top>
      <UIcon
        name="star"
        color="gray"
      />
    </template>
  `,
};

export const SlotBottom = DefaultTemplate.bind({});
SlotBottom.args = {
  slotTemplate: `
    <template #bottom>
      <UIcon
        name="star"
        color="gray"
      />
    </template>
  `,
};
