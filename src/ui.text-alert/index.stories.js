import { getArgTypes, getSlotNames } from "../service.storybook";

import UAlert from "../ui.text-alert";
import URow from "../ui.container-row";
import UGroup from "../ui.container-group";
import UIcon from "../ui.image-icon";
import UText from "../ui.text-block";

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
  <UText size="size">
    <p>
      <b>Please note that your session is about to expire </b>
      <u>in 5 minutes,</u>
      <em> so make sure to save your work to avoid any data loss. </em>
      <a href="https://uk.wikipedia.org/wiki/Lorem_ipsum" target="_blank">Wikipedia</a>
    </p>
  </UText>
`;

const DefaultTemplate = (args) => ({
  components: { UAlert, UIcon, UText },
  setup() {
    const slots = getSlotNames(UAlert.name);

    return { args, slots };
  },
  template: `
    <UAlert v-bind="args" v-model="args.value">
      ${args.template || defaultTemplate}
    </UAlert>
  `,
});

const SlotTemplate = (args) => ({
  components: { UAlert, UIcon, UText },
  setup() {
    return { args };
  },
  template: `
    <UAlert v-bind="args" v-model="args.value">
      ${args.slotTemplate}
      ${defaultTemplate}
    </UAlert>
  `,
});

const VariantsTemplate = (args, { argTypes } = {}) => ({
  components: { UAlert, UGroup },
  setup() {
    return {
      args,
      variants: argTypes.variant.options,
    };
  },
  template: `
    <UGroup>
      <UAlert
        v-for="(variant, index) in variants"
        v-bind="args"
        :variant="variant"
        :key="index"
        :title="variant"
        color="gray"
      />
    </UGroup>
  `,
});

const ColorsTemplate = (args, { argTypes } = {}) => ({
  components: { UAlert, URow },
  setup() {
    return {
      args,
      colors: argTypes.color.options,
    };
  },
  template: `
    <URow>
      <UAlert
        v-for="(color, index) in colors"
        v-bind="args"
        :color="color"
        :title="color"
        :key="index"
      />
    </URow>
  `,
});

const SizeTemplate = (args, { argTypes } = {}) => ({
  components: { UAlert, URow },
  setup() {
    return {
      args,
      sizes: argTypes.size.options,
    };
  },
  template: `
    <URow>
      <UAlert
        v-for="(size, index) in sizes"
        v-bind="args"
        :size="size"
        :key="index"
      >
        text
      </UAlert>
    </URow>
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

export const variants = VariantsTemplate.bind({});
variants.args = {};

export const colors = ColorsTemplate.bind({});
colors.args = {};

export const sizes = SizeTemplate.bind({});
sizes.args = {};

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
  template: `
    <template #default>
      some text
    </template>
  `,
};

export const paragraphs = DefaultTemplate.bind({});
paragraphs.args = {
  template: `
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
  template: `
      <URow>
        <UText>
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
        </UText>
      </URow>
    `,
};

export const slotTitleAndDescription = SlotTemplate.bind({});
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

export const slotAlertLeft = SlotTemplate.bind({});
slotAlertLeft.args = {
  slotTemplate: `
    <template #left>
      <UIcon
        name="star"
        color="gray"
      />
    </template>
  `,
};

export const slotAlertRight = SlotTemplate.bind({});
slotAlertRight.args = {
  slotTemplate: `
    <template #right>
        <UIcon
        name="star"
        color="gray"
      />
    </template>
  `,
};

export const slotAlertTop = SlotTemplate.bind({});
slotAlertTop.args = {
  slotTemplate: `
    <template #top>
      <UIcon
        name="star"
        color="gray"
      />
    </template>
  `,
};

export const slotAlertBottom = SlotTemplate.bind({});
slotAlertBottom.args = {
  slotTemplate: `
    <template #bottom>
      <UIcon
        name="star"
        color="gray"
      />
    </template>
  `,
};
