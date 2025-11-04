import {
  getArgs,
  getArgTypes,
  getDocsDescription,
  getSlotNames,
  getSlotsFragment,
} from "../../utils/storybook";

import USpeedDial from "../USpeedDial.vue";
import URow from "../../ui.container-row/URow.vue";

import type { Meta, StoryFn } from "@storybook/vue3-vite";
import type { Props } from "../types";

interface USpeedDialArgs extends Props {
  slotTemplate?: string;
  enum: "size" | "direction" | "trigger";
}

export default {
  id: "100030",
  title: "Other / Speed Dial",
  component: USpeedDial,
  args: {
    items: [
      { icon: "edit", label: "Edit" },
      { icon: "share", label: "Share" },
      { icon: "delete", label: "Delete", color: "error" },
    ],
  },
  argTypes: {
    ...getArgTypes(USpeedDial.__name),
  },
  parameters: {
    docs: {
      ...getDocsDescription(USpeedDial.__name),
    },
  },
} as Meta;

const DefaultTemplate: StoryFn<USpeedDialArgs> = (args: USpeedDialArgs) => ({
  components: { USpeedDial },
  setup: () => {
    const onEdit = () => console.log("Edit clicked");
    const onShare = () => console.log("Share clicked");
    const onDelete = () => console.log("Delete clicked");

    const items = [
      { icon: "edit", label: "Edit", command: onEdit },
      { icon: "share", label: "Share", command: onShare },
      { icon: "delete", label: "Delete", color: "error", command: onDelete },
    ];

    return { args: { ...args, items }, slots: getSlotNames(USpeedDial.__name) };
  },
  template: `
    <div class="flex items-center justify-center h-96">
      <USpeedDial v-bind="args" />
    </div>
  `,
});

const EnumTemplate: StoryFn<USpeedDialArgs> = (args: USpeedDialArgs, { argTypes }) => ({
  components: { URow, USpeedDial },
  setup: () => {
    const items = [
      { icon: "edit", label: "Edit" },
      { icon: "share", label: "Share" },
      { icon: "delete", label: "Delete", color: "error" },
    ];

    return { args: { ...args, items }, argTypes, getArgs };
  },
  template: `
    <URow>
      <div
        v-for="option in argTypes?.[args.enum]?.options"
        :key="option"
        class="flex items-center justify-center h-96 w-64"
      >
        <USpeedDial v-bind="getArgs(args, option)" />
      </div>
    </URow>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const DirectionUp = DefaultTemplate.bind({});
DirectionUp.args = {
  direction: "up",
};

export const DirectionDown = DefaultTemplate.bind({});
DirectionDown.args = {
  direction: "down",
};

export const DirectionLeft = DefaultTemplate.bind({});
DirectionLeft.args = {
  direction: "left",
};

export const DirectionRight = DefaultTemplate.bind({});
DirectionRight.args = {
  direction: "right",
};

export const DirectionCircle = DefaultTemplate.bind({});
DirectionCircle.args = {
  direction: "circle",
};

export const WithMask = DefaultTemplate.bind({});
WithMask.args = {
  mask: true,
};

export const HoverTrigger = DefaultTemplate.bind({});
HoverTrigger.args = {
  trigger: "hover",
};

export const CustomColor = DefaultTemplate.bind({});
CustomColor.args = {
  color: "#22c55e",
};

export const CustomIcon = DefaultTemplate.bind({});
CustomIcon.args = {
  icon: "menu",
};

export const Size = EnumTemplate.bind({});
Size.args = { enum: "size" };

export const Direction = EnumTemplate.bind({});
Direction.args = { enum: "direction" };

export const Trigger = EnumTemplate.bind({});
Trigger.args = { enum: "trigger" };

