<template>
  <TransitionGroup
    ref="notificationsWrapperRef"
    :style="notifyPositionStyles"
    tag="div"
    v-bind="{ ...config.transitionGroup, ...wrapperAttrs }"
  >
    <div
      v-for="notification in notifications"
      :key="notification.id"
      v-bind="bodyAttrs"
      :class="getNotificationClasses(notification)"
    >
      <UIcon
        v-if="notification.type === NOTIFY_TYPE.success"
        color="green"
        variant="light"
        size="md"
        internal
        :name="config.defaults.successIcon"
        v-bind="successIconAttrs"
        data-test="type-notify"
      />

      <UIcon
        v-else-if="notification.type === NOTIFY_TYPE.warning"
        color="orange"
        variant="light"
        size="md"
        internal
        :name="config.defaults.warningIcon"
        v-bind="warningIconAttrs"
        data-test="type-notify"
      />

      <UIcon
        v-else-if="notification.type === NOTIFY_TYPE.error"
        data-test="type-notify"
        color="red"
        variant="light"
        size="md"
        internal
        :name="config.defaults.errorIcon"
        v-bind="errorIconAttrs"
      />

      <div v-bind="contentAttrs">
        <template v-if="html">
          <span v-bind="labelAttrs" v-html="notification.label" />
          <span
            v-bind="descriptionAttrs"
            v-html="getText(notification.description, notification.type)"
          />
        </template>

        <template v-else>
          <span v-bind="labelAttrs" v-text="notification.label" />
          <span
            v-bind="descriptionAttrs"
            v-text="getText(notification.description, notification.type)"
          />
        </template>
      </div>

      <UIcon
        color="gray"
        variant="light"
        size="xs"
        internal
        interactive
        :name="config.defaults.closeIcon"
        v-bind="closeIconAttrs"
        @click="onClickClose(notification)"
      />
    </div>
  </TransitionGroup>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { merge } from "lodash-es";

import { cx, getDefault, vuelessConfig } from "../service.ui";
import { useLocale } from "../composable.locale";
import useAttrs from "./composables/attrs.composable";

import defaultConfig from "./configs/default.config";
import { UNotify, NOTIFY_TYPE, POSITION } from "./constants";

import UIcon from "../ui.image-icon";

/* Should be a string for correct web-types gen */
defineOptions({ name: "UNotify", inheritAttrs: false });

const props = defineProps({
  /**
   * A position on the x-axis.
   * @values left, center, right
   */
  xPosition: {
    type: String,
    default: getDefault(defaultConfig, UNotify).xPosition,
  },

  /**
   * A position on the y-axis.
   * @values top, bottom
   */
  yPosition: {
    type: String,
    default: getDefault(defaultConfig, UNotify).yPosition,
  },

  /**
   * Use html to render you own content.
   */
  html: {
    type: Boolean,
    default: getDefault(defaultConfig, UNotify).html,
  },

  /**
   * Sets component ui config object.
   */
  config: {
    type: Object,
    default: () => ({}),
  },
});

const {
  config,
  wrapperAttrs,
  bodyAttrs,
  contentAttrs,
  labelAttrs,
  descriptionAttrs,
  successIconAttrs,
  warningIconAttrs,
  errorIconAttrs,
  closeIconAttrs,
} = useAttrs(props);

const { tm } = useLocale();

const notifications = ref([]);
const notifyPositionStyles = ref({});

const notificationsWrapperRef = ref(null);

const i18nGlobal = tm(UNotify);
const currentLocale = computed(() => merge(defaultConfig.i18n, i18nGlobal, props.config.i18n));

onMounted(() => {
  window.addEventListener("resize", setPosition, { passive: true });
  window.addEventListener("notifyStart", onNotifyStart);
  window.addEventListener("notifyEnd", onNotifyEnd);
  window.addEventListener("notifyClearAll", onClearAll);

  setPosition();
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", setPosition);
  window.removeEventListener("notifyStart", onNotifyStart);
  window.removeEventListener("notifyEnd", onNotifyEnd);
  window.removeEventListener("notifyClearAll", onClearAll);
});

function onNotifyStart(event) {
  notifications.value.push({ ...event.detail });
}

function onNotifyEnd(event) {
  notifications.value = notifications.value.filter(
    (notification) => notification.id !== event.detail.id,
  );
}

function onClearAll() {
  notifications.value = [];
}

function onClickClose(targetNotification) {
  notifications.value = notifications.value.filter(
    (notification) => notification.id !== targetNotification.id,
  );
}

function getOffsetWidth(selector) {
  return document.querySelector(selector)?.offsetWidth || 0;
}

function setPosition() {
  const positionClasses = vuelessConfig.component?.UNotify?.positionClasses;
  const pageClass = positionClasses?.page || config.value.positionClasses.page;
  const asideClass = positionClasses?.aside || config.value.positionClasses.aside;
  const pageWidth = getOffsetWidth(`${pageClass}`);
  const asideWidth = getOffsetWidth(`${asideClass}`);
  const notifyWidth = notificationsWrapperRef.value.$el?.offsetWidth || 0;

  const styles = {
    left: "auto",
    top: "auto",
    right: "auto",
    bottom: "auto",
  };

  styles[props.yPosition] = "0px";

  if (props.xPosition === POSITION.center) {
    styles.left = `calc(50% - ${notifyWidth / 2}px)`;
  } else {
    styles[props.xPosition] = "0px";
  }

  if (pageWidth && props.xPosition !== POSITION.right) {
    styles.left = `${asideWidth + pageWidth / 2 - notifyWidth / 2}px`;
  }

  notifyPositionStyles.value = styles;
}

function getText(notificationText, type) {
  return notificationText || currentLocale.value[type]?.default;
}

function getNotificationClasses(notification) {
  if (notification.type === NOTIFY_TYPE.success) {
    return cx([bodyAttrs.value.class, config.value.bodySuccess]);
  }

  if (notification.type === NOTIFY_TYPE.warning) {
    return cx([bodyAttrs.value.class, config.value.bodyWarning]);
  }

  if (notification.type === NOTIFY_TYPE.error) {
    return cx([bodyAttrs.value.class, config.value.bodyError]);
  }
}
</script>
