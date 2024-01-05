<template>
  <div class="mono-group" :class="formGroupClasses" :data-cy="dataCy">
    <div v-if="title" class="mono-group-header-wrapper">
      <UDivider v-if="isUpperlined" class="mono-group-upperlined" size="xl" no-top-padding />

      <div class="mono-group-header" :class="headerClass">
        <!-- @slot Use it to add something left side of the header. -->
        <slot name="left" />

        <div class="mono-group-header-container">
          <!-- @slot Use it to add something before title. -->
          <slot name="beforeTitle" />

          <UHeader v-if="title" class="mono-group-block-title" :text="title" size="xs" />

          <!-- @slot Use it to add something after title. -->
          <slot name="afterTitle" />
        </div>

        <!-- @slot Use it to add something right side of the header. -->
        <slot name="right" />
      </div>

      <UDivider v-if="isUnderlined" class="mono-group-underlined" size="xl" no-top-padding />
    </div>

    <div class="mono-group-content">
      <!-- @slot Use it to add something instead form. -->
      <slot />
    </div>
  </div>
</template>

<script>
import { globalComponentConfig } from "vueless/service.ui";

import UDivider from "vueless/ui.container-divider";
import UHeader from "vueless/ui.text-header";

export default {
  name: "UGroup",

  components: {
    UDivider,
    UHeader,
  },

  props: {
    /**
     * Set header title.
     */
    title: {
      type: String,
      default: "",
    },

    /**
     * The size between nested components.
     * @values sm, md, lg
     */
    size: {
      type: String,
      default: "md",
    },

    /**
     * Show line above the header.
     */
    upperlined: {
      type: Boolean,
      default: undefined,
    },

    /**
     * Show line under the header.
     */
    underlined: {
      type: Boolean,
      default: undefined,
    },

    /**
     * Sets data-cy attribute for automated testing.
     */
    dataCy: {
      type: String,
      default: "",
    },
  },

  computed: {
    formGroupClasses() {
      const size = `size-${this.size}`;

      return [size];
    },

    isUpperlined() {
      const upperlined = globalComponentConfig.UGroup?.upperlined;

      if (this.upperlined === undefined && upperlined === undefined) return true;
      else if (this.upperlined !== undefined) return this.upperlined;

      return upperlined;
    },

    isUnderlined() {
      if (this.underlined !== undefined) return this.underlined;

      return globalComponentConfig.UGroup?.underlined;
    },

    headerClass() {
      return !this.isUnderlined ? "padding-bottom" : "";
    },
  },
};
</script>

<style lang="postcss" scoped>
.size {
  &-sm {
    .mono-group-content {
      @apply space-y-2;
    }
  }

  &-md {
    .mono-group-content {
      @apply space-y-4;
    }
  }

  &-lg {
    .mono-group-content {
      @apply space-y-6;
    }
  }
}

.mono-group {
  &-header {
    @apply flex items-center justify-between;

    &.padding-bottom {
      @apply pb-6;
    }

    &-container {
      @apply flex items-center;
    }
  }

  &-title {
    @apply mb-6;
  }

  &-underlined {
    @apply pt-1.5;
  }

  &-content {
    @apply space-y-4;
  }

  &-block {
    &-title {
      @apply pr-2;
    }
  }
}
</style>
