import { getArgTypes, getSlotNames } from "../service.storybook";

import UText from "../ui.text-block";
import URow from "../ui.container-row";

/**
 * The `UText` component. | [View on GitHub](https://github.com/vuelessjs/vueless/tree/main/src/ui.text-block)
 */
export default {
  id: "4020",
  title: "Text & Content / Text",
  component: UText,
  argTypes: {
    ...getArgTypes(UText.name),
  },
  args: {},
};

const defaultTemplate = `
  <template #default>
    <p>
      <b>To proceed with your registration</b>, please enter your
        <u>email address</u> in the field below. <i>A verification link</i> will be sent to your inbox shortly.
      <a href="https://uk.wikipedia.org/wiki/Lorem_ipsum" target="_blank">Wikipedia</a>
    </p>
  </template>
`;

const DefaultTemplate = (args) => ({
  components: { UText, URow },
  setup() {
    const slots = getSlotNames(UText.name);

    return { args, slots };
  },
  template: `
    <UText v-bind="args">
      ${args.slotTemplate || defaultTemplate}
    </UText>
  `,
});

const SizesTemplate = (args, { argTypes } = {}) => ({
  components: { UText, URow },
  setup() {
    return {
      args,
      sizes: argTypes.size.options,
    };
  },
  template: `
    <URow>
      <UText
        v-for="(size, index) in sizes"
        :size="size"
        v-bind="args"
        :key="index"
      >
        ${args.slotTemplate || defaultTemplate}
      </UText>
    </URow>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const sizes = SizesTemplate.bind({});
sizes.args = {};

export const paragraphs = DefaultTemplate.bind({});
paragraphs.args = {
  slotTemplate: `
    <template #default>
      <p>
        In a world where technology evolves at an unprecedented pace, staying
        updated with the latest advancements is crucial for success. Companies
        that adapt quickly to new trends often find themselves at the forefront
        of their industries, leading to increased innovation and productivity.
        However, it's not just about adopting new tools but also about integrating
        them seamlessly into existing workflows to maximize their potential.
      </p>

      <p>
        Employees must be encouraged to continuously learn and develop new skills,
        ensuring they can leverage these technological advancements effectively.
        This not only enhances their professional growth but also contributes to
        the overall success of the organization. By fostering a culture of
        continuous improvement, businesses can navigate the challenges of a
        rapidly changing landscape and emerge stronger and more competitive.
      </p>
    </template>

  `,
};

export const list = DefaultTemplate.bind({});
list.args = {
  slotTemplate: `
    <template #default>
      <URow gap="2xl">
        <ul>
          <li>Ensure your password is strong</li>
          <li>Update your profile information</li>
          <li>Check your email for updates</li>
        </ul>


        <ol>
          <li>Create an account by signing up</li>
          <li>Verify your email address</li>
          <li>Log in to access your dashboard</li>
        </ol>
      </URow>
    </template>
  `,
};
