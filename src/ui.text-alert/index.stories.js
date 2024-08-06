import { getArgTypes, getSlotNames } from "../service.storybook";

import UAlert from "../ui.text-alert";
import URow from "../ui.container-row";
import UGroup from "../ui.container-group";
import UIcon from "../ui.image-icon";

/**
 * The `UAlert` component. | [View on GitHub](https://github.com/vuelessjs/vueless/tree/main/src/ui.text-alert)
 */
export default {
  id: "4030",
  title: "Text & Content / Alert",
  component: UAlert,
  args: {},
  argTypes: {
    ...getArgTypes(UAlert.name),
  },
};

const defaultTemplate = `
  <p>
    <b>Please note that your session is about to expire </b>
    <u>in 5 minutes,</u>
    <em> so make sure to save your work to avoid any data loss. </em>
    <a href="https://uk.wikipedia.org/wiki/Lorem_ipsum" target="_blank">Wikipedia</a>
  </p>
`;

const DefaultTemplate = (args) => ({
  components: { UAlert, UIcon, URow },
  setup() {
    const slots = getSlotNames(UAlert.name);

    return { args, slots };
  },
  template: `
    <UAlert v-bind="args" v-model="args.value">
      ${args.slotTemplate || defaultTemplate}
    </UAlert>
  `,
});

const EnumVariantTemplate = (args, { argTypes } = {}) => ({
  components: { UAlert, UGroup, URow },
  setup() {
    const options = argTypes[args.enum].options;

    let prefixedOptions = [];

    if (argTypes[args.enum].name === "size") {
      prefixedOptions = options.map((option) => getText(option));
    } else {
      prefixedOptions = options;
    }

    function getText(value) {
      return `This is Alert's ${value} size`;
    }

    return { args, options: argTypes[args.enum].options, prefixedOptions };
  },
  template: `
    <UGroup>
      <URow>
        <UAlert
          v-for="(option, index) in options"
          v-bind="args"
          :[args.enum]="option"
          :key="index"
          :title="prefixedOptions[index]"
        />
      </URow>
    </UGroup>
  `,
});

const HTMLTemplate = (args) => ({
  components: { UAlert },
  setup() {
    return { args };
  },
  template: `
    <UAlert :html="args.html"  />
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {
  title: "Default Title",
  description: "Default Description",
};

export const variants = EnumVariantTemplate.bind({});
variants.args = { enum: "variant" };

export const colors = EnumVariantTemplate.bind({});
colors.args = { enum: "color" };

export const sizes = EnumVariantTemplate.bind({});
sizes.args = { enum: "size" };

export const HTML = HTMLTemplate.bind({});
HTML.args = {
  html: `
    <p>
      <b>Important Security Update: </b>
      <u>Your account password will expire in 10 days,</u>
      <em> please update it to maintain account security. </em>
      <a href="https://security.example.com/password-update" target="_blank">Update Password</a>
    </p>
  `,
};

export const closable = DefaultTemplate.bind({});
closable.args = {
  closable: true,
  slotTemplate: `
    <template #default>
      some text
    </template>
  `,
};

export const paragraphs = DefaultTemplate.bind({});
paragraphs.args = {
  slotTemplate: `
    <template #default>
      <p>
        Please be aware that the scheduled maintenance will occur this Saturday,
        from 12 AM to 4 AM. During this time, some services may be temporarily
        unavailable. We apologize for any inconvenience this may cause and
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
    ${defaultTemplate}
    <template #title>
      <div class="text-lg font-semibold">This is a custom title for the alert.</div>
    </template>
    <template #description>
      <div class="italic">This is a custom description for the alert.</div>
    </template>
  `,
};

export const slotAlertLeft = DefaultTemplate.bind({});
slotAlertLeft.args = {
  slotTemplate: `
    ${defaultTemplate}
    <template #left>
      <UIcon
        name="star"
        color="gray"
      />
    </template>
  `,
};

export const slotAlertRight = DefaultTemplate.bind({});
slotAlertRight.args = {
  slotTemplate: `
    ${defaultTemplate}
    <template #right>
        <UIcon
        name="star"
        color="gray"
      />
    </template>
  `,
};

export const slotAlertTop = DefaultTemplate.bind({});
slotAlertTop.args = {
  slotTemplate: `
    ${defaultTemplate}
    <template #top>
      <UIcon
        name="star"
        color="gray"
      />
    </template>
  `,
};

export const slotAlertBottom = DefaultTemplate.bind({});
slotAlertBottom.args = {
  slotTemplate: `
    ${defaultTemplate}
    <template #bottom>
      <UIcon
        name="star"
        color="gray"
      />
    </template>
  `,
};
