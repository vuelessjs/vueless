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
};

const DefaultTemplate = (args) => ({
  components: { UButton, UIcon },
  setup() {
    const slots = getSlotNames(UButton.__name);

    return { args, slots };
  },
  template: `
    <UButton v-bind="args">
      ${args.slotTemplate || getSlotsFragment()}
    </UButton>
  `,
});

const EnumVariantTemplate = (args, { argTypes }) => ({
  components: { UButton, URow, UCol },
  setup() {
    return { args, options: argTypes[args.enum].options };
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

const ColorTemplate = (args, { argTypes }) => ({
  components: { UButton, URow, UCol },
  setup() {
    const variants = [...argTypes.variant.options, 'thirdary'];
    return {
      args,
      variants,
      colors: argTypes.color.options,
      shouldBeFilled: (variant, index) => {
        return variant === 'thirdary' && index === variants.length - 2;
      }
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

export const Loading = (args) => ({
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

export const IconProps = (args) => ({
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

export const Slots = (args) => ({
  components: { UButton, UIcon, URow },
  setup() {
    return { args };
  },
  template: `
    <URow no-mobile>
      <UButton v-bind="args" label="Add to favorite">
        <template #left>
          <UIcon
            name="heart_plus"
            color="green"
            size="sm"
          />
        </template>
      </UButton>

      <UButton v-bind="args" square>
        <template #default>
          <UIcon
            name="settings"
            color="green"
            size="sm"
          />
        </template>
      </UButton>

      <UButton v-bind="args" label="Delete">
        <template #right>
          <UIcon
            name="delete"
            color="green"
            size="sm"
          />
        </template>
      </UButton>
    </URow>
  `,
});
