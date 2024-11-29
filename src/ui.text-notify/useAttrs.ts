import { computed } from "vue";
import useUI from "../composables/useUI.ts";

import defaultConfig from "./config.ts";

import type { Ref } from "vue";
import type { UseAttrs } from "../types.ts";
import type { UNotifyProps, Config } from "./types.ts";

type ComponentState = {
  notifications: Ref<{ type: string }[]>;
};

export default function useAttrs(
  props: UNotifyProps,
  { notifications }: ComponentState,
): UseAttrs<Config> {
  const { config, getKeysAttrs, getExtendingKeysClasses, hasSlotContent } = useUI<Config>(
    defaultConfig,
    () => props.config,
  );

  const extendingKeys = ["bodySuccess", "bodyWarning", "bodyError"];
  const extendingKeysClasses = getExtendingKeysClasses(extendingKeys);

  const keysAttrs = getKeysAttrs({}, extendingKeys, {
    body: {
      extend: computed(() =>
        notifications.value
          .map((notification) =>
            notification.type === "success"
              ? extendingKeysClasses.bodySuccess.value
              : notification.type === "warning"
                ? extendingKeysClasses.bodyWarning.value
                : notification.type === "error"
                  ? extendingKeysClasses.bodyError.value
                  : null,
          )
          .filter(Boolean),
      ),
    },
  });

  return {
    config,
    ...keysAttrs,
    hasSlotContent,
  };
}
