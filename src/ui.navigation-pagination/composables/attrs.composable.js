import useUI from "../../composable.ui";

import defaultConfig from "../configs/default.config";
import { cx } from "../../service.ui";
import { computed } from "vue";

export function useAttrs(props) {
  const { config, getAttrs } = useUI(defaultConfig, () => props.config);

  const listAttrs = getAttrs("list");
  const itemAttrsRaw = getAttrs("item");
  const itemEllipsisAttrs = getAttrs("itemEllipsis");
  const ellipsisAttrs = getAttrs("ellipsis");
  const navigationButtonAttrs = getAttrs("navigationButton", { isComponent: true });
  const navigationButtonTextAttrs = getAttrs("navigationButtonText");
  const pageButtonAttrsRaw = getAttrs("pageButton", { isComponent: true });

  const itemAttrs = computed(() => (page = 0) => {
    const itemClass = page && !isFinite(page.number) && ellipsisAttrs;

    return {
      ...itemAttrsRaw.value,
      class: cx([itemAttrsRaw.value.class, itemClass]),
    };
  });

  const pageButtonAttrs = computed(() => (page) => {
    const pageButtonActiveClasses = page.isActive && config.value.pageButtonActive;

    return {
      ...pageButtonAttrsRaw.value,
      class: cx([pageButtonAttrsRaw.value.class, pageButtonActiveClasses]),
    };
  });

  return {
    listAttrs,
    itemAttrs,
    itemEllipsisAttrs,
    navigationButtonAttrs,
    navigationButtonTextAttrs,
    pageButtonAttrs,
    ellipsisAttrs,
  };
}
