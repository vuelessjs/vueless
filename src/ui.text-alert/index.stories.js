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
  args: {
    text: "UHint",
    slotDefaultTemplate: `
      <template #default>
        <p>
          <b>Lorem ipsum dolor sit amet,</b>
          <u>consectetur adipiscing elit,</u>
          <em>sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua.</em>
          <a href="https://uk.wikipedia.org/wiki/Lorem_ipsum" target="_blank">Wikipedia</a>
        </p>
      </template>
    `,
  },
  argTypes: {
    ...getArgTypes(UAlert.name),
  },
};

const DefaultTemplate = (args) => ({
  components: { UAlert, UIcon },
  setup() {
    const slots = getSlotNames(UAlert.name);

    return { args, slots };
  },
  template: `
    <UAlert v-bind="args" v-model="args.value">
    ${args.slotDefaultTemplate}
    ${args.slotTemplate || ""}
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

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const variants = VariantsTemplate.bind({});
variants.args = {};

export const colors = ColorsTemplate.bind({});
colors.args = {};

export const size = SizeTemplate.bind({});
size.args = {};

export const closable = DefaultTemplate.bind({});
closable.args = {
  closable: true,
  slotDefaultTemplate: `
    <template #default>
      some text
    </template>
  `,
};

export const paragraphs = DefaultTemplate.bind({});
paragraphs.args = {
  slotDefaultTemplate: `
    <template #default>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
        sed do eiusmod tempor incididunt ut labore et dolore magna
        aliqua. Ut enim ad minim veniam, quis nostrud exercitation
        ullamco laboris nisi ut aliquip ex ea commodo consequat.
        Duis aute irure dolor in reprehenderit in voluptate velit
        esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia
        deserunt mollit anim id est laborum.
      </p>

    </template>
    `,
};

export const list = DefaultTemplate.bind({});
list.args = {
  slotDefaultTemplate: `
      <URow>
        <ul>
          <li> Lorem ipsum dolor </li>
          <li> Lorem ipsum dolor </li>
          <li> Lorem ipsum dolor </li>
        </ul>

        <ol>
          <li> Lorem ipsum dolor </li>
          <li> Lorem ipsum dolor </li>
          <li> Lorem ipsum dolor </li>
        </ol>
      </URow>
    `,
};

export const slotTitleAndDescription = DefaultTemplate.bind({});
slotTitleAndDescription.args = {
  slotTemplate: `
    <template #title>
      Alert Title
    </template>
    <template #description>
      This is a custom description for the alert.
    </template>
  `,
};

export const slotAlertLeft = DefaultTemplate.bind({});
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

export const slotAlertRight = DefaultTemplate.bind({});
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

export const slotAlertTop = DefaultTemplate.bind({});
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

export const slotAlertBottom = DefaultTemplate.bind({});
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
