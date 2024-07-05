import { getArgTypes } from "../service.storybook";

import UAccordion from "../ui.container-accordion";

/**
 * The `UAccordion` component. | [View on GitHub](https://github.com/vuelessjs/vueless/tree/main/src/ui.container-accordion)
 */
export default {
  id: "5050",
  title: "Containers / Accordion",
  component: UAccordion,
  argTypes: {
    ...getArgTypes(UAccordion.name),
  },
};

const DefaultTemplate = (args) => ({
  components: { UAccordion },
  setup() {
    return { args };
  },
  template: `
    <UAccordion
      v-bind="args"
      name="Excellence"
      title="Excellence by necessity"
      description="As creators and maintainers of the technologies you are using,
            our services are here to showcase the full power of our softwares."
    />
    <UAccordion
      v-bind="args"
      name="Unique"
      title="Unique expertise"
      description="All the peoples that will be involved in delivering your project are contributing
            to the technologies you are using, when they are not the creators themselves."
    />
    <UAccordion
      v-bind="args"
      name="Commitment"
      title="Commitment to innovation"
      description="By working with us, you are directly supporting the open source community,
            ensuring the ecosystem continuity and enabling Nuxt development."
    />
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const Size = DefaultTemplate.bind({});
Size.args = { size: "sm" };
