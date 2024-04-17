import { getArgTypes, getSlotNames } from "../service.storybook";

import URadioCard from "../ui.form-radio-card";
import UIcon from "../ui.image-icon";

export default {
  id: "3150",
  title: "Form Inputs & Controls / Radio Card",
  component: URadioCard,
  args: {
    value: "radio card 1",
    name: "radio",
    options: [
      {
        iconName: "star",
        iconFill: true,
        value: "radio card 1",
        description: "some description 1",
        label: "title 1",
      },
      {
        iconName: "star",
        iconFill: true,
        value: "radio card 2",
        description: "some description 2",
        label: "title 2",
      },
      {
        iconName: "star",
        iconFill: true,
        value: "radio card 3",
        description: "some description 3",
        label: "title 3",
      },
    ],
  },
  argTypes: {
    ...getArgTypes(URadioCard.name),
  },
};

const DefaultTemplate = (args) => ({
  components: { URadioCard },
  setup() {
    const slots = getSlotNames(URadioCard.name);

    return { args, slots };
  },
  template: `
    <URadioCard v-bind="args">
      <template v-for="(slot, index) of slots" :key="index" v-slot:[slot]>
        <template v-if="args[slot]">{{ args[slot] }}</template>
      </template>
    </URadioCard>
  `,
});

const SlotTemplate = (args) => ({
  components: { URadioCard, UIcon },
  setup() {
    return { args };
  },
  template: `
    <URadioCard v-bind="args">
      ${args.slotTemplate}
    </URadioCard>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const gridCols3 = DefaultTemplate.bind({});
gridCols3.args = {
  gridCols: 3,
  value: "radio card 4",
  name: "radio 2",
  options: [
    {
      value: "radio card 4",
      description: "some description 1",
      iconName: "star",
      iconFill: true,
      label: "title 1",
    },
    {
      value: "radio card 5",
      description: "some description 2",
      iconName: "star",
      iconFill: true,
      label: "title 2",
    },
    {
      value: "radio card 6",
      description: "some description 3",
      iconName: "star",
      iconFill: true,
      label: "title 3",
    },
  ],
};

export const withoutIcon = DefaultTemplate.bind({});
withoutIcon.args = {
  withIcon: false,
  value: "radio card 7",
  name: "radio 3",
  options: [
    {
      value: "radio card 7",
      description: "some description 1",
      iconName: "star",
      iconFill: true,
      label: "title 1",
    },
    {
      value: "radio card 8",
      description: "some description 2",
      iconName: "star",
      iconFill: true,
      label: "title 2",
    },
    {
      value: "radio card 9",
      description: "some description 3",
      iconName: "star",
      iconFill: true,
      label: "title 3",
    },
  ],
};

export const iconSlot = SlotTemplate.bind({});
iconSlot.args = {
  value: "radio card 10",
  name: "radio 4",
  options: [
    { value: "radio card 10", description: "some description 1", title: "title 1" },
    { value: "radio card 11", description: "some description 2", title: "title 2" },
  ],
  slotTemplate: `
    <template #icon>
      <UIcon
        name="star"
        size="lg"
      />
    </template>
  `,
};
