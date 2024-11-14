import { getArgTypes, getSlotNames, getSlotsFragment } from "../../utils/storybook.ts";

import UAccordion from "../../ui.container-accordion/UAccordion.vue";
import UButton from "../../ui.button/UButton.vue";

import type { Meta, StoryFn } from "@storybook/vue3";
import type { UAccordionProps } from "../types.ts";

interface UAccordionArgs extends UAccordionProps {
  slotTemplate?: string;
}

/**
 * The `UAccordion` component. | [View on GitHub](https://github.com/vuelessjs/vueless/tree/main/src/ui.container-accordion)
 */
export default {
  id: "5050",
  title: "Containers / Accordion",
  component: UAccordion,
  args: {
    accordions: [
      {
        name: "Excellence",
        title: "Excellence by necessity",
        description: `As creators and maintainers of the technologies you are using,
            our services are here to showcase the full power of our softwares.`,
      },
      {
        name: "Innovation",
        title: "Driving innovation forward",
        description: `All the people that will be involved in delivering your project are contributing
            to the technologies you are using, when they are not the creators themselves.`,
      },
      {
        name: "Collaboration",
        title: "Fostering collaboration",
        description: `By working with us, you are directly supporting the open source community,
            ensuring the ecosystem continuity and enabling Nuxt development.`,
      },
    ],
  },
  argTypes: {
    ...getArgTypes(UAccordion.__name),
  },
} as Meta;

const DefaultTemplate: StoryFn<UAccordionArgs> = (args: UAccordionArgs) => ({
  components: { UAccordion, UButton },
  setup() {
    const slots = getSlotNames(UAccordion.__name);

    return { args, slots };
  },
  template: `
    <UAccordion
      v-for="(accordion, index) in args.accordions"
      :key="index"
      v-bind="accordion"
    >
      ${args.slotTemplate || getSlotsFragment("")}
    </UAccordion>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const Size = DefaultTemplate.bind({});
Size.args = { size: "sm" };

export const SlotToggle = DefaultTemplate.bind({});
SlotToggle.args = {
  slotTemplate: `
    <template #toggle="{ opened }">
      <UButton
        :label="opened ? 'Close' : 'Open'"
        color="grayscale"
        variant="secondary"
        size="sm"
      />
    </template>
  `,
};
