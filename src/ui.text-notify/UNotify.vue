<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, useTemplateRef } from "vue";

import useUI from "../composables/useUI.ts";
import { getDefaults, vuelessConfig } from "../utils/ui.ts";
import { useComponentLocaleMessages } from "../composables/useComponentLocaleMassages.ts";

import defaultConfig from "./config.ts";
import { COMPONENT_NAME, NotificationType, NotificationPosition } from "./constants.ts";

import UIcon from "../ui.image-icon/UIcon.vue";

import type { Props, Config, NotifyEvent, Notification, NotificationsWrapperRef } from "./types.ts";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<Props>(), {
  ...getDefaults<Props, Config>(defaultConfig, COMPONENT_NAME),
});

const notificationRef = useTemplateRef<HTMLDivElement>("notification");

const notifications = ref<Notification[]>([]);
const notifyPositionStyles = ref({});

const notificationsWrapperRef = ref<NotificationsWrapperRef | null>(null);

const { localeMessages } = useComponentLocaleMessages<typeof defaultConfig.i18n>(
  COMPONENT_NAME,
  defaultConfig.i18n,
  props?.config?.i18n,
);

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
  return notificationText || localeMessages.value[type]?.default;
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

defineExpose({
  /**
   * A reference to the component's wrapper element for direct DOM manipulation.
   * @property {HTMLDivElement}
   */
  notificationRef,
});

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
      ref="notification"
      v-bind="getBodyAttrs(notification.type)"
    >
      <UIcon
        v-if="notification.type === NotificationType.Success"
        size="md"
        :name="config.defaults.successIcon"
        v-bind="successIconAttrs"
        data-test="type-notify"
      />

      <UIcon
        v-else-if="notification.type === NotificationType.Warning"
        size="md"
        :name="config.defaults.warningIcon"
        v-bind="warningIconAttrs"
        data-test="type-notify"
      />

      <UIcon
        v-else-if="notification.type === NotificationType.Error"
        data-test="type-notify"
        size="md"
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
        size="xs"
        interactive
        :name="config.defaults.closeIcon"
        v-bind="closeIconAttrs"
        :data-test="getDataTest('close')"
        @click="onClickClose(notification)"
      />
    </div>
  </TransitionGroup>
</template>
