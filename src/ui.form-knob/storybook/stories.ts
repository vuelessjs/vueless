import {
  getArgs,
  getArgTypes,
  getSlotNames,
  getSlotsFragment,
  getDocsDescription,
} from "../../utils/storybook";

import UKnob from "../UKnob.vue";
import URow from "../../ui.container-row/URow.vue";
import UCol from "../../ui.container-col/UCol.vue";

import type { Meta, StoryFn } from "@storybook/vue3-vite";
import type { Props } from "../types";
import { ref } from "vue";

interface UKnobArgs extends Props {
  slotTemplate?: string;
  enum: "color" | "labelAlign";
}

export default {
  id: "3085",
  title: "Form Inputs & Controls / Knob",
  component: UKnob,
  args: {
    label: "Volume",
    modelValue: 50,
  },
  argTypes: {
    ...getArgTypes(UKnob.__name),
  },
  parameters: {
    docs: {
      ...getDocsDescription(UKnob.__name),
    },
  },
} as Meta;

const DefaultTemplate: StoryFn<UKnobArgs> = (args: UKnobArgs) => ({
  components: { UKnob },
  setup: () => {
    const value = ref(args.modelValue);

    return { args, value, slots: getSlotNames(UKnob.__name) };
  },
  template: `
    <UKnob
      v-bind="args"
      v-model="value"
    >
      ${args.slotTemplate || getSlotsFragment("")}
    </UKnob>
  `,
});

const EnumTemplate: StoryFn<UKnobArgs> = (args: UKnobArgs, { argTypes }) => ({
  components: { UKnob, URow },
  setup: () => {
    const values = ref(
      argTypes?.[args.enum]?.options?.reduce((acc: Record<string, number>, option: string) => {
        acc[option] = args.modelValue || 50;

        return acc;
      }, {}) || {},
    );

    return { args, argTypes, getArgs, values };
  },
  template: `
    <URow gap="xl">
      <UKnob
        v-for="option in argTypes?.[args.enum]?.options"
        v-bind="getArgs(args, option)"
        v-model="values[option]"
        :key="option"
      />
    </URow>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const Sizes: StoryFn<UKnobArgs> = (args: UKnobArgs) => ({
  components: { UKnob, URow },
  setup: () => {
    const sizes = [60, 80, 100, 120, 150, 200];
    const values = ref(
      sizes.reduce((acc, size) => ({ ...acc, [size]: 50 }), {} as Record<number, number>),
    );

    return { args, sizes, values };
  },
  template: `
    <URow gap="xl" align="end">
      <UKnob
        v-for="size in sizes"
        v-bind="args"
        v-model="values[size]"
        :size="size"
        :label="size + 'px'"
        :key="size"
      />
    </URow>
  `,
});

export const Colors = EnumTemplate.bind({});
Colors.args = { enum: "color" };

export const LabelAlign = EnumTemplate.bind({});
LabelAlign.args = { enum: "labelAlign" };

export const Range: StoryFn<UKnobArgs> = (args: UKnobArgs) => ({
  components: { UKnob, URow },
  setup: () => {
    const temperature = ref(20);
    const percentage = ref(75);
    const rating = ref(3);

    return { args, temperature, percentage, rating };
  },
  template: `
    <URow gap="xl">
      <UKnob
        v-model="temperature"
        label="Temperature (°C)"
        :min="-10"
        :max="40"
        :step="1"
        color="warning"
      />
      <UKnob
        v-model="percentage"
        label="Percentage"
        :min="0"
        :max="100"
        :step="5"
        color="success"
      />
      <UKnob
        v-model="rating"
        label="Rating"
        :min="1"
        :max="5"
        :step="1"
        color="info"
      />
    </URow>
  `,
});

export const ArcRanges: StoryFn<UKnobArgs> = (args: UKnobArgs) => ({
  components: { UKnob, URow },
  setup: () => {
    const arcRanges = [180, 270, 300, 360];
    const values = ref(
      arcRanges.reduce((acc, range) => ({ ...acc, [range]: 50 }), {} as Record<number, number>),
    );

    return { args, arcRanges, values };
  },
  template: `
    <URow gap="xl">
      <UKnob
        v-for="arcRange in arcRanges"
        v-bind="args"
        v-model="values[arcRange]"
        :arc-range="arcRange"
        :label="arcRange + '°'"
        :key="arcRange"
      />
    </URow>
  `,
});

export const WithoutValue = DefaultTemplate.bind({});
WithoutValue.args = { showValue: false };

export const Description = DefaultTemplate.bind({});
Description.args = { description: "Adjust the volume level from 0 to 100." };

export const Error: StoryFn<UKnobArgs> = (args: UKnobArgs) => ({
  components: { UKnob },
  setup: () => {
    const value = ref(10);

    return { args, value };
  },
  template: `
    <UKnob
      v-bind="args"
      v-model="value"
      :error="value < 20 ? 'Value must be at least 20' : ''"
    />
  `,
});

export const Disabled = DefaultTemplate.bind({});
Disabled.args = { disabled: true };

export const Slots: StoryFn<UKnobArgs> = (args: UKnobArgs) => ({
  components: { UKnob, URow },
  setup: () => {
    const volume = ref(75);
    const brightness = ref(60);

    return { args, volume, brightness };
  },
  template: `
    <URow gap="xl">
      <UKnob
        v-model="volume"
        label="Volume"
        color="primary"
      >
        <template #value="{ value }">
          🔊 {{ value }}%
        </template>
      </UKnob>

      <UKnob
        v-model="brightness"
        label="Brightness"
        color="warning"
      >
        <template #label="{ label }">
          💡 {{ label }}
        </template>
        <template #value="{ value }">
          {{ value }}%
        </template>
      </UKnob>
    </URow>
  `,
});

export const Interactive: StoryFn<UKnobArgs> = (args: UKnobArgs) => ({
  components: { UKnob, UCol },
  setup: () => {
    const bass = ref(50);
    const mid = ref(50);
    const treble = ref(50);

    return { args, bass, mid, treble };
  },
  template: `
    <UCol gap="lg">
      <div class="text-lg font-semibold">Audio Equalizer</div>
      <URow gap="xl">
        <UKnob
          v-model="bass"
          label="Bass"
          :min="0"
          :max="100"
          color="error"
        />
        <UKnob
          v-model="mid"
          label="Mid"
          :min="0"
          :max="100"
          color="warning"
        />
        <UKnob
          v-model="treble"
          label="Treble"
          :min="0"
          :max="100"
          color="success"
        />
      </URow>
      <div class="text-sm text-gray-600">
        Bass: {{ bass }} | Mid: {{ mid }} | Treble: {{ treble }}
      </div>
    </UCol>
  `,
});
