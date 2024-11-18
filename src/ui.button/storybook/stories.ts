import {
  getArgTypes,
  getSlotNames,
  getSlotsFragment,
  getDocsDescription,
} from "../../utils/storybook.ts";

import { ref } from "vue";

import UButton from "../../ui.button/UButton.vue";
import UIcon from "../../ui.image-icon/UIcon.vue";
import URow from "../../ui.container-row/URow.vue";
import UCol from "../../ui.container-col/UCol.vue";

import { useDarkMode } from "../../composables/useDarkMode.ts";

import type { Meta, StoryFn } from "@storybook/vue3";
import type { UButtonProps } from "../types.ts";

interface UButtonArgs extends UButtonProps {
  slotTemplate?: string;
  enum: "variant" | "size";
}

interface StoryArgType {
  options?: string[];
}

export default {
  id: "1010",
  title: "Buttons & Links / Button",
  component: UButton,
  args: {
    label: "Button",
  },
  argTypes: {
    ...getArgTypes(UButton.__name),
  },
  parameters: {
    ...getDocsDescription(UButton.__name),
  },
} as Meta;

const DefaultTemplate: StoryFn<UButtonArgs> = (args: UButtonArgs) => ({
  components: { UButton, UIcon },
  setup() {
    const slots = getSlotNames(UButton.__name);

    return { args, slots };
  },
  template: `
    <UButton v-bind="args">
      ${args.slotTemplate || getSlotsFragment("")}
    </UButton>
  `,
});

const EnumVariantTemplate: StoryFn<UButtonArgs> = (args: UButtonArgs, { argTypes }) => ({
  components: { UButton, URow, UCol },
  setup() {
    return { args, options: argTypes?.[args.enum]?.options };
  },
  template: `
    <UCol>
      <URow no-mobile>
        <UButton
          v-for="(option, index) in options"
          :key="index"
          v-bind="args"
          :[args.enum]="option"
          :label="option"
        />
      </URow>
    </UCol>
  `,
});

const ColorTemplate: StoryFn<UButtonArgs> = (args, { argTypes }) => ({
  components: { UButton, URow, UCol },
  setup() {
    const variantOptions = (argTypes.variant as StoryArgType)?.options ?? [];
    const variants = [...Array.from(variantOptions), "thirdary"];

    return {
      args,
      variants,
      colors: argTypes?.color?.options,
      shouldBeFilled: (variant: string, index: number) => {
        return variant === "thirdary" && index === variants.length - 2;
      },
    };
  },
  template: `
    <UCol>
      <URow v-for="(variant, variantIndex) in variants" :key="variantIndex" no-mobile>
        <UButton
          v-for="(color, colorIndex) in colors"
          v-bind="args"
          :variant="variant"
          :color="color"
          :label="color"
          :key="colorIndex"
          :filled="shouldBeFilled(variant, variantIndex)"
        />
      </URow>
    </UCol>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const Variants = EnumVariantTemplate.bind({});
Variants.args = { enum: "variant" };

export const Sizes = EnumVariantTemplate.bind({});
Sizes.args = { enum: "size" };

export const Round = EnumVariantTemplate.bind({});
Round.args = { enum: "variant", round: true };

export const Loading: StoryFn<UButtonArgs> = (args) => ({
  components: { UButton, URow },
  setup() {
    const loading = ref(false);

    function toggleLoading() {
      loading.value = !loading.value;
    }

    return { args, toggleLoading, loading };
  },
  template: `
    <URow no-mobile>
      <UButton
        label="Loader demo"
        :loading="loading"
        />
      <UButton
        label="Toggle loading"
        variant="secondary"
        color="green"
        leftIcon="play_arrow"
        @click="toggleLoading"
        />
    </URow>
  `,
});

export const Block = DefaultTemplate.bind({});
Block.args = { block: true };

export const Disabled = EnumVariantTemplate.bind({});
Disabled.args = { enum: "variant", disabled: true };

export const NoRing = DefaultTemplate.bind({});
NoRing.args = { noRing: true };

export const Colors = ColorTemplate.bind({});
Colors.args = {};

export const Square = DefaultTemplate.bind({});
Square.args = { square: true, icon: "filter_list" };

export const IconProps: StoryFn<UButtonArgs> = (args) => ({
  components: { UButton, URow },
  setup() {
    return { args };
  },
  template: `
    <URow no-mobile>
      <UButton
        leftIcon="download"
        label="Download"
      />
      <UButton
        rightIcon="menu"
        label="Menu"
      />
    </URow>
  `,
});

export const Slots: StoryFn<UButtonArgs> = (args) => ({
  components: { UButton, UIcon, URow },
  setup() {
    const { isDarkMode } = useDarkMode();

    return { args, isDarkMode };
  },
  template: `
    <URow no-mobile>
      <UButton v-bind="args" label="Add to favorite">
        <template #left>
          <UIcon
            name="heart_plus"
            size="sm"
            color="green"
            :variant="isDarkMode ? 'dark' : 'default'"
          />
        </template>
      </UButton>

      <UButton v-bind="args" square>
        <template #default>
          <UIcon
            name="settings"
            size="sm"
            color="green"
            :variant="isDarkMode ? 'dark' : 'default'"
          />
        </template>
      </UButton>

      <UButton v-bind="args" label="Delete">
        <template #right>
          <UIcon
            name="delete"
            size="sm"
            color="green"
            :variant="isDarkMode ? 'dark' : 'default'"
          />
        </template>
      </UButton>
    </URow>
  `,
});
