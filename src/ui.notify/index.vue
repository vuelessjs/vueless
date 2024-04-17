<template>
  <notifications
    group="notify"
    class="vueless-notify !top-3 mt-safe-top !w-full px-3 max-md:!left-0 md:!w-[22rem] md:px-0 lg:!top-4 lg:!mt-0"
    :position="position"
  >
    <template #body="{ item, close: onClickClose }">
      <div :data-cy="`${item.type}-notify`" class="notify-body" :class="[item.type]">
        <UIcon
          v-if="isSuccessType"
          data-cy="type-notify"
          class="type-icon"
          name="check_circle"
          size="md"
        />

        <UIcon
          v-else-if="isWarningType"
          data-cy="type-notify"
          class="type-icon"
          name="warning"
          size="md"
        />

        <UIcon
          v-else-if="isErrorType"
          data-cy="type-notify"
          class="type-icon"
          name="error"
          size="md"
        />

        <div class="color-white w-full max-w-full px-3 text-sm text-gray-200">
          <div v-if="item.title" class="mb-1 font-medium" v-text="$t(item.title)" />
          <div
            class="break-words font-normal leading-5"
            v-html="prepareMessage(item.data.code, item.type, item.text)"
          />
        </div>

        <UIcon
          data-cy="close-notify"
          class="icon icon-close"
          name="close"
          size="xs"
          interactive
          @click="onClickClose"
        />
      </div>
    </template>
  </notifications>
</template>

<script>
import { globalComponentConfig } from "../service.ui";

import UIcon from "../ui.image-icon";

const NOTIFY_TYPE = {
  success: "success",
  warning: "warning",
  error: "error",
};

export default {
  name: "UNotify",
  components: {
    UIcon,
  },

  props: {
    /**
     * A position on the x-axis.
     * @values left, center, right
     */
    xPosition: {
      type: String,
      default: "center",
    },

    /**
     * A position on the y-axis.
     * @values top, bottom
     */
    yPosition: {
      type: String,
      default: "top",
    },
  },

  data() {
    return {
      type: null,
    };
  },

  computed: {
    isSuccessType() {
      return this.type === NOTIFY_TYPE.success;
    },

    isWarningType() {
      return this.type === NOTIFY_TYPE.warning;
    },

    isErrorType() {
      return this.type === NOTIFY_TYPE.error;
    },

    i18n() {
      return {
        message: `${this.type}.default`,
      };
    },

    position() {
      return [this.yPosition, this.xPosition];
    },
  },

  created() {
    window.addEventListener("resize", this.setPosition, { passive: true });
  },

  beforeUnmount() {
    window.removeEventListener("resize", this.setPosition);
  },

  methods: {
    prepareMessage(code, type, text) {
      this.setPosition();

      this.type = type;

      if (text) {
        return text;
      }

      return this.i18n.message;
    },

    setPosition() {
      const getOffsetWidth = (className) =>
        className ? document.querySelector(`.${className}`)?.offsetWidth : 0;

      const NOTIFY_CLASS = "vueless-notify";
      const classes = globalComponentConfig.UNotify?.positionClasses;
      const pageWidth = getOffsetWidth(classes.page);
      const asideWidth = getOffsetWidth(classes.aside);
      const notifyWidth = getOffsetWidth(NOTIFY_CLASS);

      if (!pageWidth) return;

      const leftShift = asideWidth + pageWidth / 2 - notifyWidth / 2;

      document.querySelector(`.${NOTIFY_CLASS}`).style.setProperty("left", `${leftShift}px`);
    },
  },
};
</script>

<i18n>
en:
  success:
    default: "Operation successful."
  error:
    default: "Operation error."
  warning:
    default: "Operation warning."
ru:
  success:
    default: "Произошла ошибка."
  error:
    default: "Операция успешна."
  warning:
    default: "Предупреждение."
ua:
  success:
    default: "Операція успішна."
  error:
    default: "Сталася помилка."
  warning:
    default: "Попередження."
</i18n>

<style lang="postcss" scoped>
.vueless-notify {
  :deep(.vue-notification-wrapper) {
    @apply overflow-visible;
  }

  :deep(.notify-body) {
    @apply rounded-2xl backdrop-blur-md;
    @apply flex items-center;
    @apply mb-3 p-4 shadow-[0_4px_16px_rgba(17,24,39,0.5)] md:shadow-[0_0px_12px_rgba(0,0,0,0.25)];

    .icon-close {
      path {
        @apply fill-current text-gray-400;
      }
    }
  }

  :deep(.warning) {
    background: radial-gradient(
      100.16% 500.78% at 0% 50%,
      rgba(251, 146, 60, 0.2) 2.17%,
      transparent
    );

    .type-icon path {
      @apply fill-current text-orange-400;
    }
  }

  :deep(.success) {
    background: radial-gradient(
      100.16% 500.78% at 0% 50%,
      rgba(74, 222, 128, 0.1) 2.17%,
      transparent
    );

    .type-icon path {
      @apply fill-current text-green-400;
    }
  }

  :deep(.error) {
    background: radial-gradient(
      100.16% 500.78% at 0% 50%,
      rgba(251, 113, 133, 0.2) 2.17%,
      transparent
    );

    .type-icon path {
      @apply fill-current text-red-400;
    }
  }

  /*
    NOTE! This expression should be declared after all subclasses,
    otherwise we will get gradient with white background
  */
  :deep(.notify-body) {
    @apply bg-gray-900 bg-opacity-90;
  }
}
</style>
