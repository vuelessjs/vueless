<template>
  <div class="mono-tabs" :class="tabsClass" :data-cy="dataCy">
    <slot>
      <UTab
        v-for="(item, index) in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
        :disabled="item.disabled"
        :size="size"
        :data-cy="`${dataCy}-item-${index}`"
      />
    </slot>
  </div>
</template>

<script>
import UTab from "vueless/ui.navigation-tab";

export default {
  name: "UTabs",

  components: {
    UTab,
  },

  provide() {
    return {
      setTabsSelectedItem: (value) => {
        this.selectedItem = value;
      },

      getTabsSelectedItem: () => {
        return this.selectedItem;
      },

      getTabsSize: () => {
        return this.size;
      },
    };
  },

  props: {
    /**
     * Set component value.
     */
    modelValue: {
      type: String,
      default: "",
    },

    /**
     * Set options for tabs.
     */
    options: {
      type: Array,
      default: () => [
        {
          label: "",
          value: "",
          disabled: false,
        },
      ],
    },

    /**
     * Add a line in bottom along the entire length.
     */
    bottomLine: {
      type: Boolean,
      default: false,
    },

    /**
     * The size of the tabs.
     * @values sm, md, lg
     */
    size: {
      type: String,
      default: "md",
    },

    /**
     * Sets data-cy attribute for automated testing.
     */
    dataCy: {
      type: String,
      default: "",
    },
  },

  emits: ["update:modelValue"],

  computed: {
    selectedItem: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit("update:modelValue", value);
      },
    },

    tabsClass() {
      return this.bottomLine ? "mono-tabs-bottom-line" : "";
    },
  },
};
</script>

<style lang="postcss" scoped>
.mono-tabs {
  @apply mb-6 flex space-x-8;
}

.mono-tabs-bottom-line {
  @apply border-b border-gray-100;
}
</style>
