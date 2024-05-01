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
        data-cy="type-notify"
        color="green"
        variant="light"
        size="md"
        :name="config.iconSuccessName"
        v-bind="iconSuccessAttrs"
      />

      <UIcon
        v-else-if="notification.type === NOTIFY_TYPE.warning"
        data-cy="type-notify"
        color="orange"
        variant="light"
        size="md"
        :name="config.iconWarningName"
        v-bind="iconWarningAttrs"
      />

      <UIcon
        v-else-if="notification.type === NOTIFY_TYPE.error"
        data-cy="type-notify"
        color="red"
        variant="light"
        size="md"
        :name="config.iconErrorName"
        v-bind="iconErrorAttrs"
      />

      <div v-bind="contentAttrs">
        <template v-if="vHtml">
          <span v-bind="labelAttrs" v-html="notification.label" />
          <span v-bind="descriptionAttrs" v-html="getText(notification.text, notification.type)" />
        </template>
        <template v-else>
          <span v-bind="labelAttrs" v-text="notification.label" />
          <span v-bind="descriptionAttrs" v-text="getText(notification.text, notification.type)" />
        </template>
      </div>

      <UIcon
        color="gray"
        variant="light"
        size="xs"
        interactive
        :name="config.iconCloseName"
        v-bind="iconCloseAttrs"
        @click="onClickClose(notification)"
      />
    </div>
  </TransitionGroup>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { merge } from "lodash-es";

import UIService, { globalComponentConfig, cx } from "../service.ui";

import { useLocale } from "../composable.locale";
import { useAttrs } from "./composables/attrs.composable";

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
    default: UIService.get(defaultConfig, UNotify).default.xPosition,
  },

  /**
   * A position on the y-axis.
   * @values top, bottom
   */
  yPosition: {
    type: String,
    default: UIService.get(defaultConfig, UNotify).default.yPosition,
  },

  /**
   * Use v-html to render notification label and description content.
   */
  vHtml: {
    type: Boolean,
    default: UIService.get(defaultConfig, UNotify).default.vHtml,
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
  iconSuccessAttrs,
  iconWarningAttrs,
  iconErrorAttrs,
  iconCloseAttrs,
} = useAttrs(props);

const { tm } = useLocale();

const notifications = ref([]);
const notifyPositionStyles = ref({});

const notificationsWrapperRef = ref(null);

const currentLocale = computed(() => merge(tm("UNotify"), props.config.i18n));

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
  const positionClasses = globalComponentConfig.UNotify?.positionClasses;
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
