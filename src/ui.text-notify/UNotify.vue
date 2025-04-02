<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { merge } from "lodash-es";

import useUI from "../composables/useUI.ts";
import { getDefaults, vuelessConfig } from "../utils/ui.ts";
import { useLocale } from "../composables/useLocale.ts";

import defaultConfig from "./config.ts";
import { COMPONENT_NAME, NotificationType, NotificationPosition } from "./constants.ts";

import UIcon from "../ui.image-icon/UIcon.vue";

import type { Props, Config, NotifyEvent, Notification, NotificationsWrapperRef } from "./types.ts";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<Props>(), {
  ...getDefaults<Props, Config>(defaultConfig, COMPONENT_NAME),
});

const { tm } = useLocale();

const notifications = ref<Notification[]>([]);
const notifyPositionStyles = ref({});

const notificationsWrapperRef = ref<NotificationsWrapperRef | null>(null);

const i18nGlobal = tm(COMPONENT_NAME);
const currentLocale = computed(() => merge({}, defaultConfig.i18n, i18nGlobal, props.config.i18n));

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

function onNotifyStart(event: NotifyEvent) {
  notifications.value.push({ ...event.detail });
}

function onNotifyEnd(event: NotifyEvent) {
  notifications.value = notifications.value.filter(
    (notification) => notification.id !== event.detail.id,
  );
}

function onClearAll() {
  notifications.value = [];
}

function onClickClose(targetNotification: Notification) {
  notifications.value = notifications.value.filter(
    (notification) => notification.id !== targetNotification.id,
  );
}

function getOffsetWidth(selector: string): number {
  const element = document.querySelector(selector);

  return element ? (element as HTMLElement).offsetWidth : 0;
}

function setPosition() {
  const positionClasses = vuelessConfig.components?.UNotify?.positionClasses;
  const pageClass = positionClasses?.page || config.value?.positionClasses?.page;
  const asideClass = positionClasses?.aside || config.value?.positionClasses?.aside;
  const pageWidth = getOffsetWidth(`${pageClass}`);
  const asideWidth = getOffsetWidth(`${asideClass}`);
  const notifyWidth = notificationsWrapperRef.value?.$el.offsetWidth || 0;

  const styles: Record<string, string> = {
    left: "auto",
    top: "auto",
    right: "auto",
    bottom: "auto",
  };

  styles[props.yPosition] = "0px";

  if (props.xPosition === NotificationPosition.Center) {
    styles.left = `calc(50% - ${notifyWidth / 2}px)`;
  } else {
    styles[props.xPosition] = "0px";
  }

  if (pageWidth && props.xPosition !== NotificationPosition.Right) {
    styles.left = `${asideWidth + pageWidth / 2 - notifyWidth / 2}px`;
  }

  notifyPositionStyles.value = styles;
}

function getText(notificationText: string, type: Notification["type"]): string {
  return notificationText || currentLocale.value[type]?.default;
}

function getBodyAttrs(type: Notification["type"]) {
  if (type === NotificationType.Success) {
    return bodySuccessAttrs.value;
  }

  if (type === NotificationType.Warning) {
    return bodyWarningAttrs.value;
  }

  if (type === NotificationType.Error) {
    return bodyErrorAttrs.value;
  }
}

/**
 * Get element / nested component attributes for each config token ✨
 * Applies: `class`, `config`, redefined default `props` and dev `vl-...` attributes.
 */
const {
  getDataTest,
  config,
  wrapperAttrs,
  bodySuccessAttrs,
  bodyWarningAttrs,
  bodyErrorAttrs,
  contentAttrs,
  labelAttrs,
  descriptionAttrs,
  successIconAttrs,
  warningIconAttrs,
  errorIconAttrs,
  closeIconAttrs,
} = useUI<Config>(defaultConfig);
</script>

<template>
  <TransitionGroup
    ref="notificationsWrapperRef"
    :style="notifyPositionStyles"
    tag="div"
    v-bind="{ ...config.transitionGroup, ...wrapperAttrs }"
    :data-test="getDataTest()"
  >
    <div
      v-for="notification in notifications"
      :key="notification.id"
      v-bind="getBodyAttrs(notification.type)"
    >
      <UIcon
        v-if="notification.type === NotificationType.Success"
        color="success"
        variant="light"
        size="md"
        internal="vueless"
        :name="config.defaults.successIcon"
        v-bind="successIconAttrs"
        data-test="type-notify"
      />

      <UIcon
        v-else-if="notification.type === NotificationType.Warning"
        color="warning"
        variant="light"
        size="md"
        internal="vueless"
        :name="config.defaults.warningIcon"
        v-bind="warningIconAttrs"
        data-test="type-notify"
      />

      <UIcon
        v-else-if="notification.type === NotificationType.Error"
        data-test="type-notify"
        color="error"
        variant="light"
        size="md"
        internal="vueless"
        :name="config.defaults.errorIcon"
        v-bind="errorIconAttrs"
      />

      <div v-bind="contentAttrs">
        <span v-bind="labelAttrs" v-text="notification.label" />
        <span
          v-bind="descriptionAttrs"
          v-text="getText(notification.description, notification.type)"
        />
      </div>

      <UIcon
        color="neutral"
        variant="light"
        size="xs"
        internal="vueless"
        interactive
        :name="config.defaults.closeIcon"
        v-bind="closeIconAttrs"
        :data-test="getDataTest('close')"
        @click="onClickClose(notification)"
      />
    </div>
  </TransitionGroup>
</template>
