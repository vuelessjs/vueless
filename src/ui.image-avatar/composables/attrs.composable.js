import useUI from "../../composable.ui";
import { cva } from "../../service.ui";

import defaultConfig from "../configs/default.config";
import { computed } from "vue";

export function useAttrs(props) {
  const { config, getAttrs, setColor } = useUI(defaultConfig, () => props.config);
  const { avatar } = config.value;

  const cvaAvatar = cva({
    base: avatar.base,
    variants: avatar.variants,
    compoundVariants: avatar.compoundVariants,
  });

  const avatarClasses = computed(() =>
    setColor(
      cvaAvatar({
        size: props.size,
        color: props.color,
        rounded: props.rounded,
        bordered: props.bordered,
      }),
      props.color,
    ),
  );

  const avatarAttrs = getAttrs("avatar", { classes: avatarClasses });
  const iconAttrs = getAttrs("icon", { isComponent: true });

  return {
    avatarAttrs,
    iconAttrs,
  };
}
