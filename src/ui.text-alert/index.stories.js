import { getArgTypes, getSlotNames, getSlotsFragment } from "../service.storybook";

import UAlert from "../ui.text-alert";
import URow from "../ui.container-row";
import UCol from "../ui.container-col";
import UIcon from "../ui.image-icon";

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
    ...getArgTypes(UAlert.name),
  },
};

const DefaultTemplate = (args) => ({
  components: { UAlert, UIcon, URow },
  setup() {
    const slots = getSlotNames(UAlert.name);

    return { args, slots };
  },
  template: `
    <UAlert v-bind="args">
      ${args.slotTemplate || getSlotsFragment()}
    </UAlert>
  `,
});

const EnumVariantTemplate = (args, { argTypes } = {}) => ({
  components: { UAlert, UCol },
  setup() {
    function getText(value) {
      return `This is Alert's ${value} size`;
    }

    let prefixedOptions = argTypes[args.enum].options;

    if (argTypes[args.enum].name === "size") {
      prefixedOptions = prefixedOptions.map((option) => getText(option));
    }

    return { args, options: argTypes[args.enum].options, prefixedOptions };
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

export const variants = EnumVariantTemplate.bind({});
variants.args = { enum: "variant" };

export const colors = EnumVariantTemplate.bind({});
colors.args = { enum: "color" };

export const sizes = EnumVariantTemplate.bind({});
sizes.args = { enum: "size" };

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

export const closable = DefaultTemplate.bind({});
closable.args = {
  closable: true,
  slotTemplate: `
    This story demonstrates closable prop.
  `,
};

export const paragraphs = DefaultTemplate.bind({});
paragraphs.args = {
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

export const list = DefaultTemplate.bind({});
list.args = {
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

export const slotTitleAndDescription = DefaultTemplate.bind({});
slotTitleAndDescription.args = {
  slotTemplate: `
    <template #title>
      <div class="text-lg font-semibold">This is a custom title for the alert.</div>
    </template>
    <template #description>
      <div class="italic">This is a custom description for the alert.</div>
    </template>
  `,
};

export const slotClosable = DefaultTemplate.bind({});
slotClosable.args = {
  closable: true,
  slotTemplate: `
    <template #closable>
      <UIcon
        name="block"
        color="white"
        size="md"
      />
    </template>
  `,
};

export const slotLeft = DefaultTemplate.bind({});
slotLeft.args = {
  slotTemplate: `
    <template #left>
      <UIcon
        name="star"
        color="gray"
      />
    </template>
  `,
};

export const slotRight = DefaultTemplate.bind({});
slotRight.args = {
  slotTemplate: `
    <template #right>
        <UIcon
        name="star"
        color="gray"
      />
    </template>
  `,
};

export const slotTop = DefaultTemplate.bind({});
slotTop.args = {
  slotTemplate: `
    <template #top>
      <UIcon
        name="star"
        color="gray"
      />
    </template>
  `,
};

export const slotBottom = DefaultTemplate.bind({});
slotBottom.args = {
  slotTemplate: `
    <template #bottom>
      <UIcon
        name="star"
        color="gray"
      />
    </template>
  `,
};
