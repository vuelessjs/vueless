import { getArgTypes, getSlotNames, getSlotsFragment } from "../service.storybook";

import UAccordion from "../ui.container-accordion";
import UButton from "../ui.button";

/**
 * The `UAccordion` component. | [View on GitHub](https://github.com/vuelessjs/vueless/tree/main/src/ui.container-accordion)
 */
export default {
  id: "5050",
  title: "Containers / Accordion",
  component: UAccordion,
  args: {
    name: "Excellence",
    title: "Excellence by necessity",
    description: "As creators and maintainers of the technologies you are using.",
  },
  argTypes: {
    ...getArgTypes(UAccordion.name),
  },
};

const DefaultTemplate = (args) => ({
  components: { UAccordion, UButton },
  setup() {
    const slots = getSlotNames(UAccordion.name);

    return { args, slots };
  },
  template: `
    <UAccordion v-bind="args">
      ${args.slotTemplate || getSlotsFragment()}
    </UAccordion>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const Size = DefaultTemplate.bind({});
Size.args = { size: "sm" };

export const slotToggle = DefaultTemplate.bind({});
slotToggle.args = {
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
