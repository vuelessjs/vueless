import { getArgTypes, getSlotNames } from "vueless/service.storybook";

import UButton from "vueless/ui.button";
// import UIcon from "vueless/ui.image-icon";
// import URow from "vueless/ui.container-row";
// import UGroup from "vueless/ui.container-group";

export default {
  title: "Buttons & Links / Button",
  component: UButton,
  args: {
    text: "Button",
  },
  argTypes: {
    ...getArgTypes(UButton.name),
  },
};

const DefaultTemplate = (args) => ({
  components: { UButton },
  setup() {
    const slots = getSlotNames(UButton.name);

    return { args, slots };
  },
  template: `
    <UButton v-bind="args">
      <template v-for="(slot, index) of slots" :key="index" v-slot:[slot]>
        <template v-if="args[slot]">{{ args[slot] }}</template>
      </template>
    </UButton>
  `,
});

// const SlotTemplate = (args) => ({
//   components: { UButton, UIcon },
//   setup() {
//     return { args };
//   },
//   template: `
//     <UButton v-bind="args">
//       ${args.slotTemplate}
//     </UButton>
//   `,
// });
//
// const VariantsTemplate = (args, { argTypes }) => ({
//   components: { UButton, URow },
//   setup() {
//     return {
//       args,
//       variants: argTypes.variant.options,
//     };
//   },
//   template: `
//     <URow>
//       <UButton
//         v-for="(variant, index) in variants"
//         v-bind="args"
//         :variant="variant"
//         :text="variant"
//         :key="index"
//       />
//     </URow>
//   `,
// });
//
// const SizesTemplate = (args, { argTypes }) => ({
//   components: { UButton, URow },
//   setup() {
//     return {
//       args,
//       sizes: argTypes.size.options,
//     };
//   },
//   template: `
//     <URow>
//       <UButton
//         v-for="(size, index) in sizes"
//         v-bind="args"
//         :size="size"
//         :text="size"
//         :key="index"
//       />
//     </URow>
//   `,
// });
//
// const ColorTemplate = (args, { argTypes }) => ({
//   components: { UButton, URow, UGroup },
//   setup() {
//     return {
//       args,
//       variants: argTypes.variant.options,
//       colors: argTypes.color.options,
//     };
//   },
//   template: `
//     <UGroup>
//       <URow v-for="(variant, index) in variants" :key="index">
//         <UButton
//           v-for="(color, index) in colors"
//           v-bind="args"
//           :variant="variant"
//           :color="color"
//           :text="color"
//           :key="index"
//         />
//       </URow>
//     </UGroup>
//   `,
// });

export const Default = DefaultTemplate.bind({});
Default.args = {};
// Default.parameters = {
//   docs: {
//     source: {
//       type: "auto", // works
//     },
//   },
// };

// export const variants = VariantsTemplate.bind({});
// variants.args = {};
//
// export const sizes = SizesTemplate.bind({});
// sizes.args = {};
//
// export const pilled = VariantsTemplate.bind({});
// pilled.args = { pill: true };
//
// export const disabled = VariantsTemplate.bind({});
// disabled.args = { disabled: true };
//
// export const colors = ColorTemplate.bind({});
// colors.args = {};
//
// export const slotDefault = SlotTemplate.bind({});
// slotDefault.args = {
//   slotTemplate: `
//     <template #default>
//       🤘🤘🤘
//     </template>
//   `,
// };
//
// export const slotLeft = SlotTemplate.bind({});
// slotLeft.args = {
//   slotTemplate: `
//     <template #left>
//       <UIcon
//         name="star"
//         color="gray"
//         size="md"
//        />
//     </template>
//   `,
// };
//
// export const slotRight = SlotTemplate.bind({});
// slotRight.args = {
//   slotTemplate: `
//     <template #right>
//       <UIcon
//         name="star"
//         color="gray"
//         size="md"
//        />
//     </template>
//   `,
// };
