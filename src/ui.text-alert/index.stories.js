import { getArgTypes, getSlotNames } from "vueless/service.storybook";

import UAlert from "vueless/ui.text-alert";
import URow from "vueless/ui.container-row";
export default {
  title: "Text & Content / Alert",
  component: UAlert,
  args: {
    text: "U Hint",
    slotTemplate: `
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
  components: { UAlert },
  setup() {
    const slots = getSlotNames(UAlert.name);

    return { args, slots };
  },
  template: `
    <UAlert v-bind="args">
      ${args.slotTemplate || ""}
    </UAlert>
  `,
});

const ColorsTemplate = (args, { argTypes }) => ({
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
        :color="color"
        v-bind="args"
        :key="index"
      >
        ${args.slotTemplate}
      </UAlert>
    </URow>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const colors = ColorsTemplate.bind({});
colors.args = {
  closeButton: true,
  slotTemplate: `
     <template #default>
       text
     </template>
  `,
};

export const closeButton = DefaultTemplate.bind({});
closeButton.args = {
  closeButton: true,
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
  slotTemplate: `
    <template #default>
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
    </template>
    `,
};
