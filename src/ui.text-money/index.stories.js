import UMoney from "../ui.text-money";
import UIcon from "../ui.image-icon";
import URow from "../ui.container-row";
import DebitIcon from "../ui.text-money/assets/debit.svg?component";
import CreditIcon from "../ui.text-money/assets/credit.svg?component";

import { getArgTypes, getSlotNames } from "../service.storybook";

const COMPONENT_CLASSES = "flex justify-center w-1/6";

export default {
  id: "4040",
  title: "Text & Content / Money",
  component: UMoney,
  args: {
    sum: 10,
    symbol: "$",
    sign: "positive",
  },
  argTypes: {
    ...getArgTypes(UMoney.name),
  },
};

const DefaultTemplate = (args) => ({
  components: { UMoney },
  setup() {
    const slots = getSlotNames(UMoney.name);

    return { args, slots };
  },
  template: `
    <div class="${COMPONENT_CLASSES}">
      <UMoney v-bind="args">
        <template v-for="(slot) in slots" v-slot:[slot]>
          <template v-if="args[slot]">{{ args[slot] }}</template>
        </template>
      </UMoney>
    </div>
  `,
});

const SlotTemplate = (args) => ({
  components: { UMoney, UIcon },
  setup() {
    const icons = {
      Debit: DebitIcon,
      Credit: CreditIcon,
    };

    return { args, icons };
  },
  template: `
    <div class="${COMPONENT_CLASSES}">
      <UMoney v-bind="args">
        ${args.slotTemplate}
      </UMoney>
    </div>
  `,
});

const SizesTemplate = (args, { argTypes } = {}) => ({
  components: { UMoney, URow },
  setup() {
    return {
      args,
      sizes: argTypes.size.options,
    };
  },
  template: `
    <URow>
      <div class="${COMPONENT_CLASSES}" v-for="(size, index) in sizes" :key="index">
        <UMoney v-bind="args" :size="size" >
          <template v-for="(slot) in slots" v-slot:[slot]>
            <template v-if="args[slot]">{{ args[slot] }}</template>
          </template>
        </UMoney>
      </div>
    </URow>
  `,
});

const WeightTemplate = (args, { argTypes } = {}) => ({
  components: { UMoney, URow },
  setup() {
    return {
      args,
      weights: argTypes.weight.options,
    };
  },
  template: `
    <URow>
     <div class="${COMPONENT_CLASSES}" v-for="(weight, index) in weights" :key="index">
        <UMoney v-bind="args" :weight="weight" >
          <template v-for="(slot) in slots" v-slot:[slot]>
            <template v-if="args[slot]">{{ args[slot] }}</template>
          </template>
        </UMoney>
      </div>
    </URow>
  `,
});

const ColorsTemplate = (args, { argTypes } = {}) => ({
  components: { UMoney, URow },
  setup() {
    return {
      args,
      colors: argTypes.color.options,
    };
  },
  template: `
    <URow>
      <div class="${COMPONENT_CLASSES}"    v-for="(color, index) in colors" :key="index">
        <UMoney v-bind="args" :color="color" >
          <template v-for="(slot) in slots" v-slot:[slot]>
            <template v-if="args[slot]">{{ args[slot] }}</template>
          </template>
        </UMoney>
      </div>
    </URow>
  `,
  created() {
    this.mxArgTypes = argTypes;
  },
});

const SignsTemplate = (args, { argTypes } = {}) => ({
  components: { UMoney, URow },
  setup() {
    return {
      args,
      signs: argTypes.sign.options,
    };
  },
  template: `
    <URow>
      <div class="${COMPONENT_CLASSES}" v-for="(sign, index) in signs" :key="index">
        <UMoney v-bind="args" :sign="sign"  >
          <template v-for="(slot) in slots" v-slot:[slot]>
            <template v-if="args[slot]">{{ args[slot] }}</template>
          </template>
        </UMoney>
      </div>
    </URow>
  `,
  created() {
    this.mxArgTypes = argTypes;
  },
});

const SymbolAlignTemplate = (args, { argTypes } = {}) => ({
  components: { UMoney, URow },
  setup() {
    return {
      args,
      symbolsAlign: argTypes.symbolAlign.options,
    };
  },
  template: `
    <URow>
      <div class="${COMPONENT_CLASSES}" v-for="(symbolAlign, index) in symbolsAlign" :key="index">
        <UMoney
          v-bind="args"
          :symbol-align="symbolAlign"
        >
          <template v-for="(slot) in slots" v-slot:[slot]>
            <template v-if="args[slot]">{{ args[slot] }}</template>
          </template>
        </UMoney>
      </div>
    </URow>
  `,
  created() {
    this.mxArgTypes = argTypes;
  },
});

const AlignTemplate = (args, { argTypes } = {}) => ({
  components: { UMoney, URow },
  setup() {
    return {
      args,
      aligns: argTypes.align.options,
    };
  },
  template: `
    <URow>
      <div class="${COMPONENT_CLASSES}" v-for="(align, index) in aligns" :key="index">
        <UMoney :align="align" v-bind="args" >
          <template v-for="(slot) in slots" v-slot:[slot]>
            <template v-if="args[slot]">{{ args[slot] }}</template>
          </template>
        </UMoney>
      </div>
    </URow>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const otherValues = DefaultTemplate.bind({});
otherValues.args = {
  sum: 10,
  symbol: "$",
  sign: "negative",
};

export const colors = ColorsTemplate.bind({});
colors.args = {
  sum: 0,
  symbol: "$",
  sign: "default",
};

export const sizes = SizesTemplate.bind({});
sizes.args = {};

export const weights = WeightTemplate.bind({});
weights.args = {};

export const sign = SignsTemplate.bind({});
sign.args = {};

export const symbolAlign = SymbolAlignTemplate.bind({});
symbolAlign.args = {};

export const planned = DefaultTemplate.bind({});
planned.args = { planned: true };

export const integer = DefaultTemplate.bind({});
integer.args = { integer: true };

export const numeralDecimalScale3 = DefaultTemplate.bind({});
numeralDecimalScale3.args = { numeralDecimalScale: 3 };

export const align = AlignTemplate.bind({});
align.args = {};

export const slotLeft = SlotTemplate.bind({});
slotLeft.args = {
  slotTemplate: `
    <template #left>
      <UIcon
        :src="icons.Debit"
        size="xs"
        color="grayscale"
      />
    </template>
  `,
};

export const slotRight = SlotTemplate.bind({});
slotRight.args = {
  slotTemplate: `
    <template #right>
      <UIcon
        :src="icons.Credit"
        size="xs"
        color="gray"
      />
    </template>
  `,
};
