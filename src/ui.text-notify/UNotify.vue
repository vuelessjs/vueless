<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { merge } from "lodash-es";

import useUI from "../composables/useUI.ts";
import { getDefaults, vuelessConfig } from "../utils/ui.ts";
import { useLocale } from "../composables/useLocale.ts";

import defaultConfig from "./config.ts";
import { UNotify, NOTIFY_TYPE, POSITION } from "./constants.ts";

import UIcon from "../ui.image-icon/UIcon.vue";

import type {
  Props,
  Notification,
  NotifyEvent,
  NotificationsWrapperRef,
  NotificationType,
  Config,
} from "./types.ts";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<Props>(), {
  ...getDefaults<Props, Config>(defaultConfig, UNotify),
});

const { tm } = useLocale();

const notifications = ref<Notification[]>([]);
const notifyPositionStyles = ref({});

const notificationsWrapperRef = ref<NotificationsWrapperRef | null>(null);

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
  const positionClasses = vuelessConfig.component?.UNotify?.positionClasses;
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

function getText(notificationText: string, type: NotificationType): string {
  return notificationText || currentLocale.value[type]?.default;
}

/**
 * Get element / nested component attributes for each config token ✨
 * Applies: `class`, `config`, redefined default `props` and dev `vl-...` attributes.
 */
const mutatedProps = computed(() => ({
  bodySuccess: notifications.value.some(
    (notification) => notification.type === NOTIFY_TYPE.success,
  ),
  bodyWarning: notifications.value.some(
    (notification) => notification.type === NOTIFY_TYPE.warning,
  ),
  bodyError: notifications.value.some((notification) => notification.type === NOTIFY_TYPE.error),
}));

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
} = useUI<Config>(defaultConfig, mutatedProps);
</script>

<template>
  <TransitionGroup
    ref="notificationsWrapperRef"
    :style="notifyPositionStyles"
    tag="div"
    v-bind="{ ...config?.transitionGroup, ...wrapperAttrs }"
  >
    <div v-for="notification in notifications" :key="notification.id" v-bind="bodyAttrs">
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
