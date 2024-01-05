import { getArgTypes } from "vueless/service.storybook";

import UAccordion from "vueless/ui.container-accordion";
import UCard from "vueless/ui.container-card";
import UGroup from "vueless/ui.container-group";

export default {
  title: "Containers / Accordion",
  component: UAccordion,
  argTypes: {
    ...getArgTypes(UAccordion.name),
  },
};

const DefaultTemplate = (args) => ({
  components: { UAccordion, UCard },
  setup() {
    return { args };
  },
  template: `
    <UCard>
      <UAccordion
        name="accordion1"
        title="Excellence by necessity"
        description="As creators and maintainers of the technologies you are using,
              our services are here to showcase the full power of our softwares."
      />
      <UAccordion
        name="accordion1"
        title="Unique expertise"
        description="All the peoples that will be involved in delivering your project are contributing
              to the technologies you are using, when they are not the creators themselves."
      />
      <UAccordion
        name="accordion1"
        title="Commitment to innovation"
        description="By working with us, you are directly supporting the open source community,
              ensuring the ecosystem continuity and enabling Nuxt development."
      />
    </UCard>
  `,
});

const SizesTemplate = (args, { argTypes }) => ({
  components: { UAccordion, UCard, UGroup },
  setup() {
    return {
      args,
      sizes: argTypes.size.options,
    };
  },
  template: `
    <UGroup>
      <UCard v-for="(size, index) in sizes" :size="size">
          <UAccordion
            :size="size"
            :name="size"
            title="Excellence by necessity"
            description="As creators and maintainers of the technologies you are using,
              our services are here to showcase the full power of our softwares."
            :key="index"
          />
          <UAccordion
            :size="size"
            :name="size"
            title="Unique expertise"
            description="All the peoples that will be involved in delivering your project are contributing
              to the technologies you are using, when they are not the creators themselves."
            :key="index"
          />
          <UAccordion
            :size="size"
            :name="size"
            title="Commitment to innovation"
            description="By working with us, you are directly supporting the open source community,
              ensuring the ecosystem continuity and enabling Nuxt development."
            :key="index"
          />
      </UCard>
    </UGroup>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const Sizes = SizesTemplate.bind({});
Sizes.args = {};
