import { computed } from "vue";
import useUI from "../composables/useUI.ts";

import defaultConfig from "./config.ts";
import { NOTIFY_TYPE } from "./constants.ts";

import type { Ref } from "vue";
import type { UseAttrs } from "../types.ts";
import type { UNotifyProps, Notification, Config } from "./types.ts";

type ComponentState = {
  notifications: Ref<Notification[]>;
};

export default function useAttrs(
  props: UNotifyProps,
  { notifications }: ComponentState,
): UseAttrs<Config> {
  const { config, getKeysAttrs } = useUI<Config>(defaultConfig, () => props.config);

  const mutatedProps = computed(() => ({
    bodySuccess: notifications.value.some(
      (notification) => notification.type === NOTIFY_TYPE.success,
    ),
    bodyWarning: notifications.value.some(
      (notification) => notification.type === NOTIFY_TYPE.warning,
    ),
    bodyError: notifications.value.some((notification) => notification.type === NOTIFY_TYPE.error),
  }));

  return { config, ...getKeysAttrs(mutatedProps) };
}
